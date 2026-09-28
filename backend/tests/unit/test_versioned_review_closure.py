from datetime import date
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    Evaluación,
    EvaluacionItem,
    EvaluationClosure,
    ItemReview,
    ProfessionalReviewAssignment,
    VersionedReport,
)


@pytest.fixture
def review_context():
    professional = get_user_model().objects.create_user(
        username="versioned-reviewer", password="test-password"
    )
    ProfessionalProfile.objects.create(
        user=professional, status=ProfessionalProfile.Status.APPROVED
    )
    child = Niño.objects.create(
        nombre="Niño de revisión",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=professional,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        professional=professional,
        psychologist_id=str(professional.id),
        edad_meses=60,
        session_code="RVW701",
        estado=Evaluación.Estado.PENDING_REVIEW,
    )
    item = EvaluacionItem.objects.create(
        evaluación=evaluation,
        item_id="COGNITIVO_001",
        area="COGNITIVO",
        estado=EvaluacionItem.Estado.NEEDS_REVIEW,
        system_result=EvaluacionItem.Resultado.PASS,
    )
    client = APIClient()
    client.force_authenticate(professional)
    return client, evaluation, item, professional


@pytest.mark.django_db
def test_review_requires_explicit_assignment_receipt_and_preserves_versions(
    review_context,
):
    client, evaluation, item, _ = review_context
    url = f"/api/evaluaciones/{evaluation.id}/items/{item.item_id}/review/"

    blocked = client.patch(
        url, {"final_result": "PASS", "motive": "Confirmación"}, format="json"
    )
    receipt = client.post(
        f"/api/evaluaciones/{evaluation.id}/review/assignment/receive/",
        {"motive": "Asignación clínica"},
        format="json",
    )
    first = client.patch(
        url,
        {
            "final_result": "PASS",
            "motive": "Confirmación",
            "expected_review_version": 0,
        },
        format="json",
    )
    correction = client.patch(
        url,
        {
            "final_result": "FAIL",
            "motive": "Corrección tras revisar evidencia",
            "expected_review_version": 1,
        },
        format="json",
    )

    assert blocked.status_code == 409
    assert receipt.status_code == 201
    assert first.status_code == correction.status_code == 200
    assert (
        ProfessionalReviewAssignment.objects.get(evaluación=evaluation).received_at
        is not None
    )
    assert list(
        ItemReview.objects.filter(item=item).values_list("version", "final_result")
    ) == [
        (1, "PASS"),
        (2, "FAIL"),
    ]


@pytest.mark.django_db
def test_stale_review_version_is_a_concurrent_conflict(review_context):
    client, evaluation, item, _ = review_context
    client.post(
        f"/api/evaluaciones/{evaluation.id}/review/assignment/receive/", format="json"
    )
    url = f"/api/evaluaciones/{evaluation.id}/items/{item.item_id}/review/"
    client.patch(url, {"final_result": "PASS", "motive": "Inicial"}, format="json")

    stale = client.patch(
        url,
        {"final_result": "FAIL", "motive": "Cambio", "expected_review_version": 0},
        format="json",
    )

    assert stale.status_code == 409
    assert stale.data["current_review_version"] == 1
    assert ItemReview.objects.filter(item=item).count() == 1


@pytest.mark.django_db
def test_reopen_is_controlled_and_requires_a_motive(review_context):
    client, evaluation, _, professional = review_context
    evaluation.estado = Evaluación.Estado.VALIDATED
    evaluation.save(update_fields=["estado"])
    EvaluationClosure.objects.create(
        evaluación=evaluation,
        closed_by=professional,
        motive="Cierre",
        lineage_checked_at=evaluation.created_at,
    )
    url = f"/api/evaluaciones/{evaluation.id}/review/reopen/"

    missing_motive = client.post(url, {}, format="json")
    reopened = client.post(url, {"motive": "Nueva evidencia"}, format="json")

    assert missing_motive.status_code == 400
    assert reopened.status_code == 200
    evaluation.refresh_from_db()
    assert evaluation.estado == Evaluación.Estado.REVIEW_IN_PROGRESS
    assert evaluation.closures.get().reopening_motive == "Nueva evidencia"


@pytest.mark.django_db
def test_each_final_report_is_preserved_as_a_new_version(review_context, tmp_path):
    client, evaluation, _, _ = review_context
    evaluation.estado = Evaluación.Estado.VALIDATED
    evaluation.save(update_fields=["estado"])
    pdf = tmp_path / "report.pdf"
    pdf.write_bytes(b"%PDF-1.4\n")

    with patch(
        "src.infrastructure.pdf.reporte_generator.ReporteGenerator.generar",
        return_value=str(pdf),
    ):
        first = client.get(f"/api/evaluaciones/{evaluation.id}/reporte-pdf/")
        second = client.get(f"/api/reportes/{evaluation.id}/pdf/")

    assert first.status_code == second.status_code == 200
    assert list(
        VersionedReport.objects.filter(evaluación=evaluation).values_list(
            "version", flat=True
        )
    ) == [2, 1]

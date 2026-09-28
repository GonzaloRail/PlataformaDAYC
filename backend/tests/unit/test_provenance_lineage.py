from datetime import date

import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    Evaluación,
    EvaluacionItem,
    Evidencia,
    ProvenanceRelation,
    ResultadoÁrea,
)
from src.application.services.provenance_service import provenance_service


@pytest.fixture
def provenance_evaluation():
    psychologist = get_user_model().objects.create_user(
        username="provenance-owner", password="test-password"
    )
    ProfessionalProfile.objects.create(
        user=psychologist, status=ProfessionalProfile.Status.APPROVED
    )
    child = Niño.objects.create(
        nombre="Niño de trazabilidad",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=psychologist,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        professional=psychologist,
        psychologist_id=str(psychologist.id),
        edad_meses=60,
        session_code="PR0V01",
    )
    item = EvaluacionItem.objects.create(
        evaluación=evaluation, item_id="COGNITIVO_045", area="COGNITIVO"
    )
    return evaluation, item, psychologist


@pytest.mark.django_db
def test_provenance_records_w3c_equivalent_relations_and_revisions(
    provenance_evaluation,
):
    evaluation, item, psychologist = provenance_evaluation
    _, outputs = provenance_service.record(
        evaluation,
        "response_capture",
        [("Response", "response-1", "Respuesta", {})],
        [("EvaluationItem", item.id, item.item_id, {})],
        actor=str(psychologist.id),
        actor_kind="PERSON",
    )
    provenance_service.record_revision(
        outputs[0], "professional_correction", str(psychologist.id), {"result": "PASS"}
    )

    relation_types = set(
        ProvenanceRelation.objects.filter(evaluation=evaluation).values_list(
            "relation_type", flat=True
        )
    )
    assert {
        "generatedBy",
        "derivedFrom",
        "attributedTo",
        "used",
        "associatedWith",
        "invalidatedBy",
        "revisionOf",
    } <= relation_types


@pytest.mark.django_db
def test_provenance_graph_export_sources_uses_and_issue_api(provenance_evaluation):
    evaluation, item, psychologist = provenance_evaluation
    evidence = Evidencia.objects.create(
        evaluación=evaluation, evaluación_item=item, type=Evidencia.Tipo.LOG
    )
    result = ResultadoÁrea.objects.create(
        evaluación=evaluation, área="COGNITIVO", puntuación_directa=10
    )
    provenance_service.record(
        evaluation,
        "evidence_capture",
        [("Evidence", evidence.id, "Evidencia LOG", {})],
        [("EvaluationItem", item.id, item.item_id, {})],
        actor="CHILD_DEVICE",
    )
    provenance_service.record(
        evaluation,
        "scoring",
        [("ScoreResult", result.id, "Resultado COGNITIVO", {})],
        [("Evidence", evidence.id, "Evidencia LOG", {})],
        actor="DAYC2_SCORING_SERVICE",
    )

    client = APIClient()
    client.force_authenticate(psychologist)
    graph = client.get(f"/api/evaluaciones/{evaluation.id}/provenance/graph/")
    exported = client.get(f"/api/evaluaciones/{evaluation.id}/provenance/export/")
    sources = client.get(
        f"/api/evaluaciones/{evaluation.id}/resultados/{result.id}/provenance/sources/"
    )
    uses = client.get(f"/api/evaluaciones/evidencias/{evidence.id}/provenance/uses/")
    issues = client.get(f"/api/evaluaciones/{evaluation.id}/provenance/issues/")

    assert graph.status_code == 200
    assert exported.data["schema_version"] == "1.0"
    assert any(
        entity["resource_type"] == "ScoreResult" for entity in sources.data["entities"]
    )
    assert any(
        entity["resource_type"] == "Evidence" for entity in uses.data["entities"]
    )
    assert issues.data == {"compatible": True, "issues": []}

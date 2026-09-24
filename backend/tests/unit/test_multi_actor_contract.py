from datetime import date, timedelta
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APIClient

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    Consentimiento,
    Evaluación,
    EvaluacionItem,
    Evidencia,
    SessionAccessToken,
)
from src.api.evaluaciones.serializers import (
    create_session_invitation,
    ensure_session_token,
)
from src.application.services.dayc2_flow_service import dayc2_flow_service


@pytest.fixture
def evaluation():
    psychologist = get_user_model().objects.create_user(
        username="owner", password="test-password"
    )
    ProfessionalProfile.objects.create(
        user=psychologist,
        status=ProfessionalProfile.Status.APPROVED,
    )
    child = Niño.objects.create(
        nombre="Niño de prueba",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=psychologist,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        psychologist_id=str(psychologist.id),
        estado=Evaluación.Estado.IN_PROGRESS,
        edad_meses=60,
        session_code="ABC123",
    )
    item = EvaluacionItem.objects.create(
        evaluación=evaluation,
        item_id="COGNITIVO_045",
        area="COGNITIVO",
        estado=EvaluacionItem.Estado.IN_PROGRESS,
    )
    evaluation.current_item_id = item.item_id
    evaluation.save(update_fields=["current_item_id"])
    return evaluation, item, psychologist


def bearer(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}


@pytest.mark.django_db
def test_join_issues_actor_scoped_device_token(evaluation):
    current, _, psychologist = evaluation
    current.session_expires_at = timezone.now() + timedelta(hours=1)
    current.save(update_fields=["session_expires_at"])
    invitation_code = create_session_invitation(
        current,
        SessionAccessToken.ActorRole.ADULT,
        psychologist,
    )
    response = APIClient().post(
        "/api/evaluaciones/join/",
        {
            "session_code": current.session_code,
            "invitation_code": invitation_code,
            "actor_role": "CHILD",
            "device_id": "adult-tablet",
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["actor_role"] == "ADULT"
    token = SessionAccessToken.objects.get()
    assert token.actor_role == SessionAccessToken.ActorRole.ADULT
    assert token.device_id == "adult-tablet"

    replay_response = APIClient().post(
        "/api/evaluaciones/join/",
        {
            "session_code": current.session_code,
            "invitation_code": invitation_code,
            "device_id": "other-device",
        },
        format="json",
    )

    assert replay_response.status_code == 403


@pytest.mark.django_db
def test_child_token_cannot_accept_adult_consent(evaluation):
    current, _, _ = evaluation
    child_token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)

    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/consent/",
        {"accepted": True, "expected_version": current.version},
        format="json",
        **bearer(child_token),
    )

    assert response.status_code == 403
    assert not Consentimiento.objects.filter(evaluación=current).exists()


@pytest.mark.django_db
def test_only_psychologist_can_list_evidence(evaluation):
    current, item, psychologist = evaluation
    child_token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    Evidencia.objects.create(
        evaluación=current,
        evaluación_item=item,
        type=Evidencia.Tipo.LOG,
    )
    url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/"

    participant_response = APIClient().get(url, **bearer(child_token))
    psychologist_client = APIClient()
    psychologist_client.force_authenticate(psychologist)
    psychologist_response = psychologist_client.get(url)

    assert participant_response.status_code == 403
    assert psychologist_response.status_code == 200
    assert len(psychologist_response.data) == 1


@pytest.mark.django_db
def test_evidence_actor_is_derived_from_token(evaluation):
    current, item, _ = evaluation
    Consentimiento.objects.create(evaluación=current, accepted=True)
    child_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.CHILD, "child-device"
    )

    response = APIClient().post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/",
        {"type": "LOG", "captured_by": "ADULT_DEVICE"},
        format="multipart",
        **bearer(child_token),
    )

    assert response.status_code == 201
    evidence = Evidencia.objects.get(pk=response.data["id"])
    assert evidence.captured_by == "CHILD_DEVICE"


@pytest.mark.django_db(transaction=True)
def test_second_actor_write_with_same_version_is_rejected(evaluation):
    current, item, _ = evaluation
    first_actor_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "adult-device-1"
    )
    second_actor_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "adult-device-2"
    )
    url = f"/api/evaluaciones/{current.id}/respuesta/"
    payload = {
        "item_id": item.item_id,
        "resultado": "CORRECT",
        "tiempo_respuesta_ms": 100,
        "expected_version": current.version,
    }

    with (
        patch.object(
            dayc2_flow_service,
            "complete_current_item",
            return_value=(item, {}),
        ),
        patch("src.api.evaluaciones.views.sincronizar_item_con_respuesta"),
        patch.object(dayc2_flow_service, "get_current_task_payload", return_value=None),
    ):
        first_response = APIClient().post(
            url, payload, format="json", **bearer(first_actor_token)
        )
        second_response = APIClient().post(
            url, payload, format="json", **bearer(second_actor_token)
        )

    assert first_response.status_code == 200
    assert first_response.data["version"] == current.version + 1
    assert second_response.status_code == 409
    assert second_response.data["current_version"] == current.version + 1


@pytest.mark.django_db
def test_final_reports_require_validated_evaluation(evaluation):
    current, _, psychologist = evaluation
    client = APIClient()
    client.force_authenticate(psychologist)

    for url in (
        f"/api/evaluaciones/{current.id}/reporte-pdf/",
        f"/api/reportes/{current.id}/pdf/",
    ):
        response = client.get(url)

        assert response.status_code == 409


@pytest.mark.django_db
def test_diagnosis_api_is_not_published():
    response = APIClient().get("/api/diagnostico/00000000-0000-0000-0000-000000000000/")

    assert response.status_code == 404


@pytest.mark.django_db
def test_review_completion_requires_explicit_decision_for_each_pending_item(evaluation):
    current, item, psychologist = evaluation
    current.estado = Evaluación.Estado.PENDING_REVIEW
    current.save(update_fields=["estado"])
    item.estado = EvaluacionItem.Estado.NEEDS_REVIEW
    item.save(update_fields=["estado"])

    client = APIClient()
    client.force_authenticate(psychologist)
    response = client.post(f"/api/evaluaciones/{current.id}/review/complete/")

    assert response.status_code == 409
    assert response.data["pending_item_ids"] == [item.item_id]
    current.refresh_from_db()
    item.refresh_from_db()
    assert current.estado == Evaluación.Estado.PENDING_REVIEW
    assert item.final_result is None


@pytest.mark.django_db
def test_validated_score_requires_explicit_decision_for_each_pending_item(evaluation):
    current, item, psychologist = evaluation
    current.estado = Evaluación.Estado.PENDING_REVIEW
    current.save(update_fields=["estado"])
    item.estado = EvaluacionItem.Estado.NEEDS_REVIEW
    item.save(update_fields=["estado"])

    client = APIClient()
    client.force_authenticate(psychologist)
    response = client.post(f"/api/evaluaciones/{current.id}/score/validated/")

    assert response.status_code == 409
    assert response.data["pending_item_ids"] == [item.item_id]
    item.refresh_from_db()
    assert item.final_result is None


@pytest.mark.django_db
def test_pending_professional_cannot_access_evaluations(evaluation):
    _, _, psychologist = evaluation
    psychologist.professional_profile.status = ProfessionalProfile.Status.PENDING
    psychologist.professional_profile.save(update_fields=["status"])
    client = APIClient()
    client.force_authenticate(psychologist)

    response = client.get("/api/evaluaciones/")

    assert response.status_code == 403


@pytest.mark.django_db
def test_approved_professional_can_access_evaluations(evaluation):
    _, _, psychologist = evaluation
    client = APIClient()
    client.force_authenticate(psychologist)

    response = client.get("/api/evaluaciones/")

    assert response.status_code == 200


@pytest.mark.django_db
def test_session_mutations_require_csrf_token(evaluation):
    _, _, psychologist = evaluation
    client = APIClient(enforce_csrf_checks=True)
    assert client.login(username=psychologist.username, password="test-password")

    blocked = client.post(
        "/api/children/",
        {"nombre": "Sin token", "fecha_nacimiento": "2021-01-01"},
        format="json",
    )
    assert blocked.status_code == 403

    csrf_response = client.get("/api/auth/csrf/")
    csrf_token = csrf_response.cookies["csrftoken"].value
    accepted = client.post(
        "/api/children/",
        {"nombre": "Con token", "fecha_nacimiento": "2021-01-01"},
        format="json",
        HTTP_X_CSRFTOKEN=csrf_token,
    )

    assert accepted.status_code == 201


@pytest.mark.django_db
def test_consent_persists_selected_modalities(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/consent/",
        {
            "accepted": True,
            "assent_confirmed": True,
            "expected_version": current.version,
            "modalities": {
                "logs": True,
                "screenshots": False,
                "audio": False,
                "video": True,
            },
        },
        format="json",
        **bearer(token),
    )

    assert response.status_code == 200
    consent = Consentimiento.objects.get(evaluación=current)
    assert consent.accepted_logs
    assert not consent.accepted_screenshots
    assert not consent.accepted_audio
    assert consent.accepted_video
    assert current.assent_records.count() == 1


@pytest.mark.django_db
def test_withdrawal_cancels_session_and_revokes_tokens(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/withdraw/",
        {"reason": "Solicitud del cuidador"},
        format="json",
        **bearer(token),
    )

    assert response.status_code == 200
    assert response.data["evaluacion"]["estado"] == Evaluación.Estado.CANCELLED
    assert current.withdrawal_records.count() == 1
    assert current.access_tokens.filter(revoked_at__isnull=True).count() == 0


@pytest.mark.django_db
def test_adult_can_pause_and_resume_an_active_session(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()

    paused = client.post(
        f"/api/evaluaciones/session/{current.session_code}/pause/",
        {"expected_version": current.version},
        format="json",
        **bearer(token),
    )
    assert paused.status_code == 200
    assert paused.data["evaluacion"]["estado"] == Evaluación.Estado.PAUSED

    resumed = client.post(
        f"/api/evaluaciones/session/{current.session_code}/resume/",
        {"expected_version": paused.data["evaluacion"]["version"]},
        format="json",
        **bearer(token),
    )
    assert resumed.status_code == 200
    assert resumed.data["evaluacion"]["estado"] == Evaluación.Estado.IN_PROGRESS


@pytest.mark.django_db
def test_paused_session_rejects_response_submission(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()
    paused = client.post(
        f"/api/evaluaciones/session/{current.session_code}/pause/",
        {"expected_version": current.version},
        format="json",
        **bearer(token),
    )

    response = client.post(
        f"/api/evaluaciones/{current.id}/respuesta/",
        {
            "item_id": item.item_id,
            "resultado": "CORRECT",
            "tiempo_respuesta_ms": 100,
            "expected_version": paused.data["evaluacion"]["version"],
        },
        format="json",
        **bearer(token),
    )

    assert response.status_code == 409
    assert response.data["error"] == "La sesión está en pausa"


@pytest.mark.django_db
def test_paused_session_rejects_event_and_evidence_capture(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()
    client.post(
        f"/api/evaluaciones/session/{current.session_code}/pause/",
        {"expected_version": current.version},
        format="json",
        **bearer(token),
    )

    event_response = client.post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/events/",
        {"event_type": "PAUSED_CAPTURE"},
        format="json",
        **bearer(token),
    )
    evidence_response = client.post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/",
        {"type": "LOG"},
        format="multipart",
        **bearer(token),
    )

    assert event_response.status_code == 409
    assert evidence_response.status_code == 409

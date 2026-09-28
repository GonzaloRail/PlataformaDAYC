import json
from datetime import date, timedelta
from unittest.mock import patch
from uuid import uuid4

import pytest
from asgiref.sync import async_to_sync
from channels.layers import InMemoryChannelLayer
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.test import override_settings
from django.utils import timezone
from rest_framework.test import APIClient

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    Consentimiento,
    ConsentRecord,
    Evaluación,
    EvaluacionItem,
    Evidencia,
    EvidenceAccessAudit,
    EvidenceAsset,
    DistributedOperation,
    InteractionEvent,
    OutboxEvent,
    PauseRecord,
    SessionAccessToken,
)
from src.api.evaluaciones.serializers import (
    create_session_invitation,
    ensure_session_token,
)
from src.application.services.dayc2_flow_service import dayc2_flow_service
from src.application.services.outbox_service import (
    deliver_outbox_event,
    publish_pending_outbox_events,
)


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
        professional=psychologist,
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
    assert evidence.capture_actor == "CHILD_DEVICE"
    assert evidence.capture_session == current.session_code
    assert evidence.capture_task == item.item_id
    assert evidence.capture_item == item.item_id
    assert evidence.capture_authorization == "CHILD:child-device"
    assert evidence.capture_custodian == "CHILD_DEVICE"
    assert evidence.capture_quality == "UNSPECIFIED"
    assert evidence.absence_reason == "NO_FILE_CAPTURED"


@pytest.mark.django_db
def test_withdrawal_race_serializations_erase_prior_capture_and_reject_later_capture(
    evaluation,
):
    """The evaluation lock admits only these two safe capture/withdraw orders."""
    current, item, _ = evaluation
    Consentimiento.objects.create(evaluación=current, accepted=True)
    child_token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    adult_token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    evidence_url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/"

    captured = APIClient().post(
        evidence_url,
        {"type": "LOG"},
        format="multipart",
        **bearer(child_token),
    )
    assert captured.status_code == 201

    withdrawn = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/withdraw/",
        {"reason": "Prueba de carrera"},
        format="json",
        **bearer(adult_token),
    )
    assert withdrawn.status_code == 200
    evidence = Evidencia.objects.get(pk=captured.data["id"])
    assert evidence.withdrawal_action == "ERASED"

    after_withdrawal = APIClient().post(
        evidence_url,
        {"type": "LOG"},
        format="multipart",
        **bearer(child_token),
    )
    assert after_withdrawal.status_code == 403
    assert Evidencia.objects.filter(evaluación=current).count() == 1


@pytest.mark.django_db
def test_uploaded_asset_uses_server_hash_signature_and_capture_metadata(evaluation):
    current, item, _ = evaluation
    Consentimiento.objects.create(evaluación=current, accepted=True)
    token = ensure_session_token(
        current, SessionAccessToken.ActorRole.CHILD, "child-device"
    )
    image = SimpleUploadedFile(
        "claimed-audio.mp3", b"\x89PNG\r\n\x1a\nimage-data", content_type="audio/mpeg"
    )

    response = APIClient().post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/",
        {
            "type": "SCREENSHOT",
            "file": image,
            "metadata": json.dumps({"quality": "GOOD"}),
        },
        format="multipart",
        **bearer(token),
    )

    assert response.status_code == 201
    evidence = Evidencia.objects.get(pk=response.data["id"])
    asset = EvidenceAsset.objects.get(
        evidencia=evidence, kind=EvidenceAsset.Kind.ORIGINAL
    )
    assert asset.media_type == "image/png"
    assert asset.size_bytes == len(b"\x89PNG\r\n\x1a\nimage-data")
    assert len(asset.sha256) == 64
    assert evidence.capture_actor == "CHILD_DEVICE"
    assert evidence.capture_session == current.session_code
    assert evidence.capture_task == item.item_id
    assert evidence.capture_item == item.item_id
    assert evidence.capture_authorization == "CHILD:child-device"
    assert evidence.capture_custodian == "CHILD_DEVICE"
    assert evidence.capture_quality == "GOOD"
    assert evidence.absence_reason == "NOT_APPLICABLE"


@pytest.mark.django_db
def test_invalid_binary_signature_is_rejected(evaluation):
    current, item, _ = evaluation
    Consentimiento.objects.create(evaluación=current, accepted=True)
    token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    forged = SimpleUploadedFile("fake.png", b"not-an-image", content_type="image/png")

    response = APIClient().post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/",
        {"type": "SCREENSHOT", "file": forged},
        format="multipart",
        **bearer(token),
    )

    assert response.status_code == 400
    assert EvidenceAsset.objects.count() == 0


@pytest.mark.django_db
def test_evidence_and_audit_chain_are_immutable_and_verifiable(evaluation):
    current, item, psychologist = evaluation
    evidence = Evidencia.objects.create(
        evaluación=current,
        evaluación_item=item,
        type=Evidencia.Tipo.LOG,
        captured_by="SYSTEM_AUTO",
    )
    EvidenceAccessAudit.record(evidencia=evidence, action="CREATED", actor="SYSTEM")
    EvidenceAccessAudit.record(
        evidencia=evidence, action="REVIEWED", actor="PSYCHOLOGIST"
    )

    assert EvidenceAccessAudit.verify_chain(evidence)
    evidence.metadata = {"changed": True}
    with pytest.raises(ValidationError):
        evidence.save()
    audit = evidence.access_audits.first()
    audit.action = "TAMPERED"
    with pytest.raises(ValidationError):
        audit.save()
    EvidenceAccessAudit.objects.filter(pk=audit.pk).update(action="TAMPERED")
    assert not EvidenceAccessAudit.verify_chain(evidence)

    client = APIClient()
    client.force_authenticate(psychologist)
    response = client.get(
        f"/api/evaluaciones/evidencias/{evidence.id}/audit-integrity/"
    )
    assert response.status_code == 200
    assert response.data["valid"] is False


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
        "idempotency_key": str(uuid4()),
    }
    conflict_payload = {**payload, "idempotency_key": str(uuid4())}

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
            url,
            conflict_payload,
            format="json",
            **bearer(second_actor_token),
        )
        replay_response = APIClient().post(
            url, payload, format="json", **bearer(first_actor_token)
        )
        conflict_replay_response = APIClient().post(
            url, conflict_payload, format="json", **bearer(second_actor_token)
        )

    assert first_response.status_code == 200
    assert first_response.data["version"] == current.version + 1
    assert second_response.status_code == 409
    assert second_response.data["current_version"] == current.version + 1
    assert replay_response.status_code == 200
    assert replay_response.data["idempotent_replay"] is True
    assert replay_response.data["version"] == first_response.data["version"]
    assert conflict_replay_response.status_code == 409
    assert conflict_replay_response.data["idempotent_replay"] is True
    assert conflict_replay_response.data["current_version"] == current.version + 1
    operation = DistributedOperation.objects.get(
        evaluación=current,
        operation_type="RESPONSE_SUBMITTED",
        status=DistributedOperation.Status.APPLIED,
    )
    assert operation.actor_role == SessionAccessToken.ActorRole.ADULT
    assert operation.device_id == "adult-device-1"
    assert OutboxEvent.objects.get(evaluación=current).operation == operation
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type="RESPONSE_SUBMITTED",
            status=DistributedOperation.Status.CONFLICT,
        ).count()
        == 1
    )


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
def test_other_approved_professional_cannot_access_owned_evaluation(evaluation):
    current, _, _ = evaluation
    other_professional = get_user_model().objects.create_user(
        username="other-owner", password="test-password"
    )
    ProfessionalProfile.objects.create(
        user=other_professional,
        status=ProfessionalProfile.Status.APPROVED,
    )
    client = APIClient()
    client.force_authenticate(other_professional)

    detail_response = client.get(f"/api/evaluaciones/{current.id}/")
    review_response = client.get(f"/api/evaluaciones/{current.id}/review/")

    assert detail_response.status_code == 404
    assert review_response.status_code == 404


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
    assert current.consent_records.count() == 1


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
def test_withdrawal_precedes_subsequent_capture(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()

    withdrawn = client.post(
        f"/api/evaluaciones/session/{current.session_code}/withdraw/",
        {"reason": "Retiro total"},
        format="json",
        **bearer(token),
    )
    capture = client.post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/events/",
        {"event_type": "AFTER_WITHDRAWAL"},
        format="json",
        **bearer(token),
    )

    assert withdrawn.status_code == 200
    assert capture.status_code == 403
    assert InteractionEvent.objects.filter(evaluación=current).count() == 0


@pytest.mark.django_db
def test_partial_withdrawal_revokes_only_selected_modalities(evaluation):
    current, _, _ = evaluation
    Consentimiento.objects.create(
        evaluación=current,
        accepted=True,
        accepted_logs=True,
        accepted_screenshots=True,
        accepted_audio=True,
        accepted_video=True,
    )
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/withdraw/",
        {"modalities": ["audio", "video"]},
        format="json",
        **bearer(token),
    )

    assert response.status_code == 200
    current.refresh_from_db()
    consent = current.consentimiento
    assert not consent.accepted_audio
    assert not consent.accepted_video
    assert consent.accepted_logs
    assert current.estado == Evaluación.Estado.IN_PROGRESS
    assert current.withdrawal_records.last().scope == "PARTIAL"
    assert ConsentRecord.objects.filter(evaluación=current).count() == 1


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
    assert list(current.pause_records.values_list("action", flat=True)) == [
        PauseRecord.Action.PAUSED,
        PauseRecord.Action.RESUMED,
    ]


@pytest.mark.django_db
def test_assent_checkpoint_pauses_and_blocks_capture_until_reaffirmed(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "adult-device"
    )
    client = APIClient()

    declined = client.post(
        f"/api/evaluaciones/session/{current.session_code}/assent/",
        {
            "decision": "DECLINED",
            "checkpoint": "ACTIVITY_1",
            "expected_version": current.version,
            "note": "El niño no desea continuar",
        },
        format="json",
        **bearer(token),
    )

    assert declined.status_code == 200
    assert declined.data["evaluacion"]["estado"] == Evaluación.Estado.PAUSED
    assert current.assent_records.last().decision == "DECLINED"
    assert current.pause_records.last().reason == "Asentimiento no vigente"

    blocked = client.post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/events/",
        {"event_type": "AFTER_DECLINED_ASSENT"},
        format="json",
        **bearer(token),
    )
    assert blocked.status_code == 409

    reaffirmed = client.post(
        f"/api/evaluaciones/session/{current.session_code}/assent/",
        {
            "decision": "ACCEPTED",
            "checkpoint": "ACTIVITY_1",
            "expected_version": declined.data["evaluacion"]["version"],
        },
        format="json",
        **bearer(token),
    )
    assert reaffirmed.status_code == 200

    resumed = client.post(
        f"/api/evaluaciones/session/{current.session_code}/resume/",
        {"expected_version": reaffirmed.data["evaluacion"]["version"]},
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


@pytest.mark.django_db
def test_interaction_event_replay_creates_one_effect(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    payload = {
        "event_type": "ITEM_VIEWED",
        "idempotency_key": str(uuid4()),
    }
    url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/events/"

    first = APIClient().post(url, payload, format="json", **bearer(token))
    replay = APIClient().post(url, payload, format="json", **bearer(token))

    assert first.status_code == 201
    assert replay.status_code == 201
    assert replay.data["idempotent_replay"] is True
    assert InteractionEvent.objects.filter(evaluación=current).count() == 1
    assert (
        DistributedOperation.objects.get(
            evaluación=current,
            operation_type="INTERACTION_EVENT_RECORDED",
        ).status
        == DistributedOperation.Status.APPLIED
    )


@pytest.mark.django_db
def test_state_change_persists_progress_event_in_outbox(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)

    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/pause/",
        {"expected_version": current.version},
        format="json",
        **bearer(token),
    )

    assert response.status_code == 200
    event = OutboxEvent.objects.get(evaluación=current)
    assert event.event_type == "EVALUATION_PROGRESS"
    assert event.payload["estado"] == Evaluación.Estado.PAUSED
    assert event.operation.status == DistributedOperation.Status.APPLIED
    assert event.operation.aggregate_id == str(current.id)


@pytest.mark.django_db
def test_outbox_failure_is_recovered_and_published_through_pending_batch(evaluation):
    current, _, _ = evaluation
    event = OutboxEvent.objects.create(
        evaluación=current,
        event_type="EVALUATION_PROGRESS",
        payload={"version": current.version},
    )

    with patch(
        "src.application.services.outbox_service.get_channel_layer", return_value=None
    ):
        assert deliver_outbox_event(event.id) is False

    event.refresh_from_db()
    assert event.publish_attempts == 1
    assert event.published_at is None
    assert event.next_attempt_at is not None

    # A restart only republishes events whose retry window has elapsed.
    event.next_attempt_at = timezone.now() - timedelta(seconds=1)
    event.save(update_fields=["next_attempt_at"])
    channel_layer = InMemoryChannelLayer()
    channel_name = async_to_sync(channel_layer.new_channel)()
    async_to_sync(channel_layer.group_add)(f"evaluation_{current.id}", channel_name)

    with patch(
        "src.application.services.outbox_service.get_channel_layer",
        return_value=channel_layer,
    ):
        assert publish_pending_outbox_events() == 1

    assert async_to_sync(channel_layer.receive)(channel_name) == {
        "type": "evaluation_update",
        "event": "progress",
        "data": {"version": current.version},
    }
    event.refresh_from_db()
    assert event.publish_attempts == 2
    assert event.published_at is not None
    assert event.next_attempt_at is None
    assert event.last_error == ""


@pytest.mark.django_db
def test_outbox_retry_schedule_and_quarantine_exclude_events_from_pending_batch(
    evaluation,
):
    current, _, _ = evaluation
    event = OutboxEvent.objects.create(
        evaluación=current,
        event_type="EVALUATION_PROGRESS",
        payload={"version": current.version},
    )
    scheduled = OutboxEvent.objects.create(
        evaluación=current,
        event_type="EVALUATION_PROGRESS",
        payload={"version": current.version},
        next_attempt_at=timezone.now() + timedelta(minutes=1),
    )
    quarantined = OutboxEvent.objects.create(
        evaluación=current,
        event_type="EVALUATION_PROGRESS",
        payload={"version": current.version},
        quarantined_at=timezone.now(),
    )
    first_attempt = timezone.now()
    second_attempt = first_attempt + timedelta(seconds=10)
    third_attempt = second_attempt + timedelta(seconds=10)

    with (
        override_settings(OUTBOX_MAX_ATTEMPTS=3),
        patch(
            "src.application.services.outbox_service.get_channel_layer",
            return_value=None,
        ),
        patch(
            "src.application.services.outbox_service.timezone.now",
            side_effect=[first_attempt, second_attempt, third_attempt],
        ),
    ):
        assert deliver_outbox_event(event.id) is False
        event.refresh_from_db()
        assert event.publish_attempts == 1
        assert event.next_attempt_at == first_attempt + timedelta(seconds=1)

        assert deliver_outbox_event(event.id) is False
        event.refresh_from_db()
        assert event.publish_attempts == 2
        assert event.next_attempt_at == second_attempt + timedelta(seconds=2)

        assert deliver_outbox_event(event.id) is False

    event.refresh_from_db()
    assert event.publish_attempts == 3
    assert event.quarantined_at == third_attempt
    assert event.next_attempt_at is None

    channel_layer = InMemoryChannelLayer()
    with patch(
        "src.application.services.outbox_service.get_channel_layer",
        return_value=channel_layer,
    ):
        assert publish_pending_outbox_events() == 0

    scheduled.refresh_from_db()
    quarantined.refresh_from_db()
    assert scheduled.publish_attempts == 0
    assert quarantined.publish_attempts == 0


@pytest.mark.django_db
def test_consent_conflict_and_rejection_are_stably_replayed(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()
    url = f"/api/evaluaciones/session/{current.session_code}/consent/"
    modalities = {"logs": True, "screenshots": False, "audio": False, "video": False}
    conflict_payload = {
        "accepted": True,
        "assent_confirmed": True,
        "modalities": modalities,
        "expected_version": current.version + 1,
        "idempotency_key": str(uuid4()),
    }
    rejected_payload = {
        "accepted": False,
        "assent_confirmed": True,
        "modalities": modalities,
        "expected_version": current.version,
        "idempotency_key": str(uuid4()),
    }
    accepted_payload = {
        "accepted": True,
        "assent_confirmed": True,
        "modalities": modalities,
        "expected_version": current.version,
        "idempotency_key": str(uuid4()),
    }

    conflict = client.post(url, conflict_payload, format="json", **bearer(token))
    conflict_replay = client.post(url, conflict_payload, format="json", **bearer(token))
    rejected = client.post(url, rejected_payload, format="json", **bearer(token))
    rejected_replay = client.post(url, rejected_payload, format="json", **bearer(token))
    accepted = client.post(url, accepted_payload, format="json", **bearer(token))
    accepted_replay = client.post(url, accepted_payload, format="json", **bearer(token))

    assert conflict.status_code == conflict_replay.status_code == 409
    assert conflict_replay.data["idempotent_replay"] is True
    assert rejected.status_code == rejected_replay.status_code == 400
    assert rejected_replay.data["idempotent_replay"] is True
    assert accepted.status_code == accepted_replay.status_code == 200
    assert accepted_replay.data["idempotent_replay"] is True
    assert Consentimiento.objects.filter(evaluación=current).count() == 1
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type="CONSENT_ACCEPTED",
            status=DistributedOperation.Status.CONFLICT,
        ).count()
        == 1
    )
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type="CONSENT_ACCEPTED",
            status=DistributedOperation.Status.REJECTED,
        ).count()
        == 1
    )


@pytest.mark.django_db
def test_start_session_rejection_is_stably_replayed(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    payload = {"expected_version": current.version, "idempotency_key": str(uuid4())}
    url = f"/api/evaluaciones/session/{current.session_code}/start/"

    first = APIClient().post(url, payload, format="json", **bearer(token))
    replay = APIClient().post(url, payload, format="json", **bearer(token))

    assert first.status_code == replay.status_code == 400
    assert replay.data["idempotent_replay"] is True
    assert (
        DistributedOperation.objects.get(
            evaluación=current,
            operation_type="SESSION_ITEM_STARTED",
        ).status
        == DistributedOperation.Status.REJECTED
    )


@pytest.mark.django_db
def test_child_data_and_session_finish_conflicts_are_stably_replayed(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()
    child_data_payload = {
        "expected_version": current.version + 1,
        "idempotency_key": str(uuid4()),
    }
    finish_payload = {
        "expected_version": current.version + 1,
        "idempotency_key": str(uuid4()),
    }

    child_data_url = (
        f"/api/evaluaciones/session/{current.session_code}/complete-child-data/"
    )
    finish_url = f"/api/evaluaciones/session/{current.session_code}/finish/"
    child_data = client.post(
        child_data_url, child_data_payload, format="json", **bearer(token)
    )
    child_data_replay = client.post(
        child_data_url, child_data_payload, format="json", **bearer(token)
    )
    finish = client.post(finish_url, finish_payload, format="json", **bearer(token))
    finish_replay = client.post(
        finish_url, finish_payload, format="json", **bearer(token)
    )

    assert child_data.status_code == child_data_replay.status_code == 409
    assert child_data_replay.data["idempotent_replay"] is True
    assert finish.status_code == finish_replay.status_code == 409
    assert finish_replay.data["idempotent_replay"] is True
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type__in=["CHILD_DATA_COMPLETED", "SESSION_FINISHED"],
            status=DistributedOperation.Status.CONFLICT,
        ).count()
        == 2
    )


@pytest.mark.django_db
def test_review_failures_are_persisted_and_stably_replayed(evaluation):
    current, item, psychologist = evaluation
    client = APIClient()
    client.force_authenticate(psychologist)
    receipt = client.post(
        f"/api/evaluaciones/{current.id}/review/assignment/receive/", {}, format="json"
    )
    assert receipt.status_code in {200, 201}
    review_url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/review/"
    invalid_payload = {"final_result": "INVALID", "idempotency_key": str(uuid4())}

    invalid = client.patch(review_url, invalid_payload, format="json")
    invalid_replay = client.patch(review_url, invalid_payload, format="json")

    item.estado = EvaluacionItem.Estado.NEEDS_REVIEW
    item.final_result = None
    item.save(update_fields=["estado", "final_result"])
    complete_url = f"/api/evaluaciones/{current.id}/review/complete/"
    pending_payload = {"idempotency_key": str(uuid4())}
    pending = client.post(complete_url, pending_payload, format="json")
    pending_replay = client.post(complete_url, pending_payload, format="json")

    assert invalid.status_code == invalid_replay.status_code == 400
    assert invalid_replay.data["idempotent_replay"] is True
    assert pending.status_code == pending_replay.status_code == 409
    assert pending_replay.data["idempotent_replay"] is True
    assert (
        DistributedOperation.objects.get(
            evaluación=current,
            operation_type="ITEM_REVIEWED",
        ).status
        == DistributedOperation.Status.REJECTED
    )
    assert (
        DistributedOperation.objects.get(
            evaluación=current,
            operation_type="EVALUATION_VALIDATED",
        ).status
        == DistributedOperation.Status.CONFLICT
    )


@pytest.mark.django_db
def test_auto_result_replay_applies_the_result_once(evaluation):
    current, item, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    operation_id = str(uuid4())
    url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/auto-result/"
    payload = {
        "resultado": "CORRECT",
        "expected_version": current.version,
        "duration_ms": 125,
    }

    with (
        patch.object(
            dayc2_flow_service,
            "complete_current_item",
            return_value=(item, {}),
        ) as complete_current_item,
        patch("src.api.evaluaciones.views.sincronizar_item_con_respuesta"),
        patch.object(dayc2_flow_service, "get_current_task_payload", return_value=None),
    ):
        first = APIClient().post(
            url,
            payload,
            format="json",
            HTTP_IDEMPOTENCY_KEY=operation_id,
            **bearer(token),
        )
        replay = APIClient().post(
            url,
            payload,
            format="json",
            HTTP_IDEMPOTENCY_KEY=operation_id,
            **bearer(token),
        )

    assert first.status_code == replay.status_code == 200
    assert replay.data["idempotent_replay"] is True
    assert replay.data["version"] == first.data["version"]
    assert complete_current_item.call_count == 1
    assert (
        Evidencia.objects.filter(
            evaluación=current, type=Evidencia.Tipo.SYSTEM_RESULT
        ).count()
        == 1
    )
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type="AUTO_RESULT_SUBMITTED",
            status=DistributedOperation.Status.APPLIED,
        ).count()
        == 1
    )


@pytest.mark.django_db
def test_pause_and_resume_replays_create_each_transition_once(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    client = APIClient()
    pause_url = f"/api/evaluaciones/session/{current.session_code}/pause/"
    pause_operation_id = str(uuid4())

    paused = client.post(
        pause_url,
        {"expected_version": current.version},
        format="json",
        HTTP_IDEMPOTENCY_KEY=pause_operation_id,
        **bearer(token),
    )
    paused_replay = client.post(
        pause_url,
        {"expected_version": current.version},
        format="json",
        HTTP_IDEMPOTENCY_KEY=pause_operation_id,
        **bearer(token),
    )
    resume_url = f"/api/evaluaciones/session/{current.session_code}/resume/"
    resume_operation_id = str(uuid4())
    resumed = client.post(
        resume_url,
        {"expected_version": paused.data["evaluacion"]["version"]},
        format="json",
        HTTP_IDEMPOTENCY_KEY=resume_operation_id,
        **bearer(token),
    )
    resumed_replay = client.post(
        resume_url,
        {"expected_version": paused.data["evaluacion"]["version"]},
        format="json",
        HTTP_IDEMPOTENCY_KEY=resume_operation_id,
        **bearer(token),
    )

    assert paused.status_code == paused_replay.status_code == 200
    assert resumed.status_code == resumed_replay.status_code == 200
    assert paused_replay.data["idempotent_replay"] is True
    assert resumed_replay.data["idempotent_replay"] is True
    assert list(current.pause_records.values_list("action", flat=True)) == [
        PauseRecord.Action.PAUSED,
        PauseRecord.Action.RESUMED,
    ]
    assert (
        DistributedOperation.objects.filter(
            evaluación=current,
            operation_type__in=["SESSION_PAUSED", "SESSION_RESUMED"],
            status=DistributedOperation.Status.APPLIED,
        ).count()
        == 2
    )


@pytest.mark.django_db(transaction=True)
def test_endpoint_outbox_survives_post_commit_failure_and_is_recovered(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)
    url = f"/api/evaluaciones/session/{current.session_code}/pause/"

    with patch(
        "src.application.services.outbox_service.get_channel_layer", return_value=None
    ):
        response = APIClient().post(
            url,
            {"expected_version": current.version, "idempotency_key": str(uuid4())},
            format="json",
            **bearer(token),
        )

    assert response.status_code == 200
    event = OutboxEvent.objects.get(evaluación=current)
    assert event.operation.status == DistributedOperation.Status.APPLIED
    assert event.published_at is None
    assert event.publish_attempts == 1
    assert event.next_attempt_at is not None

    event.next_attempt_at = timezone.now() - timedelta(seconds=1)
    event.save(update_fields=["next_attempt_at"])
    channel_layer = InMemoryChannelLayer()
    channel_name = async_to_sync(channel_layer.new_channel)()
    async_to_sync(channel_layer.group_add)(f"evaluation_{current.id}", channel_name)
    with patch(
        "src.application.services.outbox_service.get_channel_layer",
        return_value=channel_layer,
    ):
        assert publish_pending_outbox_events() == 1

    assert (
        async_to_sync(channel_layer.receive)(channel_name)["data"]["estado"] == "PAUSED"
    )
    event.refresh_from_db()
    assert event.published_at is not None
    assert event.publish_attempts == 2


@pytest.mark.django_db
def test_session_state_is_queryable_when_redis_is_unavailable(evaluation):
    current, _, _ = evaluation
    token = ensure_session_token(current, SessionAccessToken.ActorRole.ADULT)

    with patch(
        "src.api.evaluaciones.views.cache.get",
        side_effect=RuntimeError("Redis unavailable"),
    ) as cache_get:
        response = APIClient().get(
            f"/api/evaluaciones/session/{current.session_code}/state/",
            **bearer(token),
        )

    assert response.status_code == 200
    assert response.data["evaluacion"]["id"] == str(current.id)
    assert response.data["evaluacion"]["estado"] == Evaluación.Estado.IN_PROGRESS
    cache_get.assert_not_called()

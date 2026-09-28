"""Phase 8 fault scenarios with a model-independent version oracle."""

import os
from datetime import date
from unittest.mock import patch
from uuid import uuid4

import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework.test import APIClient

from tests.technical.harness import VersionOracle, scenario_manifest
from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    DistributedOperation,
    Evaluación,
    EvaluacionItem,
    OutboxEvent,
    SessionAccessToken,
)
from src.api.evaluaciones.serializers import ensure_session_token
from src.application.services.dayc2_flow_service import dayc2_flow_service
from src.application.services.outbox_service import (
    deliver_outbox_event,
    publish_pending_outbox_events,
)


def bearer(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}


@pytest.fixture
def evaluation():
    psychologist = get_user_model().objects.create_user(
        username=f"harness-{uuid4()}", password="test-password"
    )
    ProfessionalProfile.objects.create(
        user=psychologist, status=ProfessionalProfile.Status.APPROVED
    )
    child = Niño.objects.create(
        nombre="Niño técnico",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=psychologist,
    )
    current = Evaluación.objects.create(
        niño=child,
        psychologist_id=str(psychologist.id),
        professional=psychologist,
        estado=Evaluación.Estado.IN_PROGRESS,
        edad_meses=60,
        session_code=f"H{uuid4().hex[:5].upper()}",
    )
    item = EvaluacionItem.objects.create(
        evaluación=current,
        item_id="COGNITIVO_045",
        area="COGNITIVO",
        estado=EvaluacionItem.Estado.IN_PROGRESS,
    )
    current.current_item_id = item.item_id
    current.save(update_fields=["current_item_id"])
    return current, item


def submit_response(current, item, token, operation_id, expected_version):
    payload = {
        "item_id": item.item_id,
        "resultado": "CORRECT",
        "tiempo_respuesta_ms": 100,
        "expected_version": expected_version,
        "idempotency_key": str(operation_id),
    }
    with (
        patch.object(
            dayc2_flow_service, "complete_current_item", return_value=(item, {})
        ),
        patch("src.api.evaluaciones.views.sincronizar_item_con_respuesta"),
        patch.object(dayc2_flow_service, "get_current_task_payload", return_value=None),
        patch("src.api.evaluaciones.views.clear_operation"),
    ):
        return APIClient().post(
            f"/api/evaluaciones/{current.id}/respuesta/",
            payload,
            format="json",
            **bearer(token),
        )


@pytest.mark.django_db(transaction=True)
def test_normal_delayed_offline_replay_and_conflict(evaluation):
    current, item = evaluation
    token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "harness-a"
    )
    oracle = VersionOracle(current.version)
    operation_id = uuid4()

    # The delayed/offline operation is persisted by the caller before this send.
    assert oracle.submit(str(operation_id), current.version) == "applied"
    response = submit_response(current, item, token, operation_id, current.version)
    assert response.status_code == 200
    assert response.data["version"] == oracle.version

    replay = submit_response(current, item, token, operation_id, current.version)
    assert replay.status_code == 200
    assert replay.data["idempotent_replay"] is True
    assert oracle.submit(str(operation_id), current.version) == "replay"

    conflict_id = uuid4()
    assert oracle.submit(str(conflict_id), current.version) == "conflict"
    conflict = submit_response(current, item, token, conflict_id, current.version)
    assert conflict.status_code == 409
    current.refresh_from_db()
    applied_ids = set(
        str(value)
        for value in DistributedOperation.objects.filter(
            evaluación=current, status=DistributedOperation.Status.APPLIED
        ).values_list("operation_id", flat=True)
    )
    oracle.assert_observed(version=current.version, applied_ids=applied_ids)


@pytest.mark.django_db
def test_reconnect_and_restart_publish_durable_outbox(evaluation):
    current, _ = evaluation
    event = OutboxEvent.objects.create(
        evaluación=current, event_type="EVALUATION_PROGRESS", payload={"version": 1}
    )
    with patch(
        "src.application.services.outbox_service.get_channel_layer", return_value=None
    ):
        assert deliver_outbox_event(event.id) is False
    event.refresh_from_db()
    assert event.published_at is None
    assert event.publish_attempts == 1

    event.next_attempt_at = None
    event.save(update_fields=["next_attempt_at"])
    assert publish_pending_outbox_events() == 1
    event.refresh_from_db()
    assert event.published_at is not None


@pytest.mark.django_db
def test_reordering_and_omission_oracles_are_deterministic(evaluation):
    current, _ = evaluation
    first = uuid4()
    second = uuid4()
    DistributedOperation.objects.create(
        operation_id=first,
        evaluación=current,
        actor_role="ADULT",
        device_id="harness-a",
        device_sequence=2,
        aggregate_type="EVALUATION",
        aggregate_id=str(current.id),
        operation_type="RESPONSE_SUBMITTED",
        status=DistributedOperation.Status.APPLIED,
    )
    with pytest.raises(IntegrityError):
        DistributedOperation.objects.create(
            operation_id=second,
            evaluación=current,
            actor_role="ADULT",
            device_id="harness-a",
            device_sequence=2,
            aggregate_type="EVALUATION",
            aggregate_id=str(current.id),
            operation_type="RESPONSE_SUBMITTED",
        )

    oracle = VersionOracle(0)
    assert oracle.submit(str(first), 0) == "applied"
    with pytest.raises(AssertionError):
        oracle.assert_observed(version=1, applied_ids=set())


@pytest.mark.django_db
def test_storage_failure_does_not_create_durable_asset(evaluation):
    from django.core.files.base import ContentFile

    from src.api.evaluaciones.models import Evidencia, EvidenceAsset

    current, item = evaluation
    evidence = Evidencia.objects.create(
        evaluación=current, evaluación_item=item, type="SCREENSHOT"
    )
    with patch(
        "src.api.evaluaciones.models.private_evidence_storage.save",
        side_effect=OSError("disk full"),
    ):
        asset = EvidenceAsset(evidencia=evidence, kind="ORIGINAL")
        with pytest.raises(OSError):
            asset.file.save("sample.png", ContentFile(b"data"), save=True)
    assert EvidenceAsset.objects.filter(evidencia=evidence).count() == 0


@pytest.mark.django_db
def test_lightweight_load_without_locust(evaluation):
    sessions = int(os.environ.get("DAYC_HARNESS_SESSIONS", "1"))
    assert sessions in {1, 10, 25, 50, 100}
    assert (
        scenario_manifest(seed=0, sessions=sessions)["config"]["sessions"] == sessions
    )
    current, _ = evaluation
    evaluations = Evaluación.objects.bulk_create(
        [
            Evaluación(
                niño=current.niño,
                psychologist_id=current.psychologist_id,
                professional=current.professional,
                estado=Evaluación.Estado.IN_PROGRESS,
                edad_meses=current.edad_meses,
                session_code=f"LOAD{number:05d}",
            )
            for number in range(sessions)
        ]
    )
    OutboxEvent.objects.bulk_create(
        [
            OutboxEvent(
                evaluación=item,
                event_type="EVALUATION_PROGRESS",
                payload={"version": 0},
            )
            for item in evaluations
        ]
    )
    assert publish_pending_outbox_events(limit=sessions) == sessions
    assert OutboxEvent.objects.filter(published_at__isnull=False).count() == sessions

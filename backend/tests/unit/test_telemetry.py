import json
from datetime import date, timedelta
from io import StringIO
from uuid import uuid4

import pytest
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.utils import timezone

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import (
    DistributedOperation,
    Evaluación,
    OutboxEvent,
    TelemetryEvent,
)
from src.application.services.operation_context import bind_operation, clear_operation
from src.application.services.provenance_service import provenance_service
from src.application.services.telemetry_service import telemetry_report


@pytest.fixture
def evaluation():
    user = get_user_model().objects.create_user(username="telemetry", password="test")
    ProfessionalProfile.objects.create(
        user=user, status=ProfessionalProfile.Status.APPROVED
    )
    child = Niño.objects.create(
        nombre="Niño telemetría",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=user,
    )
    return Evaluación.objects.create(
        niño=child,
        psychologist_id=str(user.id),
        professional=user,
        edad_meses=60,
        session_code="METRIC",
    )


@pytest.mark.django_db
def test_report_counts_durable_operation_and_outbox_signals(evaluation):
    operation = DistributedOperation.objects.create(
        evaluación=evaluation,
        actor_role="SYSTEM",
        aggregate_type="EVALUATION",
        aggregate_id=str(evaluation.id),
        operation_type="TEST",
        status=DistributedOperation.Status.CONFLICT,
        applied_at=timezone.now() + timedelta(milliseconds=25),
    )
    OutboxEvent.objects.create(
        evaluación=evaluation,
        operation=operation,
        event_type="TEST",
        publish_attempts=2,
    )
    TelemetryEvent.objects.create(
        evaluación=evaluation,
        operation=operation,
        kind=TelemetryEvent.Kind.DUPLICATE,
    )
    TelemetryEvent.objects.create(
        evaluación=evaluation,
        operation=operation,
        kind=TelemetryEvent.Kind.OUTBOX_RETRY,
    )

    report = telemetry_report()

    assert report["operations"]["conflicts"] == 1
    assert report["operations"]["duplicates"] == 1
    assert report["operations"]["latency"]["count"] == 1
    assert report["outbox"]["backlog"] == 1
    assert report["outbox"]["retries"] == 1


@pytest.mark.django_db
def test_operation_id_is_attached_to_provenance_activity(evaluation):
    operation_id = uuid4()
    bind_operation(operation_id)
    try:
        activity, _ = provenance_service.record(
            evaluation,
            "telemetry_test",
            [("Test", "output", "Salida", {})],
        )
    finally:
        clear_operation()

    assert activity.attributes["operation_id"] == str(operation_id)


@pytest.mark.django_db
def test_telemetry_report_command_outputs_json(evaluation):
    output = StringIO()

    call_command("telemetry_report", stdout=output)

    assert json.loads(output.getvalue())["lineage"]["evaluations"] == 1

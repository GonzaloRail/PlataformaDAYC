"""Durable post-commit publication for evaluation events."""

import logging
from datetime import timedelta

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.conf import settings
from django.db.models import Q
from django.utils import timezone

from src.application.services.telemetry_service import record_telemetry

logger = logging.getLogger(__name__)


def deliver_outbox_event(event_id):
    """Publish one pending event, retaining failures for a future attempt."""
    from src.api.evaluaciones.models import OutboxEvent

    event = OutboxEvent.objects.filter(
        pk=event_id, published_at__isnull=True, quarantined_at__isnull=True
    ).first()
    if event is None:
        return False

    event.publish_attempts += 1
    channel_layer = get_channel_layer()
    try:
        if channel_layer is None:
            raise RuntimeError("Channel layer unavailable")
        async_to_sync(channel_layer.group_send)(
            f"evaluation_{event.evaluación_id}",
            {"type": "evaluation_update", "event": "progress", "data": event.payload},
        )
    except Exception as exc:
        event.last_error = str(exc)
        max_attempts = getattr(settings, "OUTBOX_MAX_ATTEMPTS", 5)
        if event.publish_attempts >= max_attempts:
            event.quarantined_at = timezone.now()
            event.next_attempt_at = None
        else:
            delay_seconds = min(300, 2 ** (event.publish_attempts - 1))
            event.next_attempt_at = timezone.now() + timedelta(seconds=delay_seconds)
        event.save(
            update_fields=[
                "publish_attempts",
                "last_error",
                "next_attempt_at",
                "quarantined_at",
            ]
        )
        record_telemetry(
            "OUTBOX_RETRY",
            operation=event.operation,
            evaluation=event.evaluación,
            attributes={
                "attempt": event.publish_attempts,
                "quarantined": bool(event.quarantined_at),
            },
        )
        if event.quarantined_at:
            record_telemetry(
                "ERROR",
                operation=event.operation,
                evaluation=event.evaluación,
                attributes={"source": "outbox", "attempt": event.publish_attempts},
            )
        logger.exception("Could not publish outbox event %s", event.id)
        return False

    event.published_at = timezone.now()
    event.last_error = ""
    event.next_attempt_at = None
    event.save(
        update_fields=[
            "publish_attempts",
            "published_at",
            "last_error",
            "next_attempt_at",
        ]
    )
    kind = "OUTBOX_RECOVERED" if event.publish_attempts > 1 else "OUTBOX_PUBLISHED"
    record_telemetry(
        kind,
        operation=event.operation,
        evaluation=event.evaluación,
        attributes={"attempt": event.publish_attempts, "event_type": event.event_type},
    )
    return True


def publish_pending_outbox_events(limit=100):
    """Process a bounded batch so publication resumes after a restart."""
    from src.api.evaluaciones.models import OutboxEvent

    event_ids = list(
        OutboxEvent.objects.filter(
            published_at__isnull=True,
            quarantined_at__isnull=True,
        )
        .filter(
            Q(next_attempt_at__isnull=True) | Q(next_attempt_at__lte=timezone.now())
        )
        .order_by("created_at")
        .values_list("id", flat=True)[:limit]
    )
    return sum(deliver_outbox_event(event_id) for event_id in event_ids)

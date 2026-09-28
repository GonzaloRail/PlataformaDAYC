"""Durable telemetry and reproducible operational metrics."""

from __future__ import annotations

from datetime import datetime
from statistics import median

from django.db.models import Count
from django.utils import timezone


def record_telemetry(kind, *, operation=None, evaluation=None, attributes=None):
    from src.api.evaluaciones.models import TelemetryEvent

    return TelemetryEvent.objects.create(
        kind=kind,
        operation=operation,
        evaluación=evaluation or getattr(operation, "evaluación", None),
        attributes=attributes or {},
    )


def _latency_summary(operations):
    values = [
        (operation.applied_at - operation.created_at).total_seconds() * 1000
        for operation in operations
        if operation.applied_at
    ]
    if not values:
        return {"count": 0, "average_ms": 0, "p50_ms": 0, "max_ms": 0}
    return {
        "count": len(values),
        "average_ms": round(sum(values) / len(values), 2),
        "p50_ms": round(median(values), 2),
        "max_ms": round(max(values), 2),
    }


def _throughput_per_minute(operations):
    timestamps = list(operations.values_list("created_at", flat=True))
    if not timestamps:
        return 0
    elapsed_minutes = max((max(timestamps) - min(timestamps)).total_seconds() / 60, 1)
    return round(len(timestamps) / elapsed_minutes, 2)


def telemetry_report(since=None):
    """Return metrics computed solely from durable backend records."""
    from src.api.evaluaciones.models import (
        EvaluationClosure,
        EvidenceAsset,
        Evaluación,
        OutboxEvent,
        ProfessionalReviewAssignment,
        TelemetryEvent,
        DistributedOperation,
    )
    from src.application.services.provenance_service import provenance_service

    since = since or timezone.make_aware(datetime.min)
    operations = DistributedOperation.objects.filter(created_at__gte=since)
    outbox = OutboxEvent.objects.filter(created_at__gte=since)
    telemetry = TelemetryEvent.objects.filter(occurred_at__gte=since)
    status_counts = dict(
        operations.values("status")
        .annotate(count=Count("id"))
        .values_list("status", "count")
    )
    event_counts = dict(
        telemetry.values("kind")
        .annotate(count=Count("id"))
        .values_list("kind", "count")
    )
    unresolved_outbox = outbox.filter(published_at__isnull=True)
    lineage_evaluations = Evaluación.objects.filter(created_at__gte=since)
    incomplete_lineage = sum(
        bool(provenance_service.detect_issues(item)) for item in lineage_evaluations
    )

    return {
        "generated_at": timezone.now().isoformat(),
        "since": since.isoformat(),
        "operations": {
            "total": operations.count(),
            "by_status": status_counts,
            "latency": _latency_summary(operations.only("created_at", "applied_at")),
            "throughput_per_minute": _throughput_per_minute(operations),
            "pending": status_counts.get("RECEIVED", 0),
            "converged": status_counts.get("RECEIVED", 0) == 0,
            "errors": status_counts.get("REJECTED", 0)
            + status_counts.get("QUARANTINED", 0)
            + event_counts.get("ERROR", 0),
            "conflicts": status_counts.get("CONFLICT", 0),
            "duplicates": event_counts.get("DUPLICATE", 0),
        },
        "outbox": {
            "backlog": unresolved_outbox.count(),
            "quarantined": unresolved_outbox.filter(
                quarantined_at__isnull=False
            ).count(),
            "retries": event_counts.get("OUTBOX_RETRY", 0),
            "recoveries": event_counts.get("OUTBOX_RECOVERED", 0),
        },
        "workflow": {
            "receipts": ProfessionalReviewAssignment.objects.filter(
                assigned_at__gte=since, received_at__isnull=False
            ).count(),
            "closures": EvaluationClosure.objects.filter(closed_at__gte=since).count(),
            "evidence_assets": EvidenceAsset.objects.filter(
                created_at__gte=since
            ).count(),
        },
        "lineage": {
            "evaluations": lineage_evaluations.count(),
            "complete": lineage_evaluations.count() - incomplete_lineage,
            "incomplete": incomplete_lineage,
        },
    }

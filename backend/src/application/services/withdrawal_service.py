"""Apply participant withdrawals without deleting the audit trail."""

from django.utils import timezone

from src.api.evaluaciones.models import EvidenceAsset, Evidencia, OutboxEvent

MODALITY_TYPES = {
    "logs": (Evidencia.Tipo.LOG, Evidencia.Tipo.TIME_EVENT),
    "screenshots": (Evidencia.Tipo.SCREENSHOT, Evidencia.Tipo.CAMERA_FRAME),
    "audio": (Evidencia.Tipo.AUDIO,),
    "video": (Evidencia.Tipo.VIDEO,),
}


def apply_withdrawal(evaluacion, modalities: list[str]) -> int:
    """Erase selected binary evidence and cancel unpublished work atomically.

    Database rows remain as an immutable audit record, but their binary files are
    removed and the rows are marked so they cannot be served or processed again.
    An empty modality list represents a full withdrawal.
    """
    selected_types = [
        evidence_type
        for modality, evidence_types in MODALITY_TYPES.items()
        if not modalities or modality in modalities
        for evidence_type in evidence_types
    ]
    evidences = list(
        Evidencia.objects.filter(
            evaluación=evaluacion, type__in=selected_types
        ).prefetch_related("assets")
    )
    now = timezone.now()
    for evidencia in evidences:
        if evidencia.file:
            evidencia.file.storage.delete(evidencia.file.name)
        for asset in evidencia.assets.all():
            asset.file.storage.delete(asset.file.name)

    evidence_ids = [evidencia.id for evidencia in evidences]
    if evidence_ids:
        Evidencia.objects.filter(id__in=evidence_ids).update(
            retention_expires_at=now,
            withdrawn_at=now,
            withdrawal_action="ERASED",
        )
        EvidenceAsset.objects.filter(evidencia_id__in=evidence_ids).update(
            withdrawn_at=now,
            withdrawal_action="ERASED",
        )

    # Events not yet delivered must not expose withdrawn session data later.
    OutboxEvent.objects.filter(
        evaluación=evaluacion, published_at__isnull=True, quarantined_at__isnull=True
    ).update(quarantined_at=now, last_error="Cancelado por retiro de consentimiento")
    return len(evidence_ids)

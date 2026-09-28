"""Models for Evaluación and related entities"""

import hashlib
import json
import uuid
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from src.api.children.models import Niño
from .storage import inspect_uploaded_evidence, private_evidence_storage


def evidencia_upload_path(instance, filename):
    """Store sensitive evidence under an evaluation/item scoped path."""
    evidence = getattr(instance, "evidencia", instance)
    item_id = (
        evidence.evaluación_item.item_id if evidence.evaluación_item else "general"
    )
    suffix = filename.rsplit(".", 1)[-1].lower() if "." in filename else "bin"
    return f"evidencias/evaluacion_{evidence.evaluación_id}/item_{item_id}/{uuid.uuid4().hex}.{suffix}"


class Evaluación(models.Model):
    """Evaluation entity - represents a DAYC-2 evaluation session"""

    class Estado(models.TextChoices):
        INITIATED = "INITIATED", "Iniciada"
        IN_PROGRESS = "IN_PROGRESS", "En Progreso"
        COMPLETED = "COMPLETED", "Completada"
        STOPPED = "STOPPED", "Detenida"
        ARCHIVED = "ARCHIVED", "Archivada"
        WAITING_CHILD_DATA = "WAITING_CHILD_DATA", "Esperando datos del niño"
        WAITING_CONSENT = "WAITING_CONSENT", "Esperando consentimiento"
        PENDING_REVIEW = "PENDING_REVIEW", "Pendiente de revisión"
        REVIEW_IN_PROGRESS = "REVIEW_IN_PROGRESS", "Revisión en progreso"
        PAUSED = "PAUSED", "En pausa"
        VALIDATED = "VALIDATED", "Validada"
        CANCELLED = "CANCELLED", "Cancelada"

    class ModoEvaluacion(models.TextChoices):
        SYNCHRONOUS = "SYNCHRONOUS", "Sincrónica"
        DEFERRED = "DEFERRED", "Diferida"
        HYBRID = "HYBRID", "Híbrida"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    niño = models.ForeignKey(
        Niño, on_delete=models.CASCADE, related_name="evaluaciones"
    )
    # Retained temporarily to preserve historical rows during the migration to
    # a referential owner. Active authorization uses ``professional``.
    psychologist_id = models.CharField(max_length=64, null=True, blank=True)
    professional = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="professional_evaluations",
        null=True,
        blank=True,
    )
    estado = models.CharField(
        max_length=20, choices=Estado.choices, default=Estado.INITIATED
    )
    edad_meses = models.IntegerField(null=True, blank=True)
    session_code = models.CharField(max_length=10, unique=True)
    session_token = models.CharField(
        max_length=128, null=True, blank=True, db_index=True
    )
    session_expires_at = models.DateTimeField(null=True, blank=True)
    modo_evaluacion = models.CharField(
        max_length=20, choices=ModoEvaluacion.choices, default=ModoEvaluacion.HYBRID
    )
    current_area = models.CharField(max_length=50, default="COGNITIVO")
    current_area_index = models.IntegerField(default=0)
    current_item_id = models.CharField(max_length=80, null=True, blank=True)
    version = models.PositiveBigIntegerField(default=0)
    child_data_completed = models.BooleanField(default=True)
    preliminary_calculated_at = models.DateTimeField(null=True, blank=True)
    validated_calculated_at = models.DateTimeField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluaciones"
        verbose_name = "Evaluación"
        verbose_name_plural = "Evaluaciones"
        indexes = [
            models.Index(
                fields=["professional", "created_at"], name="eval_prof_created_idx"
            )
        ]

    def __str__(self):
        return f"Evaluación {self.id} - {self.niño.nombre} ({self.estado})"


class DistributedOperation(models.Model):
    """Durable envelope for a client or server operation in a session."""

    class Status(models.TextChoices):
        RECEIVED = "RECEIVED", "Recibida"
        APPLIED = "APPLIED", "Aplicada"
        DUPLICATE = "DUPLICATE", "Duplicada"
        CONFLICT = "CONFLICT", "Conflicto"
        REJECTED = "REJECTED", "Rechazada"
        QUARANTINED = "QUARANTINED", "En cuarentena"

    operation_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="distributed_operations"
    )
    actor_role = models.CharField(max_length=20)
    actor_id = models.CharField(max_length=128, blank=True)
    device_id = models.CharField(max_length=128, blank=True)
    device_sequence = models.PositiveBigIntegerField(null=True, blank=True)
    aggregate_type = models.CharField(max_length=80)
    aggregate_id = models.CharField(max_length=128)
    operation_type = models.CharField(max_length=80)
    schema_version = models.PositiveSmallIntegerField(default=1)
    base_version = models.PositiveBigIntegerField(null=True, blank=True)
    occurred_at = models.DateTimeField(null=True, blank=True)
    payload = models.JSONField(default=dict)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.RECEIVED
    )
    result = models.JSONField(default=dict, blank=True)
    response_status = models.PositiveSmallIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    applied_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "distributed_operations"
        indexes = [
            models.Index(
                fields=["evaluación", "created_at"], name="distribut_evaluac_3f7591_idx"
            ),
            models.Index(
                fields=["evaluación", "device_id", "device_sequence"],
                name="distribut_evaluac_6f4c20_idx",
            ),
            models.Index(
                fields=["evaluación", "status"], name="distribut_evaluac_d01c5b_idx"
            ),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["evaluación", "device_id", "device_sequence"],
                condition=models.Q(device_sequence__isnull=False),
                name="unique_evaluation_device_sequence",
            )
        ]


class OutboxEvent(models.Model):
    """Event retained durably until publication succeeds after commit."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="outbox_events"
    )
    operation = models.ForeignKey(
        DistributedOperation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="outbox_events",
    )
    event_type = models.CharField(max_length=80)
    payload = models.JSONField(default=dict)
    publish_attempts = models.PositiveIntegerField(default=0)
    next_attempt_at = models.DateTimeField(null=True, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    quarantined_at = models.DateTimeField(null=True, blank=True)
    last_error = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluation_outbox_events"
        indexes = [
            models.Index(
                fields=["published_at", "next_attempt_at"],
                name="evaluatio_publish_06065c_idx",
            ),
            models.Index(
                fields=["evaluación", "created_at"], name="evaluatio_evaluac_28f3dc_idx"
            ),
        ]


class TelemetryEvent(models.Model):
    """Immutable operational signal correlated to a durable operation."""

    class Kind(models.TextChoices):
        DUPLICATE = "DUPLICATE", "Duplicada"
        CONFLICT = "CONFLICT", "Conflicto"
        ERROR = "ERROR", "Error"
        OUTBOX_RETRY = "OUTBOX_RETRY", "Reintento de outbox"
        OUTBOX_PUBLISHED = "OUTBOX_PUBLISHED", "Outbox publicada"
        OUTBOX_RECOVERED = "OUTBOX_RECOVERED", "Outbox recuperada"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="telemetry_events",
    )
    operation = models.ForeignKey(
        DistributedOperation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="telemetry_events",
    )
    kind = models.CharField(max_length=30, choices=Kind.choices)
    attributes = models.JSONField(default=dict, blank=True)
    occurred_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        db_table = "evaluation_telemetry_events"
        indexes = [
            models.Index(
                fields=["kind", "occurred_at"], name="evaluation__kind_fca2ac_idx"
            ),
            models.Index(
                fields=["evaluación", "occurred_at"],
                name="evaluation__evaluac_8a55a2_idx",
            ),
        ]


class EvaluacionItem(models.Model):
    """DAYC-2 item applied during an evaluation, with preliminary and final review state."""

    class Estado(models.TextChoices):
        PENDING = "PENDING", "Pendiente"
        IN_PROGRESS = "IN_PROGRESS", "En progreso"
        AUTO_VALIDATED = "AUTO_VALIDATED", "Validado automáticamente"
        NEEDS_REVIEW = "NEEDS_REVIEW", "Requiere revisión"
        REVIEWED = "REVIEWED", "Revisado"
        INCONCLUSIVE = "INCONCLUSIVE", "Inconcluso"
        NOT_ADMINISTERED = "NOT_ADMINISTERED", "No administrado"

    class Resultado(models.TextChoices):
        PASS = "PASS", "Pasó"
        FAIL = "FAIL", "No pasó"
        INCONCLUSIVE = "INCONCLUSIVE", "Inconcluso"
        NOT_ADMINISTERED = "NOT_ADMINISTERED", "No administrado"

    class Modalidad(models.TextChoices):
        INTERACTIVO_AUTO = "INTERACTIVO_AUTO", "Interactivo automático"
        INTERACTIVO_ASISTIDO = "INTERACTIVO_ASISTIDO", "Interactivo asistido"
        EVIDENCIA_DIFERIDA = "EVIDENCIA_DIFERIDA", "Evidencia diferida"
        OBSERVACION_FISICA = "OBSERVACION_FISICA", "Observación física"
        PREGUNTA_CUIDADOR = "PREGUNTA_CUIDADOR", "Pregunta al cuidador"
        MANUAL_GUIADO = "MANUAL_GUIADO", "Manual guiado"

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="items"
    )
    item_id = models.CharField(max_length=80)
    area = models.CharField(max_length=50)
    orden = models.IntegerField(default=0)
    modalidad = models.CharField(
        max_length=40, choices=Modalidad.choices, default=Modalidad.MANUAL_GUIADO
    )
    pantalla_nino = models.CharField(max_length=40, default="INSTRUCCION_SIMPLE")
    estado = models.CharField(
        max_length=30, choices=Estado.choices, default=Estado.PENDING
    )
    system_result = models.CharField(
        max_length=30, choices=Resultado.choices, null=True, blank=True
    )
    system_confidence = models.FloatField(null=True, blank=True)
    final_result = models.CharField(
        max_length=30, choices=Resultado.choices, null=True, blank=True
    )
    requires_review = models.BooleanField(default=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_items",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    psychologist_notes = models.TextField(blank=True)
    adult_notes = models.TextField(blank=True)
    raw_data = models.JSONField(default=dict, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    duration_ms = models.IntegerField(null=True, blank=True)
    attempt_number = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluacion_items"
        verbose_name = "Ítem de Evaluación"
        verbose_name_plural = "Ítems de Evaluación"
        unique_together = ("evaluación", "item_id", "attempt_number")
        indexes = [
            models.Index(fields=["evaluación", "area", "estado"]),
            models.Index(fields=["evaluación", "item_id"]),
        ]

    def __str__(self):
        return f"{self.item_id} - {self.area} ({self.estado})"


class ProfessionalReviewAssignment(models.Model):
    """Explicit acknowledgement that a professional has accepted a review."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="review_assignments"
    )
    professional = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="review_assignments",
    )
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="assigned_reviews",
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    received_at = models.DateTimeField(null=True, blank=True)
    motive = models.TextField(blank=True)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = "professional_review_assignments"
        constraints = [
            models.UniqueConstraint(
                fields=["evaluación", "professional"],
                condition=models.Q(active=True),
                name="unique_active_review_assignment",
            )
        ]


class ItemReview(models.Model):
    """Immutable, versioned professional review or correction of an item."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="item_reviews"
    )
    item = models.ForeignKey(
        EvaluacionItem, on_delete=models.PROTECT, related_name="review_versions"
    )
    version = models.PositiveIntegerField()
    final_result = models.CharField(
        max_length=30, choices=EvaluacionItem.Resultado.choices
    )
    motive = models.TextField()
    notes = models.TextField(blank=True)
    responsible = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="item_review_versions",
    )
    reviewed_at = models.DateTimeField(auto_now_add=True)
    evidence_consulted = models.ManyToManyField(
        "Evidencia", related_name="consulted_in_reviews", blank=True
    )

    class Meta:
        db_table = "item_review_versions"
        ordering = ["item_id", "version"]
        constraints = [
            models.UniqueConstraint(
                fields=["item", "version"], name="unique_item_review_version"
            )
        ]


class EvaluationClosure(models.Model):
    """Immutable professional closure of a validated evaluation."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="closures"
    )
    closed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="closed_evaluations",
    )
    closed_at = models.DateTimeField(auto_now_add=True)
    motive = models.TextField()
    lineage_checked_at = models.DateTimeField()
    reopened_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="reopened_evaluations",
        null=True,
        blank=True,
    )
    reopened_at = models.DateTimeField(null=True, blank=True)
    reopening_motive = models.TextField(blank=True)

    class Meta:
        db_table = "evaluation_closures"


class VersionedReport(models.Model):
    """A preserved report artifact and the evaluation version it represents."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="versioned_reports"
    )
    version = models.PositiveIntegerField()
    generated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="generated_reports",
    )
    generated_at = models.DateTimeField(auto_now_add=True)
    evaluation_version = models.PositiveBigIntegerField()
    snapshot = models.JSONField(default=dict)
    file = models.FileField(
        storage=private_evidence_storage, upload_to="reports/%Y/%m/%d"
    )

    class Meta:
        db_table = "versioned_reports"
        ordering = ["-version"]
        constraints = [
            models.UniqueConstraint(
                fields=["evaluación", "version"],
                name="unique_evaluation_report_version",
            )
        ]


class SessionAccessToken(models.Model):
    """Per-device bearer token stored only as a SHA-256 digest."""

    class ActorRole(models.TextChoices):
        CHILD = "CHILD", "Niño"
        ADULT = "ADULT", "Adulto"

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="access_tokens"
    )
    token_hash = models.CharField(max_length=64, unique=True)
    actor_role = models.CharField(
        max_length=10, choices=ActorRole.choices, null=True, blank=True
    )
    device_id = models.CharField(max_length=128, blank=True)
    expires_at = models.DateTimeField()
    revoked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluation_access_tokens"
        indexes = [
            models.Index(fields=["evaluación", "expires_at"]),
            models.Index(
                fields=["evaluación", "actor_role", "expires_at"],
                name="eval_token_role_exp_idx",
            ),
        ]


class SessionInvitation(models.Model):
    """Single-use invitation that assigns a participant role server-side."""

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="invitations"
    )
    invitation_hash = models.CharField(max_length=64, unique=True)
    actor_role = models.CharField(max_length=10, choices=SessionAccessToken.ActorRole)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="issued_session_invitations",
    )
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(null=True, blank=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluation_session_invitations"
        indexes = [
            models.Index(
                fields=["evaluación", "actor_role", "expires_at"],
                name="eval_inv_role_exp_idx",
            )
        ]


class Consentimiento(models.Model):
    """Initial consent accepted by the adult companion before evidence capture."""

    evaluación = models.OneToOneField(
        Evaluación, on_delete=models.CASCADE, related_name="consentimiento"
    )
    accepted = models.BooleanField(default=False)
    accepted_at = models.DateTimeField(null=True, blank=True)
    consent_text_version = models.CharField(max_length=20, default="1.0")
    consent_text_hash = models.CharField(max_length=64, blank=True)
    accepted_logs = models.BooleanField(default=True)
    accepted_screenshots = models.BooleanField(default=True)
    accepted_audio = models.BooleanField(default=True)
    accepted_video = models.BooleanField(default=True)
    adult_observation = models.TextField(blank=True)
    user_agent = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "consentimientos"
        verbose_name = "Consentimiento"
        verbose_name_plural = "Consentimientos"


class ConsentRecord(models.Model):
    """Immutable snapshot of every consent decision for an evaluation."""

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="consent_records"
    )
    accepted = models.BooleanField()
    modalities = models.JSONField(default=dict)
    consent_text_version = models.CharField(max_length=20)
    consent_text_hash = models.CharField(max_length=64, default="")
    recorded_by_role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "consent_records"
        ordering = ["created_at"]


class AssentRecord(models.Model):
    class Decision(models.TextChoices):
        ACCEPTED = "ACCEPTED", "Aceptado"
        UNCERTAIN = "UNCERTAIN", "Duda"
        DECLINED = "DECLINED", "Rechazado"
        WITHDRAWN = "WITHDRAWN", "Retirado"

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="assent_records"
    )
    decision = models.CharField(max_length=10, choices=Decision.choices)
    checkpoint = models.CharField(max_length=80, default="INITIAL")
    recorded_by_role = models.CharField(max_length=20)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "assent_records"
        ordering = ["created_at"]


class PauseRecord(models.Model):
    class Action(models.TextChoices):
        PAUSED = "PAUSED", "Pausada"
        RESUMED = "RESUMED", "Reanudada"

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="pause_records"
    )
    action = models.CharField(max_length=10, choices=Action.choices)
    reason = models.TextField(blank=True)
    recorded_by_role = models.CharField(max_length=20)
    device_id = models.CharField(max_length=128, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "pause_records"
        ordering = ["created_at"]


class WithdrawalRecord(models.Model):
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="withdrawal_records"
    )
    scope = models.CharField(max_length=20, default="FULL")
    modalities = models.JSONField(default=list)
    reason = models.TextField(blank=True)
    recorded_by_role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "withdrawal_records"


class Evidencia(models.Model):
    """Evidence captured during semi-assisted DAYC-2 item administration."""

    class Tipo(models.TextChoices):
        LOG = "LOG", "Log"
        TIME_EVENT = "TIME_EVENT", "Evento de tiempo"
        SCREENSHOT = "SCREENSHOT", "Captura"
        AUDIO = "AUDIO", "Audio"
        VIDEO = "VIDEO", "Video"
        CAMERA_FRAME = "CAMERA_FRAME", "Frame de cámara"
        SYSTEM_RESULT = "SYSTEM_RESULT", "Resultado del sistema"

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="evidencias"
    )
    evaluación_item = models.ForeignKey(
        EvaluacionItem,
        on_delete=models.CASCADE,
        related_name="evidencias",
        null=True,
        blank=True,
    )
    type = models.CharField(max_length=30, choices=Tipo.choices)
    file = models.FileField(
        upload_to=evidencia_upload_path,
        storage=private_evidence_storage,
        null=True,
        blank=True,
    )
    metadata = models.JSONField(default=dict, blank=True)
    duration_ms = models.IntegerField(null=True, blank=True)
    size_bytes = models.IntegerField(null=True, blank=True)
    captured_by = models.CharField(max_length=40, default="CHILD_DEVICE")
    idempotency_key = models.UUIDField(null=True, blank=True)
    consent_required = models.BooleanField(default=True)
    is_sensitive = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    retention_expires_at = models.DateTimeField(null=True, blank=True)
    capture_actor = models.CharField(max_length=80, default="UNKNOWN")
    capture_session = models.CharField(max_length=128, default="UNKNOWN")
    capture_task = models.CharField(max_length=128, default="UNKNOWN")
    capture_item = models.CharField(max_length=80, default="UNKNOWN")
    capture_authorization = models.CharField(max_length=160, default="UNKNOWN")
    capture_custodian = models.CharField(max_length=160, default="UNKNOWN")
    capture_quality = models.CharField(max_length=40, default="UNSPECIFIED")
    absence_reason = models.CharField(max_length=160, default="NOT_APPLICABLE")

    class Meta:
        db_table = "evidencias"
        verbose_name = "Evidencia"
        verbose_name_plural = "Evidencias"
        indexes = [models.Index(fields=["evaluación", "type", "created_at"])]
        constraints = [
            models.UniqueConstraint(
                fields=["evaluación", "idempotency_key"],
                name="unique_evidence_idempotency_key",
            )
        ]

    def save(self, *args, **kwargs):
        if self.pk:
            original = type(self).objects.get(pk=self.pk)
            immutable = (
                "evaluación_id",
                "evaluación_item_id",
                "type",
                "file",
                "metadata",
                "duration_ms",
                "size_bytes",
                "captured_by",
                "idempotency_key",
                "capture_actor",
                "capture_session",
                "capture_task",
                "capture_item",
                "capture_authorization",
                "capture_custodian",
                "capture_quality",
                "absence_reason",
            )
            if any(
                getattr(original, name) != getattr(self, name) for name in immutable
            ):
                raise ValidationError("La evidencia de captura es inmutable")
        else:
            self.capture_actor = (
                self.capture_actor
                if self.capture_actor != "UNKNOWN"
                else self.captured_by
            )
            self.capture_session = (
                self.capture_session
                if self.capture_session != "UNKNOWN"
                else self.evaluación.session_code
            )
            item_id = (
                self.evaluación_item.item_id if self.evaluación_item else "GENERAL"
            )
            self.capture_task = (
                self.capture_task if self.capture_task != "UNKNOWN" else item_id
            )
            self.capture_item = (
                self.capture_item if self.capture_item != "UNKNOWN" else item_id
            )
            if self.capture_authorization == "UNKNOWN":
                self.capture_authorization = self.captured_by
            self.capture_custodian = (
                self.capture_custodian
                if self.capture_custodian != "UNKNOWN"
                else self.captured_by
            )
            if not self.file and self.absence_reason == "NOT_APPLICABLE":
                self.absence_reason = "NO_FILE_CAPTURED"
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("La evidencia de captura no puede eliminarse")


class EvidenceAsset(models.Model):
    """An immutable original or derived file belonging to one evidence record."""

    class Kind(models.TextChoices):
        ORIGINAL = "ORIGINAL", "Original"
        DERIVED = "DERIVED", "Derivado"

    evidencia = models.ForeignKey(
        Evidencia, on_delete=models.PROTECT, related_name="assets"
    )
    parent_asset = models.ForeignKey(
        "self",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="derived_assets",
    )
    kind = models.CharField(max_length=10, choices=Kind.choices)
    file = models.FileField(
        upload_to=evidencia_upload_path, storage=private_evidence_storage
    )
    sha256 = models.CharField(max_length=64)
    size_bytes = models.PositiveBigIntegerField()
    media_type = models.CharField(max_length=100)
    signature_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        db_table = "evidence_assets"
        constraints = [
            models.UniqueConstraint(
                fields=["evidencia", "kind"],
                condition=models.Q(kind="ORIGINAL"),
                name="one_original_asset_per_evidence",
            ),
        ]

    def save(self, *args, **kwargs):
        if self.pk:
            raise ValidationError("Los activos de evidencia son inmutables")
        if self.kind == self.Kind.DERIVED and not self.parent_asset_id:
            raise ValidationError(
                "Un activo derivado requiere un activo original o padre"
            )
        facts = inspect_uploaded_evidence(self.file, self.evidencia.type)
        self.sha256 = facts["sha256"]
        self.size_bytes = facts["size_bytes"]
        self.media_type = facts["media_type"]
        self.signature_type = facts["signature_type"]
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("Los activos de evidencia no pueden eliminarse")


class EvidencePolicy(models.Model):
    """Global evidence configuration override for a DAYC-2 item/minigame."""

    item_id = models.CharField(max_length=80, unique=True)
    activity_id = models.CharField(max_length=100, blank=True)
    evidence_types = models.JSONField(default=list, blank=True)
    enabled = models.BooleanField(default=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="updated_evidence_policies",
    )
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evidence_policies"
        verbose_name = "Política de Evidencia"
        verbose_name_plural = "Políticas de Evidencia"
        indexes = [models.Index(fields=["item_id", "enabled"])]

    def __str__(self):
        return f"{self.item_id}: {', '.join(self.evidence_types or [])}"


class InteractionEvent(models.Model):
    """Fine-grained interaction log captured during child sessions."""

    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="interaction_events"
    )
    evaluación_item = models.ForeignKey(
        EvaluacionItem,
        on_delete=models.CASCADE,
        related_name="interaction_events",
        null=True,
        blank=True,
    )
    event_type = models.CharField(max_length=80)
    event_payload = models.JSONField(default=dict, blank=True)
    relative_time_ms = models.IntegerField(null=True, blank=True)
    actor_role = models.CharField(max_length=20, blank=True)
    device_id = models.CharField(max_length=128, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "interaction_events"
        verbose_name = "Evento de Interacción"
        verbose_name_plural = "Eventos de Interacción"
        indexes = [models.Index(fields=["evaluación", "event_type", "timestamp"])]


class EvidenceAccessAudit(models.Model):
    """Immutable audit trail for sensitive evidence operations."""

    evidencia = models.ForeignKey(
        Evidencia, on_delete=models.CASCADE, related_name="access_audits"
    )
    action = models.CharField(max_length=30)
    actor = models.CharField(max_length=40)
    actor_id = models.CharField(max_length=64, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    previous_hash = models.CharField(max_length=64, blank=True)
    event_hash = models.CharField(max_length=64, unique=True)

    class Meta:
        db_table = "evidence_access_audits"
        indexes = [models.Index(fields=["evidencia", "action", "created_at"])]

    @classmethod
    def record(cls, **kwargs):
        previous = (
            cls.objects.filter(evidencia=kwargs["evidencia"]).order_by("-id").first()
        )
        created_at = timezone.now()
        previous_hash = previous.event_hash if previous else ""
        payload = {
            "evidencia_id": str(kwargs["evidencia"].id),
            "action": kwargs["action"],
            "actor": kwargs["actor"],
            "actor_id": kwargs.get("actor_id", ""),
            "ip_address": str(kwargs.get("ip_address") or ""),
            "created_at": created_at.isoformat(),
            "previous_hash": previous_hash,
        }
        event_hash = hashlib.sha256(
            json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()
        ).hexdigest()
        return cls.objects.create(
            **kwargs,
            created_at=created_at,
            previous_hash=previous_hash,
            event_hash=event_hash,
        )

    @classmethod
    def verify_chain(cls, evidencia):
        previous_hash = ""
        for audit in cls.objects.filter(evidencia=evidencia).order_by("id"):
            payload = {
                "evidencia_id": str(evidencia.id),
                "action": audit.action,
                "actor": audit.actor,
                "actor_id": audit.actor_id,
                "ip_address": str(audit.ip_address or ""),
                "created_at": audit.created_at.isoformat(),
                "previous_hash": previous_hash,
            }
            expected = hashlib.sha256(
                json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()
            ).hexdigest()
            if audit.previous_hash != previous_hash or audit.event_hash != expected:
                return False
            previous_hash = audit.event_hash
        return True

    def save(self, *args, **kwargs):
        if self.pk:
            raise ValidationError("La auditoría de evidencia es inmutable")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("La auditoría de evidencia no puede eliminarse")


class ProvenanceAgent(models.Model):
    """A person, device, service, or organisation responsible for provenance."""

    class Kind(models.TextChoices):
        PERSON = "PERSON", "Persona"
        DEVICE = "DEVICE", "Dispositivo"
        SOFTWARE = "SOFTWARE", "Software"
        ORGANIZATION = "ORGANIZATION", "Organización"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluation = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="provenance_agents"
    )
    identifier = models.CharField(max_length=160)
    kind = models.CharField(max_length=20, choices=Kind.choices)
    label = models.CharField(max_length=200)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "provenance_agents"
        constraints = [
            models.UniqueConstraint(
                fields=["evaluation", "identifier", "kind"],
                name="unique_provenance_agent",
            )
        ]


class ProvenanceEntity(models.Model):
    """Versioned immutable representation of a durable evaluation resource."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluation = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="provenance_entities"
    )
    resource_type = models.CharField(max_length=80)
    resource_id = models.CharField(max_length=128)
    version = models.PositiveIntegerField(default=1)
    label = models.CharField(max_length=200)
    attributes = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "provenance_entities"
        ordering = ["resource_type", "resource_id", "version"]
        constraints = [
            models.UniqueConstraint(
                fields=["evaluation", "resource_type", "resource_id", "version"],
                name="unique_provenance_entity_version",
            )
        ]
        indexes = [
            models.Index(fields=["evaluation", "resource_type", "resource_id"]),
        ]


class ProvenanceActivity(models.Model):
    """A bounded process that used and generated provenance entities."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluation = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="provenance_activities"
    )
    activity_type = models.CharField(max_length=80)
    label = models.CharField(max_length=200)
    started_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(null=True, blank=True)
    attributes = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "provenance_activities"
        ordering = ["started_at", "id"]
        indexes = [models.Index(fields=["evaluation", "activity_type", "started_at"])]


class ProvenanceRelation(models.Model):
    """Typed W3C-PROV-equivalent edge between entities, activities and agents."""

    class Type(models.TextChoices):
        GENERATED_BY = "generatedBy", "Generada por"
        DERIVED_FROM = "derivedFrom", "Derivada de"
        ATTRIBUTED_TO = "attributedTo", "Atribuida a"
        USED = "used", "Usada"
        ASSOCIATED_WITH = "associatedWith", "Asociada con"
        INVALIDATED_BY = "invalidatedBy", "Invalidada por"
        REVISION_OF = "revisionOf", "Revisión de"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluation = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="provenance_relations"
    )
    relation_type = models.CharField(max_length=20, choices=Type.choices)
    source_entity = models.ForeignKey(
        ProvenanceEntity,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="outgoing_provenance_relations",
    )
    target_entity = models.ForeignKey(
        ProvenanceEntity,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="incoming_provenance_relations",
    )
    activity = models.ForeignKey(
        ProvenanceActivity,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="relations",
    )
    agent = models.ForeignKey(
        ProvenanceAgent,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="relations",
    )
    attributes = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "provenance_relations"
        indexes = [
            models.Index(fields=["evaluation", "relation_type"]),
            models.Index(fields=["source_entity", "relation_type"]),
            models.Index(fields=["target_entity", "relation_type"]),
        ]


class Respuesta(models.Model):
    """Response entity - represents a single answer in an evaluation"""

    class Resultado(models.TextChoices):
        CORRECT = "CORRECT", "Correcto"
        ERROR = "ERROR", "Error"
        NOT_APPLICABLE = "NOT_APPLICABLE", "No Aplica"

    class Source(models.TextChoices):
        SYSTEM_AUTO = "SYSTEM_AUTO", "Sistema automático"
        SYSTEM_ASSISTED = "SYSTEM_ASSISTED", "Sistema asistido"
        CHILD_INTERACTION = "CHILD_INTERACTION", "Interacción del niño"
        ADULT_ASSISTED = "ADULT_ASSISTED", "Adulto acompañante"
        PSYCHOLOGIST_REVIEW = "PSYCHOLOGIST_REVIEW", "Revisión del psicólogo"

    class ValidationStatus(models.TextChoices):
        AUTO_ACCEPTED = "AUTO_ACCEPTED", "Aceptada automáticamente"
        NEEDS_REVIEW = "NEEDS_REVIEW", "Requiere revisión"
        PSYCHOLOGIST_CONFIRMED = "PSYCHOLOGIST_CONFIRMED", "Confirmada por psicólogo"
        PSYCHOLOGIST_CORRECTED = "PSYCHOLOGIST_CORRECTED", "Corregida por psicólogo"
        REJECTED = "REJECTED", "Rechazada"
        INCONCLUSIVE = "INCONCLUSIVE", "Inconclusa"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="respuestas"
    )
    evaluación_item = models.ForeignKey(
        EvaluacionItem,
        on_delete=models.SET_NULL,
        related_name="respuestas",
        null=True,
        blank=True,
    )
    minijuego_id = models.CharField(max_length=100)
    item_id = models.CharField(max_length=50)
    area = models.CharField(max_length=50, null=True, blank=True)
    resultado = models.CharField(max_length=20, choices=Resultado.choices)
    final_result = models.CharField(
        max_length=30, choices=EvaluacionItem.Resultado.choices, null=True, blank=True
    )
    source = models.CharField(
        max_length=40, choices=Source.choices, default=Source.SYSTEM_AUTO
    )
    validation_status = models.CharField(
        max_length=40,
        choices=ValidationStatus.choices,
        default=ValidationStatus.NEEDS_REVIEW,
    )
    confidence = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)
    raw_data = models.JSONField(default=dict, blank=True)
    is_final = models.BooleanField(default=False)
    idempotency_key = models.UUIDField(null=True, blank=True)
    tiempo_respuesta_ms = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "respuestas"
        verbose_name = "Respuesta"
        verbose_name_plural = "Respuestas"
        constraints = [
            models.UniqueConstraint(
                fields=["evaluación", "idempotency_key"],
                name="unique_response_idempotency_key",
            )
        ]


class ResultadoÁrea(models.Model):
    """Result per area - standard scores from baremos"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(
        Evaluación, on_delete=models.CASCADE, related_name="resultados"
    )
    área = models.CharField(max_length=50)
    puntuación_directa = models.IntegerField()
    puntuación_estándar = models.IntegerField(null=True, blank=True)
    percentil = models.CharField(max_length=20, null=True, blank=True)
    interpretación = models.CharField(max_length=50, null=True, blank=True)
    edad_equivalente = models.CharField(max_length=50, null=True, blank=True)
    cociente_general_gdq = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "resultados_área"
        verbose_name = "Resultado por Área"
        verbose_name_plural = "Resultados por Área"


class Diagnóstico(models.Model):
    """AI-generated diagnosis"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.OneToOneField(
        Evaluación, on_delete=models.CASCADE, related_name="diagnóstico"
    )
    contenido = models.TextField()
    modelo_ai = models.CharField(max_length=50)
    gdq = models.IntegerField(null=True, blank=True)
    actividades_estimulación = models.JSONField(default=list)
    modificado_por_psicólogo = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "diagnósticos"
        verbose_name = "Diagnóstico"
        verbose_name_plural = "Diagnósticos"


class Métricas(models.Model):
    """System metrics for research"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha = models.DateField()
    evaluaciones_iniciadas = models.IntegerField(default=0)
    evaluaciones_completadas = models.IntegerField(default=0)
    duración_promedio_minutos = models.IntegerField(null=True, blank=True)
    errores_sistema = models.IntegerField(default=0)
    fallback_activado_count = models.IntegerField(default=0)

    class Meta:
        db_table = "métricas"
        verbose_name = "Métrica"
        verbose_name_plural = "Métricas"

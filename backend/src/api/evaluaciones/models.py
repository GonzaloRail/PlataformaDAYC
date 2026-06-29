"""Models for Evaluación and related entities"""
import uuid
from django.conf import settings
from django.db import models
from src.api.children.models import Niño


def evidencia_upload_path(instance, filename):
    """Store sensitive evidence under an evaluation/item scoped path."""
    item_id = instance.evaluación_item.item_id if instance.evaluación_item else 'general'
    return f'evidencias/evaluacion_{instance.evaluación_id}/item_{item_id}/{filename}'


class Evaluación(models.Model):
    """Evaluation entity - represents a DAYC-2 evaluation session"""
    
    class Estado(models.TextChoices):
        INITIATED = 'INITIATED', 'Iniciada'
        IN_PROGRESS = 'IN_PROGRESS', 'En Progreso'
        COMPLETED = 'COMPLETED', 'Completada'
        STOPPED = 'STOPPED', 'Detenida'
        ARCHIVED = 'ARCHIVED', 'Archivada'
        WAITING_CHILD_DATA = 'WAITING_CHILD_DATA', 'Esperando datos del niño'
        WAITING_CONSENT = 'WAITING_CONSENT', 'Esperando consentimiento'
        PENDING_REVIEW = 'PENDING_REVIEW', 'Pendiente de revisión'
        REVIEW_IN_PROGRESS = 'REVIEW_IN_PROGRESS', 'Revisión en progreso'
        VALIDATED = 'VALIDATED', 'Validada'
        CANCELLED = 'CANCELLED', 'Cancelada'

    class ModoEvaluacion(models.TextChoices):
        SYNCHRONOUS = 'SYNCHRONOUS', 'Sincrónica'
        DEFERRED = 'DEFERRED', 'Diferida'
        HYBRID = 'HYBRID', 'Híbrida'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    niño = models.ForeignKey(Niño, on_delete=models.CASCADE, related_name='evaluaciones')
    psychologist_id = models.CharField(max_length=64, null=True, blank=True)
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.INITIATED)
    edad_meses = models.IntegerField(null=True, blank=True)
    session_code = models.CharField(max_length=10, unique=True)
    session_token = models.CharField(max_length=128, null=True, blank=True, db_index=True)
    session_expires_at = models.DateTimeField(null=True, blank=True)
    modo_evaluacion = models.CharField(max_length=20, choices=ModoEvaluacion.choices, default=ModoEvaluacion.HYBRID)
    current_area = models.CharField(max_length=50, default='COGNITIVO')
    current_area_index = models.IntegerField(default=0)
    current_item_id = models.CharField(max_length=80, null=True, blank=True)
    child_data_completed = models.BooleanField(default=True)
    preliminary_calculated_at = models.DateTimeField(null=True, blank=True)
    validated_calculated_at = models.DateTimeField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'evaluaciones'
        verbose_name = 'Evaluación'
        verbose_name_plural = 'Evaluaciones'
    
    def __str__(self):
        return f"Evaluación {self.id} - {self.niño.nombre} ({self.estado})"


class EvaluacionItem(models.Model):
    """DAYC-2 item applied during an evaluation, with preliminary and final review state."""

    class Estado(models.TextChoices):
        PENDING = 'PENDING', 'Pendiente'
        IN_PROGRESS = 'IN_PROGRESS', 'En progreso'
        AUTO_VALIDATED = 'AUTO_VALIDATED', 'Validado automáticamente'
        NEEDS_REVIEW = 'NEEDS_REVIEW', 'Requiere revisión'
        REVIEWED = 'REVIEWED', 'Revisado'
        INCONCLUSIVE = 'INCONCLUSIVE', 'Inconcluso'
        NOT_ADMINISTERED = 'NOT_ADMINISTERED', 'No administrado'

    class Resultado(models.TextChoices):
        PASS = 'PASS', 'Pasó'
        FAIL = 'FAIL', 'No pasó'
        INCONCLUSIVE = 'INCONCLUSIVE', 'Inconcluso'
        NOT_ADMINISTERED = 'NOT_ADMINISTERED', 'No administrado'

    class Modalidad(models.TextChoices):
        INTERACTIVO_AUTO = 'INTERACTIVO_AUTO', 'Interactivo automático'
        INTERACTIVO_ASISTIDO = 'INTERACTIVO_ASISTIDO', 'Interactivo asistido'
        EVIDENCIA_DIFERIDA = 'EVIDENCIA_DIFERIDA', 'Evidencia diferida'
        OBSERVACION_FISICA = 'OBSERVACION_FISICA', 'Observación física'
        PREGUNTA_CUIDADOR = 'PREGUNTA_CUIDADOR', 'Pregunta al cuidador'
        MANUAL_GUIADO = 'MANUAL_GUIADO', 'Manual guiado'

    evaluación = models.ForeignKey(Evaluación, on_delete=models.CASCADE, related_name='items')
    item_id = models.CharField(max_length=80)
    area = models.CharField(max_length=50)
    orden = models.IntegerField(default=0)
    modalidad = models.CharField(max_length=40, choices=Modalidad.choices, default=Modalidad.MANUAL_GUIADO)
    pantalla_nino = models.CharField(max_length=40, default='INSTRUCCION_SIMPLE')
    estado = models.CharField(max_length=30, choices=Estado.choices, default=Estado.PENDING)
    system_result = models.CharField(max_length=30, choices=Resultado.choices, null=True, blank=True)
    system_confidence = models.FloatField(null=True, blank=True)
    final_result = models.CharField(max_length=30, choices=Resultado.choices, null=True, blank=True)
    requires_review = models.BooleanField(default=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_items')
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
        db_table = 'evaluacion_items'
        verbose_name = 'Ítem de Evaluación'
        verbose_name_plural = 'Ítems de Evaluación'
        unique_together = ('evaluación', 'item_id', 'attempt_number')
        indexes = [
            models.Index(fields=['evaluación', 'area', 'estado']),
            models.Index(fields=['evaluación', 'item_id']),
        ]

    def __str__(self):
        return f"{self.item_id} - {self.area} ({self.estado})"


class Consentimiento(models.Model):
    """Initial consent accepted by the adult companion before evidence capture."""

    evaluación = models.OneToOneField(Evaluación, on_delete=models.CASCADE, related_name='consentimiento')
    accepted = models.BooleanField(default=False)
    accepted_at = models.DateTimeField(null=True, blank=True)
    consent_text_version = models.CharField(max_length=20, default='1.0')
    accepted_logs = models.BooleanField(default=True)
    accepted_screenshots = models.BooleanField(default=True)
    accepted_audio = models.BooleanField(default=True)
    accepted_video = models.BooleanField(default=True)
    adult_observation = models.TextField(blank=True)
    user_agent = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'consentimientos'
        verbose_name = 'Consentimiento'
        verbose_name_plural = 'Consentimientos'


class Evidencia(models.Model):
    """Evidence captured during semi-assisted DAYC-2 item administration."""

    class Tipo(models.TextChoices):
        LOG = 'LOG', 'Log'
        TIME_EVENT = 'TIME_EVENT', 'Evento de tiempo'
        SCREENSHOT = 'SCREENSHOT', 'Captura'
        AUDIO = 'AUDIO', 'Audio'
        VIDEO = 'VIDEO', 'Video'
        CAMERA_FRAME = 'CAMERA_FRAME', 'Frame de cámara'
        SYSTEM_RESULT = 'SYSTEM_RESULT', 'Resultado del sistema'

    evaluación = models.ForeignKey(Evaluación, on_delete=models.CASCADE, related_name='evidencias')
    evaluación_item = models.ForeignKey(EvaluacionItem, on_delete=models.CASCADE, related_name='evidencias', null=True, blank=True)
    type = models.CharField(max_length=30, choices=Tipo.choices)
    file = models.FileField(upload_to=evidencia_upload_path, null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    duration_ms = models.IntegerField(null=True, blank=True)
    size_bytes = models.IntegerField(null=True, blank=True)
    captured_by = models.CharField(max_length=40, default='CHILD_DEVICE')
    consent_required = models.BooleanField(default=True)
    is_sensitive = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'evidencias'
        verbose_name = 'Evidencia'
        verbose_name_plural = 'Evidencias'
        indexes = [models.Index(fields=['evaluación', 'type', 'created_at'])]


class EvidencePolicy(models.Model):
    """Global evidence configuration override for a DAYC-2 item/minigame."""

    item_id = models.CharField(max_length=80, unique=True)
    activity_id = models.CharField(max_length=100, blank=True)
    evidence_types = models.JSONField(default=list, blank=True)
    enabled = models.BooleanField(default=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_evidence_policies')
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'evidence_policies'
        verbose_name = 'Política de Evidencia'
        verbose_name_plural = 'Políticas de Evidencia'
        indexes = [models.Index(fields=['item_id', 'enabled'])]

    def __str__(self):
        return f"{self.item_id}: {', '.join(self.evidence_types or [])}"


class InteractionEvent(models.Model):
    """Fine-grained interaction log captured during child sessions."""

    evaluación = models.ForeignKey(Evaluación, on_delete=models.CASCADE, related_name='interaction_events')
    evaluación_item = models.ForeignKey(EvaluacionItem, on_delete=models.CASCADE, related_name='interaction_events', null=True, blank=True)
    event_type = models.CharField(max_length=80)
    event_payload = models.JSONField(default=dict, blank=True)
    relative_time_ms = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'interaction_events'
        verbose_name = 'Evento de Interacción'
        verbose_name_plural = 'Eventos de Interacción'
        indexes = [models.Index(fields=['evaluación', 'event_type', 'timestamp'])]


class Respuesta(models.Model):
    """Response entity - represents a single answer in an evaluation"""
    
    class Resultado(models.TextChoices):
        CORRECT = 'CORRECT', 'Correcto'
        ERROR = 'ERROR', 'Error'
        NOT_APPLICABLE = 'NOT_APPLICABLE', 'No Aplica'

    class Source(models.TextChoices):
        SYSTEM_AUTO = 'SYSTEM_AUTO', 'Sistema automático'
        SYSTEM_ASSISTED = 'SYSTEM_ASSISTED', 'Sistema asistido'
        CHILD_INTERACTION = 'CHILD_INTERACTION', 'Interacción del niño'
        ADULT_ASSISTED = 'ADULT_ASSISTED', 'Adulto acompañante'
        PSYCHOLOGIST_REVIEW = 'PSYCHOLOGIST_REVIEW', 'Revisión del psicólogo'

    class ValidationStatus(models.TextChoices):
        AUTO_ACCEPTED = 'AUTO_ACCEPTED', 'Aceptada automáticamente'
        NEEDS_REVIEW = 'NEEDS_REVIEW', 'Requiere revisión'
        PSYCHOLOGIST_CONFIRMED = 'PSYCHOLOGIST_CONFIRMED', 'Confirmada por psicólogo'
        PSYCHOLOGIST_CORRECTED = 'PSYCHOLOGIST_CORRECTED', 'Corregida por psicólogo'
        REJECTED = 'REJECTED', 'Rechazada'
        INCONCLUSIVE = 'INCONCLUSIVE', 'Inconclusa'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(Evaluación, on_delete=models.CASCADE, related_name='respuestas')
    evaluación_item = models.ForeignKey(EvaluacionItem, on_delete=models.SET_NULL, related_name='respuestas', null=True, blank=True)
    minijuego_id = models.CharField(max_length=100)
    item_id = models.CharField(max_length=50)
    area = models.CharField(max_length=50, null=True, blank=True)
    resultado = models.CharField(max_length=20, choices=Resultado.choices)
    final_result = models.CharField(max_length=30, choices=EvaluacionItem.Resultado.choices, null=True, blank=True)
    source = models.CharField(max_length=40, choices=Source.choices, default=Source.SYSTEM_AUTO)
    validation_status = models.CharField(max_length=40, choices=ValidationStatus.choices, default=ValidationStatus.NEEDS_REVIEW)
    confidence = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)
    raw_data = models.JSONField(default=dict, blank=True)
    is_final = models.BooleanField(default=False)
    tiempo_respuesta_ms = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'respuestas'
        verbose_name = 'Respuesta'
        verbose_name_plural = 'Respuestas'


class ResultadoÁrea(models.Model):
    """Result per area - standard scores from baremos"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.ForeignKey(Evaluación, on_delete=models.CASCADE, related_name='resultados')
    área = models.CharField(max_length=50)
    puntuación_directa = models.IntegerField()
    puntuación_estándar = models.IntegerField(null=True, blank=True)
    percentil = models.IntegerField(null=True, blank=True)
    edad_equivalente = models.CharField(max_length=50, null=True, blank=True)
    cociente_general_gdq = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'resultados_área'
        verbose_name = 'Resultado por Área'
        verbose_name_plural = 'Resultados por Área'


class Diagnóstico(models.Model):
    """AI-generated diagnosis"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evaluación = models.OneToOneField(Evaluación, on_delete=models.CASCADE, related_name='diagnóstico')
    contenido = models.TextField()
    modelo_ai = models.CharField(max_length=50)
    gdq = models.IntegerField(null=True, blank=True)
    actividades_estimulación = models.JSONField(default=list)
    modificado_por_psicólogo = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'diagnósticos'
        verbose_name = 'Diagnóstico'
        verbose_name_plural = 'Diagnósticos'


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
        db_table = 'métricas'
        verbose_name = 'Métrica'
        verbose_name_plural = 'Métricas'

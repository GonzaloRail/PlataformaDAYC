"""Shared serializers and helpers for the evaluaciones app."""
import secrets
import string
from datetime import timedelta
from django.utils import timezone


_SESSION_CODE_ALPHABET = string.ascii_uppercase + string.digits  # 36 chars


def generar_codigo_sesion():
    """Generate a 6-character alphanumeric session code using a CSPRNG.

    Format matches the original DAYC-2 contract (6 uppercase alphanumeric
    characters) so the frontend inputs (maxLength=6) keep working. We use
    `secrets.choice` (CSPRNG) instead of `random.choices` to keep the
    cryptographic-strength guarantee introduced in the Fase 4 refactor.
    36^6 = 2.18B possible codes; the model's `session_code` field has
    `unique=True` so collisions are caught at the DB layer.
    """
    return ''.join(secrets.choice(_SESSION_CODE_ALPHABET) for _ in range(6))


def serialize_evaluación(evaluación):
    return {
        'id': str(evaluación.id),
        'nino_id': str(evaluación.niño.id),
        'niño': {'id': str(evaluación.niño.id), 'nombre': evaluación.niño.nombre},
        'psychologist_id': evaluación.psychologist_id,
        'estado': evaluación.estado,
        'edad_meses': evaluación.edad_meses,
        'session_code': evaluación.session_code,
        'modo_evaluacion': evaluación.modo_evaluacion,
        'current_area': evaluación.current_area,
        'current_item_id': evaluación.current_item_id,
        'child_data_completed': evaluación.child_data_completed,
        'consentimiento_aceptado': getattr(evaluación, 'consentimiento', None).accepted if hasattr(evaluación, 'consentimiento') else False,
        'started_at': evaluación.started_at.isoformat() if evaluación.started_at else None,
        'completed_at': evaluación.completed_at.isoformat() if evaluación.completed_at else None,
        'created_at': evaluación.created_at.isoformat() if evaluación.created_at else None,
    }


def serialize_item(item):
    return {
        'id': str(item.id),
        'evaluacion_id': str(item.evaluación_id),
        'item_id': item.item_id,
        'area': item.area,
        'orden': item.orden,
        'modalidad': item.modalidad,
        'pantalla_nino': item.pantalla_nino,
        'estado': item.estado,
        'system_result': item.system_result,
        'system_confidence': item.system_confidence,
        'final_result': item.final_result,
        'requires_review': item.requires_review,
        'psychologist_notes': item.psychologist_notes,
        'adult_notes': item.adult_notes,
        'duration_ms': item.duration_ms,
        'started_at': item.started_at.isoformat() if item.started_at else None,
        'completed_at': item.completed_at.isoformat() if item.completed_at else None,
    }


def serialize_resultado_area(r):
    """Serialize a ResultadoÁrea using the canonical non-accented key set."""
    return {
        'id': str(r.id),
        'area': r.área,
        'puntuacion_directa': r.puntuación_directa,
        'puntuacion_estandar': r.puntuación_estándar,
        'percentil': r.percentil,
        'edad_equivalente': r.edad_equivalente,
        'cociente_general_gdq': r.cociente_general_gdq,
    }


def autorizar_evaluacion(request, evaluación):
    """Return True if request is from the owning psychologist or a valid child session token."""
    is_psychologist = (
        request.user.is_authenticated
        and str(request.user.id) == evaluación.psychologist_id
    )
    bearer = request.headers.get('Authorization', '').replace('Bearer ', '')
    query_token = request.GET.get('session_token') if request.method != 'POST' else None
    session_token = bearer or query_token
    is_valid_child_session = bool(session_token and session_token == evaluación.session_token)
    return is_psychologist or is_valid_child_session


def client_ip(request):
    forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded_for:
        return forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def ensure_session_token(evaluación):
    if not evaluación.session_token:
        evaluación.session_token = secrets.token_urlsafe(32)
    if not evaluación.session_expires_at:
        evaluación.session_expires_at = timezone.now() + timedelta(days=7)
    evaluación.save(update_fields=['session_token', 'session_expires_at'])
    return evaluación.session_token


def get_evaluación_by_session(session_code):
    from src.api.evaluaciones.models import Evaluación
    return Evaluación.objects.select_related('niño').get(session_code=session_code.strip().upper())


def get_evaluación_for_psychologist(pk, user):
    """Fetch a single evaluación scoped to the requesting psychologist.

    Centralizes the `psychologist_id=str(user.id)` pattern (and its absence in
    the AllowAny routes) so view code can use a single helper.
    """
    from src.api.evaluaciones.models import Evaluación
    return Evaluación.objects.get(pk=pk, psychologist_id=str(user.id))


def generar_pdf_evaluacion(evaluación):
    """Generate a PDF report and return it as a FileResponse attachment."""
    from django.http import FileResponse
    from src.infrastructure.pdf.reporte_generator import ReporteGenerator

    pdf_path = ReporteGenerator().generar(evaluación)
    return FileResponse(
        open(pdf_path, 'rb'),
        content_type='application/pdf',
        as_attachment=True,
        filename=f"reporte_DAYC2_{evaluación.niño.nombre}_{evaluación.created_at.date()}.pdf",
    )

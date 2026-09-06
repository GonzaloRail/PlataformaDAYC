"""Shared serializers and helpers for the evaluaciones app."""

import secrets
import string
import hashlib
from hmac import compare_digest
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
    return "".join(secrets.choice(_SESSION_CODE_ALPHABET) for _ in range(6))


def serialize_evaluación(evaluación):
    return {
        "id": str(evaluación.id),
        "nino_id": str(evaluación.niño.id),
        "niño": {"id": str(evaluación.niño.id), "nombre": evaluación.niño.nombre},
        "psychologist_id": evaluación.psychologist_id,
        "estado": evaluación.estado,
        "edad_meses": evaluación.edad_meses,
        "session_code": evaluación.session_code,
        "modo_evaluacion": evaluación.modo_evaluacion,
        "current_area": evaluación.current_area,
        "current_item_id": evaluación.current_item_id,
        "version": evaluación.version,
        "child_data_completed": evaluación.child_data_completed,
        "consentimiento_aceptado": (
            getattr(evaluación, "consentimiento", None).accepted
            if hasattr(evaluación, "consentimiento")
            else False
        ),
        "started_at": (
            evaluación.started_at.isoformat() if evaluación.started_at else None
        ),
        "completed_at": (
            evaluación.completed_at.isoformat() if evaluación.completed_at else None
        ),
        "created_at": (
            evaluación.created_at.isoformat() if evaluación.created_at else None
        ),
    }


def serialize_item(item):
    return {
        "id": str(item.id),
        "evaluacion_id": str(item.evaluación_id),
        "item_id": item.item_id,
        "area": item.area,
        "orden": item.orden,
        "modalidad": item.modalidad,
        "pantalla_nino": item.pantalla_nino,
        "estado": item.estado,
        "system_result": item.system_result,
        "system_confidence": item.system_confidence,
        "final_result": item.final_result,
        "requires_review": item.requires_review,
        "psychologist_notes": item.psychologist_notes,
        "adult_notes": item.adult_notes,
        "duration_ms": item.duration_ms,
        "started_at": item.started_at.isoformat() if item.started_at else None,
        "completed_at": item.completed_at.isoformat() if item.completed_at else None,
    }


def serialize_resultado_area(r):
    """Serialize a ResultadoÁrea using the canonical non-accented key set."""
    return {
        "id": str(r.id),
        "area": r.área,
        "puntuacion_directa": r.puntuación_directa,
        "puntuacion_estandar": r.puntuación_estándar,
        "percentil": r.percentil,
        "interpretacion": r.interpretación,
        "edad_equivalente": r.edad_equivalente,
        "cociente_general_gdq": r.cociente_general_gdq,
    }


def autorizar_evaluacion(request, evaluación, allowed_roles=None):
    """Authorize the owner or a participant token with an allowed actor role."""
    is_psychologist = (
        request.user.is_authenticated
        and str(request.user.id) == evaluación.psychologist_id
    )
    bearer = request.headers.get("Authorization", "").replace("Bearer ", "")
    query_token = request.GET.get("session_token") if request.method != "POST" else None
    session_token = bearer or query_token
    is_valid_session = verify_session_token(
        evaluación, session_token, allowed_roles=allowed_roles
    )
    return is_psychologist or is_valid_session


def client_ip(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def ensure_session_token(evaluación, actor_role, device_id=""):
    from src.api.evaluaciones.models import SessionAccessToken

    valid_roles = {choice.value for choice in SessionAccessToken.ActorRole}
    if actor_role not in valid_roles:
        raise ValueError("Rol de sesión inválido")
    if not evaluación.session_expires_at:
        evaluación.session_expires_at = timezone.now() + timedelta(days=7)
        evaluación.save(update_fields=["session_expires_at"])
    token = secrets.token_urlsafe(32)
    SessionAccessToken.objects.create(
        evaluación=evaluación,
        token_hash=hashlib.sha256(token.encode()).hexdigest(),
        actor_role=actor_role,
        device_id=str(device_id or "")[:128],
        expires_at=evaluación.session_expires_at,
    )
    return token


def get_session_access_token(evaluación, token):
    if (
        not token
        or not evaluación.session_expires_at
        or evaluación.session_expires_at <= timezone.now()
    ):
        return None
    if evaluación.session_token:
        if compare_digest(token, evaluación.session_token):
            return "legacy"
        # Existing evaluations may retain a legacy token while new per-device
        # tokens are issued during the migration to hashed credentials.
        if not hasattr(evaluación, "_meta"):
            return None
    digest = hashlib.sha256(token.encode()).hexdigest()
    from src.api.evaluaciones.models import SessionAccessToken

    access_token = SessionAccessToken.objects.filter(token_hash=digest).first()
    if not access_token:
        return None
    if (
        access_token.evaluación_id != evaluación.id
        or access_token.revoked_at is not None
        or access_token.expires_at <= timezone.now()
    ):
        return None
    return access_token


def verify_session_token(evaluación, token, allowed_roles=None):
    access_token = get_session_access_token(evaluación, token)
    if not access_token:
        return False
    if allowed_roles is None:
        return True
    if access_token == "legacy":
        return False
    return access_token.actor_role in set(allowed_roles)


def get_evaluación_by_session(session_code):
    from src.api.evaluaciones.models import Evaluación

    return Evaluación.objects.select_related("niño").get(
        session_code=session_code.strip().upper()
    )


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
        open(pdf_path, "rb"),
        content_type="application/pdf",
        as_attachment=True,
        filename=f"reporte_DAYC2_{evaluación.niño.nombre}_{evaluación.created_at.date()}.pdf",
    )

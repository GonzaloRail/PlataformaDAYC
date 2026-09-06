"""Views for Evaluaciones API"""

import json
import logging
import uuid
from datetime import timedelta

from django.http import FileResponse
from django.db import transaction
from django.conf import settings
from django.utils import timezone
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

logger = logging.getLogger(__name__)
from .models import (
    Consentimiento,
    Evaluación,
    EvaluacionItem,
    Evidencia,
    EvidenceAccessAudit,
    EvidencePolicy,
    InteractionEvent,
    Respuesta,
    ResultadoÁrea,
    SessionAccessToken,
)


def _publish_evaluation_progress(evaluación):
    """Publish the persisted evaluation state to connected observers."""
    channel_layer = get_channel_layer()
    if channel_layer is None:
        return

    completed = evaluación.respuestas.count()
    payload = {
        "event_id": str(uuid.uuid4()),
        "evaluation_id": str(evaluación.id),
        "total_items": evaluación.items.count(),
        "completed_items": completed,
        "current_item": evaluación.current_item_id or "",
        "estado": evaluación.estado,
        "version": evaluación.version,
        "server_time": timezone.now().isoformat(),
    }
    try:
        async_to_sync(channel_layer.group_send)(
            f"evaluation_{evaluación.id}",
            {"type": "evaluation_update", "event": "progress", "data": payload},
        )
    except Exception:
        logger.exception("Could not publish progress for evaluation %s", evaluación.id)


def _idempotency_key(request):
    raw_key = request.headers.get("Idempotency-Key") or request.data.get(
        "idempotency_key"
    )
    if not raw_key:
        return None
    try:
        return uuid.UUID(str(raw_key))
    except (TypeError, ValueError, AttributeError):
        return None


def _advance_evaluation_version(evaluación):
    """Advance the persisted sequence after a state-changing operation."""
    evaluación.version += 1
    evaluación.save(update_fields=["version"])


def _require_expected_version(request, evaluación):
    raw_version = request.data.get("expected_version")
    if raw_version is None:
        return Response(
            {
                "error": "expected_version es obligatorio",
                "current_version": evaluación.version,
            },
            status=status.HTTP_428_PRECONDITION_REQUIRED,
        )
    try:
        expected_version = int(raw_version)
    except (TypeError, ValueError):
        return Response(
            {"error": "expected_version debe ser un entero"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if expected_version != evaluación.version:
        return Response(
            {
                "error": "La evaluación cambió en otro dispositivo",
                "expected_version": expected_version,
                "current_version": evaluación.version,
                "estado": evaluación.estado,
                "current_item_id": evaluación.current_item_id,
            },
            status=status.HTTP_409_CONFLICT,
        )
    return None


def _get_locked_evaluation_by_session(session_code):
    return (
        Evaluación.objects.select_for_update()
        .select_related("niño")
        .get(session_code=session_code.strip().upper())
    )


def _audit_evidence_access(request, evidencia, action):
    user = getattr(request, "user", None)
    access_token = _participant_access(request, evidencia.evaluación)
    EvidenceAccessAudit.objects.create(
        evidencia=evidencia,
        action=action,
        actor=(
            "PSYCHOLOGIST"
            if user and user.is_authenticated
            else getattr(access_token, "actor_role", "SESSION")
        ),
        actor_id=(
            str(user.id)
            if user and user.is_authenticated
            else getattr(access_token, "device_id", "")
        ),
        ip_address=_client_ip(request),
    )


from src.api.children.models import Niño
from src.application.services.edad_service import EdadService
from src.application.services.rules_service import rules_service
from src.application.services.baremos_service import baremos_service
from src.application.services.scoring_service import scoring_service
from src.application.services.dayc2_flow_service import (
    dayc2_flow_service,
    normalize_result_label,
    sincronizar_item_con_respuesta,
)
from src.application.services.item_catalog_service import item_catalog_service
from src.application.services.evaluation_state_machine import evaluation_state_machine
from src.application.services.response_submission_service import (
    InvalidResponseSubmission,
    validate_response_submission,
)
from .serializers import (
    generar_codigo_sesion,
    serialize_evaluación as _serialize_evaluación,
    serialize_item as _serialize_item,
    serialize_resultado_area as _serialize_resultado_area,
    autorizar_evaluacion as _autorizar_evaluacion,
    client_ip as _client_ip,
    ensure_session_token as _ensure_session_token,
    get_evaluación_by_session as _get_evaluación_by_session,
    get_session_access_token as _get_session_access_token,
    generar_pdf_evaluacion as _generar_pdf_evaluacion,
    verify_session_token as _verify_session_token,
)


def _participant_access(request, evaluación):
    bearer = request.headers.get("Authorization", "").replace("Bearer ", "")
    access_token = _get_session_access_token(evaluación, bearer)
    return None if access_token == "legacy" else access_token


def _is_owner_psychologist(request, evaluación):
    return request.user.is_authenticated and str(request.user.id) == str(
        evaluación.psychologist_id
    )


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def crear_evaluación(request):
    """Create new evaluation for a child"""
    if request.method == "GET":
        from src.api.children.views import _paginate

        evaluaciones_qs = (
            Evaluación.objects.select_related("niño")
            .filter(psychologist_id=str(request.user.id))
            .order_by("-created_at")
        )
        evaluaciones, meta = _paginate(evaluaciones_qs, request)
        return Response(
            {"results": [_serialize_evaluación(e) for e in evaluaciones], **meta}
        )

    niño_id = request.data.get("nino_id")

    try:
        niño = Niño.objects.get(pk=niño_id, psychologist=request.user)
    except Niño.DoesNotExist:
        return Response(
            {"error": "Niño no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )

    edad_meses = EdadService.calcular_edad_meses(niño.fecha_nacimiento)

    evaluación = Evaluación.objects.create(
        niño=niño,
        psychologist_id=str(request.user.id),
        estado=Evaluación.Estado.INITIATED,
        edad_meses=edad_meses,
        session_code=generar_codigo_sesion(),
        started_at=timezone.now(),
    )
    dayc2_flow_service.get_current_item(evaluación)

    return Response(_serialize_evaluación(evaluación), status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_evaluación(request, pk):
    """Get evaluation details"""
    try:
        evaluación = Evaluación.objects.select_related("niño").get(
            pk=pk, psychologist_id=str(request.user.id)
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    return Response(_serialize_evaluación(evaluación))


@api_view(["GET"])
@permission_classes([AllowAny])
def tarea_actual(request, pk):
    """Get current task for evaluation (for child interface)"""
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(request, evaluación):
        return Response({"error": "No autorizado"}, status=status.HTTP_403_FORBIDDEN)

    task = dayc2_flow_service.get_current_task_payload(evaluación)
    if task is None:
        return Response(
            {"error": "No hay ítem disponible"}, status=status.HTTP_404_NOT_FOUND
        )

    return Response(task)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def registrar_respuesta(request, pk):
    """Register a response and evaluate stop rules"""
    try:
        evaluación = Evaluación.objects.select_for_update().get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request, evaluación, [SessionAccessToken.ActorRole.ADULT]
    ):
        return Response(
            {"error": "No autorizado para registrar respuestas"},
            status=status.HTTP_403_FORBIDDEN,
        )

    idempotency_key = _idempotency_key(request)
    if idempotency_key:
        previous = Respuesta.objects.filter(
            evaluación=evaluación, idempotency_key=idempotency_key
        ).first()
        if previous:
            return Response(
                {
                    "evaluación_estado": evaluación.estado,
                    "estado": evaluación.estado,
                    "idempotent_replay": True,
                    "current_task": dayc2_flow_service.get_current_task_payload(
                        evaluación
                    ),
                    "version": evaluación.version,
                }
            )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    try:
        validate_response_submission(evaluación, request.data.get("item_id"))
    except InvalidResponseSubmission as exc:
        return Response({"error": str(exc)}, status=status.HTTP_409_CONFLICT)

    raw_result = request.data.get("resultado", request.data.get("result", "CORRECT"))
    participant = _participant_access(request, evaluación)
    response_source = (
        Respuesta.Source.ADULT_ASSISTED
        if participant and participant.actor_role == SessionAccessToken.ActorRole.ADULT
        else Respuesta.Source.SYSTEM_ASSISTED
    )
    item, advance_info = dayc2_flow_service.complete_current_item(
        evaluación=evaluación,
        result=raw_result,
        source=response_source,
        duration_ms=request.data.get(
            "tiempo_respuesta_ms", request.data.get("duration_ms")
        ),
        confidence=request.data.get("confidence"),
        raw_data=request.data.get("raw_data", {}),
        notes=request.data.get("notes", ""),
    )

    if item and not item.final_result:
        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        try:
            sincronizar_item_con_respuesta(
                item,
                item.system_result or normalize_result_label(raw_result),
                requires_review=bool(
                    catalog_item.get("requiere_revision_psicologo", True)
                ),
            )
        except Exception:
            logger.exception(
                "sincronizar_item_con_respuesta failed for eval=%s item=%s",
                pk,
                item.item_id,
            )

    evaluación.refresh_from_db()
    if idempotency_key and item:
        Respuesta.objects.filter(
            evaluación=evaluación, evaluación_item=item, idempotency_key__isnull=True
        ).order_by("-created_at").update(idempotency_key=idempotency_key)
    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)
    return Response(
        {
            "evaluación_estado": evaluación.estado,
            "estado": evaluación.estado,
            "item": _serialize_item(item) if item else None,
            "stop_triggered": bool(advance_info.get("area_finished_by_rule")),
            "area_finished": bool(advance_info.get("area_finished")),
            "evaluation_finished": bool(advance_info.get("evaluation_finished")),
            "next_area": advance_info.get("next_area"),
            "next_item_id": advance_info.get("next_item_id"),
            "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
            "version": evaluación.version,
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def registrar_auto_result(request, pk, item_id):
    """Register an automatic result from a digital activity and save it as evidence."""
    try:
        evaluación = Evaluación.objects.select_for_update().get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request, evaluación, [SessionAccessToken.ActorRole.CHILD]
    ):
        return Response(
            {"error": "No autorizado para registrar resultados"},
            status=status.HTTP_403_FORBIDDEN,
        )

    idempotency_key = _idempotency_key(request)
    if (
        idempotency_key
        and Evidencia.objects.filter(
            evaluación=evaluación, idempotency_key=idempotency_key
        ).exists()
    ):
        return Response(
            {
                "evaluación_estado": evaluación.estado,
                "estado": evaluación.estado,
                "idempotent_replay": True,
                "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
                "version": evaluación.version,
            }
        )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    try:
        validate_response_submission(evaluación, item_id)
    except InvalidResponseSubmission as exc:
        return Response({"error": str(exc)}, status=status.HTTP_409_CONFLICT)

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    if not evaluación_item:
        return Response(
            {"error": "Ítem no encontrado en la evaluación"},
            status=status.HTTP_404_NOT_FOUND,
        )

    resultado = request.data.get("resultado", "INCONCLUSIVE")
    confidence = request.data.get("confidence", 1.0)
    raw_data = request.data.get("raw_data", {})
    duration_ms = request.data.get("duration_ms")

    try:
        json.dumps(raw_data)
    except TypeError:
        raw_data = {}

    Evidencia.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        type=Evidencia.Tipo.SYSTEM_RESULT,
        metadata={
            "suggested_result": resultado,
            "confidence": confidence,
            "raw_data": raw_data,
        },
        captured_by="SYSTEM_AUTO",
        idempotency_key=idempotency_key,
    )

    item, advance_info = dayc2_flow_service.complete_current_item(
        evaluación=evaluación,
        result=resultado,
        source=Respuesta.Source.SYSTEM_AUTO,
        duration_ms=duration_ms,
        confidence=confidence,
        raw_data=raw_data,
    )

    if item and not item.final_result:
        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        try:
            sincronizar_item_con_respuesta(
                item,
                item.system_result or normalize_result_label(resultado),
                requires_review=bool(
                    catalog_item.get("requiere_revision_psicologo", True)
                ),
            )
        except Exception:
            logger.exception(
                "sincronizar_item_con_respuesta failed for eval=%s item=%s",
                pk,
                item.item_id,
            )

    evaluación.refresh_from_db()
    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)
    return Response(
        {
            "evaluación_estado": evaluación.estado,
            "estado": evaluación.estado,
            "stop_triggered": bool(advance_info.get("area_finished_by_rule")),
            "area_finished": bool(advance_info.get("area_finished")),
            "evaluation_finished": bool(advance_info.get("evaluation_finished")),
            "next_area": advance_info.get("next_area"),
            "next_item_id": advance_info.get("next_item_id"),
            "current_task": (
                dayc2_flow_service.get_current_task_payload(evaluación)
                if not advance_info.get("evaluation_finished")
                else None
            ),
            "version": evaluación.version,
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def join_evaluación(request):
    session_code = str(request.data.get("session_code") or "").strip().upper()
    actor_role = str(request.data.get("actor_role") or "").strip().upper()
    valid_roles = {choice.value for choice in SessionAccessToken.ActorRole}
    if actor_role not in valid_roles:
        return Response(
            {"error": "Rol de sesión inválido"}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        evaluación = Evaluación.objects.get(session_code=session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )
    token = _ensure_session_token(
        evaluación, actor_role, request.data.get("device_id", "")
    )
    return Response(
        {
            **_serialize_evaluación(evaluación),
            "session_token": token,
            "actor_role": actor_role,
        }
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def tarea_actual_por_session(request, session_code):
    try:
        evaluación = Evaluación.objects.get(session_code=session_code.upper())
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return tarea_actual(request, evaluación.id)


@api_view(["POST"])
@permission_classes([AllowAny])
def registrar_respuesta_por_session(request, session_code):
    try:
        evaluación = Evaluación.objects.get(session_code=session_code.upper())
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return registrar_respuesta(request, evaluación.id)


@api_view(["GET"])
@permission_classes([AllowAny])
def session_state(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request,
        evaluación,
        [SessionAccessToken.ActorRole.CHILD, SessionAccessToken.ActorRole.ADULT],
    ):
        return Response(
            {"error": "Token de sesión inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )

    bearer = request.headers.get("Authorization", "").replace("Bearer ", "")
    consentimiento = getattr(evaluación, "consentimiento", None)
    child_data_required = (
        not evaluación.child_data_completed
        or not evaluación.niño.nombre
        or not evaluación.niño.fecha_nacimiento
    )
    return Response(
        {
            "evaluacion": _serialize_evaluación(evaluación),
            "child_data_required": child_data_required,
            "consent_required": not (consentimiento and consentimiento.accepted),
            "consent_accepted": bool(consentimiento and consentimiento.accepted),
            "session_token": (
                bearer
                if bearer and consentimiento and consentimiento.accepted
                else None
            ),
            "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def complete_child_data(request, session_code):
    try:
        evaluación = _get_locked_evaluation_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request, evaluación, [SessionAccessToken.ActorRole.ADULT]
    ):
        return Response(
            {"error": "Token de sesión inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    niño = evaluación.niño
    if request.data.get("nombre"):
        niño.nombre = request.data["nombre"]
    if request.data.get("fecha_nacimiento"):
        niño.fecha_nacimiento = request.data["fecha_nacimiento"]
    for field in [
        "genero",
        "padre_tutor",
        "escuela",
        "nombre_informante",
        "relacion_informante",
        "periodo_conoce_nino",
    ]:
        if field in request.data:
            setattr(niño, field, request.data.get(field))
    niño.save()

    evaluación.edad_meses = EdadService.calcular_edad_meses(niño.fecha_nacimiento)
    evaluación.child_data_completed = True
    evaluación.save(update_fields=["edad_meses", "child_data_completed"])
    evaluation_state_machine.transition(evaluación, Evaluación.Estado.WAITING_CONSENT)
    dayc2_flow_service.get_current_item(evaluación)
    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)
    return Response({"evaluacion": _serialize_evaluación(evaluación)})


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def accept_consent(request, session_code):
    try:
        evaluación = _get_locked_evaluation_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request, evaluación, [SessionAccessToken.ActorRole.ADULT]
    ):
        return Response(
            {"error": "Token de sesión inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    accepted = bool(request.data.get("accepted", False))
    if not accepted:
        return Response(
            {"error": "El consentimiento es obligatorio para iniciar"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    consentimiento, _ = Consentimiento.objects.update_or_create(
        evaluación=evaluación,
        defaults={
            "accepted": True,
            "accepted_at": timezone.now(),
            "accepted_logs": True,
            "accepted_screenshots": True,
            "accepted_audio": True,
            "accepted_video": True,
            "user_agent": request.META.get("HTTP_USER_AGENT", ""),
            "ip_address": _client_ip(request),
        },
    )
    if evaluación.estado in [
        Evaluación.Estado.INITIATED,
        Evaluación.Estado.WAITING_CONSENT,
    ]:
        evaluación.started_at = evaluación.started_at or timezone.now()
        evaluation_state_machine.transition(
            evaluación, Evaluación.Estado.IN_PROGRESS, ["started_at"]
        )

    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)

    return Response(
        {
            "session_token": request.headers.get("Authorization", "").replace(
                "Bearer ", ""
            ),
            "consentimiento_id": str(consentimiento.id),
            "evaluacion": _serialize_evaluación(evaluación),
            "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def start_child_session(request, session_code):
    try:
        evaluación = _get_locked_evaluation_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request,
        evaluación,
        [SessionAccessToken.ActorRole.CHILD, SessionAccessToken.ActorRole.ADULT],
    ):
        return Response(
            {"error": "Token de sesión inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    if (
        not getattr(evaluación, "consentimiento", None)
        or not evaluación.consentimiento.accepted
    ):
        return Response(
            {"error": "Consentimiento requerido"}, status=status.HTTP_400_BAD_REQUEST
        )

    item = dayc2_flow_service.start_current_item(evaluación)
    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)
    return Response(
        {
            "evaluacion": _serialize_evaluación(evaluación),
            "item": _serialize_item(item) if item else None,
            "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def finish_child_session(request, session_code):
    try:
        evaluación = _get_locked_evaluation_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )

    session_token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if not _verify_session_token(
        evaluación, session_token, [SessionAccessToken.ActorRole.ADULT]
    ):
        return Response(
            {"error": "Token de sesión inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )

    version_error = _require_expected_version(request, evaluación)
    if version_error:
        return version_error

    consentimiento = getattr(evaluación, "consentimiento", None)
    if consentimiento and "adult_observation" in request.data:
        consentimiento.adult_observation = request.data.get("adult_observation") or ""
        consentimiento.save(update_fields=["adult_observation"])

    evaluación.completed_at = evaluación.completed_at or timezone.now()
    evaluation_state_machine.transition(
        evaluación, Evaluación.Estado.PENDING_REVIEW, ["completed_at"]
    )
    _advance_evaluation_version(evaluación)
    _publish_evaluation_progress(evaluación)
    return Response({"evaluacion": _serialize_evaluación(evaluación)})


@api_view(["POST"])
@permission_classes([AllowAny])
def registrar_evento_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if not _autorizar_evaluacion(
        request,
        evaluación,
        [SessionAccessToken.ActorRole.CHILD, SessionAccessToken.ActorRole.ADULT],
    ):
        return Response(
            {"error": "No autorizado para registrar eventos"},
            status=status.HTTP_403_FORBIDDEN,
        )

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    access_token = _participant_access(request, evaluación)
    event = InteractionEvent.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        event_type=request.data.get("event_type", "UNKNOWN"),
        event_payload=request.data.get("event_payload", {}),
        relative_time_ms=request.data.get("relative_time_ms"),
        actor_role=(
            "PSYCHOLOGIST"
            if _is_owner_psychologist(request, evaluación)
            else access_token.actor_role
        ),
        device_id=getattr(access_token, "device_id", ""),
    )
    return Response(
        {"id": str(event.id), "status": "ok"}, status=status.HTTP_201_CREATED
    )


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
@transaction.atomic
def manejar_evidencia_item(request, pk, item_id):
    try:
        # Do not join the optional consent relation while locking. PostgreSQL
        # rejects FOR UPDATE on the nullable side of that outer join.
        evaluación = Evaluación.objects.select_for_update().get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        if not _is_owner_psychologist(request, evaluación):
            return Response(
                {"error": "Solo el psicólogo puede consultar evidencias"},
                status=status.HTTP_403_FORBIDDEN,
            )
    elif not _autorizar_evaluacion(
        request,
        evaluación,
        [SessionAccessToken.ActorRole.CHILD, SessionAccessToken.ActorRole.ADULT],
    ):
        return Response(
            {"error": "No autorizado para registrar evidencias"},
            status=status.HTTP_403_FORBIDDEN,
        )

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    if not evaluación_item:
        return Response(
            {"error": "Ítem no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        evidencias = Evidencia.objects.filter(evaluación_item=evaluación_item).order_by(
            "created_at"
        )
        for evidencia in evidencias:
            _audit_evidence_access(request, evidencia, "LISTED")
        return Response(
            [
                {
                    "id": str(ev.id),
                    "type": ev.type,
                    "metadata": ev.metadata,
                    "duration_ms": ev.duration_ms,
                    "size_bytes": ev.size_bytes,
                    "captured_by": ev.captured_by,
                    "created_at": ev.created_at.isoformat() if ev.created_at else None,
                    "download_url": (
                        f"/api/evaluaciones/evidencias/{ev.id}/download/"
                        if ev.file
                        else None
                    ),
                }
                for ev in evidencias
            ]
        )

    consentimiento = getattr(evaluación, "consentimiento", None)
    if not consentimiento or not consentimiento.accepted:
        return Response(
            {"error": "El consentimiento es obligatorio para registrar evidencias"},
            status=status.HTTP_403_FORBIDDEN,
        )

    uploaded_file = request.FILES.get("file")
    evidence_type = request.data.get("type", Evidencia.Tipo.LOG)
    valid_types = {choice.value for choice in Evidencia.Tipo}
    if evidence_type not in valid_types:
        return Response(
            {"error": "Tipo de evidencia inválido"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    consent_fields = {
        Evidencia.Tipo.LOG: "accepted_logs",
        Evidencia.Tipo.TIME_EVENT: "accepted_logs",
        Evidencia.Tipo.SCREENSHOT: "accepted_screenshots",
        Evidencia.Tipo.CAMERA_FRAME: "accepted_screenshots",
        Evidencia.Tipo.AUDIO: "accepted_audio",
        Evidencia.Tipo.VIDEO: "accepted_video",
    }
    consent_field = consent_fields.get(evidence_type)
    if consent_field and not getattr(consentimiento, consent_field):
        return Response(
            {"error": "No existe consentimiento para este tipo de evidencia"},
            status=status.HTTP_403_FORBIDDEN,
        )
    if uploaded_file and uploaded_file.size > settings.MAX_EVIDENCE_FILE_SIZE:
        return Response(
            {"error": "El archivo de evidencia excede el tamaño permitido"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if uploaded_file:
        expected_media_type = {
            Evidencia.Tipo.SCREENSHOT: "image/",
            Evidencia.Tipo.CAMERA_FRAME: "image/",
            Evidencia.Tipo.AUDIO: "audio/",
            Evidencia.Tipo.VIDEO: "video/",
        }.get(evidence_type)
        if expected_media_type and not uploaded_file.content_type.startswith(
            expected_media_type
        ):
            return Response(
                {"error": "El archivo no coincide con el tipo de evidencia"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    idempotency_key = _idempotency_key(request)
    if idempotency_key:
        previous = Evidencia.objects.filter(
            evaluación=evaluación, idempotency_key=idempotency_key
        ).first()
        if previous:
            return Response(
                {
                    "id": str(previous.id),
                    "type": previous.type,
                    "idempotent_replay": True,
                }
            )
    metadata_raw = request.data.get("metadata", "{}")
    if isinstance(metadata_raw, str):
        try:
            metadata_raw = json.loads(metadata_raw)
        except json.JSONDecodeError:
            metadata_raw = {}

    access_token = _participant_access(request, evaluación)
    captured_by = "PSYCHOLOGIST"
    if access_token:
        captured_by = f"{access_token.actor_role}_DEVICE"

    evidencia = Evidencia.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        type=evidence_type,
        file=uploaded_file,
        metadata=metadata_raw,
        duration_ms=request.data.get("duration_ms"),
        size_bytes=(
            uploaded_file.size if uploaded_file else request.data.get("size_bytes")
        ),
        captured_by=captured_by,
        idempotency_key=idempotency_key,
        retention_expires_at=timezone.now()
        + timedelta(days=settings.EVIDENCE_RETENTION_DAYS),
    )
    _audit_evidence_access(request, evidencia, "CREATED")
    return Response(
        {"id": str(evidencia.id), "type": evidencia.type},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def descargar_evidencia(request, evidence_id):
    try:
        evidencia = Evidencia.objects.select_related("evaluación").get(pk=evidence_id)
    except Evidencia.DoesNotExist:
        return Response(
            {"error": "Evidencia no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    evaluación = evidencia.evaluación
    if not _is_owner_psychologist(request, evaluación):
        return Response(
            {"error": "Solo el psicólogo puede descargar evidencias"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if not evidencia.file:
        return Response(
            {"error": "El archivo físico no existe"}, status=status.HTTP_404_NOT_FOUND
        )

    _audit_evidence_access(request, evidencia, "DOWNLOADED")

    return FileResponse(open(evidencia.file.path, "rb"), as_attachment=False)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def review_overview(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    items = evaluación.items.order_by("area", "orden", "attempt_number")
    return Response(
        {
            "evaluacion": _serialize_evaluación(evaluación),
            "items": [_serialize_item(item) for item in items],
            "pending_count": items.filter(
                estado=EvaluacionItem.Estado.NEEDS_REVIEW
            ).count(),
            "reviewed_count": items.filter(
                estado=EvaluacionItem.Estado.REVIEWED
            ).count(),
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def review_pending(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    items = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).order_by(
        "area", "orden"
    )
    return Response([_serialize_item(item) for item in items])


@api_view(["PATCH", "PUT"])
@permission_classes([IsAuthenticated])
def review_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
        item = evaluación.items.get(item_id=item_id)
    except Evaluación.DoesNotExist, EvaluacionItem.DoesNotExist:
        return Response(
            {"error": "Ítem no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )

    final_result = request.data.get("final_result")
    if final_result not in [choice.value for choice in EvaluacionItem.Resultado]:
        return Response(
            {"error": "Resultado final inválido"}, status=status.HTTP_400_BAD_REQUEST
        )

    previous_system_result = item.system_result
    item.final_result = final_result
    item.estado = EvaluacionItem.Estado.REVIEWED
    item.reviewed_by = request.user
    item.reviewed_at = timezone.now()
    item.psychologist_notes = request.data.get(
        "psychologist_notes", item.psychologist_notes
    )
    item.save()

    validation_status = Respuesta.ValidationStatus.PSYCHOLOGIST_CONFIRMED
    if previous_system_result and previous_system_result != final_result:
        validation_status = Respuesta.ValidationStatus.PSYCHOLOGIST_CORRECTED

    Respuesta.objects.create(
        evaluación=evaluación,
        evaluación_item=item,
        minijuego_id=item.item_id,
        item_id=item.item_id,
        area=item.area,
        resultado=(
            Respuesta.Resultado.CORRECT
            if final_result == EvaluacionItem.Resultado.PASS
            else Respuesta.Resultado.ERROR
        ),
        final_result=final_result,
        source=Respuesta.Source.PSYCHOLOGIST_REVIEW,
        validation_status=validation_status,
        notes=item.psychologist_notes,
        is_final=True,
    )
    for evidencia in item.evidencias.all():
        _audit_evidence_access(request, evidencia, "REVIEWED")
    return Response({"item": _serialize_item(item)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def review_complete(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    pendientes = evaluación.items.filter(
        estado=EvaluacionItem.Estado.NEEDS_REVIEW,
        final_result__isnull=True,
    )
    for item in pendientes:
        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        needs_review = bool(catalog_item.get("requiere_revision_psicologo", True))
        sincronizar_item_con_respuesta(
            item,
            Respuesta.Resultado.NOT_APPLICABLE,
            requires_review=needs_review,
        )

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)

    evaluación.validated_calculated_at = timezone.now()
    evaluation_state_machine.transition(
        evaluación, Evaluación.Estado.VALIDATED, ["validated_calculated_at"]
    )

    return Response(
        {
            "evaluacion": _serialize_evaluación(evaluación),
            "resultados": [_serialize_resultado_area(r) for r in resultados],
            "gdq_global": gdq_global,
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listar_respuestas(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return Response(
        [
            {
                "id": str(r.id),
                "evaluacion_id": str(evaluación.id),
                "minijuego_id": r.minijuego_id,
                "item_id": r.item_id,
                "resultado": r.resultado,
                "tiempo_respuesta_ms": r.tiempo_respuesta_ms,
                "created_at": r.created_at.isoformat() if r.created_at else None,
            }
            for r in evaluación.respuestas.order_by("created_at")
        ]
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def progreso_evaluación(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    if not _autorizar_evaluacion(
        request,
        evaluación,
        [SessionAccessToken.ActorRole.CHILD, SessionAccessToken.ActorRole.ADULT],
    ):
        return Response({"error": "No autorizado"}, status=status.HTTP_403_FORBIDDEN)
    completed = evaluación.items.filter(completed_at__isnull=False).count()
    return Response(
        {
            "event_id": str(uuid.uuid4()),
            "total_items": evaluación.items.count(),
            "completed_items": completed,
            "current_item": evaluación.current_item_id or "",
            "estado": evaluación.estado,
            "version": evaluación.version,
            "server_time": timezone.now().isoformat(),
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listar_resultados(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return Response(
        [
            {**_serialize_resultado_area(r), "evaluacion_id": str(evaluación.id)}
            for r in evaluación.resultados.all()
        ]
    )


@api_view(["PATCH", "PUT"])
@permission_classes([IsAuthenticated])
def ajustar_resultado(request, pk, rid):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
        resultado = evaluación.resultados.get(pk=rid)
    except Evaluación.DoesNotExist, ResultadoÁrea.DoesNotExist:
        return Response(
            {"error": "Resultado no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )
    if "puntuacion_estandar" in request.data:
        resultado.puntuación_estándar = request.data["puntuacion_estandar"]
    if "puntuación_estándar" in request.data:
        resultado.puntuación_estándar = request.data["puntuación_estándar"]
    resultado.save()
    return Response({"status": "Actualizado"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def reglas_status(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    rule_result = rules_service.evaluar_reglas(list(evaluación.respuestas.all()))
    return Response(
        {
            "triggered": bool(rule_result),
            "regla": rule_result.rule_name if rule_result else None,
            "reason": rule_result.reason if rule_result else None,
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def calcular_puntuación(request, pk):
    """Calculate standard scores for completed evaluation"""
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if evaluación.estado not in [
        Evaluación.Estado.COMPLETED,
        Evaluación.Estado.STOPPED,
        Evaluación.Estado.PENDING_REVIEW,
        Evaluación.Estado.VALIDATED,
    ]:
        return Response(
            {"error": "Evaluación no completada"}, status=status.HTTP_400_BAD_REQUEST
        )

    resultados = scoring_service.calcular_resultados(evaluación)

    gdq_global = scoring_service.calcular_gdq_global(resultados)

    return Response(
        {
            "resultados": [_serialize_resultado_area(r) for r in resultados],
            "gdq_global": gdq_global,
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def calcular_puntuación_preliminar(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)
    evaluación.preliminary_calculated_at = timezone.now()
    evaluación.save(update_fields=["preliminary_calculated_at"])
    pending_count = evaluación.items.filter(
        estado=EvaluacionItem.Estado.NEEDS_REVIEW
    ).count()
    return Response(
        {
            "tipo": "PRELIMINARY",
            "pendientes_revision": pending_count,
            "resultados": [_serialize_resultado_area(r) for r in resultados],
            "gdq_global": gdq_global,
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def calcular_puntuación_validada(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    pendientes = evaluación.items.filter(
        estado=EvaluacionItem.Estado.NEEDS_REVIEW,
        final_result__isnull=True,
    )
    for item in pendientes:
        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        needs_review = bool(catalog_item.get("requiere_revision_psicologo", True))
        sincronizar_item_con_respuesta(
            item,
            Respuesta.Resultado.NOT_APPLICABLE,
            requires_review=needs_review,
        )

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)
    evaluación.validated_calculated_at = timezone.now()
    if evaluación.estado == Evaluación.Estado.PENDING_REVIEW:
        evaluation_state_machine.transition(
            evaluación, Evaluación.Estado.VALIDATED, ["validated_calculated_at"]
        )
    else:
        evaluación.save(update_fields=["validated_calculated_at"])
    return Response(
        {
            "tipo": "VALIDATED",
            "resultados": [_serialize_resultado_area(r) for r in resultados],
            "gdq_global": gdq_global,
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def comparación_resultados(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    items = list(evaluación.items.exclude(system_result__isnull=True))
    comparable = [item for item in items if item.final_result]
    matches = [item for item in comparable if item.system_result == item.final_result]
    corrected = [item for item in comparable if item.system_result != item.final_result]
    pending = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).count()
    concordancia = round((len(matches) / len(comparable)) * 100, 2) if comparable else 0
    return Response(
        {
            "total_items_con_resultado_sistema": len(items),
            "comparables": len(comparable),
            "coincidentes": len(matches),
            "corregidos_por_psicologo": len(corrected),
            "pendientes_revision": pending,
            "concordancia_porcentual": concordancia,
            "items_corregidos": [_serialize_item(item) for item in corrected],
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def reporte_pdf(request, pk):
    try:
        evaluación = (
            Evaluación.objects.select_related("niño", "diagnóstico")
            .prefetch_related("resultados", "items")
            .get(pk=pk, psychologist_id=str(request.user.id))
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    return _generar_pdf_evaluacion(evaluación)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_evidence_policies(request):
    """List all evidence policies (overrides)"""
    policies = EvidencePolicy.objects.all().order_by("item_id")
    return Response(
        [
            {
                "item_id": p.item_id,
                "evidence_types": p.evidence_types,
                "enabled": p.enabled,
                "updated_at": p.updated_at.isoformat() if p.updated_at else None,
            }
            for p in policies
        ]
    )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def evidence_policy_detail(request, item_id):
    """Get, update or reset an evidence policy for a specific item."""
    if request.method == "GET":
        policy = EvidencePolicy.objects.filter(item_id=item_id).first()
        return Response(
            {
                "item_id": item_id,
                "evidence_types": policy.evidence_types if policy else [],
                "enabled": policy.enabled if policy else True,
                "updated_at": (
                    policy.updated_at.isoformat()
                    if policy and policy.updated_at
                    else None
                ),
                "is_override": policy is not None,
            }
        )

    if request.method == "PUT":
        evidence_types = request.data.get("evidence_types")
        enabled = request.data.get("enabled", True)
        if evidence_types is not None and not isinstance(evidence_types, list):
            return Response(
                {"error": "evidence_types debe ser una lista"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        policy, created = EvidencePolicy.objects.update_or_create(
            item_id=item_id,
            defaults={
                "evidence_types": evidence_types or [],
                "enabled": enabled,
                "updated_by": request.user if request.user.is_authenticated else None,
            },
        )
        return Response(
            {
                "item_id": policy.item_id,
                "evidence_types": policy.evidence_types,
                "enabled": policy.enabled,
                "updated_at": (
                    policy.updated_at.isoformat() if policy.updated_at else None
                ),
                "is_override": True,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )

    if request.method == "DELETE":
        deleted, _ = EvidencePolicy.objects.filter(item_id=item_id).delete()
        return Response({"deleted": bool(deleted)}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def calcular_online(request):
    """Calcula resultados on-the-fly desde puntajes brutos + edad (sin BD).

    Body: { edad_meses: int, puntajes: { COG: int, LEN: int, FIS: int, SOC: int, ADA: int } }
    """
    edad_meses = request.data.get("edad_meses")
    puntajes = request.data.get("puntajes", {})

    if not edad_meses or not puntajes:
        return Response(
            {"error": "Se requieren edad_meses y puntajes"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    AREA_MAP = {
        "COG": "COGNITIVO",
        "LEN": "COMUNICACION",
        "FIS": "DESARROLLO_FISICO",
        "SOC": "SOCIAL_EMOCIONAL",
        "ADA": "CONDUCTA_ADAPTATIVA",
    }

    resultados = []
    estándares = []

    for code, area_name in AREA_MAP.items():
        raw = puntajes.get(code, 0)
        estándar = baremos_service.get_puntaje_estandar(area_name, edad_meses, raw)
        percentil = baremos_service.get_percentil(estándar)
        interpretacion = baremos_service.get_interpretacion(estándar)
        edad_eq = baremos_service.get_edad_equivalente(area_name, raw)

        resultados.append(
            {
                "area": code,
                "area_nombre": area_name,
                "puntuacion_directa": raw,
                "puntuacion_estandar": estándar,
                "percentil": str(percentil) if percentil is not None else "-",
                "interpretacion": (
                    interpretacion if estándar is not None else "Sin datos"
                ),
                "edad_equivalente": (
                    str(edad_eq) + " meses" if edad_eq is not None else "-"
                ),
            }
        )
        estándares.append(estándar)

    gdq = baremos_service.calcular_cociente_general(estándares)
    gdq_result = None
    if gdq is not None:
        gdq_result = {
            "cociente_general": gdq,
            "percentil_general": baremos_service.get_percentil(gdq),
            "clasificacion_general": baremos_service.get_interpretacion(gdq),
        }

    return Response(
        {
            "resultados": resultados,
            "gdq": gdq_result,
            "suma_puntajes_estandar": sum(e for e in estándares if e is not None),
        }
    )

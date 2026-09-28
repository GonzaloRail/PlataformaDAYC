"""Views for Evaluaciones API"""

import json
import logging
import uuid
import hashlib
from datetime import timedelta

from django.http import FileResponse
from django.db import transaction
from django.conf import settings
from django.core.cache import cache
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

logger = logging.getLogger(__name__)
from src.api.children.permissions import IsApprovedProfessional as IsAuthenticated
from .models import (
    AssentRecord,
    ConsentRecord,
    Consentimiento,
    DistributedOperation,
    Evaluación,
    EvaluacionItem,
    Evidencia,
    EvidenceAsset,
    EvidenceAccessAudit,
    EvidencePolicy,
    InteractionEvent,
    OutboxEvent,
    PauseRecord,
    ProfessionalReviewAssignment,
    ItemReview,
    EvaluationClosure,
    Respuesta,
    ResultadoÁrea,
    SessionAccessToken,
    SessionInvitation,
    WithdrawalRecord,
)
from .storage import inspect_uploaded_evidence
from src.application.services.provenance_service import provenance_service
from src.application.services.withdrawal_service import apply_withdrawal
from src.application.services.operation_context import bind_operation, clear_operation
from src.application.services.telemetry_service import record_telemetry


def _evaluation_progress_payload(evaluación):
    completed = evaluación.respuestas.count()
    return {
        "event_id": str(uuid.uuid4()),
        "evaluation_id": str(evaluación.id),
        "total_items": evaluación.items.count(),
        "completed_items": completed,
        "current_item": evaluación.current_item_id or "",
        "estado": evaluación.estado,
        "version": evaluación.version,
        "server_time": timezone.now().isoformat(),
    }


def _publish_evaluation_progress(evaluación, operation=None):
    """Persist progress before attempting post-commit publication."""
    payload = _evaluation_progress_payload(evaluación)
    if operation is None:
        operation = DistributedOperation.objects.create(
            evaluación=evaluación,
            actor_role="SYSTEM",
            aggregate_type="EVALUATION",
            aggregate_id=str(evaluación.id),
            operation_type="EVALUATION_PROGRESS",
            base_version=evaluación.version,
            payload=payload,
            status=DistributedOperation.Status.APPLIED,
            result={"version": evaluación.version},
            applied_at=timezone.now(),
        )
    payload["operation_id"] = str(operation.operation_id)
    event = OutboxEvent.objects.create(
        evaluación=evaluación,
        operation=operation,
        event_type="EVALUATION_PROGRESS",
        payload=payload,
    )
    transaction.on_commit(lambda event_id=event.id: deliver_outbox_event(event_id))


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


def _operation_actor(request, evaluación):
    access_token = _participant_access(request, evaluación)
    if request.user.is_authenticated:
        return "PSYCHOLOGIST", str(request.user.id), ""
    if access_token:
        return access_token.actor_role, access_token.device_id, access_token.device_id
    return "SYSTEM", "", ""


def _operation_payload(request, operation_type):
    payload = dict(request.data)
    try:
        json.dumps(payload)
    except TypeError:
        payload = {"operation_type": operation_type}
    return payload


def _receive_operation(
    request,
    evaluación,
    operation_type,
    aggregate_type,
    aggregate_id,
    require_client_id=False,
):
    """Create an inbox record before applying an effect, or return its replay."""
    clear_operation()
    operation_id = _idempotency_key(request)
    if operation_id is None and require_client_id:
        return None, Response(
            {"error": "Idempotency-Key válido es obligatorio"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    operation_id = operation_id or uuid.uuid4()

    existing = DistributedOperation.objects.filter(operation_id=operation_id).first()
    if existing:
        if existing.evaluación_id != evaluación.id:
            return None, Response(
                {"error": "operation_id ya pertenece a otra evaluación"},
                status=status.HTTP_409_CONFLICT,
            )
        if existing.status in {
            DistributedOperation.Status.APPLIED,
            DistributedOperation.Status.CONFLICT,
            DistributedOperation.Status.REJECTED,
        }:
            record_telemetry(
                "DUPLICATE",
                operation=existing,
                attributes={"response_status": existing.response_status or 200},
            )
            return None, Response(
                {**existing.result, "idempotent_replay": True},
                status=existing.response_status or status.HTTP_200_OK,
            )
        return None, Response(
            {
                "error": "La operación ya se encuentra en procesamiento",
                "operation_id": str(operation_id),
            },
            status=status.HTTP_409_CONFLICT,
        )

    actor_role, actor_id, device_id = _operation_actor(request, evaluación)
    raw_sequence = request.data.get("device_sequence")
    try:
        device_sequence = int(raw_sequence) if raw_sequence is not None else None
    except (TypeError, ValueError):
        return None, Response(
            {"error": "device_sequence debe ser un entero no negativo"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if device_sequence is not None and device_sequence < 0:
        return None, Response(
            {"error": "device_sequence debe ser un entero no negativo"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    latest_sequence = (
        DistributedOperation.objects.filter(
            evaluación=evaluación,
            device_id=device_id,
            device_sequence__isnull=False,
        )
        .order_by("-device_sequence")
        .values_list("device_sequence", flat=True)
        .first()
    )
    if (
        latest_sequence is not None
        and device_sequence is not None
        and device_sequence < latest_sequence
    ):
        return None, Response(
            {
                "error": "La operación llegó fuera de orden",
                "operation_id": str(operation_id),
                "current_sequence": latest_sequence,
                "action": "Recuperar el estado canónico y reenviar en orden",
            },
            status=status.HTTP_409_CONFLICT,
        )
    operation = DistributedOperation.objects.create(
        operation_id=operation_id,
        evaluación=evaluación,
        actor_role=actor_role,
        actor_id=actor_id,
        device_id=device_id,
        device_sequence=device_sequence,
        aggregate_type=aggregate_type,
        aggregate_id=str(aggregate_id),
        operation_type=operation_type,
        base_version=request.data.get("expected_version"),
        payload=_operation_payload(request, operation_type),
        status=DistributedOperation.Status.RECEIVED,
    )
    bind_operation(operation.operation_id)
    return operation, None


def _finalize_operation(operation, operation_status, result, response_status):
    result.setdefault("operation_id", str(operation.operation_id))
    if operation_status == DistributedOperation.Status.CONFLICT:
        evaluation = operation.evaluación
        result.setdefault("operation_id", str(operation.operation_id))
        result.setdefault("current_version", evaluation.version)
        result.setdefault("estado", evaluation.estado)
        result.setdefault(
            "recoverable_state",
            {
                "version": evaluation.version,
                "estado": evaluation.estado,
                "current_item_id": evaluation.current_item_id,
            },
        )
        result.setdefault(
            "action", "Recuperar el estado canónico y resolver el conflicto"
        )
    operation.status = operation_status
    operation.result = result
    operation.applied_at = timezone.now()
    operation.response_status = response_status
    operation.save(update_fields=["status", "result", "response_status", "applied_at"])
    if operation_status == DistributedOperation.Status.CONFLICT:
        record_telemetry("CONFLICT", operation=operation)
    elif operation_status in {
        DistributedOperation.Status.REJECTED,
        DistributedOperation.Status.QUARANTINED,
    }:
        record_telemetry(
            "ERROR", operation=operation, attributes={"status": operation_status}
        )
    clear_operation()


def _apply_operation(operation, result, response_status=status.HTTP_200_OK):
    _finalize_operation(
        operation, DistributedOperation.Status.APPLIED, result, response_status
    )


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
                "operation_id": str(_idempotency_key(request) or ""),
                "recoverable_state": {
                    "version": evaluación.version,
                    "estado": evaluación.estado,
                    "current_item_id": evaluación.current_item_id,
                },
                "action": "Recuperar el estado canónico y reenviar con la versión actual",
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
    EvidenceAccessAudit.record(
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


from src.api.children.models import Niño, is_approved_professional
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
from src.application.services.outbox_service import deliver_outbox_event
from .serializers import (
    generar_codigo_sesion,
    serialize_evaluación as _serialize_evaluación,
    serialize_item as _serialize_item,
    serialize_resultado_area as _serialize_resultado_area,
    autorizar_evaluacion as _autorizar_evaluacion,
    client_ip as _client_ip,
    ensure_session_token as _ensure_session_token,
    create_session_invitation as _create_session_invitation,
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
    return (
        is_approved_professional(request.user)
        and evaluación.professional_id == request.user.id
    )


def _conflict_response(request, evaluación, error, action, **details):
    return Response(
        {
            "error": error,
            "operation_id": str(_idempotency_key(request) or ""),
            "current_version": evaluación.version,
            "estado": evaluación.estado,
            "recoverable_state": {
                "version": evaluación.version,
                "estado": evaluación.estado,
                "current_item_id": evaluación.current_item_id,
            },
            "action": action,
            **details,
        },
        status=status.HTTP_409_CONFLICT,
    )


def _pause_conflict(request, evaluación):
    if evaluación.estado == Evaluación.Estado.CANCELLED:
        return _conflict_response(
            request,
            evaluación,
            "La sesión fue retirada",
            "No se permiten nuevas capturas",
        )
    if evaluación.estado == Evaluación.Estado.PAUSED:
        return _conflict_response(
            request,
            evaluación,
            "La sesión está en pausa",
            "Reanudar la sesión autorizadamente",
        )
    latest_assent = evaluación.assent_records.order_by("-created_at").first()
    if latest_assent and latest_assent.decision != AssentRecord.Decision.ACCEPTED:
        return _conflict_response(
            request,
            evaluación,
            "El asentimiento vigente no permite continuar la captura",
            "Registrar asentimiento vigente antes de continuar",
        )
    return None


def _join_attempt_key(request, session_code):
    raw = f"{_client_ip(request)}:{session_code}".encode()
    return f"session-join:{hashlib.sha256(raw).hexdigest()}"


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def crear_evaluación(request):
    """Create new evaluation for a child"""
    if not is_approved_professional(request.user):
        return Response(
            {"error": "Se requiere aprobación como profesional autorizado"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "GET":
        from src.api.children.views import _paginate

        evaluaciones_qs = (
            Evaluación.objects.select_related("niño")
            .filter(professional=request.user)
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

    with transaction.atomic():
        evaluación = Evaluación.objects.create(
            niño=niño,
            psychologist_id=str(request.user.id),
            professional=request.user,
            estado=Evaluación.Estado.INITIATED,
            edad_meses=edad_meses,
            session_code=generar_codigo_sesion(),
            session_expires_at=timezone.now() + timedelta(days=7),
            started_at=timezone.now(),
        )
        invitations = {
            role: _create_session_invitation(evaluación, role, request.user)
            for role in SessionAccessToken.ActorRole.values
        }
        dayc2_flow_service.get_current_item(evaluación)

    return Response(
        {
            **_serialize_evaluación(evaluación),
            "participant_invitations": invitations,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_evaluación(request, pk):
    """Get evaluation details"""
    try:
        evaluación = Evaluación.objects.select_related("niño").get(
            pk=pk, professional=request.user
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

    pause_error = _pause_conflict(request, evaluación)
    if pause_error:
        return pause_error

    operation, replay = _receive_operation(
        request,
        evaluación,
        "RESPONSE_SUBMITTED",
        "EVALUATION_ITEM",
        request.data.get("item_id", ""),
        require_client_id=True,
    )
    if replay:
        return replay

    idempotency_key = _idempotency_key(request)
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error

    try:
        validate_response_submission(evaluación, request.data.get("item_id"))
    except InvalidResponseSubmission as exc:
        result = {"error": str(exc)}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

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
    idempotency_key = _idempotency_key(request)
    if idempotency_key and item:
        Respuesta.objects.filter(
            evaluación=evaluación, evaluación_item=item, idempotency_key__isnull=True
        ).order_by("-created_at").update(idempotency_key=idempotency_key)
    _advance_evaluation_version(evaluación)
    result = {
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
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


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

    pause_error = _pause_conflict(request, evaluación)
    if pause_error:
        return pause_error

    operation, replay = _receive_operation(
        request,
        evaluación,
        "AUTO_RESULT_SUBMITTED",
        "EVALUATION_ITEM",
        item_id,
        require_client_id=True,
    )
    if replay:
        return replay
    idempotency_key = _idempotency_key(request)
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error

    try:
        validate_response_submission(evaluación, item_id)
    except InvalidResponseSubmission as exc:
        result = {"error": str(exc)}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    if not evaluación_item:
        result = {"error": "Ítem no encontrado en la evaluación"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_404_NOT_FOUND,
        )
        return Response(result, status=status.HTTP_404_NOT_FOUND)

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
    result = {
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
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def join_evaluación(request):
    session_code = str(request.data.get("session_code") or "").strip().upper()
    attempt_key = _join_attempt_key(request, session_code)
    attempts = cache.get(attempt_key, 0)
    if attempts >= settings.SESSION_JOIN_MAX_ATTEMPTS:
        return Response(
            {"error": "Demasiados intentos. Intenta nuevamente más tarde."},
            status=status.HTTP_429_TOO_MANY_REQUESTS,
        )
    invitation_code = str(request.data.get("invitation_code") or "").strip()
    if not invitation_code:
        return Response(
            {"error": "El código de invitación es obligatorio"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            session_code=session_code
        )
    except Evaluación.DoesNotExist:
        cache.add(attempt_key, 0, settings.SESSION_JOIN_WINDOW_SECONDS)
        cache.incr(attempt_key)
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )
    invitation = SessionInvitation.objects.filter(
        evaluación=evaluación,
        invitation_hash=hashlib.sha256(invitation_code.encode()).hexdigest(),
        revoked_at__isnull=True,
        used_at__isnull=True,
        expires_at__gt=timezone.now(),
    ).first()
    if invitation is None:
        cache.add(attempt_key, 0, settings.SESSION_JOIN_WINDOW_SECONDS)
        cache.incr(attempt_key)
        return Response(
            {"error": "Código de invitación inválido o vencido"},
            status=status.HTTP_403_FORBIDDEN,
        )
    token = _ensure_session_token(
        evaluación, invitation.actor_role, request.data.get("device_id", "")
    )
    invitation.used_at = timezone.now()
    invitation.save(update_fields=["used_at"])
    cache.delete(attempt_key)
    return Response(
        {
            **_serialize_evaluación(evaluación),
            "session_token": token,
            "actor_role": invitation.actor_role,
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

    operation, replay = _receive_operation(
        request, evaluación, "CHILD_DATA_COMPLETED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
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
    result = {"evaluacion": _serialize_evaluación(evaluación)}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


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

    operation, replay = _receive_operation(
        request, evaluación, "CONSENT_ACCEPTED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error

    accepted = bool(request.data.get("accepted", False))
    assent_confirmed = bool(request.data.get("assent_confirmed", False))
    if not accepted:
        result = {"error": "El consentimiento es obligatorio para iniciar"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    if not assent_confirmed:
        result = {"error": "Se requiere registrar el asentimiento antes de iniciar"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    modalities = request.data.get("modalities")
    if not isinstance(modalities, dict):
        result = {"error": "Se requiere la selección de modalidades de evidencia"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    consent_fields = {
        "logs": "accepted_logs",
        "screenshots": "accepted_screenshots",
        "audio": "accepted_audio",
        "video": "accepted_video",
    }
    if set(modalities) != set(consent_fields) or not all(
        isinstance(value, bool) for value in modalities.values()
    ):
        result = {"error": "Las modalidades de evidencia son inválidas"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    consentimiento, _ = Consentimiento.objects.update_or_create(
        evaluación=evaluación,
        defaults={
            "accepted": True,
            "accepted_at": timezone.now(),
            "consent_text_hash": hashlib.sha256(
                settings.CONSENT_TEXT.encode()
            ).hexdigest(),
            **{
                field: modalities[modality]
                for modality, field in consent_fields.items()
            },
            "user_agent": request.META.get("HTTP_USER_AGENT", ""),
            "ip_address": _client_ip(request),
        },
    )
    ConsentRecord.objects.create(
        evaluación=evaluación,
        accepted=True,
        modalities=modalities,
        consent_text_version=consentimiento.consent_text_version,
        consent_text_hash=consentimiento.consent_text_hash,
        recorded_by_role=SessionAccessToken.ActorRole.ADULT,
        purpose=str(request.data.get("purpose") or "DAYC2_EVALUATION")[:120],
        custodian=str(request.data.get("custodian") or "DAYC2")[:160],
        presenter=str(request.data.get("presenter") or "DAYC2")[:160],
        representative=str(request.data.get("representative") or "")[:160],
        valid_until=evaluación.session_expires_at,
        device_id=_participant_access(request, evaluación).device_id,
        session_identifier=evaluación.session_code,
    )
    AssentRecord.objects.create(
        evaluación=evaluación,
        decision=AssentRecord.Decision.ACCEPTED,
        checkpoint="INITIAL",
        recorded_by_role=SessionAccessToken.ActorRole.ADULT,
        note=request.data.get("assent_note", ""),
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
    result = {
        "session_token": request.headers.get("Authorization", "").replace(
            "Bearer ", ""
        ),
        "consentimiento_id": str(consentimiento.id),
        "evaluacion": _serialize_evaluación(evaluación),
        "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
    }
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def record_assent(request, session_code):
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
            {"error": "Token de adulto inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )
    operation, replay = _receive_operation(
        request, evaluación, "ASSENT_RECORDED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error

    decision = request.data.get("decision")
    if decision not in AssentRecord.Decision.values:
        result = {"error": "Decisión de asentimiento inválida"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    access_token = _participant_access(request, evaluación)
    AssentRecord.objects.create(
        evaluación=evaluación,
        decision=decision,
        checkpoint=str(request.data.get("checkpoint") or "SESSION")[:80],
        recorded_by_role=access_token.actor_role,
        note=request.data.get("note", ""),
    )
    if (
        decision != AssentRecord.Decision.ACCEPTED
        and evaluación.estado == Evaluación.Estado.IN_PROGRESS
    ):
        evaluation_state_machine.transition(evaluación, Evaluación.Estado.PAUSED)
        PauseRecord.objects.create(
            evaluación=evaluación,
            action=PauseRecord.Action.PAUSED,
            reason="Asentimiento no vigente",
            recorded_by_role=access_token.actor_role,
            device_id=access_token.device_id,
        )
    _advance_evaluation_version(evaluación)
    result = {"evaluacion": _serialize_evaluación(evaluación)}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def withdraw_session(request, session_code):
    try:
        evaluación = _get_locked_evaluation_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Código de sesión inválido"}, status=status.HTTP_404_NOT_FOUND
        )
    access_token = _participant_access(request, evaluación)
    if (
        not access_token
        or access_token.actor_role != SessionAccessToken.ActorRole.ADULT
    ):
        return Response(
            {"error": "Token de adulto inválido o faltante"},
            status=status.HTTP_403_FORBIDDEN,
        )
    if evaluación.estado in {Evaluación.Estado.VALIDATED, Evaluación.Estado.ARCHIVED}:
        return _conflict_response(
            request,
            evaluación,
            "No se puede retirar una sesión ya validada",
            "Solicitar reapertura controlada",
        )
    modalities = request.data.get("modalities", [])
    valid_modalities = {"logs", "screenshots", "audio", "video"}
    if not isinstance(modalities, list) or not set(modalities).issubset(
        valid_modalities
    ):
        return Response(
            {"error": "Las modalidades de retiro son inválidas"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    operation, replay = _receive_operation(
        request, evaluación, "SESSION_WITHDRAWN", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    is_full_withdrawal = not modalities
    WithdrawalRecord.objects.create(
        evaluación=evaluación,
        scope="FULL" if is_full_withdrawal else "PARTIAL",
        modalities=modalities,
        reason=request.data.get("reason", ""),
        recorded_by_role=access_token.actor_role,
        retention_action="ERASED",
        processed_at=timezone.now(),
    )
    withdrawn_evidence = apply_withdrawal(evaluación, modalities)
    if not is_full_withdrawal:
        consentimiento = getattr(evaluación, "consentimiento", None)
        if consentimiento:
            fields = {
                "logs": "accepted_logs",
                "screenshots": "accepted_screenshots",
                "audio": "accepted_audio",
                "video": "accepted_video",
            }
            for modality in modalities:
                setattr(consentimiento, fields[modality], False)
            consentimiento.save(
                update_fields=[fields[modality] for modality in modalities]
            )
            ConsentRecord.objects.create(
                evaluación=evaluación,
                accepted=True,
                modalities={
                    modality: getattr(consentimiento, field)
                    for modality, field in fields.items()
                },
                consent_text_version=consentimiento.consent_text_version,
                consent_text_hash=consentimiento.consent_text_hash,
                recorded_by_role=access_token.actor_role,
            )
        _advance_evaluation_version(evaluación)
        result = {
            "evaluacion": _serialize_evaluación(evaluación),
            "withdrawn_evidence": withdrawn_evidence,
        }
        _apply_operation(operation, result)
        _publish_evaluation_progress(evaluación, operation)
        return Response(result)
    now = timezone.now()
    evaluación.access_tokens.filter(revoked_at__isnull=True).update(revoked_at=now)
    if evaluación.estado != Evaluación.Estado.CANCELLED:
        evaluation_state_machine.transition(evaluación, Evaluación.Estado.CANCELLED)
    _advance_evaluation_version(evaluación)
    result = {
        "evaluacion": _serialize_evaluación(evaluación),
        "withdrawn_evidence": withdrawn_evidence,
    }
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def rotate_session_credentials(request, pk):
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            pk=pk, professional=request.user
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    actor_role = request.data.get("actor_role")
    if actor_role not in SessionAccessToken.ActorRole.values:
        return Response(
            {"error": "Rol de invitación inválido"}, status=status.HTTP_400_BAD_REQUEST
        )
    operation, replay = _receive_operation(
        request, evaluación, "SESSION_CREDENTIALS_ROTATED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    now = timezone.now()
    evaluación.invitations.filter(
        actor_role=actor_role, revoked_at__isnull=True
    ).update(revoked_at=now)
    evaluación.access_tokens.filter(
        actor_role=actor_role, revoked_at__isnull=True
    ).update(revoked_at=now)
    code = _create_session_invitation(evaluación, actor_role, request.user)
    result = {"actor_role": actor_role, "invitation_code": code}
    _apply_operation(operation, result)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def pause_session(request, session_code):
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
    operation, replay = _receive_operation(
        request, evaluación, "SESSION_PAUSED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error
    if evaluación.estado != Evaluación.Estado.IN_PROGRESS:
        result = {"error": "Solo una sesión en progreso puede pausarse"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)
    evaluation_state_machine.transition(evaluación, Evaluación.Estado.PAUSED)
    access_token = _participant_access(request, evaluación)
    PauseRecord.objects.create(
        evaluación=evaluación,
        action=PauseRecord.Action.PAUSED,
        reason=request.data.get("reason", ""),
        recorded_by_role=access_token.actor_role,
        device_id=access_token.device_id,
    )
    _advance_evaluation_version(evaluación)
    result = {"evaluacion": _serialize_evaluación(evaluación)}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def resume_session(request, session_code):
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
    operation, replay = _receive_operation(
        request, evaluación, "SESSION_RESUMED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error
    if evaluación.estado != Evaluación.Estado.PAUSED:
        result = {"error": "La sesión no está en pausa"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)
    latest_assent = evaluación.assent_records.order_by("-created_at").first()
    if latest_assent and latest_assent.decision != AssentRecord.Decision.ACCEPTED:
        result = {"error": "Se requiere asentimiento vigente para reanudar"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)
    evaluation_state_machine.transition(evaluación, Evaluación.Estado.IN_PROGRESS)
    access_token = _participant_access(request, evaluación)
    PauseRecord.objects.create(
        evaluación=evaluación,
        action=PauseRecord.Action.RESUMED,
        reason=request.data.get("reason", ""),
        recorded_by_role=access_token.actor_role,
        device_id=access_token.device_id,
    )
    _advance_evaluation_version(evaluación)
    result = {"evaluacion": _serialize_evaluación(evaluación)}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


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

    operation, replay = _receive_operation(
        request, evaluación, "SESSION_ITEM_STARTED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
        return version_error

    if (
        not getattr(evaluación, "consentimiento", None)
        or not evaluación.consentimiento.accepted
    ):
        result = {"error": "Consentimiento requerido"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    item = dayc2_flow_service.start_current_item(evaluación)
    _advance_evaluation_version(evaluación)
    result = {
        "evaluacion": _serialize_evaluación(evaluación),
        "item": _serialize_item(item) if item else None,
        "current_task": dayc2_flow_service.get_current_task_payload(evaluación),
    }
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


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

    operation, replay = _receive_operation(
        request, evaluación, "SESSION_FINISHED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay
    version_error = _require_expected_version(request, evaluación)
    if version_error:
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            version_error.data,
            status.HTTP_409_CONFLICT,
        )
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
    result = {"evaluacion": _serialize_evaluación(evaluación)}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
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

    pause_error = _pause_conflict(request, evaluación)
    if pause_error:
        return pause_error

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    operation, replay = _receive_operation(
        request,
        evaluación,
        "INTERACTION_EVENT_RECORDED",
        "EVALUATION_ITEM",
        evaluación_item.id if evaluación_item else item_id,
    )
    if replay:
        return replay
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
    result = {"id": str(event.id), "status": "ok"}
    _apply_operation(operation, result, status.HTTP_201_CREATED)
    return Response(result, status=status.HTTP_201_CREATED)


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

    if request.method == "POST":
        pause_error = _pause_conflict(request, evaluación)
        if pause_error:
            return pause_error

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
    file_facts = None
    if uploaded_file:
        if evidence_type not in {
            Evidencia.Tipo.SCREENSHOT,
            Evidencia.Tipo.CAMERA_FRAME,
            Evidencia.Tipo.AUDIO,
            Evidencia.Tipo.VIDEO,
        }:
            return Response(
                {"error": "Este tipo de evidencia no admite archivos"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            file_facts = inspect_uploaded_evidence(uploaded_file, evidence_type)
        except ValueError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
    idempotency_key = _idempotency_key(request)
    operation, replay = _receive_operation(
        request,
        evaluación,
        "EVIDENCE_RECORDED",
        "EVALUATION_ITEM",
        evaluación_item.id,
    )
    if replay:
        return replay
    metadata_raw = request.data.get("metadata", "{}")
    if isinstance(metadata_raw, str):
        try:
            metadata_raw = json.loads(metadata_raw)
        except json.JSONDecodeError:
            metadata_raw = {}
    if not isinstance(metadata_raw, dict):
        return Response(
            {"error": "metadata debe ser un objeto"}, status=status.HTTP_400_BAD_REQUEST
        )

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
            file_facts["size_bytes"] if file_facts else request.data.get("size_bytes")
        ),
        captured_by=captured_by,
        capture_actor=captured_by,
        capture_session=evaluación.session_code,
        capture_task=metadata_raw.get("task_id", evaluación_item.item_id),
        capture_item=evaluación_item.item_id,
        capture_authorization=(
            f"{access_token.actor_role}:{access_token.device_id}"
            if access_token
            else f"PSYCHOLOGIST:{request.user.id}"
        ),
        capture_custodian=metadata_raw.get("custodian", captured_by),
        capture_quality=metadata_raw.get("quality", "UNSPECIFIED"),
        absence_reason=metadata_raw.get(
            "absence_reason", "NOT_APPLICABLE" if uploaded_file else "NO_FILE_CAPTURED"
        ),
        idempotency_key=idempotency_key,
        retention_expires_at=timezone.now()
        + timedelta(days=settings.EVIDENCE_RETENTION_DAYS),
    )
    if file_facts:
        EvidenceAsset.objects.create(
            evidencia=evidencia,
            kind=EvidenceAsset.Kind.ORIGINAL,
            file=evidencia.file,
            sha256=file_facts["sha256"],
            size_bytes=file_facts["size_bytes"],
            media_type=file_facts["media_type"],
            signature_type=file_facts["signature_type"],
        )
    provenance_service.record(
        evaluación,
        "evidence_capture",
        [("Evidence", evidencia.id, f"Evidencia {evidencia.type}", evidencia.metadata)],
        [("EvaluationItem", evaluación_item.id, evaluación_item.item_id, {})],
        actor=captured_by,
    )
    _audit_evidence_access(request, evidencia, "CREATED")
    result = {"id": str(evidencia.id), "type": evidencia.type}
    _apply_operation(operation, result, status.HTTP_201_CREATED)
    return Response(result, status=status.HTTP_201_CREATED)


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
    if evidencia.withdrawal_action != "ACTIVE":
        return Response(
            {"error": "La evidencia fue retirada y ya no está disponible"},
            status=status.HTTP_410_GONE,
        )

    _audit_evidence_access(request, evidencia, "DOWNLOADED")

    return FileResponse(open(evidencia.file.path, "rb"), as_attachment=False)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verificar_auditoria_evidencia(request, evidence_id):
    try:
        evidencia = Evidencia.objects.select_related("evaluación").get(pk=evidence_id)
    except Evidencia.DoesNotExist:
        return Response(
            {"error": "Evidencia no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    if not _is_owner_psychologist(request, evidencia.evaluación):
        return Response(
            {"error": "Solo el psicólogo puede verificar evidencias"},
            status=status.HTTP_403_FORBIDDEN,
        )
    valid = EvidenceAccessAudit.verify_chain(evidencia)
    provenance_service.record(
        evidencia.evaluación,
        "evidence_verification",
        [
            (
                "EvidenceVerification",
                evidencia.id,
                "Verificación de evidencia",
                {"valid": valid},
            )
        ],
        [("Evidence", evidencia.id, f"Evidencia {evidencia.type}", {})],
        actor=str(request.user.id),
        actor_kind="PERSON",
    )
    return Response({"evidence_id": str(evidencia.id), "valid": valid})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def review_overview(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    items = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).order_by(
        "area", "orden"
    )
    return Response([_serialize_item(item) for item in items])


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def receive_review_assignment(request, pk):
    """Record the owner's explicit acceptance of responsibility for review."""
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            pk=pk, professional=request.user
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    assignment, created = ProfessionalReviewAssignment.objects.get_or_create(
        evaluación=evaluación,
        professional=request.user,
        active=True,
        defaults={
            "assigned_by": request.user,
            "motive": request.data.get("motive", ""),
        },
    )
    if assignment.received_at is None:
        assignment.received_at = timezone.now()
        assignment.save(update_fields=["received_at"])
    provenance_service.record(
        evaluación,
        "professional_review_assignment",
        [("ReviewAssignment", assignment.id, "Recepción de revisión profesional", {})],
        actor=str(request.user.id),
        actor_kind="PERSON",
    )
    return Response(
        {
            "assignment_id": str(assignment.id),
            "received_at": assignment.received_at.isoformat(),
            "created": created,
        },
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
    )


@api_view(["PATCH", "PUT"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def review_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            pk=pk, professional=request.user
        )
        item = evaluación.items.get(item_id=item_id)
    except (Evaluación.DoesNotExist, EvaluacionItem.DoesNotExist):
        return Response(
            {"error": "Ítem no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )

    operation, replay = _receive_operation(
        request, evaluación, "ITEM_REVIEWED", "EVALUATION_ITEM", item.id
    )
    if replay:
        return replay

    if not ProfessionalReviewAssignment.objects.filter(
        evaluación=evaluación,
        professional=request.user,
        active=True,
        received_at__isnull=False,
    ).exists():
        result = {
            "error": "La recepción explícita de la asignación profesional es obligatoria"
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    if evaluación.estado in {Evaluación.Estado.VALIDATED, Evaluación.Estado.ARCHIVED}:
        result = {
            "error": "No se puede editar una evaluación cerrada",
            "estado": evaluación.estado,
            "action": "Solicitar reapertura controlada",
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)
    final_result = request.data.get("final_result")
    if final_result not in [choice.value for choice in EvaluacionItem.Resultado]:
        result = {"error": "Resultado final inválido"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    motive = str(request.data.get("motive", "")).strip()
    if not motive:
        result = {"error": "El motivo de la revisión o corrección es obligatorio"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    review_version = item.review_versions.order_by("-version").first()
    expected_version = request.data.get("expected_review_version")
    current_version = review_version.version if review_version else 0
    if expected_version is not None and str(expected_version) != str(current_version):
        result = {
            "error": "Conflicto de revisión concurrente",
            "current_review_version": current_version,
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    evidence_ids = request.data.get("evidence_consulted", [])
    if not isinstance(evidence_ids, list):
        result = {"error": "evidence_consulted debe ser una lista"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    evidence = list(
        Evidencia.objects.filter(evaluación=evaluación, id__in=evidence_ids)
    )
    if len(evidence) != len(set(str(value) for value in evidence_ids)):
        result = {"error": "La evidencia consultada no pertenece a la evaluación"}
        _finalize_operation(
            operation,
            DistributedOperation.Status.REJECTED,
            result,
            status.HTTP_400_BAD_REQUEST,
        )
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    previous_system_result = item.system_result
    item.final_result = final_result
    item.estado = EvaluacionItem.Estado.REVIEWED
    item.reviewed_by = request.user
    item.reviewed_at = timezone.now()
    item.psychologist_notes = request.data.get(
        "psychologist_notes", item.psychologist_notes
    )
    item.save()

    review = ItemReview.objects.create(
        evaluación=evaluación,
        item=item,
        version=current_version + 1,
        final_result=final_result,
        motive=motive,
        notes=item.psychologist_notes,
        responsible=request.user,
    )
    review.evidence_consulted.set(evidence)

    validation_status = Respuesta.ValidationStatus.PSYCHOLOGIST_CONFIRMED
    if previous_system_result and previous_system_result != final_result:
        validation_status = Respuesta.ValidationStatus.PSYCHOLOGIST_CORRECTED

    response = Respuesta.objects.create(
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
    provenance_service.record(
        evaluación,
        (
            "professional_correction"
            if validation_status == Respuesta.ValidationStatus.PSYCHOLOGIST_CORRECTED
            else "professional_review"
        ),
        [
            (
                "Response",
                response.id,
                f"Revisión {item.item_id}",
                {"final_result": final_result},
            ),
            (
                "ItemReview",
                review.id,
                f"Revisión versionada {item.item_id}",
                {"version": review.version, "motive": motive},
            ),
        ],
        [
            (
                "EvaluationItem",
                item.id,
                item.item_id,
                {"system_result": previous_system_result},
            )
        ]
        + [
            ("Evidence", evidence.id, f"Evidencia {evidence.type}", {})
            for evidence in evidence
        ],
        actor=str(request.user.id),
        actor_kind="PERSON",
    )
    if previous_system_result and previous_system_result != final_result:
        previous = provenance_service.entity(
            evaluación, "EvaluationItem", item.id, item.item_id
        )
        provenance_service.record_revision(
            previous,
            "professional_correction",
            str(request.user.id),
            {"final_result": final_result},
        )
    for evidencia in item.evidencias.all():
        _audit_evidence_access(request, evidencia, "REVIEWED")
    result = {"item": _serialize_item(item), "review_version": review.version}
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def review_complete(request, pk):
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            pk=pk, professional=request.user
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    operation, replay = _receive_operation(
        request, evaluación, "EVALUATION_VALIDATED", "EVALUATION", evaluación.id
    )
    if replay:
        return replay

    pendientes = evaluación.items.filter(
        estado=EvaluacionItem.Estado.NEEDS_REVIEW,
        final_result__isnull=True,
    )
    if pendientes.exists():
        result = {
            "error": "La validación requiere una decisión profesional por ítem",
            "pending_item_ids": list(pendientes.values_list("item_id", flat=True)),
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    if not ProfessionalReviewAssignment.objects.filter(
        evaluación=evaluación,
        professional=request.user,
        active=True,
        received_at__isnull=False,
    ).exists():
        result = {
            "error": "La recepción explícita de la asignación profesional es obligatoria"
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    incomplete_items = evaluación.items.exclude(
        estado__in=[
            EvaluacionItem.Estado.REVIEWED,
            EvaluacionItem.Estado.AUTO_VALIDATED,
            EvaluacionItem.Estado.INCONCLUSIVE,
            EvaluacionItem.Estado.NOT_ADMINISTERED,
        ]
    ) | evaluación.items.filter(final_result__isnull=True)
    if incomplete_items.exists():
        result = {
            "error": "El cierre requiere todos los ítems completos con resultado final",
            "incomplete_item_ids": list(
                incomplete_items.values_list("item_id", flat=True).distinct()
            ),
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    unreviewed = evaluación.items.filter(requires_review=True).exclude(
        review_versions__isnull=False
    )
    if unreviewed.exists():
        result = {
            "error": "El cierre requiere trazabilidad de revisión para cada ítem requerido",
            "unreviewed_item_ids": list(unreviewed.values_list("item_id", flat=True)),
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    lineage_issues = provenance_service.detect_issues(evaluación)
    if lineage_issues:
        result = {
            "error": "La trazabilidad no es válida",
            "lineage_issues": lineage_issues,
        }
        _finalize_operation(
            operation,
            DistributedOperation.Status.CONFLICT,
            result,
            status.HTTP_409_CONFLICT,
        )
        return Response(result, status=status.HTTP_409_CONFLICT)

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)

    evaluación.validated_calculated_at = timezone.now()
    evaluation_state_machine.transition(
        evaluación, Evaluación.Estado.VALIDATED, ["validated_calculated_at"]
    )
    closure = EvaluationClosure.objects.create(
        evaluación=evaluación,
        closed_by=request.user,
        motive=str(request.data.get("motive", "")).strip()
        or "Cierre profesional validado",
        lineage_checked_at=timezone.now(),
    )
    provenance_service.record(
        evaluación,
        "evaluation_closure",
        [("EvaluationClosure", closure.id, "Cierre profesional", {})],
        [
            (
                "ItemReview",
                review.id,
                f"Revisión {review.item.item_id}",
                {"version": review.version},
            )
            for review in evaluación.item_reviews.select_related("item").all()
        ],
        actor=str(request.user.id),
        actor_kind="PERSON",
    )

    result = {
        "evaluacion": _serialize_evaluación(evaluación),
        "resultados": [_serialize_resultado_area(r) for r in resultados],
        "gdq_global": gdq_global,
    }
    _apply_operation(operation, result)
    _publish_evaluation_progress(evaluación, operation)
    return Response(result)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def reopen_review(request, pk):
    """Reopen a validated evaluation without discarding its prior closure or reports."""
    try:
        evaluación = Evaluación.objects.select_for_update().get(
            pk=pk, professional=request.user
        )
        closure = evaluación.closures.order_by("-closed_at").first()
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Cierre de evaluación no encontrado"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if closure is None:
        return Response(
            {"error": "Cierre de evaluación no encontrado"},
            status=status.HTTP_404_NOT_FOUND,
        )
    motive = str(request.data.get("motive", "")).strip()
    if evaluación.estado != Evaluación.Estado.VALIDATED:
        return Response(
            {"error": "Solo una evaluación validada puede reabrirse"},
            status=status.HTTP_409_CONFLICT,
        )
    if not motive:
        return Response(
            {"error": "El motivo de reapertura es obligatorio"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    closure.reopened_by = request.user
    closure.reopened_at = timezone.now()
    closure.reopening_motive = motive
    closure.save(update_fields=["reopened_by", "reopened_at", "reopening_motive"])
    evaluation_state_machine.transition(
        evaluación, Evaluación.Estado.REVIEW_IN_PROGRESS
    )
    previous = provenance_service.entity(
        evaluación, "EvaluationClosure", closure.id, "Cierre profesional"
    )
    provenance_service.record_revision(
        previous, "controlled_reopening", str(request.user.id), {"motive": motive}
    )
    return Response(
        {
            "evaluacion": _serialize_evaluación(evaluación),
            "reopened_at": closure.reopened_at.isoformat(),
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listar_respuestas(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
@permission_classes([IsAuthenticated])
def provenance_graph(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    entity_id = request.query_params.get("entity_id")
    direction = request.query_params.get("direction", "both")
    if direction not in {"both", "upstream"}:
        return Response(
            {"error": "direction inválida"}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        depth = int(request.query_params.get("depth", 3))
    except ValueError:
        return Response({"error": "depth inválida"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(provenance_service.graph(evaluación, entity_id, direction, depth))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def provenance_result_sources(request, pk, rid):
    try:
        result = ResultadoÁrea.objects.select_related("evaluación").get(
            pk=rid, evaluación_id=pk, evaluación__professional=request.user
        )
    except ResultadoÁrea.DoesNotExist:
        return Response(
            {"error": "Resultado no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )
    return Response(provenance_service.sources_for_result(result))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def provenance_evidence_uses(request, evidence_id):
    try:
        evidence = Evidencia.objects.select_related("evaluación").get(
            pk=evidence_id, evaluación__professional=request.user
        )
    except Evidencia.DoesNotExist:
        return Response(
            {"error": "Evidencia no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return Response(provenance_service.uses_for_evidence(evidence))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def provenance_export(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    return Response(provenance_service.graph(evaluación, depth=20))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def provenance_issues(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )
    issues = provenance_service.detect_issues(evaluación)
    return Response({"compatible": not issues, "issues": issues})


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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
        resultado = evaluación.resultados.get(pk=rid)
    except (Evaluación.DoesNotExist, ResultadoÁrea.DoesNotExist):
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    pendientes = evaluación.items.filter(
        estado=EvaluacionItem.Estado.NEEDS_REVIEW,
        final_result__isnull=True,
    )
    if pendientes.exists():
        return _conflict_response(
            request,
            evaluación,
            "La validación requiere una decisión profesional por ítem",
            "Completar las decisiones pendientes",
            pending_item_ids=list(pendientes.values_list("item_id", flat=True)),
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
        evaluación = Evaluación.objects.get(pk=pk, professional=request.user)
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
            Evaluación.objects.select_related("niño")
            .prefetch_related("resultados", "items")
            .get(pk=pk, professional=request.user)
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if evaluación.estado != Evaluación.Estado.VALIDATED:
        return _conflict_response(
            request,
            evaluación,
            "El reporte final requiere una evaluación validada",
            "Completar la revisión y validación profesional",
        )

    evaluación._report_generated_by = request.user
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

"""Views for Evaluaciones API"""
import json
from django.http import FileResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Consentimiento, Evaluación, EvaluacionItem, Evidencia, EvidencePolicy, InteractionEvent, Respuesta, ResultadoÁrea
from src.api.children.models import Niño
from src.application.services.edad_service import EdadService
from src.application.services.rules_service import rules_service
from src.application.services.scoring_service import scoring_service
from src.application.services.dayc2_flow_service import dayc2_flow_service
from src.application.services.item_catalog_service import item_catalog_service
from .serializers import (
    generar_codigo_sesion,
    serialize_evaluación as _serialize_evaluación,
    serialize_item as _serialize_item,
    serialize_resultado_area as _serialize_resultado_area,
    autorizar_evaluacion as _autorizar_evaluacion,
    client_ip as _client_ip,
    ensure_session_token as _ensure_session_token,
    get_evaluación_by_session as _get_evaluación_by_session,
    generar_pdf_evaluacion as _generar_pdf_evaluacion,
)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def crear_evaluación(request):
    """Create new evaluation for a child"""
    if request.method == 'GET':
        from src.api.children.views import _paginate
        evaluaciones_qs = (
            Evaluación.objects.select_related('niño')
            .filter(psychologist_id=str(request.user.id))
            .order_by('-created_at')
        )
        evaluaciones, meta = _paginate(evaluaciones_qs, request)
        return Response({'results': [_serialize_evaluación(e) for e in evaluaciones], **meta})

    niño_id = request.data.get('nino_id')
    
    try:
        niño = Niño.objects.get(pk=niño_id, psychologist=request.user)
    except Niño.DoesNotExist:
        return Response({'error': 'Niño no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detalle_evaluación(request, pk):
    """Get evaluation details"""
    try:
        evaluación = Evaluación.objects.select_related('niño').get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(_serialize_evaluación(evaluación))


@api_view(['GET'])
@permission_classes([AllowAny])
def tarea_actual(request, pk):
    """Get current task for evaluation (for child interface)"""
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    task = dayc2_flow_service.get_current_task_payload(evaluación)
    if task is None:
        return Response({'error': 'No hay ítem disponible'}, status=status.HTTP_404_NOT_FOUND)

    return Response(task)


@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_respuesta(request, pk):
    """Register a response and evaluate stop rules"""
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if not _autorizar_evaluacion(request, evaluación):
        return Response({'error': 'No autorizado para registrar respuestas'}, status=status.HTTP_403_FORBIDDEN)

    item, advance_info = dayc2_flow_service.complete_current_item(
        evaluación=evaluación,
        result=request.data.get('resultado', request.data.get('result', 'CORRECT')),
        source=request.data.get('source', Respuesta.Source.SYSTEM_ASSISTED),
        duration_ms=request.data.get('tiempo_respuesta_ms', request.data.get('duration_ms')),
        confidence=request.data.get('confidence'),
        raw_data=request.data.get('raw_data', {}),
        notes=request.data.get('notes', ''),
    )

    evaluación.refresh_from_db()
    return Response({
        'evaluación_estado': evaluación.estado,
        'estado': evaluación.estado,
        'item': _serialize_item(item) if item else None,
        'stop_triggered': bool(advance_info.get('area_finished_by_rule')),
        'area_finished': bool(advance_info.get('area_finished')),
        'evaluation_finished': bool(advance_info.get('evaluation_finished')),
        'next_area': advance_info.get('next_area'),
        'next_item_id': advance_info.get('next_item_id'),
        'current_task': dayc2_flow_service.get_current_task_payload(evaluación),
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_auto_result(request, pk, item_id):
    """Register an automatic result from a digital activity and save it as evidence."""
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if not _autorizar_evaluacion(request, evaluación):
        return Response({'error': 'No autorizado para registrar resultados'}, status=status.HTTP_403_FORBIDDEN)

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    if not evaluación_item:
        return Response({'error': 'Ítem no encontrado en la evaluación'}, status=status.HTTP_404_NOT_FOUND)

    resultado = request.data.get('resultado', 'INCONCLUSIVE')
    confidence = request.data.get('confidence', 1.0)
    raw_data = request.data.get('raw_data', {})
    duration_ms = request.data.get('duration_ms')

    try:
        json.dumps(raw_data)
    except TypeError:
        raw_data = {}

    Evidencia.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        type=Evidencia.Tipo.SYSTEM_RESULT,
        metadata={
            'suggested_result': resultado,
            'confidence': confidence,
            'raw_data': raw_data,
        },
        captured_by='SYSTEM_AUTO'
    )

    item, advance_info = dayc2_flow_service.complete_current_item(
        evaluación=evaluación,
        result=resultado,
        source=Respuesta.Source.SYSTEM_AUTO,
        duration_ms=duration_ms,
        confidence=confidence,
        raw_data=raw_data,
    )

    evaluación.refresh_from_db()
    return Response({
        'evaluación_estado': evaluación.estado,
        'estado': evaluación.estado,
        'stop_triggered': bool(advance_info.get('area_finished_by_rule')),
        'area_finished': bool(advance_info.get('area_finished')),
        'evaluation_finished': bool(advance_info.get('evaluation_finished')),
        'next_area': advance_info.get('next_area'),
        'next_item_id': advance_info.get('next_item_id'),
        'current_task': dayc2_flow_service.get_current_task_payload(evaluación) if not advance_info.get('evaluation_finished') else None
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def join_evaluación(request):
    session_code = request.data.get('session_code', '').strip().upper()
    try:
        evaluación = Evaluación.objects.get(session_code=session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)
    return Response(_serialize_evaluación(evaluación))


@api_view(['GET'])
@permission_classes([AllowAny])
def tarea_actual_por_session(request, session_code):
    try:
        evaluación = Evaluación.objects.get(session_code=session_code.upper())
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return tarea_actual(request, evaluación.id)


@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_respuesta_por_session(request, session_code):
    try:
        evaluación = Evaluación.objects.get(session_code=session_code.upper())
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return registrar_respuesta(request, evaluación.id)


@api_view(['GET'])
@permission_classes([AllowAny])
def session_state(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)

    consentimiento = getattr(evaluación, 'consentimiento', None)
    child_data_required = not evaluación.child_data_completed or not evaluación.niño.nombre or not evaluación.niño.fecha_nacimiento
    return Response({
        'evaluacion': _serialize_evaluación(evaluación),
        'child_data_required': child_data_required,
        'consent_required': not (consentimiento and consentimiento.accepted),
        'consent_accepted': bool(consentimiento and consentimiento.accepted),
        'session_token': evaluación.session_token if consentimiento and consentimiento.accepted else None,
        'current_task': dayc2_flow_service.get_current_task_payload(evaluación),
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def complete_child_data(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)

    niño = evaluación.niño
    if request.data.get('nombre'):
        niño.nombre = request.data['nombre']
    if request.data.get('fecha_nacimiento'):
        niño.fecha_nacimiento = request.data['fecha_nacimiento']
    for field in ['genero', 'padre_tutor', 'escuela', 'nombre_informante', 'relacion_informante', 'periodo_conoce_nino']:
        if field in request.data:
            setattr(niño, field, request.data.get(field))
    niño.save()

    evaluación.edad_meses = EdadService.calcular_edad_meses(niño.fecha_nacimiento)
    evaluación.child_data_completed = True
    evaluación.estado = Evaluación.Estado.WAITING_CONSENT
    evaluación.save(update_fields=['edad_meses', 'child_data_completed', 'estado'])
    dayc2_flow_service.get_current_item(evaluación)
    return Response({'evaluacion': _serialize_evaluación(evaluación)})


@api_view(['POST'])
@permission_classes([AllowAny])
def accept_consent(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)

    accepted = bool(request.data.get('accepted', False))
    if not accepted:
        return Response({'error': 'El consentimiento es obligatorio para iniciar'}, status=status.HTTP_400_BAD_REQUEST)

    consentimiento, _ = Consentimiento.objects.update_or_create(
        evaluación=evaluación,
        defaults={
            'accepted': True,
            'accepted_at': timezone.now(),
            'accepted_logs': True,
            'accepted_screenshots': True,
            'accepted_audio': True,
            'accepted_video': True,
            'user_agent': request.META.get('HTTP_USER_AGENT', ''),
            'ip_address': _client_ip(request),
        },
    )
    token = _ensure_session_token(evaluación)
    if evaluación.estado in [Evaluación.Estado.INITIATED, Evaluación.Estado.WAITING_CONSENT]:
        evaluación.estado = Evaluación.Estado.IN_PROGRESS
        evaluación.started_at = evaluación.started_at or timezone.now()
        evaluación.save(update_fields=['estado', 'started_at'])

    return Response({
        'session_token': token,
        'consentimiento_id': str(consentimiento.id),
        'evaluacion': _serialize_evaluación(evaluación),
        'current_task': dayc2_flow_service.get_current_task_payload(evaluación),
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def start_child_session(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)

    if not getattr(evaluación, 'consentimiento', None) or not evaluación.consentimiento.accepted:
        return Response({'error': 'Consentimiento requerido'}, status=status.HTTP_400_BAD_REQUEST)

    item = dayc2_flow_service.start_current_item(evaluación)
    return Response({
        'evaluacion': _serialize_evaluación(evaluación),
        'item': _serialize_item(item) if item else None,
        'current_task': dayc2_flow_service.get_current_task_payload(evaluación),
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def finish_child_session(request, session_code):
    try:
        evaluación = _get_evaluación_by_session(session_code)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Código de sesión inválido'}, status=status.HTTP_404_NOT_FOUND)

    session_token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not session_token or session_token != evaluación.session_token:
        return Response({'error': 'Token de sesión inválido o faltante'}, status=status.HTTP_403_FORBIDDEN)

    consentimiento = getattr(evaluación, 'consentimiento', None)
    if consentimiento and 'adult_observation' in request.data:
        consentimiento.adult_observation = request.data.get('adult_observation') or ''
        consentimiento.save(update_fields=['adult_observation'])

    evaluación.estado = Evaluación.Estado.PENDING_REVIEW
    evaluación.completed_at = evaluación.completed_at or timezone.now()
    evaluación.save(update_fields=['estado', 'completed_at'])
    return Response({'evaluacion': _serialize_evaluación(evaluación)})


@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_evento_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if not _autorizar_evaluacion(request, evaluación):
        return Response({'error': 'No autorizado para registrar eventos'}, status=status.HTTP_403_FORBIDDEN)

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    event = InteractionEvent.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        event_type=request.data.get('event_type', 'UNKNOWN'),
        event_payload=request.data.get('event_payload', {}),
        relative_time_ms=request.data.get('relative_time_ms'),
    )
    return Response({'id': str(event.id), 'status': 'ok'}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def manejar_evidencia_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.select_related('consentimiento').get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if not _autorizar_evaluacion(request, evaluación):
        return Response({'error': 'No autorizado para acceder a estas evidencias'}, status=status.HTTP_403_FORBIDDEN)

    evaluación_item = evaluación.items.filter(item_id=item_id).first()
    if not evaluación_item:
        return Response({'error': 'Ítem no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        evidencias = Evidencia.objects.filter(evaluación_item=evaluación_item).order_by('created_at')
        return Response([{
            'id': str(ev.id),
            'type': ev.type,
            'metadata': ev.metadata,
            'duration_ms': ev.duration_ms,
            'size_bytes': ev.size_bytes,
            'captured_by': ev.captured_by,
            'created_at': ev.created_at.isoformat() if ev.created_at else None,
            'download_url': f'/api/evaluaciones/evidencias/{ev.id}/download/' if ev.file else None
        } for ev in evidencias])

    consentimiento = getattr(evaluación, 'consentimiento', None)
    if not consentimiento or not consentimiento.accepted:
        return Response({'error': 'El consentimiento es obligatorio para registrar evidencias'}, status=status.HTTP_403_FORBIDDEN)

    uploaded_file = request.FILES.get('file')
    metadata_raw = request.data.get('metadata', '{}')
    if isinstance(metadata_raw, str):
        try:
            metadata_raw = json.loads(metadata_raw)
        except json.JSONDecodeError:
            metadata_raw = {}
            
    evidencia = Evidencia.objects.create(
        evaluación=evaluación,
        evaluación_item=evaluación_item,
        type=request.data.get('type', Evidencia.Tipo.LOG),
        file=uploaded_file,
        metadata=metadata_raw,
        duration_ms=request.data.get('duration_ms'),
        size_bytes=uploaded_file.size if uploaded_file else request.data.get('size_bytes'),
        captured_by=request.data.get('captured_by', 'CHILD_DEVICE'),
    )
    return Response({'id': str(evidencia.id), 'type': evidencia.type}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def descargar_evidencia(request, evidence_id):
    try:
        evidencia = Evidencia.objects.select_related('evaluación').get(pk=evidence_id)
    except Evidencia.DoesNotExist:
        return Response({'error': 'Evidencia no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    evaluación = evidencia.evaluación
    if not _autorizar_evaluacion(request, evaluación):
        return Response({'error': 'No autorizado para acceder a este archivo'}, status=status.HTTP_403_FORBIDDEN)

    if not evidencia.file:
        return Response({'error': 'El archivo físico no existe'}, status=status.HTTP_404_NOT_FOUND)

    return FileResponse(open(evidencia.file.path, 'rb'), as_attachment=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def review_overview(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    items = evaluación.items.order_by('area', 'orden', 'attempt_number')
    return Response({
        'evaluacion': _serialize_evaluación(evaluación),
        'items': [_serialize_item(item) for item in items],
        'pending_count': items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).count(),
        'reviewed_count': items.filter(estado=EvaluacionItem.Estado.REVIEWED).count(),
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def review_pending(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    items = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).order_by('area', 'orden')
    return Response([_serialize_item(item) for item in items])


@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def review_item(request, pk, item_id):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
        item = evaluación.items.get(item_id=item_id)
    except (Evaluación.DoesNotExist, EvaluacionItem.DoesNotExist):
        return Response({'error': 'Ítem no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    final_result = request.data.get('final_result')
    if final_result not in [choice.value for choice in EvaluacionItem.Resultado]:
        return Response({'error': 'Resultado final inválido'}, status=status.HTTP_400_BAD_REQUEST)

    previous_system_result = item.system_result
    item.final_result = final_result
    item.estado = EvaluacionItem.Estado.REVIEWED
    item.reviewed_by = request.user
    item.reviewed_at = timezone.now()
    item.psychologist_notes = request.data.get('psychologist_notes', item.psychologist_notes)
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
        resultado=Respuesta.Resultado.CORRECT if final_result == EvaluacionItem.Resultado.PASS else Respuesta.Resultado.ERROR,
        final_result=final_result,
        source=Respuesta.Source.PSYCHOLOGIST_REVIEW,
        validation_status=validation_status,
        notes=item.psychologist_notes,
        is_final=True,
    )
    return Response({'item': _serialize_item(item)})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_complete(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    evaluación.estado = Evaluación.Estado.VALIDATED
    evaluación.validated_calculated_at = timezone.now()
    evaluación.save(update_fields=['estado', 'validated_calculated_at'])
    return Response({'evaluacion': _serialize_evaluación(evaluación)})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_respuestas(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return Response([
        {
            'id': str(r.id),
            'evaluacion_id': str(evaluación.id),
            'minijuego_id': r.minijuego_id,
            'item_id': r.item_id,
            'resultado': r.resultado,
            'tiempo_respuesta_ms': r.tiempo_respuesta_ms,
            'created_at': r.created_at.isoformat() if r.created_at else None,
        }
        for r in evaluación.respuestas.order_by('created_at')
    ])


@api_view(['GET'])
@permission_classes([AllowAny])
def progreso_evaluación(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk)
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    completed = evaluación.respuestas.count()
    return Response({
        'total_items': 50,
        'completed_items': completed,
        'current_item': f'L-{completed + 1:03d}',
        'estado': evaluación.estado,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_resultados(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return Response([
        {**_serialize_resultado_area(r), 'evaluacion_id': str(evaluación.id)}
        for r in evaluación.resultados.all()
    ])


@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def ajustar_resultado(request, pk, rid):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
        resultado = evaluación.resultados.get(pk=rid)
    except (Evaluación.DoesNotExist, ResultadoÁrea.DoesNotExist):
        return Response({'error': 'Resultado no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    if 'puntuacion_estandar' in request.data:
        resultado.puntuación_estándar = request.data['puntuacion_estandar']
    if 'puntuación_estándar' in request.data:
        resultado.puntuación_estándar = request.data['puntuación_estándar']
    resultado.save()
    return Response({'status': 'Actualizado'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reglas_status(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    rule_result = rules_service.evaluar_reglas(list(evaluación.respuestas.all()))
    return Response({
        'triggered': bool(rule_result),
        'regla': rule_result.rule_name if rule_result else None,
        'reason': rule_result.reason if rule_result else None,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calcular_puntuación(request, pk):
    """Calculate standard scores for completed evaluation"""
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    if evaluación.estado not in [Evaluación.Estado.COMPLETED, Evaluación.Estado.STOPPED, Evaluación.Estado.PENDING_REVIEW, Evaluación.Estado.VALIDATED]:
        return Response({'error': 'Evaluación no completada'}, status=status.HTTP_400_BAD_REQUEST)
    
    resultados = scoring_service.calcular_resultados(evaluación)
    
    gdq_global = scoring_service.calcular_gdq_global(resultados)
    
    return Response({
        'resultados': [_serialize_resultado_area(r) for r in resultados],
        'gdq_global': gdq_global,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calcular_puntuación_preliminar(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)
    evaluación.preliminary_calculated_at = timezone.now()
    evaluación.save(update_fields=['preliminary_calculated_at'])
    pending_count = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).count()
    return Response({
        'tipo': 'PRELIMINARY',
        'pendientes_revision': pending_count,
        'resultados': [_serialize_resultado_area(r) for r in resultados],
        'gdq_global': gdq_global,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calcular_puntuación_validada(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    resultados = scoring_service.calcular_resultados(evaluación)
    gdq_global = scoring_service.calcular_gdq_global(resultados)
    evaluación.validated_calculated_at = timezone.now()
    if evaluación.estado == Evaluación.Estado.PENDING_REVIEW:
        evaluación.estado = Evaluación.Estado.VALIDATED
        evaluación.save(update_fields=['validated_calculated_at', 'estado'])
    else:
        evaluación.save(update_fields=['validated_calculated_at'])
    return Response({
        'tipo': 'VALIDATED',
        'resultados': [_serialize_resultado_area(r) for r in resultados],
        'gdq_global': gdq_global,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comparación_resultados(request, pk):
    try:
        evaluación = Evaluación.objects.get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    items = list(evaluación.items.exclude(system_result__isnull=True))
    comparable = [item for item in items if item.final_result]
    matches = [item for item in comparable if item.system_result == item.final_result]
    corrected = [item for item in comparable if item.system_result != item.final_result]
    pending = evaluación.items.filter(estado=EvaluacionItem.Estado.NEEDS_REVIEW).count()
    concordancia = round((len(matches) / len(comparable)) * 100, 2) if comparable else 0
    return Response({
        'total_items_con_resultado_sistema': len(items),
        'comparables': len(comparable),
        'coincidentes': len(matches),
        'corregidos_por_psicologo': len(corrected),
        'pendientes_revision': pending,
        'concordancia_porcentual': concordancia,
        'items_corregidos': [_serialize_item(item) for item in corrected],
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reporte_pdf(request, pk):
    try:
        evaluación = Evaluación.objects.select_related('niño', 'diagnóstico').prefetch_related('resultados').get(pk=pk, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    return _generar_pdf_evaluacion(evaluación)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_evidence_policies(request):
    """List all evidence policies (overrides)"""
    policies = EvidencePolicy.objects.all().order_by('item_id')
    return Response([
        {
            'item_id': p.item_id,
            'evidence_types': p.evidence_types,
            'enabled': p.enabled,
            'updated_at': p.updated_at.isoformat() if p.updated_at else None,
        }
        for p in policies
    ])


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def evidence_policy_detail(request, item_id):
    """Get, update or reset an evidence policy for a specific item."""
    if request.method == 'GET':
        policy = EvidencePolicy.objects.filter(item_id=item_id).first()
        return Response({
            'item_id': item_id,
            'evidence_types': policy.evidence_types if policy else [],
            'enabled': policy.enabled if policy else True,
            'updated_at': policy.updated_at.isoformat() if policy and policy.updated_at else None,
            'is_override': policy is not None,
        })

    if request.method == 'PUT':
        evidence_types = request.data.get('evidence_types')
        enabled = request.data.get('enabled', True)
        if evidence_types is not None and not isinstance(evidence_types, list):
            return Response({'error': 'evidence_types debe ser una lista'}, status=status.HTTP_400_BAD_REQUEST)
        policy, created = EvidencePolicy.objects.update_or_create(
            item_id=item_id,
            defaults={
                'evidence_types': evidence_types or [],
                'enabled': enabled,
                'updated_by': request.user if request.user.is_authenticated else None,
            },
        )
        return Response({
            'item_id': policy.item_id,
            'evidence_types': policy.evidence_types,
            'enabled': policy.enabled,
            'updated_at': policy.updated_at.isoformat() if policy.updated_at else None,
            'is_override': True,
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    if request.method == 'DELETE':
        deleted, _ = EvidencePolicy.objects.filter(item_id=item_id).delete()
        return Response({'deleted': bool(deleted)}, status=status.HTTP_200_OK)

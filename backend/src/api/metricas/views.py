"""Views for metrics"""
from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from src.api.evaluaciones.models import Métricas, Evaluación


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_métricas(request):
    """Get metrics for a date range"""
    from_date = request.query_params.get('from')
    to_date = request.query_params.get('to')
    
    queryset = Métricas.objects.all()
    
    if from_date:
        queryset = queryset.filter(fecha__gte=datetime.fromisoformat(from_date).date())
    if to_date:
        queryset = queryset.filter(fecha__lte=datetime.fromisoformat(to_date).date())
    
    métricas = [
        {
            'fecha': m.fecha.isoformat(),
            'evaluaciones': m.evaluaciones_iniciadas,
            'completadas': m.evaluaciones_completadas,
            'duración_promedio': m.duración_promedio_minutos,
            'errores': m.errores_sistema,
            'fallback_count': m.fallback_activado_count,
        }
        for m in queryset
    ]
    
    return Response({'metrics': métricas})


@api_view(['POST'])
def registrar_métricas(request):
    """Register or update daily metrics (called from evaluation events)"""
    fecha = request.data.get('fecha')
    tipo = request.data.get('tipo')  # 'iniciada', 'completada', 'error', 'fallback'
    
    metrics, created = Métricas.objects.get_or_create(
        fecha=fecha,
        defaults={
            'evaluaciones_iniciadas': 0,
            'evaluaciones_completadas': 0,
            'errores_sistema': 0,
            'fallback_activado_count': 0,
        }
    )
    
    if tipo == 'iniciada':
        metrics.evaluaciones_iniciadas += 1
    elif tipo == 'completada':
        metrics.evaluaciones_completadas += 1
    elif tipo == 'error':
        metrics.errores_sistema += 1
    elif tipo == 'fallback':
        metrics.fallback_activado_count += 1
    
    metrics.save()
    
    return Response({'status': 'Métrica registrada'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_métricas_tesis(request):
    """Get metrics specifically for the research thesis."""
    from src.api.evaluaciones.models import Evaluación, EvaluacionItem, Respuesta
    
    evaluaciones = Evaluación.objects.exclude(estado=Evaluación.Estado.CANCELLED)
    
    total_iniciadas = evaluaciones.count()
    total_completadas = evaluaciones.filter(estado__in=[
        Evaluación.Estado.COMPLETED,
        Evaluación.Estado.PENDING_REVIEW,
        Evaluación.Estado.REVIEW_IN_PROGRESS,
        Evaluación.Estado.VALIDATED
    ]).count()
    
    respuestas = Respuesta.objects.exclude(resultado=Respuesta.Resultado.NOT_APPLICABLE)
    total_respuestas = respuestas.count()
    
    corregidas = respuestas.filter(validation_status=Respuesta.ValidationStatus.PSYCHOLOGIST_CORRECTED).count()
    coincidentes = total_respuestas - corregidas
    
    concordancia = round((coincidentes / total_respuestas * 100) if total_respuestas > 0 else 0, 1)
    
    items = EvaluacionItem.objects.all()
    auto_validados = items.filter(estado=EvaluacionItem.Estado.AUTO_VALIDATED).count()
    total_items = items.count()
    tasa_automatizacion = round((auto_validados / total_items * 100) if total_items > 0 else 0, 1)
    
    evals_completadas = evaluaciones.filter(completed_at__isnull=False, started_at__isnull=False)
    durations = [(e.completed_at - e.started_at).total_seconds() / 60.0 for e in evals_completadas if e.completed_at and e.started_at]
    duracion_promedio = round(sum(durations) / len(durations)) if durations else 0

    return Response({
        'evaluaciones_totales': total_iniciadas,
        'evaluaciones_completadas': total_completadas,
        'concordancia_porcentual': concordancia,
        'tasa_automatizacion': tasa_automatizacion,
        'items_corregidos': corregidas,
        'items_autovalidados': auto_validados,
        'duracion_promedio_minutos': duracion_promedio,
    })

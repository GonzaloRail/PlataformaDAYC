"""Views for metrics"""
from datetime import datetime
from django.db.models import F
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status as drf_status
from src.api.evaluaciones.models import Métricas, Evaluación


TIPO_TO_FIELD = {
    'iniciada': 'evaluaciones_iniciadas',
    'completada': 'evaluaciones_completadas',
    'error': 'errores_sistema',
    'fallback': 'fallback_activado_count',
}


def _parse_iso_date(raw, field_name):
    try:
        return datetime.fromisoformat(raw).date()
    except (TypeError, ValueError):
        return None


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_métricas(request):
    """Get metrics for a date range"""
    from_date = request.query_params.get('from')
    to_date = request.query_params.get('to')

    queryset = Métricas.objects.all()

    if from_date:
        parsed = _parse_iso_date(from_date, 'from')
        if parsed is None:
            return Response({'error': 'Parámetro "from" inválido'}, status=drf_status.HTTP_400_BAD_REQUEST)
        queryset = queryset.filter(fecha__gte=parsed)
    if to_date:
        parsed = _parse_iso_date(to_date, 'to')
        if parsed is None:
            return Response({'error': 'Parámetro "to" inválido'}, status=drf_status.HTTP_400_BAD_REQUEST)
        queryset = queryset.filter(fecha__lte=parsed)

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
@permission_classes([IsAuthenticated])
def registrar_métricas(request):
    """Atomically increment the daily counter for the given event type."""
    fecha = request.data.get('fecha')
    tipo = request.data.get('tipo')  # 'iniciada', 'completada', 'error', 'fallback'

    if not fecha:
        return Response({'error': 'fecha es requerida'}, status=drf_status.HTTP_400_BAD_REQUEST)

    parsed_fecha = _parse_iso_date(fecha, 'fecha')
    if parsed_fecha is None:
        return Response({'error': 'fecha inválida'}, status=drf_status.HTTP_400_BAD_REQUEST)

    field = TIPO_TO_FIELD.get(tipo)
    if field is None:
        return Response({'error': f'tipo inválido (esperado uno de {list(TIPO_TO_FIELD)})'}, status=drf_status.HTTP_400_BAD_REQUEST)

    Métricas.objects.get_or_create(fecha=parsed_fecha)
    Métricas.objects.filter(fecha=parsed_fecha).update(**{field: F(field) + 1})

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

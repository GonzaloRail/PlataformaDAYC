"""Views for diagnosis generation"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from src.api.evaluaciones.models import Evaluación, Diagnóstico
from src.infrastructure.external.ai_service import AIService


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generar_diagnostico(request, evaluación_id):
    """Generate AI diagnosis for an evaluation"""
    try:
        evaluación = Evaluación.objects.get(id=evaluación_id, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    
    modelo = request.data.get('modelo', 'gemini-2.0-flash')
    
    ai_service = AIService()
    diagnóstico_data = ai_service.generar_diagnóstico(evaluación, modelo)
    
    diagnóstico, created = Diagnóstico.objects.update_or_create(
        evaluación=evaluación,
        defaults={
            'contenido': diagnóstico_data['diagnóstico'],
            'modelo_ai': diagnóstico_data['modelo_usado'],
            'gdq': diagnóstico_data.get('gdq'),
            'actividades_estimulación': diagnóstico_data.get('actividades_estimulación', []),
        }
    )
    
    return Response({
        'diagnóstico': diagnóstico.contenido,
        'modelo_usado': diagnóstico.modelo_ai,
        'gdq': diagnóstico.gdq,
        'actividades_estimulación': diagnóstico.actividades_estimulación,
    })


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def obtener_editar_diagnostico(request, evaluación_id):
    """Get or update diagnosis for an evaluation"""
    try:
        diagnóstico = Diagnóstico.objects.select_related('evaluación').get(evaluación_id=evaluación_id, evaluación__psychologist_id=str(request.user.id))
    except Diagnóstico.DoesNotExist:
        return Response({'error': 'Diagnóstico no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        return Response({
            'diagnóstico': diagnóstico.contenido,
            'gdq': diagnóstico.gdq,
            'actividades_estimulación': diagnóstico.actividades_estimulación,
            'modificado_por_psicólogo': diagnóstico.modificado_por_psicólogo,
        })
    
    # PUT - Update diagnosis
    diagnóstico.contenido = request.data.get('contenido', diagnóstico.contenido)
    diagnóstico.modificado_por_psicólogo = True
    diagnóstico.save()
    
    return Response({'status': 'Diagnóstico actualizado'})

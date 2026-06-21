"""Views for PDF report generation"""
import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser
from django.http import FileResponse
from src.api.evaluaciones.models import Evaluación
from src.infrastructure.pdf.reporte_generator import ReporteGenerator


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generar_reporte_pdf(request, evaluación_id):
    """Generate and return PDF report for an evaluation"""
    try:
        evaluación = Evaluación.objects.select_related(
            'niño', 'diagnóstico'
        ).prefetch_related('resultados').get(id=evaluación_id, psychologist_id=str(request.user.id))
    except Evaluación.DoesNotExist:
        return Response({'error': 'Evaluación no encontrada'}, status=404)
    
    if evaluación.estado not in ['COMPLETED', 'STOPPED', 'ARCHIVED']:
        return Response({'error': 'Evaluación no completada'}, status=400)
    
    generator = ReporteGenerator()
    pdf_path = generator.generar(evaluación)
    
    return FileResponse(
        open(pdf_path, 'rb'),
        content_type='application/pdf',
        as_attachment=True,
        filename=f"reporte_DAYC2_{evaluación.niño.nombre}_{evaluación.created_at.date()}.pdf"
    )

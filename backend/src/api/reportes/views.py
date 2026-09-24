"""Views for PDF report generation"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from src.api.children.permissions import IsApprovedProfessional as IsAuthenticated
from rest_framework.response import Response
from src.api.evaluaciones.models import Evaluación
from src.api.evaluaciones.serializers import generar_pdf_evaluacion


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def generar_reporte_pdf(request, evaluación_id):
    """Generate and return PDF report for an evaluation"""
    try:
        evaluación = (
            Evaluación.objects.select_related("niño")
            .prefetch_related("resultados", "items")
            .get(id=evaluación_id, psychologist_id=str(request.user.id))
        )
    except Evaluación.DoesNotExist:
        return Response(
            {"error": "Evaluación no encontrada"}, status=status.HTTP_404_NOT_FOUND
        )

    if evaluación.estado != Evaluación.Estado.VALIDATED:
        return Response(
            {"error": "El reporte final requiere una evaluación validada"},
            status=status.HTTP_409_CONFLICT,
        )

    return generar_pdf_evaluacion(evaluación)

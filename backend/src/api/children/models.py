"""Models for Niño (Child) entity"""
import uuid
from django.conf import settings
from django.db import models


class Niño(models.Model):
    """Child entity - represents a child being evaluated"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')], null=True, blank=True)
    padre_tutor = models.CharField(max_length=255, null=True, blank=True)
    escuela = models.CharField(max_length=255, null=True, blank=True)
    nombre_informante = models.CharField(max_length=255, null=True, blank=True)
    relacion_informante = models.CharField(max_length=255, null=True, blank=True)
    periodo_conoce_nino = models.CharField(max_length=255, null=True, blank=True)
    psychologist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ninos', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'niños'
        verbose_name = 'Niño'
        verbose_name_plural = 'Niños'

    def __str__(self):
        return self.nombre

    @property
    def edad_meses(self):
        """Calculate age in months from date of birth (delegates to EdadService for day precision)."""
        from src.application.services.edad_service import EdadService
        return EdadService.calcular_edad_meses(self.fecha_nacimiento)

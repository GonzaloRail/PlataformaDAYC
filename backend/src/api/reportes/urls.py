"""URL configuration for reportes API"""
from django.urls import path
from . import views

urlpatterns = [
    path('<uuid:evaluación_id>/pdf/', views.generar_reporte_pdf, name='generar_reporte_pdf'),
]
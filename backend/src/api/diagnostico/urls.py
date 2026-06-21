"""URL configuration for diagnostico API"""
from django.urls import path
from . import views

urlpatterns = [
    path('<uuid:evaluación_id>/', views.generar_diagnostico, name='generar_diagnostico'),
    path('<uuid:evaluación_id>/editar/', views.obtener_editar_diagnostico, name='obtener_editar_diagnostico'),
]
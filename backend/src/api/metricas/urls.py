"""URL configuration for metricas API"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.obtener_métricas, name='obtener_métricas'),
    path('registrar/', views.registrar_métricas, name='registrar_métricas'),
    path('tesis/', views.obtener_métricas_tesis, name='obtener_métricas_tesis'),
]
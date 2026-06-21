"""URL configuration for children API"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_niños, name='listar_niños'),
    path('<uuid:pk>/', views.detalle_niño, name='detalle_niño'),
    path('<uuid:pk>/evaluaciones/', views.evaluaciones_niño, name='evaluaciones_niño'),
]
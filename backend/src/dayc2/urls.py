"""
URL Configuration for DAYC-2 Backend
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('src.api.auth_urls')),
    path('api/children/', include('src.api.children.urls')),
    path('api/evaluaciones/', include('src.api.evaluaciones.urls')),
    path('api/diagnostico/', include('src.api.diagnostico.urls')),
    path('api/metricas/', include('src.api.metricas.urls')),
    path('api/reportes/', include('src.api.reportes.urls')),
]

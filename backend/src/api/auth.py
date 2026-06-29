from rest_framework.authentication import SessionAuthentication

# NOTA: CsrfExemptSessionAuthentication deshabilita la verificación CSRF para DRF.
# Esto es necesario mientras el frontend (Vite :5173) y backend (Django :8000) se
# sirven en dominios distintos con CORS. El middleware de CSRF de Django sigue activo
# en el resto de la app. Para habilitar CSRF completamente se requiere:
#   1. Configurar CSRF_TRUSTED_ORIGINS con el dominio del frontend
#   2. El frontend debe leer el token CSRF de la cookie y enviarlo como header X-CSRFToken
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


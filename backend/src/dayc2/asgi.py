"""
ASGI config for DAYC-2 project.
"""
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.dayc2.settings')

django_asgi_app = get_asgi_application()

from src.api.consumers.evaluation_consumer import EvaluationConsumer
from django.urls import re_path

websocket_urlpatterns = [
    re_path(r'ws/evaluation/(?P<evaluation_id>[^/]+)/$', EvaluationConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        )
    ),
})
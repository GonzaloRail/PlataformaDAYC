"""WebSocket consumer for real-time evaluation updates"""

import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)


class EvaluationConsumer(AsyncWebsocketConsumer):
    """Handles WebSocket connections for real-time evaluation progress"""

    async def connect(self):
        self.evaluation_id = self.scope["url_route"]["kwargs"]["evaluation_id"]
        self.room_group_name = f"evaluation_{self.evaluation_id}"

        if not await self.is_authorized():
            await self.close(code=4403)
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept(subprotocol=self.session_protocol())
        logger.info(f"WebSocket connected for evaluation {self.evaluation_id}")
        await self.send_progress()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        logger.info(f"WebSocket disconnected for evaluation {self.evaluation_id}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get("action")

            if action == "join_evaluation" or action == "request_progress":
                await self.send_progress()
            else:
                await self.send(
                    text_data=json.dumps(
                        {"type": "error", "message": "Unsupported action"}
                    )
                )
        except json.JSONDecodeError:
            await self.send(
                text_data=json.dumps(
                    {
                        "type": "error",
                        "message": "Invalid JSON",
                    }
                )
            )

    async def evaluation_update(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "progress",
                    "data": event["data"],
                }
            )
        )

    async def send_progress(self):
        progress = await self.get_progress()
        await self.send(text_data=json.dumps({"type": "progress", "data": progress}))

    @database_sync_to_async
    def is_authorized(self):
        from src.api.evaluaciones.models import Evaluación
        from src.api.evaluaciones.serializers import verify_session_token

        user = self.scope.get("user")
        try:
            evaluación = Evaluación.objects.get(pk=self.evaluation_id)
        except Evaluación.DoesNotExist:
            return False

        if user is not None and user.is_authenticated:
            return str(user.id) == evaluación.psychologist_id

        token = self.session_token()
        return verify_session_token(evaluación, token)

    def session_protocol(self):
        for protocol in self.scope.get("subprotocols", []):
            if protocol.startswith("dayc-session."):
                return protocol
        return None

    def session_token(self):
        protocol = self.session_protocol()
        if protocol:
            return protocol.removeprefix("dayc-session.")
        return None

    @database_sync_to_async
    def get_progress(self):
        from src.api.evaluaciones.models import Evaluación

        try:
            evaluación = Evaluación.objects.get(pk=self.evaluation_id)
            return {
                "event_id": str(uuid.uuid4()),
                "evaluation_id": str(evaluación.id),
                "estado": evaluación.estado,
                "total_items": evaluación.items.count(),
                "completed_items": evaluación.items.filter(
                    completed_at__isnull=False
                ).count(),
                "current_item": evaluación.current_item_id or "",
                "version": evaluación.version,
                "server_time": timezone.now().isoformat(),
            }
        except Evaluación.DoesNotExist:
            return {"error": "Evaluation not found"}

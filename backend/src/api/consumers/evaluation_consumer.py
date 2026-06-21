"""WebSocket consumer for real-time evaluation updates"""
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import logging

logger = logging.getLogger(__name__)


class EvaluationConsumer(AsyncWebsocketConsumer):
    """Handles WebSocket connections for real-time evaluation progress"""
    
    async def connect(self):
        self.evaluation_id = self.scope['url_route']['kwargs']['evaluation_id']
        self.room_group_name = f'evaluation_{self.evaluation_id}'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
        logger.info(f"WebSocket connected for evaluation {self.evaluation_id}")
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        logger.info(f"WebSocket disconnected for evaluation {self.evaluation_id}")
    
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')
            
            if action == 'response_submitted':
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'evaluation_update',
                        'event': 'response_submitted',
                        'data': data.get('data', {}),
                    }
                )
            elif action == 'request_progress':
                progress = await self.get_progress()
                await self.send(text_data=json.dumps({
                    'type': 'progress_update',
                    'data': progress,
                }))
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON',
            }))
    
    async def evaluation_update(self, event):
        await self.send(text_data=json.dumps({
            'type': event['event'],
            'data': event['data'],
        }))
    
    @database_sync_to_async
    def get_progress(self):
        from src.api.evaluaciones.models import Evaluación
        try:
            evaluación = Evaluación.objects.get(pk=self.evaluation_id)
            return {
                'id': str(evaluación.id),
                'estado': evaluación.estado,
                'total_respuestas': evaluación.respuestas.count(),
                'session_code': evaluación.session_code,
            }
        except Evaluación.DoesNotExist:
            return {'error': 'Evaluation not found'}

from datetime import date, timedelta

import pytest
from asgiref.sync import async_to_sync
from channels.routing import URLRouter
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from django.urls import re_path
from django.utils import timezone

from src.api.children.models import Niño
from src.api.consumers.evaluation_consumer import EvaluationConsumer
from src.api.evaluaciones.models import Evaluación
from src.api.evaluaciones.models import SessionAccessToken
from src.api.evaluaciones.serializers import ensure_session_token

application = URLRouter(
    [re_path(r"ws/evaluation/(?P<evaluation_id>[^/]+)/$", EvaluationConsumer.as_asgi())]
)


def create_evaluation():
    user = get_user_model().objects.create_user(
        username="psychologist", password="test-password"
    )
    child = Niño.objects.create(
        nombre="Niño de prueba",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=user,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        psychologist_id=str(user.id),
        estado=Evaluación.Estado.IN_PROGRESS,
        edad_meses=48,
        session_code="ABC123",
        session_expires_at=timezone.now() + timedelta(minutes=5),
    )
    token = ensure_session_token(evaluation, SessionAccessToken.ActorRole.CHILD)
    return evaluation, token


@pytest.mark.django_db(transaction=True)
def test_authorized_session_receives_progress_message():
    evaluation, token = create_evaluation()

    async def exercise_consumer():
        communicator = WebsocketCommunicator(
            application,
            f"/ws/evaluation/{evaluation.id}/",
            subprotocols=[f"dayc-session.{token}"],
        )
        connected, _ = await communicator.connect()
        assert connected

        message = await communicator.receive_json_from()
        assert message["type"] == "progress"
        assert message["data"]["evaluation_id"] == str(evaluation.id)
        assert message["data"]["estado"] == Evaluación.Estado.IN_PROGRESS

        await communicator.disconnect()

    async_to_sync(exercise_consumer)()


@pytest.mark.django_db(transaction=True)
def test_rejects_websocket_without_session_token():
    evaluation, _ = create_evaluation()

    async def exercise_consumer():
        communicator = WebsocketCommunicator(
            application, f"/ws/evaluation/{evaluation.id}/"
        )
        connected, close_code = await communicator.connect()
        assert not connected
        assert close_code == 4403

    async_to_sync(exercise_consumer)()


@pytest.mark.django_db(transaction=True)
def test_participant_cannot_publish_progress_payloads():
    evaluation, token = create_evaluation()

    async def exercise_consumer():
        communicator = WebsocketCommunicator(
            application,
            f"/ws/evaluation/{evaluation.id}/",
            subprotocols=[f"dayc-session.{token}"],
        )
        connected, _ = await communicator.connect()
        assert connected
        await communicator.receive_json_from()

        await communicator.send_json_to(
            {"action": "response_submitted", "data": {"version": 999}}
        )
        message = await communicator.receive_json_from()

        assert message == {"type": "error", "message": "Unsupported action"}
        await communicator.disconnect()

    async_to_sync(exercise_consumer)()

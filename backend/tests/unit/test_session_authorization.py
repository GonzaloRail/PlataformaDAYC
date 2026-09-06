from datetime import timedelta
from types import SimpleNamespace

from django.utils import timezone

from src.api.evaluaciones.serializers import autorizar_evaluacion


def build_request(token=None):
    headers = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    return SimpleNamespace(
        user=SimpleNamespace(is_authenticated=False),
        headers=headers,
        GET={},
        method="POST",
    )


def build_evaluation(expires_at):
    return SimpleNamespace(
        psychologist_id="psychologist-1",
        session_token="valid-token",
        session_expires_at=expires_at,
    )


def test_accepts_non_expired_session_token():
    evaluation = build_evaluation(timezone.now() + timedelta(minutes=5))

    assert autorizar_evaluacion(build_request("valid-token"), evaluation)


def test_rejects_expired_session_token():
    evaluation = build_evaluation(timezone.now() - timedelta(minutes=1))

    assert not autorizar_evaluacion(build_request("valid-token"), evaluation)


def test_rejects_invalid_session_token():
    evaluation = build_evaluation(timezone.now() + timedelta(minutes=5))

    assert not autorizar_evaluacion(build_request("wrong-token"), evaluation)

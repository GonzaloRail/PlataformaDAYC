from datetime import date
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from src.api.children.models import Niño
from src.api.evaluaciones.models import (
    Consentimiento,
    Evaluación,
    EvaluacionItem,
    Evidencia,
    SessionAccessToken,
)
from src.api.evaluaciones.serializers import ensure_session_token
from src.application.services.dayc2_flow_service import dayc2_flow_service


@pytest.fixture
def evaluation():
    psychologist = get_user_model().objects.create_user(
        username="owner", password="test-password"
    )
    child = Niño.objects.create(
        nombre="Niño de prueba",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=psychologist,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        psychologist_id=str(psychologist.id),
        estado=Evaluación.Estado.IN_PROGRESS,
        edad_meses=60,
        session_code="ABC123",
    )
    item = EvaluacionItem.objects.create(
        evaluación=evaluation,
        item_id="COGNITIVO_045",
        area="COGNITIVO",
        estado=EvaluacionItem.Estado.IN_PROGRESS,
    )
    evaluation.current_item_id = item.item_id
    evaluation.save(update_fields=["current_item_id"])
    return evaluation, item, psychologist


def bearer(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}


@pytest.mark.django_db
def test_join_issues_actor_scoped_device_token(evaluation):
    current, _, _ = evaluation
    response = APIClient().post(
        "/api/evaluaciones/join/",
        {
            "session_code": current.session_code,
            "actor_role": "ADULT",
            "device_id": "adult-tablet",
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["actor_role"] == "ADULT"
    token = SessionAccessToken.objects.get()
    assert token.actor_role == SessionAccessToken.ActorRole.ADULT
    assert token.device_id == "adult-tablet"


@pytest.mark.django_db
def test_child_token_cannot_accept_adult_consent(evaluation):
    current, _, _ = evaluation
    child_token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)

    response = APIClient().post(
        f"/api/evaluaciones/session/{current.session_code}/consent/",
        {"accepted": True, "expected_version": current.version},
        format="json",
        **bearer(child_token),
    )

    assert response.status_code == 403
    assert not Consentimiento.objects.filter(evaluación=current).exists()


@pytest.mark.django_db
def test_only_psychologist_can_list_evidence(evaluation):
    current, item, psychologist = evaluation
    child_token = ensure_session_token(current, SessionAccessToken.ActorRole.CHILD)
    Evidencia.objects.create(
        evaluación=current,
        evaluación_item=item,
        type=Evidencia.Tipo.LOG,
    )
    url = f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/"

    participant_response = APIClient().get(url, **bearer(child_token))
    psychologist_client = APIClient()
    psychologist_client.force_authenticate(psychologist)
    psychologist_response = psychologist_client.get(url)

    assert participant_response.status_code == 403
    assert psychologist_response.status_code == 200
    assert len(psychologist_response.data) == 1


@pytest.mark.django_db
def test_evidence_actor_is_derived_from_token(evaluation):
    current, item, _ = evaluation
    Consentimiento.objects.create(evaluación=current, accepted=True)
    child_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.CHILD, "child-device"
    )

    response = APIClient().post(
        f"/api/evaluaciones/{current.id}/items/{item.item_id}/evidence/",
        {"type": "LOG", "captured_by": "ADULT_DEVICE"},
        format="multipart",
        **bearer(child_token),
    )

    assert response.status_code == 201
    evidence = Evidencia.objects.get(pk=response.data["id"])
    assert evidence.captured_by == "CHILD_DEVICE"


@pytest.mark.django_db(transaction=True)
def test_second_actor_write_with_same_version_is_rejected(evaluation):
    current, item, _ = evaluation
    first_actor_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "adult-device-1"
    )
    second_actor_token = ensure_session_token(
        current, SessionAccessToken.ActorRole.ADULT, "adult-device-2"
    )
    url = f"/api/evaluaciones/{current.id}/respuesta/"
    payload = {
        "item_id": item.item_id,
        "resultado": "CORRECT",
        "tiempo_respuesta_ms": 100,
        "expected_version": current.version,
    }

    with (
        patch.object(
            dayc2_flow_service,
            "complete_current_item",
            return_value=(item, {}),
        ),
        patch("src.api.evaluaciones.views.sincronizar_item_con_respuesta"),
        patch.object(dayc2_flow_service, "get_current_task_payload", return_value=None),
    ):
        first_response = APIClient().post(
            url, payload, format="json", **bearer(first_actor_token)
        )
        second_response = APIClient().post(
            url, payload, format="json", **bearer(second_actor_token)
        )

    assert first_response.status_code == 200
    assert first_response.data["version"] == current.version + 1
    assert second_response.status_code == 409
    assert second_response.data["current_version"] == current.version + 1

from datetime import date

import pytest
from django.contrib.auth import get_user_model

from src.api.children.models import Niño, ProfessionalProfile
from src.api.evaluaciones.models import Evaluación, Evidencia, OutboxEvent
from src.application.services.withdrawal_service import apply_withdrawal


@pytest.mark.django_db
def test_full_withdrawal_erases_evidence_and_quarantines_pending_delivery():
    professional = get_user_model().objects.create_user("withdrawal-professional")
    ProfessionalProfile.objects.create(
        user=professional, status=ProfessionalProfile.Status.APPROVED
    )
    child = Niño.objects.create(
        nombre="Niño sintético",
        fecha_nacimiento=date(2021, 1, 1),
        psychologist=professional,
    )
    evaluation = Evaluación.objects.create(
        niño=child,
        professional=professional,
        psychologist_id=str(professional.id),
        session_code="WITHD1",
    )
    evidence = Evidencia.objects.create(
        evaluación=evaluation,
        type=Evidencia.Tipo.LOG,
    )
    event = OutboxEvent.objects.create(evaluación=evaluation, event_type="progress")

    assert apply_withdrawal(evaluation, []) == 1

    evidence.refresh_from_db()
    event.refresh_from_db()
    assert evidence.withdrawal_action == "ERASED"
    assert evidence.withdrawn_at is not None
    assert event.quarantined_at is not None
    assert event.last_error == "Cancelado por retiro de consentimiento"

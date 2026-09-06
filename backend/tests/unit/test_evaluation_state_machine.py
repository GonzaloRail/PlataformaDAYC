import pytest

from src.api.evaluaciones.models import Evaluación
from src.application.services.evaluation_state_machine import (
    EvaluationStateMachine,
    InvalidEvaluationTransition,
)


def test_allows_normal_evaluation_lifecycle():
    machine = EvaluationStateMachine()

    assert machine.can_transition(
        Evaluación.Estado.INITIATED, Evaluación.Estado.WAITING_CONSENT
    )
    assert machine.can_transition(
        Evaluación.Estado.WAITING_CONSENT, Evaluación.Estado.IN_PROGRESS
    )
    assert machine.can_transition(
        Evaluación.Estado.IN_PROGRESS, Evaluación.Estado.PENDING_REVIEW
    )
    assert machine.can_transition(
        Evaluación.Estado.PENDING_REVIEW, Evaluación.Estado.VALIDATED
    )


def test_rejects_invalid_transition():
    machine = EvaluationStateMachine()
    evaluation = type("Evaluation", (), {"estado": Evaluación.Estado.INITIATED})()

    with pytest.raises(InvalidEvaluationTransition):
        machine.transition(evaluation, Evaluación.Estado.VALIDATED)

"""Deterministic lifecycle transitions for evaluation sessions."""

from src.api.evaluaciones.models import Evaluación


class InvalidEvaluationTransition(ValueError):
    """Raised when an evaluation receives an invalid lifecycle transition."""


class EvaluationStateMachine:
    """Validate and persist evaluation lifecycle transitions."""

    TRANSITIONS = {
        Evaluación.Estado.INITIATED: {
            Evaluación.Estado.WAITING_CONSENT,
            Evaluación.Estado.IN_PROGRESS,
            Evaluación.Estado.CANCELLED,
        },
        Evaluación.Estado.WAITING_CHILD_DATA: {
            Evaluación.Estado.WAITING_CONSENT,
            Evaluación.Estado.CANCELLED,
        },
        Evaluación.Estado.WAITING_CONSENT: {
            Evaluación.Estado.IN_PROGRESS,
            Evaluación.Estado.CANCELLED,
        },
        Evaluación.Estado.IN_PROGRESS: {
            Evaluación.Estado.PENDING_REVIEW,
            Evaluación.Estado.STOPPED,
            Evaluación.Estado.CANCELLED,
        },
        Evaluación.Estado.PENDING_REVIEW: {
            Evaluación.Estado.REVIEW_IN_PROGRESS,
            Evaluación.Estado.VALIDATED,
            Evaluación.Estado.CANCELLED,
        },
        Evaluación.Estado.REVIEW_IN_PROGRESS: {
            Evaluación.Estado.PENDING_REVIEW,
            Evaluación.Estado.VALIDATED,
        },
        Evaluación.Estado.STOPPED: {Evaluación.Estado.PENDING_REVIEW},
        Evaluación.Estado.VALIDATED: {Evaluación.Estado.ARCHIVED},
        Evaluación.Estado.COMPLETED: {Evaluación.Estado.PENDING_REVIEW},
        Evaluación.Estado.ARCHIVED: set(),
        Evaluación.Estado.CANCELLED: set(),
    }

    def can_transition(self, current: str, target: str) -> bool:
        return current == target or target in self.TRANSITIONS.get(current, set())

    def transition(self, evaluación: Evaluación, target: str, update_fields=None):
        current = evaluación.estado
        if not self.can_transition(current, target):
            raise InvalidEvaluationTransition(
                f"Transición no permitida: {current} -> {target}"
            )

        if current == target:
            return False

        evaluación.estado = target
        fields = set(update_fields or ())
        fields.add("estado")
        evaluación.save(update_fields=list(fields))
        return True


evaluation_state_machine = EvaluationStateMachine()

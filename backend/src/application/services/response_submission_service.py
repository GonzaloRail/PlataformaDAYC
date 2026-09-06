"""Guards for participant response submissions."""

from src.api.evaluaciones.models import Evaluación


class InvalidResponseSubmission(ValueError):
    """Raised when a participant submits an obsolete or duplicate response."""


def validate_response_submission(evaluación: Evaluación, item_id: str | None):
    """Ensure an answer belongs to the active item of an open evaluation."""
    if evaluación.estado != Evaluación.Estado.IN_PROGRESS:
        raise InvalidResponseSubmission("La evaluación no está en curso")
    if not item_id or item_id != evaluación.current_item_id:
        raise InvalidResponseSubmission("El ítem ya no es la tarea activa")

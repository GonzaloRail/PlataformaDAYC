from types import SimpleNamespace

import pytest

from src.api.evaluaciones.models import Evaluación
from src.application.services.response_submission_service import (
    InvalidResponseSubmission,
    validate_response_submission,
)


def build_evaluation(state=Evaluación.Estado.IN_PROGRESS, item_id="COGNITIVO_001"):
    return SimpleNamespace(estado=state, current_item_id=item_id)


def test_accepts_the_current_item_while_evaluation_is_active():
    validate_response_submission(build_evaluation(), "COGNITIVO_001")


def test_rejects_duplicate_or_outdated_item_submission():
    with pytest.raises(InvalidResponseSubmission):
        validate_response_submission(build_evaluation(), "COGNITIVO_002")


def test_rejects_submission_outside_active_state():
    with pytest.raises(InvalidResponseSubmission):
        validate_response_submission(
            build_evaluation(Evaluación.Estado.PENDING_REVIEW), "COGNITIVO_001"
        )

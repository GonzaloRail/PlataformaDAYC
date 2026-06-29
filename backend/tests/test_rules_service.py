"""Tests for RulesService - three consecutive errors MVP rule."""
from unittest.mock import MagicMock

from src.application.services.rules_service import RulesService, rules_service


class TestRulesService:
    """Test suite for the simplified evaluation stop rule."""

    def setup_method(self):
        self.service = RulesService()

    def _mock_response(self, resultado: str):
        return MagicMock(resultado=resultado)

    def test_singleton_pattern(self):
        service1 = RulesService()
        service2 = RulesService()
        assert service1 is service2


class TestRulesServiceEdgeCases:
    def setup_method(self):
        self.service = RulesService()

    def _mock_response(self, resultado: str):
        return MagicMock(resultado=resultado)

    def test_correct_responses_after_errors_reset_sequence(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
            self._mock_response('CORRECT'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is None

    def test_more_than_three_consecutive_errors_trigger_stop(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is not None
        assert result.nombre == 'STOP_3_ERRORES_CONSECUTIVOS'

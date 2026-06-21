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

    def test_evaluar_reglas_with_no_responses(self):
        mock_evaluación = MagicMock()
        mock_evaluación.respuestas.all.return_value = []

        result = self.service.evaluar_reglas(mock_evaluación)

        assert result is None

    def test_evaluar_reglas_with_insufficient_responses(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is None

    def test_three_consecutive_errors_trigger_stop(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is not None
        assert result.triggered is True
        assert result.nombre == 'STOP_3_ERRORES_CONSECUTIVOS'

    def test_three_errors_not_consecutive_do_not_trigger(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('CORRECT'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is None

    def test_last_three_responses_are_used(self):
        result = self.service.evaluar_reglas([
            self._mock_response('CORRECT'),
            self._mock_response('CORRECT'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is not None
        assert result.reason == '3 respuestas incorrectas consecutivas en el área actual'

    def test_not_applicable_does_not_count_as_error(self):
        result = self.service.evaluar_reglas([
            self._mock_response('ERROR'),
            self._mock_response('NOT_APPLICABLE'),
            self._mock_response('ERROR'),
            self._mock_response('ERROR'),
        ])

        assert result is None

    def test_regla_activa_must_be_none_initially(self):
        assert rules_service.regla_activa is None


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

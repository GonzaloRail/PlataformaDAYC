"""Unit tests for RulesService - three consecutive errors MVP rule."""
import sys
import unittest
from unittest.mock import MagicMock


mock_respuesta = MagicMock()
mock_respuesta.Resultado = MagicMock()
mock_respuesta.Resultado.ERROR = 'ERROR'
mock_respuesta.Resultado.CORRECT = 'CORRECT'

sys.modules['src.api.evaluaciones.models'] = MagicMock()
sys.modules['src.api.evaluaciones.models'].Respuesta = mock_respuesta


class TestRulesService(unittest.TestCase):
    def setUp(self):
        from src.application.services.rules_service import RulesService
        self.service = RulesService()

    def _create_mock_respuesta(self, resultado: str):
        respuesta = MagicMock()
        respuesta.resultado = resultado
        return respuesta

    def test_evaluar_reglas_returns_none_when_no_rules_triggered(self):
        respuestas = [
            self._create_mock_respuesta('CORRECT'),
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('CORRECT'),
        ]

        result = self.service.evaluar_reglas(respuestas)

        self.assertIsNone(result)

    def test_three_consecutive_errors_trigger(self):
        respuestas = [
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('ERROR'),
        ]

        result = self.service.evaluar_reglas(respuestas)

        self.assertIsNotNone(result)
        self.assertTrue(result.triggered)
        self.assertEqual(result.rule_name, 'STOP_3_ERRORES_CONSECUTIVOS')

    def test_less_than_three_responses_returns_none(self):
        respuestas = [
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('ERROR'),
        ]

        result = self.service.evaluar_reglas(respuestas)

        self.assertIsNone(result)

    def test_non_consecutive_errors_return_none(self):
        respuestas = [
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('CORRECT'),
            self._create_mock_respuesta('ERROR'),
            self._create_mock_respuesta('ERROR'),
        ]

        result = self.service.evaluar_reglas(respuestas)

        self.assertIsNone(result)

    def test_empty_respuestas_returns_none(self):
        result = self.service.evaluar_reglas([])

        self.assertIsNone(result)


class TestRuleResult(unittest.TestCase):
    def test_dataclass_creation(self):
        from src.application.services.rules_service import RuleResult

        result = RuleResult(
            triggered=True,
            rule_name='TEST_RULE',
            reason='Test reason'
        )

        self.assertTrue(result.triggered)
        self.assertEqual(result.rule_name, 'TEST_RULE')
        self.assertEqual(result.reason, 'Test reason')

    def test_dataclass_with_false_triggered(self):
        from src.application.services.rules_service import RuleResult

        result = RuleResult(
            triggered=False,
            rule_name='TEST_RULE',
            reason='Test reason'
        )

        self.assertFalse(result.triggered)


if __name__ == '__main__':
    unittest.main()

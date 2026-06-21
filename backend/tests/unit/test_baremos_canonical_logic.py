"""Unit tests for canonical baremos.py integration."""
import unittest
import sys
from unittest.mock import MagicMock


sys.modules['django.conf'] = MagicMock()
sys.modules['django.conf'].settings = MagicMock()


class TestCanonicalBaremosLogic(unittest.TestCase):
    def setUp(self):
        from src.application.services.baremos_service import BaremosService
        self.service = BaremosService()
        self.service._loaded = False
        self.service._baremos_module = None

    def test_item_inicio_fis(self):
        inicio = self.service.get_item_inicio('DESARROLLO_FISICO', 30)
        self.assertEqual(inicio, 45)

    def test_cociente_general_boundary_low(self):
        result = self.service.calcular_cociente_general([40, 40, 40, 40, 40])
        self.assertIsNotNone(result)
        self.assertEqual(result['suma_puntajes_estandar'], 200)
        self.assertEqual(result['cociente_general'], 40)

    def test_cociente_general_boundary_high(self):
        result = self.service.calcular_cociente_general([160, 160, 160, 160, 160])
        self.assertIsNotNone(result)
        self.assertEqual(result['suma_puntajes_estandar'], 800)
        self.assertEqual(result['cociente_general'], 160)

    def test_cociente_general_exact_286(self):
        result = self.service.calcular_cociente_general([40, 40, 40, 80, 86])
        self.assertIsNotNone(result)
        self.assertEqual(result['suma_puntajes_estandar'], 286)
        self.assertEqual(result['cociente_general'], 41)


if __name__ == '__main__':
    unittest.main()

"""Unit tests for canonical baremos.py integration."""

import unittest


class TestCanonicalBaremosLogic(unittest.TestCase):
    def setUp(self):
        from src.application.services.baremos_service import BaremosService

        self.service = BaremosService()
        self.service.cargar_baremos()

    def test_item_inicio_fis(self):
        # FIS: 24-35m → 45
        inicio = self.service.get_item_inicio("DESARROLLO_FISICO", 30)
        self.assertEqual(inicio, 45)

    def test_item_inicio_cog(self):
        # COG: 24-35m → 20
        self.assertEqual(self.service.get_item_inicio("COGNITIVO", 30), 20)
        # COG: 36-47m → 30
        self.assertEqual(self.service.get_item_inicio("COGNITIVO", 40), 30)
        # COG: 48m+ → 45
        self.assertEqual(self.service.get_item_inicio("COGNITIVO", 60), 45)

    def test_cociente_general_boundary_low(self):
        # sum=200, 200//5 - 16 = 24 → cap 40
        gdq = self.service.calcular_cociente_general([40, 40, 40, 40, 40])
        self.assertIsNotNone(gdq)
        self.assertEqual(gdq, 40)

    def test_cociente_general_boundary_high(self):
        # sum=800 → techo 160
        gdq = self.service.calcular_cociente_general([160, 160, 160, 160, 160])
        self.assertIsNotNone(gdq)
        self.assertEqual(gdq, 160)

    def test_cociente_general_exact_286(self):
        # sum=286, 286//5 - 16 = 57 - 16 = 41
        gdq = self.service.calcular_cociente_general([40, 40, 40, 80, 86])
        self.assertIsNotNone(gdq)
        self.assertEqual(gdq, 41)

    def test_edad_equivalente_cog(self):
        # Caso del manual: raw=28 → 21m
        self.assertEqual(self.service.get_edad_equivalente("COGNITIVO", 28), 21)

    def test_get_puntaje_estandar_rango_edad(self):
        # COG 28-30m, raw=28 → 87
        self.assertEqual(self.service.get_puntaje_estandar("COGNITIVO", 30, 28), 87)
        # COG 28-30m, raw=30 → 91
        self.assertEqual(self.service.get_puntaje_estandar("COGNITIVO", 28, 30), 91)
        # 35m → busca en 34-36, raw=11 → 49
        self.assertEqual(self.service.get_puntaje_estandar("COGNITIVO", 35, 11), 49)

    def test_percentil_strings(self):
        self.assertEqual(self.service.get_percentil(100), "50")
        self.assertEqual(self.service.get_percentil(150), ">99.9")
        self.assertEqual(self.service.get_percentil(50), "<0.1")


if __name__ == "__main__":
    unittest.main()

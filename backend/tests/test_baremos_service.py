"""Tests for BaremosService - lookup por rango de edad contra baremos.py"""

import pytest
from src.application.services.baremos_service import BaremosService, baremos_service


class TestBaremosService:
    """Test suite for BaremosService - API nueva basada en baremos.py"""

    def setup_method(self):
        self.service = BaremosService()
        self.service.cargar_baremos()

    def test_singleton_pattern(self):
        assert BaremosService() is baremos_service

    def test_cargar_baremos_carga_las_5_areas(self):
        assert self.service._loaded is True
        for code in ("COG", "LEN", "FIS", "SOC", "ADA"):
            assert code in self.service._tablas
            assert code in self.service._edad_equivalente
            assert code in self.service._reglas_inicio

    def test_normalizar_area_nombre_a_codigo(self):
        assert self.service.normalizar_area("COGNITIVO") == "COG"
        assert self.service.normalizar_area("COMUNICACION") == "LEN"
        assert self.service.normalizar_area("DESARROLLO_FISICO") == "FIS"
        assert self.service.normalizar_area("SOCIAL_EMOCIONAL") == "SOC"
        assert self.service.normalizar_area("CONDUCTA_ADAPTATIVA") == "ADA"

    def test_area_code_to_name(self):
        assert self.service.area_code_to_name("COG") == "COGNITIVO"
        assert self.service.area_code_to_name("LEN") == "COMUNICACION"
        assert self.service.area_code_to_name("FIS") == "DESARROLLO_FISICO"

    def test_get_item_inicio_por_edad_y_area(self):
        # Cognitivo: 36-47m → 30
        assert self.service.get_item_inicio("COGNITIVO", 36) == 30
        assert self.service.get_item_inicio("COGNITIVO", 47) == 30
        # Cognitivo: 48m+ → 45
        assert self.service.get_item_inicio("COGNITIVO", 48) == 45
        # Cognitivo: 24-35m → 20
        assert self.service.get_item_inicio("COGNITIVO", 30) == 20
        # Lenguaje: 48m+ → 50
        assert self.service.get_item_inicio("COMUNICACION", 50) == 50
        # Social: 36-47m → 30
        assert self.service.get_item_inicio("SOCIAL_EMOCIONAL", 40) == 30

    def test_calcular_puntaje_directo_con_puntos_base(self):
        # Niño de 30m Cognitivo (inicio=20), 8 items aprobados
        # raw = 20 + 8 = 28
        raw = self.service.calcular_puntaje_directo(
            items_count_by_area={"COGNITIVO": 8}, area="COGNITIVO", edad_meses=30
        )
        assert raw == 28

    def test_calcular_puntaje_directo_sin_items(self):
        # 0 items aprobados → raw = puntos_base = 20
        raw = self.service.calcular_puntaje_directo(
            items_count_by_area={"COGNITIVO": 0}, area="COGNITIVO", edad_meses=30
        )
        assert raw == 20

    def test_get_puntaje_estandar_lookup_por_rango(self):
        # COG 30m raw=28 → según manual 87
        # Rango 28-30 en COG, puntos[28]=87
        estándar = self.service.get_puntaje_estandar("COGNITIVO", 30, 28)
        assert estándar == 87

    def test_get_puntaje_estandar_sin_match(self):
        # raw=200 no está en la tabla 28-30 de COG
        estándar = self.service.get_puntaje_estandar("COGNITIVO", 30, 200)
        assert estándar is None

    def test_get_puntaje_estandar_edad_fuera_de_rango(self):
        # 200 meses no está en ningún rango
        estándar = self.service.get_puntaje_estandar("COGNITIVO", 200, 28)
        assert estándar is None

    def test_get_percentil_string(self):
        assert self.service.get_percentil(100) == "50"
        assert self.service.get_percentil(50) == "<0.1"
        assert self.service.get_percentil(150) == ">99.9"
        assert self.service.get_percentil(None) == "-"

    def test_get_interpretacion(self):
        assert self.service.get_interpretacion(100) == "Promedio"
        assert self.service.get_interpretacion(130) == "Superior"
        assert self.service.get_interpretacion(140) == "Muy Superior"
        assert self.service.get_interpretacion(85) == "Por debajo del Promedio"
        assert self.service.get_interpretacion(75) == "Bajo"
        assert self.service.get_interpretacion(60) == "Muy Bajo"
        assert self.service.get_interpretacion(None) == "Sin datos"

    def test_get_edad_equivalente(self):
        # COG raw=28 → 21 meses
        edad = self.service.get_edad_equivalente("COGNITIVO", 28)
        assert edad == 21
        # COG raw=0 → 0 meses
        assert self.service.get_edad_equivalente("COGNITIVO", 0) == 0
        # raw fuera de tabla → None
        assert self.service.get_edad_equivalente("COGNITIVO", 200) is None

    def test_calcular_cociente_general_tabla(self):
        # GDQ usa TABLA_COCIENTE (mapeo directo suma → cociente)
        # sum=500 → TABLA_COCIENTE[500] = 100
        gdq = self.service.calcular_cociente_general([100, 100, 100, 100, 100])
        assert gdq == 100
        # sum=535 → TABLA_COCIENTE[535] = 108
        gdq = self.service.calcular_cociente_general([105, 110, 100, 112, 108])
        assert gdq == 108
        # sum=200 (< 286) → cap 40
        gdq = self.service.calcular_cociente_general([40, 40, 40, 40, 40])
        assert gdq == 40
        # sum=800 (> 720) → cap 160
        gdq = self.service.calcular_cociente_general([160, 160, 160, 160, 160])
        assert gdq == 160

    def test_calcular_cociente_general_incompleto(self):
        # Si no hay 5 estándares válidos, retorna None
        assert self.service.calcular_cociente_general([100, 100, 100]) is None
        assert self.service.calcular_cociente_general([100, 100, 100, 100, None]) is None

    def test_lookup_completo_caso_ejemplo(self):
        # Niño 30m, COG, inicio=20, 8 items aprobados → raw=28
        raw = self.service.calcular_puntaje_directo(
            items_count_by_area={"COGNITIVO": 8}, area="COGNITIVO", edad_meses=30
        )
        assert raw == 28
        result = self.service.lookup("COGNITIVO", 30, raw)
        assert result is not None
        assert result.raw_score == 28
        # raw=28 en rango 28-30 → puntos[28]=87
        assert result.estándar == 87
        assert result.percentil == "19"
        assert result.interpretacion == "Por debajo del Promedio"
        assert result.edad_equivalente == 21

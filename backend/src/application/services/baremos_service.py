"""Baremos Service - Lookup correcto contra baremos.py (DAYC-2)

Estructura del módulo baremos.py:
- PERCENTILES: dict {estandar(40-160): "string"}  ej. {100: "50", 50: "<0.1"}
- INTERPRETACION: lista [{min, max, texto}]
- COG, LEN, FIS, SOC, ADA: dicts con:
  - reglas_inicio: [{min, max, inicio}]
  - edad_equivalente: {raw_score: meses}
  - puntajes_estandar: [{min_meses, max_meses, puntos: {raw: estandar}}, ...]
- TABLA_COCIENTE: dict {suma_5_estandares: cociente_general}
"""

import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class BaremosLookupResult:
    """Resultado del lookup en baremos"""

    raw_score: int
    estándar: int
    percentil: str
    interpretacion: str
    edad_equivalente: int
    rango_min: int
    rango_max: int


class BaremosService:
    """Servicio de baremos DAYC-2 con lookup O(n) por rango de edad."""

    _instance = None
    _loaded = False
    _tablas: Dict[str, List[Dict]] = {}
    _edad_equivalente: Dict[str, Dict[int, int]] = {}
    _reglas_inicio: Dict[str, List[Dict]] = {}
    _percentiles: Dict[int, str] = {}
    _interpretacion: List[Dict] = []
    _area_codes = {
        "COG": "COG",
        "COGNITIVO": "COG",
        "LEN": "LEN",
        "LENGUAJE": "LEN",
        "COMUNICACION": "LEN",
        "COMUNICACIÓN": "LEN",
        "FIS": "FIS",
        "FISICO": "FIS",
        "FÍSICO": "FIS",
        "DESARROLLO_FISICO": "FIS",
        "DESARROLLO_FÍSICO": "FIS",
        "SOC": "SOC",
        "SOCIAL": "SOC",
        "SOCIAL_EMOCIONAL": "SOC",
        "SOCIAL-EMOCIONAL": "SOC",
        "ADA": "ADA",
        "ADAPTATIVO": "ADA",
        "CONDUCTA_ADAPTATIVA": "ADA",
    }
    _code_to_area_name = {
        "COG": "COGNITIVO",
        "LEN": "COMUNICACION",
        "FIS": "DESARROLLO_FISICO",
        "SOC": "SOCIAL_EMOCIONAL",
        "ADA": "CONDUCTA_ADAPTATIVA",
    }

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def cargar_baremos(self, json_path: str = None) -> None:
        """Carga baremos desde baremos.py (módulo Python) en RAM."""
        if json_path:
            logger.info("JSON path %s provided but ignored - using baremos.py module", json_path)
        try:
            from src.application.scoring import baremos as baremos_mod
        except Exception as exc:
            logger.warning("Cannot import baremos module: %s", exc)
            self._loaded = True
            return

        self._percentiles = baremos_mod.PERCENTILES
        self._interpretacion = baremos_mod.INTERPRETACION

        for code in ("COG", "LEN", "FIS", "SOC", "ADA"):
            tabla = getattr(baremos_mod, code, None)
            if not tabla:
                continue
            self._tablas[code] = tabla.get("puntajes_estandar", [])
            self._edad_equivalente[code] = tabla.get("edad_equivalente", {})
            self._reglas_inicio[code] = tabla.get("reglas_inicio", [])

        self._loaded = True
        logger.info(
            "Baremos cargados: areas=%s, percentiles=%d",
            list(self._tablas.keys()),
            len(self._percentiles),
        )

    def está_cargado(self) -> bool:
        return self._loaded

    def normalizar_area(self, area: str) -> str:
        """'COGNITIVO' -> 'COG', 'COMUNICACION' -> 'LEN', etc."""
        if not area:
            return ""
        return self._area_codes.get(area, area)

    def area_name_to_code(self, area_name: str) -> str:
        return self.normalizar_area(area_name)

    def area_code_to_name(self, area_code: str) -> str:
        return self._code_to_area_name.get(area_code, area_code)

    def get_item_inicio(self, area: str, edad_meses: int) -> Optional[int]:
        """Devuelve el primer item a aplicar según edad y área (DAYC-2 reglas_inicio)."""
        if edad_meses is None:
            return None
        if not self._loaded:
            self.cargar_baremos()
        area_code = self.normalizar_area(area)
        reglas = self._reglas_inicio.get(area_code, [])
        for regla in reglas:
            if regla["min"] <= edad_meses <= regla["max"]:
                return regla["inicio"]
        return None

    def get_edad_equivalente(self, area: str, raw_score: int) -> Optional[int]:
        """Lookup en {raw: meses_equivalentes}."""
        if not self._loaded:
            self.cargar_baremos()
        area_code = self.normalizar_area(area)
        tabla = self._edad_equivalente.get(area_code, {})
        return tabla.get(raw_score)

    def get_puntaje_estandar(
        self, area: str, edad_meses: int, raw_score: int
    ) -> Optional[int]:
        """Lookup por RANGO de edad (no mes exacto) y raw_score.

        Devuelve el estándar (1-160) o None si:
          - el área no tiene baremos cargados,
          - la edad cae fuera de todos los rangos,
          - el raw_score no está en la tabla de la edad.
        """
        if not self._loaded:
            self.cargar_baremos()
        area_code = self.normalizar_area(area)
        rangos = self._tablas.get(area_code, [])
        for rango in rangos:
            if rango["min_meses"] <= edad_meses <= rango["max_meses"]:
                return rango["puntos"].get(raw_score)
        return None

    def get_percentil(self, estándar: Optional[int]) -> str:
        """Devuelve el percentil como STRING (formato manual, ej. '50', '<0.1', '>99.9')."""
        if estándar is None:
            return "-"
        if estándar in self._percentiles:
            return self._percentiles[estándar]
        if estándar > 160:
            return ">99.9"
        if estándar < 40:
            return "<0.1"
        nearest = min(self._percentiles.keys(), key=lambda k: abs(k - estándar))
        return self._percentiles[nearest]

    def get_interpretacion(self, estándar: Optional[int]) -> str:
        """Devuelve clasificación (Muy Superior / Superior / ... / Muy Bajo)."""
        if estándar is None:
            return "Sin datos"
        for regla in self._interpretacion:
            if regla["min"] <= estándar <= regla["max"]:
                return regla["texto"]
        return "Fuera de rango"

    def get_rango_edad(
        self, area: str, edad_meses: int
    ) -> Optional[Tuple[int, int]]:
        """Devuelve (min_meses, max_meses) del rango aplicable a la edad."""
        area_code = self.normalizar_area(area)
        for rango in self._tablas.get(area_code, []):
            if rango["min_meses"] <= edad_meses <= rango["max_meses"]:
                return (rango["min_meses"], rango["max_meses"])
        return None

    def calcular_puntaje_directo(
        self, items_count_by_area: Dict[str, int], area: str, edad_meses: int
    ) -> int:
        """Calcula el puntaje directo DAYC-2:

            raw = item_inicio + items_aprobados_en_el_area

        item_inicio es el primer item administrado según reglas de inicio por edad.
        No se resta 1 porque los items previos a inicio no están en la BD.
        Si item_inicio es None o 0, no hay puntos base.
        """
        if not self._loaded:
            self.cargar_baremos()
        item_inicio = self.get_item_inicio(area, edad_meses) or 0
        puntos_base = max(0, item_inicio)
        puntos_reales = items_count_by_area.get(area, 0)
        return puntos_base + puntos_reales

    def calcular_cociente_general(self, puntajes_estandar: List[Optional[int]]) -> Optional[int]:
        """Calcula el GDQ (Cociente General) a partir de los 5 puntajes estándar.

        Usa TABLA_COCIENTE del manual DAYC-2 (mapeo directo suma → cociente).
        """
        válidos = [p for p in puntajes_estandar if p is not None]
        if len(válidos) != 5:
            return None
        suma = sum(válidos)
        if suma < 286:
            return 40
        if suma > 720:
            return 160
        # nearest-match en TABLA_COCIENTE
        from src.application.scoring.baremos import TABLA_COCIENTE

        cociente = TABLA_COCIENTE.get(suma)
        if cociente is not None:
            return cociente
        nearest = min(TABLA_COCIENTE.keys(), key=lambda k: abs(k - suma))
        return TABLA_COCIENTE[nearest]

    def lookup(self, area: str, edad_meses: int, raw_score: int) -> Optional[BaremosLookupResult]:
        """Lookup completo: raw → estándar + percentil + interpretación + edad equivalente."""
        if not self._loaded:
            self.cargar_baremos()

        estándar = self.get_puntaje_estandar(area, edad_meses, raw_score)
        if estándar is None:
            return None

        rango = self.get_rango_edad(area, edad_meses)
        rango_min, rango_max = (0, 0)
        if rango:
            rangos_del_area = self._tablas.get(self.normalizar_area(area), [])
            puntos_del_rango = next(
                (r["puntos"] for r in rangos_del_area if r["min_meses"] == rango[0] and r["max_meses"] == rango[1]),
                {},
            )
            if puntos_del_rango:
                rango_min = min(puntos_del_rango.values())
                rango_max = max(puntos_del_rango.values())

        return BaremosLookupResult(
            raw_score=raw_score,
            estándar=estándar,
            percentil=self.get_percentil(estándar),
            interpretacion=self.get_interpretacion(estándar),
            edad_equivalente=self.get_edad_equivalente(area, raw_score) or 0,
            rango_min=rango_min,
            rango_max=rango_max,
        )


baremos_service = BaremosService()

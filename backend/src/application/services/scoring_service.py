"""Scoring Service - genera puntajes estándar y cociente general DAYC-2.

Convenciones (baremos.py):
- raw = item_inicio + items_aprobados_en_el_area
- estándar = lookup(área, edad_meses, raw) en rangos de baremos
- percentil = string (ej. '50', '<0.1', '>99.9')
- interpretación = lista de baremos.INTERPRETACION
- cociente_general = TABLA_COCIENTE[suma_estandares] (mapeo directo del manual)
"""

import logging
from typing import Dict, List, Optional

from django.db import transaction

from src.api.evaluaciones.models import (
    Evaluación,
    EvaluacionItem,
    Respuesta,
    ResultadoÁrea,
)
from src.application.services.baremos_service import baremos_service

logger = logging.getLogger(__name__)

AREA_CODES = ["COG", "LEN", "FIS", "SOC", "ADA"]


class ScoringService:
    """Calcula puntajes estándar, percentiles, interpretaciones y GDQ."""

    @transaction.atomic
    def calcular_resultados(self, evaluación: Evaluación) -> List[ResultadoÁrea]:
        """Calcula los resultados por área y el GDQ global."""
        evaluación.resultados.all().delete()

        items = list(evaluación.items.all())

        # Contar items aprobados por cada área (nombre del modelo)
        pass_count_by_area: Dict[str, int] = {}
        for item in items:
            if self._es_pass(item):
                pass_count_by_area[item.area] = pass_count_by_area.get(item.area, 0) + 1

        resultados: List[ResultadoÁrea] = []
        estándares: List[Optional[int]] = []

        for code in AREA_CODES:
            area_name = baremos_service.area_code_to_name(code)
            # Si la evaluación no tiene items de este área, no se calcula
            if area_name not in pass_count_by_area and code not in [
                baremos_service.area_code_to_name(c) for c in pass_count_by_area.keys()
            ]:
                # No hay items: calcular igual con raw=0 + puntos base
                pass

            # Mapear area_name -> conteo (el conteo se hizo con area_name)
            count = pass_count_by_area.get(area_name, 0)
            raw = baremos_service.calcular_puntaje_directo(
                items_count_by_area={area_name: count},
                area=area_name,
                edad_meses=evaluación.edad_meses,
            )

            estándar = baremos_service.get_puntaje_estandar(
                area=area_name, edad_meses=evaluación.edad_meses, raw_score=raw
            )
            percentil = baremos_service.get_percentil(estándar)
            interpretacion = baremos_service.get_interpretacion(estándar)
            edad_eq = baremos_service.get_edad_equivalente(area=area_name, raw_score=raw)

            resultado = ResultadoÁrea(
                evaluación=evaluación,
                área=area_name,
                puntuación_directa=raw,
                puntuación_estándar=estándar,
                percentil=str(percentil) if percentil is not None else None,
                edad_equivalente=str(edad_eq) if edad_eq is not None else None,
                interpretación=interpretacion if estándar is not None else None,
            )
            resultado.save()
            resultados.append(resultado)
            estándares.append(estándar)

        # GDQ: solo si las 5 áreas tienen estándar
        gdq = baremos_service.calcular_cociente_general(estándares)
        for r in resultados:
            r.cociente_general_gdq = gdq
            r.save()

        return resultados

    def _es_pass(self, item: EvaluacionItem) -> bool:
        """Determina si un item cuenta como PASS para el puntaje bruto.

        Prioridad: final_result (validado por psicólogo) > system_result.
        Solo PASS cuenta; FAIL/INCONCLUSIVE/NOT_ADMINISTERED no.
        """
        result = item.final_result or item.system_result
        return result == EvaluacionItem.Resultado.PASS

    def _sumar_puntuación_items(
        self, items: List[EvaluacionItem], area_name: str, edad_meses: int
    ) -> int:
        """Compatibilidad: wrapper que delega al baremos_service."""
        pass_count = sum(1 for i in items if i.area == area_name and self._es_pass(i))
        return baremos_service.calcular_puntaje_directo(
            items_count_by_area={area_name: pass_count},
            area=area_name,
            edad_meses=edad_meses,
        )

    def _sumar_puntuación(
        self, respuestas: List[Respuesta], area_name: str
    ) -> int:
        """Compatibilidad: legacy path basado en Respuesta.Resultado."""
        return sum(
            1
            for r in respuestas
            if r.area == area_name
            and r.resultado == Respuesta.Resultado.CORRECT
        )

    def _obtener_áreas_items(self, items: List[EvaluacionItem]) -> List[str]:
        return sorted({i.area for i in items})

    def _obtener_áreas(self, respuestas: List[Respuesta]) -> List[str]:
        return sorted({r.area for r in respuestas if r.area})

    def calcular_gdq_global(self, resultados: List[ResultadoÁrea]) -> Optional[int]:
        """GDQ a partir de los ResultadoÁrea guardados."""
        estándares = [r.puntuación_estándar for r in resultados if r.puntuación_estándar]
        if len(estándares) != 5:
            return None
        return baremos_service.calcular_cociente_general(estándares)


scoring_service = ScoringService()

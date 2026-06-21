"""Scoring Service - generates standard scores using baremos in RAM"""
from typing import List, Dict
from src.api.evaluaciones.models import Evaluación, EvaluacionItem, Respuesta, ResultadoÁrea
from src.application.services.baremos_service import baremos_service
from src.application.services.edad_service import EdadService


class ScoringService:
    """Service for calculating standard scores - uses baremos in RAM (O(1))"""
    
    def calcular_resultados(self, evaluación: Evaluación) -> List[ResultadoÁrea]:
        """Calculate all area results for an evaluation"""
        evaluación.resultados.all().delete()

        items = list(evaluación.items.all())
        respuestas = list(evaluación.respuestas.all())

        áreas = self._obtener_áreas_items(items) if items else self._obtener_áreas(respuestas)
        
        resultados = []
        gdq_values = []
        
        for área in áreas:
            puntuación_directa = self._sumar_puntuación_items(items, área) if items else self._sumar_puntuación(respuestas, área)
            edad_meses = evaluación.edad_meses
            
            resultado_baremos = baremos_service.lookup(edad_meses, área, puntuación_directa)
            
            if resultado_baremos:
                edad_equiv = EdadService.calcular_edad_equivalente(resultado_baremos.puntuación_estándar)
                gdq_values.append(resultado_baremos.puntuación_estándar)
                
                resultado = ResultadoÁrea(
                    evaluación=evaluación,
                    área=área,
                    puntuación_directa=puntuación_directa,
                    puntuación_estándar=resultado_baremos.puntuación_estándar,
                    percentil=resultado_baremos.percentil,
                    edad_equivalente=edad_equiv,
                )
            else:
                resultado = ResultadoÁrea(
                    evaluación=evaluación,
                    área=área,
                    puntuación_directa=puntuación_directa,
                )
            
            resultado.save()
            resultados.append(resultado)
        
        if gdq_values:
            gdq_promedio = sum(gdq_values) // len(gdq_values)
            for r in resultados:
                r.cociente_general_gdq = gdq_promedio
                r.save()
        
        return resultados
    
    def _obtener_áreas(self, respuestas: List[Respuesta]) -> List[str]:
        """Get unique areas from responses"""
        áreas = set()
        for respuesta in respuestas:
            area = self._map_minijuego_to_area(respuesta.minijuego_id)
            áreas.add(area)
        return sorted(list(áreas))

    def _obtener_áreas_items(self, items: List[EvaluacionItem]) -> List[str]:
        áreas = {item.area for item in items}
        return sorted(list(áreas))
    
    def _map_minijuego_to_area(self, minijuego_id: str) -> str:
        """Map minijuego ID to DAYC-2 area"""
        mapping = {
            'memoria-visual': 'MEMORIA',
            'memoria-auditiva': 'MEMORIA',
            'palabras-fonologicas': 'LENGUAJE',
            'articulacion': 'LENGUAJE',
            'atencion-sostenida': 'ATENCIÓN',
            'atencion-selectiva': 'ATENCIÓN',
            'percepcion-visual': 'PERCEPCIÓN',
            'percepcion-auditiva': 'PERCEPCIÓN',
        }
        return mapping.get(minijuego_id, 'LENGUAJE')
    
    def _sumar_puntuación(self, respuestas: List[Respuesta], área: str) -> int:
        """Sum correct answers for an area"""
        total = 0
        for respuesta in respuestas:
            if self._map_minijuego_to_area(respuesta.minijuego_id) == área:
                if respuesta.resultado == Respuesta.Resultado.CORRECT:
                    total += 1
        return total

    def _sumar_puntuación_items(self, items: List[EvaluacionItem], área: str) -> int:
        """Sum PASS items for an area using final result when reviewed, otherwise preliminary result."""
        total = 0
        for item in items:
            if item.area != área:
                continue
            result = item.final_result or item.system_result
            if result == EvaluacionItem.Resultado.PASS:
                total += 1
        return total
    
    def calcular_gdq_global(self, resultados: List[ResultadoÁrea]) -> int:
        """Calculate global GDQ from all area results"""
        estándares = [r.puntuación_estándar for r in resultados if r.puntuación_estándar]
        if not estándares:
            return 0
        return sum(estándares) // len(estándares)


scoring_service = ScoringService()

"""Diagnosis Prompt Service - Build prompts for AI diagnosis generation"""
from typing import Dict, List

from src.api.evaluaciones.models import Evaluación


class DiagnosisPromptService:
    """Service to build diagnosis prompts and stimulation activities"""

    def construir_prompt(self, evaluación: Evaluación, gdq: int) -> str:
        """Build diagnosis prompt with strict constraints"""
        
        resultados = []
        for r in evaluación.resultados.all():
            resultados.append(
                f"- {r.área}: PD={r.puntuación_directa}, "
                f"PE={r.puntuación_estándar}, Percentil={r.percentil}"
            )
        
        nombre_niño = getattr(evaluación.niño, 'nombre', 'Niño') if evaluación.niño else 'Niño'
        
        prompt = f"""Eres un psicólogo clínico especializado en evaluación infantil con el TEST DAYC-2.

INSTRUCCIONES ESTRICTAS:
1. Genera un diagnóstico NARRATIVO basado EXCLUSIVAMENTE en los datos objetivos proporcionados
2. NO inventes ni asumas información no presente en los datos
3. SIEMPRE incluye exactamente 3 actividades de estimulación específicas según el GDQ
4. El diagnóstico debe ser comprensible para padres/tutores

DATOS DE LA EVALUACIÓN:
- Niño: {nombre_niño}
- Edad Cronológica: {evaluación.edad_meses} meses ({evaluación.edad_meses // 12} años {evaluación.edad_meses % 12} meses)
- GDQ (Cociente de Desarrollo General): {gdq}

RESULTADOS POR ÁREA:
{chr(10).join(resultados)}

DIAGNÓSTICO (formato requerido):
- Resumen ejecutivo (2-3 oraciones)
- Interpretación por área (breve)
- Nivel de desarrollo global
- 3 actividades de estimulación específicas y personalizadas

Genera el diagnóstico ahora:"""
        
        return prompt

    def generar_actividades_por_gdq(self, gdq: int) -> List[Dict]:
        """Generate 3 stimulation activities based on GDQ level"""
        
        if gdq >= 130:
            return self._actividades_superior()
        elif gdq >= 110:
            return self._actividades_alto_promedio()
        elif gdq >= 90:
            return self._actividades_promedio()
        elif gdq >= 70:
            return self._actividades_bajo()
        else:
            return self._actividades_muy_bajo()

    def _actividades_superior(self) -> List[Dict]:
        return [
            {
                "id": 1,
                "nombre": "Juego de memoria avanzada",
                "descripción": "Tareas de memoria de trabajo con dificultad progresiva. Usar secuencias de 5-7 elementos.",
                "duración_minutos": 15,
                "área": "Memoria"
            },
            {
                "id": 2,
                "nombre": "Ejercicios de vocabulario extenso",
                "descripción": "Introducir palabras abstractas, sinónimos y antónimos. Crear historias cortas.",
                "duración_minutos": 20,
                "área": "Lenguaje"
            },
            {
                "id": 3,
                "nombre": "Juego de secuenciación compleja",
                "descripción": "Ordenar eventos con múltiples pasos (causa-efecto). Usar láminas secuenciales.",
                "duración_minutos": 15,
                "área": "Cognición"
            }
        ]

    def _actividades_alto_promedio(self) -> List[Dict]:
        return [
            {
                "id": 1,
                "nombre": "Juego de memoria visual",
                "descripción": "Emparejar tarjetas con imágenes familiares. Aumentar complejidad progresivamente.",
                "duración_minutos": 12,
                "área": "Memoria"
            },
            {
                "id": 2,
                "nombre": "Ejercicios de vocabulario avanzado",
                "descripción": "Nombrar objetos, usar en oraciones y identificar categorías.",
                "duración_minutos": 15,
                "área": "Lenguaje"
            },
            {
                "id": 3,
                "nombre": "Actividades de atención sostenida",
                "descripción": "Buscar objetos específicos en escenarios complejos. Incrementar tiempo.",
                "duración_minutos": 12,
                "área": "Atención"
            }
        ]

    def _actividades_promedio(self) -> List[Dict]:
        return [
            {
                "id": 1,
                "nombre": "Juego de memoria visual",
                "descripción": "Emparejar tarjetas con imágenes familiares. 4-6 pares inicial.",
                "duración_minutos": 10,
                "área": "Memoria"
            },
            {
                "id": 2,
                "nombre": "Ejercicios de vocabulario básico",
                "descripción": "Nombrar objetos y usar en oraciones simples de 3-4 palabras.",
                "duración_minutos": 15,
                "área": "Lenguaje"
            },
            {
                "id": 3,
                "nombre": "Actividades de atención sostenida",
                "descripción": "Buscar objetos en escenarios con distractores. 5-10 minutos.",
                "duración_minutos": 10,
                "área": "Atención"
            }
        ]

    def _actividades_bajo(self) -> List[Dict]:
        return [
            {
                "id": 1,
                "nombre": "Juego de memoria simple",
                "descripción": "Recordar 3-4 elementos durante 30 segundos. Usar imágenes concretas.",
                "duración_minutos": 8,
                "área": "Memoria"
            },
            {
                "id": 2,
                "nombre": "Ejercicios de lenguaje dirigido",
                "descripción": "Seguimiento de instrucciones simples de 2 pasos. Usar gestos.",
                "duración_minutos": 12,
                "área": "Lenguaje"
            },
            {
                "id": 3,
                "nombre": "Estimulación perceptual básica",
                "descripción": "Discriminar formas, colores y tamaños. Usar materiales táctiles.",
                "duración_minutos": 10,
                "área": "Percepción"
            }
        ]

    def _actividades_muy_bajo(self) -> List[Dict]:
        return [
            {
                "id": 1,
                "nombre": "Juego de memoria básico",
                "descripción": "Emparejar 2-4 pares de imágenes idénticas. Reforzar con verbalización.",
                "duración_minutos": 5,
                "área": "Memoria"
            },
            {
                "id": 2,
                "nombre": "Ejercicios de atención",
                "descripción": "Mantener mirada en objeto interesante durante 10 segundos. Usar objetos brillantes.",
                "duración_minutos": 5,
                "área": "Atención"
            },
            {
                "id": 3,
                "nombre": "Estimulación sensorial",
                "descripción": "Explorar texturas, sonidos y colores. Estimulación multisensorial guiada.",
                "duración_minutos": 8,
                "área": "Sensorial"
            }
        ]


diagnosis_prompt_service = DiagnosisPromptService()
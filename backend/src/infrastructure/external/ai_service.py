"""AI Service - Interface for Gemini and Claude"""
import os
from typing import Dict
from src.api.evaluaciones.models import Evaluación
from src.infrastructure.external.gemini_client import GeminiClient
from src.infrastructure.external.claude_client import ClaudeClient


class AIService:
    """Unified AI service for diagnosis generation"""
    
    def generar_diagnóstico(self, evaluación: Evaluación, modelo: str = 'gemini-2.0-flash') -> Dict:
        """Generate diagnosis with stimulation activities based on GDQ"""
        
        resultados = list(evaluación.resultados.all())
        
        gdq = 0
        if resultados and resultados[0].cociente_general_gdq:
            gdq = resultados[0].cociente_general_gdq
        
        if 'gemini' in modelo.lower():
            client = GeminiClient()
            return client.generar_diagnóstico(evaluación, gdq)
        elif 'claude' in modelo.lower():
            client = ClaudeClient()
            return client.generar_diagnóstico(evaluación, gdq)
        else:
            client = GeminiClient()
            return client.generar_diagnóstico(evaluación, gdq)
    
    def _construir_prompt(self, evaluación: Evaluación, gdq: int) -> str:
        """Build diagnosis prompt with strict constraints"""
        
        resultados = []
        for r in evaluación.resultados.all():
            resultados.append(f"- {r.área}: PD={r.puntuación_directa}, PE={r.puntuación_estándar}, Percentil={r.percentil}")
        
        prompt = f"""Eres un psicólogo clínico especializado en evaluación infantil con el TEST DAYC-2.

INSTRUCCIONES ESTRICTAS:
1. Genera un diagnóstico NARRATIVO basado EXCLUSIVAMENTE en los datos objetivos proporcionados
2. NO inventes ni asumas información no presente en los datos
3. SIEMPRE incluye exactamente 3 actividades de estimulación específicas según el GDQ

DATOS DE LA EVALUACIÓN:
- Niño: {evaluación.niño.nombre}
- Edad Cronológica: {evaluación.edad_meses} meses ({evaluación.edad_meses // 12} años)
- GDQ (Cociente de Desarrollo General): {gdq}

RESULTADOS POR ÁREA:
{chr(10).join(resultados)}

DIAGNÓSTICO (formato requerido):"""
        
        return prompt
    
    def _generar_actividades_por_gdq(self, gdq: int) -> list:
        """Generate 3 stimulation activities based on GDQ"""
        
        if gdq >= 13:
            actividades = [
                {"id": 1, "nombre": "Juego de memoria avanzada", "descripción": "Tareas de memoria de trabajo con dificultad progresiva", "duración_minutos": 15},
                {"id": 2, "nombre": "Ejercicios de vocabulario extenso", "descripción": "Introducir palabras abstractas y sinónimos", "duración_minutos": 20},
                {"id": 3, "nombre": "Juego de secuenciación compleja", "descripción": "Ordenar eventos con múltiples pasos", "duración_minutos": 15},
            ]
        elif gdq >= 10:
            actividades = [
                {"id": 1, "nombre": "Juego de memoria visual", "descripción": "Emparejar tarjetas con imágenes familiares", "duración_minutos": 10},
                {"id": 2, "nombre": "Ejercicios de vocabulario básico", "descripción": "Nombrar objetos y usar en oraciones simples", "duración_minutos": 15},
                {"id": 3, "nombre": "Actividades de atención sostenida", "descripción": "Buscar objetos en escenarios complejos", "duración_minutos": 12},
            ]
        elif gdq >= 7:
            actividades = [
                {"id": 1, "nombre": "Juego de memoria simple", "descripción": "Recordar 3-4 elementos durante 30 segundos", "duración_minutos": 8},
                {"id": 2, "nombre": "Ejercicios de lenguaje dirigido", "descripción": "跟随指令 simples de 2 pasos", "duración_minutos": 12},
                {"id": 3, "nombre": "Estimulación perceptual básica", "descripción": "Discriminar formas y colores", "duración_minutos": 10},
            ]
        else:
            actividades = [
                {"id": 1, "nombre": "Juego de memoria básico", "descripción": "Emparejar 2-4 pares de imágenes", "duración_minutos": 5},
                {"id": 2, "nombre": "Ejercicios de atención", "descripción": "Mantener mirada en objeto durante 10 segundos", "duración_minutos": 5},
                {"id": 3, "nombre": "Estimulación sensorial", "descripción": "Explorar texturas y sonidos", "duración_minutos": 8},
            ]
        
        return actividades


ai_service = AIService()
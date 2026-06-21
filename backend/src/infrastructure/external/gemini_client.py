"""Gemini AI Client for diagnosis generation"""
import os
from typing import Dict


class GeminiClient:
    """Client for Google Gemini API"""
    
    def __init__(self):
        self.api_key = os.environ.get('GEMINI_API_KEY', '')
        self.model = os.environ.get('GEMINI_MODEL', 'gemini-2.0-flash')
    
    def generar_diagnóstico(self, evaluación, gdq: int) -> Dict:
        """Generate diagnosis using Gemini"""
        
        from src.infrastructure.external.ai_service import ai_service
        
        prompt = ai_service._construir_prompt(evaluación, gdq)
        actividades = ai_service._generar_actividades_por_gdq(gdq)
        
        diagnóstico = self._llamar_gemini(prompt, gdq)
        
        return {
            'diagnóstico': diagnóstico,
            'modelo_usado': f'gemini-{self.model}',
            'gdq': gdq,
            'actividades_estimulación': actividades,
        }
    
    def _llamar_gemini(self, prompt: str, gdq: int) -> str:
        """Make API call to Gemini (mock for now)"""
        
        return f"""El niño presenta un nivel de desarrollo cognitivo {self._interpretar_gdq(gdq)} según el GDQ de {gdq}.
        
En las áreas evaluadas se observan fortalezas y áreas de oportunidad que serán detalladas en la evaluación completa.
        
        Recomendaciones: Se sugiere continuar con actividades de estimulación cognitiva adecuadas para su edad."""

    def _interpretar_gdq(self, gdq: int) -> str:
        if gdq >= 110:
            return 'superior'
        if gdq >= 90:
            return 'promedio'
        if gdq >= 80:
            return 'bajo'
        return 'muy bajo'


gemini_client = GeminiClient()

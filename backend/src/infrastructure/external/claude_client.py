"""Claude AI Client for diagnosis generation"""
import os
from typing import Dict


class ClaudeClient:
    """Client for Anthropic Claude API"""
    
    def __init__(self):
        self.api_key = os.environ.get('CLAUDE_API_KEY', '')
        self.model = os.environ.get('CLAUDE_MODEL', 'claude-3-sonnet')
    
    def generar_diagnóstico(self, evaluación, gdq: int) -> Dict:
        """Generate diagnosis using Claude"""
        
        from src.infrastructure.external.ai_service import ai_service
        
        prompt = ai_service._construir_prompt(evaluación, gdq)
        actividades = ai_service._generar_actividades_por_gdq(gdq)
        
        diagnóstico = self._llamar_claude(prompt, gdq)
        
        return {
            'diagnóstico': diagnóstico,
            'modelo_usado': f'claude-{self.model}',
            'gdq': gdq,
            'actividades_estimulación': actividades,
        }
    
    def _llamar_claude(self, prompt: str, gdq: int) -> str:
        """Make API call to Claude (mock for now)"""
        
        return f"""Según la evaluación DAYC-2 aplicada, el niño con GDQ de {gdq} muestra un perfil de desarrollo que requiere atención en áreas específicas.
        
El análisis de las puntuaciones obtenidas indica fortalezas en ciertas áreas y necesidades de estimulación en otras.
        
Se recomienda intervención temprana con actividades específicas de estimulación cognitiva."""


claude_client = ClaudeClient()
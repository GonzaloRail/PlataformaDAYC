"""Evaluation Rules Service - MVP stop rule for DAYC-2.

For this semi-assisted MVP, an area stops after three consecutive incorrect
responses. Full DAYC-2 base/ceiling rules remain outside this initial scope.
"""
from dataclasses import dataclass
from typing import List, Optional

from src.api.evaluaciones.models import Respuesta


@dataclass
class RuleResult:
    """Result from rule evaluation."""
    triggered: bool
    rule_name: str
    reason: str

    @property
    def nombre(self) -> str:
        return self.rule_name


class RulesService:
    """Service for evaluating the simplified three-error stop rule."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.regla_activa = None
        return cls._instance

    def evaluar_reglas(self, respuestas: List[Respuesta]) -> Optional[RuleResult]:
        """Return a stop result after three consecutive incorrect responses."""
        if hasattr(respuestas, 'respuestas'):
            respuestas = list(respuestas.respuestas.all())

        if len(respuestas) < 3:
            return None

        last_3 = respuestas[-3:]
        if all(r.resultado == Respuesta.Resultado.ERROR for r in last_3):
            return RuleResult(
                triggered=True,
                rule_name='STOP_3_ERRORES_CONSECUTIVOS',
                reason='3 respuestas incorrectas consecutivas en el área actual',
            )

        return None


rules_service = RulesService()

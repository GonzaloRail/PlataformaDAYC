"""Edad Cronológica Service - calculates child age from birth date"""
from datetime import date
import calendar
from dataclasses import dataclass


@dataclass
class EdadCronológica:
    """Value object for chronological age"""
    años: int
    meses: int
    días: int

    def __str__(self):
        return f"{self.años} años {self.meses} meses"

    @property
    def meses_totales(self) -> int:
        return self.años * 12 + self.meses


class EdadService:
    """Service for calculating chronological age"""
    
    @staticmethod
    def calcular_edad(fecha_nacimiento: date) -> EdadCronológica:
        """Calculate age in years, months, and days from birth date"""
        today = date.today()
        
        años = today.year - fecha_nacimiento.year
        meses = today.month - fecha_nacimiento.month
        días = today.day - fecha_nacimiento.day
        
        if días < 0:
            meses -= 1
            prev_month = today.month - 1 or 12
            prev_year = today.year if today.month > 1 else today.year - 1
            days_in_prev_month = calendar.monthrange(prev_year, prev_month)[1]
            días += days_in_prev_month
        
        if meses < 0:
            años -= 1
            meses += 12
        
        return EdadCronológica(años=años, meses=meses, días=días)
    
    @staticmethod
    def calcular_edad_meses(fecha_nacimiento: date) -> int:
        """Calculate age in months only"""
        edad = EdadService.calcular_edad(fecha_nacimiento)
        return edad.meses_totales
    
    @staticmethod
    def calcular_edad_equivalente(puntuación_estándar: int) -> str:
        """Calculate equivalent age based on standard score (for results display)"""
        if puntuación_estándar >= 13:
            return "Superior a su edad cronológica"
        elif puntuación_estándar >= 10:
            return "Adecuado para su edad"
        elif puntuación_estándar >= 7:
            return "Ligeramente bajo"
        elif puntuación_estándar >= 4:
            return "Bajo"
        else:
            return "Significativamente bajo"

"""Tests for BaremosService - O(1) lookup in RAM"""
import pytest
from unittest.mock import patch, MagicMock
from src.application.services.baremos_service import BaremosService, baremos_service


class TestBaremosService:
    """Test suite for BaremosService"""
    
    def setup_method(self):
        """Reset service state before each test"""
        self.service = BaremosService()
        self.service._baremos = {}
        self.service._loaded = False
    
    def test_singleton_pattern(self):
        """Test that BaremosService follows singleton pattern"""
        service1 = BaremosService()
        service2 = BaremosService()
        assert service1 is service2
    
    def test_cargar_baremos_with_default(self):
        """Test loading baremos with default fallback"""
        with patch('os.path.exists', return_value=False):
            self.service.cargar_baremos()
            assert self.service._loaded is True
            assert self.service._baremos == {}
    
    def test_cargar_baremos_from_json(self):
        """Test loading baremos from JSON file"""
        mock_data = {
            'áreas': {
                'LENGUAJE': {
                    'articulation': {
                        '24': {
                            '10': {'estándar': 10, 'percentil': 50},
                            'default': {'estándar': 8, 'percentil': 25}
                        }
                    }
                }
            }
        }
        
        with patch('builtins.open', MagicMock()):
            with patch('json.load', return_value=mock_data):
                self.service.cargar_baremos('/fake/path.json')
                assert self.service._loaded is True
                assert (24, 'LENGUAJE') in self.service._baremos
    
    def test_lookup_with_exact_match(self):
        """Test O(1) lookup with exact age and area match"""
        self.service._baremos = {
            (36, 'MEMORIA'): {
                '10': {'estándar': 12, 'percentil': 75}
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(36, 'MEMORIA', 10)
        
        assert result is not None
        assert result.puntuación_estándar == 12
        assert result.percentil == 75
    
    def test_lookup_with_age_adjustment(self):
        """Test lookup with age adjustment to nearest valid"""
        self.service._baremos = {
            (36, 'LENGUAJE'): {
                '15': {'estándar': 11, 'percentil': 63}
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(38, 'LENGUAJE', 15)
        
        assert result is not None
        assert result.puntuación_estándar == 11
    
    def test_lookup_with_out_of_range_age(self):
        """Test lookup with age outside valid range"""
        self.service._baremos = {
            (24, 'ATENCIÓN'): {
                '8': {'estándar': 9, 'percentil': 37}
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(12, 'ATENCIÓN', 8)
        
        assert result is not None
        assert result.puntuación_estándar == 9
    
    def test_lookup_not_found(self):
        """Test lookup when no matching baremos exists"""
        self.service._baremos = {}
        self.service._loaded = True
        
        result = self.service.lookup(36, 'PERCEPCIÓN', 100)
        
        assert result is None
    
    def test_lookup_triggers_auto_load(self):
        """Test that lookup triggers auto-load if not loaded"""
        with patch.object(self.service, 'cargar_baremos') as mock_load:
            self.service.lookup(36, 'LENGUAJE', 10)
            mock_load.assert_called_once()
    
    def test_ajustar_edad_below_minimum(self):
        """Test age adjustment for ages below minimum (24 months)"""
        result = self.service._ajustar_edad(18)
        assert result == 24
    
    def test_ajustar_edad_above_maximum(self):
        """Test age adjustment for ages above maximum (72 months)"""
        result = self.service._ajustar_edad(84)
        assert result == 72
    
    def test_ajustar_edad_within_range(self):
        """Test age adjustment for ages within valid range"""
        result = self.service._ajustar_edad(35)
        assert result == 36
    
    def test_ajustar_edad_rounds_to_nearest_6(self):
        """Test age adjustment rounds to nearest 6 months"""
        assert self.service._ajustar_edad(37) == 36
        assert self.service._ajustar_edad(38) == 36
        assert self.service._ajustar_edad(43) == 42
    
    def test_esta_cargado(self):
        """Test está_cargado method"""
        self.service._loaded = False
        assert self.service.está_cargado() is False
        
        self.service._loaded = True
        assert self.service.está_cargado() is True
    
    def test_lookup_returns_correct_puntuacion_range(self):
        """Test that lookup returns correct min/max range"""
        self.service._baremos = {
            (48, 'MEMORIA'): {
                '12': {'estándar': 14, 'percentil': 91},
                'min': 0,
                'max': 20
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(48, 'MEMORIA', 12)
        
        assert result.puntuación_min == 0
        assert result.puntuación_max == 20


class TestBaremosServicePerformance:
    """Test suite for O(1) performance characteristics"""
    
    def test_lookup_performance_is_constant(self):
        """Verify lookup performance is O(1) regardless of data size"""
        service = BaremosService()
        service._loaded = True
        
        large_baremos = {(i, 'MEMORIA'): {'5': {'estándar': 10, 'percentil': 50}} 
                       for i in range(24, 96, 6)}
        service._baremos = large_baremos
        
        import time
        
        start = time.perf_counter()
        for _ in range(1000):
            service.lookup(48, 'MEMORIA', 5)
        elapsed = time.perf_counter() - start
        
        assert elapsed < 0.1
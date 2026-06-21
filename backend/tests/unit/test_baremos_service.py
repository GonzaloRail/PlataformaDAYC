"""Unit tests for BaremosService - O(1) lookup in RAM"""
import unittest
import sys
import json
import tempfile
import os
from unittest.mock import patch, MagicMock

# Mock Django before importing BaremosService
sys.modules['django.conf'] = MagicMock()
sys.modules['django.conf'].settings = MagicMock()


class TestBaremosService(unittest.TestCase):
    """Tests for BaremosService"""
    
    def setUp(self):
        """Set up test fixtures"""
        from src.application.services.baremos_service import BaremosService
        self.service = BaremosService()
        self.service._baremos = {}
        self.service._loaded = False
    
    def tearDown(self):
        """Clean up after tests"""
        self.service._baremos = {}
        self.service._loaded = False
    
    def test_singleton_pattern(self):
        """Test that BaremosService follows singleton pattern"""
        from src.application.services.baremos_service import baremos_service, BaremosService
        service1 = BaremosService()
        service2 = BaremosService()
        self.assertIs(service1, service2)
        self.assertIs(service1, baremos_service)
    
    def test_cargar_baremos_with_valid_file(self):
        """Test loading baremos from valid JSON file"""
        test_data = {
            'áreas': {
                'LENGUAJE': {
                    '24': {
                        '0': {'estándar': 1, 'percentil': 1},
                        '10': {'estándar': 10, 'percentil': 50},
                        '20': {'estándar': 19, 'percentil': 99}
                    }
                },
                'MEMORIA': {
                    '24': {
                        '0': {'estándar': 1, 'percentil': 1},
                        '15': {'estándar': 10, 'percentil': 50}
                    }
                }
            }
        }
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
            json.dump(test_data, f)
            temp_path = f.name
        
        try:
            self.service.cargar_baremos(temp_path)
            self.assertTrue(self.service.está_cargado())
            self.assertIn((24, 'LENGUAJE'), self.service._baremos)
            self.assertIn((24, 'MEMORIA'), self.service._baremos)
        finally:
            os.unlink(temp_path)
            self.service._baremos = {}
            self.service._loaded = False
    
    def test_cargar_baremos_with_missing_file(self):
        """Test loading baremos from missing file uses defaults"""
        self.service.cargar_baremos('nonexistent.json')
        self.assertTrue(self.service.está_cargado())
        self.assertEqual(self.service._baremos, {})
    
    def test_lookup_exact_match(self):
        """Test O(1) lookup with exact age and area match"""
        self.service._baremos = {
            (24, 'LENGUAJE'): {
                '10': {'estándar': 10, 'percentil': 50},
                '15': {'estándar': 15, 'percentil': 75}
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(24, 'LENGUAJE', 10)
        
        self.assertIsNotNone(result)
        self.assertEqual(result.puntuación_estándar, 10)
        self.assertEqual(result.percentil, 50)
    
    def test_lookup_with_age_adjustment(self):
        """Test lookup with age adjustment to nearest valid"""
        self.service._baremos = {
            (24, 'LENGUAJE'): {
                '10': {'estándar': 10, 'percentil': 50}
            }
        }
        self.service._loaded = True
        
        result = self.service.lookup(26, 'LENGUAJE', 10)
        
        self.assertIsNotNone(result)
        self.assertEqual(result.puntuación_estándar, 10)
    
    def test_lookup_returns_none_for_unknown(self):
        """Test lookup returns None for unknown age/area"""
        self.service._baremos = {}
        self.service._loaded = True
        
        result = self.service.lookup(24, 'UNKNOWN_AREA', 10)
        
        self.assertIsNone(result)
    
    def test_ajustar_edad_below_minimum(self):
        """Test age adjustment for ages below minimum (24 months)"""
        result = self.service._ajustar_edad(18)
        self.assertEqual(result, 24)
    
    def test_ajustar_edad_above_maximum(self):
        """Test age adjustment for ages above maximum (72 months)"""
        result = self.service._ajustar_edad(80)
        self.assertEqual(result, 72)
    
    def test_ajustar_edad_in_range(self):
        """Test age adjustment for ages in valid range"""
        result = self.service._ajustar_edad(35)
        expected = (35 // 6) * 6
        self.assertEqual(result, expected)
    
    def test_lookup_triggers_autoload_if_not_loaded(self):
        """Test that lookup triggers auto-load if baremos not loaded"""
        self.service._loaded = False
        
        with patch.object(self.service, 'cargar_baremos') as mock_load:
            with patch('os.path.exists', return_value=False):
                result = self.service.lookup(24, 'LENGUAJE', 10)
                mock_load.assert_called_once()


class TestBaremosLookupResult(unittest.TestCase):
    """Tests for Baremos lookup result dataclass"""
    
    def test_dataclass_creation(self):
        """Test that BaremosLookupResult dataclass works correctly"""
        from src.application.services.baremos_service import BaremosLookupResult
        
        result = BaremosLookupResult(
            puntuación_min=0,
            puntuación_max=40,
            puntuación_estándar=10,
            percentil=50
        )
        
        self.assertEqual(result.puntuación_min, 0)
        self.assertEqual(result.puntuación_max, 40)
        self.assertEqual(result.puntuación_estándar, 10)
        self.assertEqual(result.percentil, 50)


if __name__ == '__main__':
    unittest.main()
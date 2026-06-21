"""
App configuration for DAYC-2 project.
"""
from django.apps import AppConfig
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class Dayc2Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.dayc2'
    verbose_name = 'DAYC-2 Platform'

    def ready(self):
        """Load baremos into memory at Django startup"""
        self._cargar_baremos()
    
    def _cargar_baremos(self):
        """Load baremos JSON file into BaremosService"""
        try:
            from src.application.services.baremos_service import baremos_service
            
            baremos_path = getattr(settings, 'BAREMOS_JSON_PATH', None)
            
            if not baremos_path:
                import os
                base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
                baremos_path = os.path.join(base_dir, 'data', 'baremos_dayc2.json')
            
            baremos_service.cargar_baremos(baremos_path)
            logger.info(f"Baremos loaded successfully from {baremos_path}")
        except Exception as e:
            logger.warning(f"Could not load baremos at startup: {e}")
            logger.info("Baremos will be loaded on first request")
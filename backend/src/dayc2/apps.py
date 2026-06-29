"""
App configuration for DAYC-2 project.
"""
import json
import os

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
        from src.application.services.baremos_service import baremos_service

        baremos_path = getattr(settings, 'BAREMOS_JSON_PATH', None)
        if not baremos_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            baremos_path = os.path.join(base_dir, 'data', 'baremos_dayc2.json')

        try:
            baremos_service.cargar_baremos(baremos_path)
            logger.info("Baremos loaded successfully from %s", baremos_path)
        except FileNotFoundError:
            logger.warning("Baremos file not found at %s; using defaults", baremos_path)
        except json.JSONDecodeError as exc:
            logger.warning("Baremos file at %s is not valid JSON: %s", baremos_path, exc)
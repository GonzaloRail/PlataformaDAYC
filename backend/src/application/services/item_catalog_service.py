"""Fixed DAYC-2 item catalog for the semi-assisted evaluation flow."""
from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from src.application.services.baremos_service import baremos_service


AREA_ORDER = [
    'COGNITIVO',
    'COMUNICACION',
    'SOCIAL_EMOCIONAL',
    'DESARROLLO_FISICO',
    'CONDUCTA_ADAPTATIVA',
]

AREA_FILES = {
    'COGNITIVO': 'cognitivo.json',
    'COMUNICACION': 'comunicacion.json',
    'SOCIAL_EMOCIONAL': 'social_emocional.json',
    'DESARROLLO_FISICO': 'desarrollo_fisico.json',
    'CONDUCTA_ADAPTATIVA': 'conducta_adaptativa.json',
}


class ItemCatalogService:
    """Loads fixed DAYC-2 item metadata from versioned JSON files."""

    def __init__(self):
        self.catalog_dir = Path(__file__).resolve().parents[1] / 'catalog' / 'dayc2_items'

    @lru_cache(maxsize=1)
    def all_items(self) -> tuple[dict[str, Any], ...]:
        items: list[dict[str, Any]] = []
        for area in AREA_ORDER:
            items.extend(self.items_by_area(area))
        return tuple(items)

    @lru_cache(maxsize=None)
    def items_by_area(self, area: str) -> tuple[dict[str, Any], ...]:
        area = self.normalize_area(area)
        file_name = AREA_FILES.get(area)
        if not file_name:
            return tuple()

        path = self.catalog_dir / file_name
        if not path.exists():
            return tuple()

        with path.open('r', encoding='utf-8') as catalog_file:
            data = json.load(catalog_file)

        return tuple(sorted(data, key=lambda item: item.get('numero', 0)))

    def normalize_area(self, area: str | None) -> str:
        if not area:
            return AREA_ORDER[0]
        normalized = area.upper().replace('-', '_').replace(' ', '_')
        if normalized == 'SOCIAL':
            return 'SOCIAL_EMOCIONAL'
        if normalized == 'FISICO':
            return 'DESARROLLO_FISICO'
        return normalized

    def get_area_index(self, area: str | None) -> int:
        normalized = self.normalize_area(area)
        try:
            return AREA_ORDER.index(normalized)
        except ValueError:
            return 0

    def get_next_area(self, current_area: str | None) -> str | None:
        next_index = self.get_area_index(current_area) + 1
        if next_index >= len(AREA_ORDER):
            return None
        return AREA_ORDER[next_index]

    def get_item(self, item_id: str) -> dict[str, Any] | None:
        for item in self._index().get(item_id, ()):
            return dict(item)
        return None

    @lru_cache(maxsize=1)
    def _index(self) -> dict[str, tuple[dict[str, Any], ...]]:
        """O(1) lookup index of item_id -> (item,)."""
        return {item.get('id'): (item,) for item in self.all_items() if item.get('id')}

    def select_start_item(self, area: str, edad_meses: int | None) -> dict[str, Any] | None:
        items = list(self.items_by_area(area))
        if not items:
            return None

        if edad_meses is None:
            return dict(items[0])

        inicio = baremos_service.get_item_inicio(area, edad_meses)
        if inicio is not None:
            for item in items:
                if item.get('numero') == inicio:
                    return dict(item)

        for item in items:
            min_age = item.get('edad_inicio_min_meses', 0)
            max_age = item.get('edad_inicio_max_meses', 999)
            if min_age <= edad_meses <= max_age:
                return dict(item)

        return dict(items[0])

    def next_item_in_area(self, area: str, current_item_id: str | None) -> dict[str, Any] | None:
        items = list(self.items_by_area(area))
        if not items:
            return None
        if not current_item_id:
            return dict(items[0])

        for index, item in enumerate(items):
            if item.get('id') == current_item_id:
                next_index = index + 1
                if next_index < len(items):
                    return dict(items[next_index])
                return None
        return dict(items[0])


item_catalog_service = ItemCatalogService()

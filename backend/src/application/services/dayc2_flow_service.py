"""Semi-assisted DAYC-2 flow service.

The MVP rule intentionally stays simple: three consecutive FAIL results end the
current area and move the evaluation to the next area.
"""
from __future__ import annotations

from typing import Any

from django.utils import timezone

from src.api.evaluaciones.models import Evaluación, EvaluacionItem, EvidencePolicy, Respuesta
from src.application.services.item_catalog_service import AREA_ORDER, item_catalog_service


RESULT_TO_LEGACY = {
    EvaluacionItem.Resultado.PASS: Respuesta.Resultado.CORRECT,
    EvaluacionItem.Resultado.FAIL: Respuesta.Resultado.ERROR,
    EvaluacionItem.Resultado.INCONCLUSIVE: Respuesta.Resultado.NOT_APPLICABLE,
    EvaluacionItem.Resultado.NOT_ADMINISTERED: Respuesta.Resultado.NOT_APPLICABLE,
}


class Dayc2FlowService:
    """Coordinates item selection, area progression and preliminary answers."""

    def get_current_item(self, evaluación: Evaluación) -> EvaluacionItem | None:
        if evaluación.current_item_id:
            existing = evaluación.items.filter(
                item_id=evaluación.current_item_id,
                attempt_number=1,
            ).first()
            if existing:
                return existing

        area = item_catalog_service.normalize_area(evaluación.current_area)
        catalog_item = item_catalog_service.select_start_item(area, evaluación.edad_meses)
        if catalog_item is None:
            return None
        return self._activate_catalog_item(evaluación, catalog_item)

    def get_current_task_payload(self, evaluación: Evaluación) -> dict[str, Any] | None:
        item = self.get_current_item(evaluación)
        if item is None:
            return None

        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        validation_mode = 'ADULT_REQUIRED'
        if catalog_item.get('auto_validable') and not catalog_item.get('requiere_revision_psicologo', True):
            validation_mode = 'SYSTEM_AUTO'
        elif catalog_item.get('auto_validable'):
            validation_mode = 'SYSTEM_ASSISTED_REVIEW'

        return {
            'evaluacion_id': str(evaluación.id),
            'area': item.area,
            'area_index': item_catalog_service.get_area_index(item.area),
            'item_id': item.item_id,
            'numero_item': catalog_item.get('numero', item.orden),
            'current_task': item.item_id,
            'modalidad': item.modalidad,
            'pantalla_nino': item.pantalla_nino,
            'minijuego': catalog_item.get('actividad_digital') or item.item_id,
            'actividad_digital': catalog_item.get('actividad_digital'),
            'pregunta': catalog_item.get('pregunta') or catalog_item.get('descripcion_general'),
            'instrucciones': catalog_item.get('pregunta') or catalog_item.get('descripcion_general', 'Sigue las instrucciones del adulto acompanante.'),
            'tipo_interaction': self._interaction_type(catalog_item),
            'requiere_evidencia': catalog_item.get('requiere_evidencia', True),
            'tipos_evidencia': self._effective_evidence_types(item.item_id, catalog_item),
            'auto_validable': catalog_item.get('auto_validable', False),
            'requiere_revision_psicologo': item.requires_review,
            'validation_mode': validation_mode,
            'estado_item': item.estado,
            'estado_evaluacion': evaluación.estado,
        }

    def start_current_item(self, evaluación: Evaluación) -> EvaluacionItem | None:
        item = self.get_current_item(evaluación)
        if item and item.estado == EvaluacionItem.Estado.PENDING:
            item.estado = EvaluacionItem.Estado.IN_PROGRESS
            item.started_at = timezone.now()
            item.save(update_fields=['estado', 'started_at'])
        if evaluación.estado in [Evaluación.Estado.INITIATED, Evaluación.Estado.WAITING_CONSENT]:
            evaluación.estado = Evaluación.Estado.IN_PROGRESS
            evaluación.started_at = evaluación.started_at or timezone.now()
            evaluación.save(update_fields=['estado', 'started_at'])
        return item

    def complete_current_item(
        self,
        evaluación: Evaluación,
        result: str,
        source: str = Respuesta.Source.SYSTEM_ASSISTED,
        duration_ms: int | None = None,
        confidence: float | None = None,
        raw_data: dict[str, Any] | None = None,
        notes: str = '',
    ) -> tuple[EvaluacionItem | None, dict[str, Any]]:
        item = self.get_current_item(evaluación)
        if item is None:
            return None, {'evaluation_finished': True}

        normalized_result = self._normalize_result(result)
        confidence = self._to_float(confidence)
        duration_ms = self._to_int(duration_ms)
        catalog_item = item_catalog_service.get_item(item.item_id) or {}
        needs_review = bool(catalog_item.get('requiere_revision_psicologo', True))
        if normalized_result in [EvaluacionItem.Resultado.INCONCLUSIVE, EvaluacionItem.Resultado.NOT_ADMINISTERED]:
            needs_review = True
        if confidence is not None and confidence < 0.75:
            needs_review = True

        item.system_result = normalized_result
        item.system_confidence = confidence
        item.requires_review = needs_review
        item.raw_data = raw_data or {}
        item.duration_ms = duration_ms
        item.completed_at = timezone.now()
        if needs_review:
            item.estado = EvaluacionItem.Estado.NEEDS_REVIEW
        else:
            item.estado = EvaluacionItem.Estado.AUTO_VALIDATED
            item.final_result = normalized_result
        item.save()

        Respuesta.objects.create(
            evaluación=evaluación,
            evaluación_item=item,
            minijuego_id=catalog_item.get('actividad_digital') or item.item_id,
            item_id=item.item_id,
            area=item.area,
            resultado=RESULT_TO_LEGACY.get(normalized_result, Respuesta.Resultado.NOT_APPLICABLE),
            final_result=item.final_result,
            source=source,
            validation_status=Respuesta.ValidationStatus.NEEDS_REVIEW if needs_review else Respuesta.ValidationStatus.AUTO_ACCEPTED,
            confidence=confidence,
            notes=notes,
            raw_data=raw_data or {},
            is_final=not needs_review,
            tiempo_respuesta_ms=duration_ms,
        )

        advance_info = self.advance_after_item(evaluación, item)
        return item, advance_info

    def advance_after_item(self, evaluación: Evaluación, completed_item: EvaluacionItem) -> dict[str, Any]:
        area_finished_by_rule = self._has_three_consecutive_fails(evaluación, completed_item.area)
        next_catalog_item = None if area_finished_by_rule else item_catalog_service.next_item_in_area(
            completed_item.area,
            completed_item.item_id,
        )

        if next_catalog_item is None:
            next_area = item_catalog_service.get_next_area(completed_item.area)
            if next_area is None:
                self._finalizar_evaluacion(evaluación)
                return {
                    'area_finished': True,
                    'area_finished_by_rule': area_finished_by_rule,
                    'evaluation_finished': True,
                    'next_area': None,
                    'next_item_id': None,
                }

            evaluación.current_area = next_area
            evaluación.current_area_index = item_catalog_service.get_area_index(next_area)
            next_catalog_item = item_catalog_service.select_start_item(next_area, evaluación.edad_meses)
            if next_catalog_item is None:
                self._finalizar_evaluacion(evaluación)
                return {'evaluation_finished': True}

            next_item = self._activate_catalog_item(evaluación, next_catalog_item)
            return {
                'area_finished': True,
                'area_finished_by_rule': area_finished_by_rule,
                'evaluation_finished': False,
                'next_area': next_item.area,
                'next_item_id': next_item.item_id,
            }

        next_item = self._activate_catalog_item(evaluación, next_catalog_item)
        return {
            'area_finished': False,
            'area_finished_by_rule': False,
            'evaluation_finished': False,
            'next_area': next_item.area,
            'next_item_id': next_item.item_id,
        }

    def _finalizar_evaluacion(self, evaluación: Evaluación) -> None:
        """Move evaluación to PENDING_REVIEW and stamp completion time."""
        evaluación.estado = Evaluación.Estado.PENDING_REVIEW
        evaluación.completed_at = timezone.now()
        evaluación.current_item_id = None
        evaluación.save(update_fields=['estado', 'completed_at', 'current_item_id'])

    def _activate_catalog_item(self, evaluación: Evaluación, catalog_item: dict[str, Any]) -> EvaluacionItem:
        item, _ = EvaluacionItem.objects.get_or_create(
            evaluación=evaluación,
            item_id=catalog_item['id'],
            attempt_number=1,
            defaults={
                'area': catalog_item['area'],
                'orden': catalog_item.get('numero', 0),
                'modalidad': catalog_item.get('modalidad', EvaluacionItem.Modalidad.MANUAL_GUIADO),
                'pantalla_nino': catalog_item.get('pantalla_nino', 'INSTRUCCION_SIMPLE'),
                'requires_review': catalog_item.get('requiere_revision_psicologo', True),
            },
        )
        evaluación.current_area = item.area
        evaluación.current_area_index = item_catalog_service.get_area_index(item.area)
        evaluación.current_item_id = item.item_id
        evaluación.save(update_fields=['current_area', 'current_area_index', 'current_item_id'])
        return item

    def _has_three_consecutive_fails(self, evaluación: Evaluación, area: str) -> bool:
        recent = list(
            evaluación.items.filter(area=area)
            .exclude(system_result__isnull=True)
            .order_by('-orden', '-attempt_number')[:3]
        )
        return len(recent) == 3 and all(
            (item.final_result or item.system_result) == EvaluacionItem.Resultado.FAIL
            for item in recent
        )

    def _normalize_result(self, result: str) -> str:
        mapping = {
            'CORRECT': EvaluacionItem.Resultado.PASS,
            'PASS': EvaluacionItem.Resultado.PASS,
            'ERROR': EvaluacionItem.Resultado.FAIL,
            'FAIL': EvaluacionItem.Resultado.FAIL,
            'NOT_APPLICABLE': EvaluacionItem.Resultado.NOT_ADMINISTERED,
            'NOT_ADMINISTERED': EvaluacionItem.Resultado.NOT_ADMINISTERED,
            'INCONCLUSIVE': EvaluacionItem.Resultado.INCONCLUSIVE,
        }
        return mapping.get(str(result).upper(), EvaluacionItem.Resultado.INCONCLUSIVE)

    def _to_float(self, value):
        if value in [None, '']:
            return None
        try:
            return float(value)
        except (TypeError, ValueError):
            return None

    def _to_int(self, value):
        if value in [None, '']:
            return None
        try:
            return int(value)
        except (TypeError, ValueError):
            return None

    def _effective_evidence_types(self, item_id: str, catalog_item: dict[str, Any]) -> list[str]:
        policy = EvidencePolicy.objects.filter(item_id=item_id, enabled=True).first()
        if policy and policy.evidence_types:
            return policy.evidence_types
        return catalog_item.get('tipos_evidencia', ['LOG'])

    def _interaction_type(self, catalog_item: dict[str, Any]) -> str:
        evidence_types = set(catalog_item.get('tipos_evidencia', []))
        if 'VIDEO' in evidence_types:
            return 'visual'
        if 'AUDIO' in evidence_types:
            return 'audio'
        if catalog_item.get('pantalla_nino') == 'ACTIVIDAD':
            return 'mixed'
        return 'text'


dayc2_flow_service = Dayc2FlowService()

"""Durable W3C-PROV-equivalent lineage for DAYC-2 evaluation artifacts."""

from __future__ import annotations

from collections import deque
from django.db import transaction
from django.utils import timezone

from src.application.services.operation_context import current_operation_id
from src.api.evaluaciones.models import (
    ProvenanceActivity,
    ProvenanceAgent,
    ProvenanceEntity,
    ProvenanceRelation,
)


class ProvenanceService:
    schema_version = "1.0"

    def agent(self, evaluation, identifier, kind, label=None):
        return ProvenanceAgent.objects.get_or_create(
            evaluation=evaluation,
            identifier=str(identifier),
            kind=kind,
            defaults={"label": label or str(identifier)},
        )[0]

    def entity(
        self, evaluation, resource_type, resource_id, label=None, attributes=None
    ):
        latest = (
            ProvenanceEntity.objects.filter(
                evaluation=evaluation,
                resource_type=resource_type,
                resource_id=str(resource_id),
            )
            .order_by("-version")
            .first()
        )
        if latest:
            return latest
        return ProvenanceEntity.objects.create(
            evaluation=evaluation,
            resource_type=resource_type,
            resource_id=str(resource_id),
            label=label or f"{resource_type}:{resource_id}",
            attributes=attributes or {},
        )

    def revised_entity(self, previous, attributes=None):
        current = ProvenanceEntity.objects.create(
            evaluation=previous.evaluation,
            resource_type=previous.resource_type,
            resource_id=previous.resource_id,
            version=previous.version + 1,
            label=previous.label,
            attributes=attributes or previous.attributes,
        )
        return current

    def activity(self, evaluation, activity_type, label=None, attributes=None):
        attributes = dict(attributes or {})
        operation_id = current_operation_id()
        if operation_id:
            attributes.setdefault("operation_id", operation_id)
        return ProvenanceActivity.objects.create(
            evaluation=evaluation,
            activity_type=activity_type,
            label=label or activity_type,
            attributes=attributes,
            ended_at=timezone.now(),
        )

    def relate(
        self,
        evaluation,
        relation_type,
        *,
        source=None,
        target=None,
        activity=None,
        agent=None,
    ):
        return ProvenanceRelation.objects.create(
            evaluation=evaluation,
            relation_type=relation_type,
            source_entity=source,
            target_entity=target,
            activity=activity,
            agent=agent,
        )

    @transaction.atomic
    def record(
        self, evaluation, activity_type, outputs, inputs=(), actor=None, actor_kind=None
    ):
        """Record a process and its standard generated/used/attribution edges.

        Outputs and inputs are ``(type, id, label, attributes)`` tuples.
        """
        activity = self.activity(evaluation, activity_type)
        agent = None
        if actor:
            agent = self.agent(
                evaluation,
                actor,
                actor_kind or ProvenanceAgent.Kind.SOFTWARE,
            )
            self.relate(
                evaluation,
                ProvenanceRelation.Type.ASSOCIATED_WITH,
                activity=activity,
                agent=agent,
            )
        input_entities = []
        for resource_type, resource_id, label, attributes in inputs:
            entity = self.entity(
                evaluation, resource_type, resource_id, label, attributes
            )
            input_entities.append(entity)
            self.relate(
                evaluation,
                ProvenanceRelation.Type.USED,
                source=entity,
                activity=activity,
            )
        output_entities = []
        for resource_type, resource_id, label, attributes in outputs:
            entity = self.entity(
                evaluation, resource_type, resource_id, label, attributes
            )
            output_entities.append(entity)
            self.relate(
                evaluation,
                ProvenanceRelation.Type.GENERATED_BY,
                source=entity,
                activity=activity,
            )
            if agent:
                self.relate(
                    evaluation,
                    ProvenanceRelation.Type.ATTRIBUTED_TO,
                    source=entity,
                    agent=agent,
                )
            for input_entity in input_entities:
                self.relate(
                    evaluation,
                    ProvenanceRelation.Type.DERIVED_FROM,
                    source=entity,
                    target=input_entity,
                )
        return activity, output_entities

    def record_revision(self, entity, activity_type, actor, attributes=None):
        activity = self.activity(entity.evaluation, activity_type)
        updated = self.revised_entity(entity, attributes)
        agent = self.agent(entity.evaluation, actor, ProvenanceAgent.Kind.PERSON)
        self.relate(
            entity.evaluation,
            ProvenanceRelation.Type.GENERATED_BY,
            source=updated,
            activity=activity,
        )
        self.relate(
            entity.evaluation,
            ProvenanceRelation.Type.REVISION_OF,
            source=updated,
            target=entity,
        )
        self.relate(
            entity.evaluation,
            ProvenanceRelation.Type.INVALIDATED_BY,
            source=entity,
            activity=activity,
        )
        self.relate(
            entity.evaluation,
            ProvenanceRelation.Type.ATTRIBUTED_TO,
            source=updated,
            agent=agent,
        )
        self.relate(
            entity.evaluation,
            ProvenanceRelation.Type.ASSOCIATED_WITH,
            activity=activity,
            agent=agent,
        )
        return updated

    def graph(self, evaluation, entity_id=None, direction="both", depth=3):
        relations = ProvenanceRelation.objects.filter(
            evaluation=evaluation
        ).select_related("source_entity", "target_entity", "activity", "agent")
        if entity_id is None:
            relations = relations.order_by("created_at")
        else:
            visited = {str(entity_id)}
            queue = deque([(str(entity_id), 0)])
            relation_ids = set()
            while queue:
                current, level = queue.popleft()
                if level >= min(max(int(depth), 0), 20):
                    continue
                query = relations.filter(source_entity_id=current)
                if direction == "both":
                    query = query | relations.filter(target_entity_id=current)
                elif direction == "upstream":
                    query = relations.filter(source_entity_id=current)
                for relation in query:
                    relation_ids.add(relation.id)
                    for node in (relation.source_entity_id, relation.target_entity_id):
                        if node and str(node) not in visited:
                            visited.add(str(node))
                            queue.append((str(node), level + 1))
            relations = relations.filter(id__in=relation_ids).order_by("created_at")
        relation_data = [self._relation_dict(relation) for relation in relations]
        entity_ids = {
            node_id
            for relation in relation_data
            for node_id in (relation["source_entity_id"], relation["target_entity_id"])
            if node_id
        }
        entities = ProvenanceEntity.objects.filter(id__in=entity_ids)
        return {
            "schema_version": self.schema_version,
            "entities": [self._entity_dict(entity) for entity in entities],
            "activities": [
                self._activity_dict(activity)
                for activity in evaluation.provenance_activities.all()
            ],
            "agents": [
                self._agent_dict(agent) for agent in evaluation.provenance_agents.all()
            ],
            "relations": relation_data,
        }

    def uses_for_evidence(self, evidence):
        entity = self.entity(evidence.evaluación, "Evidence", evidence.id)
        return self.graph(evidence.evaluación, entity.id, "both", 20)

    def sources_for_result(self, result):
        entity = self.entity(result.evaluación, "ScoreResult", result.id)
        return self.graph(result.evaluación, entity.id, "upstream", 20)

    def detect_issues(self, evaluation):
        issues = []
        entities = ProvenanceEntity.objects.filter(evaluation=evaluation)
        relations = ProvenanceRelation.objects.filter(evaluation=evaluation)
        for entity in entities:
            generated = relations.filter(
                relation_type=ProvenanceRelation.Type.GENERATED_BY, source_entity=entity
            ).exists()
            used = relations.filter(
                relation_type=ProvenanceRelation.Type.USED, source_entity=entity
            ).exists()
            # A used-only entity is an external source/root, not a broken node.
            if not generated and not used:
                issues.append(
                    {"code": "MISSING_GENERATION", "entity_id": str(entity.id)}
                )
        for relation in relations.select_related("source_entity", "target_entity"):
            if (
                relation.source_entity_id
                and relation.source_entity.evaluation_id != evaluation.id
            ):
                issues.append(
                    {"code": "INCOMPATIBLE_EVALUATION", "relation_id": str(relation.id)}
                )
            if (
                relation.target_entity_id
                and relation.target_entity.evaluation_id != evaluation.id
            ):
                issues.append(
                    {"code": "INCOMPATIBLE_EVALUATION", "relation_id": str(relation.id)}
                )
        return issues

    @staticmethod
    def _entity_dict(entity):
        return {
            "id": str(entity.id),
            "resource_type": entity.resource_type,
            "resource_id": entity.resource_id,
            "version": entity.version,
            "label": entity.label,
            "attributes": entity.attributes,
        }

    @staticmethod
    def _activity_dict(activity):
        return {
            "id": str(activity.id),
            "type": activity.activity_type,
            "label": activity.label,
            "started_at": activity.started_at.isoformat(),
            "ended_at": activity.ended_at.isoformat() if activity.ended_at else None,
            "attributes": activity.attributes,
        }

    @staticmethod
    def _agent_dict(agent):
        return {
            "id": str(agent.id),
            "identifier": agent.identifier,
            "kind": agent.kind,
            "label": agent.label,
            "metadata": agent.metadata,
        }

    @staticmethod
    def _relation_dict(relation):
        return {
            "id": str(relation.id),
            "type": relation.relation_type,
            "source_entity_id": (
                str(relation.source_entity_id) if relation.source_entity_id else None
            ),
            "target_entity_id": (
                str(relation.target_entity_id) if relation.target_entity_id else None
            ),
            "activity_id": str(relation.activity_id) if relation.activity_id else None,
            "agent_id": str(relation.agent_id) if relation.agent_id else None,
        }


provenance_service = ProvenanceService()

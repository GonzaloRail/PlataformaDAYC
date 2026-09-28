import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0021_evidence_multimodal_integrity")]

    operations = [
        migrations.CreateModel(
            name="ProvenanceActivity",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("activity_type", models.CharField(max_length=80)),
                ("label", models.CharField(max_length=200)),
                ("started_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("ended_at", models.DateTimeField(blank=True, null=True)),
                ("attributes", models.JSONField(blank=True, default=dict)),
                (
                    "evaluation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="provenance_activities",
                        to="evaluaciones.evaluación",
                    ),
                ),
            ],
            options={
                "db_table": "provenance_activities",
                "ordering": ["started_at", "id"],
            },
        ),
        migrations.CreateModel(
            name="ProvenanceAgent",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("identifier", models.CharField(max_length=160)),
                (
                    "kind",
                    models.CharField(
                        choices=[
                            ("PERSON", "Persona"),
                            ("DEVICE", "Dispositivo"),
                            ("SOFTWARE", "Software"),
                            ("ORGANIZATION", "Organización"),
                        ],
                        max_length=20,
                    ),
                ),
                ("label", models.CharField(max_length=200)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "evaluation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="provenance_agents",
                        to="evaluaciones.evaluación",
                    ),
                ),
            ],
            options={"db_table": "provenance_agents"},
        ),
        migrations.CreateModel(
            name="ProvenanceEntity",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("resource_type", models.CharField(max_length=80)),
                ("resource_id", models.CharField(max_length=128)),
                ("version", models.PositiveIntegerField(default=1)),
                ("label", models.CharField(max_length=200)),
                ("attributes", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "evaluation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="provenance_entities",
                        to="evaluaciones.evaluación",
                    ),
                ),
            ],
            options={
                "db_table": "provenance_entities",
                "ordering": ["resource_type", "resource_id", "version"],
            },
        ),
        migrations.CreateModel(
            name="ProvenanceRelation",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "relation_type",
                    models.CharField(
                        choices=[
                            ("generatedBy", "Generada por"),
                            ("derivedFrom", "Derivada de"),
                            ("attributedTo", "Atribuida a"),
                            ("used", "Usada"),
                            ("associatedWith", "Asociada con"),
                            ("invalidatedBy", "Invalidada por"),
                            ("revisionOf", "Revisión de"),
                        ],
                        max_length=20,
                    ),
                ),
                ("attributes", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "activity",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="relations",
                        to="evaluaciones.provenanceactivity",
                    ),
                ),
                (
                    "agent",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="relations",
                        to="evaluaciones.provenanceagent",
                    ),
                ),
                (
                    "evaluation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="provenance_relations",
                        to="evaluaciones.evaluación",
                    ),
                ),
                (
                    "source_entity",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="outgoing_provenance_relations",
                        to="evaluaciones.provenanceentity",
                    ),
                ),
                (
                    "target_entity",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="incoming_provenance_relations",
                        to="evaluaciones.provenanceentity",
                    ),
                ),
            ],
            options={"db_table": "provenance_relations"},
        ),
        migrations.AddConstraint(
            model_name="provenanceagent",
            constraint=models.UniqueConstraint(
                fields=("evaluation", "identifier", "kind"),
                name="unique_provenance_agent",
            ),
        ),
        migrations.AddConstraint(
            model_name="provenanceentity",
            constraint=models.UniqueConstraint(
                fields=("evaluation", "resource_type", "resource_id", "version"),
                name="unique_provenance_entity_version",
            ),
        ),
        migrations.AddIndex(
            model_name="provenanceactivity",
            index=models.Index(
                fields=["evaluation", "activity_type", "started_at"],
                name="provenance__evaluat_2f2f95_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="provenanceentity",
            index=models.Index(
                fields=["evaluation", "resource_type", "resource_id"],
                name="provenance__evaluat_6ff422_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="provenancerelation",
            index=models.Index(
                fields=["evaluation", "relation_type"],
                name="provenance__evaluat_b7858a_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="provenancerelation",
            index=models.Index(
                fields=["source_entity", "relation_type"],
                name="provenance__source__934e61_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="provenancerelation",
            index=models.Index(
                fields=["target_entity", "relation_type"],
                name="provenance__target__d81b2f_idx",
            ),
        ),
    ]

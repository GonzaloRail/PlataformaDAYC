import django.db.models.deletion
import uuid

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0023_versioned_review_closure_reports")]

    operations = [
        migrations.CreateModel(
            name="TelemetryEvent",
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
                    "kind",
                    models.CharField(
                        choices=[
                            ("DUPLICATE", "Duplicada"),
                            ("CONFLICT", "Conflicto"),
                            ("ERROR", "Error"),
                            ("OUTBOX_RETRY", "Reintento de outbox"),
                            ("OUTBOX_PUBLISHED", "Outbox publicada"),
                            ("OUTBOX_RECOVERED", "Outbox recuperada"),
                        ],
                        max_length=30,
                    ),
                ),
                ("attributes", models.JSONField(blank=True, default=dict)),
                (
                    "occurred_at",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                (
                    "evaluación",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="telemetry_events",
                        to="evaluaciones.evaluación",
                    ),
                ),
                (
                    "operation",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="telemetry_events",
                        to="evaluaciones.distributedoperation",
                    ),
                ),
            ],
            options={"db_table": "evaluation_telemetry_events"},
        ),
        migrations.AddIndex(
            model_name="telemetryevent",
            index=models.Index(
                fields=["kind", "occurred_at"], name="evaluation__kind_fca2ac_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="telemetryevent",
            index=models.Index(
                fields=["evaluación", "occurred_at"],
                name="evaluation__evaluac_8a55a2_idx",
            ),
        ),
    ]

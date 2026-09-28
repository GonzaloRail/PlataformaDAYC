import uuid

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0016_assent_checkpoints_pause_records")]

    operations = [
        migrations.CreateModel(
            name="DistributedOperation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("operation_id", models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ("actor_role", models.CharField(max_length=20)),
                ("actor_id", models.CharField(blank=True, max_length=128)),
                ("device_id", models.CharField(blank=True, max_length=128)),
                ("device_sequence", models.PositiveBigIntegerField(blank=True, null=True)),
                ("aggregate_type", models.CharField(max_length=80)),
                ("aggregate_id", models.CharField(max_length=128)),
                ("operation_type", models.CharField(max_length=80)),
                ("schema_version", models.PositiveSmallIntegerField(default=1)),
                ("base_version", models.PositiveBigIntegerField(blank=True, null=True)),
                ("occurred_at", models.DateTimeField(blank=True, null=True)),
                ("payload", models.JSONField(default=dict)),
                ("status", models.CharField(choices=[("RECEIVED", "Recibida"), ("APPLIED", "Aplicada"), ("DUPLICATE", "Duplicada"), ("CONFLICT", "Conflicto"), ("REJECTED", "Rechazada"), ("QUARANTINED", "En cuarentena")], default="RECEIVED", max_length=20)),
                ("result", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("applied_at", models.DateTimeField(blank=True, null=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="distributed_operations", to="evaluaciones.evaluación")),
            ],
            options={"db_table": "distributed_operations"},
        ),
        migrations.CreateModel(
            name="OutboxEvent",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("event_type", models.CharField(max_length=80)),
                ("payload", models.JSONField(default=dict)),
                ("publish_attempts", models.PositiveIntegerField(default=0)),
                ("next_attempt_at", models.DateTimeField(blank=True, null=True)),
                ("published_at", models.DateTimeField(blank=True, null=True)),
                ("last_error", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="outbox_events", to="evaluaciones.evaluación")),
                ("operation", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="outbox_events", to="evaluaciones.distributedoperation")),
            ],
            options={"db_table": "evaluation_outbox_events"},
        ),
        migrations.AddIndex(model_name="distributedoperation", index=models.Index(fields=["evaluación", "created_at"], name="distribut_evaluac_3f7591_idx")),
        migrations.AddIndex(model_name="distributedoperation", index=models.Index(fields=["evaluación", "device_id", "device_sequence"], name="distribut_evaluac_6f4c20_idx")),
        migrations.AddIndex(model_name="distributedoperation", index=models.Index(fields=["evaluación", "status"], name="distribut_evaluac_d01c5b_idx")),
        migrations.AddIndex(model_name="outboxevent", index=models.Index(fields=["published_at", "next_attempt_at"], name="evaluatio_publish_06065c_idx")),
        migrations.AddIndex(model_name="outboxevent", index=models.Index(fields=["evaluación", "created_at"], name="evaluatio_evaluac_28f3dc_idx")),
    ]

import hashlib
import json

import django.db.models.deletion
from django.db import migrations, models
import django.utils.timezone
import src.api.evaluaciones.models
from src.api.evaluaciones.storage import private_evidence_storage


def populate_audit_hashes(apps, schema_editor):
    Audit = apps.get_model("evaluaciones", "EvidenceAccessAudit")
    for evidence_id in Audit.objects.values_list("evidencia_id", flat=True).distinct():
        previous_hash = ""
        for audit in Audit.objects.filter(evidencia_id=evidence_id).order_by("id"):
            payload = {
                "evidencia_id": str(evidence_id),
                "action": audit.action,
                "actor": audit.actor,
                "actor_id": audit.actor_id,
                "ip_address": str(audit.ip_address or ""),
                "created_at": audit.created_at.isoformat(),
                "previous_hash": previous_hash,
            }
            event_hash = hashlib.sha256(
                json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()
            ).hexdigest()
            Audit.objects.filter(pk=audit.pk).update(
                previous_hash=previous_hash, event_hash=event_hash
            )
            previous_hash = event_hash


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0020_distributed_operation_device_sequence")]

    operations = [
        migrations.AddField(
            model_name="evidencia",
            name="absence_reason",
            field=models.CharField(default="NOT_APPLICABLE", max_length=160),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_actor",
            field=models.CharField(default="UNKNOWN", max_length=80),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_authorization",
            field=models.CharField(default="UNKNOWN", max_length=160),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_custodian",
            field=models.CharField(default="UNKNOWN", max_length=160),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_item",
            field=models.CharField(default="UNKNOWN", max_length=80),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_quality",
            field=models.CharField(default="UNSPECIFIED", max_length=40),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_session",
            field=models.CharField(default="UNKNOWN", max_length=128),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="capture_task",
            field=models.CharField(default="UNKNOWN", max_length=128),
        ),
        migrations.AddField(
            model_name="evidenceaccessaudit",
            name="event_hash",
            field=models.CharField(max_length=64, null=True),
        ),
        migrations.AddField(
            model_name="evidenceaccessaudit",
            name="previous_hash",
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AlterField(
            model_name="evidenceaccessaudit",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.CreateModel(
            name="EvidenceAsset",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("kind", models.CharField(choices=[("ORIGINAL", "Original"), ("DERIVED", "Derivado")], max_length=10)),
                ("file", models.FileField(storage=private_evidence_storage, upload_to=src.api.evaluaciones.models.evidencia_upload_path)),
                ("sha256", models.CharField(max_length=64)),
                ("size_bytes", models.PositiveBigIntegerField()),
                ("media_type", models.CharField(max_length=100)),
                ("signature_type", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ("evidencia", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="assets", to="evaluaciones.evidencia")),
                ("parent_asset", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name="derived_assets", to="evaluaciones.evidenceasset")),
            ],
            options={"db_table": "evidence_assets"},
        ),
        migrations.RunPython(populate_audit_hashes, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="evidenceaccessaudit",
            name="event_hash",
            field=models.CharField(max_length=64, unique=True),
        ),
        migrations.AddConstraint(
            model_name="evidenceasset",
            constraint=models.UniqueConstraint(condition=models.Q(("kind", "ORIGINAL")), fields=("evidencia", "kind"), name="one_original_asset_per_evidence"),
        ),
    ]

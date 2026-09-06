from django.db import migrations, models
import django.db.models.deletion
import src.api.evaluaciones.models
from src.api.evaluaciones.storage import private_evidence_storage


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0006_distributed_sync_contract")]

    operations = [
        migrations.AddField(
            model_name="evidencia",
            name="retention_expires_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="evidencia",
            name="file",
            field=models.FileField(
                blank=True,
                null=True,
                storage=private_evidence_storage,
                upload_to=src.api.evaluaciones.models.evidencia_upload_path,
            ),
        ),
        migrations.CreateModel(
            name="EvidenceAccessAudit",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("action", models.CharField(max_length=30)),
                ("actor", models.CharField(max_length=40)),
                ("actor_id", models.CharField(blank=True, max_length=64)),
                ("ip_address", models.GenericIPAddressField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "evidencia",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="access_audits",
                        to="evaluaciones.evidencia",
                    ),
                ),
            ],
            options={"db_table": "evidence_access_audits"},
        ),
        migrations.AddIndex(
            model_name="evidenceaccessaudit",
            index=models.Index(
                fields=["evidencia", "action", "created_at"],
                name="evidence_ac_evidenc_c7c8f7_idx",
            ),
        ),
    ]

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0007_private_evidence_audit")]

    operations = [
        migrations.CreateModel(
            name="SessionAccessToken",
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
                ("token_hash", models.CharField(max_length=64, unique=True)),
                ("expires_at", models.DateTimeField()),
                ("revoked_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "evaluación",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="access_tokens",
                        to="evaluaciones.evaluación",
                    ),
                ),
            ],
            options={"db_table": "evaluation_access_tokens"},
        ),
        migrations.AddIndex(
            model_name="sessionaccesstoken",
            index=models.Index(
                fields=["evaluación", "expires_at"],
                name="evaluation__evaluac_a9d0cd_idx",
            ),
        ),
    ]

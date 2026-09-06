from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("evaluaciones", "0005_resultadoarea_percentil_string"),
    ]

    operations = [
        migrations.AddField(
            model_name="evaluación",
            name="version",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="evidencia",
            name="idempotency_key",
            field=models.UUIDField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="respuesta",
            name="idempotency_key",
            field=models.UUIDField(blank=True, null=True),
        ),
        migrations.AddConstraint(
            model_name="evidencia",
            constraint=models.UniqueConstraint(
                fields=("evaluación", "idempotency_key"),
                name="unique_evidence_idempotency_key",
            ),
        ),
        migrations.AddConstraint(
            model_name="respuesta",
            constraint=models.UniqueConstraint(
                fields=("evaluación", "idempotency_key"),
                name="unique_response_idempotency_key",
            ),
        ),
    ]

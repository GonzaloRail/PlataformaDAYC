from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0012_assentrecord_withdrawalrecord")]
    operations = [
        migrations.CreateModel(
            name="ConsentRecord",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("accepted", models.BooleanField()),
                ("modalities", models.JSONField(default=dict)),
                ("consent_text_version", models.CharField(max_length=20)),
                ("recorded_by_role", models.CharField(max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="consent_records", to="evaluaciones.evaluación")),
            ],
            options={"db_table": "consent_records", "ordering": ["created_at"]},
        ),
        migrations.AddField(model_name="withdrawalrecord", name="modalities", field=models.JSONField(default=list)),
    ]

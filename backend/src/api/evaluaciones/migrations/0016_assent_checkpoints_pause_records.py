from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0015_evaluacion_professional")]

    operations = [
        migrations.AddField(
            model_name="assentrecord",
            name="checkpoint",
            field=models.CharField(default="INITIAL", max_length=80),
        ),
        migrations.AlterField(
            model_name="assentrecord",
            name="decision",
            field=models.CharField(
                choices=[
                    ("ACCEPTED", "Aceptado"),
                    ("UNCERTAIN", "Duda"),
                    ("DECLINED", "Rechazado"),
                    ("WITHDRAWN", "Retirado"),
                ],
                max_length=10,
            ),
        ),
        migrations.CreateModel(
            name="PauseRecord",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("action", models.CharField(choices=[("PAUSED", "Pausada"), ("RESUMED", "Reanudada")], max_length=10)),
                ("reason", models.TextField(blank=True)),
                ("recorded_by_role", models.CharField(max_length=20)),
                ("device_id", models.CharField(blank=True, max_length=128)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="pause_records", to="evaluaciones.evaluación")),
            ],
            options={"db_table": "pause_records", "ordering": ["created_at"]},
        ),
    ]

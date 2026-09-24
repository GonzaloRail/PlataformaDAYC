from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [("evaluaciones", "0011_alter_evaluación_estado")]

    operations = [
        migrations.CreateModel(
            name="AssentRecord",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("decision", models.CharField(choices=[("ACCEPTED", "Aceptado"), ("DECLINED", "Rechazado")], max_length=10)),
                ("recorded_by_role", models.CharField(max_length=20)),
                ("note", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="assent_records", to="evaluaciones.evaluación")),
            ],
            options={"db_table": "assent_records", "ordering": ["created_at"]},
        ),
        migrations.CreateModel(
            name="WithdrawalRecord",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("scope", models.CharField(default="FULL", max_length=20)),
                ("reason", models.TextField(blank=True)),
                ("recorded_by_role", models.CharField(max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="withdrawal_records", to="evaluaciones.evaluación")),
            ],
            options={"db_table": "withdrawal_records"},
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("evaluaciones", "0010_session_invitations")]

    operations = [
        migrations.AlterField(
            model_name="evaluación",
            name="estado",
            field=models.CharField(
                choices=[
                    ("INITIATED", "Iniciada"),
                    ("IN_PROGRESS", "En Progreso"),
                    ("COMPLETED", "Completada"),
                    ("STOPPED", "Detenida"),
                    ("ARCHIVED", "Archivada"),
                    ("WAITING_CHILD_DATA", "Esperando datos del niño"),
                    ("WAITING_CONSENT", "Esperando consentimiento"),
                    ("PENDING_REVIEW", "Pendiente de revisión"),
                    ("REVIEW_IN_PROGRESS", "Revisión en progreso"),
                    ("PAUSED", "En pausa"),
                    ("VALIDATED", "Validada"),
                    ("CANCELLED", "Cancelada"),
                ],
                default="INITIATED",
                max_length=20,
            ),
        )
    ]

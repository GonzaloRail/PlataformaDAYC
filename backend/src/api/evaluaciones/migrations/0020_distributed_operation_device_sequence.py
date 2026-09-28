from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("evaluaciones", "0019_outbox_event_quarantine"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="distributedoperation",
            constraint=models.UniqueConstraint(
                condition=models.Q(device_sequence__isnull=False),
                fields=("evaluación", "device_id", "device_sequence"),
                name="unique_evaluation_device_sequence",
            ),
        ),
    ]

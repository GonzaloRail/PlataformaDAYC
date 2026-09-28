from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("evaluaciones", "0018_distributed_operation_response_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="outboxevent",
            name="quarantined_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

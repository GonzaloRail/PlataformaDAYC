from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("evaluaciones", "0017_distributed_operation_outbox"),
    ]

    operations = [
        migrations.AddField(
            model_name="distributedoperation",
            name="response_status",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]

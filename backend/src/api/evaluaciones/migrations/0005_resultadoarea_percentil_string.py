# Generated for scoring refactor: percentil now string, add interpretacion field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("evaluaciones", "0004_evidencepolicy"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resultadoárea",
            name="percentil",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="resultadoárea",
            name="interpretación",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0013_consentrecord_withdrawalrecord_modalities")]
    operations = [
        migrations.AddField(model_name="consentimiento", name="consent_text_hash", field=models.CharField(blank=True, max_length=64)),
        migrations.AddField(model_name="consentrecord", name="consent_text_hash", field=models.CharField(default="", max_length=64)),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("evaluaciones", "0008_session_access_tokens")]

    operations = [
        migrations.AddField(
            model_name="sessionaccesstoken",
            name="actor_role",
            field=models.CharField(
                blank=True,
                choices=[("CHILD", "Niño"), ("ADULT", "Adulto")],
                max_length=10,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="sessionaccesstoken",
            name="device_id",
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name="interactionevent",
            name="actor_role",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name="interactionevent",
            name="device_id",
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddIndex(
            model_name="sessionaccesstoken",
            index=models.Index(
                fields=["evaluación", "actor_role", "expires_at"],
                name="eval_token_role_exp_idx",
            ),
        ),
    ]

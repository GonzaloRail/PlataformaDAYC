from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("evaluaciones", "0009_actor_scoped_session_tokens"),
    ]

    operations = [
        migrations.CreateModel(
            name="SessionInvitation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("invitation_hash", models.CharField(max_length=64, unique=True)),
                (
                    "actor_role",
                    models.CharField(
                        choices=[("CHILD", "Niño"), ("ADULT", "Adulto")],
                        max_length=10,
                    ),
                ),
                ("expires_at", models.DateTimeField()),
                ("used_at", models.DateTimeField(blank=True, null=True)),
                ("revoked_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="issued_session_invitations",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "evaluación",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="invitations",
                        to="evaluaciones.evaluación",
                    ),
                ),
            ],
            options={"db_table": "evaluation_session_invitations"},
        ),
        migrations.AddIndex(
            model_name="sessioninvitation",
            index=models.Index(
                fields=["evaluación", "actor_role", "expires_at"],
                name="eval_inv_role_exp_idx",
            ),
        ),
    ]

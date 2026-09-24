from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("children", "0003_niño_psychologist"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProfessionalProfile",
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
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("PENDING", "Pendiente"),
                            ("APPROVED", "Aprobado"),
                            ("SUSPENDED", "Suspendido"),
                            ("REVOKED", "Revocado"),
                        ],
                        default="PENDING",
                        max_length=10,
                    ),
                ),
                ("approved_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="professional_profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "professional_profiles",
                "verbose_name": "Perfil profesional",
                "verbose_name_plural": "Perfiles profesionales",
            },
        ),
    ]

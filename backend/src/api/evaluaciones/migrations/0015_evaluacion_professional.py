from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def assign_professionals(apps, schema_editor):
    Evaluacion = apps.get_model("evaluaciones", "Evaluación")
    User = apps.get_model(*settings.AUTH_USER_MODEL.split("."))

    for evaluation in Evaluacion.objects.exclude(psychologist_id__isnull=True).exclude(
        psychologist_id=""
    ):
        try:
            user = User.objects.get(pk=evaluation.psychologist_id)
        except (User.DoesNotExist, ValueError):
            continue
        evaluation.professional_id = user.pk
        evaluation.save(update_fields=["professional"])


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("evaluaciones", "0014_consent_hashes"),
    ]

    operations = [
        migrations.AddField(
            model_name="evaluación",
            name="professional",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="professional_evaluations",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.RunPython(assign_professionals, migrations.RunPython.noop),
        migrations.AddIndex(
            model_name="evaluación",
            index=models.Index(fields=["professional", "created_at"], name="eval_prof_created_idx"),
        ),
    ]

import django.db.models.deletion
import src.api.evaluaciones.storage
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("evaluaciones", "0022_provenance_lineage"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProfessionalReviewAssignment",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("assigned_at", models.DateTimeField(auto_now_add=True)),
                ("received_at", models.DateTimeField(blank=True, null=True)),
                ("motive", models.TextField(blank=True)),
                ("active", models.BooleanField(default=True)),
                ("assigned_by", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="assigned_reviews", to=settings.AUTH_USER_MODEL)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="review_assignments", to="evaluaciones.evaluación")),
                ("professional", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="review_assignments", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "professional_review_assignments"},
        ),
        migrations.CreateModel(
            name="ItemReview",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("version", models.PositiveIntegerField()),
                ("final_result", models.CharField(choices=[("PASS", "Pasó"), ("FAIL", "No pasó"), ("INCONCLUSIVE", "Inconcluso"), ("NOT_ADMINISTERED", "No administrado")], max_length=30)),
                ("motive", models.TextField()),
                ("notes", models.TextField(blank=True)),
                ("reviewed_at", models.DateTimeField(auto_now_add=True)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="item_reviews", to="evaluaciones.evaluación")),
                ("evidence_consulted", models.ManyToManyField(blank=True, related_name="consulted_in_reviews", to="evaluaciones.evidencia")),
                ("item", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="review_versions", to="evaluaciones.evaluacionitem")),
                ("responsible", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="item_review_versions", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "item_review_versions", "ordering": ["item_id", "version"]},
        ),
        migrations.CreateModel(
            name="EvaluationClosure",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("closed_at", models.DateTimeField(auto_now_add=True)),
                ("motive", models.TextField()),
                ("lineage_checked_at", models.DateTimeField()),
                ("reopened_at", models.DateTimeField(blank=True, null=True)),
                ("reopening_motive", models.TextField(blank=True)),
                ("closed_by", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="closed_evaluations", to=settings.AUTH_USER_MODEL)),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="closures", to="evaluaciones.evaluación")),
                ("reopened_by", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name="reopened_evaluations", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "evaluation_closures"},
        ),
        migrations.CreateModel(
            name="VersionedReport",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("version", models.PositiveIntegerField()),
                ("generated_at", models.DateTimeField(auto_now_add=True)),
                ("evaluation_version", models.PositiveBigIntegerField()),
                ("snapshot", models.JSONField(default=dict)),
                ("file", models.FileField(storage=src.api.evaluaciones.storage.private_evidence_storage, upload_to="reports/%Y/%m/%d")),
                ("evaluación", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="versioned_reports", to="evaluaciones.evaluación")),
                ("generated_by", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="generated_reports", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "versioned_reports", "ordering": ["-version"]},
        ),
        migrations.AddConstraint(
            model_name="professionalreviewassignment",
            constraint=models.UniqueConstraint(condition=models.Q(("active", True)), fields=("evaluación", "professional"), name="unique_active_review_assignment"),
        ),
        migrations.AddConstraint(
            model_name="itemreview",
            constraint=models.UniqueConstraint(fields=("item", "version"), name="unique_item_review_version"),
        ),
        migrations.AddConstraint(
            model_name="versionedreport",
            constraint=models.UniqueConstraint(fields=("evaluación", "version"), name="unique_evaluation_report_version"),
        ),
    ]

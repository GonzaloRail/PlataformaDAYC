from django.core.management.base import BaseCommand, CommandError

from src.api.evaluaciones.models import EvidenceAsset
from src.api.evaluaciones.storage import private_evidence_storage
from src.application.services.evidence_backup_service import (
    EvidenceBackupError,
    backup_evidence_assets,
)


class Command(BaseCommand):
    help = "Crea un respaldo verificable de los activos de evidencia."

    def add_arguments(self, parser):
        parser.add_argument("--target", required=True)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        try:
            manifest = backup_evidence_assets(
                EvidenceAsset.objects.all(),
                options["target"],
                private_evidence_storage,
                dry_run=options["dry_run"],
            )
        except EvidenceBackupError as error:
            raise CommandError(str(error)) from error
        action = "Verificados" if options["dry_run"] else "Respaldados"
        self.stdout.write(
            self.style.SUCCESS(f"{action}: {len(manifest['assets'])} activos")
        )

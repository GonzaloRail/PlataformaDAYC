from django.core.management.base import BaseCommand, CommandError

from src.application.services.evidence_backup_service import (
    EvidenceBackupError,
    restore_evidence_assets,
)


class Command(BaseCommand):
    help = "Restaura un respaldo verificable de evidencia en un destino vacío."

    def add_arguments(self, parser):
        parser.add_argument("--source", required=True)
        parser.add_argument("--target", required=True)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        try:
            manifest = restore_evidence_assets(
                options["source"], options["target"], dry_run=options["dry_run"]
            )
        except EvidenceBackupError as error:
            raise CommandError(str(error)) from error
        action = "Verificados" if options["dry_run"] else "Restaurados"
        self.stdout.write(
            self.style.SUCCESS(f"{action}: {len(manifest['assets'])} activos")
        )

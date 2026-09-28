import json
from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone

from src.application.services.telemetry_service import telemetry_report


class Command(BaseCommand):
    help = "Emite métricas durables de operaciones, outbox y linaje en JSON."

    def add_arguments(self, parser):
        parser.add_argument("--since", help="Fecha ISO-8601 inclusiva")

    def handle(self, *args, **options):
        since = None
        if options["since"]:
            try:
                since = datetime.fromisoformat(options["since"])
            except ValueError as error:
                raise CommandError(
                    "--since debe ser una fecha ISO-8601 válida"
                ) from error
            if timezone.is_naive(since):
                since = timezone.make_aware(since)
        self.stdout.write(json.dumps(telemetry_report(since), sort_keys=True))

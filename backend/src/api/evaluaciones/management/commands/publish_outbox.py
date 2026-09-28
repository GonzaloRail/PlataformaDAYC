from django.core.management.base import BaseCommand

from src.application.services.outbox_service import publish_pending_outbox_events


class Command(BaseCommand):
    help = "Publica eventos pendientes de la outbox de evaluaciones."

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=100)

    def handle(self, *args, **options):
        published = publish_pending_outbox_events(limit=options["limit"])
        self.stdout.write(self.style.SUCCESS(f"Eventos publicados: {published}"))

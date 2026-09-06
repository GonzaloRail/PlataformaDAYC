from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Evidence is only served through the authorized download endpoint.
private_evidence_storage = FileSystemStorage(location=settings.PRIVATE_EVIDENCE_ROOT)

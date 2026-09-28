import hashlib
from pathlib import Path

from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Evidence is only served through the authorized download endpoint.
private_evidence_storage = FileSystemStorage(location=settings.PRIVATE_EVIDENCE_ROOT)


SIGNATURES = {
    "image/png": (b"\x89PNG\r\n\x1a\n",),
    "image/jpeg": (b"\xff\xd8\xff",),
    "image/gif": (b"GIF87a", b"GIF89a"),
    "image/webp": (b"RIFF",),
    "audio/wav": (b"RIFF",),
    "audio/ogg": (b"OggS",),
    "audio/flac": (b"fLaC",),
    "audio/mpeg": (b"ID3", b"\xff\xfb", b"\xff\xf3", b"\xff\xf2"),
}


def inspect_uploaded_evidence(uploaded_file, evidence_type):
    """Return server-derived file facts after validating its binary signature."""
    header = uploaded_file.read(32)
    uploaded_file.seek(0)
    is_riff = header.startswith(b"RIFF")
    is_mp4 = len(header) >= 12 and header[4:8] == b"ftyp"
    media_type = None
    if header.startswith(SIGNATURES["image/png"]):
        media_type = "image/png"
    elif header.startswith(SIGNATURES["image/jpeg"]):
        media_type = "image/jpeg"
    elif header.startswith(SIGNATURES["image/gif"]):
        media_type = "image/gif"
    elif is_riff and header[8:12] == b"WEBP":
        media_type = "image/webp"
    elif is_riff and header[8:12] == b"WAVE":
        media_type = "audio/wav"
    elif header.startswith(SIGNATURES["audio/ogg"]):
        media_type = "audio/ogg"
    elif header.startswith(SIGNATURES["audio/flac"]):
        media_type = "audio/flac"
    elif header.startswith(SIGNATURES["audio/mpeg"]):
        media_type = "audio/mpeg"
    elif is_mp4:
        media_type = "video/mp4"

    expected_prefix = {
        "SCREENSHOT": "image/",
        "CAMERA_FRAME": "image/",
        "AUDIO": "audio/",
        "VIDEO": "video/",
    }.get(evidence_type)
    if not media_type or (expected_prefix and not media_type.startswith(expected_prefix)):
        raise ValueError("La firma binaria no coincide con el tipo de evidencia")

    digest = hashlib.sha256()
    for chunk in uploaded_file.chunks():
        digest.update(chunk)
    uploaded_file.seek(0)
    return {
        "sha256": digest.hexdigest(),
        "size_bytes": uploaded_file.size,
        "media_type": media_type,
        "signature_type": media_type,
        "extension": Path(uploaded_file.name).suffix.lower()[:16],
    }

"""Portable, integrity-checked backups for immutable evidence assets."""

import hashlib
import json
import re
from pathlib import Path, PurePosixPath

from django.core.files import File
from django.core.files.storage import FileSystemStorage

MANIFEST_NAME = "manifest.json"
MANIFEST_FORMAT = "dayc-evidence-backup"
MANIFEST_VERSION = 1
SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")


class EvidenceBackupError(ValueError):
    """Raised when an evidence archive cannot be trusted or safely written."""


def _sha256_and_size(file_object):
    digest = hashlib.sha256()
    size = 0
    while chunk := file_object.read(64 * 1024):
        digest.update(chunk)
        size += len(chunk)
    return digest.hexdigest(), size


def _safe_storage_name(name):
    path = PurePosixPath(name)
    if not name or path.is_absolute() or ".." in path.parts:
        raise EvidenceBackupError("El nombre de archivo de evidencia no es seguro")
    return path.as_posix()


def _validate_target(target):
    target = Path(target)
    if target.exists() and not target.is_dir():
        raise EvidenceBackupError("El destino debe ser un directorio")
    if target.exists() and any(target.iterdir()):
        raise EvidenceBackupError(
            "El destino debe estar vacío para evitar sobrescrituras"
        )
    return target


def _asset_entry(asset, storage):
    storage_name = _safe_storage_name(asset.file.name)
    if not storage.exists(storage_name):
        raise EvidenceBackupError(f"Falta el archivo de evidencia: {storage_name}")
    with storage.open(storage_name, "rb") as file_object:
        sha256, size_bytes = _sha256_and_size(file_object)
    if sha256 != asset.sha256 or size_bytes != asset.size_bytes:
        raise EvidenceBackupError(
            f"La evidencia no coincide con su integridad: {storage_name}"
        )
    return {
        "id": str(asset.pk),
        "evidencia_id": str(asset.evidencia_id),
        "parent_asset_id": (
            str(asset.parent_asset_id) if asset.parent_asset_id else None
        ),
        "kind": asset.kind,
        "storage_name": storage_name,
        "archive_name": f"assets/{sha256}",
        "sha256": sha256,
        "size_bytes": size_bytes,
        "media_type": asset.media_type,
        "signature_type": asset.signature_type,
    }


def backup_evidence_assets(assets, target, storage, dry_run=False):
    """Copy assets into a deterministic manifest archive after rehashing each file."""
    target = _validate_target(target)
    entries = [_asset_entry(asset, storage) for asset in assets.order_by("pk")]
    manifest = {
        "format": MANIFEST_FORMAT,
        "version": MANIFEST_VERSION,
        "assets": entries,
    }
    if dry_run:
        return manifest

    target.mkdir(parents=True, exist_ok=True)
    for entry in entries:
        archive_path = target / entry["archive_name"]
        if archive_path.exists():
            continue
        archive_path.parent.mkdir(parents=True, exist_ok=True)
        with storage.open(entry["storage_name"], "rb") as source:
            archive_path.write_bytes(source.read())
    (target / MANIFEST_NAME).write_text(
        json.dumps(manifest, sort_keys=True, separators=(",", ":")), encoding="utf-8"
    )
    return manifest


def _load_manifest(source):
    manifest_path = Path(source) / MANIFEST_NAME
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise EvidenceBackupError(
            "No se pudo leer el manifiesto de respaldo"
        ) from error
    if (
        manifest.get("format") != MANIFEST_FORMAT
        or manifest.get("version") != MANIFEST_VERSION
        or not isinstance(manifest.get("assets"), list)
    ):
        raise EvidenceBackupError("El manifiesto de respaldo no es compatible")
    return manifest


def _validate_archive(source, entries):
    archive_files = {}
    for entry in entries:
        required = {"storage_name", "archive_name", "sha256", "size_bytes"}
        if not required.issubset(entry) or not SHA256_PATTERN.fullmatch(
            entry["sha256"]
        ):
            raise EvidenceBackupError("El manifiesto contiene un activo inválido")
        storage_name = _safe_storage_name(entry["storage_name"])
        archive_name = _safe_storage_name(entry["archive_name"])
        if archive_name != f"assets/{entry['sha256']}":
            raise EvidenceBackupError(
                "El nombre de archivo archivado no coincide con su SHA-256"
            )
        archive_path = Path(source) / archive_name
        if not archive_path.is_file():
            raise EvidenceBackupError(f"Falta el archivo archivado: {archive_name}")
        with archive_path.open("rb") as file_object:
            sha256, size_bytes = _sha256_and_size(file_object)
        if sha256 != entry["sha256"] or size_bytes != entry["size_bytes"]:
            raise EvidenceBackupError(
                f"El archivo archivado está dañado: {archive_name}"
            )
        archive_files[storage_name] = archive_path
    if len(archive_files) != len(entries):
        raise EvidenceBackupError(
            "El manifiesto contiene nombres de destino duplicados"
        )
    return archive_files


def restore_evidence_assets(source, target, dry_run=False):
    """Validate an archive completely, then restore its storage-relative files."""
    source = Path(source)
    target = _validate_target(target)
    if source.resolve() == target.resolve():
        raise EvidenceBackupError(
            "El origen y destino de restauración deben ser distintos"
        )
    manifest = _load_manifest(source)
    archive_files = _validate_archive(source, manifest["assets"])
    if dry_run:
        return manifest

    target.mkdir(parents=True, exist_ok=True)
    destination_storage = FileSystemStorage(location=target)
    for storage_name, archive_path in archive_files.items():
        with archive_path.open("rb") as source_file:
            saved_name = destination_storage.save(storage_name, File(source_file))
        if saved_name != storage_name:
            raise EvidenceBackupError(
                "El destino alteró un nombre de archivo de evidencia"
            )
    return manifest

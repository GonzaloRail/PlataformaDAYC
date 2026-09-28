from types import SimpleNamespace

import pytest
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

from src.application.services.evidence_backup_service import (
    EvidenceBackupError,
    MANIFEST_NAME,
    backup_evidence_assets,
    restore_evidence_assets,
)


class Assets(list):
    def order_by(self, *_args):
        return sorted(self, key=lambda asset: asset.pk)


def asset(pk, name, content):
    import hashlib

    return SimpleNamespace(
        pk=pk,
        evidencia_id=10,
        parent_asset_id=None,
        kind="ORIGINAL",
        file=SimpleNamespace(name=name),
        sha256=hashlib.sha256(content).hexdigest(),
        size_bytes=len(content),
        media_type="image/png",
        signature_type="image/png",
    )


def test_backup_and_restore_are_reproducible_and_preserve_storage_names(tmp_path):
    source_root = tmp_path / "source"
    source_storage = FileSystemStorage(location=source_root)
    content = b"evidence-content"
    source_storage.save("evidencias/session/image.png", ContentFile(content))
    assets = Assets([asset(1, "evidencias/session/image.png", content)])

    archive = tmp_path / "archive"
    manifest = backup_evidence_assets(assets, archive, source_storage)
    second_archive = tmp_path / "second-archive"
    backup_evidence_assets(assets, second_archive, source_storage)
    restored = tmp_path / "restored"
    restored_manifest = restore_evidence_assets(archive, restored)

    assert manifest == restored_manifest
    assert (archive / MANIFEST_NAME).read_text() == (
        second_archive / MANIFEST_NAME
    ).read_text()
    assert (restored / "evidencias/session/image.png").read_bytes() == content


def test_restore_rejects_a_corrupted_archive_before_writing_target(tmp_path):
    source_root = tmp_path / "source"
    source_storage = FileSystemStorage(location=source_root)
    content = b"evidence-content"
    source_storage.save("asset.png", ContentFile(content))
    archive = tmp_path / "archive"
    manifest = backup_evidence_assets(
        Assets([asset(1, "asset.png", content)]), archive, source_storage
    )
    (archive / manifest["assets"][0]["archive_name"]).write_bytes(b"corrupted")
    target = tmp_path / "target"

    with pytest.raises(EvidenceBackupError, match="dañado"):
        restore_evidence_assets(archive, target)

    assert not target.exists()


def test_backup_detects_missing_source_file(tmp_path):
    storage = FileSystemStorage(location=tmp_path / "source")

    with pytest.raises(EvidenceBackupError, match="Falta"):
        backup_evidence_assets(
            Assets([asset(1, "missing.png", b"missing")]), tmp_path / "archive", storage
        )


def test_restore_detects_missing_archive_file(tmp_path):
    source_storage = FileSystemStorage(location=tmp_path / "source")
    content = b"evidence-content"
    source_storage.save("asset.png", ContentFile(content))
    archive = tmp_path / "archive"
    manifest = backup_evidence_assets(
        Assets([asset(1, "asset.png", content)]), archive, source_storage
    )
    (archive / manifest["assets"][0]["archive_name"]).unlink()

    with pytest.raises(EvidenceBackupError, match="Falta"):
        restore_evidence_assets(archive, tmp_path / "restored")

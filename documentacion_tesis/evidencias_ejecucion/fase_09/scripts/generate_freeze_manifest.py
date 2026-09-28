#!/usr/bin/env python3
"""Create the Phase 9 freeze manifest; refuses a dirty Git worktree."""

from __future__ import annotations

import hashlib
import json
import platform
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


PHASE_DIR = Path(__file__).resolve().parents[1]
ROOT = PHASE_DIR.parents[2]
OUTPUT = PHASE_DIR / "manifest_congelacion_v2.json"
ARTIFACTS = (
    ".gitignore",
    "README.md",
    "protocolo_confirmatorio_v2.md",
    "corpus_sintetico_v1.json",
    "matriz_ejecucion_v2.csv",
    "oracle/__init__.py",
    "oracle/confirmatory_oracle.py",
    "scripts/generate_freeze_manifest.py",
    "scripts/run_confirmation.py",
    "../../../backend/tests/technical/harness.py",
    "../../../backend/tests/technical/test_reproducible_harness.py",
    "../../../backend/scripts/run_technical_harness.py",
    "../../../backend/scripts/lightweight_load.py",
)


def command(*args: str) -> str:
    return subprocess.check_output(args, cwd=ROOT, text=True).strip()


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    if command("git", "status", "--porcelain"):
        raise SystemExit("Refusing to freeze a dirty Git worktree.")
    artifacts = {}
    for relative in ARTIFACTS:
        path = (PHASE_DIR / relative).resolve()
        if not path.is_file():
            raise SystemExit(f"Missing artifact: {relative}")
        artifacts[relative] = digest(path)
    manifest = {
        "schema_version": "1.0.0",
        "protocol_version": "2.0.0",
        "created_at_utc": datetime.now(timezone.utc).isoformat(),
        "git_commit": command("git", "rev-parse", "HEAD"),
        "git_status": "clean",
        "python": sys.version,
        "platform": platform.platform(),
        "artifacts": artifacts,
    }
    OUTPUT.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Freeze manifest written: {OUTPUT}")


if __name__ == "__main__":
    main()

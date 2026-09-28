#!/usr/bin/env python3
"""Run the sealed Phase 9 matrix and collect immutable per-cell manifests."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import random
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


PHASE_DIR = Path(__file__).resolve().parents[1]
ROOT = PHASE_DIR.parents[2]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_rows() -> list[dict[str, str]]:
    with (PHASE_DIR / "matriz_ejecucion_v2.csv").open(encoding="utf-8", newline="") as stream:
        return list(csv.DictReader(stream))


def verify_freeze(manifest_path: Path) -> dict:
    freeze = json.loads(manifest_path.read_text(encoding="utf-8"))
    if subprocess.check_output(["git", "status", "--porcelain"], cwd=ROOT, text=True).strip():
        raise SystemExit("Refusing confirmation: Git worktree is not clean.")
    if subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip() != freeze["git_commit"]:
        raise SystemExit("Refusing confirmation: Git commit differs from freeze manifest.")
    for relative, expected_hash in freeze["artifacts"].items():
        path = (PHASE_DIR / relative).resolve()
        if not path.is_file() or sha256(path) != expected_hash:
            raise SystemExit(f"Refusing confirmation: frozen artifact changed: {relative}")
    return freeze


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--freeze-manifest", type=Path, required=True)
    parser.add_argument("--output-root", type=Path, default=PHASE_DIR / "resultados_confirmatorios")
    args = parser.parse_args()
    verify_freeze(args.freeze_manifest.resolve())
    corpus = json.loads((PHASE_DIR / "corpus_sintetico_v1.json").read_text(encoding="utf-8"))
    cells = []
    for row in load_rows():
        for load in row["loads"].split(";"):
            for repetition in range(1, int(row["repetitions"]) + 1):
                cells.append((row, int(load), repetition))
    random.Random(corpus["execution_seed"]).shuffle(cells)
    run_directory = args.output_root / datetime.now(timezone.utc).strftime("run-%Y%m%dT%H%M%SZ")
    run_directory.mkdir(parents=True, exist_ok=False)
    (run_directory / "run_manifest.json").write_text(json.dumps({"corpus_id": corpus["corpus_id"], "cell_count": len(cells)}, indent=2) + "\n", encoding="utf-8")
    for index, (row, load, repetition) in enumerate(cells):
        cell_directory = run_directory / "cells" / f"{index:03d}-{row['scenario']}-n{load}-r{repetition}"
        cell_directory.mkdir(parents=True)
        command = [sys.executable, "-m", "pytest", "tests/technical/test_reproducible_harness.py"]
        if row["pytest_selector"].startswith("test_"):
            command.extend(["-k", row["pytest_selector"]])
        environment = os.environ.copy()
        environment["DAYC_HARNESS_SESSIONS"] = str(load)
        started = datetime.now(timezone.utc)
        completed = subprocess.run(command, cwd=ROOT / "backend", env=environment, text=True, capture_output=True)
        stdout_path, stderr_path = cell_directory / "stdout.log", cell_directory / "stderr.log"
        stdout_path.write_text(completed.stdout, encoding="utf-8")
        stderr_path.write_text(completed.stderr, encoding="utf-8")
        manifest = {
            "scenario": row["scenario"], "load": load, "repetition": repetition,
            "seed": corpus["execution_seed"] + index, "selector": row["pytest_selector"],
            "command": command, "started_at_utc": started.isoformat(),
            "finished_at_utc": datetime.now(timezone.utc).isoformat(), "exit_code": completed.returncode,
            "stdout_sha256": sha256(stdout_path), "stderr_sha256": sha256(stderr_path),
        }
        (cell_directory / "manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    oracle = [sys.executable, str(PHASE_DIR / "oracle" / "confirmatory_oracle.py"), "--run-directory", str(run_directory), "--freeze-manifest", str(args.freeze_manifest.resolve())]
    completed = subprocess.run(oracle, cwd=ROOT, text=True)
    raise SystemExit(completed.returncode)


if __name__ == "__main__":
    main()

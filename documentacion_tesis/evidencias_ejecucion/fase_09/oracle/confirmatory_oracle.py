#!/usr/bin/env python3
"""Validate confirmation manifests without importing the system under test."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_matrix(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as stream:
        return list(csv.DictReader(stream))


def expected_cells(matrix: list[dict[str, str]]) -> set[tuple[str, int, int]]:
    cells = set()
    for row in matrix:
        for load in row["loads"].split(";"):
            for repetition in range(1, int(row["repetitions"]) + 1):
                cells.add((row["scenario"], int(load), repetition))
    return cells


def validate(run_directory: Path, freeze_manifest: Path) -> dict:
    freeze = json.loads(freeze_manifest.read_text(encoding="utf-8"))
    base = freeze_manifest.parent
    mismatches = []
    for relative, expected_hash in freeze["artifacts"].items():
        current = base / relative
        if not current.is_file() or sha256(current) != expected_hash:
            mismatches.append(relative)

    matrix_path = base / "matriz_ejecucion_v2.csv"
    expected = expected_cells(load_matrix(matrix_path))
    observations = []
    for path in sorted(run_directory.glob("cells/*/manifest.json")):
        observations.append(json.loads(path.read_text(encoding="utf-8")))

    seen = {(item["scenario"], item["load"], item["repetition"]) for item in observations}
    duplicates = len(seen) != len(observations)
    invalid = [
        {"cell": [item["scenario"], item["load"], item["repetition"]], "reason": "command_failed_or_artifact_missing"}
        for item in observations
        if item.get("exit_code") != 0 or not item.get("stdout_sha256") or not item.get("stderr_sha256")
    ]
    missing = sorted(expected - seen)
    unexpected = sorted(seen - expected)
    valid = not mismatches and not duplicates and not invalid and not missing and not unexpected
    return {
        "oracle_version": "1.0.0",
        "run_directory": str(run_directory),
        "expected_cells": len(expected),
        "observed_cells": len(observations),
        "artifact_hash_mismatches": mismatches,
        "duplicate_cells": duplicates,
        "missing_cells": missing,
        "unexpected_cells": unexpected,
        "invalid_cells": invalid,
        "verdict": "pass" if valid else "fail",
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-directory", type=Path, required=True)
    parser.add_argument("--freeze-manifest", type=Path, required=True)
    args = parser.parse_args()
    report = validate(args.run_directory, args.freeze_manifest)
    destination = args.run_directory / "oracle_report.json"
    destination.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Oracle verdict: {report['verdict']} ({destination})")
    if report["verdict"] != "pass":
        raise SystemExit(1)


if __name__ == "__main__":
    main()

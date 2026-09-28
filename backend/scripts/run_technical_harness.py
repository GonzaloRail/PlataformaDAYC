#!/usr/bin/env python3
"""Run Phase 8 technical scenarios and write a reproducible JSON manifest."""

import argparse
import json
import os
import platform
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from tests.technical.harness import scenario_manifest  # noqa: E402


def git_version():
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "HEAD"], cwd=ROOT.parent, text=True
        ).strip()
    except (OSError, subprocess.CalledProcessError):
        return "unavailable"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", type=int, default=20260927)
    parser.add_argument("--sessions", type=int, default=1, choices=(1, 10, 25, 50, 100))
    parser.add_argument("--result-dir", default="technical-results")
    args = parser.parse_args()

    environment = os.environ.copy()
    environment["DAYC_HARNESS_SESSIONS"] = str(args.sessions)
    command = [sys.executable, "-m", "pytest", "tests/technical", "-q"]
    started_at = datetime.now(timezone.utc).isoformat()
    completed = subprocess.run(
        command, cwd=ROOT, env=environment, text=True, capture_output=True
    )
    manifest = scenario_manifest(args.seed, args.sessions)
    manifest.update(
        {
            "started_at": started_at,
            "finished_at": datetime.now(timezone.utc).isoformat(),
            "version": git_version(),
            "environment": {"python": sys.version, "platform": platform.platform()},
            "command": command,
            "result": {
                "passed": completed.returncode == 0,
                "exit_code": completed.returncode,
                "stdout": completed.stdout,
                "stderr": completed.stderr,
            },
        }
    )
    result_dir = (ROOT / args.result_dir).resolve()
    result_dir.mkdir(parents=True, exist_ok=True)
    output = result_dir / f"phase8-{args.seed}-{args.sessions}.json"
    output.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(output)
    return completed.returncode


if __name__ == "__main__":
    raise SystemExit(main())

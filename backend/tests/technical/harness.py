"""Shared deterministic primitives for the Phase 8 technical harness.

The oracle intentionally does not import application services or models.  It
only implements the externally visible optimistic-version contract.
"""

from dataclasses import dataclass, field

HARNESS_VERSION = "1"


@dataclass
class VersionOracle:
    """Reference model for exactly-once operations over a versioned aggregate."""

    version: int
    applied: set[str] = field(default_factory=set)

    def submit(self, operation_id: str, base_version: int) -> str:
        if operation_id in self.applied:
            return "replay"
        if base_version != self.version:
            return "conflict"
        self.applied.add(operation_id)
        self.version += 1
        return "applied"

    def assert_observed(self, *, version: int, applied_ids: set[str]) -> None:
        assert version == self.version
        assert applied_ids == self.applied


def scenario_manifest(seed: int, sessions: int) -> dict:
    """Stable scenario declaration consumed by the runner and result manifest."""

    return {
        "harness_version": HARNESS_VERSION,
        "seed": seed,
        "config": {"sessions": sessions, "transport": "django-test-client"},
        "scenarios": [
            "normal",
            "delayed_offline",
            "reconnect",
            "replay",
            "reordering",
            "omission",
            "conflict",
            "restart",
            "storage_failure",
            "lightweight_load",
        ],
    }

import { evaluacionesApi } from '@/services/evaluacionesApi';
import {
  readOfflineCursor,
  readOfflineSnapshot,
  writeOfflineCursor,
  writeOfflineSnapshot,
  type OfflineOperationStorage,
} from '@/services/offlineOperationQueue';
import { reportOfflineTelemetry, type OfflineTelemetryReporter } from '@/services/offlineTelemetry';
import type { SessionState } from '@/types';

export interface StoredRecoverySnapshot {
  state: SessionState;
  stateHash: string;
}

export interface OfflineRecoveryOptions {
  storage: OfflineOperationStorage;
  sessionCode: string;
  sessionToken?: string;
  fetchState?: (sessionCode: string, sessionToken?: string) => Promise<SessionState>;
  now?: () => number;
  onTelemetry?: OfflineTelemetryReporter;
}

export interface OfflineRecoveryResult {
  state: SessionState;
  stateHash: string;
  cursor: string;
  previousCursor?: string;
  changed: boolean;
}

function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .reduce<Record<string, unknown>>((result, [key, entry]) => {
        result[key] = normalize(entry);
        return result;
      }, {});
  }
  return value;
}

export function normalizeState(state: unknown): string {
  return JSON.stringify(normalize(state));
}

export async function normalizedStateHash(state: unknown): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalizeState(state)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function recoverySnapshotId(sessionCode: string): string {
  return `session:${sessionCode}`;
}

export function recoveryCursorId(sessionCode: string): string {
  return `session:${sessionCode}`;
}

export function getStoredRecoverySnapshot(storage: OfflineOperationStorage, sessionCode: string) {
  return readOfflineSnapshot<StoredRecoverySnapshot>(storage, recoverySnapshotId(sessionCode));
}

export function getStoredRecoveryCursor(storage: OfflineOperationStorage, sessionCode: string) {
  return readOfflineCursor(storage, recoveryCursorId(sessionCode));
}

export async function recoverOfflineState({
  storage,
  sessionCode,
  sessionToken,
  fetchState = evaluacionesApi.sessionState,
  now = Date.now,
  onTelemetry = reportOfflineTelemetry,
}: OfflineRecoveryOptions): Promise<OfflineRecoveryResult> {
  const state = await fetchState(sessionCode, sessionToken);
  const stateHash = await normalizedStateHash(state);
  const snapshotId = recoverySnapshotId(sessionCode);
  const cursorId = recoveryCursorId(sessionCode);
  const [previous, previousCursor] = await Promise.all([
    readOfflineSnapshot<StoredRecoverySnapshot>(storage, snapshotId),
    readOfflineCursor(storage, cursorId),
  ]);
  const changed = Boolean(previous && previous.stateHash !== stateHash);
  const cursor = String(state.evaluacion.version ?? 0);
  const updatedAt = new Date(now()).toISOString();

  await Promise.all([
    writeOfflineSnapshot(storage, snapshotId, { state, stateHash }, updatedAt),
    writeOfflineCursor(storage, cursorId, cursor, updatedAt),
  ]);

  try {
    onTelemetry({
      name: 'offline.recovery.completed',
      attributes: { sessionCode, cursor, previousCursor, changed },
    });
  } catch {
    // Recovery is complete even when an optional telemetry integration fails.
  }

  return { state, stateHash, cursor, previousCursor, changed };
}

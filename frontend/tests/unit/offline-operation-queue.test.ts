import { describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/services/api';
import {
  createApiOperationSender,
  MemoryOfflineOperationStorage,
  OfflineOperationQueue,
  readOfflineCursor,
  readOfflineSnapshot,
  writeOfflineCursor,
  writeOfflineSnapshot,
} from '@/services/offlineOperationQueue';
import {
  getStoredRecoveryCursor,
  getStoredRecoverySnapshot,
  normalizeState,
  normalizedStateHash,
  recoverOfflineState,
} from '@/services/offlineRecovery';
import { buildOfflineOperationQueueStatusView } from '@/hooks/useOfflineOperationQueueStatus';
import type { SessionState } from '@/types';

describe('OfflineOperationQueue', () => {
  it('persists a stable operation id and hydrates pending operations', async () => {
    const storage = new MemoryOfflineOperationStorage();
    const sender = vi.fn().mockRejectedValue(new Error('offline'));
    const queue = new OfflineOperationQueue(sender, { storage, random: () => 1, retryBaseMs: 1_000 });
    await queue.ready;

    queue.enqueue('answer.submit', { answer: 'A' }, 'operation-1');
    await vi.waitFor(() => expect(queue.list()[0]?.state).toBe('PENDING'));
    queue.dispose();

    const hydrated = new OfflineOperationQueue(vi.fn().mockRejectedValue(new Error('offline')), { storage });
    await hydrated.ready;

    expect(hydrated.list()).toMatchObject([{ operation_id: 'operation-1', type: 'answer.submit', state: 'PENDING', payload: { operation_id: 'operation-1' } }]);
    hydrated.dispose();
  });

  it('promotes interrupted local operations during hydration', async () => {
    const storage = new MemoryOfflineOperationStorage();
    await storage.putOperation({
      operation_id: 'operation-local', type: 'answer.submit', payload: {}, state: 'LOCAL',
      created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z', attempts: 0, next_attempt_at: 0,
    });
    const queue = new OfflineOperationQueue(vi.fn().mockRejectedValue(new Error('offline')), { storage });
    await queue.ready;

    expect(queue.list()[0]?.state).toBe('PENDING');
    queue.dispose();
  });

  it('uses exponential full-jitter retry and acknowledges a later success', async () => {
    let now = 1_000;
    const sender = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ ok: true });
    const queue = new OfflineOperationQueue(sender, {
      storage: new MemoryOfflineOperationStorage(),
      now: () => now,
      random: () => 0.5,
      retryBaseMs: 1_000,
    });
    await queue.ready;
    queue.enqueue('answer.submit', {});
    await vi.waitFor(() => expect(queue.list()[0]?.attempts).toBe(1));

    expect(queue.list()[0]?.next_attempt_at).toBe(1_500);
    now = 1_500;
    await queue.retryNow();

    expect(sender).toHaveBeenCalledTimes(2);
    expect(queue.list()[0]?.state).toBe('ACKNOWLEDGED');
    queue.dispose();
  });

  it('reports backlog, retries, conflicts, recovery, and convergence with operation ids', async () => {
    const telemetry = vi.fn();
    const storage = new MemoryOfflineOperationStorage();
    await storage.putOperation({
      operation_id: 'interrupted', type: 'answer.submit', payload: {}, state: 'SENDING',
      created_at: '', updated_at: '', attempts: 0, next_attempt_at: 0,
    });
    const sender = vi.fn()
      .mockResolvedValueOnce({ ok: true })
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ ok: true })
      .mockRejectedValueOnce(new ApiError(409, 'conflict'));
    const queue = new OfflineOperationQueue(sender, { storage, onTelemetry: telemetry, random: () => 0 });
    await queue.ready;
    queue.enqueue('retry', {}, 'retry-operation');
    await vi.waitFor(() => expect(queue.list().find((operation) => operation.operation_id === 'retry-operation')?.attempts).toBe(1));
    await queue.retryNow();
    queue.enqueue('conflict', {}, 'conflict-operation');
    await vi.waitFor(() => expect(queue.list().find((operation) => operation.operation_id === 'conflict-operation')?.state).toBe('CONFLICT'));

    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({ name: 'offline.queue.recovered', operationId: 'interrupted' }));
    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({ name: 'offline.queue.retry', operationId: 'retry-operation' }));
    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({ name: 'offline.queue.converged' }));
    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({ name: 'offline.queue.conflict', operationId: 'conflict-operation' }));
    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({ name: 'offline.queue.backlog' }));
    queue.dispose();
  });

  it('classifies conflicts and permanent client errors without retrying', async () => {
    const sender = vi.fn().mockRejectedValueOnce(new ApiError(409, 'conflict')).mockRejectedValueOnce(new ApiError(422, 'invalid'));
    const queue = new OfflineOperationQueue(sender, { storage: new MemoryOfflineOperationStorage() });
    await queue.ready;
    queue.enqueue('one', {});
    queue.enqueue('two', {});
    await vi.waitFor(() => expect(queue.list().map((operation) => operation.state)).toEqual(['CONFLICT', 'FAILED_PERMANENTLY']));

    expect(queue.list().map((operation) => operation.state)).toEqual(['CONFLICT', 'FAILED_PERMANENTLY']);
    queue.dispose();
  });

  it('retries pending work when the browser returns online', async () => {
    let onlineListener: (() => void) | undefined;
    const onlineTarget = {
      addEventListener: vi.fn((_event: string, listener: () => void) => { onlineListener = listener; }),
      removeEventListener: vi.fn(),
    };
    const sender = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ ok: true });
    const queue = new OfflineOperationQueue(sender, {
      storage: new MemoryOfflineOperationStorage(),
      onlineTarget,
      random: () => 1,
      retryBaseMs: 60_000,
    });
    await queue.ready;
    queue.enqueue('answer.submit', {});
    await vi.waitFor(() => expect(queue.list()[0]?.state).toBe('PENDING'));

    onlineListener?.();
    await vi.waitFor(() => expect(queue.list()[0]?.state).toBe('ACKNOWLEDGED'));

    expect(sender).toHaveBeenCalledTimes(2);
    queue.dispose();
  });

  it('adds an idempotency key at send time and rejects persisted bearer tokens', async () => {
    const sender = createApiOperationSender();
    await expect(sender({
      operation_id: 'operation-1', type: 'api', state: 'PENDING', created_at: '', updated_at: '', attempts: 0, next_attempt_at: 0,
      payload: { method: 'POST', endpoint: '/api/test/', headers: { Authorization: 'Bearer persisted-secret' } },
    })).rejects.toThrow('autorizacion no puede persistirse');
  });

  it('rejects bearer tokens before persisting an operation', async () => {
    const queue = new OfflineOperationQueue(vi.fn(), { storage: new MemoryOfflineOperationStorage() });
    await queue.ready;

    expect(() => queue.enqueue('api', { headers: { Authorization: 'Bearer persisted-secret' } })).toThrow('autorizacion no puede persistirse');
    expect(queue.list()).toEqual([]);
    queue.dispose();
  });

  it('exposes pending, conflict, and failure state for UI subscribers', async () => {
    const sender = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockRejectedValueOnce(new ApiError(409, 'conflict'))
      .mockRejectedValueOnce(new ApiError(422, 'invalid'));
    const queue = new OfflineOperationQueue(sender, { storage: new MemoryOfflineOperationStorage(), random: () => 1 });
    await queue.ready;
    queue.enqueue('pending', {});
    queue.enqueue('conflict', {});
    queue.enqueue('failed', {});
    await vi.waitFor(() => expect(queue.getStatus()).toMatchObject({ pendingCount: 1, conflictCount: 1, failedCount: 1 }));
    queue.dispose();
  });

  it('groups conflicts and failures for the status hook', () => {
    const status = buildOfflineOperationQueueStatusView({
      operations: [
        { operation_id: 'conflict', type: 'answer.submit', payload: {}, state: 'CONFLICT', created_at: '', updated_at: '', attempts: 1, next_attempt_at: 0 },
        { operation_id: 'failed', type: 'answer.submit', payload: {}, state: 'FAILED_PERMANENTLY', created_at: '', updated_at: '', attempts: 1, next_attempt_at: 0 },
      ],
      pendingCount: 0,
      conflictCount: 1,
      failedCount: 1,
      isSending: false,
    });

    expect(status).toMatchObject({ hasConflicts: true, conflicts: [{ operation_id: 'conflict' }], failures: [{ operation_id: 'failed' }] });
  });
});

describe('offline recovery', () => {
  const state: SessionState = {
    evaluacion: { id: 'evaluation-1', nino_id: 'child-1', psychologist_id: 'psychologist-1', estado: 'IN_PROGRESS', edad_meses: 48, version: 3 },
    child_data_required: false,
    consent_required: false,
    consent_accepted: true,
  };

  it('normalizes equivalent object keys before hashing', async () => {
    expect(normalizeState({ b: 2, a: { d: 4, c: 3 } })).toBe(normalizeState({ a: { c: 3, d: 4 }, b: 2 }));
    await expect(normalizedStateHash({ b: 2, a: 1 })).resolves.toBe(await normalizedStateHash({ a: 1, b: 2 }));
  });

  it('recovers canonical REST state into a snapshot and version cursor', async () => {
    const storage = new MemoryOfflineOperationStorage();
    const fetchState = vi.fn().mockResolvedValue(state);

    const result = await recoverOfflineState({ storage, sessionCode: 'ABC123', sessionToken: 'token', fetchState, now: () => 0 });

    expect(fetchState).toHaveBeenCalledWith('ABC123', 'token');
    expect(result).toMatchObject({ state, cursor: '3', changed: false });
    expect(await storage.getCursor('session:ABC123')).toMatchObject({ value: '3' });
    expect(await storage.getSnapshot('session:ABC123')).toMatchObject({ value: { state, stateHash: result.stateHash } });
  });

  it('reads and writes cursor and snapshot values through the common storage helpers', async () => {
    const storage = new MemoryOfflineOperationStorage();
    await writeOfflineSnapshot(storage, 'session:ABC123', { state, stateHash: 'hash' }, '2026-01-01T00:00:00.000Z');
    await writeOfflineCursor(storage, 'session:ABC123', '3', '2026-01-01T00:00:00.000Z');

    await expect(readOfflineSnapshot(storage, 'session:ABC123')).resolves.toEqual({ state, stateHash: 'hash' });
    await expect(readOfflineCursor(storage, 'session:ABC123')).resolves.toBe('3');
  });

  it('reports when a recovered canonical state differs from its snapshot', async () => {
    const storage = new MemoryOfflineOperationStorage();
    await recoverOfflineState({ storage, sessionCode: 'ABC123', fetchState: vi.fn().mockResolvedValue(state) });
    const changedState = { ...state, evaluacion: { ...state.evaluacion, version: 4 } };

    await expect(recoverOfflineState({ storage, sessionCode: 'ABC123', fetchState: vi.fn().mockResolvedValue(changedState) }))
      .resolves.toMatchObject({ cursor: '4', previousCursor: '3', changed: true });
    await expect(getStoredRecoverySnapshot(storage, 'ABC123')).resolves.toMatchObject({ state: changedState });
    await expect(getStoredRecoveryCursor(storage, 'ABC123')).resolves.toBe('4');
  });

  it('reports recovery convergence metadata', async () => {
    const telemetry = vi.fn();
    await recoverOfflineState({ storage: new MemoryOfflineOperationStorage(), sessionCode: 'ABC123', fetchState: vi.fn().mockResolvedValue(state), onTelemetry: telemetry });
    expect(telemetry).toHaveBeenCalledWith(expect.objectContaining({
      name: 'offline.recovery.completed',
      attributes: expect.objectContaining({ sessionCode: 'ABC123', cursor: '3', changed: false }),
    }));
  });
});

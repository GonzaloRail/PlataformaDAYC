import { useSyncExternalStore } from 'react';
import { evaluacionesApi } from '@/services/evaluacionesApi';
import {
  IndexedDbOfflineOperationStorage,
  MemoryOfflineOperationStorage,
  OfflineOperationQueue,
  type OfflineOperation,
  type OfflineOperationStorage,
} from '@/services/offlineOperationQueue';

export interface EvidencePayload {
  evaluacionId: string;
  itemId: string;
  type: 'LOG' | 'TIME_EVENT' | 'SCREENSHOT' | 'AUDIO' | 'VIDEO' | 'CAMERA_FRAME' | 'SYSTEM_RESULT';
  file?: Blob;
  metadata?: Record<string, unknown>;
  durationMs?: number;
  sizeBytes?: number;
  capturedBy?: string;
  sessionToken?: string;
  fileName?: string;
  idempotencyKey?: string;
}

export interface EvidenceEventPayload {
  evaluacionId: string;
  itemId: string;
  eventType: string;
  eventPayload?: Record<string, unknown>;
  relativeTimeMs?: number;
  sessionToken?: string;
}

interface PersistedEvidencePayload extends Record<string, unknown> {
  evaluacionId: string;
  itemId: string;
  type: EvidencePayload['type'];
  metadata?: Record<string, unknown>;
  durationMs?: number;
  sizeBytes?: number;
  capturedBy?: string;
  fileName?: string;
  blobId?: string;
}

interface PersistedEventPayload extends Record<string, unknown> {
  evaluacionId: string;
  itemId: string;
  eventType: string;
  eventPayload?: Record<string, unknown>;
  relativeTimeMs?: number;
}

const EVIDENCE_OPERATION = 'evidence.upload';
const EVENT_OPERATION = 'event.submit';
const terminalStates = new Set(['ACKNOWLEDGED', 'CONFLICT', 'QUARANTINED', 'FAILED_PERMANENTLY']);

function buildEvidenceFormData(payload: EvidencePayload): FormData {
  const formData = new FormData();
  formData.append('type', payload.type);
  if (payload.file) formData.append('file', payload.file, payload.fileName || 'evidence-file');
  if (payload.metadata) formData.append('metadata', JSON.stringify(payload.metadata));
  if (payload.durationMs !== undefined) formData.append('duration_ms', payload.durationMs.toString());
  if (payload.sizeBytes !== undefined) formData.append('size_bytes', payload.sizeBytes.toString());
  if (payload.capturedBy) formData.append('captured_by', payload.capturedBy);
  if (payload.idempotencyKey) formData.append('idempotency_key', payload.idempotencyKey);
  return formData;
}

export async function uploadEvidenceNow(payload: EvidencePayload) {
  payload.idempotencyKey ||= crypto.randomUUID();
  return evaluacionesApi.uploadEvidence(payload.evaluacionId, payload.itemId, buildEvidenceFormData(payload), payload.sessionToken);
}

type EvidenceUploader = (payload: EvidencePayload) => Promise<unknown>;

export class UploadQueue {
  private readonly runtimeTokens = new Map<string, string | undefined>();
  private readonly localIds = new Set<string>();
  private readonly listeners = new Set<() => void>();
  private readonly operations: OfflineOperationQueue;

  constructor(
    private readonly uploader: EvidenceUploader = uploadEvidenceNow,
    private readonly storage: OfflineOperationStorage = typeof indexedDB === 'undefined'
      ? new MemoryOfflineOperationStorage()
      : new IndexedDbOfflineOperationStorage(),
  ) {
    this.operations = new OfflineOperationQueue((operation) => this.send(operation), { storage });
    this.operations.subscribe(() => this.emit());
  }

  add(payload: EvidencePayload): void {
    const operationId = payload.idempotencyKey || crypto.randomUUID();
    this.runtimeTokens.set(operationId, payload.sessionToken);
    this.localIds.add(operationId);
    this.emit();
    void this.persistEvidence(operationId, payload);
  }

  addEvent(payload: EvidenceEventPayload): void {
    const operationId = crypto.randomUUID();
    this.runtimeTokens.set(operationId, payload.sessionToken);
    this.localIds.add(operationId);
    this.emit();
    const persisted: PersistedEventPayload = {
      evaluacionId: payload.evaluacionId,
      itemId: payload.itemId,
      eventType: payload.eventType,
      eventPayload: payload.eventPayload,
      relativeTimeMs: payload.relativeTimeMs,
    };
    void this.persistOperation(operationId, EVENT_OPERATION, persisted);
  }

  get pendingCount(): number {
    const persisted = this.operations.list().filter((operation) => !terminalStates.has(operation.state)).length;
    return this.localIds.size + persisted;
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  dispose(): void {
    this.operations.dispose();
  }

  private async persistEvidence(operationId: string, payload: EvidencePayload): Promise<void> {
    const blobId = payload.file ? operationId : undefined;
    try {
      if (payload.file && blobId) {
        await this.storage.putBlob({ blob_id: blobId, blob: payload.file, created_at: new Date().toISOString() });
      }
      const persisted: PersistedEvidencePayload = {
        evaluacionId: payload.evaluacionId,
        itemId: payload.itemId,
        type: payload.type,
        metadata: payload.metadata,
        durationMs: payload.durationMs,
        sizeBytes: payload.sizeBytes,
        capturedBy: payload.capturedBy,
        fileName: payload.fileName,
        ...(blobId ? { blobId } : {}),
      };
      await this.persistOperation(operationId, EVIDENCE_OPERATION, persisted);
    } catch {
      this.localIds.delete(operationId);
      this.emit();
    }
  }

  private async persistOperation(operationId: string, type: string, payload: Record<string, unknown>): Promise<void> {
    this.localIds.delete(operationId);
    this.operations.enqueue(type, payload, operationId);
    this.emit();
  }

  private async send(operation: OfflineOperation): Promise<unknown> {
    const token = this.runtimeTokens.get(operation.operation_id);
    if (operation.type === EVENT_OPERATION) {
      const payload = operation.payload as unknown as PersistedEventPayload;
      return evaluacionesApi.submitEvent(payload.evaluacionId, payload.itemId, {
        event_type: payload.eventType,
        event_payload: payload.eventPayload,
        relative_time_ms: payload.relativeTimeMs,
      }, token, operation.operation_id);
    }

    const payload = operation.payload as unknown as PersistedEvidencePayload;
    const blob = payload.blobId ? await this.storage.getBlob(payload.blobId) : undefined;
    return this.uploader({
      ...payload,
      file: blob?.blob,
      sessionToken: token,
      idempotencyKey: operation.operation_id,
    });
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const evidenceUploadQueue = new UploadQueue();

export function usePendingEvidenceCount() {
  return useSyncExternalStore(evidenceUploadQueue.subscribe, () => evidenceUploadQueue.pendingCount, () => 0);
}

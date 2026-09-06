import { useSyncExternalStore } from 'react';
import { evaluacionesApi } from '@/services/evaluacionesApi';
import { devLog } from '@/utils/logger';

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

function buildEvidenceFormData(payload: EvidencePayload): FormData {
  const formData = new FormData();
  formData.append('type', payload.type);
  if (payload.file) {
    formData.append('file', payload.file, payload.fileName || 'evidence-file');
  }
  if (payload.metadata) {
    formData.append('metadata', JSON.stringify(payload.metadata));
  }
  if (payload.durationMs !== undefined) formData.append('duration_ms', payload.durationMs.toString());
  if (payload.sizeBytes !== undefined) formData.append('size_bytes', payload.sizeBytes.toString());
  if (payload.capturedBy) formData.append('captured_by', payload.capturedBy);
  if (payload.idempotencyKey) formData.append('idempotency_key', payload.idempotencyKey);

  return formData;
}

export async function uploadEvidenceNow(payload: EvidencePayload) {
  payload.idempotencyKey ||= crypto.randomUUID();
  const formData = buildEvidenceFormData(payload);
  return evaluacionesApi.uploadEvidence(payload.evaluacionId, payload.itemId, formData, payload.sessionToken);
}

interface QueuedEvidence {
  id: string;
  payload: EvidencePayload;
}

const DATABASE_NAME = 'dayc-evidence-queue';
const STORE_NAME = 'pending-evidence';

class EvidenceQueueStorage {
  private databasePromise: Promise<IDBDatabase | null> | null = null;

  private open(): Promise<IDBDatabase | null> {
    if (typeof indexedDB === 'undefined') return Promise.resolve(null);
    if (this.databasePromise) return this.databasePromise;

    this.databasePromise = new Promise((resolve) => {
      const request = indexedDB.open(DATABASE_NAME, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
    return this.databasePromise;
  }

  async put(item: QueuedEvidence): Promise<void> {
    const database = await this.open();
    if (!database) return;
    await new Promise<void>((resolve) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(item);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }

  async remove(id: string): Promise<void> {
    const database = await this.open();
    if (!database) return;
    await new Promise<void>((resolve) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }

  async list(): Promise<QueuedEvidence[]> {
    const database = await this.open();
    if (!database) return [];
    return new Promise((resolve) => {
      const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result as QueuedEvidence[]);
      request.onerror = () => resolve([]);
    });
  }
}

export class UploadQueue {
  private queue: QueuedEvidence[] = [];
  private isUploading = false;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<() => void>();
  private readonly storage = new EvidenceQueueStorage();

  constructor(
    private readonly uploader: (payload: EvidencePayload) => Promise<unknown> = uploadEvidenceNow,
  ) {
    void this.hydrate();
  }

  add(payload: EvidencePayload) {
    const item = {
      id: crypto.randomUUID(),
      payload: { ...payload, idempotencyKey: payload.idempotencyKey || crypto.randomUUID() },
    };
    this.queue.push(item);
    this.emit();
    void this.storage.put(item).then(() => this.processQueue());
  }

  get pendingCount() {
    return this.queue.length;
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  private async processQueue() {
    if (this.isUploading || this.queue.length === 0) return;
    this.isUploading = true;

    while (this.queue.length > 0) {
      const item = this.queue[0];
      try {
        await this.uploader(item.payload);
        this.queue.shift();
        this.emit();
        await this.storage.remove(item.id);
      } catch (error) {
        devLog.error('EvidenceUploadQueue', 'Error uploading evidence:', error);
        // Keep the payload until a later attempt succeeds. This prevents a
        // transient network failure from silently losing clinical evidence.
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      }
    }

    this.isUploading = false;

    if (this.queue.length > 0) {
      if (!this.retryTimer) {
        this.retryTimer = setTimeout(() => {
          this.retryTimer = null;
          void this.processQueue();
        }, 10000);
      }
    }
  }

  private async hydrate() {
    const stored = await this.storage.list();
    const knownIds = new Set(this.queue.map((item) => item.id));
    this.queue.push(...stored.filter((item) => !knownIds.has(item.id)));
    this.emit();
    void this.processQueue();
  }
}

export const evidenceUploadQueue = new UploadQueue();

export function usePendingEvidenceCount() {
  return useSyncExternalStore(
    evidenceUploadQueue.subscribe,
    () => evidenceUploadQueue.pendingCount,
    () => 0,
  );
}

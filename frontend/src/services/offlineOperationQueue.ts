import api, { ApiError } from '@/services/api';
import { reportOfflineTelemetry, type OfflineTelemetryReporter } from '@/services/offlineTelemetry';
import { devLog } from '@/utils/logger';

export const OFFLINE_DATABASE_NAME = 'dayc-offline-operations';
export const OFFLINE_DATABASE_VERSION = 1;

const OPERATION_STORE = 'operations';
const BLOB_STORE = 'blobs';
const SNAPSHOT_STORE = 'snapshots';
const CURSOR_STORE = 'cursors';
const SYNC_METADATA_STORE = 'sync_metadata';

export type OfflineOperationState =
  | 'LOCAL'
  | 'PENDING'
  | 'SENDING'
  | 'ACKNOWLEDGED'
  | 'CONFLICT'
  | 'QUARANTINED'
  | 'FAILED_PERMANENTLY';

export interface OfflineOperation {
  operation_id: string;
  type: string;
  payload: Record<string, unknown>;
  state: OfflineOperationState;
  created_at: string;
  updated_at: string;
  attempts: number;
  next_attempt_at: number;
  last_error?: string;
}

export interface OfflineOperationQueueStatus {
  operations: readonly OfflineOperation[];
  pendingCount: number;
  conflictCount: number;
  failedCount: number;
  isSending: boolean;
}

export interface OfflineBlob {
  blob_id: string;
  blob: Blob;
  created_at: string;
}

export interface OfflineSnapshot {
  snapshot_id: string;
  value: unknown;
  updated_at: string;
}

export interface OfflineCursor {
  cursor_id: string;
  value: string;
  updated_at: string;
}

export interface SyncMetadata {
  key: string;
  value: unknown;
  updated_at: string;
}

export interface OfflineOperationStorage {
  putOperation(operation: OfflineOperation): Promise<void>;
  listOperations(): Promise<OfflineOperation[]>;
  putBlob(blob: OfflineBlob): Promise<void>;
  getBlob(blobId: string): Promise<OfflineBlob | undefined>;
  putSnapshot(snapshot: OfflineSnapshot): Promise<void>;
  getSnapshot(snapshotId: string): Promise<OfflineSnapshot | undefined>;
  putCursor(cursor: OfflineCursor): Promise<void>;
  getCursor(cursorId: string): Promise<OfflineCursor | undefined>;
  putSyncMetadata(metadata: SyncMetadata): Promise<void>;
  getSyncMetadata(key: string): Promise<SyncMetadata | undefined>;
}

export async function readOfflineSnapshot<T>(storage: OfflineOperationStorage, snapshotId: string): Promise<T | undefined> {
  return (await storage.getSnapshot(snapshotId))?.value as T | undefined;
}

export async function writeOfflineSnapshot<T>(
  storage: OfflineOperationStorage,
  snapshotId: string,
  value: T,
  updatedAt: string,
): Promise<void> {
  await storage.putSnapshot({ snapshot_id: snapshotId, value, updated_at: updatedAt });
}

export async function readOfflineCursor(storage: OfflineOperationStorage, cursorId: string): Promise<string | undefined> {
  return (await storage.getCursor(cursorId))?.value;
}

export async function writeOfflineCursor(
  storage: OfflineOperationStorage,
  cursorId: string,
  value: string,
  updatedAt: string,
): Promise<void> {
  await storage.putCursor({ cursor_id: cursorId, value, updated_at: updatedAt });
}

type StoreName = typeof OPERATION_STORE | typeof BLOB_STORE | typeof SNAPSHOT_STORE | typeof CURSOR_STORE | typeof SYNC_METADATA_STORE;

export class IndexedDbOfflineOperationStorage implements OfflineOperationStorage {
  private databasePromise: Promise<IDBDatabase> | null = null;

  private open(): Promise<IDBDatabase> {
    if (typeof indexedDB === 'undefined') return Promise.reject(new Error('IndexedDB no esta disponible'));
    if (this.databasePromise) return this.databasePromise;

    this.databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(OFFLINE_DATABASE_NAME, OFFLINE_DATABASE_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(OPERATION_STORE)) database.createObjectStore(OPERATION_STORE, { keyPath: 'operation_id' });
        if (!database.objectStoreNames.contains(BLOB_STORE)) database.createObjectStore(BLOB_STORE, { keyPath: 'blob_id' });
        if (!database.objectStoreNames.contains(SNAPSHOT_STORE)) database.createObjectStore(SNAPSHOT_STORE, { keyPath: 'snapshot_id' });
        if (!database.objectStoreNames.contains(CURSOR_STORE)) database.createObjectStore(CURSOR_STORE, { keyPath: 'cursor_id' });
        if (!database.objectStoreNames.contains(SYNC_METADATA_STORE)) database.createObjectStore(SYNC_METADATA_STORE, { keyPath: 'key' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('No se pudo abrir la cola sin conexion'));
    });
    return this.databasePromise;
  }

  private async put(store: StoreName, value: unknown): Promise<void> {
    const database = await this.open();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(store, 'readwrite');
      transaction.objectStore(store).put(value);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('No se pudo guardar la cola sin conexion'));
      transaction.onabort = () => reject(transaction.error || new Error('La transaccion sin conexion fue cancelada'));
    });
  }

  private async get<T>(store: StoreName, key: string): Promise<T | undefined> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const request = database.transaction(store, 'readonly').objectStore(store).get(key);
      request.onsuccess = () => resolve(request.result as T | undefined);
      request.onerror = () => reject(request.error || new Error('No se pudo leer la cola sin conexion'));
    });
  }

  async putOperation(operation: OfflineOperation) { await this.put(OPERATION_STORE, operation); }
  async listOperations() {
    const database = await this.open();
    return new Promise<OfflineOperation[]>((resolve, reject) => {
      const request = database.transaction(OPERATION_STORE, 'readonly').objectStore(OPERATION_STORE).getAll();
      request.onsuccess = () => resolve(request.result as OfflineOperation[]);
      request.onerror = () => reject(request.error || new Error('No se pudo leer las operaciones sin conexion'));
    });
  }
  async putBlob(blob: OfflineBlob) { await this.put(BLOB_STORE, blob); }
  async getBlob(blobId: string) { return this.get<OfflineBlob>(BLOB_STORE, blobId); }
  async putSnapshot(snapshot: OfflineSnapshot) { await this.put(SNAPSHOT_STORE, snapshot); }
  async getSnapshot(snapshotId: string) { return this.get<OfflineSnapshot>(SNAPSHOT_STORE, snapshotId); }
  async putCursor(cursor: OfflineCursor) { await this.put(CURSOR_STORE, cursor); }
  async getCursor(cursorId: string) { return this.get<OfflineCursor>(CURSOR_STORE, cursorId); }
  async putSyncMetadata(metadata: SyncMetadata) { await this.put(SYNC_METADATA_STORE, metadata); }
  async getSyncMetadata(key: string) { return this.get<SyncMetadata>(SYNC_METADATA_STORE, key); }
}

export class MemoryOfflineOperationStorage implements OfflineOperationStorage {
  private operations = new Map<string, OfflineOperation>();
  private blobs = new Map<string, OfflineBlob>();
  private snapshots = new Map<string, OfflineSnapshot>();
  private cursors = new Map<string, OfflineCursor>();
  private metadata = new Map<string, SyncMetadata>();

  async putOperation(operation: OfflineOperation) { this.operations.set(operation.operation_id, structuredClone(operation)); }
  async listOperations() { return Array.from(this.operations.values(), (operation) => structuredClone(operation)); }
  async putBlob(blob: OfflineBlob) { this.blobs.set(blob.blob_id, blob); }
  async getBlob(blobId: string) { return this.blobs.get(blobId); }
  async putSnapshot(snapshot: OfflineSnapshot) { this.snapshots.set(snapshot.snapshot_id, structuredClone(snapshot)); }
  async getSnapshot(snapshotId: string) {
    const snapshot = this.snapshots.get(snapshotId);
    return snapshot ? structuredClone(snapshot) : undefined;
  }
  async putCursor(cursor: OfflineCursor) { this.cursors.set(cursor.cursor_id, structuredClone(cursor)); }
  async getCursor(cursorId: string) {
    const cursor = this.cursors.get(cursorId);
    return cursor ? structuredClone(cursor) : undefined;
  }
  async putSyncMetadata(metadata: SyncMetadata) { this.metadata.set(metadata.key, structuredClone(metadata)); }
  async getSyncMetadata(key: string) {
    const metadata = this.metadata.get(key);
    return metadata ? structuredClone(metadata) : undefined;
  }
}

export interface OfflineOperationQueueOptions {
  storage?: OfflineOperationStorage;
  retryBaseMs?: number;
  retryMaxMs?: number;
  random?: () => number;
  now?: () => number;
  onNotification?: (message: string, error?: unknown) => void;
  onTelemetry?: OfflineTelemetryReporter;
  onlineTarget?: Pick<Window, 'addEventListener' | 'removeEventListener'>;
}

export type OfflineOperationSender = (operation: OfflineOperation) => Promise<unknown>;

export class OfflineOperationQueue {
  private operations = new Map<string, OfflineOperation>();
  private listeners = new Set<() => void>();
  private isSending = false;
  private status: OfflineOperationQueueStatus = {
    operations: [],
    pendingCount: 0,
    conflictCount: 0,
    failedCount: 0,
    isSending: false,
  };
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private previousBacklog = -1;
  private readonly storage: OfflineOperationStorage;
  private readonly retryBaseMs: number;
  private readonly retryMaxMs: number;
  private readonly random: () => number;
  private readonly now: () => number;
  private readonly onlineTarget?: OfflineOperationQueueOptions['onlineTarget'];
  readonly ready: Promise<void>;

  constructor(private readonly sender: OfflineOperationSender, options: OfflineOperationQueueOptions = {}) {
    this.storage = options.storage || (
      typeof indexedDB === 'undefined'
        ? new MemoryOfflineOperationStorage()
        : new IndexedDbOfflineOperationStorage()
    );
    this.retryBaseMs = options.retryBaseMs || 1_000;
    this.retryMaxMs = options.retryMaxMs || 60_000;
    this.random = options.random || Math.random;
    this.now = options.now || Date.now;
    this.notify = options.onNotification || ((message, error) => devLog.error('OfflineOperationQueue', message, error));
    this.telemetry = (event) => {
      try {
        (options.onTelemetry || reportOfflineTelemetry)(event);
      } catch (error) {
        devLog.error('OfflineOperationQueue', 'No se pudo registrar telemetria sin conexion.', error);
      }
    };
    this.onlineTarget = options.onlineTarget || (typeof window !== 'undefined' ? window : undefined);
    this.onlineTarget?.addEventListener('online', this.retryOnline);
    this.ready = this.hydrate();
  }

  private readonly notify: (message: string, error?: unknown) => void;
  private readonly telemetry: OfflineTelemetryReporter;

  enqueue(type: string, payload: Record<string, unknown>, operationId: string = crypto.randomUUID()): OfflineOperation {
    assertNoPersistedAuthorization(payload);
    const timestamp = new Date(this.now()).toISOString();
    const operation: OfflineOperation = {
      operation_id: operationId,
      type,
      payload: { ...payload, operation_id: operationId },
      state: 'LOCAL',
      created_at: timestamp,
      updated_at: timestamp,
      attempts: 0,
      next_attempt_at: this.now(),
    };
    this.operations.set(operation.operation_id, operation);
    this.emit();
    void this.persist(operation)
      .then(() => this.update(operation, { state: 'PENDING' }))
      .then(() => this.process())
      .catch(() => undefined);
    return operation;
  }

  list(): OfflineOperation[] {
    return Array.from(this.operations.values()).sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  getStatus = (): OfflineOperationQueueStatus => this.status;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  async retryNow(): Promise<void> {
    await this.ready;
    for (const operation of this.operations.values()) {
      if (operation.state === 'PENDING') operation.next_attempt_at = this.now();
    }
    await this.process();
  }

  async quarantine(operationId: string, reason: string): Promise<void> {
    const operation = this.operations.get(operationId);
    if (!operation) return;
    await this.update(operation, { state: 'QUARANTINED', last_error: reason });
  }

  dispose(): void {
    if (this.retryTimer) clearTimeout(this.retryTimer);
    this.onlineTarget?.removeEventListener('online', this.retryOnline);
  }

  private readonly retryOnline = () => { void this.retryNow(); };

  private async hydrate(): Promise<void> {
    try {
      const stored = await this.storage.listOperations();
      for (const operation of stored) {
        let needsPersistence = false;
        if (operation.payload.operation_id !== operation.operation_id) {
          operation.payload = { ...operation.payload, operation_id: operation.operation_id };
          needsPersistence = true;
        }
        if (operation.state === 'LOCAL' || operation.state === 'SENDING') {
          this.telemetry({
            name: 'offline.queue.recovered',
            operationId: operation.operation_id,
            attributes: { previousState: operation.state },
          });
          operation.state = 'PENDING';
          operation.updated_at = new Date(this.now()).toISOString();
          needsPersistence = true;
        }
        if (needsPersistence) await this.persist(operation);
        this.operations.set(operation.operation_id, operation);
      }
      this.emit();
      await this.process();
    } catch (error) {
      this.notify('No se pudo recuperar la cola sin conexion.', error);
    }
  }

  private async process(): Promise<void> {
    if (this.isSending) return;
    this.isSending = true;
    try {
      let operation = this.nextOperation();
      while (operation) {
        await this.send(operation);
        operation = this.nextOperation();
      }
    } finally {
      this.isSending = false;
      this.scheduleRetry();
    }
  }

  private nextOperation(): OfflineOperation | undefined {
    const now = this.now();
    return this.list().find((operation) => operation.state === 'PENDING' && operation.next_attempt_at <= now);
  }

  private async send(operation: OfflineOperation): Promise<void> {
    await this.update(operation, { state: 'SENDING' });
    try {
      await this.sender(operation);
      await this.update(operation, { state: 'ACKNOWLEDGED', last_error: undefined });
    } catch (error) {
      const state = this.failureState(error);
      if (state !== 'PENDING') {
        await this.update(operation, { state, last_error: this.errorMessage(error) });
        if (state === 'CONFLICT') {
          this.telemetry({ name: 'offline.queue.conflict', operationId: operation.operation_id, attributes: { attempts: operation.attempts } });
        }
        return;
      }
      const attempts = operation.attempts + 1;
      const cap = Math.min(this.retryMaxMs, this.retryBaseMs * 2 ** Math.min(attempts - 1, 16));
      await this.update(operation, {
        state: 'PENDING',
        attempts,
        next_attempt_at: this.now() + Math.floor(this.random() * cap),
        last_error: this.errorMessage(error),
      });
      this.telemetry({
        name: 'offline.queue.retry',
        operationId: operation.operation_id,
        attributes: { attempts, delayMs: operation.next_attempt_at - this.now() },
      });
    }
  }

  private failureState(error: unknown): OfflineOperationState {
    if (error instanceof ApiError && error.status === 409) return 'CONFLICT';
    if (error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) return 'FAILED_PERMANENTLY';
    return 'PENDING';
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Error desconocido al sincronizar';
  }

  private async update(operation: OfflineOperation, changes: Partial<OfflineOperation>): Promise<void> {
    Object.assign(operation, changes, { updated_at: new Date(this.now()).toISOString() });
    this.emit();
    await this.persist(operation);
  }

  private emit(): void {
    const operations = this.list();
    this.status = {
      operations,
      pendingCount: operations.filter((operation) => ['LOCAL', 'PENDING', 'SENDING'].includes(operation.state)).length,
      conflictCount: operations.filter((operation) => operation.state === 'CONFLICT').length,
      failedCount: operations.filter((operation) => operation.state === 'FAILED_PERMANENTLY' || operation.state === 'QUARANTINED').length,
      isSending: this.isSending,
    };
    if (this.status.pendingCount !== this.previousBacklog) {
      this.previousBacklog = this.status.pendingCount;
      this.telemetry({ name: 'offline.queue.backlog', attributes: { pendingCount: this.status.pendingCount } });
      if (this.status.pendingCount === 0 && operations.some((operation) => operation.state === 'ACKNOWLEDGED')) {
        this.telemetry({ name: 'offline.queue.converged', attributes: { acknowledgedCount: operations.filter((operation) => operation.state === 'ACKNOWLEDGED').length } });
      }
    }
    this.listeners.forEach((listener) => listener());
  }

  private async persist(operation: OfflineOperation): Promise<void> {
    try {
      await this.storage.putOperation(operation);
    } catch (error) {
      const message = error instanceof DOMException && error.name === 'QuotaExceededError'
        ? 'No hay espacio suficiente para guardar operaciones sin conexion.'
        : 'No se pudo guardar una operacion sin conexion.';
      this.notify(message, error);
      throw error;
    }
  }

  private scheduleRetry(): void {
    if (this.retryTimer) return;
    const next = this.list()
      .filter((operation) => operation.state === 'PENDING')
      .reduce<number | undefined>((earliest, operation) => earliest === undefined ? operation.next_attempt_at : Math.min(earliest, operation.next_attempt_at), undefined);
    if (next === undefined) return;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      void this.process();
    }, Math.max(0, next - this.now()));
  }
}

export interface ApiOperationPayload {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

function assertNoPersistedAuthorization(payload: Record<string, unknown>): void {
  const headers = payload.headers;
  if (headers && typeof headers === 'object' && Object.keys(headers).some((key) => key.toLowerCase() === 'authorization')) {
    throw new Error('La autorizacion no puede persistirse en una operacion sin conexion');
  }
}

export function createApiOperationSender(getAuthorization?: (operation: OfflineOperation) => string | undefined): OfflineOperationSender {
  return async (operation) => {
    const payload = operation.payload as unknown as ApiOperationPayload;
    if (!payload || !payload.method || !payload.endpoint) throw new Error('Operacion API invalida');
    assertNoPersistedAuthorization(operation.payload);
    const authorization = getAuthorization?.(operation);
    const headers = {
      ...(payload.headers || {}),
      'Idempotency-Key': operation.operation_id,
      ...(authorization ? { Authorization: authorization } : {}),
    };
    if (payload.method === 'DELETE') return api.delete(payload.endpoint, { headers });
    if (payload.method === 'POST') return api.post(payload.endpoint, payload.body, { headers });
    if (payload.method === 'PUT') return api.put(payload.endpoint, payload.body, { headers });
    return api.patch(payload.endpoint, payload.body, { headers });
  };
}

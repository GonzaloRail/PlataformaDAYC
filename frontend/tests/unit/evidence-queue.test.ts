import { afterEach, describe, expect, it, vi } from 'vitest';
import { UploadQueue, type EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';
import { MemoryOfflineOperationStorage } from '@/services/offlineOperationQueue';

const payload: EvidencePayload = {
  evaluacionId: 'evaluation-1',
  itemId: 'item-1',
  type: 'LOG',
};

describe('UploadQueue', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('conserva un payload fallido y lo reintenta', async () => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const uploader = vi.fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce({ id: 'evidence-1' });
    const queue = new UploadQueue(uploader);

    queue.add(payload);
    await vi.advanceTimersByTimeAsync(11_000);

    expect(uploader).toHaveBeenCalledTimes(2);
    expect(queue.pendingCount).toBe(0);
    vi.restoreAllMocks();
  });

  it('persiste archivos en el store de blobs y excluye el bearer token de la operacion', async () => {
    const storage = new MemoryOfflineOperationStorage();
    const uploader = vi.fn().mockRejectedValue(new Error('offline'));
    const queue = new UploadQueue(uploader, storage);
    const file = new Blob(['evidencia'], { type: 'text/plain' });

    queue.add({ ...payload, file, sessionToken: 'secret-session-token' });

    await vi.waitFor(async () => expect((await storage.listOperations()).length).toBe(1));
    const [operation] = await storage.listOperations();
    const stored = operation.payload as { blobId?: string; sessionToken?: string };

    expect(stored).toMatchObject({ evaluacionId: 'evaluation-1', blobId: operation.operation_id });
    expect(stored.sessionToken).toBeUndefined();
    expect(await (await storage.getBlob(operation.operation_id))?.blob.text()).toBe(await file.text());
    queue.dispose();
  });

  it('persiste eventos fallidos sin el token de sesion', async () => {
    const storage = new MemoryOfflineOperationStorage();
    const queue = new UploadQueue(async () => undefined, storage);

    queue.addEvent({
      evaluacionId: 'evaluation-1',
      itemId: 'item-1',
      eventType: 'CARD_MOVED',
      eventPayload: { target: 'left' },
      sessionToken: 'secret-session-token',
    });

    await vi.waitFor(async () => expect((await storage.listOperations()).length).toBe(1));
    const [operation] = await storage.listOperations();

    expect(operation.type).toBe('event.submit');
    expect(operation.payload).toMatchObject({ eventType: 'CARD_MOVED', eventPayload: { target: 'left' } });
    expect(operation.payload).not.toHaveProperty('sessionToken');
    queue.dispose();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';
import { UploadQueue, type EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';

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
});

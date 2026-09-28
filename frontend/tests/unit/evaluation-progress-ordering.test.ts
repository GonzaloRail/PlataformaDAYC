import { describe, expect, it } from 'vitest';
import { shouldApplyProgressMessage, type ProgressInfo } from '@/hooks/useEvaluationProgress';

const progress = (eventId: string, version: number): ProgressInfo => ({
  eventId,
  operationId: 'operation-1',
  totalItems: 4,
  completedItems: 1,
  currentItem: 'COGNITIVO_001',
  estado: 'IN_PROGRESS',
  version,
  serverTime: '2026-09-28T00:00:00Z',
});

describe('WebSocket progress ordering', () => {
  it('deduplicates events and discards obsolete versions', () => {
    const seen = new Set<string>();
    const current = progress('event-2', 2);

    expect(shouldApplyProgressMessage(current, progress('event-2', 2), seen)).toBe(true);
    expect(shouldApplyProgressMessage(current, progress('event-2', 2), seen)).toBe(false);
    expect(shouldApplyProgressMessage(current, progress('event-1', 1), seen)).toBe(false);
  });
});

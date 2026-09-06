import { describe, expect, it } from 'vitest';
import { parseProgressMessage } from '@/hooks/useEvaluationProgress';

describe('progress WebSocket contract', () => {
  it('normalizes the backend progress envelope', () => {
    expect(parseProgressMessage(JSON.stringify({
      type: 'progress',
      data: {
        total_items: 8,
        completed_items: 3,
        current_item: 'COGNITIVO_004',
        estado: 'IN_PROGRESS',
        event_id: 'event-123',
        version: 7,
        server_time: '2026-09-05T12:00:00Z',
      },
    }))).toEqual({
      totalItems: 8,
      completedItems: 3,
      currentItem: 'COGNITIVO_004',
      estado: 'IN_PROGRESS',
      eventId: 'event-123',
      version: 7,
      serverTime: '2026-09-05T12:00:00Z',
    });
  });

  it('ignores unrelated or malformed messages', () => {
    expect(parseProgressMessage('{"type":"other"}')).toBeNull();
    expect(parseProgressMessage('not-json')).toBeNull();
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';

const { apiPost } = vi.hoisted(() => ({ apiPost: vi.fn() }));

const sessionValues = new Map<string, string>();
const testSessionStorage: Storage = {
  getItem: (key) => sessionValues.get(key) || null,
  setItem: (key, value) => { sessionValues.set(key, value); },
  removeItem: (key) => { sessionValues.delete(key); },
  clear: () => { sessionValues.clear(); },
  key: (index) => Array.from(sessionValues.keys())[index] || null,
  get length() { return sessionValues.size; },
};

vi.mock('@/services/api', () => {
  class ApiError extends Error {
    constructor(public status: number, message: string) {
      super(message);
      this.name = 'ApiError';
    }
  }

  return {
    default: { post: apiPost },
    ApiError,
  };
});

import { ApiError } from '@/services/api';
import {
  evaluacionesApi,
  evaluacionesOfflineQueue,
  sendEvaluacionOfflineOperation,
  setSessionToken,
} from '@/services/evaluacionesApi';

describe('evaluacionesApi offline operations', () => {
  beforeEach(() => {
    apiPost.mockReset();
    vi.stubGlobal('sessionStorage', testSessionStorage);
    testSessionStorage.clear();
  });

  it('preserves online responses and queues a transient answer with the same operation id', async () => {
    const onlineResponse = { estado: 'IN_PROGRESS', version: 4 };
    apiPost.mockResolvedValueOnce(onlineResponse);

    await expect(evaluacionesApi.pauseSession('SESSION-ONLINE', 3, 'adult-token')).resolves.toBe(onlineResponse);
    expect(apiPost).toHaveBeenCalledWith(
      '/api/evaluaciones/session/SESSION-ONLINE/pause/',
      { expected_version: 3 },
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer adult-token', 'Idempotency-Key': expect.any(String) }),
      }),
    );

    setSessionToken('SESSION-OFFLINE', 'CHILD', 'child-token');
    apiPost.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    apiPost.mockRejectedValue(new TypeError('Still offline'));

    await expect(evaluacionesApi.submitRespuesta('evaluation-1', {
      item_id: 'item-1',
      resultado: 'CORRECT',
      tiempo_respuesta_ms: 100,
      expected_version: 4,
    }, 'child-token')).rejects.toThrow('Failed to fetch');

    await vi.waitFor(() => {
      expect(evaluacionesOfflineQueue.list()).toEqual(expect.arrayContaining([
        expect.objectContaining({
          type: 'evaluacion.session-operation',
          payload: expect.objectContaining({
            endpoint: '/api/evaluaciones/evaluation-1/respuesta/',
            session_code: 'SESSION-OFFLINE',
            actor_role: 'CHILD',
          }),
        }),
      ]));
    });

    const queued = evaluacionesOfflineQueue.list().at(-1)!;
    expect(queued.payload).not.toHaveProperty('headers');
    evaluacionesOfflineQueue.dispose();
  });

  it('does not queue permanent failures and requires runtime session authentication for replay', async () => {
    const countBefore = evaluacionesOfflineQueue.list().length;
    apiPost.mockRejectedValueOnce(new ApiError(422, 'invalid'));

    await expect(evaluacionesApi.finishSession('SESSION-PERMANENT', undefined, 3, 'adult-token'))
      .rejects.toThrow('invalid');
    expect(evaluacionesOfflineQueue.list()).toHaveLength(countBefore);

    await expect(sendEvaluacionOfflineOperation({
      operation_id: 'operation-without-token',
      type: 'evaluacion.session-operation',
      state: 'PENDING',
      created_at: '',
      updated_at: '',
      attempts: 0,
      next_attempt_at: 0,
      payload: {
        method: 'POST',
        endpoint: '/api/evaluaciones/session/SESSION-MISSING/pause/',
        body: { expected_version: 3 },
        session_code: 'SESSION-MISSING',
        actor_role: 'ADULT',
      },
    })).rejects.toThrow('sesion ya no esta disponible');
    expect(apiPost).toHaveBeenCalledTimes(1);

    setSessionToken('SESSION-REPLAY', 'ADULT', 'fresh-token');
    apiPost.mockResolvedValueOnce({ evaluacion: { id: 'evaluation-1' } });
    await sendEvaluacionOfflineOperation({
      operation_id: 'operation-with-token',
      type: 'evaluacion.session-operation',
      state: 'PENDING',
      created_at: '',
      updated_at: '',
      attempts: 0,
      next_attempt_at: 0,
      payload: {
        method: 'POST',
        endpoint: '/api/evaluaciones/session/SESSION-REPLAY/pause/',
        body: { expected_version: 3 },
        session_code: 'SESSION-REPLAY',
        actor_role: 'ADULT',
      },
    });
    expect(apiPost).toHaveBeenLastCalledWith(
      '/api/evaluaciones/session/SESSION-REPLAY/pause/',
      { expected_version: 3 },
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer fresh-token', 'Idempotency-Key': 'operation-with-token' }),
      }),
    );
  });
});

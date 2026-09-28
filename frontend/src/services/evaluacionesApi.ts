import api from '@/services/api'
import { ApiError } from '@/services/api'
import { createApiOperationSender, OfflineOperationQueue, type OfflineOperation } from '@/services/offlineOperationQueue'
import type { CalculoOnlineResponse, Evaluacion, EvaluationTask, Resultado, ReviewHistoryEntry, ReviewOverview, ScoreComparison, SessionState } from '@/types'

interface PaginatedEvaluaciones {
  results: Evaluacion[]
  page: number
  page_size: number
  total: number
}

export interface EvidenceApiItem {
  id: string;
  type: string;
  metadata: Record<string, unknown>;
  duration_ms?: number;
  size_bytes?: number;
  captured_by: string;
  created_at: string;
  download_url?: string;
}

export type SessionActorRole = 'CHILD' | 'ADULT'

export function getSessionToken(sessionCode: string, actorRole: SessionActorRole): string | undefined {
  return sessionStorage.getItem(`dayc-session-token:${actorRole}:${sessionCode}`) || undefined
}

export function setSessionToken(sessionCode: string, actorRole: SessionActorRole, token: string): void {
  sessionStorage.setItem(`dayc-session-token:${actorRole}:${sessionCode}`, token)
}

interface EvaluationOfflinePayload {
  method: 'POST'
  endpoint: string
  body: Record<string, unknown>
  session_code: string
  actor_role: SessionActorRole
}

function sessionIdentityForToken(token: string | undefined): { sessionCode: string; actorRole: SessionActorRole } | undefined {
  if (typeof sessionStorage === 'undefined' || !token) return undefined

  for (let index = 0; index < sessionStorage.length; index += 1) {
    const key = sessionStorage.key(index)
    const match = key?.match(/^dayc-session-token:(CHILD|ADULT):(.+)$/)
    if (key && match && sessionStorage.getItem(key) === token) {
      return { actorRole: match[1] as SessionActorRole, sessionCode: match[2] }
    }
  }

  return undefined
}

function roleForSession(sessionCode: string, token: string | undefined, fallbackRole: SessionActorRole): SessionActorRole {
  if (!token) return fallbackRole
  const identity = sessionIdentityForToken(token)
  return identity?.sessionCode === sessionCode ? identity.actorRole : fallbackRole
}

function isTransientFailure(error: unknown): boolean {
  return error instanceof TypeError
    || (error instanceof ApiError && (error.status === 408 || error.status === 429 || error.status >= 500))
}

export function sendEvaluacionOfflineOperation(operation: OfflineOperation): Promise<unknown> {
  return createApiOperationSender((queuedOperation) => {
    const payload = queuedOperation.payload as unknown as EvaluationOfflinePayload
    const token = getSessionToken(payload.session_code, payload.actor_role)
    if (!token) throw new ApiError(401, 'La sesion ya no esta disponible para sincronizar esta operacion')
    return `Bearer ${token}`
  })(operation)
}

export const evaluacionesOfflineQueue = new OfflineOperationQueue(sendEvaluacionOfflineOperation)

async function postWithOfflineFallback<T>(
  endpoint: string,
  body: Record<string, unknown>,
  sessionCode: string | undefined,
  actorRole: SessionActorRole,
  token?: string,
): Promise<T> {
  const operationId = crypto.randomUUID()
  try {
    return await api.post<T>(endpoint, body, {
      headers: {
        'Idempotency-Key': operationId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
  } catch (error) {
    if (sessionCode && isTransientFailure(error)) {
      evaluacionesOfflineQueue.enqueue('evaluacion.session-operation', {
        method: 'POST',
        endpoint,
        body,
        session_code: sessionCode,
        actor_role: actorRole,
      }, operationId)
    }
    throw error
  }
}

export const evaluacionesApi = {
  list: async (): Promise<Evaluacion[]> => {
    const data = await api.get<PaginatedEvaluaciones>('/api/evaluaciones/')
    return data.results
  },
  create: (payload: { nino_id: string; minijuegos_config: string[] }) => api.post<Evaluacion>('/api/evaluaciones/', payload),
  get: (id: string) => api.get<Evaluacion>(`/api/evaluaciones/${id}/`),
  currentTask: (id: string) => api.get<EvaluationTask>(`/api/evaluaciones/${id}/current-task/`),
  progress: (id: string) => api.get(`/api/evaluaciones/${id}/progress/`),
  sessionState: (sessionCode: string, token?: string) => api.get<SessionState>(`/api/evaluaciones/session/${sessionCode}/state/`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  completeChildData: (sessionCode: string, payload: Record<string, unknown>, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/complete-child-data/`, { ...payload, expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  acceptConsent: (sessionCode: string, modalities: Record<'logs' | 'screenshots' | 'audio' | 'video', boolean>, assentConfirmed: boolean, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ session_token: string; evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/consent/`, { accepted: true, modalities, assent_confirmed: assentConfirmed, expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  pauseSession: (sessionCode: string, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/pause/`, { expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  resumeSession: (sessionCode: string, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/resume/`, { expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  withdrawSession: (sessionCode: string, reason: string, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/withdraw/`, { reason }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  startSession: (sessionCode: string, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/start/`, { expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'CHILD'), token),
  finishSession: (sessionCode: string, adultObservation: string | undefined, expectedVersion: number, token?: string) =>
    postWithOfflineFallback<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/finish/`, { adult_observation: adultObservation || '', expected_version: expectedVersion }, sessionCode, roleForSession(sessionCode, token, 'ADULT'), token),
  submitEvent: (evaluacionId: string, itemId: string, payload: { event_type: string; event_payload?: Record<string, unknown>; relative_time_ms?: number }, token?: string, idempotencyKey?: string) =>
    api.post<{ id: string; status: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/events/`, payload, {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      }
    }),
  getEvidence: (evaluacionId: string, itemId: string, token?: string) =>
    api.get<EvidenceApiItem[]>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  uploadEvidence: (evaluacionId: string, itemId: string, formData: FormData, token?: string) =>
    api.post<{ id: string; type: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`, formData, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  reviewOverview: (evaluacionId: string) => api.get<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/`),
  reviewItem: (evaluacionId: string, itemId: string, payload: { final_result: string; psychologist_notes?: string; expected_version?: number }) =>
    api.patch<{ item: unknown }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/review/`, payload),
  receiveReview: (evaluacionId: string, expectedVersion?: number) =>
    api.post<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/assignment/receive/`, { expected_version: expectedVersion }),
  assignReview: (evaluacionId: string, payload: { professional_id: string; reason?: string; expected_version?: number }) =>
    api.post<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/assignment/`, payload),
  correctReviewItem: (evaluacionId: string, itemId: string, payload: { final_result: string; correction_reason: string; psychologist_notes?: string; expected_version?: number }) =>
    api.post<{ item: unknown }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/review/correction/`, payload),
  reopenReview: (evaluacionId: string, payload: { reason: string; expected_version?: number }) =>
    api.post<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/reopen/`, payload),
  reviewHistory: (evaluacionId: string) =>
    api.get<ReviewHistoryEntry[]>(`/api/evaluaciones/${evaluacionId}/review/history/`),
  completeReview: (evaluacionId: string) => api.post<{ evaluacion: Evaluacion; resultados: Resultado[]; gdq_global: number | null }>(`/api/evaluaciones/${evaluacionId}/review/complete/`),
  scorePreliminary: (evaluacionId: string) => api.post<{ resultados: Resultado[]; gdq_global: number | null; tipo?: string }>(`/api/evaluaciones/${evaluacionId}/score/preliminary/`),
  scoreValidated: (evaluacionId: string) => api.post<{ resultados: Resultado[]; gdq_global: number | null; tipo?: string }>(`/api/evaluaciones/${evaluacionId}/score/validated/`),
  scoreComparison: (evaluacionId: string) => api.get<ScoreComparison>(`/api/evaluaciones/${evaluacionId}/score/comparison/`),
  submitRespuesta: (
    id: string,
    payload: { item_id: string; resultado: string; tiempo_respuesta_ms: number; expected_version: number; confidence?: number; raw_data?: Record<string, unknown>; source?: string },
    token?: string
  ) => {
    const identity = sessionIdentityForToken(token)
    return postWithOfflineFallback<{ estado: string; version: number; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/respuesta/`, payload, identity?.sessionCode, identity?.actorRole || 'CHILD', token)
  },
  submitAutoResult: (
    id: string,
    itemId: string,
    payload: { resultado: string; expected_version: number; duration_ms?: number; confidence?: number; raw_data?: Record<string, unknown> },
    token?: string
  ) => {
    const identity = sessionIdentityForToken(token)
    return postWithOfflineFallback<{ estado: string; version: number; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/items/${itemId}/auto-result/`, payload, identity?.sessionCode, identity?.actorRole || 'CHILD', token)
  },
  calcularOnline: (edadMeses: number, puntajes: Record<string, number>) =>
    api.post<CalculoOnlineResponse>('/api/evaluaciones/calcular-online/', { edad_meses: edadMeses, puntajes }),
}

export default evaluacionesApi

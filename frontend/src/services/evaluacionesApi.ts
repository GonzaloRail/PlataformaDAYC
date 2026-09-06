import api from '@/services/api'
import type { CalculoOnlineResponse, Evaluacion, EvaluationTask, Resultado, ReviewOverview, ScoreComparison, SessionState } from '@/types'

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

function idempotencyHeaders(): Record<string, string> {
  return { 'Idempotency-Key': crypto.randomUUID() }
}

export type SessionActorRole = 'CHILD' | 'ADULT'

export function getSessionToken(sessionCode: string, actorRole: SessionActorRole): string | undefined {
  return sessionStorage.getItem(`dayc-session-token:${actorRole}:${sessionCode}`) || undefined
}

export function setSessionToken(sessionCode: string, actorRole: SessionActorRole, token: string): void {
  sessionStorage.setItem(`dayc-session-token:${actorRole}:${sessionCode}`, token)
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
    api.post<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/complete-child-data/`, { ...payload, expected_version: expectedVersion }, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  acceptConsent: (sessionCode: string, expectedVersion: number, token?: string) =>
    api.post<{ session_token: string; evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/consent/`, { accepted: true, expected_version: expectedVersion }, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  startSession: (sessionCode: string, expectedVersion: number, token?: string) =>
    api.post<{ evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/start/`, { expected_version: expectedVersion }, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  finishSession: (sessionCode: string, adultObservation: string | undefined, expectedVersion: number, token?: string) =>
    api.post<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/finish/`, { adult_observation: adultObservation || '', expected_version: expectedVersion }, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  submitEvent: (evaluacionId: string, itemId: string, payload: { event_type: string; event_payload?: Record<string, unknown>; relative_time_ms?: number }, token?: string) =>
    api.post<{ id: string; status: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/events/`, payload, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  getEvidence: (evaluacionId: string, itemId: string, token?: string) =>
    api.get<EvidenceApiItem[]>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  uploadEvidence: (evaluacionId: string, itemId: string, formData: FormData, token?: string) =>
    api.post<{ id: string; type: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`, formData, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  reviewOverview: (evaluacionId: string) => api.get<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/`),
  reviewItem: (evaluacionId: string, itemId: string, payload: { final_result: string; psychologist_notes?: string }) =>
    api.patch<{ item: unknown }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/review/`, payload),
  completeReview: (evaluacionId: string) => api.post<{ evaluacion: Evaluacion; resultados: Resultado[]; gdq_global: number | null }>(`/api/evaluaciones/${evaluacionId}/review/complete/`),
  scorePreliminary: (evaluacionId: string) => api.post<{ resultados: Resultado[]; gdq_global: number | null; tipo?: string }>(`/api/evaluaciones/${evaluacionId}/score/preliminary/`),
  scoreValidated: (evaluacionId: string) => api.post<{ resultados: Resultado[]; gdq_global: number | null; tipo?: string }>(`/api/evaluaciones/${evaluacionId}/score/validated/`),
  scoreComparison: (evaluacionId: string) => api.get<ScoreComparison>(`/api/evaluaciones/${evaluacionId}/score/comparison/`),
  submitRespuesta: (
    id: string,
    payload: { item_id: string; resultado: string; tiempo_respuesta_ms: number; expected_version: number; confidence?: number; raw_data?: Record<string, unknown>; source?: string },
    token?: string
  ) => api.post<{ estado: string; version: number; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/respuesta/`, payload, {
      headers: { ...idempotencyHeaders(), ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
  }),
  submitAutoResult: (
    id: string,
    itemId: string,
    payload: { resultado: string; expected_version: number; duration_ms?: number; confidence?: number; raw_data?: Record<string, unknown> },
    token?: string
  ) => api.post<{ estado: string; version: number; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/items/${itemId}/auto-result/`, payload, {
      headers: { ...idempotencyHeaders(), ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
  }),
  calcularOnline: (edadMeses: number, puntajes: Record<string, number>) =>
    api.post<CalculoOnlineResponse>('/api/evaluaciones/calcular-online/', { edad_meses: edadMeses, puntajes }),
}

export default evaluacionesApi

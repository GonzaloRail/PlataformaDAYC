import api from './api'
import type { Evaluacion, EvaluationTask, ReviewOverview, ScoreComparison, SessionState } from '../types'

export const evaluacionesApi = {
  list: () => api.get<Evaluacion[]>('/api/evaluaciones/'),
  create: (payload: { nino_id: string; minijuegos_config: string[] }) => api.post<Evaluacion>('/api/evaluaciones/', payload),
  get: (id: string) => api.get<Evaluacion>(`/api/evaluaciones/${id}/`),
  currentTask: (id: string) => api.get<EvaluationTask>(`/api/evaluaciones/${id}/current-task/`),
  progress: (id: string) => api.get(`/api/evaluaciones/${id}/progress/`),
  sessionState: (sessionCode: string) => api.get<SessionState>(`/api/evaluaciones/session/${sessionCode}/state/`),
  completeChildData: (sessionCode: string, payload: Record<string, unknown>) =>
    api.post<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/complete-child-data/`, payload),
  acceptConsent: (sessionCode: string) =>
    api.post<{ session_token: string; evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/consent/`, { accepted: true }),
  startSession: (sessionCode: string) =>
    api.post<{ evaluacion: Evaluacion; current_task: EvaluationTask }>(`/api/evaluaciones/session/${sessionCode}/start/`),
  finishSession: (sessionCode: string, adultObservation?: string, token?: string) =>
    api.post<{ evaluacion: Evaluacion }>(`/api/evaluaciones/session/${sessionCode}/finish/`, { adult_observation: adultObservation || '' }, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  submitEvent: (evaluacionId: string, itemId: string, payload: { event_type: string; event_payload?: Record<string, unknown>; relative_time_ms?: number }, token?: string) =>
    api.post<{ id: string; status: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/events/`, payload, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  getEvidence: (evaluacionId: string, itemId: string) => 
    api.get<any[]>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`),
  uploadEvidence: (evaluacionId: string, itemId: string, formData: FormData, token?: string) =>
    api.post<{ id: string; type: string }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/evidence/`, formData, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }),
  reviewOverview: (evaluacionId: string) => api.get<ReviewOverview>(`/api/evaluaciones/${evaluacionId}/review/`),
  reviewItem: (evaluacionId: string, itemId: string, payload: { final_result: string; psychologist_notes?: string }) =>
    api.patch<{ item: unknown }>(`/api/evaluaciones/${evaluacionId}/items/${itemId}/review/`, payload),
  completeReview: (evaluacionId: string) => api.post<{ evaluacion: Evaluacion }>(`/api/evaluaciones/${evaluacionId}/review/complete/`),
  scorePreliminary: (evaluacionId: string) => api.post(`/api/evaluaciones/${evaluacionId}/score/preliminary/`),
  scoreValidated: (evaluacionId: string) => api.post(`/api/evaluaciones/${evaluacionId}/score/validated/`),
  scoreComparison: (evaluacionId: string) => api.get<ScoreComparison>(`/api/evaluaciones/${evaluacionId}/score/comparison/`),
  submitRespuesta: (
    id: string,
    payload: { item_id: string; resultado: string; tiempo_respuesta_ms: number; confidence?: number; raw_data?: Record<string, unknown>; source?: string },
    token?: string
  ) => api.post<{ estado: string; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/respuesta/`, payload, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  }),
  submitAutoResult: (
    id: string,
    itemId: string,
    payload: { resultado: string; duration_ms?: number; confidence?: number; raw_data?: Record<string, unknown> },
    token?: string
  ) => api.post<{ estado: string; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string; current_task?: EvaluationTask }>(`/api/evaluaciones/${id}/items/${itemId}/auto-result/`, payload, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  }),
}

export default evaluacionesApi

import type { User, Nino, Evaluacion, EvaluationTask } from '../types'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  authLoading: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  registerPsychologist: (payload: { nombre: string; apellido: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export interface NinoState {
  ninos: Nino[]
  selectedNino: Nino | null
  ninosLoading: boolean
  fetchNinos: () => Promise<void>
  addNino: (data: Omit<Nino, 'id' | 'created_at'>) => Promise<Nino>
  selectNino: (nino: Nino | null) => void
}

export interface EvaluacionState {
  evaluaciones: Evaluacion[]
  currentEvaluacion: Evaluacion | null
  currentTask: EvaluationTask | null
  evalLoading: boolean
  fetchEvaluaciones: () => Promise<void>
  createEvaluacion: (nino_id: string, minijuegos_config: string[]) => Promise<Evaluacion>
  fetchCurrentTask: (evaluacion_id: string) => Promise<EvaluationTask>
  submitRespuesta: (evaluacion_id: string, item_id: string, resultado: string, tiempo_respuesta_ms: number) => Promise<{ estado: string; stop_triggered?: boolean; area_finished?: boolean; evaluation_finished?: boolean; next_area?: string; next_item_id?: string }>
}

export interface AppState {
  notification: { type: 'success' | 'error' | 'info'; message: string } | null
  setNotification: (notification: { type: 'success' | 'error' | 'info'; message: string } | null) => void
}

export type RootStore = AuthState & NinoState & EvaluacionState & AppState

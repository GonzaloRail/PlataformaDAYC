export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Nino {
  id: string;
  nombre: string;
  fecha_nacimiento: string;
  genero?: string;
  padre_tutor?: string;
  escuela?: string;
  nombre_informante?: string;
  relacion_informante?: string;
  periodo_conoce_nino?: string;
  created_at?: string;
}

export interface Evaluacion {
  id: string;
  nino_id: string;
  nino?: Nino;
  psychologist_id: string;
  estado: 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'STOPPED' | 'ARCHIVED' | 'WAITING_CHILD_DATA' | 'WAITING_CONSENT' | 'PENDING_REVIEW' | 'REVIEW_IN_PROGRESS' | 'VALIDATED' | 'CANCELLED';
  edad_meses: number;
  session_code?: string;
  modo_evaluacion?: 'SYNCHRONOUS' | 'DEFERRED' | 'HYBRID';
  current_area?: string;
  current_item_id?: string;
  child_data_completed?: boolean;
  consentimiento_aceptado?: boolean;
  started_at?: string;
  completed_at?: string;
  created_at?: string;
}

export interface Respuesta {
  id: string;
  evaluacion_id: string;
  minijuego_id: string;
  item_id: string;
  resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE';
  tiempo_respuesta_ms: number;
  created_at?: string;
}

export interface Resultado {
  id: string;
  evaluacion_id?: string;
  area: string;
  puntuacion_directa: number;
  puntuacion_estandar?: number | null;
  percentil?: number | null;
  edad_equivalente?: string | null;
  cociente_general_gdq?: number | null;
  created_at?: string;
  tempScore?: number;
  isChanged?: boolean;
}

export interface ActividadEstimulacion {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_minutos: number;
  area?: string;
}

export interface Diagnostico {
  id: string;
  evaluacion_id: string;
  contenido: string;
  modelo_ai: string;
  gdq?: number;
  modificado_por_psicologo: boolean;
  actividades_estimulacion?: ActividadEstimulacion[];
  created_at?: string;
}

export interface EvaluacionWithResults extends Evaluacion {
  resultados?: Resultado[];
  diagnostico?: Diagnostico;
}

export interface EvaluationTask {
  item_id: string;
  numero_item?: number;
  minijuego: string;
  pregunta?: string | null;
  instrucciones: string;
  tipo_interaction: 'visual' | 'audio' | 'text' | 'mixed' | 'gate';
  evaluacion_id?: string;
  area?: string;
  area_index?: number;
  current_task?: string;
  modalidad?: string;
  pantalla_nino?: string;
  actividad_digital?: string | null;
  requiere_evidencia?: boolean;
  tipos_evidencia?: string[];
  auto_validable?: boolean;
  requiere_revision_psicologo?: boolean;
  validation_mode?: 'SYSTEM_AUTO' | 'SYSTEM_ASSISTED_REVIEW' | 'ADULT_REQUIRED';
  estado_item?: string;
  estado_evaluacion?: string;
}

export interface EvaluacionItem {
  id: string;
  evaluacion_id: string;
  item_id: string;
  area: string;
  orden: number;
  modalidad: string;
  pantalla_nino: string;
  estado: string;
  system_result?: 'PASS' | 'FAIL' | 'INCONCLUSIVE' | 'NOT_ADMINISTERED' | null;
  system_confidence?: number | null;
  final_result?: 'PASS' | 'FAIL' | 'INCONCLUSIVE' | 'NOT_ADMINISTERED' | null;
  requires_review: boolean;
  psychologist_notes?: string;
  adult_notes?: string;
  duration_ms?: number | null;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface SessionState {
  evaluacion: Evaluacion;
  child_data_required: boolean;
  consent_required: boolean;
  consent_accepted: boolean;
  session_token?: string | null;
  current_task?: EvaluationTask | null;
}

export interface ReviewOverview {
  evaluacion: Evaluacion;
  items: EvaluacionItem[];
  pending_count: number;
  reviewed_count: number;
}

export interface ScoreComparison {
  total_items_con_resultado_sistema: number;
  comparables: number;
  coincidentes: number;
  corregidos_por_psicologo: number;
  pendientes_revision: number;
  concordancia_porcentual: number;
  items_corregidos: EvaluacionItem[];
}

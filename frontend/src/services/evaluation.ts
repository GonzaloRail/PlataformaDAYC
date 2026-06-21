import api from './api';
import type { Evaluacion, EvaluationTask, Resultado, Diagnostico } from '../types';

export interface CreateEvaluacionParams {
  nino_id: string;
  minijuegos_config: string[];
}

export interface SubmitRespuestaParams {
  evaluacion_id: string;
  item_id: string;
  resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE';
  tiempo_respuesta_ms: number;
}

export interface SubmitRespuestaResult {
  evaluacion_estado: string;
  stop_triggered: boolean;
  regla?: string;
}

export const evaluationService = {
  async create(params: CreateEvaluacionParams): Promise<Evaluacion> {
    return api.post<Evaluacion>('/api/evaluaciones/', params);
  },

  async getById(id: string): Promise<Evaluacion> {
    return api.get<Evaluacion>(`/api/evaluaciones/${id}/`);
  },

  async getCurrentTask(evaluacionId: string): Promise<EvaluationTask> {
    return api.get<EvaluationTask>(`/api/evaluaciones/${evaluacionId}/current-task/`);
  },

  async submitRespuesta(params: SubmitRespuestaParams): Promise<SubmitRespuestaResult> {
    return api.post<SubmitRespuestaResult>(
      `/api/evaluaciones/${params.evaluacion_id}/respuesta/`,
      {
        item_id: params.item_id,
        resultado: params.resultado,
        tiempo_respuesta_ms: params.tiempo_respuesta_ms,
      }
    );
  },

  async getResults(evaluacionId: string): Promise<Resultado[]> {
    return api.get<Resultado[]>(`/api/evaluaciones/${evaluacionId}/resultados/`);
  },

  async calculateScore(evaluacionId: string): Promise<{
    resultados: Resultado[];
    gdq_global: number;
  }> {
    return api.post(`/api/evaluaciones/${evaluacionId}/score/`);
  },

  async generateDiagnostico(
    evaluacionId: string,
    modelo: 'gemini' | 'claude' = 'gemini'
  ): Promise<Diagnostico> {
    return api.post<Diagnostico>(`/api/evaluaciones/${evaluacionId}/diagnostico/`, {
      modelo,
    });
  },

  async updateDiagnostico(
    evaluacionId: string,
    contenido: string
  ): Promise<Diagnostico> {
    return api.patch<Diagnostico>(`/api/evaluaciones/${evaluacionId}/diagnostico/`, {
      contenido,
    });
  },

  async getProgress(evaluacionId: string): Promise<{
    total_items: number;
    completed_items: number;
    current_item: string;
    estado: string;
  }> {
    return api.get(`/api/evaluaciones/${evaluacionId}/progress/`);
  },

  async joinBySessionCode(sessionCode: string): Promise<{
    evaluacion_id: string;
    nino_nombre: string;
  }> {
    return api.post('/api/evaluaciones/join/', { session_code: sessionCode });
  },
};

export default evaluationService;
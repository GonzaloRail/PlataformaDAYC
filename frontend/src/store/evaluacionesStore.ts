import type { StateCreator } from 'zustand'
import evaluacionesApi from '@/services/evaluacionesApi'
import type { RootStore, EvaluacionState } from '@/store/types'

export const createEvaluacionesStore: StateCreator<RootStore, [], [], EvaluacionState> = (set) => ({
  evaluaciones: [],
  currentEvaluacion: null,
  currentTask: null,
  evalLoading: false,

  fetchEvaluaciones: async () => {
    set({ evalLoading: true })
    try {
      const data = await evaluacionesApi.list()
      set({ evaluaciones: data, evalLoading: false })
    } catch (error) {
      set({ evalLoading: false })
      throw error
    }
  },

  createEvaluacion: async (nino_id, minijuegos_config) => {
    const evaluacion = await evaluacionesApi.create({ nino_id, minijuegos_config })
    set((state) => ({ evaluaciones: [...state.evaluaciones, evaluacion], currentEvaluacion: evaluacion }))
    return evaluacion
  },

  fetchCurrentTask: async (evaluacion_id) => {
    const task = await evaluacionesApi.currentTask(evaluacion_id)
    set({ currentTask: task })
    return task
  },

  submitRespuesta: async (evaluacion_id, item_id, resultado, tiempo_respuesta_ms) => {
    const data = await evaluacionesApi.submitRespuesta(evaluacion_id, {
      item_id,
      resultado,
      tiempo_respuesta_ms,
    })
    return data
  },
})

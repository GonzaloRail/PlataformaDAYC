import api from './api'
import type { Nino } from '../types'

export const childrenApi = {
  list: () => api.get<Nino[]>('/api/children/'),
  create: (payload: Omit<Nino, 'id' | 'created_at'>) => api.post<Nino>('/api/children/', payload),
  get: (id: string) => api.get<Nino>(`/api/children/${id}/`),
  update: (id: string, payload: Partial<Nino>) => api.put('/api/children/' + id + '/', payload),
  remove: (id: string) => api.delete(`/api/children/${id}/`),
}

export default childrenApi

import api from '@/services/api'
import type { Nino } from '@/types'

interface PaginatedNinos {
  results: Nino[]
  page: number
  page_size: number
  total: number
}

export const childrenApi = {
  list: async (): Promise<Nino[]> => {
    const data = await api.get<PaginatedNinos>('/api/children/')
    return data.results
  },
  create: (payload: Omit<Nino, 'id' | 'created_at'>) => api.post<Nino>('/api/children/', payload),
  get: (id: string) => api.get<Nino>(`/api/children/${id}/`),
  update: (id: string, payload: Partial<Nino>) => api.put('/api/children/' + id + '/', payload),
  remove: (id: string) => api.delete(`/api/children/${id}/`),
}

export default childrenApi

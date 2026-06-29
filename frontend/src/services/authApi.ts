import api from '@/services/api'
import type { User } from '@/types'

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: User }>('/api/auth/login/', { email, password }),

  registerPsychologist: (payload: { nombre: string; apellido: string; email: string; password: string }) =>
    api.post<{ user: User }>('/api/auth/register/', payload),

  me: () => api.get<{ user: User }>('/api/auth/me/'),

  logout: () => api.post<{ status: string }>('/api/auth/logout/'),
}

export default authApi

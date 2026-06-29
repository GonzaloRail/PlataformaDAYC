import type { StateCreator } from 'zustand'
import authApi from '@/services/authApi'
import type { RootStore, AuthState } from '@/store/types'

export const createAuthStore: StateCreator<RootStore, [], [], AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const data = await authApi.login(email, password)
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  registerPsychologist: async ({ nombre, apellido, email, password }) => {
    set({ isLoading: true })
    try {
      const data = await authApi.registerPsychologist({ nombre, apellido, email, password })
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    } catch {
      // Continue with local logout even if backend request fails
    }

    set({
      user: null,
      isAuthenticated: false,
      ninos: [],
      selectedNino: null,
      evaluaciones: [],
      currentEvaluacion: null,
      currentTask: null,
      notification: null,
    })
  },

  checkAuth: async () => {
    try {
      const data = await authApi.me()
      set({ user: data.user, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },
})

import type { StateCreator } from 'zustand'
import type { RootStore, AppState } from '@/store/types'

export const createUiStore: StateCreator<RootStore, [], [], AppState> = (set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
})

import type { StateCreator } from 'zustand'
import childrenApi from '../services/childrenApi'
import type { RootStore, NinoState } from './types'

export const createChildrenStore: StateCreator<RootStore, [], [], NinoState> = (set) => ({
  ninos: [],
  selectedNino: null,
  ninosLoading: false,

  fetchNinos: async () => {
    set({ ninosLoading: true })
    try {
      const data = await childrenApi.list()
      set({ ninos: data, ninosLoading: false })
    } catch (error) {
      set({ ninosLoading: false })
      throw error
    }
  },

  addNino: async (data) => {
    const nino = await childrenApi.create(data)
    const ninos = await childrenApi.list()
    set({ ninos })
    return nino
  },

  selectNino: (nino) => set({ selectedNino: nino }),
})

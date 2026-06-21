import { create } from 'zustand'
import type { RootStore } from './types'
import { createAuthStore } from './authStore'
import { createChildrenStore } from './childrenStore'
import { createEvaluacionesStore } from './evaluacionesStore'
import { createUiStore } from './uiStore'

export const store = create<RootStore>()((...a) => ({
  ...createAuthStore(...a),
  ...createChildrenStore(...a),
  ...createEvaluacionesStore(...a),
  ...createUiStore(...a),
}))

export type { RootStore } from './types'

import { create } from 'zustand'
import type { RootStore } from '@/store/types'
import { createAuthStore } from '@/store/authStore'
import { createChildrenStore } from '@/store/childrenStore'
import { createEvaluacionesStore } from '@/store/evaluacionesStore'
import { createUiStore } from '@/store/uiStore'

export const store = create<RootStore>()((...a) => ({
  ...createAuthStore(...a),
  ...createChildrenStore(...a),
  ...createEvaluacionesStore(...a),
  ...createUiStore(...a),
}))

export type { RootStore } from '@/store/types'

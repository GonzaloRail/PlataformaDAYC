import { describe, expect, it, vi } from 'vitest'

const { apiGet, toApiUrl } = vi.hoisted(() => ({ apiGet: vi.fn(), toApiUrl: vi.fn((path: string) => `http://api.test${path}`) }))

vi.mock('@/services/api', () => ({
  default: { get: apiGet },
  toApiUrl,
}))

import { lineageApi } from '@/services/lineageApi'

describe('lineageApi', () => {
  it('uses the evaluation lineage and versioned export resources', () => {
    lineageApi.get('evaluation-1')

    expect(apiGet).toHaveBeenCalledWith('/api/evaluaciones/evaluation-1/lineage/')
    expect(lineageApi.exportUrl('evaluation-1')).toBe('http://api.test/api/evaluaciones/evaluation-1/lineage/export/')
  })
})

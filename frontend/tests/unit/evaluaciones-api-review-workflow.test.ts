import { describe, expect, it, vi } from 'vitest'

const { apiGet, apiPost } = vi.hoisted(() => ({ apiGet: vi.fn(), apiPost: vi.fn() }))

vi.mock('@/services/api', () => ({ default: { get: apiGet, post: apiPost } }))

import { evaluacionesApi } from '@/services/evaluacionesApi'

describe('evaluacionesApi review workflow', () => {
  it('uses the versioned Phase 7 review workflow resources', () => {
    evaluacionesApi.receiveReview('evaluation-1', 3)
    evaluacionesApi.assignReview('evaluation-1', { professional_id: 'professional-1', reason: 'Especialidad', expected_version: 4 })
    evaluacionesApi.correctReviewItem('evaluation-1', 'A-1', { final_result: 'FAIL', correction_reason: 'La evidencia contradice el resultado', expected_version: 5 })
    evaluacionesApi.reopenReview('evaluation-1', { reason: 'Nueva evidencia', expected_version: 6 })
    evaluacionesApi.reviewHistory('evaluation-1')

    expect(apiPost).toHaveBeenNthCalledWith(1, '/api/evaluaciones/evaluation-1/review/assignment/receive/', { expected_version: 3 })
    expect(apiPost).toHaveBeenNthCalledWith(2, '/api/evaluaciones/evaluation-1/review/assignment/', { professional_id: 'professional-1', reason: 'Especialidad', expected_version: 4 })
    expect(apiPost).toHaveBeenNthCalledWith(3, '/api/evaluaciones/evaluation-1/items/A-1/review/correction/', expect.objectContaining({ expected_version: 5 }))
    expect(apiPost).toHaveBeenNthCalledWith(4, '/api/evaluaciones/evaluation-1/review/reopen/', { reason: 'Nueva evidencia', expected_version: 6 })
    expect(apiGet).toHaveBeenCalledWith('/api/evaluaciones/evaluation-1/review/history/')
  })
})

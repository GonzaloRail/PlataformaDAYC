import { describe, expect, it } from 'vitest'
import { buildOfflineSyncSummary } from '@/components/child/OfflineSyncStatus'
import type { OfflineOperationQueueStatusView } from '@/hooks/useOfflineOperationQueueStatus'

const status: OfflineOperationQueueStatusView = {
  operations: [
    { operation_id: 'pending', type: 'operation', payload: { session_code: 'CHILD-1' }, state: 'PENDING', created_at: '', updated_at: '', attempts: 0, next_attempt_at: 0 },
    { operation_id: 'conflict', type: 'operation', payload: { session_code: 'CHILD-1' }, state: 'CONFLICT', created_at: '', updated_at: '', attempts: 0, next_attempt_at: 0 },
    { operation_id: 'failed', type: 'operation', payload: { session_code: 'CHILD-2' }, state: 'FAILED_PERMANENTLY', created_at: '', updated_at: '', attempts: 0, next_attempt_at: 0 },
  ],
  pendingCount: 1,
  conflictCount: 1,
  failedCount: 1,
  isSending: false,
  conflicts: [],
  failures: [],
  hasConflicts: true,
}

describe('buildOfflineSyncSummary', () => {
  it('only exposes operations belonging to the active session', () => {
    expect(buildOfflineSyncSummary(status, 'CHILD-1')).toEqual({ pendingCount: 1, conflictCount: 1, failedCount: 0, isSending: false })
  })

  it('includes all operations when there is no session filter', () => {
    expect(buildOfflineSyncSummary(status)).toEqual({ pendingCount: 1, conflictCount: 1, failedCount: 1, isSending: false })
  })
})

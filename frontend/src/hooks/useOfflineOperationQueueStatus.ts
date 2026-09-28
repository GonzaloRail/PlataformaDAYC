import { useSyncExternalStore } from 'react';
import type { OfflineOperation, OfflineOperationQueue, OfflineOperationQueueStatus } from '@/services/offlineOperationQueue';

export interface OfflineOperationQueueStatusView extends OfflineOperationQueueStatus {
  conflicts: readonly OfflineOperation[];
  failures: readonly OfflineOperation[];
  hasConflicts: boolean;
}

const emptyStatus: OfflineOperationQueueStatus = {
  operations: [],
  pendingCount: 0,
  conflictCount: 0,
  failedCount: 0,
  isSending: false,
};

export function buildOfflineOperationQueueStatusView(status: OfflineOperationQueueStatus): OfflineOperationQueueStatusView {
  const conflicts = status.operations.filter((operation) => operation.state === 'CONFLICT');
  const failures = status.operations.filter((operation) => (
    operation.state === 'FAILED_PERMANENTLY' || operation.state === 'QUARANTINED'
  ));

  return { ...status, conflicts, failures, hasConflicts: conflicts.length > 0 };
}

export function useOfflineOperationQueueStatus(queue?: OfflineOperationQueue): OfflineOperationQueueStatusView {
  const status = useSyncExternalStore(
    (listener) => queue ? queue.subscribe(listener) : () => undefined,
    () => queue?.getStatus() ?? emptyStatus,
    () => emptyStatus,
  );
  return buildOfflineOperationQueueStatusView(status);
}

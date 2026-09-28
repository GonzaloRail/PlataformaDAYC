import { useEffect, useSyncExternalStore } from 'react'
import { useOfflineOperationQueueStatus, type OfflineOperationQueueStatusView } from '@/hooks/useOfflineOperationQueueStatus'
import type { OfflineOperationQueue } from '@/services/offlineOperationQueue'
import './OfflineSyncStatus.css'

interface OfflineSyncStatusProps {
  queue: OfflineOperationQueue
  sessionCode?: string
}

interface OfflineSyncSummary {
  pendingCount: number
  conflictCount: number
  failedCount: number
  isSending: boolean
}

function subscribeToConnection(listener: () => void) {
  window.addEventListener('online', listener)
  window.addEventListener('offline', listener)
  return () => {
    window.removeEventListener('online', listener)
    window.removeEventListener('offline', listener)
  }
}

function getConnectionStatus() {
  return navigator.onLine
}

function getServerConnectionStatus() {
  return true
}

function belongsToSession(operation: OfflineOperationQueueStatusView['operations'][number], sessionCode?: string) {
  return !sessionCode || operation.payload.session_code === sessionCode
}

export function buildOfflineSyncSummary(status: OfflineOperationQueueStatusView, sessionCode?: string): OfflineSyncSummary {
  return status.operations.reduce<OfflineSyncSummary>((summary, operation) => {
    if (!belongsToSession(operation, sessionCode)) return summary
    if (operation.state === 'LOCAL' || operation.state === 'PENDING' || operation.state === 'SENDING') summary.pendingCount += 1
    if (operation.state === 'SENDING') summary.isSending = true
    if (operation.state === 'CONFLICT') summary.conflictCount += 1
    if (operation.state === 'FAILED_PERMANENTLY' || operation.state === 'QUARANTINED') summary.failedCount += 1
    return summary
  }, { pendingCount: 0, conflictCount: 0, failedCount: 0, isSending: false })
}

export function OfflineSyncStatus({ queue, sessionCode }: OfflineSyncStatusProps) {
  const isOnline = useSyncExternalStore(subscribeToConnection, getConnectionStatus, getServerConnectionStatus)
  const status = useOfflineOperationQueueStatus(queue)
  const { pendingCount, conflictCount, failedCount, isSending } = buildOfflineSyncSummary(status, sessionCode)
  const needsAttention = conflictCount > 0 || failedCount > 0

  useEffect(() => {
    if (pendingCount === 0) return

    const warnBeforeClose = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnBeforeClose)
    return () => window.removeEventListener('beforeunload', warnBeforeClose)
  }, [pendingCount])

  return (
    <aside className={`offline-sync-status${needsAttention ? ' offline-sync-status-attention' : ''}`} aria-live="polite">
      <span className="offline-sync-connection" data-online={isOnline}>
        <i aria-hidden="true" />
        {isOnline ? (isSending ? 'Sincronizando' : 'Conectado') : 'Sin conexión'}
      </span>
      {pendingCount > 0 && <span>{pendingCount} operación{pendingCount === 1 ? '' : 'es'} pendiente{pendingCount === 1 ? '' : 's'}</span>}
      {conflictCount > 0 && <span>{conflictCount} conflicto{conflictCount === 1 ? '' : 's'} por revisar</span>}
      {failedCount > 0 && <span>{failedCount} error{failedCount === 1 ? '' : 'es'} de sincronización</span>}
      {pendingCount > 0 && <small>No cierres la sesión hasta que termine la sincronización.</small>}
    </aside>
  )
}

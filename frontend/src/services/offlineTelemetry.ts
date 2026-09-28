export type OfflineTelemetryEventName =
  | 'offline.queue.backlog'
  | 'offline.queue.retry'
  | 'offline.queue.conflict'
  | 'offline.queue.recovered'
  | 'offline.queue.converged'
  | 'offline.recovery.completed';

export interface OfflineTelemetryEvent {
  name: OfflineTelemetryEventName;
  operationId?: string;
  attributes: Record<string, string | number | boolean | undefined>;
}

export type OfflineTelemetryReporter = (event: OfflineTelemetryEvent) => void;

const listeners = new Set<OfflineTelemetryReporter>();

export function reportOfflineTelemetry(event: OfflineTelemetryEvent): void {
  listeners.forEach((listener) => listener(event));
}

export function subscribeOfflineTelemetry(listener: OfflineTelemetryReporter): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

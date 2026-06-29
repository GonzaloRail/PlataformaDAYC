import type { EvidencePayload } from './EvidenceUploadQueue';

export interface EvidenceEventPayload {
  eventType: string;
  payload: Record<string, unknown>;
  relativeTimeMs?: number;
}

export interface EvidenceSink {
  uploadEvidence: (payload: EvidencePayload) => Promise<void> | void;
  recordEvent: (event: EvidenceEventPayload) => Promise<void> | void;
  flush?: () => Promise<void> | void;
}

export interface LabEvidenceRecord {
  id: string;
  type: EvidencePayload['type'] | 'EVENT';
  metadata?: Record<string, unknown>;
  file?: Blob;
  objectUrl?: string;
  fileName?: string;
  durationMs?: number;
  sizeBytes?: number;
  capturedBy?: string;
  createdAt: string;
}

export function createMemoryEvidenceSink(onRecord: (record: LabEvidenceRecord) => void): EvidenceSink {
  return {
    uploadEvidence: (payload) => {
      const objectUrl = payload.file ? URL.createObjectURL(payload.file) : undefined;
      onRecord({
        id: crypto.randomUUID(),
        type: payload.type,
        metadata: payload.metadata,
        file: payload.file,
        objectUrl,
        fileName: payload.fileName,
        durationMs: payload.durationMs,
        sizeBytes: payload.sizeBytes ?? payload.file?.size,
        capturedBy: payload.capturedBy,
        createdAt: new Date().toISOString(),
      });
    },
    recordEvent: (event) => {
      onRecord({
        id: crypto.randomUUID(),
        type: 'EVENT',
        metadata: {
          event_type: event.eventType,
          relative_time_ms: event.relativeTimeMs,
          ...event.payload,
        },
        createdAt: new Date().toISOString(),
      });
    },
  };
}

export function revokeLabEvidenceRecords(records: LabEvidenceRecord[]) {
  records.forEach((record) => {
    if (record.objectUrl) URL.revokeObjectURL(record.objectUrl);
  });
}

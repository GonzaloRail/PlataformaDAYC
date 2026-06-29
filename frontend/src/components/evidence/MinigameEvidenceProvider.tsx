import { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';
import type { EvaluationTask } from '@/types';
import evaluacionesApi from '@/services/evaluacionesApi';
import { evidenceUploadQueue, uploadEvidenceNow } from '@/components/evidence/EvidenceUploadQueue';
import type { EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';
import type { EvidenceSink } from '@/components/evidence/EvidenceSink';

type EvidenceType = EvidencePayload['type'];

interface UploadEvidenceOptions {
  metadata?: Record<string, unknown>;
  durationMs?: number;
  capturedBy?: string;
  fileName?: string;
}

interface MinigameEvidenceApi {
  enabled: boolean;
  task?: EvaluationTask;
  recordLog: (metadata: Record<string, unknown>, durationMs?: number) => void;
  recordEvent: (eventType: string, payload?: Record<string, unknown>) => void;
  uploadBlob: (type: EvidenceType, blob: Blob, options?: UploadEvidenceOptions) => Promise<boolean>;
  uploadCanvasSnapshot: (canvas: HTMLCanvasElement | null, metadata?: Record<string, unknown>) => Promise<boolean>;
  uploadContainerScreenshot: (container: HTMLElement | null, metadata?: Record<string, unknown>) => Promise<boolean>;
  hasEvidenceType: (type: EvidenceType) => boolean;
  flushMedia: () => Promise<void>;
}

interface MinigameEvidenceProviderProps {
  task: EvaluationTask;
  sessionToken?: string;
  sink?: EvidenceSink;
  flushMedia?: () => Promise<void>;
  children: ReactNode;
}

const noopFlushMedia = async () => undefined;

const noopEvidenceApi: MinigameEvidenceApi = {
  enabled: false,
  recordLog: () => undefined,
  recordEvent: () => undefined,
  uploadBlob: async () => false,
  uploadCanvasSnapshot: async () => false,
  uploadContainerScreenshot: async () => false,
  hasEvidenceType: () => false,
  flushMedia: noopFlushMedia,
};

const MinigameEvidenceContext = createContext<MinigameEvidenceApi>(noopEvidenceApi);

function sanitizeMetadata(metadata: Record<string, unknown> = {}) {
  return {
    ...metadata,
    captured_at: new Date().toISOString(),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export function MinigameEvidenceProvider({ task, sessionToken, sink, flushMedia, children }: MinigameEvidenceProviderProps) {
  const startedAtRef = useRef(Date.now());
  const canUpload = Boolean(sink || (task.evaluacion_id && task.item_id && sessionToken));

  const allowedTypes = useMemo(() => {
    if (!task.tipos_evidencia || task.tipos_evidencia.length === 0) return null;
    return new Set(task.tipos_evidencia);
  }, [task.tipos_evidencia]);

  const isTypeAllowed = useCallback((type: string) => {
    if (!allowedTypes) return true;
    return allowedTypes.has(type);
  }, [allowedTypes]);

  const warnUploadDisabled = useCallback((action: string) => {
    if (task.evaluacion_id && task.item_id && !sessionToken) {
      console.warn(`Evidencia no subida (${action}): falta sessionToken para ${task.item_id}.`);
    }
  }, [sessionToken, task.evaluacion_id, task.item_id]);

  const warnTypeDisabled = useCallback((action: string, type: string) => {
    console.warn(`Evidencia no registrada (${action}): tipo "${type}" no esta en tipos_evidencia para ${task.item_id}.`);
  }, [task.item_id]);

  const relativeTime = useCallback(() => Date.now() - startedAtRef.current, []);

  const recordLog = useCallback((metadata: Record<string, unknown>, durationMs?: number) => {
    if (!isTypeAllowed('LOG')) {
      warnTypeDisabled('LOG', 'LOG');
      return;
    }
    if (!canUpload || (!sink && !task.evaluacion_id)) {
      warnUploadDisabled('LOG');
      return;
    }

    const payload: EvidencePayload = {
      evaluacionId: task.evaluacion_id || 'lab-evaluacion',
      itemId: task.item_id,
      type: 'LOG',
      metadata: sanitizeMetadata({
        activity: task.actividad_digital || task.minijuego || task.item_id,
        item_id: task.item_id,
        ...metadata,
      }),
      durationMs: durationMs ?? relativeTime(),
      capturedBy: 'CHILD_DEVICE',
      sessionToken,
    };

    if (sink) {
      void sink.uploadEvidence(payload);
      return;
    }

    evidenceUploadQueue.add(payload);
  }, [canUpload, isTypeAllowed, relativeTime, sessionToken, sink, task.actividad_digital, task.evaluacion_id, task.item_id, task.minijuego, warnTypeDisabled, warnUploadDisabled]);

  const recordEvent = useCallback((eventType: string, payload: Record<string, unknown> = {}) => {
    if (!isTypeAllowed('TIME_EVENT') && !isTypeAllowed('EVENT')) {
      warnTypeDisabled(eventType, 'TIME_EVENT/EVENT');
      return;
    }
    if (!canUpload || (!sink && !task.evaluacion_id)) {
      warnUploadDisabled(eventType);
      return;
    }

    const elapsed = relativeTime();
    const eventPayload = sanitizeMetadata({
      activity: task.actividad_digital || task.minijuego || task.item_id,
      item_id: task.item_id,
      ...payload,
    });

    if (sink) {
      void sink.recordEvent({ eventType, payload: eventPayload, relativeTimeMs: elapsed });
      return;
    }

    const evaluacionId = task.evaluacion_id;
    if (!evaluacionId) return;

    void evaluacionesApi.submitEvent(evaluacionId, task.item_id, {
      event_type: eventType,
      relative_time_ms: elapsed,
      event_payload: eventPayload,
    }, sessionToken).catch((error) => {
      console.warn('No se pudo registrar evento de minijuego:', error);
    });
  }, [canUpload, isTypeAllowed, relativeTime, sessionToken, sink, task.actividad_digital, task.evaluacion_id, task.item_id, task.minijuego, warnTypeDisabled, warnUploadDisabled]);

  const uploadBlob = useCallback(async (type: EvidenceType, blob: Blob, options: UploadEvidenceOptions = {}) => {
    if (!isTypeAllowed(type)) {
      warnTypeDisabled(type + ' upload', type);
      return false;
    }
    if (!canUpload || (!sink && !task.evaluacion_id)) {
      warnUploadDisabled(type);
      return false;
    }

    const payload: EvidencePayload = {
      evaluacionId: task.evaluacion_id || 'lab-evaluacion',
      itemId: task.item_id,
      type,
      file: blob,
      fileName: options.fileName,
      metadata: sanitizeMetadata({
        activity: task.actividad_digital || task.minijuego || task.item_id,
        item_id: task.item_id,
        file_name: options.fileName,
        ...options.metadata,
      }),
      durationMs: options.durationMs ?? relativeTime(),
      sizeBytes: blob.size,
      capturedBy: options.capturedBy || 'CHILD_DEVICE',
      sessionToken,
    };

    if (sink) {
      await sink.uploadEvidence(payload);
      return true;
    }

    try {
      await uploadEvidenceNow(payload);
      return true;
    } catch (error) {
      console.error('No se pudo subir evidencia critica. Se deja en cola para reintento:', error);
      evidenceUploadQueue.add(payload);
      return false;
    }
  }, [canUpload, isTypeAllowed, relativeTime, sessionToken, sink, task.actividad_digital, task.evaluacion_id, task.item_id, task.minijuego, warnTypeDisabled, warnUploadDisabled]);

  const uploadCanvasSnapshot = useCallback(async (canvas: HTMLCanvasElement | null, metadata: Record<string, unknown> = {}) => {
    if (!isTypeAllowed('SCREENSHOT')) {
      warnTypeDisabled('uploadCanvasSnapshot', 'SCREENSHOT');
      return false;
    }
    if (!canvas) {
      recordLog({ event: 'CANVAS_SNAPSHOT_NOT_AVAILABLE', ...metadata });
      return false;
    }

    const blob = await canvasToBlob(canvas);
    if (!blob) {
      recordLog({ event: 'CANVAS_SNAPSHOT_FAILED', ...metadata });
      return false;
    }

    return uploadBlob('SCREENSHOT', blob, {
      fileName: `${task.item_id}-canvas.png`,
      metadata: {
        evidence_role: 'canvas_snapshot',
        canvas_width: canvas.width,
        canvas_height: canvas.height,
        ...metadata,
      },
    });
  }, [isTypeAllowed, recordLog, task.item_id, uploadBlob, warnTypeDisabled]);

  const uploadContainerScreenshot = useCallback(async (container: HTMLElement | null, metadata: Record<string, unknown> = {}) => {
    if (!isTypeAllowed('SCREENSHOT')) {
      warnTypeDisabled('uploadContainerScreenshot', 'SCREENSHOT');
      return false;
    }
    if (!container) {
      recordLog({ event: 'CONTAINER_NOT_AVAILABLE', ...metadata });
      return false;
    }

    const dynamicImport = new Function('m', 'return import(m)') as (m: string) => Promise<{ default: (el: HTMLElement, options?: object) => Promise<HTMLCanvasElement> }>;
    let html2canvasFn: ((el: HTMLElement, options?: object) => Promise<HTMLCanvasElement>) | null = null;
    try {
      const mod = await dynamicImport('html2canvas');
      html2canvasFn = mod.default;
    } catch (err) {
      recordLog({ event: 'HTML2CANVAS_LOAD_FAILED', error: String(err), ...metadata });
      return false;
    }

    try {
      const canvas = await html2canvasFn(container, { backgroundColor: '#fffdf7', scale: 1 });
      const blob = await canvasToBlob(canvas);
      if (!blob) {
        recordLog({ event: 'SCREENSHOT_TOBLOB_NULL', ...metadata });
        return false;
      }
      return await uploadBlob('SCREENSHOT', blob, {
        fileName: `${task.item_id}-container.png`,
        metadata: {
          evidence_role: 'container_screenshot',
          ...metadata,
        },
      });
    } catch (err) {
      recordLog({ event: 'CONTAINER_SCREENSHOT_FAILED', error: String(err), ...metadata });
      return false;
    }
  }, [isTypeAllowed, recordLog, task.item_id, uploadBlob, warnTypeDisabled]);

  const hasEvidenceType = useCallback((type: EvidenceType) => isTypeAllowed(type), [isTypeAllowed]);

  const flushMediaFn = useCallback(async () => {
    if (flushMedia) {
      try {
        await flushMedia();
      } catch (err) {
        console.warn('flushMedia falló:', err);
      }
    }
  }, [flushMedia]);

  const value = useMemo<MinigameEvidenceApi>(() => ({
    enabled: canUpload,
    task,
    recordLog,
    recordEvent,
    uploadBlob,
    uploadCanvasSnapshot,
    uploadContainerScreenshot,
    hasEvidenceType,
    flushMedia: flushMediaFn,
  }), [canUpload, flushMediaFn, hasEvidenceType, recordEvent, recordLog, task, uploadBlob, uploadCanvasSnapshot, uploadContainerScreenshot]);

  return (
    <MinigameEvidenceContext.Provider value={value}>
      {children}
    </MinigameEvidenceContext.Provider>
  );
}

export function useMinigameEvidence() {
  return useContext(MinigameEvidenceContext);
}

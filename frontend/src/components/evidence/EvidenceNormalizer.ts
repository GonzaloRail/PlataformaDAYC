import { getEvidenceDefinition } from '@/components/evidence/EvidenceRegistry';
import type { EvidenceType } from '@/components/evidence/EvidenceRegistry';

export interface RawEvidenceLike {
  id: string;
  type: string;
  metadata?: Record<string, any>;
  duration_ms?: number;
  durationMs?: number;
  size_bytes?: number;
  sizeBytes?: number;
  captured_by?: string;
  capturedBy?: string;
  created_at?: string;
  createdAt?: string;
  download_url?: string;
  objectUrl?: string;
  fileName?: string;
}

export interface NormalizedEvidence {
  id: string;
  type: EvidenceType;
  label: string;
  shortLabel: string;
  title: string;
  clinicalSummary: string;
  keyDetails: Array<{ label: string; value: string }>;
  technicalDetails: Record<string, unknown>;
  capturedAt?: string;
  capturedBy?: string;
  durationMs?: number;
  sizeBytes?: number;
  downloadUrl?: string;
  objectUrl?: string;
  fileName?: string;
  preview: 'image' | 'audio' | 'video' | 'timeline' | 'summary';
}

const activityLabels: Record<string, string> = {
  COGNITIVO_045: 'Imita el dibujo de una cara',
  COGNITIVO_046: 'Clasifica animales y juguetes',
};

const eventLabels: Record<string, string> = {
  EVIDENCE_SESSION_STARTED: 'Inicio de registro de evidencias',
  MEDIA_NOT_SUPPORTED: 'El dispositivo no soporta esta evidencia',
  MEDIA_PERMISSION_FAILED: 'Permiso de camara o microfono denegado',
  DRAWING_FINISHED: 'Dibujo finalizado',
  DRAWING_CLEARED: 'Dibujo borrado',
  COG045_DRAWING_CLEARED: 'El niño borró el dibujo',
  COG045_DRAWING_FINISHED: 'El niño finalizó el dibujo',
  COG046_OBJECT_MOVED: 'Objeto clasificado',
  COG046_CLASSIFICATION_FINISHED: 'Clasificación finalizada',
  CLASSIFICATION_FINISHED: 'Clasificación finalizada',
};

function formatDuration(ms?: number) {
  if (!ms && ms !== 0) return undefined;
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

function formatBytes(size?: number) {
  if (!size) return undefined;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleString();
}

function cleanValue(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value ? 'Si' : 'No';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  return undefined;
}

function getActivityName(metadata: Record<string, any>) {
  const id = metadata.activity || metadata.activity_id || metadata.minijuego_id || metadata.item_id;
  return activityLabels[id] || id || 'Actividad';
}

function getEventName(metadata: Record<string, any>) {
  const raw = metadata.event || metadata.event_type || metadata.action;
  return eventLabels[raw] || raw;
}

function buildClinicalSummary(type: string, metadata: Record<string, any>, definitionLabel: string) {
  const activityName = getActivityName(metadata);
  const eventName = getEventName(metadata);

  if (type === 'SCREENSHOT') {
    if (metadata.evidence_role === 'full_activity_screenshot') {
      return `Captura final de ${activityName}, incluyendo el modelo y la respuesta del niño.`;
    }
    return `Imagen registrada durante ${activityName}.`;
  }

  if (type === 'VIDEO') return `Video registrado durante ${activityName}.`;
  if (type === 'AUDIO') return `Audio registrado durante ${activityName}.`;
  if (type === 'CAMERA_FRAME') return `Foto de camara registrada durante ${activityName}.`;
  if (type === 'SYSTEM_RESULT') return 'Resultado preliminar generado por el sistema para revisión profesional.';
  if (eventName) return `${definitionLabel}: ${eventName}.`;
  return `${definitionLabel} registrado durante ${activityName}.`;
}

export function normalizeEvidence(raw: RawEvidenceLike): NormalizedEvidence {
  const metadata = raw.metadata || {};
  const definition = getEvidenceDefinition(raw.type);
  const capturedAt = raw.created_at || raw.createdAt || metadata.captured_at;
  const capturedBy = raw.captured_by || raw.capturedBy || metadata.captured_by;
  const durationMs = raw.duration_ms ?? raw.durationMs ?? metadata.duration_ms ?? metadata.durationMs;
  const sizeBytes = raw.size_bytes ?? raw.sizeBytes;
  const eventName = getEventName(metadata);
  const activityName = getActivityName(metadata);
  const title = eventName || (raw.type === 'SCREENSHOT' && metadata.evidence_role === 'full_activity_screenshot'
    ? 'Captura final de la actividad'
    : definition.label);

  const details: Array<{ label: string; value: string }> = [];
  const pushDetail = (label: string, value: unknown) => {
    const cleaned = cleanValue(value);
    if (cleaned) details.push({ label, value: cleaned });
  };

  pushDetail('Actividad', activityName);
  pushDetail('Momento', formatDate(capturedAt));
  pushDetail('Duración', formatDuration(Number(durationMs)));
  pushDetail('Tamaño', formatBytes(sizeBytes));
  pushDetail('Origen', capturedBy === 'CHILD_DEVICE' ? 'Dispositivo del niño' : capturedBy === 'ADULT_DEVICE' ? 'Dispositivo del adulto' : capturedBy);
  pushDetail('Trazos', metadata.strokeCount);
  pushDetail('Aciertos', metadata.correctPlacements !== undefined && metadata.totalObjects !== undefined ? `${metadata.correctPlacements} de ${metadata.totalObjects}` : undefined);
  pushDetail('Movimientos', metadata.moveCount);
  pushDetail('Incluye modelo', metadata.includes_model_face);
  pushDetail('Incluye respuesta', metadata.includes_child_drawing);
  pushDetail('Incluye audio', metadata.audio_included);

  return {
    id: raw.id,
    type: raw.type as EvidenceType,
    label: definition.label,
    shortLabel: definition.shortLabel,
    title,
    clinicalSummary: buildClinicalSummary(raw.type, metadata, definition.label),
    keyDetails: details,
    technicalDetails: metadata,
    capturedAt,
    capturedBy,
    durationMs: typeof durationMs === 'number' ? durationMs : Number(durationMs) || undefined,
    sizeBytes,
    downloadUrl: raw.download_url,
    objectUrl: raw.objectUrl,
    fileName: raw.fileName || metadata.file_name,
    preview: definition.preview,
  };
}

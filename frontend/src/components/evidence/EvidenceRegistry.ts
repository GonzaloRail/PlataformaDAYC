import type { EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';

export type EvidenceType = EvidencePayload['type'] | 'EVENT';

export interface EvidenceTypeDefinition {
  label: string;
  shortLabel: string;
  description: string;
  permission: 'none' | 'microphone' | 'camera' | 'camera_microphone';
  preview: 'image' | 'audio' | 'video' | 'timeline' | 'summary';
}

export const EVIDENCE_REGISTRY: Record<EvidenceType, EvidenceTypeDefinition> = {
  LOG: {
    label: 'Registro de actividad',
    shortLabel: 'Log',
    description: 'Resumen estructurado de lo que ocurrió durante la actividad.',
    permission: 'none',
    preview: 'summary',
  },
  TIME_EVENT: {
    label: 'Evento de interacción',
    shortLabel: 'Evento',
    description: 'Marca temporal de una acción importante durante la actividad.',
    permission: 'none',
    preview: 'timeline',
  },
  EVENT: {
    label: 'Evento de interacción',
    shortLabel: 'Evento',
    description: 'Acción registrada en el laboratorio de pruebas.',
    permission: 'none',
    preview: 'timeline',
  },
  SCREENSHOT: {
    label: 'Captura visual',
    shortLabel: 'Captura',
    description: 'Imagen del estado relevante de la actividad.',
    permission: 'none',
    preview: 'image',
  },
  AUDIO: {
    label: 'Grabación de audio',
    shortLabel: 'Audio',
    description: 'Audio registrado durante la actividad.',
    permission: 'microphone',
    preview: 'audio',
  },
  VIDEO: {
    label: 'Grabación de video',
    shortLabel: 'Video',
    description: 'Video registrado durante la actividad, normalmente con audio incluido.',
    permission: 'camera_microphone',
    preview: 'video',
  },
  CAMERA_FRAME: {
    label: 'Foto de cámara',
    shortLabel: 'Foto',
    description: 'Imagen fija capturada desde la cámara.',
    permission: 'camera',
    preview: 'image',
  },
  SYSTEM_RESULT: {
    label: 'Resultado preliminar',
    shortLabel: 'Resultado',
    description: 'Resultado sugerido por el sistema antes de la revisión profesional.',
    permission: 'none',
    preview: 'summary',
  },
};

export function getEvidenceDefinition(type: string): EvidenceTypeDefinition {
  return EVIDENCE_REGISTRY[type as EvidenceType] || {
    label: type,
    shortLabel: type,
    description: 'Evidencia registrada por el sistema.',
    permission: 'none',
    preview: 'summary',
  };
}

import { evaluacionesApi } from '../../services/evaluacionesApi';

export interface EvidencePayload {
  evaluacionId: string;
  itemId: string;
  type: 'LOG' | 'TIME_EVENT' | 'SCREENSHOT' | 'AUDIO' | 'VIDEO' | 'CAMERA_FRAME' | 'SYSTEM_RESULT';
  file?: Blob;
  metadata?: Record<string, unknown>;
  durationMs?: number;
  sizeBytes?: number;
  capturedBy?: string;
  sessionToken?: string;
  fileName?: string;
}

function buildEvidenceFormData(payload: EvidencePayload): FormData {
  const formData = new FormData();
  formData.append('type', payload.type);
  if (payload.file) {
    formData.append('file', payload.file, payload.fileName || 'evidence-file');
  }
  if (payload.metadata) {
    formData.append('metadata', JSON.stringify(payload.metadata));
  }
  if (payload.durationMs !== undefined) formData.append('duration_ms', payload.durationMs.toString());
  if (payload.sizeBytes !== undefined) formData.append('size_bytes', payload.sizeBytes.toString());
  if (payload.capturedBy) formData.append('captured_by', payload.capturedBy);

  return formData;
}

export async function uploadEvidenceNow(payload: EvidencePayload) {
  const formData = buildEvidenceFormData(payload);
  return evaluacionesApi.uploadEvidence(payload.evaluacionId, payload.itemId, formData, payload.sessionToken);
}

class UploadQueue {
  private queue: EvidencePayload[] = [];
  private isUploading = false;

  add(payload: EvidencePayload) {
    this.queue.push(payload);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isUploading || this.queue.length === 0) return;
    this.isUploading = true;

    while (this.queue.length > 0) {
      const payload = this.queue[0];
      try {
        await uploadEvidenceNow(payload);
        // Eliminado exitosamente de la cola
        this.queue.shift();
      } catch (error) {
        console.error('Error uploading evidence:', error);
        // Si hay error, esperar un poco antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Rompemos el loop para que no se quede bloqueado eternamente;
        // processQueue se llamará de nuevo si se añaden más o podemos re-llamar.
        break;
      }
    }

    this.isUploading = false;
    
    if (this.queue.length > 0) {
       // Hay pendientes (probablemente hubo error), reintentar en 10 seg
       setTimeout(() => this.processQueue(), 10000);
    }
  }
}

export const evidenceUploadQueue = new UploadQueue();

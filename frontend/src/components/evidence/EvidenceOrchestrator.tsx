import { ReactNode, useCallback, useMemo } from 'react';
import type { EvaluationTask } from '@/types';
import { evidenceUploadQueue, uploadEvidenceNow } from '@/components/evidence/EvidenceUploadQueue';
import type { EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';
import { MinigameEvidenceProvider } from '@/components/evidence/MinigameEvidenceProvider';
import type { EvidenceSink } from '@/components/evidence/EvidenceSink';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import { useMediaCapture, MIN_MEDIA_EVIDENCE_DURATION_MS } from '@/components/evidence/useMediaCapture';
import './EvidenceOrchestrator.css';

interface EvidenceOrchestratorProps {
  task: EvaluationTask;
  sessionToken?: string;
  sink?: EvidenceSink;
  children: ReactNode;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function EvidenceOrchestrator({ task, sessionToken, sink, children }: EvidenceOrchestratorProps) {
  const evidenceTypesKey = (task.tipos_evidencia || []).join('|');
  const requestedTypes = useMemo(() => new Set(task.tipos_evidencia || []), [evidenceTypesKey]);
  const needsVideo = requestedTypes.has('VIDEO');
  const needsAudio = requestedTypes.has('AUDIO') && !needsVideo;
  const needsCameraFrame = requestedTypes.has('CAMERA_FRAME');
  const needsMedia = needsVideo || needsAudio || needsCameraFrame;

  const { prepareMedia, getPreparedStream } = useMediaPermissions();

  const capture = useMediaCapture({
    needsVideo,
    needsAudio,
    needsCameraFrame,
    getPreparedStream,
    prepareMedia,
    enabled: needsMedia,
  });

  const flushMediaFn = useCallback(async (): Promise<void> => {
    const recorder = capture.recorderRef.current;
    const stream = capture.streamRef.current;
    const ownsStream = capture.ownsStreamRef.current;
    const durationMs = Date.now() - capture.startedAtRef.current;
    const chunks = capture.chunksRef.current;

    if (!recorder && !stream) return;

    const cameraFrameBlob = await capture.stop();

    if (needsCameraFrame && cameraFrameBlob) {
      const framePayload: EvidencePayload = {
        evaluacionId: task.evaluacion_id || 'lab-evaluacion',
        itemId: task.item_id,
        type: 'CAMERA_FRAME',
        file: cameraFrameBlob,
        fileName: `${task.item_id}-camera-frame.jpg`,
        sizeBytes: cameraFrameBlob.size,
        durationMs,
        capturedBy: 'CHILD_DEVICE',
        sessionToken,
        metadata: {
          activity: task.actividad_digital || task.minijuego || task.item_id,
          item_id: task.item_id,
          captured_at: nowIso(),
          evidence_role: 'camera_frame',
        },
      };
      if (sink) await sink.uploadEvidence(framePayload);
      else await uploadEvidenceNow(framePayload).catch(() => evidenceUploadQueue.add(framePayload));
    }

    if (chunks.length === 0) {
      const logPayload: EvidencePayload = {
        evaluacionId: task.evaluacion_id || 'lab-evaluacion',
        itemId: task.item_id,
        type: 'LOG',
        metadata: {
          activity: task.actividad_digital || task.minijuego || task.item_id,
          item_id: task.item_id,
          captured_at: nowIso(),
          event: 'MEDIA_NO_CHUNKS',
          evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
          duration_ms: durationMs,
        },
        durationMs,
        capturedBy: 'CHILD_DEVICE',
        sessionToken,
      };
      if (sink) await sink.uploadEvidence(logPayload);
      else evidenceUploadQueue.add(logPayload);
      return;
    }

    if (durationMs < MIN_MEDIA_EVIDENCE_DURATION_MS) {
      const logPayload: EvidencePayload = {
        evaluacionId: task.evaluacion_id || 'lab-evaluacion',
        itemId: task.item_id,
        type: 'LOG',
        metadata: {
          activity: task.actividad_digital || task.minijuego || task.item_id,
          item_id: task.item_id,
          captured_at: nowIso(),
          event: 'MEDIA_DURATION_TOO_SHORT',
          duration_ms: durationMs,
          evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
        },
        durationMs,
        capturedBy: 'CHILD_DEVICE',
        sessionToken,
      };
      if (sink) await sink.uploadEvidence(logPayload);
      else evidenceUploadQueue.add(logPayload);
    }

    const type = needsVideo ? 'VIDEO' : 'AUDIO';
    const mimeType = needsVideo ? 'video/webm' : 'audio/webm';
    const blob = new Blob(chunks, { type: mimeType });
    const payload: EvidencePayload = {
      evaluacionId: task.evaluacion_id || 'lab-evaluacion',
      itemId: task.item_id,
      type,
      file: blob,
      fileName: `${task.item_id}-${type.toLowerCase()}.webm`,
      sizeBytes: blob.size,
      durationMs,
      capturedBy: 'CHILD_DEVICE',
      sessionToken,
      metadata: {
        activity: task.actividad_digital || task.minijuego || task.item_id,
        item_id: task.item_id,
        captured_at: nowIso(),
        evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
        audio_included: needsVideo,
      },
    };

    if (sink) await sink.uploadEvidence(payload);
    else await uploadEvidenceNow(payload).catch(() => evidenceUploadQueue.add(payload));

    // touch uses to keep exhaustive-deps happy
    void ownsStream;
  }, [
    capture,
    needsCameraFrame,
    needsVideo,
    sink,
    sessionToken,
    task,
  ]);

  return (
    <MinigameEvidenceProvider task={task} sessionToken={sessionToken} sink={sink} flushMedia={flushMediaFn}>
      <div className={`evidence-orchestrator evidence-orchestrator-${capture.status}`}>
        {needsMedia ? (
          <div className="evidence-orchestrator-status" role="status" aria-live="polite">
            <span>{capture.message}</span>
            <strong>{Array.from(requestedTypes).join(' + ')}</strong>
          </div>
        ) : null}

        {children}
      </div>
    </MinigameEvidenceProvider>
  );
}

export default EvidenceOrchestrator;

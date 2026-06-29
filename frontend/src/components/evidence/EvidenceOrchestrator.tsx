import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { EvaluationTask } from '../../types';
import { evidenceUploadQueue, uploadEvidenceNow } from './EvidenceUploadQueue';
import type { EvidencePayload } from './EvidenceUploadQueue';
import { MinigameEvidenceProvider } from './MinigameEvidenceProvider';
import type { EvidenceSink } from './EvidenceSink';
import { useMediaPermissions } from './MediaPermissionProvider';
import './EvidenceOrchestrator.css';

type EvidenceStatus = 'idle' | 'preparing' | 'ready' | 'recording' | 'uploading' | 'failed' | 'permission-denied';
const MIN_MEDIA_EVIDENCE_DURATION_MS = 1000;

interface EvidenceOrchestratorProps {
  task: EvaluationTask;
  sessionToken?: string;
  sink?: EvidenceSink;
  children: ReactNode;
}

function nowIso() {
  return new Date().toISOString();
}

function getMimeType(kind: 'audio' | 'video') {
  const candidates = kind === 'video'
    ? [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4',
      ]
    : [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ];

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) || '';
}

async function captureFrame(stream: MediaStream): Promise<Blob | null> {
  const videoTrack = stream.getVideoTracks()[0];
  if (!videoTrack) return null;

  const video = document.createElement('video');
  video.srcObject = stream;
  video.muted = true;
  video.playsInline = true;

  try {
    await video.play();
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  } finally {
    video.srcObject = null;
  }
}

function buildLogPayload(task: EvaluationTask, sessionToken: string | undefined, metadata: Record<string, unknown>, sink?: EvidenceSink): EvidencePayload | null {
  if (!sink && (!task.evaluacion_id || !sessionToken)) return null;

  return {
    evaluacionId: task.evaluacion_id || 'lab-evaluacion',
    itemId: task.item_id,
    type: 'LOG',
    metadata: {
      activity: task.actividad_digital || task.minijuego || task.item_id,
      item_id: task.item_id,
      captured_at: nowIso(),
      ...metadata,
    },
    capturedBy: 'CHILD_DEVICE',
    sessionToken,
  };
}

export function EvidenceOrchestrator({ task, sessionToken, sink, children }: EvidenceOrchestratorProps) {
  const evidenceTypesKey = (task.tipos_evidencia || []).join('|');
  const requestedTypes = useMemo(() => new Set(task.tipos_evidencia || []), [evidenceTypesKey]);
  const needsVideo = requestedTypes.has('VIDEO');
  const needsAudio = requestedTypes.has('AUDIO') && !needsVideo;
  const needsCameraFrame = requestedTypes.has('CAMERA_FRAME');
  const needsMedia = needsVideo || needsAudio || needsCameraFrame;
  const [status, setStatus] = useState<EvidenceStatus>(needsMedia ? 'preparing' : 'ready');
  const [message, setMessage] = useState('Evidencia lista');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ownsStreamRef = useRef(false);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(Date.now());
  const mediaPermissions = useMediaPermissions();
  const { prepareMedia, getPreparedStream } = mediaPermissions;

  const prepareMediaRef = useRef(prepareMedia);
  prepareMediaRef.current = prepareMedia;
  const getPreparedStreamRef = useRef(getPreparedStream);
  getPreparedStreamRef.current = getPreparedStream;

  const taskRef = useRef(task);
  taskRef.current = task;
  const sessionTokenRef = useRef(sessionToken);
  sessionTokenRef.current = sessionToken;
  const sinkRef = useRef(sink);
  sinkRef.current = sink;

  const uploadMedia = useCallback(async (
    recorder: MediaRecorder | null,
    stream: MediaStream | null,
    ownsStream: boolean,
  ): Promise<void> => {
    const currentTask = taskRef.current;
    const currentSessionToken = sessionTokenRef.current;
    const currentSink = sinkRef.current;
    const durationMs = Date.now() - startedAtRef.current;

    if (!currentSink && (!currentTask.evaluacion_id || !currentSessionToken)) {
      if (ownsStream) stream?.getTracks().forEach((track) => track.stop());
      return;
    }

    if (needsCameraFrame && stream) {
      const frame = await captureFrame(stream);
      if (frame) {
        const payload: EvidencePayload = {
          evaluacionId: currentTask.evaluacion_id || 'lab-evaluacion',
          itemId: currentTask.item_id,
          type: 'CAMERA_FRAME',
          file: frame,
          fileName: `${currentTask.item_id}-camera-frame.jpg`,
          sizeBytes: frame.size,
          durationMs,
          capturedBy: 'CHILD_DEVICE',
          sessionToken: currentSessionToken,
          metadata: {
            activity: currentTask.actividad_digital || currentTask.minijuego || currentTask.item_id,
            item_id: currentTask.item_id,
            captured_at: nowIso(),
            evidence_role: 'camera_frame',
          },
        };
        if (currentSink) await currentSink.uploadEvidence(payload);
        else await uploadEvidenceNow(payload).catch(() => evidenceUploadQueue.add(payload));
      }
    }

    if (!recorder) {
      if (ownsStream) stream?.getTracks().forEach((track) => track.stop());
      return;
    }

    if (recorder && recorder.state !== 'inactive') {
      await new Promise<void>((resolve) => {
        const onStopped = () => {
          setTimeout(resolve, 500);
        };
        recorder.onstop = onStopped;
        try {
          recorder.requestData();
        } catch {
          // some browsers may not support requestData, ignore
        }
        try {
          recorder.stop();
        } catch {
          resolve();
        }
        setTimeout(() => {
          if (recorder.state === 'inactive') onStopped();
        }, 1500);
      });
    }

    await new Promise<void>((resolve) => window.setTimeout(resolve, 300));

    if (ownsStream) {
      stream?.getTracks().forEach((track) => track.stop());
    }

    console.log('[EvidenceOrchestrator] uploadMedia: chunks=', chunksRef.current.length, 'duration=', durationMs, 'recorderState=', recorder?.state);

    if (chunksRef.current.length === 0) {
      if (stream && needsAudio && !needsVideo) {
        console.log('[EvidenceOrchestrator] Audio sin chunks: intentando fallback con AudioContext');
        try {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const destination = audioContext.createMediaStreamDestination();
          source.connect(destination);

          const fallbackRecorder = new MediaRecorder(destination.stream);
          const fallbackChunks: Blob[] = [];
          fallbackRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) fallbackChunks.push(event.data);
          };
          fallbackRecorder.start();

          await new Promise((resolve) => setTimeout(resolve, Math.max(500, durationMs)));

          if (fallbackRecorder.state !== 'inactive') {
            fallbackRecorder.stop();
            await new Promise<void>((resolve) => {
              fallbackRecorder.onstop = () => resolve();
              setTimeout(resolve, 1000);
            });
          }

          await audioContext.close();

          if (fallbackChunks.length > 0) {
            const fallbackBlob = new Blob(fallbackChunks, { type: 'audio/webm' });
            console.log('[EvidenceOrchestrator] Fallback audio blob:', fallbackBlob.size);
            const fallbackPayload: EvidencePayload = {
              evaluacionId: currentTask.evaluacion_id || 'lab-evaluacion',
              itemId: currentTask.item_id,
              type: 'AUDIO',
              file: fallbackBlob,
              fileName: `${currentTask.item_id}-audio-fallback.webm`,
              sizeBytes: fallbackBlob.size,
              durationMs,
              capturedBy: 'CHILD_DEVICE',
              sessionToken: currentSessionToken,
              metadata: {
                activity: currentTask.actividad_digital || currentTask.minijuego || currentTask.item_id,
                item_id: currentTask.item_id,
                captured_at: nowIso(),
                evidence_role: 'item_audio_recording_fallback',
              },
            };
            if (currentSink) await currentSink.uploadEvidence(fallbackPayload);
            else evidenceUploadQueue.add(fallbackPayload);
            return;
          }
        } catch (fallbackErr) {
          console.warn('[EvidenceOrchestrator] Fallback de audio falló:', fallbackErr);
        }
      }

      const logPayload: EvidencePayload = {
        evaluacionId: currentTask.evaluacion_id || 'lab-evaluacion',
        itemId: currentTask.item_id,
        type: 'LOG',
        metadata: {
          activity: currentTask.actividad_digital || currentTask.minijuego || currentTask.item_id,
          item_id: currentTask.item_id,
          captured_at: nowIso(),
          event: 'MEDIA_NO_CHUNKS',
          evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
          duration_ms: durationMs,
        },
        durationMs,
        capturedBy: 'CHILD_DEVICE',
        sessionToken: currentSessionToken,
      };
      if (currentSink) await currentSink.uploadEvidence(logPayload);
      else evidenceUploadQueue.add(logPayload);
      return;
    }

    if (durationMs < MIN_MEDIA_EVIDENCE_DURATION_MS) {
      const logPayload: EvidencePayload = {
        evaluacionId: currentTask.evaluacion_id || 'lab-evaluacion',
        itemId: currentTask.item_id,
        type: 'LOG',
        metadata: {
          activity: currentTask.actividad_digital || currentTask.minijuego || currentTask.item_id,
          item_id: currentTask.item_id,
          captured_at: nowIso(),
          event: 'MEDIA_DURATION_TOO_SHORT',
          duration_ms: durationMs,
          evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
        },
        durationMs,
        capturedBy: 'CHILD_DEVICE',
        sessionToken: currentSessionToken,
      };
      if (currentSink) await currentSink.uploadEvidence(logPayload);
      else evidenceUploadQueue.add(logPayload);
    }

    const type = needsVideo ? 'VIDEO' : 'AUDIO';
    const mimeType = needsVideo ? 'video/webm' : 'audio/webm';
    const blob = new Blob(chunksRef.current, { type: mimeType });
    console.log('[EvidenceOrchestrator] Subiendo', type, 'blob size:', blob.size, 'mime:', mimeType);
    const payload: EvidencePayload = {
      evaluacionId: currentTask.evaluacion_id || 'lab-evaluacion',
      itemId: currentTask.item_id,
      type,
      file: blob,
      fileName: `${currentTask.item_id}-${type.toLowerCase()}.webm`,
      sizeBytes: blob.size,
      durationMs,
      capturedBy: 'CHILD_DEVICE',
      sessionToken: currentSessionToken,
      metadata: {
        activity: currentTask.actividad_digital || currentTask.minijuego || currentTask.item_id,
        item_id: currentTask.item_id,
        captured_at: nowIso(),
        evidence_role: needsVideo ? 'item_video_recording' : 'item_audio_recording',
        audio_included: needsVideo,
      },
    };

    if (currentSink) await currentSink.uploadEvidence(payload);
    else await uploadEvidenceNow(payload).catch(() => evidenceUploadQueue.add(payload));
  }, [needsCameraFrame, needsVideo]);

  const flushMediaFn = useCallback(async (): Promise<void> => {
    const recorder = recorderRef.current;
    const stream = streamRef.current;
    const ownsStream = ownsStreamRef.current;

    if (!recorder && !stream) return;

    recorderRef.current = null;
    streamRef.current = null;
    ownsStreamRef.current = false;

    await uploadMedia(recorder, stream, ownsStream);
  }, [uploadMedia]);

  const flushMediaRef = useRef<() => Promise<void>>(flushMediaFn);
  flushMediaRef.current = flushMediaFn;

  useEffect(() => {
    let cancelled = false;
    startedAtRef.current = Date.now();
    chunksRef.current = [];
    setStatus(needsMedia ? 'preparing' : 'ready');
    setMessage(needsMedia ? 'Solicitando permisos multimedia...' : 'Evidencia lista');

    const requirements = {
      audio: needsVideo || needsAudio,
      video: needsVideo || needsCameraFrame,
    };

    const start = async () => {
      if (!needsMedia) return;

      const currentTask = taskRef.current;
      const currentSessionToken = sessionTokenRef.current;
      const currentSink = sinkRef.current;

      if (!currentSink && (!currentTask.evaluacion_id || !currentSessionToken)) {
        setStatus('failed');
        setMessage('No se pudo preparar evidencia: falta token de sesion.');
        console.warn(`[EvidenceOrchestrator] multimedia no iniciada: falta sessionToken para ${currentTask.item_id}.`);
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        setStatus('failed');
        setMessage('Este dispositivo no permite grabar evidencia multimedia.');
        const payload = buildLogPayload(currentTask, currentSessionToken, {
          event: 'MEDIA_NOT_SUPPORTED',
          requested_types: Array.from(requestedTypes),
        }, currentSink);
        if (payload) {
          if (currentSink) void currentSink.uploadEvidence(payload);
          else evidenceUploadQueue.add(payload);
        }
        return;
      }

      try {
        let stream: MediaStream | null = getPreparedStreamRef.current(requirements);
        ownsStreamRef.current = false;

        if (!stream) {
          try {
            console.log('[EvidenceOrchestrator] Solicitando permisos multimedia:', requirements);
            stream = await prepareMediaRef.current(requirements);
            console.log('[EvidenceOrchestrator] Stream obtenido:', stream ? 'OK' : 'NULL');
          } catch (permErr) {
            console.warn('[EvidenceOrchestrator] Auto-permiso denegado:', permErr);
            setStatus('permission-denied');
            setMessage('Permisos denegados. La actividad continua sin grabar evidencia multimedia.');
            const payload = buildLogPayload(currentTask, currentSessionToken, {
              event: 'MEDIA_PERMISSION_DENIED_GRACEFUL',
              requested_types: Array.from(requestedTypes),
              error: permErr instanceof Error ? permErr.message : 'unknown_error',
            }, currentSink);
            if (payload) {
              if (currentSink) void currentSink.uploadEvidence(payload);
              else evidenceUploadQueue.add(payload);
            }
            return;
          }
        }

        if (!stream) {
          console.warn('[EvidenceOrchestrator] No se pudo obtener stream multimedia');
          setStatus('permission-denied');
          setMessage('Permisos no otorgados. La actividad continua sin grabar evidencia multimedia.');
          const payload = buildLogPayload(currentTask, currentSessionToken, {
            event: 'MEDIA_NO_STREAM',
            requested_types: Array.from(requestedTypes),
          }, currentSink);
          if (payload) {
            if (currentSink) void currentSink.uploadEvidence(payload);
            else evidenceUploadQueue.add(payload);
          }
          return;
        }

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (recorderRef.current) {
          console.log('[EvidenceOrchestrator] Ya hay un recorder activo, no se re-inicializa');
          return;
        }

        streamRef.current = stream;
        console.log('[EvidenceOrchestrator] Stream guardado. needsVideo:', needsVideo, 'needsAudio:', needsAudio);

        if (needsVideo || needsAudio) {
          const recordingKind = needsVideo ? 'video' : 'audio';
          const mimeType = getMimeType(recordingKind);
          console.log('[EvidenceOrchestrator] MIME type para', recordingKind, ':', mimeType);
          let recorder: MediaRecorder;
          try {
            recorder = mimeType
              ? new MediaRecorder(stream, { mimeType })
              : new MediaRecorder(stream);
            console.log('[EvidenceOrchestrator] MediaRecorder creado. State:', recorder.state, 'MIME:', recorder.mimeType);
          } catch (recErr) {
            console.warn('[EvidenceOrchestrator] MediaRecorder no se pudo crear:', recErr);
            setStatus('failed');
            setMessage('Este navegador no soporta la grabacion solicitada.');
            const payload = buildLogPayload(currentTask, currentSessionToken, {
              event: 'MEDIA_RECORDER_FAILED',
              requested_types: Array.from(requestedTypes),
              error: recErr instanceof Error ? recErr.message : 'unknown_error',
            }, currentSink);
            if (payload) {
              if (currentSink) void currentSink.uploadEvidence(payload);
              else evidenceUploadQueue.add(payload);
            }
            return;
          }

          recorderRef.current = recorder;
          chunksRef.current = [];
          recorder.ondataavailable = (event) => {
            console.log('[EvidenceOrchestrator] ondataavailable:', event.data.size, 'bytes. Total chunks:', chunksRef.current.length + 1);
            if (event.data.size > 0) chunksRef.current.push(event.data);
          };
          recorder.onerror = (event) => {
            console.warn('[EvidenceOrchestrator] MediaRecorder error:', event);
          };
          recorder.onstart = () => {
            console.log('[EvidenceOrchestrator] MediaRecorder.start() exitoso. State:', recorder.state);
          };
          try {
            recorder.start(250);
            console.log('[EvidenceOrchestrator] recorder.start(250) llamado. State:', recorder.state);
          } catch (startErr) {
            console.warn('[EvidenceOrchestrator] MediaRecorder.start falló:', startErr);
            return;
          }
          setStatus('recording');
          setMessage(needsVideo ? 'Grabando video de evidencia' : 'Grabando audio de evidencia');
          return;
        }

        setStatus('ready');
        setMessage('Camara lista para evidencia');
      } catch (error) {
        if (cancelled) return;
        console.warn('[EvidenceOrchestrator] Error inesperado:', error);
        setStatus('failed');
        setMessage('No se pudo preparar la captura de evidencia.');
        const payload = buildLogPayload(currentTask, sessionToken, {
          event: 'MEDIA_UNEXPECTED_ERROR',
          requested_types: Array.from(requestedTypes),
          error: error instanceof Error ? error.message : 'unknown_error',
        }, sink);
        if (payload) {
          if (sink) void sink.uploadEvidence(payload);
          else evidenceUploadQueue.add(payload);
        }
      }
    };

    void start();

    return () => {
      cancelled = true;
      const stream = streamRef.current;
      const recorder = recorderRef.current;
      const ownsStream = ownsStreamRef.current;
      streamRef.current = null;
      recorderRef.current = null;
      ownsStreamRef.current = false;

      if (ownsStream) {
        stream?.getTracks().forEach((track) => track.stop());
      }

      if (recorder && recorder.state !== 'inactive') {
        try {
          recorder.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [evidenceTypesKey]);

  return (
    <MinigameEvidenceProvider task={task} sessionToken={sessionToken} sink={sink} flushMedia={flushMediaRef.current}>
      <div className={`evidence-orchestrator evidence-orchestrator-${status}`}>
        {needsMedia ? (
          <div className="evidence-orchestrator-status" role="status" aria-live="polite">
            <span>{message}</span>
            <strong>{Array.from(requestedTypes).join(' + ')}</strong>
          </div>
        ) : null}

        {children}
      </div>
    </MinigameEvidenceProvider>
  );
}

export default EvidenceOrchestrator;

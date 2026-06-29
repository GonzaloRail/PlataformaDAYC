import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_MEDIA_EVIDENCE_DURATION_MS = 1000;

function getMimeType(kind: 'audio' | 'video'): string {
  const candidates = kind === 'video'
    ? ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm', 'video/mp4']
    : ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) || '';
}

async function captureCameraFrame(stream: MediaStream): Promise<Blob | null> {
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

interface MediaCaptureOptions {
  needsVideo: boolean;
  needsAudio: boolean;
  needsCameraFrame: boolean;
  getPreparedStream: (requirements: { audio: boolean; video: boolean }) => MediaStream | null;
  prepareMedia: (requirements: { audio: boolean; video: boolean }) => Promise<MediaStream | null>;
  enabled: boolean;
}

export type MediaCaptureStatus = 'idle' | 'preparing' | 'ready' | 'recording' | 'failed' | 'permission-denied';

export interface MediaCaptureState {
  status: MediaCaptureStatus;
  message: string;
  streamRef: React.MutableRefObject<MediaStream | null>;
  recorderRef: React.MutableRefObject<MediaRecorder | null>;
  ownsStreamRef: React.MutableRefObject<boolean>;
  chunksRef: React.MutableRefObject<Blob[]>;
  startedAtRef: React.MutableRefObject<number>;
  stop: () => Promise<Blob | null>;
}

/**
 * Owns the MediaRecorder + MediaStream lifecycle for evidence capture.
 * Sets up recording on mount, cleans up on unmount, and exposes a `stop`
 * promise that resolves after the recorder has flushed its final chunks.
 */
export function useMediaCapture({
  needsVideo,
  needsAudio,
  needsCameraFrame,
  getPreparedStream,
  prepareMedia,
  enabled,
}: MediaCaptureOptions): MediaCaptureState {
  const [status, setStatus] = useState<MediaCaptureStatus>(enabled ? 'preparing' : 'idle');
  const [message, setMessage] = useState('Evidencia lista');
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const ownsStreamRef = useRef(false);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(Date.now());

  const getPreparedStreamRef = useRef(getPreparedStream);
  getPreparedStreamRef.current = getPreparedStream;
  const prepareMediaRef = useRef(prepareMedia);
  prepareMediaRef.current = prepareMedia;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    startedAtRef.current = Date.now();
    chunksRef.current = [];
    setStatus('preparing');

    const requirements = {
      audio: needsVideo || needsAudio,
      video: needsVideo || needsCameraFrame,
    };

    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        setStatus('failed');
        return;
      }

      let stream: MediaStream | null = getPreparedStreamRef.current(requirements);
      ownsStreamRef.current = false;

      if (!stream) {
        try {
          stream = await prepareMediaRef.current(requirements);
        } catch {
          setStatus('permission-denied');
          return;
        }
      }

      if (!stream) {
        setStatus('permission-denied');
        return;
      }

      if (cancelled) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      if (needsVideo || needsAudio) {
        const recordingKind = needsVideo ? 'video' : 'audio';
        const mimeType = getMimeType(recordingKind);
        let recorder: MediaRecorder;
        try {
          recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        } catch {
          setStatus('failed');
          return;
        }

        recorderRef.current = recorder;
        chunksRef.current = [];
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) chunksRef.current.push(event.data);
        };
        try {
          recorder.start(250);
          setStatus('recording');
          setMessage(needsVideo ? 'Grabando video de evidencia' : 'Grabando audio de evidencia');
        } catch {
          // start failed; leave for caller to handle
        }
        return;
      }

      setStatus('ready');
      setMessage('Camara lista para evidencia');
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
  }, [enabled, needsAudio, needsCameraFrame, needsVideo]);

  const stop = useCallback(async (): Promise<Blob | null> => {
    const recorder = recorderRef.current;
    const stream = streamRef.current;
    const ownsStream = ownsStreamRef.current;

    if (!recorder && !stream) return null;

    if (recorder && recorder.state !== 'inactive') {
      await new Promise<void>((resolve) => {
        const onStopped = () => setTimeout(resolve, 500);
        recorder.onstop = onStopped;
        try {
          recorder.requestData();
        } catch {
          // requestData not universally supported
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

    let cameraFrameBlob: Blob | null = null;
    if (needsCameraFrame && stream) {
      cameraFrameBlob = await captureCameraFrame(stream);
    }

    await new Promise<void>((resolve) => window.setTimeout(resolve, 300));

    if (ownsStream) {
      stream?.getTracks().forEach((track) => track.stop());
    }

    recorderRef.current = null;
    streamRef.current = null;
    ownsStreamRef.current = false;

    return cameraFrameBlob;
  }, [needsCameraFrame]);

  return {
    status,
    message,
    streamRef,
    recorderRef,
    ownsStreamRef,
    chunksRef,
    startedAtRef,
    stop,
  };
}

export { MIN_MEDIA_EVIDENCE_DURATION_MS, captureCameraFrame };

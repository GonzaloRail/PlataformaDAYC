import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type MediaPermissionStatus = 'idle' | 'requesting' | 'ready' | 'denied' | 'unsupported' | 'error';

export interface MediaRequirements {
  audio?: boolean;
  video?: boolean;
}

interface MediaPermissionContextValue {
  status: MediaPermissionStatus;
  error: string | null;
  requirements: Required<MediaRequirements>;
  prepareMedia: (requirements: MediaRequirements) => Promise<MediaStream | null>;
  getPreparedStream: (requirements?: MediaRequirements) => MediaStream | null;
  releaseMedia: () => void;
}

const defaultRequirements: Required<MediaRequirements> = { audio: false, video: false };

const MediaPermissionContext = createContext<MediaPermissionContextValue>({
  status: 'idle',
  error: null,
  requirements: defaultRequirements,
  prepareMedia: async () => null,
  getPreparedStream: () => null,
  releaseMedia: () => undefined,
});

function normalizeRequirements(requirements: MediaRequirements): Required<MediaRequirements> {
  return {
    audio: Boolean(requirements.audio),
    video: Boolean(requirements.video),
  };
}

function streamMatches(stream: MediaStream | null, requirements: MediaRequirements) {
  if (!stream) return false;
  const required = normalizeRequirements(requirements);
  const hasAudio = stream.getAudioTracks().some((track) => track.readyState === 'live');
  const hasVideo = stream.getVideoTracks().some((track) => track.readyState === 'live');
  return (!required.audio || hasAudio) && (!required.video || hasVideo);
}

export function MediaPermissionProvider({ children }: { children: ReactNode }) {
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<MediaPermissionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<Required<MediaRequirements>>(defaultRequirements);

  const releaseMedia = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setRequirements(defaultRequirements);
    setStatus('idle');
    setError(null);
  }, []);

  const prepareMedia = useCallback(async (nextRequirements: MediaRequirements) => {
    const normalized = normalizeRequirements(nextRequirements);
    if (!normalized.audio && !normalized.video) {
      setStatus('ready');
      return streamRef.current;
    }

    if (streamMatches(streamRef.current, normalized)) {
      setRequirements((current) => ({
        audio: current.audio || normalized.audio,
        video: current.video || normalized.video,
      }));
      setStatus('ready');
      setError(null);
      return streamRef.current;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      setError('Este navegador no permite preparar camara o microfono.');
      return null;
    }

    setStatus('requesting');
    setError(null);

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: normalized.audio,
        video: normalized.video ? { facingMode: 'user' } : false,
      });
      streamRef.current = stream;
      setRequirements(normalized);
      setStatus('ready');
      return stream;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo acceder a camara o microfono.';
      setStatus(message.toLowerCase().includes('denied') || message.toLowerCase().includes('permission') ? 'denied' : 'error');
      setError(message);
      return null;
    }
  }, []);

  const getPreparedStream = useCallback((requested: MediaRequirements = {}) => {
    return streamMatches(streamRef.current, requested) ? streamRef.current : null;
  }, []);

  useEffect(() => releaseMedia, [releaseMedia]);

  const value = useMemo<MediaPermissionContextValue>(() => ({
    status,
    error,
    requirements,
    prepareMedia,
    getPreparedStream,
    releaseMedia,
  }), [error, getPreparedStream, prepareMedia, releaseMedia, requirements, status]);

  return (
    <MediaPermissionContext.Provider value={value}>
      {children}
    </MediaPermissionContext.Provider>
  );
}

export function useMediaPermissions() {
  return useContext(MediaPermissionContext);
}

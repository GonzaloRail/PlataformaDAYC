import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import './shared-games.css';

export interface StoryPanel {
  id: string;
  emoji: string;
  caption: string;
}

interface StoryNarrationGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  prompt: string;
  panels: StoryPanel[];
  captureAudio: boolean;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'finished';

export function StoryNarrationGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  prompt,
  panels,
  captureAudio,
  progress,
  mascotMessage,
  footer,
}: StoryNarrationGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [durationMs, setDurationMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'finished',
    contextData: { phase, durationMs, captureAudio },
  });

  const media = useMediaCapture({
    needsVideo: false,
    needsAudio: captureAudio,
    needsCameraFrame: false,
    enabled: phase === 'preparing' || phase === 'recording',
    prepareMedia: async (req) => permissions.prepareMedia(req),
    getPreparedStream: (req) => permissions.getPreparedStream(req),
  });

  useEffect(() => {
    setPhase('idle');
    setDurationMs(0);
    setError(null);
  }, [activityId]);

  useEffect(() => {
    if (phase === 'preparing' && media.status === 'recording') {
      setPhase('recording');
    } else if (phase === 'preparing' && (media.status === 'failed' || media.status === 'permission-denied')) {
      setError(media.message);
      setPhase('idle');
    }
  }, [phase, media.status, media.message]);

  const start = () => {
    setError(null);
    setPhase('preparing');
  };

  const stop = async () => {
    const blob = await media.stop();
    if (blob) {
      setDurationMs(blob.size > 0 ? Math.max(1000, Date.now() - performance.now()) : 0);
      await evidence.uploadBlob('AUDIO', blob, {
        fileName: `${activityId}-narration.webm`,
        metadata: { source: 'child_narration', step: 0 },
      });
    }
    setPhase('review');
  };

  const finish = (outcome: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE') => {
    evidence.recordEvent(`${activityId}_FINISHED`, { outcome, durationMs, captureAudio, panels: panels.length });
    evidence.recordLog({
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: phase === 'recording' || phase === 'review',
      outcome,
      durationMs,
      captureAudio,
      panels: panels.length,
    });
    setPhase('finished');
    answerOnce(outcome, {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: phase === 'recording' || phase === 'review',
        outcome,
        durationMs,
        captureAudio,
        panels: panels.length,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{error ?? prompt}</span>
        <strong>
          {phase === 'recording' ? 'Grabando' : phase === 'review' ? 'Listo para revisar' : 'Preparado'}
        </strong>
      </div>
      <div className="sng-panels">
        {panels.map((p) => (
          <div key={p.id} className="sng-panel">
            <span className="sng-emoji" aria-hidden="true">{p.emoji}</span>
            <span className="sng-caption">{p.caption}</span>
          </div>
        ))}
      </div>
      <div className="sng-controls">
        {captureAudio ? (
          phase === 'recording' ? (
            <button type="button" className="kid-action-btn kid-action-primary" onClick={stop}>Detener grabacion</button>
          ) : phase === 'preparing' ? (
            <button type="button" className="kid-action-btn" disabled>Preparando...</button>
          ) : (
            <button type="button" className="kid-action-btn kid-action-primary" onClick={start}>Grabar mi narracion</button>
          )
        ) : null}
        {phase !== 'recording' && phase !== 'preparing' ? (
          <button
            type="button"
            className="kid-action-btn"
            onClick={() => finish(phase === 'review' || captureAudio ? 'CORRECT' : 'NOT_APPLICABLE')}
          >
            Marcar como completado
          </button>
        ) : null}
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      footer={footer ?? 'El evaluador revisara la narracion y el audio registrado.'}
    />
  );
}

export default StoryNarrationGame;

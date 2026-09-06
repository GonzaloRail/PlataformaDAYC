import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import './shared-games.css';

type PanelType = 'yesno' | 'counter' | 'free';

interface VerbalResponseGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  prompt: string;
  stimulus?: { emoji?: string; label?: string; description?: string };
  panelType: PanelType;
  captureAudio: boolean;
  counterMax?: number;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'finished';

export function VerbalResponseGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  prompt,
  stimulus,
  panelType,
  captureAudio,
  counterMax = 100,
  progress,
  mascotMessage,
  footer,
}: VerbalResponseGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);
  const [freeText, setFreeText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'finished',
    contextData: { phase, count, panelType, captureAudio },
  });

  useEffect(() => {
    setPhase('idle');
    setCount(0);
    setFreeText('');
    setError(null);
  }, [activityId]);

  const media = useMediaCapture({
    needsVideo: false,
    needsAudio: captureAudio,
    needsCameraFrame: false,
    enabled: phase === 'preparing' || phase === 'recording',
    prepareMedia: async (req) => permissions.prepareMedia(req),
    getPreparedStream: (req) => permissions.getPreparedStream(req),
  });

  useEffect(() => {
    if (phase === 'preparing' && media.status === 'recording') {
      setPhase('recording');
    } else if (phase === 'preparing' && (media.status === 'failed' || media.status === 'permission-denied')) {
      setError(media.message);
      setPhase('idle');
    }
  }, [phase, media.status, media.message]);

  const startRecord = () => {
    setError(null);
    setPhase('preparing');
  };

  const stopRecord = async () => {
    const blob = await media.stop();
    if (blob) {
      await evidence.uploadBlob('AUDIO', blob, {
        fileName: `${activityId}-response.webm`,
        metadata: { source: 'child_verbal_response' },
      });
    }
    setPhase('review');
  };

  const finish = (outcome: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', extra: Record<string, unknown> = {}) => {
    evidence.recordEvent(`${activityId}_FINISHED`, { outcome, panelType, count, freeText, captureAudio, ...extra });
    evidence.recordLog({
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: phase === 'recording' || phase === 'review',
      outcome,
      panelType,
      count,
      freeText,
      captureAudio,
      ...extra,
    });
    setPhase('finished');
    answerOnce(outcome, {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: phase === 'recording' || phase === 'review',
        outcome,
        panelType,
        count,
        freeText,
        captureAudio,
        ...extra,
      }),
    });
  };

  const renderPanel = () => {
    if (panelType === 'yesno') {
      return (
        <div className="vr-yesno">
          <button type="button" className="vr-yesno-btn" onClick={() => finish('CORRECT')}>Lo logro</button>
          <button type="button" className="vr-yesno-btn" onClick={() => finish('ERROR')}>No lo logro</button>
        </div>
      );
    }
    if (panelType === 'counter') {
      return (
        <div className="vr-counter">
          <p>Lleva el conteo mientras el nino responde.</p>
          <div className="vr-counter-value" aria-live="polite">{count}</div>
          <div className="vr-counter-actions">
            <button type="button" onClick={() => setCount((c) => Math.max(0, c - 1))}>-1</button>
            <button type="button" onClick={() => setCount((c) => Math.min(counterMax, c + 1))}>+1</button>
            <button type="button" className="vr-finish" onClick={() => finish('CORRECT', { finalCount: count })}>
              Terminar conteo
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="vr-free">
        <label htmlFor="vr-free-text">Anota lo que dijo el nino:</label>
        <textarea
          id="vr-free-text"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          rows={3}
        />
        <button type="button" className="vr-finish" onClick={() => finish('CORRECT', { response: freeText })}>
          Registrar respuesta
        </button>
      </div>
    );
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{error ?? prompt}</span>
        <strong>{phase === 'recording' ? 'Grabando' : 'En espera'}</strong>
      </div>
      {stimulus ? (
        <div className="vr-stimulus">
          {stimulus.emoji ? <span className="vr-stimulus-emoji" aria-hidden="true">{stimulus.emoji}</span> : null}
          {stimulus.label ? <strong>{stimulus.label}</strong> : null}
          {stimulus.description ? <p>{stimulus.description}</p> : null}
        </div>
      ) : null}
      {captureAudio ? (
        <div className="vr-record">
          {phase === 'recording' ? (
            <button type="button" className="kid-action-btn" onClick={stopRecord}>Detener</button>
          ) : phase === 'preparing' ? (
            <button type="button" className="kid-action-btn" disabled>Preparando...</button>
          ) : (
            <button type="button" className="kid-action-btn" onClick={startRecord}>Grabar respuesta</button>
          )}
        </div>
      ) : null}
      {renderPanel()}
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
      footer={footer ?? 'El evaluador registrara la respuesta del nino.'}
    />
  );
}

export default VerbalResponseGame;

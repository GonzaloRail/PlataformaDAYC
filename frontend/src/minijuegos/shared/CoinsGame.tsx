import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import './shared-games.css';

export interface Coin {
  id: string;
  value: number;
  label: string;
  image: string;
  description: string;
}

interface CoinsGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  prompt: string;
  coins: Coin[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'finished';

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function CoinsGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  prompt,
  coins,
  progress,
  mascotMessage,
  footer,
}: CoinsGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [order] = useState<string[]>(() => shuffle(coins).map((c) => c.id));
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'finished',
    contextData: { step, total: coins.length, phase },
  });

  useEffect(() => {
    setStep(0);
    setPhase('idle');
    setError(null);
  }, [activityId]);

  const media = useMediaCapture({
    needsVideo: false,
    needsAudio: true,
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

  const coin = coins.find((c) => c.id === order[step]);

  const start = () => {
    setError(null);
    setPhase('preparing');
  };

  const stop = async () => {
    const blob = await media.stop();
    if (blob) {
      await evidence.uploadBlob('AUDIO', blob, {
        fileName: `${activityId}-coin-${step}.webm`,
        metadata: { source: 'child_coins_response', step, coin_id: coin?.id, coin_value: coin?.value },
      });
    }
    setPhase('review');
  };

  const next = () => {
    if (step + 1 < coins.length) {
      setStep(step + 1);
      setPhase('idle');
    } else {
      evidence.recordEvent(`${activityId}_FINISHED`, { totalShown: coins.length });
      evidence.recordLog({
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalShown: coins.length,
      });
      setPhase('finished');
      answerOnce('CORRECT', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalShown: coins.length,
        }),
      });
    }
  };

  const playArea = coin ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{error ?? prompt}</span>
        <strong>Moneda {step + 1} / {coins.length}</strong>
      </div>
      <div className="coin-card">
        <div className="coin-image" aria-label={coin.description}>
          {coin.image.startsWith('<') ? (
            <span dangerouslySetInnerHTML={{ __html: coin.image }} />
          ) : (
            <span className="coin-emoji" aria-hidden="true">{coin.image}</span>
          )}
        </div>
        <p className="coin-label">{coin.label}</p>
      </div>
      <div className="coin-controls">
        {phase === 'recording' ? (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={stop}>Detener</button>
        ) : phase === 'preparing' ? (
          <button type="button" className="kid-action-btn" disabled>Preparando...</button>
        ) : (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={start}>Grabar nombre</button>
        )}
        <button type="button" className="kid-action-btn" onClick={next} disabled={phase === 'recording' || phase === 'preparing'}>
          Siguiente moneda
        </button>
      </div>
    </div>
  ) : null;

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      footer={footer ?? 'El evaluador revisara el audio de cada moneda.'}
    />
  );
}

export default CoinsGame;

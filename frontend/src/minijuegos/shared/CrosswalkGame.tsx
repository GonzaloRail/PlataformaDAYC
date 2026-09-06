import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './crosswalk.css';

interface CrosswalkRound {
  hasLight: boolean;
  hasCar: boolean;
  key: string;
}

interface CrosswalkGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: CrosswalkRound[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function CrosswalkGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  progress,
  mascotMessage,
  footer,
}: CrosswalkGameProps) {
  const [step, setStep] = useState(0);
  const [lightState, setLightState] = useState<'red' | 'green'>('red');
  const [lookedLeft, setLookedLeft] = useState(false);
  const [lookedRight, setLookedRight] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Mira a ambos lados antes de cruzar.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length },
  });

  useEffect(() => {
    setStep(0);
    setLightState('red');
    setLookedLeft(false);
    setLookedRight(false);
    setIsComplete(false);
    setMessage('Mira a ambos lados antes de cruzar.');
  }, [activityId]);

  const current = rounds[step];

  const handleLight = () => {
    if (lightState === 'red') {
      setLightState('green');
      setMessage('El semaforo esta en verde. Mira a los lados.');
      evidence.recordEvent(`${activityId}_LIGHT_CHANGED`, { step, to: 'green' });
    }
  };

  const lookLeft = () => {
    setLookedLeft(true);
    setMessage(lookedRight ? 'Ya miraste a ambos lados. Puedes cruzar.' : 'Ahora mira a la derecha.');
    evidence.recordEvent(`${activityId}_LOOKED_LEFT`, { step });
  };

  const lookRight = () => {
    setLookedRight(true);
    setMessage(lookedLeft ? 'Ya miraste a ambos lados. Puedes cruzar.' : 'Ahora mira a la izquierda.');
    evidence.recordEvent(`${activityId}_LOOKED_RIGHT`, { step });
  };

  const cross = () => {
    if (current.hasLight && lightState !== 'green') {
      setFeedbackKind('error');
      setMessage('Espera. El semaforo esta en rojo.');
      window.setTimeout(() => setFeedbackKind(null), 1000);
      evidence.recordEvent(`${activityId}_CROSS_DENIED`, { step, reason: 'red_light' });
      return;
    }
    if (current.hasCar && (!lookedLeft || !lookedRight)) {
      setFeedbackKind('error');
      setMessage('Mira a los dos lados. Puede venir un auto.');
      window.setTimeout(() => setFeedbackKind(null), 1000);
      evidence.recordEvent(`${activityId}_CROSS_DENIED`, { step, reason: 'no_look' });
      return;
    }
    evidence.recordEvent(`${activityId}_CROSSED`, { step });
    setFeedbackKind('success');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    setMessage('Buen trabajo. Cruzaste con seguridad.');
    if (step + 1 < rounds.length) {
      window.setTimeout(() => {
        setStep(step + 1);
        setLightState('red');
        setLookedLeft(false);
        setLookedRight(false);
        setMessage('Mira a ambos lados antes de cruzar.');
      }, 1200);
    } else {
      evidence.recordEvent(`${activityId}_FINISHED`, { totalRounds: rounds.length });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalRounds: rounds.length,
      });
      setIsComplete(true);
      answerOnce('CORRECT', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalRounds: rounds.length,
        }),
      });
    }
  };

  const playArea = current ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {rounds.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={rounds.length} />
      <FeedbackBanner
        kind={feedbackKind}
        message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'}
        onDismiss={() => setFeedbackKind(null)}
        autoHideMs={1000}
      />
      <div className="cw-scene">
        <div className="cw-street">
          <div className="cw-crosswalk" />
          {current.hasCar ? <div className="cw-car">🚗</div> : null}
        </div>
        <div className="cw-sidewalk">
          <span className="cw-child" aria-hidden="true">🚶</span>
        </div>
        {current.hasLight ? (
          <button
            type="button"
            className={`cw-light ${lightState}`}
            onClick={handleLight}
            aria-label={`Semaforo en ${lightState === 'red' ? 'rojo' : 'verde'}`}
          >
            <span className="cw-light-red" />
            <span className="cw-light-green" />
          </button>
        ) : null}
        <div className="cw-controls">
          <div className="cw-look-buttons">
            <button type="button" className={`cw-look-btn${lookedLeft ? ' is-done' : ''}`} onClick={lookLeft}>
              Mirar izquierda
            </button>
            <button type="button" className={`cw-look-btn${lookedRight ? ' is-done' : ''}`} onClick={lookRight}>
              Mirar derecha
            </button>
          </div>
          <button type="button" className="cw-cross-btn" onClick={cross}>
            Cruzar la calle
          </button>
        </div>
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
      footer={footer ?? 'El evaluador revisara el cruce de calle al finalizar.'}
    />
  );
}

export default CrosswalkGame;

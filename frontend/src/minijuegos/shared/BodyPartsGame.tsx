import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './body-parts.css';

export interface BodyPartRound {
  instruction: string;
  side: 'izquierda' | 'derecha';
  part: string;
  correct: string;
  key: string;
}

interface BodyPartsGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: BodyPartRound[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

interface BodyZone {
  id: string;
  label: string;
  side: 'izquierda' | 'derecha';
  part: string;
  top: string;
  left: string;
}

const BODY_ZONES: BodyZone[] = [
  { id: 'mano-izq', label: 'Mano izquierda', side: 'izquierda', part: 'mano', top: '38%', left: '18%' },
  { id: 'mano-der', label: 'Mano derecha', side: 'derecha', part: 'mano', top: '38%', left: '68%' },
  { id: 'pie-izq', label: 'Pie izquierdo', side: 'izquierda', part: 'pie', top: '82%', left: '28%' },
  { id: 'pie-der', label: 'Pie derecho', side: 'derecha', part: 'pie', top: '82%', left: '58%' },
  { id: 'oreja-izq', label: 'Oreja izquierda', side: 'izquierda', part: 'oreja', top: '14%', left: '18%' },
  { id: 'oreja-der', label: 'Oreja derecha', side: 'derecha', part: 'oreja', top: '14%', left: '68%' },
  { id: 'ojo-izq', label: 'Ojo izquierdo', side: 'izquierda', part: 'ojo', top: '10%', left: '30%' },
  { id: 'ojo-der', label: 'Ojo derecho', side: 'derecha', part: 'ojo', top: '10%', left: '56%' },
  { id: 'rodilla-izq', label: 'Rodilla izquierda', side: 'izquierda', part: 'rodilla', top: '60%', left: '28%' },
  { id: 'rodilla-der', label: 'Rodilla derecha', side: 'derecha', part: 'rodilla', top: '60%', left: '58%' },
];

export function BodyPartsGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  progress,
  mascotMessage,
  footer,
}: BodyPartsGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca la parte del cuerpo correcta en el personaje.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length, picks },
  });

  useEffect(() => {
    setStep(0);
    setPicks([]);
    setIsComplete(false);
    setHighlightedId(null);
    setMessage('Toca la parte del cuerpo correcta en el personaje.');
  }, [activityId, rounds]);

  const pick = (zoneId: string) => {
    const round = rounds[step];
    if (!round) return;
    const isCorrect = zoneId === round.correct;
    const next = [...picks, zoneId];
    setPicks(next);
    setHighlightedId(zoneId);
    setMessage(isCorrect ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(isCorrect ? 'success' : 'error');
    window.setTimeout(() => {
      setFeedbackKind(null);
      setHighlightedId(null);
    }, 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: zoneId, expected: round.correct, correct: isCorrect, part: round.part, side: round.side });
    if (step + 1 < rounds.length) {
      window.setTimeout(() => setStep(step + 1), 600);
    } else {
      const correct = next.filter((v, i) => v === rounds[i].correct).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: rounds.length, picks: next });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalRounds: rounds.length,
        picks: next,
      });
      setIsComplete(true);
      answerOnce(correct === rounds.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correct,
          totalRounds: rounds.length,
          picks: next,
        }),
      });
    }
  };

  const current = rounds[step];

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
      <div className="bp-instruction" role="heading" aria-level={2}>
        {current.instruction}
      </div>
      <div className="bp-character-container">
        <div className="bp-character" aria-label="Personaje de frente">
          <div className="bp-head">
            <span className="bp-face">😊</span>
            <div className="bp-eye bp-eye-left" />
            <div className="bp-eye bp-eye-right" />
            <div className="bp-ear bp-ear-left" />
            <div className="bp-ear bp-ear-right" />
          </div>
          <div className="bp-torso">
            <div className="bp-arm bp-arm-left" />
            <div className="bp-arm bp-arm-right" />
          </div>
          <div className="bp-legs">
            <div className="bp-leg bp-leg-left" />
            <div className="bp-leg bp-leg-right" />
          </div>
        </div>
        <div className="bp-zones">
          {BODY_ZONES.map((zone) => (
            <button
              type="button"
              key={zone.id}
              className={`bp-zone${highlightedId === zone.id ? ' is-highlighted' : ''}${zone.side === 'izquierda' ? ' bp-left' : ' bp-right'}`}
              style={{
                top: zone.top,
                left: zone.left,
              }}
              onClick={() => pick(zone.id)}
              aria-label={zone.label}
            >
              <span className="bp-zone-dot" aria-hidden="true" />
            </button>
          ))}
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
      footer={footer ?? 'El evaluador revisara las respuestas al finalizar.'}
    />
  );
}

export default BodyPartsGame;

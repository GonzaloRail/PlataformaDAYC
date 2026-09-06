import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './spatial-game.css';

export interface SpatialRound {
  instruction: string;
  object: { emoji: string; label: string };
  reference: { emoji: string; label: string };
  positions: { id: string; label: string; emoji: string }[];
  correct: string;
  key: string;
}

type SpatialRelation = 'al-lado' | 'debajo' | 'enfrente' | 'detras';

interface SpatialGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  relation: SpatialRelation;
  rounds: SpatialRound[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function SpatialGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  relation,
  rounds,
  progress,
  mascotMessage,
  footer,
}: SpatialGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca la posicion correcta.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const [draggedObj, setDraggedObj] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length, picks, relation },
  });

  useEffect(() => {
    setStep(0);
    setPicks([]);
    setIsComplete(false);
    setDraggedObj(false);
    setMessage('Toca la posicion correcta.');
  }, [activityId, rounds]);

  const pick = (value: string) => {
    const round = rounds[step];
    if (!round) return;
    const isCorrect = value === round.correct;
    const next = [...picks, value];
    setPicks(next);
    setDraggedObj(true);
    setMessage(isCorrect ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(isCorrect ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: value, expected: round.correct, correct: isCorrect, relation });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
      setDraggedObj(false);
    } else {
      const correct = next.filter((v, i) => v === rounds[i].correct).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: rounds.length, picks: next, relation });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalRounds: rounds.length,
        picks: next,
        relation,
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
          relation,
        }),
      });
    }
  };

  const current = rounds[step];

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData('text/plain', 'object');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, positionId: string) => {
    e.preventDefault();
    pick(positionId);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
      <div className="spt-instruction" role="heading" aria-level={2}>
        {current.instruction}
      </div>
      <div className="spt-scene">
        <div className="spt-reference">
          <span className="spt-ref-emoji" aria-hidden="true">{current.reference.emoji}</span>
          <span className="spt-ref-label">{current.reference.label}</span>
        </div>
        <div className="spt-object-row">
          <button
            type="button"
            className={`spt-object${draggedObj ? ' is-placed' : ''}`}
            draggable={!draggedObj}
            onDragStart={handleDragStart}
            aria-label={current.object.label}
          >
            <span className="spt-obj-emoji" aria-hidden="true">{current.object.emoji}</span>
            <span className="spt-obj-label">{current.object.label}</span>
          </button>
        </div>
        <div className="spt-positions">
          {current.positions.map((pos) => (
            <button
              type="button"
              key={pos.id}
              className="spt-position"
              onClick={() => pick(pos.id)}
              onDrop={(e) => handleDrop(e, pos.id)}
              onDragOver={handleDragOver}
              aria-label={pos.label}
            >
              <span className="spt-pos-emoji" aria-hidden="true">{pos.emoji}</span>
              <span className="spt-pos-label">{pos.label}</span>
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
      footer={footer ?? 'El evaluador revisara las posiciones espaciales al finalizar.'}
    />
  );
}

export default SpatialGame;

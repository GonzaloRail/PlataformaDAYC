import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

interface OrdinalRound {
  id: string;
  items: { id: string; label: string; emoji: string }[];
  question: 'primero' | 'ultimo' | 'medio';
  correctItemId: string;
  key: string;
}

interface OrdinalPositionGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: OrdinalRound[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function OrdinalPositionGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  progress,
  mascotMessage,
  footer,
}: OrdinalPositionGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
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
    setMessage('');
  }, [activityId, rounds]);

  const round = rounds[step];
  const prompt = round
    ? round.question === 'primero'
      ? 'Cual esta primero?'
      : round.question === 'ultimo'
        ? 'Cual esta al ultimo?'
        : 'Cual esta al medio?'
    : '';

  const pick = (itemId: string) => {
    if (!round) return;
    const correct = itemId === round.correctItemId;
    const next = [...picks, itemId];
    setPicks(next);
    setMessage(correct ? 'Muy bien.' : 'Asignado, el evaluador revisara.');
    setFeedbackKind(correct ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: itemId, expected: round.correctItemId, correct });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      const correctCount = next.filter((v, i) => v === rounds[i].correctItemId).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correctCount, total: rounds.length, picks: next });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correctCount,
        totalRounds: rounds.length,
        picks: next,
      });
      setIsComplete(true);
      answerOnce(correctCount === rounds.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correctCount,
          totalRounds: rounds.length,
          picks: next,
        }),
      });
    }
  };

  const playArea = round ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message || prompt}</span>
        <strong>{step + 1} / {rounds.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={rounds.length} />
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="opg-row">
        {round.items.map((it, idx) => (
          <button
            type="button"
            key={it.id}
            className="opg-card"
            onClick={() => pick(it.id)}
            aria-label={`${it.label}, posicion ${idx + 1} de ${round.items.length}`}
          >
            <span className="opg-position">{idx + 1}</span>
            <span className="opg-emoji" aria-hidden="true">{it.emoji}</span>
            <span className="opg-label">{it.label}</span>
          </button>
        ))}
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

export default OrdinalPositionGame;

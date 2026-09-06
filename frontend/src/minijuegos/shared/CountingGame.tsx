import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

interface CountingRound {
  emoji: string;
  count: number;
  key: string;
}

interface CountingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: CountingRound[];
  optionsPerRound: number;
  maxValue?: number;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const buildOptions = (correct: number, max: number, count: number): number[] => {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const candidate = Math.max(0, Math.min(max, correct + Math.floor(Math.random() * 5) - 2));
    if (candidate !== correct) set.add(candidate);
  }
  return [...set].sort((a, b) => a - b);
};

export function CountingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  optionsPerRound,
  maxValue = 20,
  progress,
  mascotMessage,
  footer,
}: CountingGameProps) {
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const [picks, setPicks] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Cuenta los objetos y toca el numero correcto.');
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
    setMessage('Cuenta los objetos y toca el numero correcto.');
  }, [activityId, rounds]);

  useEffect(() => {
    if (step < rounds.length) {
      setOptions(buildOptions(rounds[step].count, maxValue, optionsPerRound));
    }
  }, [step, rounds, optionsPerRound, maxValue]);

  const pick = (value: number) => {
    const round = rounds[step];
    const next = [...picks, value];
    setPicks(next);
    setMessage(value === round.count ? 'Muy bien.' : 'Intenta de nuevo en la siguiente ronda.');
    setFeedbackKind(value === round.count ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, value, expected: round.count, correct: value === round.count });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      const correctCount = next.filter((v, i) => v === rounds[i].count).length;
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

  const round = rounds[step];
  const playArea = round ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {rounds.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={rounds.length} />
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="cg-objects" aria-label={`Hay ${round.count} objetos`}>
        {Array.from({ length: round.count }).map((_, i) => (
          <span key={`${round.key}-${i}`} className="cg-emoji" aria-hidden="true">{round.emoji}</span>
        ))}
      </div>
      <div className="cg-options">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            className="cg-option"
            onClick={() => pick(opt)}
            aria-label={`Opcion ${opt}`}
          >
            {opt}
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
      footer={footer ?? 'El evaluador revisara el conteo registrado al finalizar.'}
    />
  );
}

export default CountingGame;

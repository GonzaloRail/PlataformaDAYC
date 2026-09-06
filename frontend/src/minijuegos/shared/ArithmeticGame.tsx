import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

interface ArithmeticRound {
  id: string;
  left: number;
  right: number;
  operation: '+' | '-';
  answer: number;
  key: string;
}

interface ArithmeticGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: ArithmeticRound[];
  optionsPerRound?: number;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildOptions = (correct: number, count: number): number[] => {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const delta = Math.floor(Math.random() * 4) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    const candidate = correct + sign * delta;
    if (candidate >= 0 && candidate !== correct) set.add(candidate);
  }
  return [...set].sort((a, b) => a - b);
};

export function ArithmeticGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  optionsPerRound = 4,
  progress,
  mascotMessage,
  footer,
}: ArithmeticGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Resuelve y elige la respuesta correcta.');
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
    setMessage('Resuelve y elige la respuesta correcta.');
    if (rounds[0]) {
      setOptions(buildOptions(rounds[0].answer, optionsPerRound));
    }
  }, [activityId, rounds, optionsPerRound]);

  useEffect(() => {
    if (rounds[step]) {
      setOptions(buildOptions(rounds[step].answer, optionsPerRound));
    }
  }, [step, rounds, optionsPerRound]);

  const pick = (value: number) => {
    if (!rounds[step]) return;
    const correct = value === rounds[step].answer;
    const next = [...picks, value];
    setPicks(next);
    setMessage(correct ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(correct ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: value, expected: rounds[step].answer, correct });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      const correctCount = next.filter((v, i) => v === rounds[i].answer).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correctCount, total: rounds.length, picks: next });
      evidence.recordLog({
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
      <div className="arithm-problem">
        <span className="arithm-num">{round.left}</span>
        <span className="arithm-op">{round.operation}</span>
        <span className="arithm-num">{round.right}</span>
        <span className="arithm-eq">=</span>
        <span className="arithm-q">?</span>
      </div>
      <div className="arithm-options">
        {shuffle(options).map((opt) => (
          <button
            type="button"
            key={opt}
            className="arithm-option"
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
      footer={footer ?? 'El evaluador revisara las operaciones al finalizar.'}
    />
  );
}

export default ArithmeticGame;

import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

interface NumberSequenceGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  center: number;
  direction: 'before' | 'after' | 'both';
  optionsPerQuestion: number;
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

interface Question {
  id: 'before' | 'after';
  prompt: string;
  correct: number;
  options: number[];
}

const buildQuestions = (center: number, direction: 'before' | 'after' | 'both', optionsPerQuestion: number): Question[] => {
  const list: Question[] = [];
  if (direction === 'before' || direction === 'both') {
    list.push({ id: 'before', prompt: 'Que numero va antes?', correct: center - 1, options: buildOptions(center - 1, optionsPerQuestion) });
  }
  if (direction === 'after' || direction === 'both') {
    list.push({ id: 'after', prompt: 'Que numero va despues?', correct: center + 1, options: buildOptions(center + 1, optionsPerQuestion) });
  }
  return list;
};

export function NumberSequenceGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  center,
  direction,
  optionsPerQuestion,
  progress,
  mascotMessage,
  footer,
}: NumberSequenceGameProps) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(center, direction, optionsPerQuestion));
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
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
    contextData: { step, total: questions.length, picks, center },
  });

  useEffect(() => {
    setQuestions(buildQuestions(center, direction, optionsPerQuestion));
    setStep(0);
    setPicks({});
    setIsComplete(false);
    setMessage('');
  }, [activityId, center, direction, optionsPerQuestion]);

  const pick = (q: Question, value: number) => {
    const next = { ...picks, [q.id]: value };
    setPicks(next);
    setMessage(value === q.correct ? 'Muy bien.' : 'Asignado, el evaluador revisara.');
    setFeedbackKind(value === q.correct ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { question: q.id, picked: value, expected: q.correct });
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const correct = Object.entries(next).filter(([id, v]) => questions.find((x) => x.id === id)?.correct === v).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: questions.length, picks: next });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalQuestions: questions.length,
        picks: next,
      });
      setIsComplete(true);
      answerOnce(correct === questions.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correct,
          totalQuestions: questions.length,
          picks: next,
        }),
      });
    }
  };

  const current = questions[step];

  const playArea = current ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message || current.prompt}</span>
        <strong>{step + 1} / {questions.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={questions.length} />
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Correcto' : 'Intentalo otra vez'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="nsg-sequence">
        {current.id === 'before' ? (
          <>
            <div className="nsg-cell nsg-hint">?</div>
            <div className="nsg-cell nsg-fixed">{center}</div>
          </>
        ) : (
          <>
            <div className="nsg-cell nsg-fixed">{center}</div>
            <div className="nsg-cell nsg-hint">?</div>
          </>
        )}
      </div>
      <div className="nsg-options">
        {shuffle(current.options).map((opt) => (
          <button
            type="button"
            key={opt}
            className="nsg-option"
            onClick={() => pick(current, opt)}
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
      footer={footer ?? 'El evaluador revisara la secuencia al finalizar.'}
    />
  );
}

export default NumberSequenceGame;

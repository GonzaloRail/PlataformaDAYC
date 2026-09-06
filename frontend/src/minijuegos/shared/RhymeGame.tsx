import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './rhyme-game.css';

export interface RhymePair {
  word1: { text: string; emoji: string };
  word2: { text: string; emoji: string };
  rhyme: boolean;
  key: string;
}

interface RhymeGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  pairs: RhymePair[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function RhymeGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  pairs,
  progress,
  mascotMessage,
  footer,
}: RhymeGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Escucha las palabras. Tomas si riman?');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: pairs.length, picks },
  });

  useEffect(() => {
    setStep(0);
    setPicks([]);
    setIsComplete(false);
    setMessage('Escucha las palabras. Tomas si riman?');
  }, [activityId, pairs]);

  const pick = (value: boolean) => {
    const pair = pairs[step];
    if (!pair) return;
    const isCorrect = value === pair.rhyme;
    const next = [...picks, value];
    setPicks(next);
    setMessage(isCorrect ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(isCorrect ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: value, expected: pair.rhyme, correct: isCorrect });
    if (step + 1 < pairs.length) {
      setStep(step + 1);
    } else {
      const correct = next.filter((v, i) => v === pairs[i].rhyme).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: pairs.length, picks: next });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalPairs: pairs.length,
        picks: next,
      });
      setIsComplete(true);
      answerOnce(correct === pairs.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correct,
          totalPairs: pairs.length,
          picks: next,
        }),
      });
    }
  };

  const current = pairs[step];

  const playArea = current ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Par {step + 1} / {pairs.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={pairs.length} />
      <FeedbackBanner
        kind={feedbackKind}
        message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'}
        onDismiss={() => setFeedbackKind(null)}
        autoHideMs={1000}
      />
      <div className="rhyme-cards">
        <div className="rhyme-card">
          <span className="rhyme-emoji" aria-hidden="true">{current.word1.emoji}</span>
          <span className="rhyme-word">{current.word1.text}</span>
        </div>
        <span className="rhyme-plus" aria-hidden="true">+</span>
        <div className="rhyme-card">
          <span className="rhyme-emoji" aria-hidden="true">{current.word2.emoji}</span>
          <span className="rhyme-word">{current.word2.text}</span>
        </div>
      </div>
      <p className="rhyme-question">Estas palabras riman?</p>
      <div className="rhyme-buttons">
        <button type="button" className="rhyme-btn rhyme-btn-yes" onClick={() => pick(true)}>
          Rimannn!
        </button>
        <button type="button" className="rhyme-btn rhyme-btn-no" onClick={() => pick(false)}>
          No rimannn
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
      footer={footer ?? 'El evaluador revisara las rimas al finalizar.'}
    />
  );
}

export default RhymeGame;

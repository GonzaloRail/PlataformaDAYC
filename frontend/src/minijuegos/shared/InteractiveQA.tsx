import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './interactive-qa.css';

export interface QARound {
  stimulus?: { emoji?: string; image?: string; label?: string; description?: string };
  question: string;
  options: { emoji: string; label: string; value: string }[];
  correct: string;
  key: string;
}

type QALayout = 'two-images' | 'scene-tap' | 'options-grid';

interface InteractiveQAProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: QARound[];
  layout: QALayout;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function InteractiveQA({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  layout,
  progress,
  mascotMessage,
  footer,
}: InteractiveQAProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Escucha la pregunta y elige la respuesta.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length, picks, layout },
  });

  useEffect(() => {
    setStep(0);
    setPicks([]);
    setIsComplete(false);
    setMessage('Escucha la pregunta y elige la respuesta.');
  }, [activityId, rounds]);

  const pick = (value: string) => {
    const round = rounds[step];
    if (!round) return;
    const isCorrect = value === round.correct;
    const next = [...picks, value];
    setPicks(next);
    setMessage(isCorrect ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(isCorrect ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: value, expected: round.correct, correct: isCorrect });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      const correct = next.filter((v, i) => v === rounds[i].correct).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: rounds.length, picks: next, layout });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalRounds: rounds.length,
        picks: next,
        layout,
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
          layout,
        }),
      });
    }
  };

  const currentRound = rounds[step];

  const renderTwoImages = () => (
    <div className="iqa-two-images">
      {currentRound.options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          className="iqa-image-option"
          onClick={() => pick(opt.value)}
          aria-label={opt.label}
        >
          <span className="iqa-image-emoji" aria-hidden="true">{opt.emoji}</span>
          <span className="iqa-image-label">{opt.label}</span>
        </button>
      ))}
    </div>
  );

  const renderSceneTap = () => (
    <div className="iqa-scene">
      <div className="iqa-scene-image" aria-hidden="true">
        {currentRound.stimulus?.emoji}
      </div>
      <div className="iqa-scene-targets">
        {currentRound.options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className="iqa-scene-target"
            onClick={() => pick(opt.value)}
            aria-label={opt.label}
          >
            <span aria-hidden="true">{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderOptionsGrid = () => (
    <div className="iqa-grid">
      {currentRound.stimulus ? (
        <div className="iqa-stimulus">
          {currentRound.stimulus.emoji ? (
            <span className="iqa-stimulus-emoji" aria-hidden="true">{currentRound.stimulus.emoji}</span>
          ) : null}
          {currentRound.stimulus.label ? (
            <strong className="iqa-stimulus-label">{currentRound.stimulus.label}</strong>
          ) : null}
          {currentRound.stimulus.description ? (
            <p className="iqa-stimulus-desc">{currentRound.stimulus.description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="iqa-options">
        {currentRound.options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className="iqa-option"
            onClick={() => pick(opt.value)}
            aria-label={opt.label}
          >
            <span className="iqa-option-emoji" aria-hidden="true">{opt.emoji}</span>
            <span className="iqa-option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (!currentRound) return null;
    switch (layout) {
      case 'two-images':
        return renderTwoImages();
      case 'scene-tap':
        return renderSceneTap();
      case 'options-grid':
      default:
        return renderOptionsGrid();
    }
  };

  const playArea = currentRound ? (
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
      <div className="iqa-question" role="heading" aria-level={2}>
        {currentRound.question}
      </div>
      {renderContent()}
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

export default InteractiveQA;

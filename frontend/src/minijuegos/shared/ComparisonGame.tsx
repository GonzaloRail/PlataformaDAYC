import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

interface QuantityRound {
  left: { emoji: string; count: number };
  right: { emoji: string; count: number };
  correct: 'mas' | 'menos' | 'igual';
  key: string;
}

interface NumberRound {
  left: number;
  right: number;
  correct: 'mas' | 'menos' | 'igual';
  key: string;
}

interface TamanioRound {
  items: { emoji: string; label: string; size: number }[];
  question: string;
  correct: number;
  key: string;
}

interface CalidadRound {
  items: { emoji: string; label: string; quality: string }[];
  question: string;
  correct: number;
  key: string;
}

type GameMode = 'cantidad' | 'numero' | 'tamanio' | 'calidad';
type RoundType = QuantityRound | NumberRound | TamanioRound | CalidadRound;

interface ComparisonGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  mode: GameMode;
  rounds: RoundType[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const isQuantity = (r: RoundType): r is QuantityRound => r && 'left' in r && (r as QuantityRound).left !== undefined && typeof (r as QuantityRound).left === 'object' && 'count' in (r as QuantityRound).left;
const isNumber = (r: RoundType): r is NumberRound => r && 'left' in r && typeof (r as NumberRound).left === 'number';
const isTamanio = (r: RoundType): r is TamanioRound => r && 'items' in r && (r as TamanioRound).items.length === 3;
const isCalidad = (r: RoundType): r is CalidadRound => r && 'items' in r && (r as CalidadRound).items.length === 3;

export function ComparisonGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  mode,
  rounds,
  progress,
  mascotMessage,
  footer,
}: ComparisonGameProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Observa y elige la respuesta correcta.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length, picks, mode },
  });

  useEffect(() => {
    setStep(0);
    setPicks([]);
    setIsComplete(false);
    setMessage('Observa y elige la respuesta correcta.');
  }, [activityId, rounds]);

  const isCorrectPick = (round: RoundType, value: string | number): boolean => {
    if (mode === 'cantidad' || mode === 'numero') return value === (round as QuantityRound | NumberRound).correct;
    if (mode === 'tamanio' || mode === 'calidad') return value === (round as TamanioRound | CalidadRound).correct;
    return false;
  };

  const pick = (value: string | number) => {
    const round = rounds[step];
    if (!round) return;
    const isCorrect = isCorrectPick(round, value);
    const next = [...picks, String(value)];
    setPicks(next);
    setMessage(isCorrect ? 'Muy bien.' : 'Sigue intentando en la siguiente ronda.');
    setFeedbackKind(isCorrect ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    evidence.recordEvent(`${activityId}_PICKED`, { step, picked: value, expected: isCorrect, mode });
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      const correct = next.filter((v, i) => {
        const r = rounds[i];
        if (mode === 'tamanio' || mode === 'calidad') return Number(v) === (r as TamanioRound).correct;
        return v === (r as QuantityRound | NumberRound).correct;
      }).length;
      evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: rounds.length, picks: next, mode });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalRounds: rounds.length,
        picks: next,
        mode,
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
          mode,
        }),
      });
    }
  };

  const round = rounds[step];

  const renderTamanio = (r: TamanioRound) => (
    <div className="cmp-triple">
      <div className="iqa-question">{r.question}</div>
      <div className="cmp-triple-items">
        {r.items.map((item, idx) => (
          <button
            type="button"
            key={idx}
            className="cmp-triple-option"
            style={{ transform: `scale(${item.size})` }}
            onClick={() => pick(idx)}
            aria-label={item.label}
          >
            <span className="cmp-triple-emoji" style={{ fontSize: `${1.5 * item.size}rem` }}>{item.emoji}</span>
            <span className="cmp-triple-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCalidad = (r: CalidadRound) => (
    <div className="cmp-triple">
      <div className="iqa-question">{r.question}</div>
      <div className="cmp-triple-items">
        {r.items.map((item, idx) => (
          <button
            type="button"
            key={idx}
            className="cmp-triple-option"
            onClick={() => pick(idx)}
            aria-label={item.label}
          >
            <span className="cmp-triple-emoji">{item.emoji}</span>
            <span className="cmp-triple-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const playArea = round ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {rounds.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={rounds.length} />
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      {mode === 'cantidad' && isQuantity(round) ? (
        <div className="cmp-groups">
          <div className="cmp-group">
            {Array.from({ length: round.left.count }).map((_, i) => (
              <span key={`l-${i}`} className="cg-emoji" aria-hidden="true">{round.left.emoji}</span>
            ))}
          </div>
          <div className="cmp-group">
            {Array.from({ length: round.right.count }).map((_, i) => (
              <span key={`r-${i}`} className="cg-emoji" aria-hidden="true">{round.right.emoji}</span>
            ))}
          </div>
        </div>
      ) : null}
      {mode === 'numero' && isNumber(round) ? (
        <div className="cmp-numbers">
          <div className="cmp-number-card">{round.left}</div>
          <div className="cmp-number-card">{round.right}</div>
        </div>
      ) : null}
      {mode === 'tamanio' && isTamanio(round) ? renderTamanio(round) : null}
      {mode === 'calidad' && isCalidad(round) ? renderCalidad(round) : null}
      {(mode === 'cantidad' || mode === 'numero') ? (
        <div className="cmp-options">
          <button type="button" className="cmp-option" onClick={() => pick('mas')}>Mas</button>
          <button type="button" className="cmp-option" onClick={() => pick('menos')}>Menos</button>
          <button type="button" className="cmp-option" onClick={() => pick('igual')}>Igual</button>
        </div>
      ) : null}
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
      footer={footer ?? 'El evaluador revisara las comparaciones al finalizar.'}
    />
  );
}

export default ComparisonGame;

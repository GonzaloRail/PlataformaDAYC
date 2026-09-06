import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';

interface QuantityRound {
  id: string;
  emoji: string;
  start: number;
  target: number;
  key: string;
}

interface QuantityGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: QuantityRound[];
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

export function QuantityGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  progress,
  mascotMessage,
  footer,
}: QuantityGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [order] = useState<QuantityRound[]>(() => shuffle(rounds));
  const [current, setCurrent] = useState(order[0]?.start ?? 0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Agrega o quita hasta llegar a la cantidad pedida.');
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: order.length, current, completed },
  });

  useEffect(() => {
    setStep(0);
    setCurrent(order[0]?.start ?? 0);
    setCompleted([]);
    setIsComplete(false);
    setMessage('Agrega o quita hasta llegar a la cantidad pedida.');
  }, [activityId, order]);

  const round = order[step];
  if (!round) return null;

  const add = () => setCurrent((c) => c + 1);
  const sub = () => setCurrent((c) => Math.max(0, c - 1));

  const confirm = () => {
    const correct = current === round.target;
    const next = [...completed, round.id];
    setCompleted(next);
    evidence.recordEvent(`${activityId}_ROUND_DONE`, { round: round.id, current, expected: round.target, correct });
    if (step + 1 < order.length) {
      setStep(step + 1);
      setCurrent(order[step + 1].start);
    } else {
      const finalCount = order.reduce(
        (acc, r, i) => acc + (i === order.length - 1 ? (current === r.target ? 1 : 0) : (completed[i] ? 1 : 0)),
        0,
      );
      evidence.recordEvent(`${activityId}_FINISHED`, { correctCount: finalCount, total: order.length });
      evidence.recordLog({
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correctCount: finalCount,
        totalRounds: order.length,
      });
      setIsComplete(true);
      answerOnce(finalCount === order.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correctCount: finalCount,
          totalRounds: order.length,
        }),
      });
    }
    void correct;
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {order.length}</strong>
      </div>
      <div className="qg-goal">
        <p>Llega a <strong>{round.target}</strong></p>
        <p>Tienes <strong>{current}</strong></p>
      </div>
      <div className="qg-objects" aria-label={`Hay ${current} objetos`}>
        {Array.from({ length: current }).map((_, i) => (
          <span key={i} className="cg-emoji" aria-hidden="true">{round.emoji}</span>
        ))}
      </div>
      <div className="qg-actions">
        <button type="button" onClick={sub} disabled={current === 0} aria-label="Quitar uno">-1</button>
        <button type="button" onClick={add} aria-label="Agregar uno">+1</button>
        <button type="button" className="kid-action-btn kid-action-primary" onClick={confirm} disabled={current !== round.target}>
          Ya esta
        </button>
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      footer={footer ?? 'El evaluador revisara la cantidad alcanzada al finalizar.'}
    />
  );
}

export default QuantityGame;

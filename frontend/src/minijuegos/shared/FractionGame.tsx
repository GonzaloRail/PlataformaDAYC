import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';

export interface FractionShape {
  id: string;
  label: string;
  emoji: string;
  state: 'completo' | 'medio';
}

interface FractionGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  shapes: FractionShape[];
  question: 'cual_medio' | 'cual_completo' | 'ambos';
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const filterByQuestion = (shapes: FractionShape[], q: 'cual_medio' | 'cual_completo' | 'ambos') => {
  if (q === 'ambos') return shapes;
  return shapes.filter((s) => (q === 'cual_medio' ? s.state === 'medio' : s.state === 'completo'));
};

export function FractionGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  shapes,
  question,
  progress,
  mascotMessage,
  footer,
}: FractionGameProps) {
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca los que estan a la mitad o completos, segun la consigna.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { total: shapes.length, picks, question },
  });

  useEffect(() => {
    setPicks([]);
    setIsComplete(false);
    setMessage('Toca los que estan a la mitad o completos, segun la consigna.');
  }, [activityId, shapes, question]);

  const expected = new Set(filterByQuestion(shapes, question).map((s) => s.id));

  const toggle = (id: string) => {
    setPicks((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const finish = () => {
    const correct = picks.filter((p) => expected.has(p)).length;
    const extras = picks.filter((p) => !expected.has(p)).length;
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, extras, total: expected.size, picks, question });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      extras,
      totalExpected: expected.size,
      picks,
      question,
    });
    setIsComplete(true);
    answerOnce(correct === expected.size && extras === 0 ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        extras,
        totalExpected: expected.size,
        picks,
        question,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{picks.length} seleccionados</strong>
      </div>
      <div className="fg-grid">
        {shapes.map((s) => {
          const isPicked = picks.includes(s.id);
          return (
            <button
              type="button"
              key={s.id}
              className={`fg-card${isPicked ? ' is-picked' : ''}`}
              onClick={() => toggle(s.id)}
              aria-pressed={isPicked}
              aria-label={s.label}
            >
              <span className="fg-emoji" aria-hidden="true">{s.emoji}</span>
              <span className="fg-label">{s.label}</span>
              <span className={`fg-badge fg-badge-${s.state}`}>
                {s.state === 'completo' ? 'Completo' : 'A la mitad'}
              </span>
            </button>
          );
        })}
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
      actions={
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish} disabled={picks.length === 0}>
          Termine
        </button>
      }
      footer={footer ?? 'El evaluador revisara las selecciones al finalizar.'}
    />
  );
}

export default FractionGame;

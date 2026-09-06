import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';

interface ReadingPosition {
  id: string;
  row: number;
  col: number;
  symbol: string;
}

interface ReadingDirectionGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  prompt: string;
  rows: number;
  cols: number;
  symbols?: string[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const buildGrid = (rows: number, cols: number, symbols: string[]): ReadingPosition[] => {
  const out: ReadingPosition[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const symbol = symbols[(r * cols + c) % symbols.length] ?? '*';
      out.push({ id: `r${r}c${c}`, row: r, col: c, symbol });
    }
  }
  return out;
};

export function ReadingDirectionGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  prompt,
  rows,
  cols,
  symbols = ['🐶', '🐱', '🐰', '🐻', '🦊', '🐼', '🦁', '🐯', '🐮'],
  progress,
  mascotMessage,
  footer,
}: ReadingDirectionGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState<ReadingPosition | null>(null);
  const [arrows, setArrows] = useState<string[]>([]);
  const [step, setStep] = useState<'start' | 'arrows' | 'done'>('start');
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca donde se empieza a leer.');
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  const grid = buildGrid(rows, cols, symbols);

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { start, arrows, step, rows, cols },
  });

  useEffect(() => {
    setStart(null);
    setArrows([]);
    setStep('start');
    setIsComplete(false);
    setMessage('Toca donde se empieza a leer.');
  }, [activityId]);

  const pickStart = (pos: ReadingPosition) => {
    setStart(pos);
    setMessage('Ahora toca las flechas en el orden de la lectura.');
    setStep('arrows');
    evidence.recordEvent(`${activityId}_START_PICKED`, { row: pos.row, col: pos.col });
  };

  const pickArrow = (direction: 'right' | 'down' | 'down-right' | 'stop') => {
    if (step !== 'arrows') return;
    setArrows((cur) => [...cur, direction]);
    evidence.recordEvent(`${activityId}_ARROW_PICKED`, { direction });
    if (direction === 'stop') {
      setStep('done');
    }
  };

  const finish = () => {
    evidence.recordEvent(`${activityId}_FINISHED`, { start, arrows, rows, cols });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: start !== null,
      start,
      arrows,
      rows,
      cols,
    });
    setIsComplete(true);
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: start !== null,
        start,
        arrows,
        rows,
        cols,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message || prompt}</span>
        <strong>{step === 'start' ? 'Inicio' : step === 'arrows' ? 'Direccion' : 'Listo'}</strong>
      </div>
      <div className="rdg-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {grid.map((cell) => {
          const isStart = start?.id === cell.id;
          return (
            <button
              type="button"
              key={cell.id}
              className={`rdg-cell${isStart ? ' is-start' : ''}`}
              onClick={() => pickStart(cell)}
              aria-label={`Posicion fila ${cell.row + 1} columna ${cell.col + 1}`}
            >
              <span aria-hidden="true">{cell.symbol}</span>
              {isStart ? <span className="rdg-star" aria-hidden="true">★</span> : null}
            </button>
          );
        })}
      </div>
      {step === 'arrows' || step === 'done' ? (
        <div className="rdg-arrows">
          <button type="button" onClick={() => pickArrow('right')}>→ Derecha</button>
          <button type="button" onClick={() => pickArrow('down')}>↓ Abajo</button>
          <button type="button" onClick={() => pickArrow('down-right')}>↘ Diagonal</button>
          <button type="button" onClick={() => pickArrow('stop')}>Terminar</button>
        </div>
      ) : null}
      {arrows.length > 0 ? (
        <div className="rdg-arrow-history" aria-live="polite">
          {arrows.map((a, i) => (
            <span key={i} className="rdg-arrow-chip">{a}</span>
          ))}
        </div>
      ) : null}
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish} disabled={!start}>
          Listo
        </button>
      }
      footer={footer ?? 'El evaluador revisara la direccion de lectura indicada.'}
    />
  );
}

export default ReadingDirectionGame;

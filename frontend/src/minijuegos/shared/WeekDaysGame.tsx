import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import VerbalResponseGame from './VerbalResponseGame';
import './shared-games.css';

interface WeekDaysGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  prompt: string;
  mode: 'verbal' | 'order';
  captureAudio: boolean;
  days?: string[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const DEFAULT_DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function WeekDaysGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  prompt,
  mode,
  captureAudio,
  days = DEFAULT_DAYS,
  progress,
  mascotMessage,
  footer,
}: WeekDaysGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [order, setOrder] = useState<string[]>(() => shuffle(days));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Ordena los dias de la semana.');
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { mode, order, captureAudio },
  });

  useEffect(() => {
    setOrder(shuffle(days));
    setDraggedId(null);
    setDragOver(null);
    setIsComplete(false);
    setMessage('Ordena los dias de la semana.');
  }, [activityId, days]);

  if (mode === 'verbal') {
    return (
      <VerbalResponseGame
        currentItem={currentItem}
        onAnswer={onAnswer}
        activityId={activityId}
        title={title}
        instruction={instruction}
        prompt={prompt}
        captureAudio={captureAudio}
        panelType="counter"
        counterMax={7}
        progress={progress}
        mascotMessage={mascotMessage}
        footer={footer}
      />
    );
  }

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOver(null);
      return;
    }
    const draggedIdx = order.indexOf(draggedId);
    const targetIdx = order.indexOf(targetId);
    if (draggedIdx < 0 || targetIdx < 0) return;
    const next = [...order];
    next.splice(draggedIdx, 1);
    next.splice(targetIdx, 0, draggedId);
    setOrder(next);
    setDraggedId(null);
    setDragOver(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(targetId);
  };

  const finish = () => {
    const correct = order.filter((d, idx) => d === days[idx]).length;
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: days.length, finalOrder: order });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      totalDays: days.length,
      finalOrder: order,
    });
    setIsComplete(true);
    answerOnce(correct === days.length ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalDays: days.length,
        finalOrder: order,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Modo orden</strong>
      </div>
      <ol className="wdg-list">
        {order.map((day, idx) => (
          <li
            key={day}
            className={`wdg-item${dragOver === day ? ' is-drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, day)}
            onDrop={(e) => handleDrop(e, day)}
          >
            <span className="wdg-position">{idx + 1}</span>
            <button
              type="button"
              className="wdg-card"
              draggable
              onDragStart={(e) => handleDragStart(e, day)}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOver(null);
              }}
              aria-label={`${day}, posicion ${idx + 1}`}
            >
              {day}
            </button>
          </li>
        ))}
      </ol>
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish}>
          Termine
        </button>
      }
      footer={footer ?? 'El evaluador revisara el orden registrado.'}
    />
  );
}

export default WeekDaysGame;

import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';

export interface OrderingItem {
  id: string;
  label: string;
  emoji: string;
  value: number;
}

interface OrderingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  items: OrderingItem[];
  direction: 'asc' | 'desc';
  kind: 'size' | 'number' | 'story';
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

export function OrderingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  items,
  direction,
  kind,
  progress,
  mascotMessage,
  footer,
}: OrderingGameProps) {
  const [order, setOrder] = useState<string[]>(() => shuffle(items).map((it) => it.id));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Ordena arrastrando o tocando para mover.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const itemIds = items.map((item) => item.id).join('|');

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { totalItems: items.length, moveCount, kind },
  });

  useEffect(() => {
    setOrder(shuffle(itemIds ? itemIds.split('|') : []));
    setDraggedId(null);
    setDragOver(null);
    setMoveCount(0);
    setIsComplete(false);
    setMessage('Ordena arrastrando o tocando para mover.');
  }, [activityId, itemIds]);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, targetId: string) => {
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
    setMoveCount((c) => c + 1);
    setDraggedId(null);
    setDragOver(null);
    setMessage('Movido.');
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(targetId);
  };

  const moveUp = (id: string) => {
    const idx = order.indexOf(id);
    if (idx <= 0) return;
    const next = [...order];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setOrder(next);
    setMoveCount((c) => c + 1);
  };

  const moveDown = (id: string) => {
    const idx = order.indexOf(id);
    if (idx < 0 || idx >= order.length - 1) return;
    const next = [...order];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setOrder(next);
    setMoveCount((c) => c + 1);
  };

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      moveUp(id);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      moveDown(id);
    }
  };

  const isOrdered = () => {
    const orderedIds = [...items]
      .sort((a, b) => (direction === 'asc' ? a.value - b.value : b.value - a.value))
      .map((it) => it.id);
    return order.every((id, idx) => id === orderedIds[idx]);
  };

  const finish = () => {
    const orderedIds = [...items]
      .sort((a, b) => (direction === 'asc' ? a.value - b.value : b.value - a.value))
      .map((it) => it.id);
    const correctPositions = order.filter((id, idx) => id === orderedIds[idx]).length;
    const finalOrder = order.map((id) => {
      const it = items.find((x) => x.id === id);
      return { id, label: it?.label, value: it?.value };
    });
    evidence.recordEvent(`${activityId}_FINISHED`, { correctPositions, total: items.length, moveCount, finalOrder, direction, kind });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correctPositions,
      totalItems: items.length,
      moveCount,
      direction,
      kind,
      finalOrder,
    });
    setIsComplete(true);
    answerOnce(isOrdered() ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correctPositions,
        totalItems: items.length,
        moveCount,
        direction,
        kind,
        finalOrder,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{direction === 'asc' ? 'Menor a mayor' : 'Mayor a menor'}</strong>
      </div>
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Vas bien' : 'Sigue intentando'} onDismiss={() => setFeedbackKind(null)} />
      <ol className="og-list">
        {order.map((id, idx) => {
          const it = items.find((x) => x.id === id);
          if (!it) return null;
          return (
            <li
              key={id}
              className={`og-item${dragOver === id ? ' is-drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={(e) => handleDrop(e, id)}
            >
              <button
                type="button"
                className="og-handle"
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragEnd={() => {
                  setDraggedId(null);
                  setDragOver(null);
                }}
                onKeyDown={(e) => handleKey(e, id)}
                aria-label={`${it.label}, posicion ${idx + 1}`}
              >
                <span className="og-emoji" aria-hidden="true">{it.emoji}</span>
                <span className="og-label">{it.label}</span>
                <span className="og-position">{idx + 1}</span>
              </button>
              <div className="og-arrows">
                <button type="button" onClick={() => moveUp(id)} disabled={idx === 0} aria-label="Subir">↑</button>
                <button type="button" onClick={() => moveDown(id)} disabled={idx === order.length - 1} aria-label="Bajar">↓</button>
              </div>
            </li>
          );
        })}
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
          Ya ordene
        </button>
      }
      footer={footer ?? 'El evaluador revisara el orden registrado al finalizar.'}
    />
  );
}

export default OrderingGame;

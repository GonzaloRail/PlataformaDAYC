import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';

export interface StoryScene {
  id: string;
  order: number;
  emoji: string;
  caption: string;
}

interface SequenceStoryGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  scenes: StoryScene[];
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

export function SequenceStoryGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  scenes,
  progress,
  mascotMessage,
  footer,
}: SequenceStoryGameProps) {
  const [order, setOrder] = useState<string[]>(() => shuffle(scenes).map((s) => s.id));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Ordena las escenas para contar la historia.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { total: scenes.length, order },
  });

  useEffect(() => {
    setOrder(shuffle(scenes).map((s) => s.id));
    setDraggedId(null);
    setDragOver(null);
    setIsComplete(false);
    setMessage('Ordena las escenas para contar la historia.');
  }, [activityId, scenes]);

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
    setDraggedId(null);
    setDragOver(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(targetId);
  };

  const moveLeft = (id: string) => {
    const idx = order.indexOf(id);
    if (idx <= 0) return;
    const next = [...order];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setOrder(next);
  };

  const moveRight = (id: string) => {
    const idx = order.indexOf(id);
    if (idx < 0 || idx >= order.length - 1) return;
    const next = [...order];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setOrder(next);
  };

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveLeft(id);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveRight(id);
    }
  };

  const finish = () => {
    const correct = order.filter((id, idx) => {
      const scene = scenes.find((s) => s.id === id);
      return scene ? scene.order === idx + 1 : false;
    }).length;
    const finalOrder = order.map((id) => {
      const scene = scenes.find((s) => s.id === id);
      return { id, caption: scene?.caption, expected_order: scene?.order };
    });
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: scenes.length, finalOrder });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      totalScenes: scenes.length,
      finalOrder,
    });
    setIsComplete(true);
    answerOnce(correct === scenes.length ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalScenes: scenes.length,
        finalOrder,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{order.length} escenas</strong>
      </div>
      <ol className="sseq-list">
        {order.map((id, idx) => {
          const scene = scenes.find((s) => s.id === id);
          if (!scene) return null;
          return (
            <li
              key={id}
              className={`sseq-item${dragOver === id ? ' is-drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={(e) => handleDrop(e, id)}
            >
              <span className="sseq-position">{idx + 1}</span>
              <button
                type="button"
                className="sseq-card"
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragEnd={() => {
                  setDraggedId(null);
                  setDragOver(null);
                }}
                onKeyDown={(e) => handleKey(e, id)}
                aria-label={`Escena ${idx + 1}: ${scene.caption}`}
              >
                <span className="sseq-emoji" aria-hidden="true">{scene.emoji}</span>
                <span className="sseq-caption">{scene.caption}</span>
              </button>
              <div className="sseq-arrows">
                <button type="button" onClick={() => moveLeft(id)} disabled={idx === 0} aria-label="Mover izquierda">←</button>
                <button type="button" onClick={() => moveRight(id)} disabled={idx === order.length - 1} aria-label="Mover derecha">→</button>
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
          Ya ordene la historia
        </button>
      }
      footer={footer ?? 'El evaluador revisara la secuencia registrada al finalizar.'}
    />
  );
}

export default SequenceStoryGame;

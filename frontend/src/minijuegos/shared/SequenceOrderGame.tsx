import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './sequence-order.css';

export interface SequenceStep {
  id: string;
  label: string;
  emoji: string;
}

interface SequenceOrderGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  steps: SequenceStep[];
  correctOrder: string[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function SequenceOrderGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  steps,
  correctOrder,
  progress,
  mascotMessage,
  footer,
}: SequenceOrderGameProps) {
  const [placed, setPlaced] = useState<(string | null)[]>(() => Array(steps.length).fill(null));
  const [pool, setPool] = useState<string[]>(() => steps.map((s) => s.id).sort(() => Math.random() - 0.5));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { placed, totalSteps: steps.length },
  });

  useEffect(() => {
    setPlaced(Array(steps.length).fill(null));
    setPool(steps.map((s) => s.id).sort(() => Math.random() - 0.5));
    setDraggedId(null);
    setDragOverIdx(null);
    setSelectedId(null);
    setIsComplete(false);
  }, [activityId, steps]);

  const removeFromPlaced = (stepId: string) => {
    setPlaced((prev) => prev.map((id) => (id === stepId ? null : id)));
    setPool((prev) => [...prev, stepId]);
  };

  const placeStep = (stepId: string, index: number) => {
    const currentAtIdx = placed[index];
    const newPlaced = [...placed];
    if (currentAtIdx) {
      setPool((prev) => [...prev, currentAtIdx]);
    }
    newPlaced[index] = stepId;
    setPlaced(newPlaced);
    setPool((prev) => prev.filter((id) => id !== stepId));
    evidence.recordEvent(`${activityId}_STEP_PLACED`, { stepId, index });
  };

  const handleSlotClick = (idx: number) => {
    if (!selectedId) return;
    placeStep(selectedId, idx);
    setSelectedId(null);
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, idx: number) => {
    e.preventDefault();
    const id = draggedId || e.dataTransfer.getData('text/plain');
    if (id) placeStep(id, idx);
    setDraggedId(null);
    setDragOverIdx(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIdx(idx);
  };

  const finish = () => {
    evidence.recordEvent(`${activityId}_FINISHED`, { placed, correctOrder });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      placed,
      correctOrder,
    });
    setIsComplete(true);
    const correct = placed.every((id, i) => id === correctOrder[i]);
    answerOnce(correct ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        placed,
        correctOrder,
      }),
    });
  };

  const getStepById = (id: string) => steps.find((s) => s.id === id);

  const isReady = placed.every((p) => p !== null);

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>Ordena los pasos. Arrastra cada uno a su posicion correcta.</span>
        <strong>{placed.filter(Boolean).length}/{steps.length} ordenados</strong>
      </div>
      <div className="so-slots">
        {placed.map((stepId, idx) => {
          const step = stepId ? getStepById(stepId) : null;
          return (
            <button
              type="button"
              key={idx}
              className={`so-slot${dragOverIdx === idx ? ' is-drag-over' : ''}${selectedId ? ' is-ready' : ''}${step ? ' has-step' : ''}`}
              onDrop={(e) => handleDrop(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={() => setDragOverIdx(null)}
              onClick={() => { if (step) { removeFromPlaced(stepId!); setSelectedId(null); } else { handleSlotClick(idx); } }}
              onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (step) removeFromPlaced(stepId!); else handleSlotClick(idx); } }}
              aria-label={`Paso ${idx + 1}`}
            >
              <span className="so-slot-number">{idx + 1}</span>
              {step ? (
                <span className="so-slot-content">
                  <span aria-hidden="true">{step.emoji}</span>
                  <span>{step.label}</span>
                </span>
              ) : (
                <span className="so-slot-empty">Arrastra aqui</span>
              )}
            </button>
          );
        })}
      </div>
      <div
        className={`sg-pool${selectedId ? ' is-ready' : ''}`}
        onDrop={(e) => { e.preventDefault(); setDraggedId(null); }}
        onDragOver={(e) => { e.preventDefault(); }}
      >
        <div className="sg-pool-title">
          <span aria-hidden="true">📋</span>
          <div>
            <strong>Pasos</strong>
            <p>Toca o arrastra cada paso a su numero.</p>
          </div>
        </div>
        <div className="sg-pool-items">
          {pool.map((id) => {
            const step = getStepById(id);
            if (!step) return null;
            return (
              <button
                type="button"
                key={id}
                className={`sg-item${selectedId === id ? ' is-selected' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragEnd={() => { setDraggedId(null); setDragOverIdx(null); }}
                onClick={() => setSelectedId((cur) => (cur === id ? null : id))}
                aria-label={step.label}
              >
                <span className="sg-item-emoji" aria-hidden="true">{step.emoji}</span>
                <span className="sg-item-label">{step.label}</span>
              </button>
            );
          })}
        </div>
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish} disabled={!isReady}>
          Termine de ordenar
        </button>
      }
      footer={footer ?? 'El evaluador revisara el orden registrado al finalizar.'}
    />
  );
}

export default SequenceOrderGame;

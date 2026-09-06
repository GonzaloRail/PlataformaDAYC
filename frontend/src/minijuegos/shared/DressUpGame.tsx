import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './dress-up.css';

export interface DressUpItem {
  id: string;
  label: string;
  emoji: string;
  slot: string;
}

interface DressUpGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  items: DressUpItem[];
  characterEmoji: string;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

interface SlotDef {
  id: string;
  label: string;
  emoji: string;
  top: string;
}

const SLOTS: SlotDef[] = [
  { id: 'cabeza', label: 'Cabeza', emoji: '🎩', top: '5%' },
  { id: 'torso', label: 'Torso', emoji: '👕', top: '42%' },
  { id: 'piernas', label: 'Piernas', emoji: '👖', top: '68%' },
];

type Phase = 'dressing' | 'finished';

export function DressUpGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  items,
  characterEmoji,
  progress,
  mascotMessage,
  footer,
}: DressUpGameProps) {
  const [placed, setPlaced] = useState<Record<string, string | null>>({ cabeza: null, torso: null, piernas: null });
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('dressing');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const itemIds = items.map((item) => item.id).join('|');

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'finished',
    contextData: { placed },
  });

  useEffect(() => {
    setPlaced({ cabeza: null, torso: null, piernas: null });
    setDraggedId(null);
    setDragOverSlot(null);
    setSelectedId(null);
    setPhase('dressing');
  }, [activityId, itemIds]);

  const itemsInSlot = (slotId: string) => {
    const itemId = placed[slotId];
    if (!itemId) return [];
    const item = items.find((it) => it.id === itemId);
    return item ? [item] : [];
  };

  const itemsInPool = () => {
    const placedIds = Object.values(placed).filter(Boolean) as string[];
    return items.filter((it) => !placedIds.includes(it.id));
  };

  const moveItem = (itemId: string, targetSlot: string) => {
    const currentSlot = Object.entries(placed).find(([, v]) => v === itemId)?.[0];
    if (currentSlot === targetSlot) {
      setSelectedId(null);
      return;
    }
    const newPlaced = { ...placed };
    if (currentSlot) newPlaced[currentSlot] = null;
    newPlaced[targetSlot] = itemId;
    setPlaced(newPlaced);
    setSelectedId(null);
    evidence.recordEvent(`${activityId}_ITEM_MOVED`, { itemId, fromSlot: currentSlot, toSlot: targetSlot });
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    setSelectedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, target: string) => {
    e.preventDefault();
    const id = draggedId || e.dataTransfer.getData('text/plain');
    if (id) moveItem(id, target);
    setDraggedId(null);
    setDragOverSlot(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, target: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot(target);
  };

  const handleItemClick = (id: string) => {
    setSelectedId((cur) => (cur === id ? null : id));
  };

  const handleSlotClick = (slotId: string) => {
    if (!selectedId) return;
    moveItem(selectedId, slotId);
  };

  const handleBackToPool = (e: DragEvent<HTMLElement>, itemId: string) => {
    e.preventDefault();
    const sourceSlot = Object.entries(placed).find(([, v]) => v === itemId)?.[0];
    if (sourceSlot) {
      setPlaced((prev) => ({ ...prev, [sourceSlot]: null }));
      evidence.recordEvent(`${activityId}_ITEM_RETURNED`, { itemId, fromSlot: sourceSlot });
    }
    setDraggedId(null);
  };

  const finish = () => {
    evidence.recordEvent(`${activityId}_FINISHED`, { placed });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      placed,
    });
    setPhase('finished');
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        placed,
      }),
    });
  };

  const renderItem = (item: DressUpItem, inSlot: string | null) => {
    const isSelected = selectedId === item.id;
    const isDragging = draggedId === item.id;
    return (
      <button
        type="button"
        key={item.id}
        className={`sg-item${isSelected ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragEnd={() => { setDraggedId(null); setDragOverSlot(null); }}
        onClick={(e) => { e.stopPropagation(); handleItemClick(item.id); }}
        onDrop={inSlot ? (e) => handleBackToPool(e, item.id) : undefined}
        onDragOver={inSlot ? (e) => handleDragOver(e, 'pool') : undefined}
        aria-pressed={isSelected}
        aria-label={item.label}
      >
        <span className="sg-item-emoji" aria-hidden="true">{item.emoji}</span>
        <span className="sg-item-label">{item.label}</span>
      </button>
    );
  };

  const renderSlotContent = (slot: SlotDef) => {
    const itemsInThisSlot = itemsInSlot(slot.id);
    if (itemsInThisSlot.length === 0) {
      return <span className="du-empty-slot">{slot.emoji}</span>;
    }
    return itemsInThisSlot.map((item) => renderItem(item, slot.id));
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>Viste al personaje. Arrastra la ropa a cada parte del cuerpo.</span>
      </div>
      <div className="du-scene">
        <div className="du-character-wrap">
          <div className="du-character">
            <span className="du-character-emoji" aria-hidden="true">{characterEmoji}</span>
          </div>
          <div className="du-slots">
            {SLOTS.map((slot) => (
              <button
                type="button"
                key={slot.id}
                className={`du-slot${dragOverSlot === slot.id ? ' is-drag-over' : ''}${selectedId ? ' is-ready' : ''}`}
                style={{ top: slot.top }}
                onDrop={(e) => handleDrop(e, slot.id)}
                onDragOver={(e) => handleDragOver(e, slot.id)}
                onDragLeave={() => setDragOverSlot(null)}
                onClick={() => handleSlotClick(slot.id)}
                onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSlotClick(slot.id); } }}
                aria-label={`Slot de ${slot.label}`}
              >
                {renderSlotContent(slot)}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`sg-pool${dragOverSlot === 'pool' ? ' is-drag-over' : ''}`}
          onDrop={(e) => handleDrop(e, 'pool')}
          onDragOver={(e) => handleDragOver(e, 'pool')}
          onDragLeave={() => setDragOverSlot(null)}
        >
          <div className="sg-pool-title">
            <span aria-hidden="true">🧺</span>
            <div>
              <strong>Armario</strong>
              <p>Elige ropa y arrastrala al personaje.</p>
            </div>
          </div>
          <div className="sg-pool-items">
            {itemsInPool().map((item) => renderItem(item, null))}
          </div>
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish}>
          Termine de vestir
        </button>
      }
      footer={footer ?? 'El evaluador revisara el disfraz creado al finalizar.'}
    />
  );
}

export default DressUpGame;

import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './feedback.css';

export interface MatchingItem {
  id: string;
  label: string;
  emoji: string;
  zoneId: string;
}

export interface MatchingZone {
  id: string;
  label: string;
  emoji: string;
  hint?: string;
}

interface MatchingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  items: MatchingItem[];
  zones: MatchingZone[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
  onEvent?: (event: string, payload: Record<string, unknown>) => void;
}

type ZoneOrPool = string | 'pool';

interface PlacedItem {
  id: string;
  zoneId: ZoneOrPool;
}

export function MatchingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  items,
  zones,
  progress,
  mascotMessage,
  footer,
  onEvent,
}: MatchingGameProps) {
  const [placed, setPlaced] = useState<PlacedItem[]>(() => items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<ZoneOrPool | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca o arrastra cada objeto hasta su caja.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const itemIds = items.map((item) => item.id).join('|');

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { totalItems: items.length, moveCount },
  });

  useEffect(() => {
    setPlaced(itemIds ? itemIds.split('|').map((id) => ({ id, zoneId: 'pool' as ZoneOrPool })) : []);
    setDraggedId(null);
    setDragOver(null);
    setSelectedId(null);
    setMoveCount(0);
    setIsComplete(false);
    setMessage('Toca o arrastra cada objeto hasta su caja.');
  }, [activityId, itemIds]);

  const itemsInZone = (zoneId: ZoneOrPool) => placed.filter((p) => p.zoneId === zoneId);

  const moveItem = (itemId: string, targetZone: ZoneOrPool) => {
    const item = items.find((it) => it.id === itemId);
    const current = placed.find((p) => p.id === itemId);
    if (!item || !current || current.zoneId === targetZone) {
      setSelectedId(null);
      return;
    }

    setPlaced((prev) => prev.map((p) => (p.id === itemId ? { ...p, zoneId: targetZone } : p)));
    setMoveCount((c) => c + 1);
    setSelectedId(null);
    const targetLabel = targetZone === 'pool' ? 'la bandeja' : zones.find((z) => z.id === targetZone)?.label ?? targetZone;
    setMessage(`${item.label} fue a ${targetLabel}.`);
    const correct = targetZone === item.zoneId;
    evidence.recordEvent(`${activityId}_ITEM_MOVED`, {
      item_id: item.id,
      item_label: item.label,
      from_zone: current.zoneId,
      to_zone: targetZone,
      expected_zone: item.zoneId,
      correct,
    });
    onEvent?.('item_moved', { itemId, from: current.zoneId, to: targetZone, correct });
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    setSelectedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, target: ZoneOrPool) => {
    e.preventDefault();
    e.stopPropagation();
    let id = draggedId;
    if (!id) {
      try {
        id = e.dataTransfer.getData('text/plain') || null;
      } catch {
        id = null;
      }
    }
    if (id) {
      moveItem(id, target);
    }
    setDraggedId(null);
    setDragOver(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, target: ZoneOrPool) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(target);
  };

  const handleItemClick = (id: string) => {
    setSelectedId((cur) => (cur === id ? null : id));
    const item = items.find((it) => it.id === id);
    setMessage(item ? `Ahora toca la caja para ${item.label}.` : 'Elige una caja.');
  };

  const handleZoneClick = (zoneId: ZoneOrPool) => {
    if (!selectedId) {
      setMessage('Primero elige un objeto.');
      return;
    }
    moveItem(selectedId, zoneId);
  };

  const handleZoneKeyDown = (e: KeyboardEvent<HTMLDivElement>, zoneId: ZoneOrPool) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleZoneClick(zoneId);
    }
  };

  const placedCount = itemsInZone('pool').length === 0 ? items.length : 0;
  const isReady = itemsInZone('pool').length === 0;

  const finish = () => {
    const correct = placed.filter((p) => {
      const item = items.find((it) => it.id === p.id);
      return item ? item.zoneId === p.zoneId : false;
    }).length;

    const finalState = placed.map((p) => {
      const item = items.find((it) => it.id === p.id);
      return {
        id: p.id,
        label: item?.label ?? p.id,
        placed_zone: p.zoneId,
        expected_zone: item?.zoneId ?? null,
      };
    });

    evidence.recordEvent(`${activityId}_FINISHED`, { correct, totalItems: items.length, moveCount, finalState });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      totalItems: items.length,
      moveCount,
      finalState,
    });
    setIsComplete(true);
    onEvent?.('finished', { correct, total: items.length, moveCount });
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalItems: items.length,
        moveCount,
        finalState,
      }),
    });
  };

  const renderItemButton = (item: MatchingItem, currentZone: ZoneOrPool) => {
    const isSelected = selectedId === item.id;
    const isDragging = draggedId === item.id;
    return (
      <button
        type="button"
        key={item.id}
        className={`sg-item${isSelected ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragOver={(e) => {
          if (draggedId && draggedId !== item.id) {
            e.preventDefault();
            e.stopPropagation();
            handleDragOver(e, currentZone);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDrop(e, currentZone);
        }}
        onDragEnd={() => {
          setDraggedId(null);
          setDragOver(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedId && selectedId !== item.id) {
            moveItem(selectedId, currentZone);
          } else {
            handleItemClick(item.id);
          }
        }}
        aria-pressed={isSelected}
        aria-label={item.label}
      >
        <span className="sg-item-emoji" aria-hidden="true">{item.emoji}</span>
        <span className="sg-item-label">{item.label}</span>
      </button>
    );
  };

  const renderItemsIn = (zoneId: ZoneOrPool) => {
    const list = itemsInZone(zoneId).map((p) => items.find((it) => it.id === p.id)).filter(Boolean) as MatchingItem[];
    if (list.length === 0) {
      return <p className="sg-empty">Suelta aqui</p>;
    }
    return list.map((it) => renderItemButton(it, zoneId));
  };

  const renderZone = (zone: MatchingZone) => (
    <div
      key={zone.id}
      className={`sg-zone${dragOver === zone.id ? ' is-drag-over' : ''}${selectedId ? ' is-ready' : ''}`}
      onDrop={(e) => handleDrop(e, zone.id)}
      onDragOver={(e) => handleDragOver(e, zone.id)}
      onDragLeave={() => setDragOver(null)}
      onClick={() => handleZoneClick(zone.id)}
      onKeyDown={(e) => handleZoneKeyDown(e, zone.id)}
      role="button"
      tabIndex={0}
      aria-label={`Caja de ${zone.label}`}
    >
      <div className="sg-zone-header">
        <span className="sg-zone-icon" aria-hidden="true">{zone.emoji}</span>
        <div>
          <div className="sg-zone-title">{zone.label}</div>
          {zone.hint ? <p>{zone.hint}</p> : null}
        </div>
      </div>
      <div className="sg-zone-items">{renderItemsIn(zone.id)}</div>
    </div>
  );

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{placedCount}/{items.length} ubicados</strong>
      </div>

      <div
        className={`sg-pool${dragOver === 'pool' ? ' is-drag-over' : ''}`}
        onDrop={(e) => handleDrop(e, 'pool')}
        onDragOver={(e) => handleDragOver(e, 'pool')}
        onDragLeave={() => setDragOver(null)}
        onClick={() => handleZoneClick('pool')}
        onKeyDown={(e) => handleZoneKeyDown(e, 'pool')}
        role="button"
        tabIndex={0}
        aria-label="Bandeja de objetos sin ubicar"
      >
        <div className="sg-pool-title">
          <span aria-hidden="true">🧺</span>
          <div>
            <strong>Bandeja</strong>
            <p>Elige un objeto y busca su caja.</p>
          </div>
        </div>
        <div className="sg-pool-items">{renderItemsIn('pool')}</div>
      </div>

      <div className="sg-zones">{zones.map(renderZone)}</div>
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
          Termine de ubicar
        </button>
      }
      footer={footer ?? 'El evaluador revisara la ubicacion registrada al finalizar.'}
    />
  );
}

export default MatchingGame;

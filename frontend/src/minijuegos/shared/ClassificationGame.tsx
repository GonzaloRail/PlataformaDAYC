import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './feedback.css';

export interface ClassificationItem {
  id: string;
  label: string;
  emoji: string;
  zoneId: string;
}

export interface ClassificationZone {
  id: string;
  label: string;
  emoji: string;
  hint?: string;
  criteria?: string[];
}

interface ClassificationGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  items: ClassificationItem[];
  zones: ClassificationZone[];
  modo: 'un_criterio' | 'multicriterio';
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type ZoneOrPool = string | 'pool';

interface Placed {
  id: string;
  zoneId: ZoneOrPool;
}

export function ClassificationGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  items,
  zones,
  modo,
  progress,
  mascotMessage,
  footer,
}: ClassificationGameProps) {
  const [placed, setPlaced] = useState<Placed[]>(() => items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<ZoneOrPool | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Arrastra o toca cada objeto hasta su caja.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const itemIds = items.map((item) => item.id).join('|');

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { totalItems: items.length, moveCount, modo },
  });

  useEffect(() => {
    setPlaced(itemIds ? itemIds.split('|').map((id) => ({ id, zoneId: 'pool' as ZoneOrPool })) : []);
    setDraggedId(null);
    setDragOver(null);
    setSelectedId(null);
    setMoveCount(0);
    setIsComplete(false);
    setMessage('Arrastra o toca cada objeto hasta su caja.');
  }, [activityId, itemIds]);

  const inZone = (z: ZoneOrPool) => placed.filter((p) => p.zoneId === z);

  const move = (id: string, target: ZoneOrPool) => {
    const it = items.find((x) => x.id === id);
    const cur = placed.find((p) => p.id === id);
    if (!it || !cur || cur.zoneId === target) {
      setSelectedId(null);
      return;
    }
    setPlaced((prev) => prev.map((p) => (p.id === id ? { ...p, zoneId: target } : p)));
    setMoveCount((c) => c + 1);
    setSelectedId(null);
    const label = target === 'pool' ? 'la bandeja' : zones.find((z) => z.id === target)?.label ?? target;
    setMessage(`${it.label} fue a ${label}.`);
    const correct = target === it.zoneId;
    evidence.recordEvent(`${activityId}_MOVED`, {
      item_id: it.id,
      from: cur.zoneId,
      to: target,
      expected: it.zoneId,
      correct,
    });
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
      move(id, target);
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
    setSelectedId((c) => (c === id ? null : id));
  };

  const handleZoneClick = (z: ZoneOrPool) => {
    if (!selectedId) {
      setMessage('Primero elige un objeto.');
      return;
    }
    move(selectedId, z);
  };

  const handleZoneKey = (e: KeyboardEvent<HTMLDivElement>, z: ZoneOrPool) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleZoneClick(z);
    }
  };

  const isReady = inZone('pool').length === 0;

  const finish = () => {
    const correct = placed.filter((p) => {
      const it = items.find((x) => x.id === p.id);
      return it ? it.zoneId === p.zoneId : false;
    }).length;
    const finalState = placed.map((p) => {
      const it = items.find((x) => x.id === p.id);
      return { id: p.id, label: it?.label, placed: p.zoneId, expected: it?.zoneId };
    });
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: items.length, moveCount, finalState, modo });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      totalItems: items.length,
      moveCount,
      modo,
      finalState,
    });
    setIsComplete(true);
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalItems: items.length,
        moveCount,
        modo,
        finalState,
      }),
    });
  };

  const renderItem = (it: ClassificationItem, currentZone: ZoneOrPool) => {
    const sel = selectedId === it.id;
    const drag = draggedId === it.id;
    return (
      <button
        type="button"
        key={it.id}
        className={`sg-item${sel ? ' is-selected' : ''}${drag ? ' is-dragging' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, it.id)}
        onDragOver={(e) => {
          if (draggedId && draggedId !== it.id) {
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
          if (selectedId && selectedId !== it.id) {
            move(selectedId, currentZone);
          } else {
            handleItemClick(it.id);
          }
        }}
        aria-pressed={sel}
        aria-label={it.label}
      >
        <span className="sg-item-emoji" aria-hidden="true">{it.emoji}</span>
        <span className="sg-item-label">{it.label}</span>
      </button>
    );
  };

  const renderItemsIn = (z: ZoneOrPool) => {
    const list = inZone(z).map((p) => items.find((x) => x.id === p.id)).filter(Boolean) as ClassificationItem[];
    if (list.length === 0) return <p className="sg-empty">Suelta aqui</p>;
    return list.map((it) => renderItem(it, z));
  };

  const renderZone = (z: ClassificationZone) => (
    <div
      key={z.id}
      className={`sg-zone${dragOver === z.id ? ' is-drag-over' : ''}${selectedId ? ' is-ready' : ''}`}
      onDrop={(e) => handleDrop(e, z.id)}
      onDragOver={(e) => handleDragOver(e, z.id)}
      onDragLeave={() => setDragOver(null)}
      onClick={() => handleZoneClick(z.id)}
      onKeyDown={(e) => handleZoneKey(e, z.id)}
      role="button"
      tabIndex={0}
      aria-label={`Caja de ${z.label}`}
    >
      <div className="sg-zone-header">
        <span className="sg-zone-icon" aria-hidden="true">{z.emoji}</span>
        <div>
          <div className="sg-zone-title">{z.label}</div>
          {z.hint ? <p>{z.hint}</p> : null}
          {modo === 'multicriterio' && z.criteria ? (
            <p style={{ fontSize: 11, color: '#7c2d12', marginTop: 4 }}>
              Criterios: {z.criteria.join(', ')}
            </p>
          ) : null}
        </div>
      </div>
      <div className="sg-zone-items">{renderItemsIn(z.id)}</div>
    </div>
  );

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{modo === 'multicriterio' ? 'Multicriterio' : 'Un criterio'}</strong>
      </div>
      <div
        className={`sg-pool${dragOver === 'pool' ? ' is-drag-over' : ''}`}
        onDrop={(e) => handleDrop(e, 'pool')}
        onDragOver={(e) => handleDragOver(e, 'pool')}
        onDragLeave={() => setDragOver(null)}
        onClick={() => handleZoneClick('pool')}
        onKeyDown={(e) => handleZoneKey(e, 'pool')}
        role="button"
        tabIndex={0}
        aria-label="Bandeja"
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
          Termine de clasificar
        </button>
      }
      footer={footer ?? 'El evaluador revisara la clasificacion registrada al finalizar.'}
    />
  );
}

export default ClassificationGame;

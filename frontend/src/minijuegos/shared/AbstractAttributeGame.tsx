import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';

export interface AbstractItem {
  id: string;
  label: string;
  emoji: string;
  attribute: string;
}

export interface AbstractCriterion {
  id: string;
  label: string;
  emoji: string;
  hint?: string;
}

interface AbstractAttributeGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  items: AbstractItem[];
  criteria: AbstractCriterion[];
  matchKey: (item: AbstractItem, criterion: AbstractCriterion) => boolean;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type ZoneOrPool = string | 'pool';

interface Placed {
  id: string;
  zoneId: ZoneOrPool;
}

export function AbstractAttributeGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  items,
  criteria,
  matchKey,
  progress,
  mascotMessage,
  footer,
}: AbstractAttributeGameProps) {
  const [placed, setPlaced] = useState<Placed[]>(() => items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<ZoneOrPool | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Clasifica segun el atributo abstracto.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { total: items.length, moveCount },
  });

  useEffect(() => {
    setPlaced(items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
    setDraggedId(null);
    setDragOver(null);
    setSelectedId(null);
    setMoveCount(0);
    setIsComplete(false);
    setMessage('Clasifica segun el atributo abstracto.');
  }, [activityId, items]);

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
    const label = target === 'pool' ? 'la bandeja' : criteria.find((z) => z.id === target)?.label ?? target;
    setMessage(`${it.label} fue a ${label}.`);
    evidence.recordEvent(`${activityId}_MOVED`, { item_id: it.id, from: cur.zoneId, to: target, attribute: it.attribute });
  };

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    setSelectedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, target: ZoneOrPool) => {
    e.preventDefault();
    const id = draggedId ?? e.dataTransfer.getData('text/plain');
    if (id) move(id, target);
    setDraggedId(null);
    setDragOver(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>, target: ZoneOrPool) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(target);
  };

  const finish = () => {
    const correct = placed.filter((p) => {
      const it = items.find((x) => x.id === p.id);
      if (!it) return false;
      const target = criteria.find((c) => c.id === p.zoneId);
      if (!target) return false;
      return matchKey(it, target);
    }).length;
    const finalState = placed.map((p) => {
      const it = items.find((x) => x.id === p.id);
      return { id: p.id, label: it?.label, placed: p.zoneId, attribute: it?.attribute };
    });
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: items.length, moveCount, finalState });
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
    answerOnce(correct === items.length ? 'CORRECT' : 'ERROR', {
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

  const isReady = inZone('pool').length === 0;

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{inZone('pool').length === 0 ? `${items.length}/${items.length} ubicados` : `${items.length - inZone('pool').length}/${items.length} ubicados`}</strong>
      </div>
      <div
        className={`sg-pool${dragOver === 'pool' ? ' is-drag-over' : ''}`}
        onDrop={(e) => handleDrop(e, 'pool')}
        onDragOver={(e) => handleDragOver(e, 'pool')}
        onDragLeave={() => setDragOver(null)}
        onClick={() => {
          if (selectedId) move(selectedId, 'pool');
        }}
        role="button"
        tabIndex={0}
        aria-label="Bandeja"
      >
        <div className="sg-pool-title">
          <span aria-hidden="true">🧺</span>
          <div>
            <strong>Bandeja</strong>
            <p>Elige un objeto y arrastralo a su categoria.</p>
          </div>
        </div>
        <div className="sg-pool-items">
          {inZone('pool').map((p) => {
            const it = items.find((x) => x.id === p.id);
            if (!it) return null;
            const sel = selectedId === it.id;
            return (
              <button
                type="button"
                key={it.id}
                className={`sg-item${sel ? ' is-selected' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, it.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId((cur) => (cur === it.id ? null : it.id));
                }}
                aria-pressed={sel}
                aria-label={it.label}
              >
                <span className="sg-item-emoji" aria-hidden="true">{it.emoji}</span>
                <span className="sg-item-label">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="sg-zones">
        {criteria.map((c) => (
          <div
            key={c.id}
            className={`sg-zone${dragOver === c.id ? ' is-drag-over' : ''}${selectedId ? ' is-ready' : ''}`}
            onDrop={(e) => handleDrop(e, c.id)}
            onDragOver={(e) => handleDragOver(e, c.id)}
            onDragLeave={() => setDragOver(null)}
            onClick={() => {
              if (selectedId) move(selectedId, c.id);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Caja de ${c.label}`}
          >
            <div className="sg-zone-header">
              <span className="sg-zone-icon" aria-hidden="true">{c.emoji}</span>
              <div>
                <div className="sg-zone-title">{c.label}</div>
                {c.hint ? <p>{c.hint}</p> : null}
              </div>
            </div>
            <div className="sg-zone-items">
              {inZone(c.id).map((p) => {
                const it = items.find((x) => x.id === p.id);
                if (!it) return null;
                return (
                  <span key={it.id} className="sg-item-readonly" aria-label={it.label}>
                    <span className="sg-item-emoji" aria-hidden="true">{it.emoji}</span>
                    <span className="sg-item-label">{it.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
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
          Termine de clasificar
        </button>
      }
      footer={footer ?? 'El evaluador revisara la clasificacion al finalizar.'}
    />
  );
}

export default AbstractAttributeGame;

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

export interface NumberGroup {
  id: string;
  emoji: string;
  count: number;
}

interface NumberMatchGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  groups: NumberGroup[];
  numberFormat: 'digit' | 'word';
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const numberWord = (n: number): string => {
  const words = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
  return words[n] ?? String(n);
};

const renderNumber = (n: number, format: 'digit' | 'word') => (format === 'digit' ? String(n) : numberWord(n));

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function NumberMatchGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  groups,
  numberFormat,
  progress,
  mascotMessage,
  footer,
}: NumberMatchGameProps) {
  const [matches, setMatches] = useState<Record<string, number>>({});
  const [draggedNumber, setDraggedNumber] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Arrastra el numero correcto hacia cada grupo.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const groupIds = groups.map((group) => group.id).join('|');

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { totalGroups: groups.length, matches },
  });

  useEffect(() => {
    setMatches({});
    setDraggedNumber(null);
    setDragOver(null);
    setSelectedNumber(null);
    setIsComplete(false);
    setMessage('Arrastra el numero correcto hacia cada grupo.');
  }, [activityId, groupIds]);

  const numbers = shuffle([...new Set(groups.map((g) => g.count))]);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, n: number) => {
    setDraggedNumber(n);
    setSelectedNumber(n);
    e.dataTransfer.setData('text/plain', String(n));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, groupId: string) => {
    e.preventDefault();
    e.stopPropagation();
    let n = draggedNumber;
    if (n === null) {
      const raw = e.dataTransfer.getData('text/plain');
      n = Number(raw);
    }
    if (Number.isFinite(n)) {
      setMatches((m) => ({ ...m, [groupId]: n }));
      const g = groups.find((x) => x.id === groupId);
      if (g) {
        setMessage(g.count === n ? 'Correcto.' : 'Asignado, el evaluador revisara.');
        setFeedbackKind(g.count === n ? 'success' : 'error');
        window.setTimeout(() => setFeedbackKind(null), 1000);
        evidence.recordEvent(`${activityId}_MATCHED`, { groupId, picked: n, expected: g.count });
      }
    }
    setDraggedNumber(null);
    setDragOver(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, groupId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(groupId);
  };

  const handleNumberClick = (n: number) => {
    setSelectedNumber((cur) => (cur === n ? null : n));
  };

  const handleGroupClick = (groupId: string) => {
    if (selectedNumber === null) {
      setMessage('Primero elige un numero.');
      return;
    }
    setMatches((m) => ({ ...m, [groupId]: selectedNumber }));
    const g = groups.find((x) => x.id === groupId);
    if (g) {
      setMessage(g.count === selectedNumber ? 'Correcto.' : 'Asignado, el evaluador revisara.');
      evidence.recordEvent(`${activityId}_MATCHED`, { groupId, picked: selectedNumber, expected: g.count });
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>, groupId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleGroupClick(groupId);
    }
  };

  const finish = () => {
    const correct = groups.filter((g) => matches[g.id] === g.count).length;
    const finalState = groups.map((g) => ({ id: g.id, expected: g.count, picked: matches[g.id] ?? null }));
    evidence.recordEvent(`${activityId}_FINISHED`, { correct, total: groups.length, finalState });
    evidence.recordLog({
      activity: activityId,
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correct,
      totalGroups: groups.length,
      finalState,
    });
    setIsComplete(true);
    answerOnce(correct === groups.length ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalGroups: groups.length,
        finalState,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{Object.keys(matches).length}/{groups.length} emparejados</strong>
      </div>
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Correcto' : 'Intentalo otra vez'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="nmg-numbers">
        {numbers.map((n) => {
          const sel = selectedNumber === n;
          const used = Object.values(matches).includes(n);
          return (
            <button
              type="button"
              key={n}
              className={`nmg-number${sel ? ' is-selected' : ''}${used ? ' is-used' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, n)}
              onDragEnd={() => {
                setDraggedNumber(null);
                setDragOver(null);
              }}
              onClick={() => handleNumberClick(n)}
              aria-pressed={sel}
              aria-label={`Numero ${renderNumber(n, numberFormat)}`}
            >
              {renderNumber(n, numberFormat)}
            </button>
          );
        })}
      </div>
      <div className="nmg-groups">
        {groups.map((g) => {
          const picked = matches[g.id];
          return (
            <div
              key={g.id}
              className={`nmg-group${dragOver === g.id ? ' is-drag-over' : ''}${selectedNumber !== null ? ' is-ready' : ''}`}
              onDrop={(e) => handleDrop(e, g.id)}
              onDragOver={(e) => handleDragOver(e, g.id)}
              onDragLeave={() => setDragOver(null)}
              onClick={() => handleGroupClick(g.id)}
              onKeyDown={(e) => handleKey(e, g.id)}
              role="button"
              tabIndex={0}
              aria-label={`Grupo de ${g.count} objetos`}
            >
              <div className="nmg-group-objects">
                {Array.from({ length: Math.min(g.count, 12) }).map((_, i) => (
                  <span key={i} aria-hidden="true">{g.emoji}</span>
                ))}
                {g.count > 12 ? <span>+{g.count - 12}</span> : null}
              </div>
              <div className="nmg-group-pick">
                {picked !== undefined ? renderNumber(picked, numberFormat) : '?'}
              </div>
            </div>
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish} disabled={Object.keys(matches).length === 0}>
          Ya empareje
        </button>
      }
      footer={footer ?? 'El evaluador revisara los emparejamientos al finalizar.'}
    />
  );
}

export default NumberMatchGame;

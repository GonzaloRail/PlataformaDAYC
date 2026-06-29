import { useEffect, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { COGNITIVO_046_CONFIG } from '@/minijuegos/cognitivo/COGNITIVO_046/config';
import './COGNITIVO_046.css';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

type Category = 'pool' | 'animales' | 'juguetes';
type TargetCategory = Exclude<Category, 'pool'>;

interface DraggableObject {
  id: string;
  label: string;
  emoji: string;
  correctCategory: TargetCategory;
  currentCategory: Category;
}

const INITIAL_OBJECTS: DraggableObject[] = [
  { id: 'perro', label: 'Perro', emoji: '🐶', correctCategory: 'animales', currentCategory: 'pool' },
  { id: 'gato', label: 'Gato', emoji: '🐱', correctCategory: 'animales', currentCategory: 'pool' },
  { id: 'pelota', label: 'Pelota', emoji: '⚽', correctCategory: 'juguetes', currentCategory: 'pool' },
  { id: 'muneca', label: 'Osito', emoji: '🧸', correctCategory: 'juguetes', currentCategory: 'pool' },
];

const CATEGORY_LABELS: Record<Category, string> = {
  pool: 'Bandeja de objetos',
  animales: 'Animales',
  juguetes: 'Juguetes',
};

const CATEGORY_HINTS: Record<TargetCategory, string> = {
  animales: 'Viven, caminan o hacen sonidos.',
  juguetes: 'Sirven para jugar.',
};

export default function COGNITIVO_046({ currentItem, onAnswer }: Props) {
  const [objects, setObjects] = useState<DraggableObject[]>(INITIAL_OBJECTS);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<Category | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Toca o arrastra cada objeto hasta su caja.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId: COGNITIVO_046_CONFIG.id,
    isComplete,
    contextData: {
      totalObjects: objects.length,
      moveCount,
    },
  });

  useEffect(() => {
    setObjects(INITIAL_OBJECTS);
    setDraggedItemId(null);
    setDragOverCategory(null);
    setSelectedItemId(null);
    setMoveCount(0);
    setMessage('Toca o arrastra cada objeto hasta su caja.');
  }, [currentItem.id]);

  const placedCount = objects.filter((obj) => obj.currentCategory !== 'pool').length;
  const isReadyToFinish = placedCount === objects.length;

  const moveObject = (objectId: string, targetCategory: Category) => {
    const object = objects.find((obj) => obj.id === objectId);
    if (!object || object.currentCategory === targetCategory) {
      setSelectedItemId(null);
      return;
    }

    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === objectId ? { ...obj, currentCategory: targetCategory } : obj
      )
    );
    setMoveCount((current) => current + 1);
    setSelectedItemId(null);
    setMessage(`${object.label} fue a ${CATEGORY_LABELS[targetCategory].toLowerCase()}.`);
    evidence.recordEvent('COG046_OBJECT_MOVED', {
      object_id: object.id,
      object_label: object.label,
      from_category: object.currentCategory,
      to_category: targetCategory,
      expected_category: object.correctCategory,
    });
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedItemId(id);
    setSelectedItemId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLElement>, targetCategory: Category) => {
    e.preventDefault();
    const itemId = draggedItemId || e.dataTransfer.getData('text/plain');
    if (itemId) {
      moveObject(itemId, targetCategory);
    }
    setDraggedItemId(null);
    setDragOverCategory(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>, category: Category) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCategory(category);
  };

  const handleObjectClick = (id: string) => {
    const object = objects.find((obj) => obj.id === id);
    setSelectedItemId((current) => current === id ? null : id);
    setMessage(object ? `Ahora toca la caja para ${object.label}.` : 'Elige una caja.');
  };

  const handleCategoryClick = (category: Category) => {
    if (!selectedItemId) {
      setMessage('Primero elige un objeto de la bandeja o de una caja.');
      return;
    }

    moveObject(selectedItemId, category);
  };

  const handleCategoryKeyDown = (event: KeyboardEvent<HTMLDivElement>, category: Category) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCategoryClick(category);
    }
  };

  const finishActivity = () => {
    const correctPlacements = objects.filter((obj) => obj.currentCategory === obj.correctCategory).length;
    const finalState = objects.map((obj) => ({
      id: obj.id,
      label: obj.label,
      category: obj.currentCategory,
      expectedCategory: obj.correctCategory,
    }));

    evidence.recordEvent('COG046_CLASSIFICATION_FINISHED', {
      correctPlacements,
      totalObjects: objects.length,
      moveCount,
      finalState,
    });
    evidence.recordLog({
      activity: COGNITIVO_046_CONFIG.id,
      event: 'CLASSIFICATION_FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      correctPlacements,
      totalObjects: objects.length,
      moveCount,
      finalState,
    });

    setIsComplete(true);

    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: COGNITIVO_046_CONFIG.id,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correctPlacements,
        totalObjects: objects.length,
        moveCount,
        finalState,
      }),
    });
  };

  const renderItems = (category: Category) => {
    const items = objects
      .filter(obj => obj.currentCategory === category)
      .map(obj => (
        <button
          type="button"
          key={obj.id}
          className={`cognitivo-046-item${selectedItemId === obj.id ? ' is-selected' : ''}${draggedItemId === obj.id ? ' is-dragging' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, obj.id)}
          onDragEnd={() => {
            setDraggedItemId(null);
            setDragOverCategory(null);
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleObjectClick(obj.id);
          }}
          aria-pressed={selectedItemId === obj.id}
          aria-label={`${obj.label}. ${obj.currentCategory === 'pool' ? 'Sin clasificar' : `En ${CATEGORY_LABELS[obj.currentCategory]}`}`}
        >
          <span className="cognitivo-046-item-emoji" aria-hidden="true">{obj.emoji}</span>
          <span className="cognitivo-046-item-label">{obj.label}</span>
        </button>
      ));

    if (items.length > 0) {
      return items;
    }

    return <p className="cognitivo-046-empty">Suelta aqui</p>;
  };

  const renderBox = (category: TargetCategory, emoji: string) => (
    <div
      className={`cognitivo-046-box cognitivo-046-box-${category}${dragOverCategory === category ? ' is-drag-over' : ''}${selectedItemId ? ' is-ready' : ''}`}
      onDrop={(e) => handleDrop(e, category)}
      onDragOver={(e) => handleDragOver(e, category)}
      onDragLeave={() => setDragOverCategory(null)}
      onClick={() => handleCategoryClick(category)}
      onKeyDown={(event) => handleCategoryKeyDown(event, category)}
      role="button"
      tabIndex={0}
      aria-label={`Caja de ${CATEGORY_LABELS[category]}`}
    >
      <div className="cognitivo-046-box-header">
        <span className="cognitivo-046-box-icon" aria-hidden="true">{emoji}</span>
        <div>
          <div className="cognitivo-046-box-title">{CATEGORY_LABELS[category]}</div>
          <p>{CATEGORY_HINTS[category]}</p>
        </div>
      </div>
      <div className="cognitivo-046-items-grid">{renderItems(category)}</div>
    </div>
  );

  const playArea = (
    <div className="cognitivo-046-container" ref={containerRef}>
      <div className="cognitivo-046-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>{placedCount}/{objects.length} colocados</strong>
      </div>

      <div
        className={`cognitivo-046-pool${dragOverCategory === 'pool' ? ' is-drag-over' : ''}`}
        onDrop={(e) => handleDrop(e, 'pool')}
        onDragOver={(e) => handleDragOver(e, 'pool')}
        onDragLeave={() => setDragOverCategory(null)}
        onClick={() => handleCategoryClick('pool')}
        onKeyDown={(event) => handleCategoryKeyDown(event, 'pool')}
        role="button"
        tabIndex={0}
        aria-label="Bandeja de objetos sin clasificar"
      >
        <div className="cognitivo-046-pool-title">
          <span aria-hidden="true">🧺</span>
          <div>
            <strong>Bandeja</strong>
            <p>Elige un objeto y busca su caja.</p>
          </div>
        </div>
        <div className="cognitivo-046-pool-items">{renderItems('pool')}</div>
      </div>

      <div className="cognitivo-046-boxes">
        {renderBox('animales', '🐾')}
        {renderBox('juguetes', '🎈')}
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title="¡A ordenar!"
      subtitle={currentItem.instruccion || 'Pon cada cosa en su caja.'}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage="Clasifica con calma. Puedes tocar un objeto y luego tocar una caja."
      playArea={playArea}
      actions={
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finishActivity} disabled={!isReadyToFinish}>
          Termine de ordenar
        </button>
      }
      footer="El evaluador revisara la clasificacion registrada al finalizar."
    />
  );
}

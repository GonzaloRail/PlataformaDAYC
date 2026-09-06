import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './weather-clothes.css';

export interface WeatherClothesItem {
  id: string;
  label: string;
  emoji: string;
  correct: boolean;
}

export interface WeatherRound {
  weather: { emoji: string; label: string };
  message: string;
  clothes: WeatherClothesItem[];
  key: string;
}

interface WeatherClothesGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: WeatherRound[];
  characterEmoji: string;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function WeatherClothesGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  characterEmoji,
  progress,
  mascotMessage,
  footer,
}: WeatherClothesGameProps) {
  const [step, setStep] = useState(0);
  const [dressed, setDressed] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Arrastra la ropa correcta al personaje.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, totalRounds: rounds.length, dressed },
  });

  useEffect(() => {
    setStep(0);
    setDressed([]);
    setIsComplete(false);
    setMessage('Arrastra la ropa correcta al personaje.');
  }, [activityId]);

  const current = rounds[step];

  const poolClothes = current?.clothes.filter((c) => !dressed.includes(c.id)) ?? [];

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropOnCharacter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const id = draggedId || e.dataTransfer.getData('text/plain');
    if (id && !dressed.includes(id)) {
      setDressed((prev) => [...prev, id]);
      evidence.recordEvent(`${activityId}_CLOTHES_ADDED`, { round: step, itemId: id });
    }
    setDraggedId(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const removeClothes = (id: string) => {
    setDressed((prev) => prev.filter((x) => x !== id));
  };

  const nextRound = () => {
    const correctIds = current.clothes.filter((c) => c.correct).map((c) => c.id);
    const correctCount = dressed.filter((id) => correctIds.includes(id)).length;
    evidence.recordEvent(`${activityId}_ROUND_FINISHED`, { step, dressed, correctCount, totalCorrect: correctIds.length });
    setDressed([]);
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      evidence.recordEvent(`${activityId}_FINISHED`, { totalRounds: rounds.length });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalRounds: rounds.length,
      });
      setIsComplete(true);
      answerOnce('CORRECT', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalRounds: rounds.length,
        }),
      });
    }
  };

  const playArea = current ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {rounds.length}</strong>
      </div>
      <div className="wc-weather">
        <span className="wc-weather-emoji" aria-hidden="true">{current.weather.emoji}</span>
        <span className="wc-weather-label">{current.weather.label}: {current.message}</span>
      </div>
      <div className="wc-scene">
        <div
          className={`wc-character${dressed.length > 0 ? ' is-dressed' : ''}`}
          onDrop={handleDropOnCharacter}
          onDragOver={handleDragOver}
        >
          <span className="wc-character-emoji" aria-hidden="true">{characterEmoji}</span>
          <div className="wc-dressed-items">
            {dressed.map((id) => {
              const item = current.clothes.find((c) => c.id === id);
              return item ? (
                <button
                  type="button"
                  key={id}
                  className="wc-dressed-badge"
                  onClick={() => removeClothes(id)}
                  aria-label={`Quitar ${item.label}`}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ) : null;
            })}
          </div>
        </div>
        <div className="sg-pool">
          <div className="sg-pool-title">
            <span aria-hidden="true">👕</span>
            <div>
              <strong>Ropa disponible</strong>
              <p>Arrastra solo la ropa correcta al personaje.</p>
            </div>
          </div>
          <div className="sg-pool-items">
            {poolClothes.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`sg-item${draggedId === item.id ? ' is-dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={() => setDraggedId(null)}
                aria-label={item.label}
              >
                <span className="sg-item-emoji" aria-hidden="true">{item.emoji}</span>
                <span className="sg-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      actions={
        <button type="button" className="kid-action-btn kid-action-primary" onClick={nextRound}>
          {step + 1 < rounds.length ? 'Siguiente clima' : 'Termine de vestir'}
        </button>
      }
      footer={footer ?? 'El evaluador revisara la ropa elegida al finalizar.'}
    />
  );
}

export default WeatherClothesGame;

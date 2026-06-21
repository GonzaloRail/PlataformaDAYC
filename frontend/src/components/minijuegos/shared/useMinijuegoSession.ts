import { useCallback, useEffect, useRef, useState } from 'react';
import type { Answer, Item, ItemResult } from '../../../minijuegos/types';

interface SessionOptions {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export interface SessionAnswerMeta {
  detalle?: string;
}

export function buildProgressLabel(current: number, total: number): string {
  const safeCurrent = Math.max(1, current);
  const safeTotal = Math.max(safeCurrent, total);
  return `Pregunta ${safeCurrent} de ${safeTotal}`;
}

export function useMinijuegoSession({ currentItem, onAnswer }: SessionOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const alreadyAnsweredRef = useRef(false);
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    alreadyAnsweredRef.current = false;
    setManualMode(false);
  }, [currentItem.id]);

  const answerOnce = useCallback((resultado: ItemResult, meta?: SessionAnswerMeta) => {
    if (alreadyAnsweredRef.current) {
      return;
    }

    alreadyAnsweredRef.current = true;
    const elapsed = Date.now() - startTimeRef.current;

    onAnswer({
      item_id: currentItem.id,
      resultado,
      tiempo_respuesta_ms: elapsed,
      respuesta_usuario: meta?.detalle,
    });
  }, [currentItem.id, onAnswer]);

  return {
    manualMode,
    setManualMode,
    answerOnce,
  };
}

import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_077_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_077({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_077_CONFIG.id}
      title="Escribe los numeros del 1 al 19"
      instruction={currentItem.instruccion || 'Escribe los numeros del 1 al 19 en orden.'}
      consigna="Escribe 1, 2, 3, ... 19"
      mostrarModelo={false}
      background="lines"
    />
  );
}

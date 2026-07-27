import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_064_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_064({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_064_CONFIG.id}
      title="Escribe tu nombre"
      instruction={currentItem.instruccion || 'Escribe tu nombre sin mirar el modelo.'}
      consigna="Escribe tu nombre"
      mostrarModelo={false}
      background="lines"
    />
  );
}

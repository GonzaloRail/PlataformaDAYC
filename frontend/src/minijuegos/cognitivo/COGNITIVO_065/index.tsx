import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_065_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_065({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_065_CONFIG.id}
      title="Dibuja un objeto"
      instruction={currentItem.instruccion || 'Dibuja una casa, un sol o un arbol.'}
      consigna="Dibuja una casa"
      mostrarModelo={false}
      background="blank"
    />
  );
}

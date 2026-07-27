import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_054_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_054({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_054_CONFIG.id}
      title="Dibuja una persona de palotes"
      instruction={currentItem.instruccion || 'Dibuja una persona usando palotes.'}
      consigna="Dibuja una persona de palotes"
      mostrarModelo={false}
      background="blank"
    />
  );
}

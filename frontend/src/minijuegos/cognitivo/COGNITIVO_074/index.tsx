import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_074_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_074({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_074_CONFIG.id}
      title="Escribe tu nombre y apellido"
      instruction={currentItem.instruccion || 'Escribe tu nombre y apellido completos.'}
      consigna="Escribe nombre y apellido"
      mostrarModelo={false}
      background="lines"
    />
  );
}

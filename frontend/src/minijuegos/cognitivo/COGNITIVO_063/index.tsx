import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_063_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_063({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_063_CONFIG.id}
      title="Dibuja una persona"
      instruction={currentItem.instruccion || 'Dibuja una persona con cabeza, cuerpo, brazos, piernas, ojos y boca.'}
      consigna="Dibuja una persona con 6 partes"
      mostrarModelo={false}
      background="blank"
    />
  );
}

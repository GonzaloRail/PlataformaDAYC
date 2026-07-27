import type { Answer, Item } from '@/minijuegos/types';
import { NumberSequenceGame } from '@/minijuegos/shared/NumberSequenceGame';
import { COGNITIVO_073_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_073({ currentItem, onAnswer }: Props) {
  return (
    <NumberSequenceGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_073_CONFIG.id}
      title="Antes y despues"
      instruction={currentItem.instruccion || 'Observa el numero central y elige el que va antes y el que va despues.'}
      center={14}
      direction="both"
      optionsPerQuestion={4}
    />
  );
}

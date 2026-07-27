import type { Answer, Item } from '@/minijuegos/types';
import { QuantityGame } from '@/minijuegos/shared/QuantityGame';
import { COGNITIVO_032_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_032({ currentItem, onAnswer }: Props) {
  return (
    <QuantityGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_032_CONFIG.id}
      title="Uno y uno mas"
      instruction={currentItem.instruccion || 'Agrega o quita hasta llegar a la cantidad pedida.'}
      rounds={[
        { id: 'r1', key: 'r1', emoji: '🍎', start: 1, target: 2 },
        { id: 'r2', key: 'r2', emoji: '🐟', start: 1, target: 2 },
        { id: 'r3', key: 'r3', emoji: '🌸', start: 2, target: 3 },
        { id: 'r4', key: 'r4', emoji: '⭐', start: 2, target: 3 },
      ]}
    />
  );
}

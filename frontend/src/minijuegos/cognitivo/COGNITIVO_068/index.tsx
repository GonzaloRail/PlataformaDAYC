import type { Answer, Item } from '@/minijuegos/types';
import { OrderingGame } from '@/minijuegos/shared/OrderingGame';
import { COGNITIVO_068_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_068({ currentItem, onAnswer }: Props) {
  return (
    <OrderingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_068_CONFIG.id}
      title="Ordena cartas numeradas"
      instruction={currentItem.instruccion || 'Ordena las cartas del numero menor al mayor.'}
      direction="asc"
      kind="number"
      items={[
        { id: 'n1', label: '3', emoji: '🃏', value: 3 },
        { id: 'n2', label: '7', emoji: '🃏', value: 7 },
        { id: 'n3', label: '1', emoji: '🃏', value: 1 },
        { id: 'n4', label: '5', emoji: '🃏', value: 5 },
        { id: 'n5', label: '9', emoji: '🃏', value: 9 },
        { id: 'n6', label: '4', emoji: '🃏', value: 4 },
      ]}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { OrderingGame } from '@/minijuegos/shared/OrderingGame';
import { COGNITIVO_033_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_033({ currentItem, onAnswer }: Props) {
  return (
    <OrderingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_033_CONFIG.id}
      title="Ordena por tamano"
      instruction={currentItem.instruccion || 'Ordena del mas pequeno al mas grande.'}
      direction="asc"
      kind="size"
      items={[
        { id: 's1', label: 'Muy pequeno', emoji: '🐜', value: 1 },
        { id: 's2', label: 'Pequeno', emoji: '🐭', value: 2 },
        { id: 's3', label: 'Mediano', emoji: '🐕', value: 3 },
        { id: 's4', label: 'Grande', emoji: '🐘', value: 4 },
        { id: 's5', label: 'Enorme', emoji: '🐋', value: 5 },
      ]}
    />
  );
}

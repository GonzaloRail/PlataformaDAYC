import type { Answer, Item } from '@/minijuegos/types';
import { NumberMatchGame } from '@/minijuegos/shared/NumberMatchGame';
import { COGNITIVO_061_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_061({ currentItem, onAnswer }: Props) {
  return (
    <NumberMatchGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_061_CONFIG.id}
      title="Empareja con el numero"
      instruction={currentItem.instruccion || 'Arrastra el numero que coincide con cada grupo.'}
      numberFormat="digit"
      groups={[
        { id: 'g1', emoji: '🐟', count: 3 },
        { id: 'g2', emoji: '🦋', count: 5 },
        { id: 'g3', emoji: '🐞', count: 2 },
        { id: 'g4', emoji: '🌸', count: 6 },
      ]}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { CountingGame } from '@/minijuegos/shared/CountingGame';
import { COGNITIVO_039_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_039({ currentItem, onAnswer }: Props) {
  return (
    <CountingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_039_CONFIG.id}
      title="Cuenta mas de 5"
      instruction={currentItem.instruccion || 'Cuenta los objetos y toca el numero correcto.'}
      maxValue={15}
      rounds={[
        { key: 'r1', emoji: '⭐', count: 6 },
        { key: 'r2', emoji: '🌸', count: 8 },
        { key: 'r3', emoji: '🍓', count: 7 },
        { key: 'r4', emoji: '🐟', count: 9 },
        { key: 'r5', emoji: '🎈', count: 11 },
      ]}
      optionsPerRound={4}
    />
  );
}

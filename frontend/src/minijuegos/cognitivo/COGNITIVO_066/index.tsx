import type { Answer, Item } from '@/minijuegos/types';
import { CountingGame } from '@/minijuegos/shared/CountingGame';
import { COGNITIVO_066_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_066({ currentItem, onAnswer }: Props) {
  return (
    <CountingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_066_CONFIG.id}
      title="Cuenta hasta 20"
      instruction={currentItem.instruccion || 'Cuenta los objetos y toca el numero correcto (hasta 20).'}
      maxValue={20}
      rounds={[
        { key: 'r1', emoji: '🍎', count: 12 },
        { key: 'r2', emoji: '⭐', count: 15 },
        { key: 'r3', emoji: '🌸', count: 18 },
        { key: 'r4', emoji: '🎈', count: 20 },
      ]}
      optionsPerRound={4}
    />
  );
}

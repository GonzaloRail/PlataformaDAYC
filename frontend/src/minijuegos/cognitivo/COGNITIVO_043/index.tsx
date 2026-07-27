import type { Answer, Item } from '@/minijuegos/types';
import { CountingGame } from '@/minijuegos/shared/CountingGame';
import { COGNITIVO_043_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_043({ currentItem, onAnswer }: Props) {
  return (
    <CountingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_043_CONFIG.id}
      title="El numero 3"
      instruction={currentItem.instruccion || 'Cuenta los objetos y senala donde hay 3.'}
      maxValue={5}
      rounds={[
        { key: 'r1', emoji: '🍎', count: 3 },
        { key: 'r2', emoji: '🐟', count: 3 },
        { key: 'r3', emoji: '🌸', count: 3 },
        { key: 'r4', emoji: '⭐', count: 3 },
      ]}
      optionsPerRound={4}
    />
  );
}

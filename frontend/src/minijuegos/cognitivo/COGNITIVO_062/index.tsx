import type { Answer, Item } from '@/minijuegos/types';
import { CountingGame } from '@/minijuegos/shared/CountingGame';
import { COGNITIVO_062_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_062({ currentItem, onAnswer }: Props) {
  return (
    <CountingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_062_CONFIG.id}
      title="El cero"
      instruction={currentItem.instruccion || 'Cuenta los objetos y senala el grupo que tiene cero.'}
      maxValue={3}
      rounds={[
        { key: 'r1', emoji: '🍎', count: 0 },
        { key: 'r2', emoji: '🐟', count: 0 },
        { key: 'r3', emoji: '🌸', count: 0 },
      ]}
      optionsPerRound={4}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { ComparisonGame } from '@/minijuegos/shared/ComparisonGame';
import { COGNITIVO_044_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_044({ currentItem, onAnswer }: Props) {
  return (
    <ComparisonGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_044_CONFIG.id}
      title="Mas, menos o igual"
      instruction={currentItem.instruccion || 'Observa los dos grupos y elige la respuesta correcta.'}
      mode="cantidad"
      rounds={[
        {
          key: 'r1',
          left: { emoji: '🍎', count: 3 },
          right: { emoji: '🍌', count: 6 },
          correct: 'mas',
        },
        {
          key: 'r2',
          left: { emoji: '🌟', count: 7 },
          right: { emoji: '🌙', count: 7 },
          correct: 'igual',
        },
        {
          key: 'r3',
          left: { emoji: '🐶', count: 4 },
          right: { emoji: '🐱', count: 9 },
          correct: 'menos',
        },
        {
          key: 'r4',
          left: { emoji: '🌸', count: 8 },
          right: { emoji: '🍀', count: 2 },
          correct: 'mas',
        },
      ]}
    />
  );
}

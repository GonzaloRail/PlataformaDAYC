import type { Answer, Item } from '@/minijuegos/types';
import { ComparisonGame } from '@/minijuegos/shared/ComparisonGame';
import { COGNITIVO_053_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_053({ currentItem, onAnswer }: Props) {
  return (
    <ComparisonGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_053_CONFIG.id}
      title="El numero mas grande"
      instruction={currentItem.instruccion || 'Observa los dos numeros y senala el mas grande.'}
      mode="numero"
      rounds={[
        { key: 'r1', left: 5, right: 8, correct: 'mas' },
        { key: 'r2', left: 12, right: 3, correct: 'mas' },
        { key: 'r3', left: 7, right: 14, correct: 'mas' },
        { key: 'r4', left: 18, right: 9, correct: 'mas' },
        { key: 'r5', left: 11, right: 20, correct: 'mas' },
      ]}
    />
  );
}

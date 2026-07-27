import type { Answer, Item } from '@/minijuegos/types';
import { ArithmeticGame } from '@/minijuegos/shared/ArithmeticGame';
import { COGNITIVO_075_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_075({ currentItem, onAnswer }: Props) {
  return (
    <ArithmeticGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_075_CONFIG.id}
      title="Sumas y restas"
      instruction={currentItem.instruccion || 'Resuelve la operacion y elige la respuesta correcta.'}
      rounds={[
        { id: 'r1', key: 'r1', left: 3, right: 2, operation: '+', answer: 5 },
        { id: 'r2', key: 'r2', left: 7, right: 4, operation: '-', answer: 3 },
        { id: 'r3', key: 'r3', left: 5, right: 5, operation: '+', answer: 10 },
        { id: 'r4', key: 'r4', left: 9, right: 3, operation: '-', answer: 6 },
        { id: 'r5', key: 'r5', left: 4, right: 4, operation: '+', answer: 8 },
      ]}
    />
  );
}

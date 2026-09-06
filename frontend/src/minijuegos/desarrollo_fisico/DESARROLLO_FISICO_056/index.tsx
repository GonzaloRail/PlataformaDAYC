import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { DESARROLLO_FISICO_056_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    key: 'r1',
    question: 'Con que mano escribes o dibujas?',
    options: [
      { emoji: '✋', label: 'Mano izquierda', value: 'izquierda' },
      { emoji: '🤚', label: 'Mano derecha', value: 'derecha' },
    ],
    correct: 'derecha',
  },
];

export default function DESARROLLO_FISICO_056({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_056_CONFIG.id} title="Mano dominante" instruction={DESARROLLO_FISICO_056_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

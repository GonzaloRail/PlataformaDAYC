import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { DESARROLLO_FISICO_080_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    key: 'r1',
    question: 'Puedes tocar cada dedo con el pulgar rapidamente?',
    options: [
      { emoji: '👍', label: 'Si, puedo hacerlo', value: 'si' },
      { emoji: '👋', label: 'Me cuesta un poco', value: 'cuesta' },
      { emoji: '👎', label: 'No puedo hacerlo', value: 'no' },
    ],
    correct: 'si',
  },
];

export default function DESARROLLO_FISICO_080({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_080_CONFIG.id} title="Dedos con pulgar" instruction={DESARROLLO_FISICO_080_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

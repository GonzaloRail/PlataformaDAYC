import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { CONDUCTA_ADAPTATIVA_041_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    key: 'r1',
    question: 'Para que usas el tenedor?',
    options: [
      { emoji: '🍝', label: 'Pinchar espagueti', value: 'pinchar' },
      { emoji: '🍲', label: 'Tomar sopa', value: 'sopa' },
      { emoji: '🍞', label: 'Untar pan', value: 'untar' },
    ],
    correct: 'pinchar',
  },
  {
    key: 'r2',
    question: 'Para que usas la cuchara?',
    options: [
      { emoji: '🍲', label: 'Tomar sopa', value: 'sopa' },
      { emoji: '🥩', label: 'Cortar carne', value: 'cortar' },
      { emoji: '🍎', label: 'Pelar fruta', value: 'pelar' },
    ],
    correct: 'sopa',
  },
  {
    key: 'r3',
    question: 'Para que usas el cuchillo?',
    options: [
      { emoji: '🍞', label: 'Untar mantequilla', value: 'untar' },
      { emoji: '🍲', label: 'Tomar sopa', value: 'sopa' },
      { emoji: '🥤', label: 'Beber agua', value: 'beber' },
    ],
    correct: 'untar',
  },
];

export default function CONDUCTA_ADAPTATIVA_041({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_041_CONFIG.id} title="Utensilios" instruction={CONDUCTA_ADAPTATIVA_041_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

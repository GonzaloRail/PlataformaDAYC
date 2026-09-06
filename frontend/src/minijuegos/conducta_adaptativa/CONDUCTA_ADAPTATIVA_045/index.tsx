import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { CONDUCTA_ADAPTATIVA_045_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    key: 'r1',
    question: 'Cuando vas a estornudar, que haces?',
    options: [
      { emoji: '💪', label: 'Me tapo con el codo', value: 'codo' },
      { emoji: '✋', label: 'Me tapo con la mano', value: 'mano' },
      { emoji: '😤', label: 'No me tapo', value: 'no_tapar' },
    ],
    correct: 'codo',
  },
  {
    key: 'r2',
    question: 'Cuando toses, que haces?',
    options: [
      { emoji: '💪', label: 'Me tapo con el codo', value: 'codo' },
      { emoji: '✋', label: 'Me tapo con la mano', value: 'mano' },
      { emoji: '😤', label: 'No me tapo', value: 'no_tapar' },
    ],
    correct: 'codo',
  },
];

export default function CONDUCTA_ADAPTATIVA_045({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_045_CONFIG.id} title="Al toser y estornudar" instruction={CONDUCTA_ADAPTATIVA_045_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

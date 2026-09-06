import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { DESARROLLO_FISICO_060_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    key: 'r1',
    question: 'Como agarras el lapiz para dibujar?',
    options: [
      { emoji: '✍️', label: 'Pinza (2 dedos + pulgar)', value: 'pinza' },
      { emoji: '✊', label: 'Puno cerrado', value: 'puno' },
      { emoji: '🖐️', label: 'Toda la mano', value: 'mano' },
    ],
    correct: 'pinza',
  },
];

export default function DESARROLLO_FISICO_060({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_060_CONFIG.id} title="Como agarras el lapiz" instruction={DESARROLLO_FISICO_060_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_051_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ROUNDS = [
  {
    key: 'r1',
    stimulus: { emoji: '🐶🐶🐶', label: 'Tres perros' },
    question: 'Mira, hay tres...',
    options: [
      { emoji: '🐶🐶🐶', label: 'Perros', value: 'perros' },
      { emoji: '🐶', label: 'Perro', value: 'perro' },
      { emoji: '🐕', label: 'Perra', value: 'perra' },
    ],
    correct: 'perros',
  },
  {
    key: 'r2',
    stimulus: { emoji: '🐱🐱', label: 'Dos gatos' },
    question: 'Mira, hay dos...',
    options: [
      { emoji: '🐱🐱', label: 'Gatos', value: 'gatos' },
      { emoji: '🐱', label: 'Gato', value: 'gato' },
      { emoji: '🐈', label: 'Gata', value: 'gata' },
    ],
    correct: 'gatos',
  },
  {
    key: 'r3',
    stimulus: { emoji: '🌸🌸🌸🌸', label: 'Cuatro flores' },
    question: 'Mira, hay cuatro...',
    options: [
      { emoji: '🌸🌸🌸🌸', label: 'Flores', value: 'flores' },
      { emoji: '🌸', label: 'Flor', value: 'flor' },
      { emoji: '🌺', label: 'Flore', value: 'flore' },
    ],
    correct: 'flores',
  },
  {
    key: 'r4',
    stimulus: { emoji: '⚽⚽', label: 'Dos pelotas' },
    question: 'Mira, hay dos...',
    options: [
      { emoji: '⚽⚽', label: 'Pelotas', value: 'pelotas' },
      { emoji: '⚽', label: 'Pelota', value: 'pelota' },
      { emoji: '🏀', label: 'Pelote', value: 'pelote' },
    ],
    correct: 'pelotas',
  },
];

export default function COMUNICACION_051({ currentItem, onAnswer }: Props) {
  return (
    <InteractiveQA
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_051_CONFIG.id}
      title="Plurales"
      instruction={COMUNICACION_051_CONFIG.descripcion}
      rounds={ROUNDS}
      layout="options-grid"
    />
  );
}

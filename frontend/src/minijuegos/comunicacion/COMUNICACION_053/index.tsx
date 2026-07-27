import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_053_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ROUNDS = [
  {
    key: 'r1',
    question: 'Quien tiene el sombrero?',
    options: [
      { emoji: '👦🎩', label: 'Nino con sombrero', value: 'nino_sombrero' },
      { emoji: '👧🎒', label: 'Nina con mochila', value: 'nina_mochila' },
      { emoji: '👨👓', label: 'Adulto con lentes', value: 'adulto_lentes' },
    ],
    correct: 'nino_sombrero',
  },
  {
    key: 'r2',
    question: 'Quien tiene la cinta?',
    options: [
      { emoji: '🐶🦴', label: 'Perro', value: 'perro' },
      { emoji: '🐱🎀', label: 'Gato', value: 'gato' },
      { emoji: '🐰🥕', label: 'Conejo', value: 'conejo' },
    ],
    correct: 'gato',
  },
  {
    key: 'r3',
    question: 'De quien es esta pelota?',
    options: [
      { emoji: '👦⚽', label: 'Nino', value: 'nino' },
      { emoji: '👧📖', label: 'Nina', value: 'nina' },
      { emoji: '👨🔧', label: 'Adulto', value: 'adulto' },
    ],
    correct: 'nino',
  },
  {
    key: 'r4',
    question: 'De quien es este libro?',
    options: [
      { emoji: '👦⚽', label: 'Nino', value: 'nino' },
      { emoji: '👧📖', label: 'Nina', value: 'nina' },
      { emoji: '👨🔧', label: 'Adulto', value: 'adulto' },
    ],
    correct: 'nina',
  },
];

export default function COMUNICACION_053({ currentItem, onAnswer }: Props) {
  return (
    <InteractiveQA
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_053_CONFIG.id}
      title="Quien y de quien"
      instruction={COMUNICACION_053_CONFIG.descripcion}
      rounds={ROUNDS}
      layout="scene-tap"
    />
  );
}

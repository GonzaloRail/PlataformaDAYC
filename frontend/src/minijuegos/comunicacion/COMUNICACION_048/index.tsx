import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_048_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ROUNDS = [
  {
    key: 'r1',
    question: 'El perro es perseguido por el gato. Cual imagen lo muestra?',
    options: [
      { emoji: '🐱➡️🐶', label: 'Gato persigue perro', value: 'gato_persigue' },
      { emoji: '🐶➡️🐱', label: 'Perro persigue gato', value: 'perro_persigue' },
    ],
    correct: 'gato_persigue',
  },
  {
    key: 'r2',
    question: 'La nina es peinada por la mama. Cual imagen lo muestra?',
    options: [
      { emoji: '👩‍👧💇', label: 'Mama peina a nina', value: 'mama_peina' },
      { emoji: '👧💇👩', label: 'Nina peina a mama', value: 'nina_peina' },
    ],
    correct: 'mama_peina',
  },
  {
    key: 'r3',
    question: 'El auto es lavado por el papa. Cual imagen lo muestra?',
    options: [
      { emoji: '👨🚗💦', label: 'Papa lava auto', value: 'papa_lava' },
      { emoji: '🚗💦👨', label: 'Auto lava papa', value: 'auto_lava' },
    ],
    correct: 'papa_lava',
  },
  {
    key: 'r4',
    question: 'La pelota es pateada por el nino. Cual imagen lo muestra?',
    options: [
      { emoji: '👦⚽🦶', label: 'Nino patea pelota', value: 'nino_patea' },
      { emoji: '⚽🦶👦', label: 'Pelota patea nino', value: 'pelota_patea' },
    ],
    correct: 'nino_patea',
  },
];

export default function COMUNICACION_048({ currentItem, onAnswer }: Props) {
  return (
    <InteractiveQA
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_048_CONFIG.id}
      title="Oraciones pasivas"
      instruction={COMUNICACION_048_CONFIG.descripcion}
      rounds={ROUNDS}
      layout="two-images"
    />
  );
}

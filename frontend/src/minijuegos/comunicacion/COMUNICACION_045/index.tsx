import type { Answer, Item } from '@/minijuegos/types';
import { SpatialGame } from '@/minijuegos/shared/SpatialGame';
import { COMUNICACION_045_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ROUNDS = [
  {
    key: 'r1',
    instruction: 'Pon la pelota al lado de la caja.',
    object: { emoji: '⚽', label: 'Pelota' },
    reference: { emoji: '📦', label: 'Caja' },
    positions: [
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
      { id: 'arriba', label: 'Arriba', emoji: '👆' },
    ],
    correct: 'izquierda',
  },
  {
    key: 'r2',
    instruction: 'Pon el libro debajo de la mesa.',
    object: { emoji: '📖', label: 'Libro' },
    reference: { emoji: '🪑', label: 'Mesa' },
    positions: [
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
      { id: 'debajo', label: 'Debajo', emoji: '👇' },
    ],
    correct: 'debajo',
  },
  {
    key: 'r3',
    instruction: 'Pon la taza al lado de la jarra.',
    object: { emoji: '☕', label: 'Taza' },
    reference: { emoji: '🫖', label: 'Jarra' },
    positions: [
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
      { id: 'arriba', label: 'Arriba', emoji: '👆' },
    ],
    correct: 'derecha',
  },
  {
    key: 'r4',
    instruction: 'Pon el muneco debajo de la silla.',
    object: { emoji: '🧸', label: 'Muneco' },
    reference: { emoji: '🪑', label: 'Silla' },
    positions: [
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
      { id: 'debajo', label: 'Debajo', emoji: '👇' },
    ],
    correct: 'debajo',
  },
];

export default function COMUNICACION_045({ currentItem, onAnswer }: Props) {
  return (
    <SpatialGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_045_CONFIG.id}
      title="Al lado o debajo"
      instruction={COMUNICACION_045_CONFIG.descripcion}
      relation="al-lado"
      rounds={ROUNDS}
    />
  );
}

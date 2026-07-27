import type { Answer, Item } from '@/minijuegos/types';
import { SpatialGame } from '@/minijuegos/shared/SpatialGame';
import { COMUNICACION_056_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ROUNDS = [
  {
    key: 'r1',
    instruction: 'Pon el perro enfrente de la casa.',
    object: { emoji: '🐶', label: 'Perro' },
    reference: { emoji: '🏠', label: 'Casa' },
    positions: [
      { id: 'enfrente', label: 'Enfrente', emoji: '⬆️' },
      { id: 'detras', label: 'Detras', emoji: '⬇️' },
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
    ],
    correct: 'enfrente',
  },
  {
    key: 'r2',
    instruction: 'Pon el gato detras del arbol.',
    object: { emoji: '🐱', label: 'Gato' },
    reference: { emoji: '🌳', label: 'Arbol' },
    positions: [
      { id: 'enfrente', label: 'Enfrente', emoji: '⬆️' },
      { id: 'detras', label: 'Detras', emoji: '⬇️' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
    ],
    correct: 'detras',
  },
  {
    key: 'r3',
    instruction: 'Pon la flor enfrente del sol.',
    object: { emoji: '🌸', label: 'Flor' },
    reference: { emoji: '☀️', label: 'Sol' },
    positions: [
      { id: 'enfrente', label: 'Enfrente', emoji: '⬆️' },
      { id: 'detras', label: 'Detras', emoji: '⬇️' },
      { id: 'izquierda', label: 'Izquierda', emoji: '👈' },
    ],
    correct: 'enfrente',
  },
  {
    key: 'r4',
    instruction: 'Pon el pajaro detras de la nube.',
    object: { emoji: '🐦', label: 'Pajaro' },
    reference: { emoji: '☁️', label: 'Nube' },
    positions: [
      { id: 'enfrente', label: 'Enfrente', emoji: '⬆️' },
      { id: 'detras', label: 'Detras', emoji: '⬇️' },
      { id: 'derecha', label: 'Derecha', emoji: '👉' },
    ],
    correct: 'detras',
  },
];

export default function COMUNICACION_056({ currentItem, onAnswer }: Props) {
  return (
    <SpatialGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_056_CONFIG.id}
      title="Enfrente y detras"
      instruction={COMUNICACION_056_CONFIG.descripcion}
      relation="enfrente"
      rounds={ROUNDS}
    />
  );
}

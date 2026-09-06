import type { Answer, Item } from '@/minijuegos/types';
import { ComparisonGame } from '@/minijuegos/shared/ComparisonGame';
import { COMUNICACION_075_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', items: [{ emoji: '🎨', label: 'Dibujo simple', quality: 'malo' }, { emoji: '🖼️', label: 'Dibujo normal', quality: 'regular' }, { emoji: '🌟', label: 'Dibujo bonito', quality: 'bueno' }], question: 'Cual es el mejor dibujo?', correct: 2 },
  { key: 'r2', items: [{ emoji: '🍽️', label: 'Plato feo', quality: 'malo' }, { emoji: '🍲', label: 'Plato normal', quality: 'regular' }, { emoji: '🍱', label: 'Plato bonito', quality: 'bueno' }], question: 'Cual es el peor plato?', correct: 0 },
  { key: 'r3', items: [{ emoji: '📖', label: 'Aburrida', quality: 'malo' }, { emoji: '📚', label: 'Normal', quality: 'regular' }, { emoji: '📗', label: 'Divertida', quality: 'bueno' }], question: 'Cual es la mejor historia?', correct: 2 },
  { key: 'r4', items: [{ emoji: '🧸', label: 'Roto', quality: 'malo' }, { emoji: '🧸', label: 'Usado', quality: 'regular' }, { emoji: '🧸', label: 'Nuevo', quality: 'bueno' }], question: 'Cual es el peor juguete?', correct: 0 },
];

export default function COMUNICACION_075({ currentItem, onAnswer }: Props) {
  return <ComparisonGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_075_CONFIG.id} title="Mejor y peor" instruction={COMUNICACION_075_CONFIG.descripcion} mode="calidad" rounds={ROUNDS} />;
}

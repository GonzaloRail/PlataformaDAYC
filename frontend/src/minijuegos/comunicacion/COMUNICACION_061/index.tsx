import type { Answer, Item } from '@/minijuegos/types';
import { ComparisonGame } from '@/minijuegos/shared/ComparisonGame';
import { COMUNICACION_061_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', items: [{ emoji: '⚽', label: 'Pequena', size: 0.7 }, { emoji: '⚽', label: 'Mediana', size: 1.0 }, { emoji: '⚽', label: 'Grande', size: 1.3 }], question: 'Cual es la pelota mas grande?', correct: 2 },
  { key: 'r2', items: [{ emoji: '🌳', label: 'Pequeno', size: 0.7 }, { emoji: '🌳', label: 'Mediano', size: 1.0 }, { emoji: '🌳', label: 'Grande', size: 1.3 }], question: 'Cual es el arbol mas pequeno?', correct: 0 },
  { key: 'r3', items: [{ emoji: '🏠', label: 'Pequena', size: 0.7 }, { emoji: '🏠', label: 'Mediana', size: 1.0 }, { emoji: '🏠', label: 'Grande', size: 1.3 }], question: 'Cual es la casa mas grande?', correct: 2 },
  { key: 'r4', items: [{ emoji: '🐟', label: 'Pequeno', size: 0.7 }, { emoji: '🐟', label: 'Mediano', size: 1.0 }, { emoji: '🐟', label: 'Grande', size: 1.3 }], question: 'Cual es el pez mas pequeno?', correct: 0 },
];

export default function COMUNICACION_061({ currentItem, onAnswer }: Props) {
  return <ComparisonGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_061_CONFIG.id} title="Grande y pequeno" instruction={COMUNICACION_061_CONFIG.descripcion} mode="tamanio" rounds={ROUNDS} />;
}

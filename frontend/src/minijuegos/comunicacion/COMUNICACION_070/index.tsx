import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_070_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Que haces en la manana?', options: [{ emoji: '🍳', label: 'Desayunar', value: 'desayunar' }, { emoji: '😴', label: 'Dormir', value: 'dormir' }, { emoji: '🍝', label: 'Cenar', value: 'cenar' }], correct: 'desayunar' },
  { key: 'r2', question: 'Que haces en la noche?', options: [{ emoji: '😴', label: 'Dormir', value: 'dormir' }, { emoji: '🍳', label: 'Desayunar', value: 'desayunar' }, { emoji: '🛝', label: 'Jugar en el parque', value: 'parque' }], correct: 'dormir' },
  { key: 'r3', question: 'Cuando sale el sol?', options: [{ emoji: '🌅', label: 'En la manana', value: 'manana' }, { emoji: '🌙', label: 'En la noche', value: 'noche' }, { emoji: '🌇', label: 'En la tarde', value: 'tarde' }], correct: 'manana' },
  { key: 'r4', question: 'Cuando se ven las estrellas?', options: [{ emoji: '🌙', label: 'En la noche', value: 'noche' }, { emoji: '🌅', label: 'En la manana', value: 'manana' }, { emoji: '☀️', label: 'Al mediodia', value: 'mediodia' }], correct: 'noche' },
];

export default function COMUNICACION_070({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_070_CONFIG.id} title="Cuando pasa?" instruction={COMUNICACION_070_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

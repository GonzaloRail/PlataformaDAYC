import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_063_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'El nino abrio el paraguas porque...', options: [{ emoji: '🌧️', label: 'Esta lloviendo', value: 'lluvia' }, { emoji: '☀️', label: 'Hace sol', value: 'sol' }, { emoji: '💧', label: 'Tiene sed', value: 'sed' }], correct: 'lluvia' },
  { key: 'r2', question: 'La nina se puso la chaqueta porque...', options: [{ emoji: '❄️', label: 'Hace frio', value: 'frio' }, { emoji: '🔥', label: 'Tiene calor', value: 'calor' }, { emoji: '⚽', label: 'Quiere jugar', value: 'jugar' }], correct: 'frio' },
  { key: 'r3', question: 'La planta se seco porque...', options: [{ emoji: '🚫💧', label: 'No tuvo agua', value: 'sin_agua' }, { emoji: '💧💧', label: 'Mucha agua', value: 'mucha_agua' }, { emoji: '☀️☀️', label: 'Mucho sol', value: 'mucho_sol' }], correct: 'sin_agua' },
  { key: 'r4', question: 'El nino esta feliz porque...', options: [{ emoji: '🎁', label: 'Recibio un regalo', value: 'regalo' }, { emoji: '🤕', label: 'Se cayo', value: 'caida' }, { emoji: '🧸❌', label: 'Perdio su juguete', value: 'perdio' }], correct: 'regalo' },
];

export default function COMUNICACION_063({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_063_CONFIG.id} title="Causa y efecto" instruction={COMUNICACION_063_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

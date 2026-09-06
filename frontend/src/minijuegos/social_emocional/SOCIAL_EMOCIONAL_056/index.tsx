import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_056_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Te dicen que tu dibujo no esta bien coloreado. Que haces?', options: [{ emoji: '👍', label: 'Lo arreglo', value: 'arreglar' }, { emoji: '😢', label: 'Lloro', value: 'llorar' }, { emoji: '🗑️', label: 'Rompo el dibujo', value: 'romper' }], correct: 'arreglar' },
  { key: 'r2', question: 'Te dicen que puedes correr mas rapido. Que haces?', options: [{ emoji: '👍', label: 'Intento mejorar', value: 'mejorar' }, { emoji: '😤', label: 'Me enojo', value: 'enojar' }, { emoji: '🚶', label: 'Dejo de correr', value: 'dejar' }], correct: 'mejorar' },
  { key: 'r3', question: 'Te dicen que tu letra puede ser mas clara. Que haces?', options: [{ emoji: '👍', label: 'Practico escribir mejor', value: 'practicar' }, { emoji: '😢', label: 'Lloro', value: 'llorar' }, { emoji: '🙅', label: 'No escribo mas', value: 'dejar' }], correct: 'practicar' },
  { key: 'r4', question: 'Te dicen que compartas tus juguetes. Que haces?', options: [{ emoji: '👍', label: 'Comparto con gusto', value: 'compartir' }, { emoji: '😤', label: 'Me enojo', value: 'enojar' }, { emoji: '🧸', label: 'Escondo mis juguetes', value: 'esconder' }], correct: 'compartir' },
];

export default function SOCIAL_EMOCIONAL_056({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_056_CONFIG.id} title="Acepto criticas" instruction={SOCIAL_EMOCIONAL_056_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

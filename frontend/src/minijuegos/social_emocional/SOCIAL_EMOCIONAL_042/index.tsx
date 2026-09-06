import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_042_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Como te sientes ahora?', options: [{ emoji: '😊', label: 'Feliz', value: 'feliz' }, { emoji: '😢', label: 'Triste', value: 'triste' }, { emoji: '😡', label: 'Enojado', value: 'enojado' }, { emoji: '😨', label: 'Asustado', value: 'asustado' }, { emoji: '😴', label: 'Cansado', value: 'cansado' }, { emoji: '🤗', label: 'Querido', value: 'querido' }], correct: 'feliz' },
  { key: 'r2', question: 'Cuando fue la ultima vez que te sentiste feliz?', options: [{ emoji: '🎁', label: 'Recibi un regalo', value: 'regalo' }, { emoji: '🛝', label: 'Fui al parque', value: 'parque' }, { emoji: '👨‍👩‍👧', label: 'Jugue en familia', value: 'familia' }, { emoji: '🍦', label: 'Comi algo rico', value: 'comida' }], correct: 'parque' },
  { key: 'r3', question: 'Cuando te sientes triste?', options: [{ emoji: '🤕', label: 'Cuando me caigo', value: 'caida' }, { emoji: '👋', label: 'Cuando se van visitas', value: 'despedida' }, { emoji: '🧸', label: 'Cuando pierdo un juguete', value: 'perdida' }, { emoji: '😴', label: 'Cuando tengo sueno', value: 'sueno' }], correct: 'despedida' },
  { key: 'r4', question: 'Que haces cuando estas enojado?', options: [{ emoji: '🗣️', label: 'Hablo de como me siento', value: 'hablar' }, { emoji: '👊', label: 'Golpeo cosas', value: 'golpear' }, { emoji: '😭', label: 'Lloro', value: 'llorar' }, { emoji: '🚶', label: 'Me voy lejos', value: 'irse' }], correct: 'hablar' },
];

export default function SOCIAL_EMOCIONAL_042({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_042_CONFIG.id} title="Como te sientes" instruction={SOCIAL_EMOCIONAL_042_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

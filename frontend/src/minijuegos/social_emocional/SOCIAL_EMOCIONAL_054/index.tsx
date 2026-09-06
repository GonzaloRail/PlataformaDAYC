import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_054_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Alguien te quito tu juguete. Que haces?', options: [{ emoji: '🗣️', label: 'Digo devuelvemelo', value: 'hablar' }, { emoji: '👊', label: 'Le pego', value: 'pegar' }, { emoji: '😢', label: 'Lloro', value: 'llorar' }], correct: 'hablar' },
  { key: 'r2', question: 'Un amigo rompio tu dibujo sin querer. Que haces?', options: [{ emoji: '🗣️', label: 'Digo que me molesto', value: 'hablar' }, { emoji: '📄', label: 'Rompo su dibujo', value: 'venganza' }, { emoji: '🚶', label: 'Me voy sin decir nada', value: 'irse' }], correct: 'hablar' },
  { key: 'r3', question: 'No te dejan jugar en el parque. Que haces?', options: [{ emoji: '🗣️', label: 'Explico que quiero jugar', value: 'hablar' }, { emoji: '😤', label: 'Grito y me enojo', value: 'gritar' }, { emoji: '🏠', label: 'Me voy a casa triste', value: 'irse' }], correct: 'hablar' },
  { key: 'r4', question: 'Tu hermano se comio tu galleta. Que haces?', options: [{ emoji: '🗣️', label: 'Le digo que no me gusto', value: 'hablar' }, { emoji: '👊', label: 'Le pego', value: 'pegar' }, { emoji: '🍪', label: 'Me como su galleta', value: 'venganza' }], correct: 'hablar' },
];

export default function SOCIAL_EMOCIONAL_054({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_054_CONFIG.id} title="Expreso mi enojo" instruction={SOCIAL_EMOCIONAL_054_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

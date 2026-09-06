import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_038_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Tu eres nino o nina?', options: [{ emoji: '👦', label: 'Soy nino', value: 'nino' }, { emoji: '👧', label: 'Soy nina', value: 'nina' }], correct: 'nino' },
];

export default function SOCIAL_EMOCIONAL_038({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_038_CONFIG.id} title="Nino o nina" instruction={SOCIAL_EMOCIONAL_038_CONFIG.descripcion} rounds={ROUNDS} layout="two-images" />;
}

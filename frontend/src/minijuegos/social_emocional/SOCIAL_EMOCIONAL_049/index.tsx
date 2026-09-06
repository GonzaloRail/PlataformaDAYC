import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_049_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Te gusta jugar carreras o competencias?', options: [{ emoji: '🏆', label: 'Me gusta competir', value: 'si' }, { emoji: '🤝', label: 'No me gusta', value: 'no' }], correct: 'si' },
];

export default function SOCIAL_EMOCIONAL_049({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_049_CONFIG.id} title="Juegos competitivos" instruction={SOCIAL_EMOCIONAL_049_CONFIG.descripcion} rounds={ROUNDS} layout="two-images" />;
}

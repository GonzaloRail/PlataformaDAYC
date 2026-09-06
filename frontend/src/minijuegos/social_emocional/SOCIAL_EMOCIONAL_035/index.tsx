import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_035_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', stimulus: { emoji: '🐶👓', label: 'Perro con gafas' }, question: 'Te hace reir?', options: [{ emoji: '😄', label: 'Me da risa', value: 'risa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '🤔', label: 'No entiendo', value: 'confuso' }], correct: 'risa' },
  { key: 'r2', stimulus: { emoji: '🐱🚲', label: 'Gato en bicicleta' }, question: 'Te hace reir?', options: [{ emoji: '😄', label: 'Me da risa', value: 'risa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '🤔', label: 'No entiendo', value: 'confuso' }], correct: 'risa' },
  { key: 'r3', stimulus: { emoji: '🐘🎈', label: 'Elefante con globos' }, question: 'Te hace reir?', options: [{ emoji: '😄', label: 'Me da risa', value: 'risa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '🤔', label: 'No entiendo', value: 'confuso' }], correct: 'risa' },
  { key: 'r4', stimulus: { emoji: '🦒🧣', label: 'Jirafa con bufanda' }, question: 'Te hace reir?', options: [{ emoji: '😄', label: 'Me da risa', value: 'risa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '🤔', label: 'No entiendo', value: 'confuso' }], correct: 'risa' },
];

export default function SOCIAL_EMOCIONAL_035({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_035_CONFIG.id} title="Que gracioso" instruction={SOCIAL_EMOCIONAL_035_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

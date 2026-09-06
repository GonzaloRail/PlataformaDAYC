import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { SOCIAL_EMOCIONAL_052_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', stimulus: { emoji: '🐄👓', label: 'Vaca con lentes' }, question: 'Esta imagen es chistosa?', options: [{ emoji: '😄', label: 'Si, es chistosa', value: 'chistosa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '😟', label: 'Me molesta', value: 'molesta' }], correct: 'chistosa' },
  { key: 'r2', stimulus: { emoji: '🐘🤧', label: 'Elefante resfriado' }, question: 'Esta imagen es chistosa?', options: [{ emoji: '😄', label: 'Si, es chistosa', value: 'chistosa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '😟', label: 'Me molesta', value: 'molesta' }], correct: 'chistosa' },
  { key: 'r3', stimulus: { emoji: '🐧🎩', label: 'Pinguino con sombrero' }, question: 'Esta imagen es chistosa?', options: [{ emoji: '😄', label: 'Si, es chistosa', value: 'chistosa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '😟', label: 'Me molesta', value: 'molesta' }], correct: 'chistosa' },
  { key: 'r4', stimulus: { emoji: '🐒📱', label: 'Mono con telefono' }, question: 'Esta imagen es chistosa?', options: [{ emoji: '😄', label: 'Si, es chistosa', value: 'chistosa' }, { emoji: '😐', label: 'No me da risa', value: 'no_risa' }, { emoji: '😟', label: 'Me molesta', value: 'molesta' }], correct: 'chistosa' },
];

export default function SOCIAL_EMOCIONAL_052({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_052_CONFIG.id} title="Bromas divertidas" instruction={SOCIAL_EMOCIONAL_052_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

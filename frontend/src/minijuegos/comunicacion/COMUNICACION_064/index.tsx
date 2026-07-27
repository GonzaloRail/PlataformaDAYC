import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_064_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { key: 'r1', question: 'Que pasa si dejas un helado al sol?', options: [{ emoji: '🍦💧', label: 'Se derrite', value: 'derrite' }, { emoji: '🍦❄️', label: 'Se congela', value: 'congela' }, { emoji: '🍦📈', label: 'Crece', value: 'crece' }], correct: 'derrite' },
  { key: 'r2', question: 'Que pasa si siembras una semilla y la riegas?', options: [{ emoji: '🌱', label: 'Crece una planta', value: 'crece' }, { emoji: '🦅', label: 'Sale volando', value: 'vuela' }, { emoji: '💔', label: 'Se rompe', value: 'rompe' }], correct: 'crece' },
  { key: 'r3', question: 'Que pasa si tiras una pelota al agua?', options: [{ emoji: '⚽🌊⬆️', label: 'Flota', value: 'flota' }, { emoji: '⚽🌊⬇️', label: 'Se hunde', value: 'hunde' }, { emoji: '⚽✨', label: 'Desaparece', value: 'desaparece' }], correct: 'flota' },
  { key: 'r4', question: 'Que pasa si no duermes en toda la noche?', options: [{ emoji: '😴', label: 'Tienes sueno', value: 'sueno' }, { emoji: '🍔', label: 'Tienes hambre', value: 'hambre' }, { emoji: '📏', label: 'Creciste mas', value: 'crece' }], correct: 'sueno' },
];

export default function COMUNICACION_064({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_064_CONFIG.id} title="Que pasa si..." instruction={COMUNICACION_064_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}

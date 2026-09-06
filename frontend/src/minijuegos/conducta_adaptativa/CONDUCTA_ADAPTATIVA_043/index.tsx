import type { Answer, Item } from '@/minijuegos/types';
import { SequenceOrderGame } from '@/minijuegos/shared/SequenceOrderGame';
import { CONDUCTA_ADAPTATIVA_043_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const STEPS = [
  { id: 'pasta', label: 'Poner pasta en el cepillo', emoji: '🪥' },
  { id: 'cepillar', label: 'Cepillar todos los dientes', emoji: '😁' },
  { id: 'enjuagar', label: 'Enjuagar la boca', emoji: '💧' },
  { id: 'guardar', label: 'Guardar el cepillo', emoji: '🧴' },
];

const CORRECT_ORDER = ['pasta', 'cepillar', 'enjuagar', 'guardar'];

export default function CONDUCTA_ADAPTATIVA_043({ currentItem, onAnswer }: Props) {
  return <SequenceOrderGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_043_CONFIG.id} title="Me cepillo los dientes" instruction={CONDUCTA_ADAPTATIVA_043_CONFIG.descripcion} steps={STEPS} correctOrder={CORRECT_ORDER} />;
}

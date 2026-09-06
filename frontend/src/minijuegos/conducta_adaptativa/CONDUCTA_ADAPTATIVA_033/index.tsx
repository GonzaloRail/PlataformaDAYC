import type { Answer, Item } from '@/minijuegos/types';
import { SequenceOrderGame } from '@/minijuegos/shared/SequenceOrderGame';
import { CONDUCTA_ADAPTATIVA_033_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const STEPS = [
  { id: 'abrir', label: 'Abrir el cano', emoji: '💧' },
  { id: 'jabon', label: 'Poner jabon', emoji: '🧼' },
  { id: 'frotar', label: 'Frotar las manos', emoji: '🤲' },
  { id: 'enjuagar', label: 'Enjuagar', emoji: '💦' },
  { id: 'secar', label: 'Secar con toalla', emoji: '🧻' },
];

const CORRECT_ORDER = ['abrir', 'jabon', 'frotar', 'enjuagar', 'secar'];

export default function CONDUCTA_ADAPTATIVA_033({ currentItem, onAnswer }: Props) {
  return <SequenceOrderGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_033_CONFIG.id} title="Me lavo las manos" instruction={CONDUCTA_ADAPTATIVA_033_CONFIG.descripcion} steps={STEPS} correctOrder={CORRECT_ORDER} />;
}

import type { Answer, Item } from '@/minijuegos/types';
import { SequenceOrderGame } from '@/minijuegos/shared/SequenceOrderGame';
import { CONDUCTA_ADAPTATIVA_039_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const STEPS = [
  { id: 'meter', label: 'Meter el boton en el ojal', emoji: '🔘' },
  { id: 'sacar', label: 'Sacar el boton por el otro lado', emoji: '👉' },
  { id: 'jalar', label: 'Jalar para ajustar', emoji: '👔' },
  { id: 'repetir', label: 'Repetir con el siguiente', emoji: '🔁' },
];

const CORRECT_ORDER = ['meter', 'sacar', 'jalar', 'repetir'];

export default function CONDUCTA_ADAPTATIVA_039({ currentItem, onAnswer }: Props) {
  return <SequenceOrderGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_039_CONFIG.id} title="Botones y cierres" instruction={CONDUCTA_ADAPTATIVA_039_CONFIG.descripcion} steps={STEPS} correctOrder={CORRECT_ORDER} />;
}

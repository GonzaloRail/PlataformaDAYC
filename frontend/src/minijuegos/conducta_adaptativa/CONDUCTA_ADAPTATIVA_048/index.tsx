import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { CONDUCTA_ADAPTATIVA_048_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'zapato-izq', label: 'Zapato izquierdo', emoji: '👟', zoneId: 'pie-izq' },
  { id: 'zapato-der', label: 'Zapato derecho', emoji: '👟', zoneId: 'pie-der' },
];

const ZONES = [
  { id: 'pie-izq', label: 'Pie izquierdo', emoji: '🦶', hint: 'El zapato correcto para este pie' },
  { id: 'pie-der', label: 'Pie derecho', emoji: '🦶', hint: 'El zapato correcto para este pie' },
];

export default function CONDUCTA_ADAPTATIVA_048({ currentItem, onAnswer }: Props) {
  return <MatchingGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_048_CONFIG.id} title="Zapatos" instruction={CONDUCTA_ADAPTATIVA_048_CONFIG.descripcion} items={ITEMS} zones={ZONES} />;
}

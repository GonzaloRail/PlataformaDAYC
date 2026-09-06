import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { CONDUCTA_ADAPTATIVA_040_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'plato', label: 'Plato', emoji: '🍽️', zoneId: 'centro' },
  { id: 'vaso', label: 'Vaso', emoji: '🥛', zoneId: 'derecha' },
  { id: 'tenedor', label: 'Tenedor', emoji: '🍴', zoneId: 'izquierda' },
  { id: 'servilleta', label: 'Servilleta', emoji: '🍽️', zoneId: 'centro' },
];

const ZONES = [
  { id: 'centro', label: 'Centro', emoji: '🎯', hint: 'Plato y servilleta' },
  { id: 'derecha', label: 'Derecha', emoji: '👉', hint: 'Vaso aqui' },
  { id: 'izquierda', label: 'Izquierda', emoji: '👈', hint: 'Tenedor aqui' },
];

export default function CONDUCTA_ADAPTATIVA_040({ currentItem, onAnswer }: Props) {
  return <ClassificationGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_040_CONFIG.id} title="Pongo la mesa" instruction={CONDUCTA_ADAPTATIVA_040_CONFIG.descripcion} items={ITEMS} zones={ZONES} modo="un_criterio" />;
}

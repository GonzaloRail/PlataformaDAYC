import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { CONDUCTA_ADAPTATIVA_060_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'plato-sucio', label: 'Plato sucio', emoji: '🍽️', zoneId: 'lavaplatos' },
  { id: 'vaso-sucio', label: 'Vaso sucio', emoji: '🥛', zoneId: 'escurridor' },
  { id: 'cubiertos', label: 'Cubiertos', emoji: '🍴', zoneId: 'lavaplatos' },
  { id: 'mantel', label: 'Mantel', emoji: '🧻', zoneId: 'lavadora' },
];

const ZONES = [
  { id: 'lavaplatos', label: 'Lavaplatos', emoji: '🧽', hint: 'Platos y cubiertos' },
  { id: 'escurridor', label: 'Escurridor', emoji: '🍷', hint: 'Vasos aqui' },
  { id: 'lavadora', label: 'Lavadora', emoji: '🧺', hint: 'Mantel y servilletas' },
];

export default function CONDUCTA_ADAPTATIVA_060({ currentItem, onAnswer }: Props) {
  return <ClassificationGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_060_CONFIG.id} title="Limpio la mesa" instruction={CONDUCTA_ADAPTATIVA_060_CONFIG.descripcion} items={ITEMS} zones={ZONES} modo="un_criterio" />;
}

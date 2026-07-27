import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { COMUNICACION_060_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'nada', label: 'Nada', emoji: '🐟', zoneId: 'pez' },
  { id: 'leche', label: 'Leche', emoji: '🥛', zoneId: 'vaca' },
  { id: 'noche', label: 'Noche', emoji: '🌙', zoneId: 'luna' },
  { id: 'verdura', label: 'Verdura', emoji: '🥕', zoneId: 'zanahoria' },
];

const ZONES = [
  { id: 'pez', label: 'Pez', emoji: '🐟', hint: 'pajaro vuela, pez...' },
  { id: 'vaca', label: 'Vaca', emoji: '🐄', hint: 'abeja miel, vaca...' },
  { id: 'luna', label: 'Luna', emoji: '🌙', hint: 'sol dia, luna...' },
  { id: 'zanahoria', label: 'Zanahoria', emoji: '🥕', hint: 'manzana fruta, zanahoria...' },
];

export default function COMUNICACION_060({ currentItem, onAnswer }: Props) {
  return <MatchingGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_060_CONFIG.id} title="Analogias" instruction={COMUNICACION_060_CONFIG.descripcion} items={ITEMS} zones={ZONES} />;
}

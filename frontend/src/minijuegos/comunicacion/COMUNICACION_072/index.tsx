import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { COMUNICACION_072_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'pequeno', label: 'Pequeno', emoji: '🐭', zoneId: 'grande' },
  { id: 'lento', label: 'Lento', emoji: '🐢', zoneId: 'rapido' },
  { id: 'triste', label: 'Triste', emoji: '😢', zoneId: 'feliz' },
  { id: 'frio', label: 'Frio', emoji: '❄️', zoneId: 'caliente' },
];

const ZONES = [
  { id: 'grande', label: 'Grande', emoji: '🐘', hint: 'Lo contrario de pequeno' },
  { id: 'rapido', label: 'Rapido', emoji: '🐆', hint: 'Lo contrario de lento' },
  { id: 'feliz', label: 'Feliz', emoji: '😊', hint: 'Lo contrario de triste' },
  { id: 'caliente', label: 'Caliente', emoji: '🔥', hint: 'Lo contrario de frio' },
];

export default function COMUNICACION_072({ currentItem, onAnswer }: Props) {
  return <MatchingGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_072_CONFIG.id} title="Lo contrario" instruction={COMUNICACION_072_CONFIG.descripcion} items={ITEMS} zones={ZONES} />;
}

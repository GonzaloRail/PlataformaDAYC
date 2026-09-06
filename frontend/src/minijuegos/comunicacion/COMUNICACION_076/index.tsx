import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { COMUNICACION_076_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'parque', label: 'Fui al parque', emoji: '🛝', zoneId: 'ayer' },
  { id: 'pizza', label: 'Comi pizza', emoji: '🍕', zoneId: 'ayer' },
  { id: 'bloques', label: 'Jugue con bloques', emoji: '🧱', zoneId: 'ayer' },
  { id: 'escuela', label: 'Ire a la escuela', emoji: '🏫', zoneId: 'manana' },
  { id: 'helado', label: 'Comere helado', emoji: '🍦', zoneId: 'manana' },
  { id: 'pelicula', label: 'Vere una pelicula', emoji: '🎬', zoneId: 'manana' },
];

const ZONES = [
  { id: 'ayer', label: 'Ayer', emoji: '⬅️', hint: 'Lo que ya paso' },
  { id: 'manana', label: 'Manana', emoji: '➡️', hint: 'Lo que va a pasar' },
];

export default function COMUNICACION_076({ currentItem, onAnswer }: Props) {
  return <ClassificationGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_076_CONFIG.id} title="Ayer y manana" instruction={COMUNICACION_076_CONFIG.descripcion} items={ITEMS} zones={ZONES} modo="un_criterio" />;
}

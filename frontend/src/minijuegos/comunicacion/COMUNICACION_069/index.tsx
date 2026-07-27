import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { COMUNICACION_069_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'flores', label: 'Flores', emoji: '🌸', zoneId: 'primavera' },
  { id: 'playa', label: 'Playa', emoji: '🏖️', zoneId: 'verano' },
  { id: 'hojas', label: 'Hojas secas', emoji: '🍂', zoneId: 'otono' },
  { id: 'nieve', label: 'Nieve', emoji: '⛄', zoneId: 'invierno' },
  { id: 'lluvia', label: 'Lluvia', emoji: '🌧️', zoneId: 'primavera' },
  { id: 'sol', label: 'Sol fuerte', emoji: '☀️', zoneId: 'verano' },
  { id: 'paraguas', label: 'Paraguas', emoji: '☂️', zoneId: 'otono' },
  { id: 'bufanda', label: 'Bufanda', emoji: '🧣', zoneId: 'invierno' },
];

const ZONES = [
  { id: 'primavera', label: 'Primavera', emoji: '🌸', hint: 'Flores, lluvia' },
  { id: 'verano', label: 'Verano', emoji: '☀️', hint: 'Sol, playa' },
  { id: 'otono', label: 'Otono', emoji: '🍂', hint: 'Hojas, viento' },
  { id: 'invierno', label: 'Invierno', emoji: '⛄', hint: 'Nieve, frio' },
];

export default function COMUNICACION_069({ currentItem, onAnswer }: Props) {
  return <ClassificationGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_069_CONFIG.id} title="Las estaciones" instruction={COMUNICACION_069_CONFIG.descripcion} items={ITEMS} zones={ZONES} modo="un_criterio" />;
}

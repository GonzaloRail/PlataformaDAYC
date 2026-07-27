import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { COMUNICACION_071_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'patas', label: 'Tienen 4 patas', emoji: '🐾', zoneId: 'parecen' },
  { id: 'sonido', label: 'Uno ladra, otro maulla', emoji: '🗣️', zoneId: 'diferentes' },
  { id: 'pelo', label: 'Tienen pelo', emoji: '🦴', zoneId: 'parecen' },
  { id: 'tamano', label: 'Uno es mas grande', emoji: '📏', zoneId: 'diferentes' },
];

const ZONES = [
  { id: 'parecen', label: 'Se parecen', emoji: '✅', hint: 'Lo que tienen en comun' },
  { id: 'diferentes', label: 'Son diferentes', emoji: '❌', hint: 'Lo que los hace distintos' },
];

export default function COMUNICACION_071({ currentItem, onAnswer }: Props) {
  return <ClassificationGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_071_CONFIG.id} title="Se parecen o son diferentes?" instruction={COMUNICACION_071_CONFIG.descripcion} items={ITEMS} zones={ZONES} modo="un_criterio" />;
}

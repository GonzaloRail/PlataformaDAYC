import type { Answer, Item } from '@/minijuegos/types';
import { DressUpGame } from '@/minijuegos/shared/DressUpGame';
import { SOCIAL_EMOCIONAL_040_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'sombrero', label: 'Sombrero', emoji: '🎩', slot: 'cabeza' },
  { id: 'corona', label: 'Corona', emoji: '👑', slot: 'cabeza' },
  { id: 'camisa', label: 'Camisa', emoji: '👔', slot: 'torso' },
  { id: 'capa', label: 'Capa', emoji: '🧥', slot: 'torso' },
  { id: 'pantalon', label: 'Pantalon', emoji: '👖', slot: 'piernas' },
  { id: 'zapatos', label: 'Zapatos', emoji: '👟', slot: 'piernas' },
];

export default function SOCIAL_EMOCIONAL_040({ currentItem, onAnswer }: Props) {
  return <DressUpGame currentItem={currentItem} onAnswer={onAnswer} activityId={SOCIAL_EMOCIONAL_040_CONFIG.id} title="A disfrazarse" instruction={SOCIAL_EMOCIONAL_040_CONFIG.descripcion} items={ITEMS} characterEmoji="🧒" />;
}

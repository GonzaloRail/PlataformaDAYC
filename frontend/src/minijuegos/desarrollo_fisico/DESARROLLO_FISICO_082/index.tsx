import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { DESARROLLO_FISICO_082_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ITEMS = [
  { id: 'clip1', label: 'Clip 1', emoji: '📎', zoneId: 'borde1' },
  { id: 'clip2', label: 'Clip 2', emoji: '📎', zoneId: 'borde2' },
  { id: 'clip3', label: 'Clip 3', emoji: '📎', zoneId: 'borde3' },
];

const ZONES = [
  { id: 'borde1', label: 'Borde arriba', emoji: '📄', hint: 'Coloca un clip aqui' },
  { id: 'borde2', label: 'Borde izquierdo', emoji: '📄', hint: 'Coloca otro clip' },
  { id: 'borde3', label: 'Borde derecho', emoji: '📄', hint: 'Coloca el ultimo clip' },
];

export default function DESARROLLO_FISICO_082({ currentItem, onAnswer }: Props) {
  return <MatchingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_082_CONFIG.id} title="Coloca clips" instruction={DESARROLLO_FISICO_082_CONFIG.descripcion} items={ITEMS} zones={ZONES} />;
}

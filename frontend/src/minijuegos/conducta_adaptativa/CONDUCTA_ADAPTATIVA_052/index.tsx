import type { Answer, Item } from '@/minijuegos/types';
import { CrosswalkGame } from '@/minijuegos/shared/CrosswalkGame';
import { CONDUCTA_ADAPTATIVA_052_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { hasLight: true, hasCar: false, key: 'r1' },
  { hasLight: false, hasCar: false, key: 'r2' },
  { hasLight: true, hasCar: true, key: 'r3' },
];

export default function CONDUCTA_ADAPTATIVA_052({ currentItem, onAnswer }: Props) {
  return <CrosswalkGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_052_CONFIG.id} title="Cruzo la calle" instruction={CONDUCTA_ADAPTATIVA_052_CONFIG.descripcion} rounds={ROUNDS} />;
}

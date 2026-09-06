import type { Answer, Item } from '@/minijuegos/types';
import { TracingGame } from '@/minijuegos/shared/TracingGame';
import { DESARROLLO_FISICO_085_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { model: 'diamond' as const, label: 'Diamante', key: 'r1' },
];

export default function DESARROLLO_FISICO_085({ currentItem, onAnswer }: Props) {
  return <TracingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_085_CONFIG.id} title="Copia un diamante" instruction={DESARROLLO_FISICO_085_CONFIG.descripcion} rounds={ROUNDS} />;
}

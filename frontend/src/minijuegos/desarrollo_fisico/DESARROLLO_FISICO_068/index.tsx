import type { Answer, Item } from '@/minijuegos/types';
import { TracingGame } from '@/minijuegos/shared/TracingGame';
import { DESARROLLO_FISICO_068_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { model: 'cross' as const, label: 'Cruz', key: 'r1' },
];

export default function DESARROLLO_FISICO_068({ currentItem, onAnswer }: Props) {
  return <TracingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_068_CONFIG.id} title="Copia una cruz" instruction={DESARROLLO_FISICO_068_CONFIG.descripcion} rounds={ROUNDS} />;
}

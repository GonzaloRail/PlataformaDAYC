import type { Answer, Item } from '@/minijuegos/types';
import { TracingGame } from '@/minijuegos/shared/TracingGame';
import { DESARROLLO_FISICO_072_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { model: 'square' as const, label: 'Cuadrado', key: 'r1' },
];

export default function DESARROLLO_FISICO_072({ currentItem, onAnswer }: Props) {
  return <TracingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_072_CONFIG.id} title="Copia un cuadrado" instruction={DESARROLLO_FISICO_072_CONFIG.descripcion} rounds={ROUNDS} />;
}

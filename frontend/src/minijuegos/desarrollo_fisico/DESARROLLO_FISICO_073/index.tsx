import type { Answer, Item } from '@/minijuegos/types';
import { TracingGame } from '@/minijuegos/shared/TracingGame';
import { DESARROLLO_FISICO_073_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { model: 'rectangle' as const, label: 'Rectangulo', key: 'r1' },
];

export default function DESARROLLO_FISICO_073({ currentItem, onAnswer }: Props) {
  return <TracingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_073_CONFIG.id} title="Copia un rectangulo" instruction={DESARROLLO_FISICO_073_CONFIG.descripcion} rounds={ROUNDS} />;
}

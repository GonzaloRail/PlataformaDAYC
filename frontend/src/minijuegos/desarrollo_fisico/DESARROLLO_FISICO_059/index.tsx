import type { Answer, Item } from '@/minijuegos/types';
import { TracingGame } from '@/minijuegos/shared/TracingGame';
import { DESARROLLO_FISICO_059_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { model: 'circle' as const, label: 'Circulo', key: 'r1' },
  { model: 'vertical' as const, label: 'Linea vertical', key: 'r2' },
  { model: 'horizontal' as const, label: 'Linea horizontal', key: 'r3' },
];

export default function DESARROLLO_FISICO_059({ currentItem, onAnswer }: Props) {
  return <TracingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_059_CONFIG.id} title="Trazos" instruction={DESARROLLO_FISICO_059_CONFIG.descripcion} rounds={ROUNDS} />;
}

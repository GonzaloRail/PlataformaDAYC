import type { Answer, Item } from '@/minijuegos/types';
import { BodyPartsGame } from '@/minijuegos/shared/BodyPartsGame';
import { COMUNICACION_074_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  { instruction: 'Toca la mano derecha', side: 'derecha' as const, part: 'mano', correct: 'mano-der', key: 'r1' },
  { instruction: 'Levanta el pie izquierdo', side: 'izquierda' as const, part: 'pie', correct: 'pie-izq', key: 'r2' },
  { instruction: 'Senala la oreja derecha', side: 'derecha' as const, part: 'oreja', correct: 'oreja-der', key: 'r3' },
  { instruction: 'Toca el ojo izquierdo', side: 'izquierda' as const, part: 'ojo', correct: 'ojo-izq', key: 'r4' },
  { instruction: 'Toca la rodilla derecha', side: 'derecha' as const, part: 'rodilla', correct: 'rodilla-der', key: 'r5' },
  { instruction: 'Levanta la mano izquierda', side: 'izquierda' as const, part: 'mano', correct: 'mano-izq', key: 'r6' },
];

export default function COMUNICACION_074({ currentItem, onAnswer }: Props) {
  return <BodyPartsGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_074_CONFIG.id} title="Izquierda y derecha" instruction={COMUNICACION_074_CONFIG.descripcion} rounds={ROUNDS} />;
}

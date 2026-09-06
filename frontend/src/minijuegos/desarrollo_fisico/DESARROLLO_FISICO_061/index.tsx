import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { DESARROLLO_FISICO_061_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function DESARROLLO_FISICO_061({ currentItem, onAnswer }: Props) {
  return <DrawingGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_061_CONFIG.id} title="Dibuja lineas" instruction={DESARROLLO_FISICO_061_CONFIG.descripcion} consigna="Dibuja lineas en el canvas" mostrarModelo={false} />;
}

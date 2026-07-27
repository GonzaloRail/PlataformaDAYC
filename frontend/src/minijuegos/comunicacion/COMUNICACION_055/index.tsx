import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_055_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_055({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_055_CONFIG.id}
      title="Preguntas complejas"
      instruction={COMUNICACION_055_CONFIG.descripcion}
      prompt="El evaluador contara las preguntas del nino con 'cuando', 'por que' o 'cuantos'."
      captureAudio={false}
      panelType="counter"
      counterMax={20}
    />
  );
}

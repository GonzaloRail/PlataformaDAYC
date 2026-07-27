import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_046_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_046({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_046_CONFIG.id}
      title="Palabras espontaneas"
      instruction={COMUNICACION_046_CONFIG.descripcion}
      prompt="El evaluador llevara el conteo de palabras distintas usadas por el nino durante toda la evaluacion."
      captureAudio={false}
      panelType="counter"
      counterMax={50}
    />
  );
}

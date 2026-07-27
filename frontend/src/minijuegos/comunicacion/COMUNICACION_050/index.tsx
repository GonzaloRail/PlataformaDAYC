import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_050_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_050({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_050_CONFIG.id}
      title="Preguntas con que y donde"
      instruction={COMUNICACION_050_CONFIG.descripcion}
      prompt="El evaluador contara las preguntas que el nino haga con 'que' o 'donde'."
      captureAudio={false}
      panelType="counter"
      counterMax={20}
    />
  );
}

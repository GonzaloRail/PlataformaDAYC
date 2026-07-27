import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_057_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_057({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_057_CONFIG.id}
      title="Cambia la conversacion"
      instruction={COMUNICACION_057_CONFIG.descripcion}
      prompt="El evaluador observa si el nino cambia su forma de hablar segun con quien habla."
      captureAudio={false}
      panelType="free"
    />
  );
}

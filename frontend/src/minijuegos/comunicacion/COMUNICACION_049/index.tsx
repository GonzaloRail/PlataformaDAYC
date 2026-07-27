import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_049_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_049({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_049_CONFIG.id}
      title="Describe lo que haces"
      instruction={COMUNICACION_049_CONFIG.descripcion}
      prompt="Nino, cuentame que estas haciendo ahora?"
      captureAudio={true}
      panelType="free"
    />
  );
}

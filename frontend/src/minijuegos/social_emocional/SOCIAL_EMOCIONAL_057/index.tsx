import type { Answer, Item } from '@/minijuegos/types';
import { PhoneCallGame } from '@/minijuegos/shared/PhoneCallGame';
import { SOCIAL_EMOCIONAL_057_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_057({ currentItem, onAnswer }: Props) {
  return (
    <PhoneCallGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_057_CONFIG.id}
      title="Contesta el telefono"
      instruction={SOCIAL_EMOCIONAL_057_CONFIG.descripcion}
      message="Dile a mama que la cena es a las 7."
      callerEmoji="👵"
      callerName="Abuelita"
      captureAudio={true}
    />
  );
}

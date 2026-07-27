import type { Answer, Item } from '@/minijuegos/types';
import { StoryNarrationGame } from '@/minijuegos/shared/StoryNarrationGame';
import { COMUNICACION_066_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_066({ currentItem, onAnswer }: Props) {
  return (
    <StoryNarrationGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_066_CONFIG.id}
      title="Cuenta una historia"
      instruction={COMUNICACION_066_CONFIG.descripcion}
      prompt="Cuentame un cuento que conozcas, como el de los tres cerditos o caperucita roja."
      panels={[]}
      captureAudio={true}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_047_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_047({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_047_CONFIG.id}
      title="Oraciones de 3 palabras"
      instruction={COMUNICACION_047_CONFIG.descripcion}
      prompt="Anota ejemplos de oraciones de al menos 3 palabras que diga el nino."
      captureAudio={true}
      panelType="free"
    />
  );
}

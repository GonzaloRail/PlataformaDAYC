import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_058_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_058({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_058_CONFIG.id}
      title="Vocabulario extenso"
      instruction={COMUNICACION_058_CONFIG.descripcion}
      prompt="El evaluador estima el vocabulario expresivo del nino (300-1000 palabras)."
      captureAudio={false}
      panelType="counter"
      counterMax={100}
    />
  );
}

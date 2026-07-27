import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COGNITIVO_036_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_036({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_036_CONFIG.id}
      title="Cuenta hasta 5"
      instruction={currentItem.instruccion || 'El nino cuenta de memoria del 1 al 5.'}
      prompt="Cuenta del 1 al 5 en voz alta"
      captureAudio
      panelType="counter"
      counterMax={5}
    />
  );
}

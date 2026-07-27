import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COGNITIVO_076_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_076({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_076_CONFIG.id}
      title="Cuenta del 1 al 100"
      instruction={currentItem.instruccion || 'El nino cuenta del 1 al 100 de memoria. El psicologo usa el contador para registrar hasta donde llega.'}
      prompt="Cuenta del 1 al 100 en voz alta"
      captureAudio
      panelType="counter"
      counterMax={100}
    />
  );
}

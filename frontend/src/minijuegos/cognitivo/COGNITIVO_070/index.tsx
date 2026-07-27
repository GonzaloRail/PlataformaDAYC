import type { Answer, Item } from '@/minijuegos/types';
import { WeekDaysGame } from '@/minijuegos/shared/WeekDaysGame';
import { COGNITIVO_070_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_070({ currentItem, onAnswer }: Props) {
  return (
    <WeekDaysGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_070_CONFIG.id}
      title="Dias de la semana"
      instruction={currentItem.instruccion || 'Nombra los dias de la semana en orden.'}
      prompt="Dime los dias de la semana en orden"
      mode="verbal"
      captureAudio
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { PersonalInfoGame } from '@/minijuegos/shared/PersonalInfoGame';
import { COGNITIVO_067_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_067({ currentItem, onAnswer }: Props) {
  return (
    <PersonalInfoGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_067_CONFIG.id}
      title="Cuando es tu cumpleanos"
      instruction={currentItem.instruccion || 'El nino dice el mes y dia de su nacimiento.'}
      variant="cumpleanos"
      captureAudio
    />
  );
}

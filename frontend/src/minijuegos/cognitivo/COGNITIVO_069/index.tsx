import type { Answer, Item } from '@/minijuegos/types';
import { PersonalInfoGame } from '@/minijuegos/shared/PersonalInfoGame';
import { COGNITIVO_069_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_069({ currentItem, onAnswer }: Props) {
  return (
    <PersonalInfoGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_069_CONFIG.id}
      title="Como se llama tu calle"
      instruction={currentItem.instruccion || 'El nino dice el nombre de su calle y ciudad.'}
      variant="calle_ciudad"
      captureAudio
    />
  );
}

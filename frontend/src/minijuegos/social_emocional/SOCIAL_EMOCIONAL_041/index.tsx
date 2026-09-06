import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { SOCIAL_EMOCIONAL_041_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_041({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_041_CONFIG.id}
      title="Canta y baila"
      instruction={SOCIAL_EMOCIONAL_041_CONFIG.descripcion}
      prompt="Cantame tu cancion favorita o dime una rima que sepas."
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '🎤', label: 'Tu cancion favorita', description: 'Canta o di una rima en voz alta.' }}
    />
  );
}

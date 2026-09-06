import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { SOCIAL_EMOCIONAL_032_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_032({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_032_CONFIG.id}
      title="Saludemos"
      instruction={SOCIAL_EMOCIONAL_032_CONFIG.descripcion}
      prompt="Cuando ves a alguien que conoces, como saludas?"
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '👋', label: 'Saludemos', description: 'Como saludas a alguien conocido?' }}
    />
  );
}

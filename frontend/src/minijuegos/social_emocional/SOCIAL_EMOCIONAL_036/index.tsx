import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { SOCIAL_EMOCIONAL_036_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_036({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_036_CONFIG.id}
      title="Pido ayuda"
      instruction={SOCIAL_EMOCIONAL_036_CONFIG.descripcion}
      prompt="El evaluador observa si el nino pide ayuda cuando enfrenta una dificultad."
      captureAudio={false}
      panelType="free"
      stimulus={{ emoji: '🆘', label: 'Pedir ayuda', description: 'Como pides ayuda cuando algo te cuesta?' }}
    />
  );
}

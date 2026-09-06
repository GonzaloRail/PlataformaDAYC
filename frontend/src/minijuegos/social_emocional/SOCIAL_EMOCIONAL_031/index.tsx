import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { SOCIAL_EMOCIONAL_031_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_031({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_031_CONFIG.id}
      title="Canta conmigo"
      instruction={SOCIAL_EMOCIONAL_031_CONFIG.descripcion}
      prompt="Cantame una cancion que te sepas. Podemos cantar juntos."
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '🎵', label: 'Cantemos juntos', description: 'Canta tu cancion favorita en voz alta.' }}
    />
  );
}

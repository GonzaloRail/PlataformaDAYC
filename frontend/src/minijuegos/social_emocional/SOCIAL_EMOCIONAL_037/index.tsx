import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { SOCIAL_EMOCIONAL_037_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function SOCIAL_EMOCIONAL_037({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_037_CONFIG.id}
      title="Estoy orgulloso"
      instruction={SOCIAL_EMOCIONAL_037_CONFIG.descripcion}
      prompt="Cuentame algo que hayas hecho y te haga sentir orgulloso."
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '🌟', label: 'Mis logros', description: 'Que has logrado que te haga sentir orgulloso?' }}
    />
  );
}

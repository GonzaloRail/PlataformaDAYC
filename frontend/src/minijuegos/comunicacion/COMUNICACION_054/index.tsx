import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_054_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_054({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_054_CONFIG.id}
      title="Tu nombre completo"
      instruction={COMUNICACION_054_CONFIG.descripcion}
      prompt="Como te llamas? Dime tu nombre completo."
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '👤', label: 'Tu nombre', description: 'Dime tu nombre y apellido.' }}
    />
  );
}

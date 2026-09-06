import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_073_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_073({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_073_CONFIG.id}
      title="Cuenta un chiste"
      instruction={COMUNICACION_073_CONFIG.descripcion}
      prompt="Conoces algun chiste? Cuentamelo!"
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '😄', label: 'Cuentame un chiste', description: 'Tienes algun chiste divertido?' }}
    />
  );
}

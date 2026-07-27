import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_062_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_062({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_062_CONFIG.id}
      title="Define 2 palabras"
      instruction={COMUNICACION_062_CONFIG.descripcion}
      prompt="Que es un perro? Que es una pelota?"
      captureAudio={true}
      panelType="free"
      stimulus={{ emoji: '💬', label: 'Define estas palabras', description: 'Que es un perro? Que es una pelota?' }}
    />
  );
}

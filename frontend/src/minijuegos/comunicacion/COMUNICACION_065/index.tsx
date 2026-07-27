import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_065_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_065({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_065_CONFIG.id}
      title="Define 5 palabras"
      instruction={COMUNICACION_065_CONFIG.descripcion}
      prompt="El evaluador preguntara 5 palabras y contara cuantas define correctamente."
      captureAudio={true}
      panelType="counter"
      counterMax={5}
      stimulus={{ emoji: '📝', label: '5 palabras', description: 'Perro, pelota, casa, arbol, zapato.' }}
    />
  );
}

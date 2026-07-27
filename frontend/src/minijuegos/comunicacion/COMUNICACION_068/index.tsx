import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COMUNICACION_068_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

export default function COMUNICACION_068({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_068_CONFIG.id}
      title="Define 10 palabras"
      instruction={COMUNICACION_068_CONFIG.descripcion}
      prompt="El evaluador preguntara 10 palabras y contara cuantas define correctamente."
      captureAudio={true}
      panelType="counter"
      counterMax={10}
      stimulus={{ emoji: '📋', label: '10 palabras', description: 'Perro, pelota, casa, arbol, zapato, silla, sol, luna, agua, nino.' }}
    />
  );
}

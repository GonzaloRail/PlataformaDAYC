import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COGNITIVO_071_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export default function COGNITIVO_071({ currentItem, onAnswer }: Props) {
  const idx = Math.floor(Math.random() * DIAS.length);
  const dia = DIAS[idx];
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_071_CONFIG.id}
      title="Dia antes y despues"
      instruction={currentItem.instruccion || 'El nino dice que dia viene antes y despues del mostrado.'}
      prompt={`Dia central: ${dia}. Que dia viene antes? Y despues?`}
      captureAudio
      panelType="free"
      stimulus={{ label: 'Dia de la semana', description: `Mostrar al nino: ${dia}` }}
    />
  );
}

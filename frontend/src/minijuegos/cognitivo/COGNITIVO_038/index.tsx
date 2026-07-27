import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COGNITIVO_038_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const OBJETOS = [
  { emoji: '🪨', label: 'Una piedra grande', respuesta: 'pesado' },
  { emoji: '🪶', label: 'Una pluma', respuesta: 'liviano' },
  { emoji: '📚', label: 'Una pila de libros', respuesta: 'pesado' },
  { emoji: '🍃', label: 'Una hoja', respuesta: 'liviano' },
];

export default function COGNITIVO_038({ currentItem, onAnswer }: Props) {
  const obj = OBJETOS[Math.floor(Math.random() * OBJETOS.length)];
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_038_CONFIG.id}
      title="Pesado o liviano"
      instruction={currentItem.instruccion || 'El nino dice si el objeto es pesado o liviano.'}
      prompt={`${obj.emoji} ${obj.label}. Es pesado o liviano?`}
      captureAudio
      panelType="yesno"
      stimulus={{ emoji: obj.emoji, label: obj.label, description: `Respuesta esperada: ${obj.respuesta}` }}
    />
  );
}

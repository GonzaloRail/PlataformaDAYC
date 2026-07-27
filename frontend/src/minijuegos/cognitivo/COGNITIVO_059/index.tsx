import type { Answer, Item } from '@/minijuegos/types';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { COGNITIVO_059_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function COGNITIVO_059({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_059_CONFIG.id}
      title="Letras del abecedario"
      instruction={currentItem.instruccion || 'El nino nombra las letras que aparecen.'}
      prompt={`Letra: ${LETRAS[Math.floor(Math.random() * LETRAS.length)]}`}
      captureAudio
      panelType="counter"
      counterMax={26}
      stimulus={{ label: 'Letra mostrada', description: 'El psicologo muestra la letra y el nino la nombra.' }}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { ReadingDirectionGame } from '@/minijuegos/shared/ReadingDirectionGame';
import { COGNITIVO_048_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_048({ currentItem, onAnswer }: Props) {
  return (
    <ReadingDirectionGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_048_CONFIG.id}
      title="Direccion de lectura"
      instruction={currentItem.instruccion || 'Toca donde se empieza a leer y la direccion de la secuencia.'}
      prompt="Donde se empieza a leer?"
      rows={3}
      cols={4}
    />
  );
}

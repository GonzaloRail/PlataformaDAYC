import type { Answer, Item } from '@/minijuegos/types';
import { OrdinalPositionGame } from '@/minijuegos/shared/OrdinalPositionGame';
import { COGNITIVO_051_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_051({ currentItem, onAnswer }: Props) {
  return (
    <OrdinalPositionGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_051_CONFIG.id}
      title="Posiciones ordinales"
      instruction={currentItem.instruccion || 'Toca el elemento que esta en la posicion pedida.'}
      rounds={[
        {
          id: 'r1',
          key: 'r1',
          question: 'primero',
          items: [
            { id: 'a', label: 'Vagon 1', emoji: '🚃' },
            { id: 'b', label: 'Vagon 2', emoji: '🚃' },
            { id: 'c', label: 'Vagon 3', emoji: '🚃' },
          ],
          correctItemId: 'a',
        },
        {
          id: 'r2',
          key: 'r2',
          question: 'ultimo',
          items: [
            { id: 'a', label: 'Perro', emoji: '🐶' },
            { id: 'b', label: 'Gato', emoji: '🐱' },
            { id: 'c', label: 'Conejo', emoji: '🐰' },
          ],
          correctItemId: 'c',
        },
        {
          id: 'r3',
          key: 'r3',
          question: 'medio',
          items: [
            { id: 'a', label: 'Manzana', emoji: '🍎' },
            { id: 'b', label: 'Pera', emoji: '🍐' },
            { id: 'c', label: 'Naranja', emoji: '🍊' },
          ],
          correctItemId: 'b',
        },
      ]}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { COGNITIVO_034_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_034({ currentItem, onAnswer }: Props) {
  return (
    <MatchingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_034_CONFIG.id}
      title="Empareja por color, forma y medida"
      instruction={currentItem.instruccion || 'Arrastra cada objeto a la caja que coincida con su color, forma o medida.'}
      items={[
        { id: 'manzana', label: 'Manzana', emoji: '🍎', zoneId: 'rojo' },
        { id: 'corazon', label: 'Corazon', emoji: '❤️', zoneId: 'rojo' },
        { id: 'pez', label: 'Pez', emoji: '🐟', zoneId: 'azul' },
        { id: 'gota', label: 'Gota', emoji: '💧', zoneId: 'azul' },
        { id: 'elefante', label: 'Elefante', emoji: '🐘', zoneId: 'grande' },
        { id: 'raton', label: 'Raton', emoji: '🐭', zoneId: 'pequeno' },
      ]}
      zones={[
        { id: 'rojo', label: 'Rojo', emoji: '🟥', hint: 'Cosas de color rojo.' },
        { id: 'azul', label: 'Azul', emoji: '🟦', hint: 'Cosas de color azul.' },
        { id: 'grande', label: 'Grande', emoji: '🐘', hint: 'Cosas grandes.' },
        { id: 'pequeno', label: 'Pequeno', emoji: '🐭', hint: 'Cosas pequenas.' },
      ]}
    />
  );
}

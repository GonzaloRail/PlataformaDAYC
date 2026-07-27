import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { COGNITIVO_037_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_037({ currentItem, onAnswer }: Props) {
  return (
    <MatchingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_037_CONFIG.id}
      title="Empareja por funcion"
      instruction={currentItem.instruccion || 'Arrastra cada objeto a la caja de objetos con la misma funcion.'}
      items={[
        { id: 'manzana', label: 'Manzana', emoji: '🍎', zoneId: 'comer' },
        { id: 'pan', label: 'Pan', emoji: '🍞', zoneId: 'comer' },
        { id: 'camisa', label: 'Camisa', emoji: '👕', zoneId: 'vestir' },
        { id: 'zapato', label: 'Zapato', emoji: '👟', zoneId: 'vestir' },
        { id: 'pelota', label: 'Pelota', emoji: '⚽', zoneId: 'jugar' },
        { id: 'muneca', label: 'Muneca', emoji: '🪆', zoneId: 'jugar' },
      ]}
      zones={[
        { id: 'comer', label: 'Para comer', emoji: '🍽️', hint: 'Cosas que comemos.' },
        { id: 'vestir', label: 'Para vestir', emoji: '👔', hint: 'Ropa y accesorios.' },
        { id: 'jugar', label: 'Para jugar', emoji: '🎲', hint: 'Juguetes.' },
      ]}
    />
  );
}

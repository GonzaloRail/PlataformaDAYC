import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { COGNITIVO_042_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_042({ currentItem, onAnswer }: Props) {
  return (
    <ClassificationGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_042_CONFIG.id}
      title="Clasifica por color"
      instruction={currentItem.instruccion || 'Pon cada objeto en su caja del color correcto.'}
      modo="un_criterio"
      items={[
        { id: 'manzana', label: 'Manzana', emoji: '🍎', zoneId: 'rojo' },
        { id: 'corazon', label: 'Corazon', emoji: '❤️', zoneId: 'rojo' },
        { id: 'tomate', label: 'Tomate', emoji: '🍅', zoneId: 'rojo' },
        { id: 'arandano', label: 'Arandano', emoji: '🫐', zoneId: 'azul' },
        { id: 'pez', label: 'Pez', emoji: '🐟', zoneId: 'azul' },
        { id: 'gota', label: 'Gota', emoji: '💧', zoneId: 'azul' },
        { id: 'hoja', label: 'Hoja', emoji: '🌿', zoneId: 'verde' },
        { id: 'rana', label: 'Rana', emoji: '🐸', zoneId: 'verde' },
        { id: 'brocoli', label: 'Brocoli', emoji: '🥦', zoneId: 'verde' },
      ]}
      zones={[
        { id: 'rojo', label: 'Rojo', emoji: '🟥', hint: 'Cosas de color rojo.' },
        { id: 'azul', label: 'Azul', emoji: '🟦', hint: 'Cosas de color azul.' },
        { id: 'verde', label: 'Verde', emoji: '🟩', hint: 'Cosas de color verde.' },
      ]}
    />
  );
}

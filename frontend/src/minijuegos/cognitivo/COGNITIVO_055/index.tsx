import type { Answer, Item } from '@/minijuegos/types';
import { AbstractAttributeGame, type AbstractItem, type AbstractCriterion } from '@/minijuegos/shared/AbstractAttributeGame';
import { COGNITIVO_055_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const ITEMS: AbstractItem[] = [
  { id: 'perro', label: 'Perro', emoji: '🐶', attribute: 'vivo' },
  { id: 'gato', label: 'Gato', emoji: '🐱', attribute: 'vivo' },
  { id: 'pez', label: 'Pez', emoji: '🐟', attribute: 'vivo' },
  { id: 'piedra', label: 'Piedra', emoji: '🪨', attribute: 'no_vivo' },
  { id: 'silla', label: 'Silla', emoji: '🪑', attribute: 'no_vivo' },
  { id: 'reloj', label: 'Reloj', emoji: '⏰', attribute: 'no_vivo' },
];

const CRITERIA: AbstractCriterion[] = [
  { id: 'vivo', label: 'Vivo', emoji: '🌱', hint: 'Cosas que sienten y se mueven.' },
  { id: 'no_vivo', label: 'No vivo', emoji: '🪨', hint: 'Cosas que no sienten.' },
];

export default function COGNITIVO_055({ currentItem, onAnswer }: Props) {
  return (
    <AbstractAttributeGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_055_CONFIG.id}
      title="Vivo o no vivo"
      instruction={currentItem.instruccion || 'Arrastra cada objeto a su caja segun si esta vivo o no.'}
      items={ITEMS}
      criteria={CRITERIA}
      matchKey={(item, criterion) => item.attribute === criterion.id}
    />
  );
}

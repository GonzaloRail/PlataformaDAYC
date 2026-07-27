import type { Answer, Item } from '@/minijuegos/types';
import { FractionGame, type FractionShape } from '@/minijuegos/shared/FractionGame';
import { COGNITIVO_058_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const SHAPES: FractionShape[] = [
  { id: 'manzana_completa', label: 'Manzana completa', emoji: '🍎', state: 'completo' },
  { id: 'manzana_medio', label: 'Media manzana', emoji: '🍏', state: 'medio' },
  { id: 'circulo_completo', label: 'Circulo completo', emoji: '⚫', state: 'completo' },
  { id: 'circulo_medio', label: 'Medio circulo', emoji: '◐', state: 'medio' },
  { id: 'queso_completo', label: 'Queso completo', emoji: '🧀', state: 'completo' },
  { id: 'queso_medio', label: 'Medio queso', emoji: '🥪', state: 'medio' },
];

export default function COGNITIVO_058({ currentItem, onAnswer }: Props) {
  return (
    <FractionGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_058_CONFIG.id}
      title="Mitad o completo"
      instruction={currentItem.instruccion || 'Toca los que estan a la mitad o completos segun la consigna.'}
      question="ambos"
      shapes={SHAPES}
    />
  );
}

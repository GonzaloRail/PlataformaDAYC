import type { Answer, Item } from '@/minijuegos/types';
import { CoinsGame, type Coin } from '@/minijuegos/shared/CoinsGame';
import { COGNITIVO_072_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const COINS: Coin[] = [
  { id: 'c1', value: 1, label: 'Moneda de 1 peso', image: '🪙', description: 'Moneda pequena color plateado' },
  { id: 'c2', value: 5, label: 'Moneda de 5 pesos', image: '🪙', description: 'Moneda mediana color dorado' },
  { id: 'c3', value: 10, label: 'Moneda de 10 pesos', image: '🪙', description: 'Moneda grande color plateado' },
];

export default function COGNITIVO_072({ currentItem, onAnswer }: Props) {
  return (
    <CoinsGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_072_CONFIG.id}
      title="Nombra las monedas"
      instruction={currentItem.instruccion || 'Mira la moneda y di su nombre en voz alta.'}
      prompt="Como se llama esta moneda?"
      coins={COINS}
    />
  );
}

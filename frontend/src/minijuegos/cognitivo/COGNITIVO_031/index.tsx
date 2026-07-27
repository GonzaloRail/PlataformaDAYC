import type { Answer, Item } from '@/minijuegos/types';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { COGNITIVO_031_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_031({ currentItem, onAnswer }: Props) {
  return (
    <MatchingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_031_CONFIG.id}
      title="Empareja formas"
      instruction={currentItem.instruccion || 'Arrastra cada figura a la caja de su forma.'}
      items={[
        { id: 'c1', label: 'Circulo', emoji: '⚪', zoneId: 'circulos' },
        { id: 'c2', label: 'Circulo', emoji: '🔴', zoneId: 'circulos' },
        { id: 'c3', label: 'Circulo', emoji: '🍩', zoneId: 'circulos' },
        { id: 'k1', label: 'Cuadrado', emoji: '⬛', zoneId: 'cuadrados' },
        { id: 'k2', label: 'Cuadrado', emoji: '🟦', zoneId: 'cuadrados' },
        { id: 'k3', label: 'Cuadrado', emoji: '📘', zoneId: 'cuadrados' },
        { id: 't1', label: 'Triangulo', emoji: '🔺', zoneId: 'triangulos' },
        { id: 't2', label: 'Triangulo', emoji: '🔻', zoneId: 'triangulos' },
        { id: 't3', label: 'Triangulo', emoji: '🥕', zoneId: 'triangulos' },
      ]}
      zones={[
        { id: 'circulos', label: 'Circulos', emoji: '⚪', hint: 'Figuras redondas.' },
        { id: 'cuadrados', label: 'Cuadrados', emoji: '⬛', hint: 'Figuras con cuatro lados iguales.' },
        { id: 'triangulos', label: 'Triangulos', emoji: '🔺', hint: 'Figuras con tres lados.' },
      ]}
    />
  );
}

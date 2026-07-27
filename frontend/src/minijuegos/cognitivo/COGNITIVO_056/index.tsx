import type { Answer, Item } from '@/minijuegos/types';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { COGNITIVO_056_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const MODELO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <text x="10" y="60" font-family="Comic Sans MS, cursive" font-size="48" fill="#1f2937" font-weight="700">Tu nombre</text>
  <line x1="0" y1="75" x2="200" y2="75" stroke="#9ca3af" stroke-width="1"/>
</svg>
`;

export default function COGNITIVO_056({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_056_CONFIG.id}
      title="Copia tu nombre"
      instruction={currentItem.instruccion || 'Copia tu nombre en el area de escritura.'}
      consigna="Copia el modelo en el canvas"
      mostrarModelo
      modeloSVG={MODELO_SVG}
      modeloLabel="Tu nombre"
      background="lines"
    />
  );
}

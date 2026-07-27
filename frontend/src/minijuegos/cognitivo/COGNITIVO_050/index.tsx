import type { Answer, Item } from '@/minijuegos/types';
import { BlocksAssistant } from '@/minijuegos/shared/BlocksAssistant';
import { COGNITIVO_050_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const MODELO_PIRAMIDE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="320" height="240">
  <g fill="#f59e0b" stroke="#78350f" stroke-width="2">
    <rect x="130" y="40" width="60" height="60" />
    <rect x="80" y="100" width="60" height="60" />
    <rect x="180" y="100" width="60" height="60" />
    <rect x="40" y="160" width="60" height="60" />
    <rect x="130" y="160" width="60" height="60" />
    <rect x="220" y="160" width="60" height="60" />
  </g>
  <text x="160" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#78350f">Piramide de 6 cubos (3-2-1)</text>
</svg>
`;

export default function COGNITIVO_050({ currentItem, onAnswer }: Props) {
  return (
    <BlocksAssistant
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_050_CONFIG.id}
      title="Piramide de 6 cubos"
      instruction={currentItem.instruccion || 'El nino debe construir una piramide de 6 cubos segun el modelo (3 base, 2 medio, 1 arriba).'}
      modeloSVG={MODELO_PIRAMIDE}
      consignaPsicologo="Muestra el modelo y da 6 cubos al nino. Observa si logra construir la piramide. Registra el resultado."
    />
  );
}

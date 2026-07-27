import type { Answer, Item } from '@/minijuegos/types';
import { BlocksAssistant } from '@/minijuegos/shared/BlocksAssistant';
import { COGNITIVO_040_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const MODELO_PUENTE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200">
  <g fill="#10b981" stroke="#064e3b" stroke-width="2">
    <rect x="40" y="100" width="60" height="60" />
    <rect x="130" y="60" width="60" height="100" />
    <rect x="220" y="100" width="60" height="60" />
  </g>
  <text x="160" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#064e3b">Puente: 2 cubos base + 1 cubo arriba</text>
</svg>
`;

export default function COGNITIVO_040({ currentItem, onAnswer }: Props) {
  return (
    <BlocksAssistant
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_040_CONFIG.id}
      title="Puente con 3 cubos"
      instruction={currentItem.instruccion || 'El nino debe construir un puente con 3 cubos: 2 como base y 1 encima cruzando.'}
      modeloSVG={MODELO_PUENTE}
      consignaPsicologo="Muestra el modelo y da 3 cubos al nino. Observa si logra construir el puente. Registra el resultado."
    />
  );
}

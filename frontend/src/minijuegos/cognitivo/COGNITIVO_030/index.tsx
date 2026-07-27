import type { Answer, Item } from '@/minijuegos/types';
import { BlocksAssistant } from '@/minijuegos/shared/BlocksAssistant';
import { COGNITIVO_030_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const MODELO_TORRE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 320" width="200" height="320">
  <g fill="#3b82f6" stroke="#1e3a8a" stroke-width="2">
    <rect x="60" y="40" width="80" height="40" />
    <rect x="60" y="80" width="80" height="40" />
    <rect x="60" y="120" width="80" height="40" />
    <rect x="60" y="160" width="80" height="40" />
    <rect x="60" y="200" width="80" height="40" />
    <rect x="60" y="240" width="80" height="40" />
    <rect x="60" y="280" width="80" height="40" />
  </g>
  <text x="100" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e3a8a">Torre de 7 cubos</text>
</svg>
`;

export default function COGNITIVO_030({ currentItem, onAnswer }: Props) {
  return (
    <BlocksAssistant
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_030_CONFIG.id}
      title="Apila 6 a 7 cubos"
      instruction={currentItem.instruccion || 'El nino debe apilar 6 a 7 cubos uno encima de otro sin que se caigan.'}
      modeloSVG={MODELO_TORRE}
      consignaPsicologo="Da al nino 7 cubos y observa si logra apilar 6 o mas. Registra el resultado con los botones."
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { ColoringGame } from '@/minijuegos/shared/ColoringGame';
import { DESARROLLO_FISICO_077_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const SHAPES = [
  {
    label: 'Flor',
    id: 'flor',
    viewBox: '0 0 200 200',
    zones: [
      { id: 'petalos', label: 'Petalos' },
      { id: 'centro', label: 'Centro' },
      { id: 'tallo', label: 'Tallo' },
    ],
    paths: [
      { d: 'M100,40 Q130,40 140,60 Q150,80 130,90 Q110,100 100,80 Q90,100 70,90 Q50,80 60,60 Q70,40 100,40 Z', fill: undefined, zoneId: 'petalos' },
      { d: 'M100,80 A15,15 0 1,1 100,80.01 Z', fill: undefined, zoneId: 'centro' },
      { d: 'M100,95 L100,170', fill: 'none', zoneId: 'tallo' },
    ],
  },
  {
    label: 'Estrella',
    id: 'estrella',
    viewBox: '0 0 200 200',
    zones: [
      { id: 'estrella', label: 'Estrella' },
    ],
    paths: [
      { d: 'M100,30 L120,75 L170,75 L132,107 L145,155 L100,130 L55,155 L68,107 L30,75 L80,75 Z', fill: undefined, zoneId: 'estrella' },
    ],
  },
];

const COLORS = [
  { id: 'red', hex: '#ef4444', label: 'Rojo' },
  { id: 'blue', hex: '#3b82f6', label: 'Azul' },
  { id: 'green', hex: '#22c55e', label: 'Verde' },
  { id: 'yellow', hex: '#eab308', label: 'Amarillo' },
  { id: 'purple', hex: '#a855f7', label: 'Morado' },
  { id: 'orange', hex: '#f97316', label: 'Naranja' },
];

export default function DESARROLLO_FISICO_077({ currentItem, onAnswer }: Props) {
  return <ColoringGame currentItem={currentItem} onAnswer={onAnswer} activityId={DESARROLLO_FISICO_077_CONFIG.id} title="Colorea dentro de las lineas" instruction={DESARROLLO_FISICO_077_CONFIG.descripcion} shapes={SHAPES} colors={COLORS} />;
}

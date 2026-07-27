import type { Answer, Item } from '@/minijuegos/types';
import { InstructionFollowingGame } from '@/minijuegos/shared/InstructionFollowingGame';
import { COMUNICACION_059_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const SEQUENCES = [
  {
    key: 's1',
    steps: [
      { instruction: 'Toca la estrella', target: 'estrella', color: '#f59e0b', emoji: '⭐', key: 's1-1' },
      { instruction: 'Arrastra el circulo al cuadrado', target: 'circulo', color: '#3b82f6', emoji: '⭕', key: 's1-2' },
      { instruction: 'Presiona el boton verde', target: 'boton-verde', color: '#22c55e', emoji: '🟢', key: 's1-3' },
    ],
  },
  {
    key: 's2',
    steps: [
      { instruction: 'Toca el triangulo', target: 'triangulo', color: '#ef4444', emoji: '🔺', key: 's2-1' },
      { instruction: 'Arrastra el corazon a la caja', target: 'corazon', color: '#ec4899', emoji: '❤️', key: 's2-2' },
      { instruction: 'Presiona el boton azul', target: 'boton-azul', color: '#3b82f6', emoji: '🔵', key: 's2-3' },
    ],
  },
];

export default function COMUNICACION_059({ currentItem, onAnswer }: Props) {
  return <InstructionFollowingGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_059_CONFIG.id} title="Sigue las instrucciones" instruction={COMUNICACION_059_CONFIG.descripcion} sequences={SEQUENCES} />;
}

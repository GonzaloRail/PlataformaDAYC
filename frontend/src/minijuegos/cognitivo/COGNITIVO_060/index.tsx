import type { Answer, Item } from '@/minijuegos/types';
import { SequenceStoryGame, type StoryScene } from '@/minijuegos/shared/SequenceStoryGame';
import { COGNITIVO_060_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const SCENES: StoryScene[] = [
  { id: 's1', order: 1, emoji: '🌱', caption: 'Semilla plantada' },
  { id: 's2', order: 2, emoji: '🌿', caption: 'Brote pequeno' },
  { id: 's3', order: 3, emoji: '🌳', caption: 'Arbol grande' },
];

export default function COGNITIVO_060({ currentItem, onAnswer }: Props) {
  return (
    <SequenceStoryGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_060_CONFIG.id}
      title="Cuenta una historia"
      instruction={currentItem.instruccion || 'Ordena las 3 figuras para formar una historia logica.'}
      scenes={SCENES}
    />
  );
}

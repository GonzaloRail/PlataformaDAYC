import type { Answer, Item } from '@/minijuegos/types';
import { StoryNarrationGame, type StoryPanel } from '@/minijuegos/shared/StoryNarrationGame';
import { COGNITIVO_052_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const PANELS: StoryPanel[] = [
  { id: 'p1', emoji: '🐰', caption: 'Un conejo sale de su madriguera' },
  { id: 'p2', emoji: '🥕', caption: 'Encuentra una zanahoria' },
  { id: 'p3', emoji: '🦊', caption: 'Aparece un zorro' },
  { id: 'p4', emoji: '🏠', caption: 'El conejo vuelve a su casa' },
];

export default function COGNITIVO_052({ currentItem, onAnswer }: Props) {
  return (
    <StoryNarrationGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_052_CONFIG.id}
      title="Narra la historia"
      instruction={currentItem.instruccion || 'Mira las imagenes y cuenta lo que pasa con tu voz.'}
      prompt="Cuenta lo que pasa en las imagenes."
      captureAudio
      panels={PANELS}
    />
  );
}

import type { Answer, Item } from '@/minijuegos/types';
import { StoryNarrationGame, type StoryPanel } from '@/minijuegos/shared/StoryNarrationGame';
import { COGNITIVO_057_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const PANELS: StoryPanel[] = [
  { id: 'p1', emoji: '☁️', caption: 'Cielo con nubes oscuras' },
  { id: 'p2', emoji: '👦', caption: 'Un nino mira por la ventana' },
  { id: 'p3', emoji: '⚡', caption: 'Relampago en el cielo' },
];

export default function COGNITIVO_057({ currentItem, onAnswer }: Props) {
  return (
    <StoryNarrationGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_057_CONFIG.id}
      title="Predice que pasara"
      instruction={currentItem.instruccion || 'Observa la escena y cuenta que crees que ocurrira despues.'}
      prompt="Que crees que va a pasar?"
      captureAudio
      panels={PANELS}
    />
  );
}

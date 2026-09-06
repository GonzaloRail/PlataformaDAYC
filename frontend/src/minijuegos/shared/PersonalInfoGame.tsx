import type { Answer, Item } from '@/minijuegos/types';
import VerbalResponseGame from './VerbalResponseGame';

interface PersonalInfoGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  variant: 'cumpleanos' | 'calle_ciudad' | 'general';
  captureAudio: boolean;
  stimulus?: { emoji?: string; label?: string; description?: string };
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const prompts: Record<PersonalInfoGameProps['variant'], string> = {
  cumpleanos: 'Cuando es tu cumpleanos?',
  calle_ciudad: 'Como se llama tu calle? En que ciudad vives?',
  general: 'Cuentame sobre ti.',
};

export function PersonalInfoGame(props: PersonalInfoGameProps) {
  const { variant, ...rest } = props;
  return (
    <VerbalResponseGame
      {...rest}
      prompt={prompts[variant]}
      panelType="free"
      captureAudio={props.captureAudio}
    />
  );
}

export default PersonalInfoGame;

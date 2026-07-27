import { useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { COGNITIVO_041_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

interface Round {
  id: string;
  left: { emoji: string; label: string };
  right: { emoji: string; label: string };
  same: boolean;
  key: string;
}

const ROUNDS: Round[] = [
  { id: 'r1', key: 'r1', left: { emoji: '🍎', label: 'Manzana' }, right: { emoji: '🍎', label: 'Manzana' }, same: true },
  { id: 'r2', key: 'r2', left: { emoji: '🐶', label: 'Perro' }, right: { emoji: '🐱', label: 'Gato' }, same: false },
  { id: 'r3', key: 'r3', left: { emoji: '⭐', label: 'Estrella' }, right: { emoji: '⭐', label: 'Estrella' }, same: true },
  { id: 'r4', key: 'r4', left: { emoji: '🌸', label: 'Flor' }, right: { emoji: '🌺', label: 'Flor' }, same: false },
  { id: 'r5', key: 'r5', left: { emoji: '⚽', label: 'Pelota' }, right: { emoji: '⚽', label: 'Pelota' }, same: true },
];

export default function COGNITIVO_041({ currentItem, onAnswer }: Props) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Observa las dos figuras y senala si son iguales o diferentes.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId: COGNITIVO_041_CONFIG.id,
    isComplete,
    contextData: { step, total: ROUNDS.length, picks },
  });

  const round = ROUNDS[step];

  const pick = (answer: 'igual' | 'diferente') => {
    if (!round) return;
    const correct = (answer === 'igual') === round.same;
    const next = [...picks, answer];
    setPicks(next);
    setMessage(correct ? 'Muy bien.' : 'Asignado, el evaluador revisara.');
    evidence.recordEvent(`${COGNITIVO_041_CONFIG.id}_PICKED`, {
      step,
      picked: answer,
      same: round.same,
      correct,
    });
    if (step + 1 < ROUNDS.length) {
      setStep(step + 1);
    } else {
      const correctCount = next.filter((v, i) => (v === 'igual') === ROUNDS[i].same).length;
      evidence.recordEvent(`${COGNITIVO_041_CONFIG.id}_FINISHED`, { correctCount, total: ROUNDS.length, picks: next });
      evidence.recordLog({
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correctCount,
        totalRounds: ROUNDS.length,
        picks: next,
      });
      setIsComplete(true);
      answerOnce(correctCount === ROUNDS.length ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: COGNITIVO_041_CONFIG.id,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correctCount,
          totalRounds: ROUNDS.length,
          picks: next,
        }),
      });
    }
  };

  const playArea = round ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Ronda {step + 1} / {ROUNDS.length}</strong>
      </div>
      <div className="sd-compare">
        <div className="sd-card">
          <span className="sd-emoji" aria-hidden="true">{round.left.emoji}</span>
          <span className="sd-label">{round.left.label}</span>
        </div>
        <div className="sd-vs">vs</div>
        <div className="sd-card">
          <span className="sd-emoji" aria-hidden="true">{round.right.emoji}</span>
          <span className="sd-label">{round.right.label}</span>
        </div>
      </div>
      <div className="sd-options">
        <button type="button" className="sd-option" onClick={() => pick('igual')}>Iguales</button>
        <button type="button" className="sd-option" onClick={() => pick('diferente')}>Diferentes</button>
      </div>
    </div>
  ) : null;

  return (
    <KidGameShell
      variant="embedded"
      title="Igual o diferente"
      subtitle={currentItem.instruccion || 'Observa las dos figuras y senala si son iguales o diferentes.'}
      progressLabel={buildProgressLabel(1, 1)}
      playArea={playArea}
      footer="El evaluador revisara las respuestas al finalizar."
    />
  );
}

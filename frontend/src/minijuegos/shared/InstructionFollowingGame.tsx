import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from './Feedback';
import './shared-games.css';
import './feedback.css';
import './instruction-following.css';

interface InstructionStep {
  instruction: string;
  target: string;
  color: string;
  emoji: string;
  key: string;
}

interface InstructionSequence {
  steps: InstructionStep[];
  key: string;
}

interface InstructionFollowingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  sequences: InstructionSequence[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function InstructionFollowingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  sequences,
  progress,
  mascotMessage,
  footer,
}: InstructionFollowingGameProps) {
  const [seqIndex, setSeqIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [sequenceResults, setSequenceResults] = useState<number[][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Escucha y sigue las instrucciones paso a paso.');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const [targets, setTargets] = useState<{ id: string; color: string; emoji: string }[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { seqIndex, stepIndex, completedSteps, sequenceResults },
  });

  const shuffleTargets = () => {
    const allTargets = sequences.flatMap((seq) =>
      seq.steps.map((s) => ({ id: s.target, color: s.color, emoji: s.emoji }))
    );
    const unique = allTargets.filter(
      (t, i, arr) => arr.findIndex((x) => x.id === t.id) === i
    );
    const shuffled = [...unique].sort(() => Math.random() - 0.5);
    setTargets(shuffled);
  };

  useEffect(() => {
    setSeqIndex(0);
    setStepIndex(0);
    setCompletedSteps([]);
    setSequenceResults([]);
    setIsComplete(false);
    setMessage('Escucha y sigue las instrucciones paso a paso.');
    shuffleTargets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId, sequences]);

  const handleTargetClick = (targetId: string) => {
    const currentSeq = sequences[seqIndex];
    if (!currentSeq) return;
    const expectedStep = currentSeq.steps[stepIndex];
    if (!expectedStep) return;
    const isCorrect = targetId === expectedStep.target;

    if (isCorrect) {
      const newCompleted = [...completedSteps, stepIndex + 1];
      setCompletedSteps(newCompleted);
      evidence.recordEvent(`${activityId}_STEP_COMPLETED`, {
        sequence: seqIndex + 1,
        step: stepIndex + 1,
        totalSteps: currentSeq.steps.length,
        target: targetId,
      });

      if (stepIndex + 1 < currentSeq.steps.length) {
        setStepIndex(stepIndex + 1);
        setMessage('Buen trabajo. Sigue con el siguiente paso.');
        setFeedbackKind('success');
        window.setTimeout(() => setFeedbackKind(null), 800);
      } else {
        setMessage('Excelente. Completaste todos los pasos.');
        setFeedbackKind('success');
        window.setTimeout(() => setFeedbackKind(null), 1000);
        const seqResult = [...newCompleted];
        const newSeqResults = [...sequenceResults, seqResult];
        setSequenceResults(newSeqResults);

        if (seqIndex + 1 < sequences.length) {
          window.setTimeout(() => {
            setSeqIndex(seqIndex + 1);
            setStepIndex(0);
            setCompletedSteps([]);
            setMessage('Escucha y sigue las instrucciones paso a paso.');
            shuffleTargets();
          }, 1500);
        } else {
          const fullSequences = newSeqResults.filter(
            (r) => r.length >= sequences[newSeqResults.length - 1]?.steps.length
          ).length;
          evidence.recordEvent(`${activityId}_FINISHED`, {
            totalSequences: sequences.length,
            fullSequences,
            sequenceResults: newSeqResults,
          });
          evidence.recordLog({
            activity: activityId,
            event: 'FINISHED',
            validation: 'requires_adult_or_psychologist_review',
            completedByChild: true,
            totalSequences: sequences.length,
            fullSequences,
            sequenceResults: newSeqResults,
          });
          setIsComplete(true);
          answerOnce(fullSequences >= 1 ? 'CORRECT' : 'ERROR', {
            detalle: JSON.stringify({
              activity: activityId,
              validation: 'requires_adult_or_psychologist_review',
              completedByChild: true,
              totalSequences: sequences.length,
              fullSequences,
              sequenceResults: newSeqResults,
            }),
          });
        }
      }
    } else {
      setFeedbackKind('error');
      window.setTimeout(() => setFeedbackKind(null), 800);
      evidence.recordEvent(`${activityId}_STEP_MISSED`, {
        sequence: seqIndex + 1,
        step: stepIndex + 1,
        expected: expectedStep.target,
        clicked: targetId,
      });
    }
  };

  const currentSeq = sequences[seqIndex];

  const playArea = currentSeq ? (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Secuencia {seqIndex + 1} / {sequences.length}</strong>
      </div>
      <ProgressBar current={completedSteps.length} total={currentSeq.steps.length} />
      <FeedbackBanner
        kind={feedbackKind}
        message={feedbackKind === 'success' ? 'Muy bien' : 'Intentalo otra vez'}
        onDismiss={() => setFeedbackKind(null)}
        autoHideMs={800}
      />
      <div className="if-steps">
        {currentSeq.steps.map((s, i) => (
          <div
            key={s.key}
            className={`if-step${i < completedSteps.length ? ' is-done' : ''}${i === stepIndex ? ' is-current' : ''}`}
          >
            <div className="if-step-number">{i + 1}</div>
            <div className="if-step-text">{s.instruction}</div>
          </div>
        ))}
      </div>
      <div className="if-targets">
        {targets.map((t) => (
          <button
            type="button"
            key={t.id}
            className="if-target"
            style={{ borderColor: t.color, backgroundColor: `${t.color}15` }}
            onClick={() => handleTargetClick(t.id)}
            aria-label={t.id}
          >
            <span className="if-target-emoji" aria-hidden="true">{t.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      footer={footer ?? 'El evaluador revisara las instrucciones seguidas al finalizar.'}
    />
  );
}

export default InstructionFollowingGame;

import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import { ProgressBar, FeedbackBanner, type FeedbackKind } from '@/minijuegos/shared/Feedback';
import { COGNITIVO_078_CONFIG } from './config';
import './COGNITIVO_078.css';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const PALABRAS = [
  'gato', 'sol', 'casa', 'pan', 'flor',
  'libro', 'agua', 'mesa', 'silla', 'perro',
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'finished';

export default function COGNITIVO_078({ currentItem, onAnswer }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [palabras] = useState<string[]>(() => shuffle(PALABRAS));
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | 'pending'>>(() =>
    Object.fromEntries(palabras.map((p) => [p, 'pending' as const])),
  );
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId: COGNITIVO_078_CONFIG.id,
    isComplete: phase === 'finished',
    contextData: { step, total: palabras.length, results, phase },
  });

  useEffect(() => {
    setStep(0);
    setResults(Object.fromEntries(palabras.map((p) => [p, 'pending' as const])));
    setPhase('idle');
    setError(null);
  }, [palabras]);

  const media = useMediaCapture({
    needsVideo: false,
    needsAudio: true,
    needsCameraFrame: false,
    enabled: phase === 'preparing' || phase === 'recording',
    prepareMedia: async (req) => permissions.prepareMedia(req),
    getPreparedStream: (req) => permissions.getPreparedStream(req),
  });

  useEffect(() => {
    if (phase === 'preparing' && media.status === 'recording') {
      setPhase('recording');
    } else if (phase === 'preparing' && (media.status === 'failed' || media.status === 'permission-denied')) {
      setError(media.message);
      setPhase('idle');
    }
  }, [phase, media.status, media.message]);

  const startRecording = () => {
    setError(null);
    setPhase('preparing');
  };

  const stopRecording = async () => {
    const blob = await media.stop();
    if (blob) {
      await evidence.uploadBlob('AUDIO', blob, {
        fileName: `${COGNITIVO_078_CONFIG.id}-word-${step}.webm`,
        metadata: { source: 'child_reading', step, word: palabras[step] },
      });
    }
    setPhase('review');
  };

  const mark = (status: 'correct' | 'incorrect') => {
    const currentWord = palabras[step];
    setResults((cur) => ({ ...cur, [currentWord]: status }));
    setFeedbackKind(status === 'correct' ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    if (step + 1 < palabras.length) {
      setStep(step + 1);
      setPhase('idle');
    } else {
      const correct = Object.values({ ...results, [currentWord]: status }).filter((r) => r === 'correct').length;
      evidence.recordEvent(`${COGNITIVO_078_CONFIG.id}_FINISHED`, { correct, total: palabras.length });
      evidence.recordLog({
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        correct,
        totalWords: palabras.length,
        results: { ...results, [currentWord]: status },
      });
      setPhase('finished');
      answerOnce(correct >= palabras.length * 0.7 ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: COGNITIVO_078_CONFIG.id,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          correct,
          totalWords: palabras.length,
          results: { ...results, [currentWord]: status },
        }),
      });
    }
  };

  const word = palabras[step];

  const playArea = (
    <div className="c078-container" ref={containerRef}>
      <div className="c078-status" role="status" aria-live="polite">
        <span>{error ?? `Lee la palabra en voz alta`}</span>
        <strong>Palabra {step + 1} / {palabras.length}</strong>
      </div>
      <ProgressBar current={step + 1} total={palabras.length} />
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Correcto' : 'Marcado como incorrecto'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="c078-word-card" aria-label={`Palabra ${word}`}>
        <span className="c078-word">{word}</span>
      </div>
      <div className="c078-controls">
        {phase === 'recording' ? (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={stopRecording}>Detener grabacion</button>
        ) : phase === 'preparing' ? (
          <button type="button" className="kid-action-btn" disabled>Preparando microfono...</button>
        ) : phase === 'review' ? (
          <>
            <button type="button" className="c078-mark-correct" onClick={() => mark('correct')}>Lo leyo bien</button>
            <button type="button" className="c078-mark-incorrect" onClick={() => mark('incorrect')}>No lo leyo</button>
          </>
        ) : (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={startRecording}>Grabar lectura</button>
        )}
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title="Lee 10 palabras"
      subtitle={currentItem.instruccion || 'Lee cada palabra en voz alta. El psicologo marca si la leyo bien.'}
      progressLabel={buildProgressLabel(1, 1)}
      playArea={playArea}
      footer="El evaluador escucha la grabacion y marca cada palabra."
    />
  );
}

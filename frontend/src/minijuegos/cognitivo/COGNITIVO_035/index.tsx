import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import { FeedbackBanner, type FeedbackKind } from '@/minijuegos/shared/Feedback';
import { COGNITIVO_035_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const JUEGOS = [
  { palabra: '5 lobitos', accion: 'Mano abierta, luego cerrar dedos uno a uno.' },
  { palabra: 'Choc Choc', accion: 'Manos juntas, luego abrir y cerrar como aplauso.' },
  { palabra: 'Palmas palmitas', accion: 'Palmas hacia arriba y hacia abajo alternando.' },
];

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'finished';

export default function COGNITIVO_035({ currentItem, onAnswer }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId: COGNITIVO_035_CONFIG.id,
    isComplete: phase === 'finished',
    contextData: { step, total: JUEGOS.length, results, phase },
  });

  useEffect(() => {
    setStep(0);
    setResults({});
    setPhase('idle');
    setError(null);
  }, []);

  const media = useMediaCapture({
    needsVideo: true,
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
      await evidence.uploadBlob('VIDEO', blob, {
        fileName: `${COGNITIVO_035_CONFIG.id}-juego-${step}.webm`,
        metadata: { source: 'child_finger_play', step, juego: JUEGOS[step].palabra },
      });
    }
    setPhase('review');
  };

  const mark = (logro: boolean) => {
    setResults((cur) => ({ ...cur, [step]: logro }));
    setFeedbackKind(logro ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1000);
    if (step + 1 < JUEGOS.length) {
      setStep(step + 1);
      setPhase('idle');
    } else {
      const totalLogrados = Object.values({ ...results, [step]: logro }).filter(Boolean).length;
      evidence.recordEvent(`${COGNITIVO_035_CONFIG.id}_FINISHED`, { totalLogrados, total: JUEGOS.length });
      evidence.recordLog({
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalLogrados,
        total: JUEGOS.length,
        results: { ...results, [step]: logro },
      });
      setPhase('finished');
      answerOnce(totalLogrados >= JUEGOS.length / 2 ? 'CORRECT' : 'ERROR', {
        detalle: JSON.stringify({
          activity: COGNITIVO_035_CONFIG.id,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalLogrados,
          total: JUEGOS.length,
          results: { ...results, [step]: logro },
        }),
      });
    }
  };

  const juego = JUEGOS[step];

  const playArea = (
    <div className="c035-container" ref={containerRef}>
      <div className="c035-status" role="status" aria-live="polite">
        <span>{error ?? 'El nino realiza el juego de dedos frente a la camara'}</span>
        <strong>Juego {step + 1} / {JUEGOS.length}</strong>
      </div>
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Logrado' : 'No logrado'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1000} />
      <div className="c035-juego-card">
        <p className="c035-palabra">&ldquo;{juego.palabra}&rdquo;</p>
        <p className="c035-accion">{juego.accion}</p>
      </div>
      <div className="c035-controls">
        {phase === 'recording' ? (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={stopRecording}>Detener grabacion</button>
        ) : phase === 'preparing' ? (
          <button type="button" className="kid-action-btn" disabled>Preparando camara...</button>
        ) : phase === 'review' ? (
          <>
            <button type="button" className="c035-mark-success" onClick={() => mark(true)}>Lo realizo bien</button>
            <button type="button" className="c035-mark-fail" onClick={() => mark(false)}>No lo realizo</button>
          </>
        ) : (
          <button type="button" className="kid-action-btn kid-action-primary" onClick={startRecording}>Grabar realizacion</button>
        )}
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title="Juegos de dedos"
      subtitle={currentItem.instruccion || 'El nino repite juegos de dedos con palabras y acciones.'}
      progressLabel={buildProgressLabel(1, 1)}
      playArea={playArea}
      footer="El psicologo graba al nino y marca si realizo correctamente cada juego."
    />
  );
}

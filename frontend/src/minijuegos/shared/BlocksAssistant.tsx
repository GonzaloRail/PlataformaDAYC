import { useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { FeedbackBanner, type FeedbackKind } from '@/minijuegos/shared/Feedback';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  modeloSVG: string;
  consignaPsicologo: string;
}

export function BlocksAssistant({ currentItem, onAnswer, activityId, title, instruction, modeloSVG, consignaPsicologo }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<'idle' | 'done'>('idle');
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'done',
    contextData: { phase },
  });

  const marcar = (logro: boolean) => {
    setPhase('done');
    setFeedbackKind(logro ? 'success' : 'error');
    window.setTimeout(() => setFeedbackKind(null), 1500);
    evidence.recordEvent(`${activityId}_MARKED`, { logro });
    evidence.recordLog({
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      logro,
      modo: 'asistido',
    });
    answerOnce(logro ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        logro,
        modo: 'asistido',
      }),
    });
  };

  const playArea = (
    <div className="blocks-assistant" ref={containerRef}>
      <div className="blocks-assistant-status" role="status" aria-live="polite">
        <span>Mostrar modelo al nino. El nino debe replicar con cubos reales.</span>
        <strong>Modo asistido</strong>
      </div>
      <FeedbackBanner kind={feedbackKind} message={feedbackKind === 'success' ? 'Registrado como logrado' : 'Registrado como no logrado'} onDismiss={() => setFeedbackKind(null)} autoHideMs={1500} />
      <div className="blocks-assistant-modelo" aria-label="Modelo a replicar">
        <div className="blocks-assistant-svg" dangerouslySetInnerHTML={{ __html: modeloSVG }} />
      </div>
      <p className="blocks-assistant-consigna">{consignaPsicologo}</p>
      <div className="blocks-assistant-actions">
        <button type="button" className="blocks-mark-success" onClick={() => marcar(true)} disabled={phase === 'done'}>
          Lo logro
        </button>
        <button type="button" className="blocks-mark-fail" onClick={() => marcar(false)} disabled={phase === 'done'}>
          No lo logro
        </button>
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={buildProgressLabel(1, 1)}
      playArea={playArea}
      footer="El psicologo registra el resultado tras observar al nino con los cubos reales."
    />
  );
}

export default BlocksAssistant;

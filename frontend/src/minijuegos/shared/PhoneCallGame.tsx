import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useMediaCapture } from '@/components/evidence/useMediaCapture';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import './shared-games.css';
import './phone-call.css';

interface PhoneCallGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  message: string;
  callerEmoji: string;
  callerName: string;
  captureAudio: boolean;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

type Phase = 'ringing' | 'answered' | 'message' | 'repeat' | 'review' | 'finished';

export function PhoneCallGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  message,
  callerEmoji,
  callerName,
  captureAudio,
  progress,
  mascotMessage,
  footer,
}: PhoneCallGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>('ringing');
  const [error, setError] = useState<string | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const permissions = useMediaPermissions();

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete: phase === 'finished',
    contextData: { phase, captureAudio },
  });

  const media = useMediaCapture({
    needsVideo: false,
    needsAudio: captureAudio,
    needsCameraFrame: false,
    enabled: phase === 'repeat' || phase === 'message',
    prepareMedia: async (req) => permissions.prepareMedia(req),
    getPreparedStream: (req) => permissions.getPreparedStream(req),
  });

  useEffect(() => {
    setPhase('ringing');
    setError(null);
  }, [activityId]);

  useEffect(() => {
    if (phase === 'repeat' && (media.status === 'failed' || media.status === 'permission-denied')) {
      setError(media.message);
      setPhase('message');
    }
  }, [phase, media.status, media.message]);

  const answer = () => {
    setPhase('answered');
    window.setTimeout(() => setPhase('message'), 1500);
  };

  const hearMessage = () => {
    setPhase('repeat');
  };

  const stopRecord = async () => {
    const blob = await media.stop();
    if (blob) {
      await evidence.uploadBlob('AUDIO', blob, {
        fileName: `${activityId}-phone-response.webm`,
        metadata: { source: 'child_phone_response' },
      });
    }
    setPhase('review');
  };

  const finish = (outcome: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE') => {
    evidence.recordEvent(`${activityId}_FINISHED`, { outcome, phase, captureAudio });
    evidence.recordLog({
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: phase === 'review',
      outcome,
      captureAudio,
    });
    setPhase('finished');
    answerOnce(outcome, {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: phase === 'review',
        outcome,
        captureAudio,
      }),
    });
  };

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{error ?? 'Responde al telefono y recuerda el mensaje.'}</span>
        <strong>
          {phase === 'ringing' ? 'Ring... Ring...' : phase === 'repeat' ? 'Dime el mensaje' : 'Telefono'}
        </strong>
      </div>
      <div className="pc-phone-scene">
        {phase === 'ringing' ? (
          <>
            <div className="pc-phone ringing">
              <span className="pc-phone-emoji" aria-hidden="true">📞</span>
              <span className="pc-phone-label">{callerName} te llama</span>
              <span className="pc-ring-text">RING RING</span>
            </div>
            <button type="button" className="pc-answer-btn" onClick={answer}>
              Contestar
            </button>
          </>
        ) : phase === 'answered' ? (
          <div className="pc-phone">
            <span className="pc-phone-emoji" aria-hidden="true">📱</span>
            <span className="pc-phone-label">Conectando...</span>
          </div>
        ) : phase === 'message' ? (
          <div className="pc-caller">
            <span className="pc-caller-emoji" aria-hidden="true">{callerEmoji}</span>
            <div className="pc-caller-bubble">
              <strong>{callerName} dice:</strong>
              <p>{message}</p>
            </div>
            <div className="pc-message-actions">
              <button type="button" className="pc-action-btn" onClick={hearMessage}>
                Repetir el mensaje
              </button>
              <button type="button" className="pc-action-btn pc-skip" onClick={() => finish('NOT_APPLICABLE')}>
                No pudo recordar
              </button>
            </div>
          </div>
        ) : phase === 'repeat' ? (
          <div className="pc-record">
            <div className="pc-caller-bubble">
              <strong>Repite el mensaje:</strong>
              <p>{message}</p>
            </div>
            <button type="button" className="pc-action-btn" onClick={stopRecord}>
              Termine de repetir
            </button>
          </div>
        ) : phase === 'review' ? (
          <div className="pc-review">
            <p>El nino repitio el mensaje.</p>
            <div className="pc-review-actions">
              <button type="button" className="pc-action-btn" onClick={() => finish('CORRECT')}>
                Recordo correctamente
              </button>
              <button type="button" className="pc-action-btn pc-skip" onClick={() => finish('ERROR')}>
                No recordo bien
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <KidGameShell
      variant="embedded"
      title={title}
      subtitle={instruction}
      progressLabel={progress ? buildProgressLabel(progress.current, progress.total) : undefined}
      mascotMessage={mascotMessage}
      playArea={playArea}
      footer={footer ?? 'El evaluador revisara el mensaje recordado por el nino.'}
    />
  );
}

export default PhoneCallGame;

import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { DrawingCanvas } from './DrawingCanvas';
import { useDrawingCanvas } from './useDrawingCanvas';
import './shared-games.css';

interface DrawingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  consigna: string;
  mostrarModelo: boolean;
  modeloSVG?: string;
  modeloLabel?: string;
  color?: string;
  background?: 'blank' | 'lines' | 'grid';
  onDrawEvent?: (event: string, payload: Record<string, unknown>) => void;
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function DrawingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  consigna,
  mostrarModelo,
  modeloSVG,
  modeloLabel,
  color = '#1f2937',
  background = 'blank',
  onDrawEvent,
  progress,
  mascotMessage,
  footer,
}: DrawingGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  const drawing = useDrawingCanvas({
    strokeStyle: color,
  });

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { strokeCount: drawing.strokeCount, mostrarModelo, background },
  });

  useEffect(() => {
    drawing.clearDrawing();
    setIsComplete(false);
  }, [activityId, drawing]);

  const strokeCount = drawing.strokeCount;

  const finish = async () => {
    const canvas = drawing.canvasRef.current;
    const dataUrl: string | null = canvas ? canvas.toDataURL('image/png') : null;
    if (dataUrl) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        await evidence.uploadBlob('SCREENSHOT', blob, {
          fileName: `${activityId}-drawing.png`,
          metadata: { source: 'child_drawing', strokeCount },
        });
      } catch {
        evidence.recordLog({ event: 'DRAWING_EXPORT_FAILED', strokeCount });
      }
    }
    evidence.recordEvent(`${activityId}_FINISHED`, { strokeCount, mostrarModelo, hasDrawing: strokeCount > 0 });
    evidence.recordLog({
      event: 'FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: strokeCount > 0,
      strokeCount,
      mostrarModelo,
      consigna,
    });
    setIsComplete(true);
    onDrawEvent?.('finished', { strokeCount });
    answerOnce('NOT_APPLICABLE', {
      detalle: JSON.stringify({
        activity: activityId,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: strokeCount > 0,
        strokeCount,
        mostrarModelo,
        consigna,
        dataUrl,
      }),
    });
  };

  const playArea = (
    <div className="dg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{consigna}</span>
        <strong>{strokeCount} trazos</strong>
      </div>
      <div className={`dg-canvas-wrap dg-bg-${background}`}>
        {mostrarModelo ? (
          <div className="dg-model" aria-label="Modelo">
            {modeloSVG ? (
              <div className="dg-model-svg" dangerouslySetInnerHTML={{ __html: modeloSVG }} />
            ) : (
              <div className="dg-model-placeholder">{modeloLabel ?? 'Modelo'}</div>
            )}
            {modeloLabel ? <p>{modeloLabel}</p> : null}
          </div>
        ) : null}
        <div className="dg-canvas">
          <DrawingCanvas drawing={drawing} ariaLabel="Area de dibujo" />
        </div>
      </div>
      <div className="dg-controls">
        <button type="button" onClick={() => drawing.clearDrawing()}>Limpiar</button>
        <button type="button" className="kid-action-btn kid-action-primary" onClick={finish}>
          Termine mi dibujo
        </button>
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
      footer={footer ?? 'El evaluador revisara el dibujo realizado.'}
    />
  );
}

export default DrawingGame;

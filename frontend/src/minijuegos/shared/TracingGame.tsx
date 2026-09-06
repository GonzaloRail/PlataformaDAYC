import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { DrawingCanvas } from '@/minijuegos/shared/DrawingCanvas';
import { useDrawingCanvas, type DrawingCanvasState } from '@/minijuegos/shared/useDrawingCanvas';
import './shared-games.css';
import './tracing-game.css';

type TracingModel = 'cross' | 'square' | 'rectangle' | 'diamond' | 'circle' | 'vertical' | 'horizontal';

interface TracingRound {
  model: TracingModel;
  label: string;
  key: string;
}

interface TracingGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  rounds: TracingRound[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

const CANVAS_W = 400;
const CANVAS_H = 250;

const modelLines: Record<TracingModel, { x1: number; y1: number; x2: number; y2: number }[]> = {
  cross: [
    { x1: 200, y1: 40, x2: 200, y2: 210 },
    { x1: 80, y1: 125, x2: 320, y2: 125 },
  ],
  square: [
    { x1: 100, y1: 40, x2: 300, y2: 40 },
    { x1: 300, y1: 40, x2: 300, y2: 210 },
    { x1: 300, y1: 210, x2: 100, y2: 210 },
    { x1: 100, y1: 210, x2: 100, y2: 40 },
  ],
  rectangle: [
    { x1: 80, y1: 40, x2: 320, y2: 40 },
    { x1: 320, y1: 40, x2: 320, y2: 210 },
    { x1: 320, y1: 210, x2: 80, y2: 210 },
    { x1: 80, y1: 210, x2: 80, y2: 40 },
  ],
  diamond: [
    { x1: 200, y1: 30, x2: 340, y2: 125 },
    { x1: 340, y1: 125, x2: 200, y2: 220 },
    { x1: 200, y1: 220, x2: 60, y2: 125 },
    { x1: 60, y1: 125, x2: 200, y2: 30 },
  ],
  circle: [],
  vertical: [{ x1: 200, y1: 40, x2: 200, y2: 210 }],
  horizontal: [{ x1: 80, y1: 125, x2: 320, y2: 125 }],
};

export function TracingGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  rounds,
  progress,
  mascotMessage,
  footer,
}: TracingGameProps) {
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Observa el modelo y copia el trazo.');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  const drawing: DrawingCanvasState = useDrawingCanvas({ width: CANVAS_W, height: CANVAS_H, lineWidth: 3, strokeStyle: '#f59e0b' });
  const { clearDrawing } = drawing;

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { step, total: rounds.length },
  });

  useEffect(() => {
    setStep(0);
    setIsComplete(false);
    setMessage('Observa el modelo y copia el trazo.');
    clearDrawing();
  }, [activityId, clearDrawing]);

  useEffect(() => {
    const canvas = modelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    const current = rounds[step];
    if (!current) return;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    const lines = modelLines[current.model];
    for (const l of lines) {
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
    }
    if (current.model === 'circle') {
      ctx.beginPath();
      ctx.arc(200, 125, 80, 0, Math.PI * 2);
      ctx.stroke();
    }
    clearDrawing();
  }, [step, rounds, clearDrawing]);

  const nextRound = () => {
    evidence.recordEvent(`${activityId}_TRACED`, { step, model: rounds[step].model, hasContent: drawing.hasDrawing });
    drawing.clearDrawing();
    if (step + 1 < rounds.length) {
      setStep(step + 1);
    } else {
      evidence.recordEvent(`${activityId}_FINISHED`, { totalRounds: rounds.length });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalRounds: rounds.length,
      });
      setIsComplete(true);
      answerOnce('CORRECT', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalRounds: rounds.length,
        }),
      });
    }
  };

  const current = rounds[step];

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>{message}</span>
        <strong>Trazo {step + 1} / {rounds.length}</strong>
      </div>
      <div className="tg-layout">
        <div className="tg-model">
          <strong className="tg-label">Modelo: {current?.label}</strong>
          <canvas ref={modelCanvasRef} width={CANVAS_W} height={CANVAS_H} className="tg-model-canvas" aria-label={`Modelo de ${current?.label}`} />
        </div>
        <div className="tg-draw">
          <strong className="tg-label">Tu trazo:</strong>
          <DrawingCanvas drawing={drawing} className="tg-draw-canvas" ariaLabel={`Dibuja un ${current?.label}`} />
        </div>
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
      actions={
        <button type="button" className="kid-action-btn kid-action-primary" onClick={nextRound}>
          Termine este trazo
        </button>
      }
      footer={footer ?? 'El evaluador revisara los trazos registrados al finalizar.'}
    />
  );
}

export default TracingGame;

import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../../../components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '../../../components/minijuegos/shared/useMinijuegoSession';
import { COGNITIVO_045_CONFIG } from './config';
import './COGNITIVO_045.css';

interface Cognitivo045Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

type Point = { x: number; y: number };

const CANVAS_WIDTH = 760;
const CANVAS_HEIGHT = 560;

function getCanvasPoint(canvas: HTMLCanvasElement, event: React.PointerEvent<HTMLCanvasElement>): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
    y: ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
  };
}

function drawLine(context: CanvasRenderingContext2D, from: Point, to: Point) {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

function ModelFace() {
  return (
    <svg className="cog045-face" viewBox="0 0 360 360" role="img" aria-label="Cara modelo para copiar">
      <rect x="18" y="18" width="324" height="324" rx="46" fill="#fff7e8" />
      <circle cx="180" cy="172" r="106" fill="#ffd8ad" stroke="#263747" strokeWidth="9" />
      <path d="M106 130 C128 74, 236 74, 254 130" fill="none" stroke="#5f3b2b" strokeWidth="18" strokeLinecap="round" />
      <circle cx="136" cy="162" r="13" fill="#263747" />
      <circle cx="224" cy="162" r="13" fill="#263747" />
      <path d="M180 176 C168 206, 172 218, 194 218" fill="none" stroke="#263747" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M137 239 C158 260, 205 260, 225 239" fill="none" stroke="#d75656" strokeWidth="10" strokeLinecap="round" />
      <path d="M75 169 C45 178, 48 225, 82 226" fill="none" stroke="#263747" strokeWidth="9" strokeLinecap="round" />
      <path d="M285 169 C315 178, 312 225, 278 226" fill="none" stroke="#263747" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

export default function COGNITIVO_045({ currentItem, onAnswer }: Cognitivo045Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const startedAtRef = useRef(Date.now());
  const [strokeCount, setStrokeCount] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [message, setMessage] = useState('Mira la cara de la izquierda y dibujala en el espacio blanco.');
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

  useEffect(() => {
    startedAtRef.current = Date.now();
    setStrokeCount(0);
    setHasDrawing(false);
    setMessage('Mira la cara de la izquierda y dibujala en el espacio blanco.');

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 9;
    context.strokeStyle = '#263747';
  }, [currentItem.id]);

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getCanvasPoint(canvas, event);
    setHasDrawing(true);
    setStrokeCount((current) => current + 1);
    setMessage('Muy bien. Sigue copiando la cara modelo.');
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const lastPoint = lastPointRef.current;
    if (!canvas || !context || !lastPoint) return;

    const nextPoint = getCanvasPoint(canvas, event);
    drawLine(context, lastPoint, nextPoint);
    lastPointRef.current = nextPoint;
  };

  const stopDrawing = (event?: React.PointerEvent<HTMLCanvasElement>) => {
    if (event && canvasRef.current?.hasPointerCapture(event.pointerId)) {
      canvasRef.current.releasePointerCapture(event.pointerId);
    }
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setStrokeCount(0);
    setHasDrawing(false);
    setMessage('Listo. Puedes empezar de nuevo copiando la cara.');
  };

  const finishDrawing = () => {
    const durationMs = Date.now() - startedAtRef.current;
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: COGNITIVO_045_CONFIG.id,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        strokeCount,
        durationMs,
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
      }),
    });
  };

  return (
    <KidGameShell
      title="Copia la cara"
      subtitle={currentItem.instruccion}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage={message}
      playArea={
        <div className="cog045-game">
          <section className="cog045-panel cog045-model-panel" aria-label="Cara modelo">
            <p className="cog045-panel-label">Mira esta cara</p>
            <ModelFace />
          </section>

          <section className="cog045-panel cog045-drawing-panel" aria-label="Area para dibujar">
            <div className="cog045-drawing-header">
              <p className="cog045-panel-label">Dibuja aqui</p>
              <span>{strokeCount} trazos</span>
            </div>
            <canvas
              ref={canvasRef}
              className="cog045-canvas"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              aria-label="Lienzo para copiar la cara modelo"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>
        </div>
      }
      actions={
        <>
          <button type="button" className="kid-action-btn cog045-clear-btn" onClick={clearDrawing}>
            Borrar dibujo
          </button>
          <button type="button" className="kid-action-btn kid-action-primary" onClick={finishDrawing} disabled={!hasDrawing}>
            Termine mi dibujo
          </button>
        </>
      }
      footer="El evaluador revisara si el dibujo imita la cara modelo."
    />
  );
}

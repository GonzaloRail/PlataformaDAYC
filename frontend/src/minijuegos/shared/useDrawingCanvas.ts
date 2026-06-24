import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent, RefObject } from 'react';

export type DrawingPoint = { x: number; y: number };

interface UseDrawingCanvasOptions {
  width?: number;
  height?: number;
  lineWidth?: number;
  strokeStyle?: string;
}

export interface DrawingCanvasState {
  canvasRef: RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  strokeCount: number;
  hasDrawing: boolean;
  durationMs: number;
  metadata: Record<string, unknown>;
  getMetadata: () => Record<string, unknown>;
  startDrawing: (event: PointerEvent<HTMLCanvasElement>) => void;
  draw: (event: PointerEvent<HTMLCanvasElement>) => void;
  stopDrawing: (event?: PointerEvent<HTMLCanvasElement>) => void;
  clearDrawing: () => void;
}

function getCanvasPoint(canvas: HTMLCanvasElement, width: number, height: number, event: PointerEvent<HTMLCanvasElement>): DrawingPoint {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * width,
    y: ((event.clientY - rect.top) / rect.height) * height,
  };
}

function drawLine(context: CanvasRenderingContext2D, from: DrawingPoint, to: DrawingPoint) {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

function drawDot(context: CanvasRenderingContext2D, point: DrawingPoint) {
  context.beginPath();
  context.arc(point.x, point.y, context.lineWidth / 2, 0, Math.PI * 2);
  context.fillStyle = context.strokeStyle;
  context.fill();
}

export function useDrawingCanvas({
  width = 760,
  height = 560,
  lineWidth = 9,
  strokeStyle = '#263747',
}: UseDrawingCanvasOptions = {}): DrawingCanvasState {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<DrawingPoint | null>(null);
  const startedAtRef = useRef(Date.now());
  const [strokeCount, setStrokeCount] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);

  const resetContext = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, width, height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
  }, [height, lineWidth, strokeStyle, width]);

  useEffect(() => {
    startedAtRef.current = Date.now();
    setStrokeCount(0);
    setHasDrawing(false);
    resetContext();
  }, [resetContext]);

  const startDrawing = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    const startPoint = getCanvasPoint(canvas, width, height, event);
    lastPointRef.current = startPoint;
    drawDot(context, startPoint);
    setHasDrawing(true);
    setStrokeCount((current) => current + 1);
  }, [height, width]);

  const draw = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const lastPoint = lastPointRef.current;
    if (!canvas || !context || !lastPoint) return;

    const nextPoint = getCanvasPoint(canvas, width, height, event);
    drawLine(context, lastPoint, nextPoint);
    lastPointRef.current = nextPoint;
  }, [height, width]);

  const stopDrawing = useCallback((event?: PointerEvent<HTMLCanvasElement>) => {
    event?.preventDefault();
    if (event && canvasRef.current?.hasPointerCapture(event.pointerId)) {
      canvasRef.current.releasePointerCapture(event.pointerId);
    }
    drawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const clearDrawing = useCallback(() => {
    startedAtRef.current = Date.now();
    setStrokeCount(0);
    setHasDrawing(false);
    resetContext();
  }, [resetContext]);

  const durationMs = Date.now() - startedAtRef.current;
  const getMetadata = useCallback(() => ({
    strokeCount,
    durationMs: Date.now() - startedAtRef.current,
    canvasWidth: width,
    canvasHeight: height,
  }), [height, strokeCount, width]);

  return {
    canvasRef,
    width,
    height,
    strokeCount,
    hasDrawing,
    durationMs,
    metadata: {
      strokeCount,
      durationMs,
      canvasWidth: width,
      canvasHeight: height,
    },
    getMetadata,
    startDrawing,
    draw,
    stopDrawing,
    clearDrawing,
  };
}

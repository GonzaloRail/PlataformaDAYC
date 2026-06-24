import type { DrawingCanvasState } from './useDrawingCanvas';

interface DrawingCanvasProps {
  drawing: DrawingCanvasState;
  className?: string;
  ariaLabel?: string;
}

export function DrawingCanvas({ drawing, className = 'drawing-canvas', ariaLabel = 'Lienzo de dibujo' }: DrawingCanvasProps) {
  return (
    <canvas
      ref={drawing.canvasRef}
      className={className}
      width={drawing.width}
      height={drawing.height}
      aria-label={ariaLabel}
      onPointerDown={drawing.startDrawing}
      onPointerMove={drawing.draw}
      onPointerUp={drawing.stopDrawing}
      onPointerCancel={drawing.stopDrawing}
      onPointerLeave={drawing.stopDrawing}
    />
  );
}

export default DrawingCanvas;

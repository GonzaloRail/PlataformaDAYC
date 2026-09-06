import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import './shared-games.css';
import './coloring-game.css';

interface ColorDef {
  id: string;
  hex: string;
  label: string;
}

interface DrawingShape {
  id: string;
  label: string;
  viewBox: string;
  paths: { d: string; fill?: string; zoneId: string }[];
  zones: { id: string; label: string }[];
}

interface ColoringGameProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  activityId: string;
  title: string;
  instruction: string;
  shapes: DrawingShape[];
  colors: ColorDef[];
  progress?: { current: number; total: number };
  mascotMessage?: string;
  footer?: string;
}

export function ColoringGame({
  currentItem,
  onAnswer,
  activityId,
  title,
  instruction,
  shapes,
  colors,
  progress,
  mascotMessage,
  footer,
}: ColoringGameProps) {
  const [shapeIndex, setShapeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.id ?? 'green');
  const [fills, setFills] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();
  const firstColorId = colors[0]?.id ?? 'green';

  useAutoEvidence({
    containerRef,
    activityId,
    isComplete,
    contextData: { shapeIndex, fills, totalShapes: shapes.length },
  });

  useEffect(() => {
    setShapeIndex(0);
    setSelectedColor(firstColorId);
    setFills({});
    setIsComplete(false);
  }, [activityId, firstColorId]);

  const handleZoneClick = (zoneId: string) => {
    const color = colors.find((c) => c.id === selectedColor);
    if (!color) return;
    setFills((prev) => ({ ...prev, [zoneId]: color.hex }));
    evidence.recordEvent(`${activityId}_FILLED`, { shapeIndex, zoneId, color: selectedColor });
  };

  const nextShape = () => {
    evidence.recordEvent(`${activityId}_SHAPE_COLORED`, { shapeIndex, fills, shape: shapes[shapeIndex].label });
    if (shapeIndex + 1 < shapes.length) {
      setShapeIndex(shapeIndex + 1);
      setFills({});
    } else {
      evidence.recordEvent(`${activityId}_FINISHED`, { totalShapes: shapes.length });
      evidence.recordLog({
        activity: activityId,
        event: 'FINISHED',
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        totalShapes: shapes.length,
      });
      setIsComplete(true);
      answerOnce('CORRECT', {
        detalle: JSON.stringify({
          activity: activityId,
          validation: 'requires_adult_or_psychologist_review',
          completedByChild: true,
          totalShapes: shapes.length,
        }),
      });
    }
  };

  const currentShape = shapes[shapeIndex];

  const playArea = (
    <div className="sg-container" ref={containerRef}>
      <div className="sg-status" role="status" aria-live="polite">
        <span>Elige un color y toca una zona para colorear.</span>
        <strong>Dibujo {shapeIndex + 1} / {shapes.length}</strong>
      </div>
      <div className="cg-palette">
        {colors.map((c) => (
          <button
            type="button"
            key={c.id}
            className={`cg-color-swatch${selectedColor === c.id ? ' is-selected' : ''}`}
            style={{ backgroundColor: c.hex }}
            onClick={() => setSelectedColor(c.id)}
            aria-label={c.label}
          />
        ))}
      </div>
      {currentShape ? (
        <div className="cg-drawing-area">
          <svg viewBox={currentShape.viewBox} className="cg-svg" aria-label={currentShape.label}>
            {currentShape.paths.map((p) => (
              <path
                key={`${shapeIndex}-${p.zoneId}`}
                d={p.d}
                fill={fills[p.zoneId] || p.fill || '#f8fafc'}
                stroke="#cbd5e1"
                strokeWidth="2"
                className="cg-zone"
                onClick={() => handleZoneClick(p.zoneId)}
                role="button"
                tabIndex={0}
                aria-label={currentShape.zones.find((z) => z.id === p.zoneId)?.label ?? p.zoneId}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleZoneClick(p.zoneId); } }}
              />
            ))}
          </svg>
        </div>
      ) : null}
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
        <button type="button" className="kid-action-btn kid-action-primary" onClick={nextShape}>
          {shapeIndex + 1 < shapes.length ? 'Siguiente dibujo' : 'Termine de colorear'}
        </button>
      }
      footer={footer ?? 'El evaluador revisara el coloreado al finalizar.'}
    />
  );
}

export default ColoringGame;

import { useEffect, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { useDrawingCanvas } from '@/minijuegos/shared/useDrawingCanvas';
import { canvasToBlob } from '@/utils/media';
import { FaceDrawingBoard } from '@/minijuegos/cognitivo/COGNITIVO_045/components/FaceDrawingBoard';
import { COGNITIVO_045_CONFIG } from '@/minijuegos/cognitivo/COGNITIVO_045/config';
import '../../shared/TwoPanelActivityLayout.css';
import './COGNITIVO_045.css';

interface Cognitivo045Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawModelFace(context: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const scale = size / 360;
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);

  context.fillStyle = '#fff7e8';
  roundRect(context, 18, 18, 324, 324, 46);
  context.fill();

  context.fillStyle = '#ffd8ad';
  context.strokeStyle = '#263747';
  context.lineWidth = 9;
  context.beginPath();
  context.arc(180, 172, 106, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.strokeStyle = '#5f3b2b';
  context.lineWidth = 18;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(106, 130);
  context.bezierCurveTo(128, 74, 236, 74, 254, 130);
  context.stroke();

  context.fillStyle = '#263747';
  context.beginPath();
  context.arc(136, 162, 13, 0, Math.PI * 2);
  context.arc(224, 162, 13, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#263747';
  context.lineWidth = 8;
  context.lineJoin = 'round';
  context.beginPath();
  context.moveTo(180, 176);
  context.bezierCurveTo(168, 206, 172, 218, 194, 218);
  context.stroke();

  context.strokeStyle = '#d75656';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(137, 239);
  context.bezierCurveTo(158, 260, 205, 260, 225, 239);
  context.stroke();

  context.strokeStyle = '#263747';
  context.lineWidth = 9;
  context.beginPath();
  context.moveTo(75, 169);
  context.bezierCurveTo(45, 178, 48, 225, 82, 226);
  context.moveTo(285, 169);
  context.bezierCurveTo(315, 178, 312, 225, 278, 226);
  context.stroke();

  context.restore();
}

async function buildActivityScreenshot(drawingCanvas: HTMLCanvasElement | null, metadata: Record<string, unknown>) {
  if (!drawingCanvas) return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1440;
  canvas.height = 900;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = '#eef8fb';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ffffff';
  roundRect(context, 42, 42, canvas.width - 84, canvas.height - 84, 34);
  context.fill();

  context.fillStyle = '#173846';
  context.font = '700 42px sans-serif';
  context.fillText('COGNITIVO_045 · Imita el dibujo de una cara', 86, 116);
  context.fillStyle = '#5a7280';
  context.font = '26px sans-serif';
  context.fillText(`${metadata.strokeCount ?? 0} trazos · ${Math.round(Number(metadata.durationMs ?? 0) / 1000)} segundos`, 86, 158);

  const panelY = 205;
  const panelW = 600;
  const panelH = 610;
  const leftX = 86;
  const rightX = 754;

  context.fillStyle = '#fff8e8';
  roundRect(context, leftX, panelY, panelW, panelH, 30);
  context.fill();
  context.fillStyle = '#f8fffc';
  roundRect(context, rightX, panelY, panelW, panelH, 30);
  context.fill();

  context.strokeStyle = 'rgba(15, 107, 122, 0.22)';
  context.lineWidth = 4;
  roundRect(context, leftX, panelY, panelW, panelH, 30);
  context.stroke();
  roundRect(context, rightX, panelY, panelW, panelH, 30);
  context.stroke();

  context.fillStyle = '#0f6b7a';
  context.font = '800 30px sans-serif';
  context.fillText('Modelo', leftX + 34, panelY + 56);
  context.fillText('Dibujo del niño', rightX + 34, panelY + 56);

  drawModelFace(context, leftX + 120, panelY + 130, 360);

  context.fillStyle = '#fffef9';
  roundRect(context, rightX + 34, panelY + 92, panelW - 68, panelH - 130, 22);
  context.fill();
  context.drawImage(drawingCanvas, rightX + 34, panelY + 92, panelW - 68, panelH - 130);

  context.fillStyle = '#5a7280';
  context.font = '20px sans-serif';
  context.fillText(`Capturado: ${new Date().toLocaleString()}`, 86, 850);

  return canvasToBlob(canvas);
}

export default function COGNITIVO_045({ currentItem, onAnswer }: Cognitivo045Props) {
  const drawing = useDrawingCanvas();
  const [message, setMessage] = useState('Mira la cara de la izquierda y dibujala en el espacio blanco.');
  const [isSavingEvidence, setIsSavingEvidence] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [lastContext, setLastContext] = useState<Record<string, unknown>>({});
  const playAreaRef = useRef<HTMLDivElement | null>(null);
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  useAutoEvidence({
    containerRef: playAreaRef,
    activityId: COGNITIVO_045_CONFIG.id,
    isComplete,
    contextData: lastContext,
  });

  useEffect(() => {
    setMessage('Mira la cara de la izquierda y dibujala en el espacio blanco.');
    setIsSavingEvidence(false);
    drawing.clearDrawing();
  }, [currentItem.id]);

  const clearDrawing = () => {
    if (isSavingEvidence) return;
    evidence.recordEvent('COG045_DRAWING_CLEARED', drawing.getMetadata());
    drawing.clearDrawing();
    setMessage('Listo. Puedes empezar de nuevo copiando la cara.');
  };

  const finishDrawing = async () => {
    if (isSavingEvidence) return;

    setIsSavingEvidence(true);
    setMessage('Guardando la evidencia del dibujo...');
    const metadata = drawing.getMetadata();
    evidence.recordEvent('COG045_DRAWING_FINISHED', metadata);
    evidence.recordLog({
      activity: COGNITIVO_045_CONFIG.id,
      event: 'DRAWING_FINISHED',
      validation: 'requires_adult_or_psychologist_review',
      completedByChild: true,
      ...metadata,
    }, Number(metadata.durationMs));
    const activityScreenshot = await buildActivityScreenshot(drawing.canvasRef.current, metadata);
    const screenshotUploaded = activityScreenshot
      ? await evidence.uploadBlob('SCREENSHOT', activityScreenshot, {
        fileName: `${COGNITIVO_045_CONFIG.id}-activity-screenshot.png`,
        metadata: {
          activity: COGNITIVO_045_CONFIG.id,
          evidence_role: 'full_activity_screenshot',
          validation: 'requires_adult_or_psychologist_review',
          includes_model_face: true,
          includes_child_drawing: true,
          ...metadata,
        },
      })
      : await evidence.uploadCanvasSnapshot(drawing.canvasRef.current, {
      activity: COGNITIVO_045_CONFIG.id,
      evidence_role: 'final_child_drawing',
      validation: 'requires_adult_or_psychologist_review',
      ...metadata,
    });

    if (!screenshotUploaded) {
      evidence.recordLog({
        activity: COGNITIVO_045_CONFIG.id,
        event: 'FINAL_DRAWING_SCREENSHOT_UPLOAD_PENDING_OR_FAILED',
        validation: 'requires_adult_or_psychologist_review',
        ...metadata,
      }, Number(metadata.durationMs));
    }

    setLastContext({
      ...metadata,
      screenshotUploaded,
    });
    setIsComplete(true);

    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: COGNITIVO_045_CONFIG.id,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        evidence: ['LOG', 'SCREENSHOT', 'SYSTEM_RESULT'],
        screenshotUploaded,
        ...metadata,
      }),
    });
  };

  const startMessage = drawing.hasDrawing ? 'Muy bien. Sigue copiando la cara modelo.' : message;

  return (
    <KidGameShell
      variant="embedded"
      title="Copia la cara"
      subtitle={currentItem.instruccion}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage={startMessage}
      playArea={<FaceDrawingBoard drawing={drawing} />}
      playAreaRef={playAreaRef}
      actions={
        <>
          <button type="button" className="kid-action-btn cog045-clear-btn" onClick={clearDrawing}>
            Borrar dibujo
          </button>
          <button type="button" className="kid-action-btn kid-action-primary" onClick={finishDrawing} disabled={!drawing.hasDrawing || isSavingEvidence}>
            {isSavingEvidence ? 'Guardando evidencia...' : 'Termine mi dibujo'}
          </button>
        </>
      }
      footer="El evaluador revisara si el dibujo imita la cara modelo."
    />
  );
}

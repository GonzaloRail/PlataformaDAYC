import { DrawingCanvas } from '@/minijuegos/shared/DrawingCanvas';
import type { DrawingCanvasState } from '@/minijuegos/shared/useDrawingCanvas';
import { TwoPanelActivityLayout } from '@/minijuegos/shared/TwoPanelActivityLayout';
import { ModelFace } from '@/minijuegos/cognitivo/COGNITIVO_045/components/ModelFace';

interface FaceDrawingBoardProps {
  drawing: DrawingCanvasState;
}

export function FaceDrawingBoard({ drawing }: FaceDrawingBoardProps) {
  return (
    <TwoPanelActivityLayout
      className="cog045-game"
      leftTitle="Mira esta cara"
      left={<ModelFace />}
      rightTitle="Dibuja aqui"
      rightMeta={`${drawing.strokeCount} trazos`}
      right={(
        <DrawingCanvas
          drawing={drawing}
          className="cog045-canvas"
          ariaLabel="Lienzo para copiar la cara modelo"
        />
      )}
    />
  );
}

export default FaceDrawingBoard;

import { DrawingCanvas } from '../../../shared/DrawingCanvas';
import type { DrawingCanvasState } from '../../../shared/useDrawingCanvas';
import { TwoPanelActivityLayout } from '../../../shared/TwoPanelActivityLayout';
import { ModelFace } from './ModelFace';

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

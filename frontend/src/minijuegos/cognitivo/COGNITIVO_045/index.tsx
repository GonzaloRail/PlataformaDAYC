import { useEffect, useState } from 'react';
import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../../../components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '../../../components/minijuegos/shared/useMinijuegoSession';
import { useDrawingCanvas } from '../../shared/useDrawingCanvas';
import { FaceDrawingBoard } from './components/FaceDrawingBoard';
import { COGNITIVO_045_CONFIG } from './config';
import '../../shared/TwoPanelActivityLayout.css';
import './COGNITIVO_045.css';

interface Cognitivo045Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_045({ currentItem, onAnswer }: Cognitivo045Props) {
  const drawing = useDrawingCanvas();
  const [message, setMessage] = useState('Mira la cara de la izquierda y dibujala en el espacio blanco.');
  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

  useEffect(() => {
    setMessage('Mira la cara de la izquierda y dibujala en el espacio blanco.');
    drawing.clearDrawing();
  }, [currentItem.id]);

  const clearDrawing = () => {
    drawing.clearDrawing();
    setMessage('Listo. Puedes empezar de nuevo copiando la cara.');
  };

  const finishDrawing = () => {
    answerOnce('CORRECT', {
      detalle: JSON.stringify({
        activity: COGNITIVO_045_CONFIG.id,
        validation: 'requires_adult_or_psychologist_review',
        completedByChild: true,
        ...drawing.getMetadata(),
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
      actions={
        <>
          <button type="button" className="kid-action-btn cog045-clear-btn" onClick={clearDrawing}>
            Borrar dibujo
          </button>
          <button type="button" className="kid-action-btn kid-action-primary" onClick={finishDrawing} disabled={!drawing.hasDrawing}>
            Termine mi dibujo
          </button>
        </>
      }
      footer="El evaluador revisara si el dibujo imita la cara modelo."
    />
  );
}

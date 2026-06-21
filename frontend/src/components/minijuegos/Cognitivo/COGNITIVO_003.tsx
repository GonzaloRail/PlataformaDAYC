import { useEffect } from 'react';
import { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../KidGameShell';
import FallbackManual from '../../fallback/FallbackManual';
import { buildProgressLabel, useMinijuegoSession } from '../shared/useMinijuegoSession';
import '../../../styles/minijuegos/cognitivo/COGNITIVO_003.css';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

const COGNITIVO_003 = ({ currentItem, onAnswer }: Props) => {
  const { manualMode, setManualMode, answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

  // Al ser un juego 100% de observacion del evaluador, activamos el modo manual.
  useEffect(() => {
    setManualMode(true);
  }, [setManualMode]);

  const playArea = (
    <div className="cognitivo-003-container">
      <div className="blinking-object left-object"></div>
      <div className="blinking-object right-object"></div>
    </div>
  );

  const manualArea = manualMode ? (
    <FallbackManual
      currentItem={currentItem}
      onAnswer={(ans) => answerOnce(ans.resultado, { detalle: `Fallback manual: ${ans.resultado}` })}
    />
  ) : null;

  return (
    <KidGameShell
      title="Mira de aca para alla"
      subtitle="Sigue las luces con tus ojitos"
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage="¡Mira como brillan, de un lado a otro!"
      playArea={playArea}
      footer={manualArea}
    />
  );
};

export default COGNITIVO_003;

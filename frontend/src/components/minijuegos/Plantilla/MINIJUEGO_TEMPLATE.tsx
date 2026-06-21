import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../KidGameShell';
import FallbackManual from '../../fallback/FallbackManual';
import { buildProgressLabel, useMinijuegoSession } from '../shared/useMinijuegoSession';

interface MinijuegoTemplateProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function MINIJUEGO_TEMPLATE({
  currentItem,
  onAnswer,
}: MinijuegoTemplateProps) {
  const { manualMode, setManualMode, answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

  return (
    <KidGameShell
      title="Nombre del minijuego"
      subtitle={currentItem.instruccion}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage="Invita al nino con una frase breve y positiva."
      playArea={
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {!manualMode ? (
            <>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Zona principal de juego</p>
              <p style={{ margin: 0, color: '#5b6b86' }}>
                Reemplaza esta seccion con la interaccion automatica.
              </p>
            </>
          ) : (
            <FallbackManual
              currentItem={currentItem}
              onAnswer={(answer) => answerOnce(answer.resultado, { detalle: 'Fallback manual' })}
            />
          )}
        </div>
      }
      actions={
        !manualMode ? (
          <>
            <button className="kid-action-btn kid-action-primary" onClick={() => answerOnce('CORRECT', { detalle: 'Respuesta automatica correcta' })}>
              Opcion correcta
            </button>
            <button className="kid-action-btn kid-action-secondary" onClick={() => answerOnce('ERROR', { detalle: 'Respuesta automatica incorrecta' })}>
              Opcion incorrecta
            </button>
            <button className="kid-action-btn kid-action-alt" onClick={() => setManualMode(true)}>
              Activar fallback manual
            </button>
          </>
        ) : null
      }
      footer={manualMode ? 'Fallback manual activo para evaluador.' : 'Tip: una sola accion principal por pantalla.'}
    />
  );
}

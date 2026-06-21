import { useState } from 'react';
import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../KidGameShell';
import FallbackManual from '../../fallback/FallbackManual';
import { buildProgressLabel, useMinijuegoSession } from '../shared/useMinijuegoSession';

interface CognitivoOficialTemplateProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_OFICIAL_TEMPLATE({
  currentItem,
  onAnswer,
}: CognitivoOficialTemplateProps) {
  const { manualMode, setManualMode, answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const [estado, setEstado] = useState<'listo' | 'completado' | 'fallo'>('listo');

  const marcarCorrecto = () => {
    setEstado('completado');
    answerOnce('CORRECT', { detalle: 'Logro la actividad' });
  };

  const marcarError = () => {
    setEstado('fallo');
    answerOnce('ERROR', { detalle: 'No logro la actividad' });
  };

  return (
    <KidGameShell
      title="Titulo del juego"
      subtitle={currentItem.instruccion}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage="Mensaje breve para guiar al nino."
      playArea={
        !manualMode ? (
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Aqui va la logica visual del minijuego.</p>
            <p style={{ margin: 0, color: '#5b6b86' }}>
              Estado actual: {estado === 'listo' ? 'Listo' : estado === 'completado' ? 'Completado' : 'No logrado'}
            </p>
          </div>
        ) : (
          <FallbackManual
            currentItem={currentItem}
            onAnswer={(answer) => {
              if (answer.resultado === 'CORRECT') {
                answerOnce('CORRECT', { detalle: 'Fallback manual: Correcto' });
                return;
              }
              answerOnce('ERROR', { detalle: `Fallback manual: ${answer.resultado}` });
            }}
          />
        )
      }
      actions={
        !manualMode ? (
          <>
            <button className="kid-action-btn kid-action-primary" onClick={marcarCorrecto}>
              Correcto
            </button>
            <button className="kid-action-btn kid-action-secondary" onClick={marcarError}>
              Error
            </button>
            <button className="kid-action-btn kid-action-alt" onClick={() => setManualMode(true)}>
              Activar fallback manual
            </button>
          </>
        ) : null
      }
      footer="Usa solo CORRECT o ERROR para responder."
    />
  );
}

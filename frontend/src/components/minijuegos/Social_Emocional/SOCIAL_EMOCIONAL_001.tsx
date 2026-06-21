import { useRef, useState } from 'react';
import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../KidGameShell';

interface SocialEmocional001Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function SOCIAL_EMOCIONAL_001({
  currentItem,
  onAnswer,
}: SocialEmocional001Props) {
  const inicioTiempo = useRef<number>(Date.now());
  const [modoManual, setModoManual] = useState(false);

  const responder = (resultado: 'CORRECT' | 'ERROR', detalle: string) => {
    const tiempo = Date.now() - inicioTiempo.current;
    onAnswer({
      item_id: currentItem.id,
      resultado,
      tiempo_respuesta_ms: tiempo,
      respuesta_usuario: detalle,
    });
  };

  return (
    <KidGameShell
      title="Caritas y emociones"
      subtitle={currentItem.instruccion}
      progressLabel="Pregunta 1"
      mascotMessage="Toca la opcion correcta. Lo estas haciendo genial."
      playArea={
        <div>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>😀 Esta carita se ve...</p>
          <p style={{ margin: '0.45rem 0 0', color: '#5b6b86' }}>
            Elige la opcion que mejor describe la emocion.
          </p>
        </div>
      }
      actions={
        !modoManual ? (
          <>
            <button
              className="kid-action-btn kid-action-primary"
              onClick={() => responder('CORRECT', 'Identifico emocion feliz correctamente')}
            >
              Feliz
            </button>
            <button
              className="kid-action-btn kid-action-secondary"
              onClick={() => responder('ERROR', 'No identifico emocion feliz')}
            >
              Triste
            </button>
            <button className="kid-action-btn kid-action-alt" onClick={() => setModoManual(true)}>
              Cambiar a modo manual
            </button>
          </>
        ) : (
          <>
            <button className="kid-action-btn kid-action-primary" onClick={() => responder('CORRECT', 'Evaluador: Si (1)')}>
              Evaluador: Si (1)
            </button>
            <button className="kid-action-btn kid-action-secondary" onClick={() => responder('ERROR', 'Evaluador: No (0)')}>
              Evaluador: No (0)
            </button>
          </>
        )
      }
      footer={modoManual ? 'Modo manual activo para evaluador.' : 'Consejo: observa y responde con calma.'}
    />
  );
}

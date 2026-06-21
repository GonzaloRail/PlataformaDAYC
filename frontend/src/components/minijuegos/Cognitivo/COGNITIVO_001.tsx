import { useState, useEffect, useRef } from 'react';
import { Answer, Item } from '../../../minijuegos/types';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import KidGameShell from '../KidGameShell';
import FallbackManual from '../../fallback/FallbackManual';
import { buildProgressLabel, useMinijuegoSession } from '../shared/useMinijuegoSession';
import '../../../styles/minijuegos/cognitivo/COGNITIVO_001.css';

export default function COGNITIVO_001({ currentItem, onAnswer }: { currentItem: Item, onAnswer: (answer: Answer) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [falloCamara, setFalloCamara] = useState(false);
  const [estadoJuego, setEstadoJuego] = useState<'cargando' | 'listo' | 'detectando' | 'completado' | 'manual'>('cargando');
  const [mensajeNino, setMensajeNino] = useState('Preparamos la camara para jugar.');
  const { manualMode, setManualMode, answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

  const mandarRespuesta = (resultado: 'CORRECT' | 'ERROR', detalle: string) => answerOnce(resultado, { detalle });

  useEffect(() => {
    setFalloCamara(false);
    setManualMode(false);
    setEstadoJuego('cargando');
    setMensajeNino('Preparamos la camara para jugar.');

    let camera: Camera | null = null;
    let holistic: Holistic | null = null;

    const iniciarIA = async () => {
      if (!videoRef.current) return;

      holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
      });

      holistic.setOptions({
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      setEstadoJuego('listo');
      setMensajeNino('Intenta llevar tu mano a la boca.');

      holistic.onResults((results) => {
        if (results.faceLandmarks && (results.leftHandLandmarks || results.rightHandLandmarks)) {
          setEstadoJuego('detectando');
          setMensajeNino('Muy bien, te estamos viendo. Sigue asi.');
          const boca = results.faceLandmarks[13];
          const mano = results.leftHandLandmarks ? results.leftHandLandmarks[8] : results.rightHandLandmarks[8];

          const distancia = Math.sqrt(
            Math.pow(boca.x - mano.x, 2) + Math.pow(boca.y - mano.y, 2)
          );

          if (distancia < 0.1) {
            setEstadoJuego('completado');
            setMensajeNino('Excelente. Lo lograste.');
            mandarRespuesta('CORRECT', 'MediaPipe detecto la mano en la boca automaticamente');
            camera?.stop();
          }
        }
      });

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && holistic) {
            await holistic.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });

      camera.start().catch(() => {
        setFalloCamara(true);
        setManualMode(true);
        setEstadoJuego('manual');
        setMensajeNino('Usaremos apoyo del evaluador para continuar.');
      });
    };

    iniciarIA();

    return () => {
      camera?.stop();
      holistic?.close();
    };
  }, [currentItem, setManualMode]);

  const etiquetaEstado = {
    cargando: 'Preparando camara',
    listo: 'Camara lista',
    detectando: 'Movimiento detectado',
    completado: 'Actividad lograda',
    manual: 'Modo evaluador',
  }[estadoJuego];

  const colorEstado = {
    cargando: 'cog-status-loading',
    listo: 'cog-status-ready',
    detectando: 'cog-status-detecting',
    completado: 'cog-status-done',
    manual: 'cog-status-manual',
  }[estadoJuego];

  return (
    <KidGameShell
      title="Juego mano a la boca"
      subtitle={currentItem.instruccion}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage={mensajeNino}
      playArea={
        <div className="cog-play-area">
          <div className={`cog-status-pill ${colorEstado}`}>{etiquetaEstado}</div>
          {!manualMode ? (
            <div className="cog-camera-frame">
              <video ref={videoRef} className="cog-video" playsInline autoPlay muted />
            </div>
          ) : (
            <div className="cog-manual-fallback-wrap">
              <FallbackManual
                currentItem={currentItem}
                onAnswer={(answer) => {
                  if (answer.resultado === 'CORRECT') {
                    mandarRespuesta('CORRECT', 'Fallback manual: Correcto');
                    return;
                  }
                  mandarRespuesta('ERROR', `Fallback manual: ${answer.resultado}`);
                }}
              />
            </div>
          )}

          {falloCamara && (
            <p className="cog-soft-alert">No pudimos usar la camara. Continuamos con modo evaluador.</p>
          )}
        </div>
      }
      footer={manualMode ? 'Se activo el registro manual por apoyo del evaluador.' : 'Tip: anima al nino con voz calmada.'}
    />
  );
}

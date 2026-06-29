import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Answer, Item } from '@/minijuegos/types';
import KidGameShell from '@/components/minijuegos/KidGameShell';
import { buildProgressLabel, useMinijuegoSession } from '@/components/minijuegos/shared/useMinijuegoSession';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { useAutoEvidence } from '@/components/evidence/useAutoEvidence';
import { COGNITIVO_047_CONFIG } from '@/minijuegos/cognitivo/COGNITIVO_047/config';
import './COGNITIVO_047.css';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

interface TrialObject {
  id: string;
  label: string;
  emoji: string;
  isIntruder: boolean;
}

interface Trial {
  groupLabel: string;
  intruderLabel: string;
  objects: TrialObject[];
}

const TRIALS: Trial[] = [
  {
    groupLabel: 'Alimentos',
    intruderLabel: 'Animal',
    objects: [
      { id: 'manzana', label: 'Manzana', emoji: '🍎', isIntruder: false },
      { id: 'banana', label: 'Banana', emoji: '🍌', isIntruder: false },
      { id: 'pan', label: 'Pan', emoji: '🍞', isIntruder: false },
      { id: 'perro', label: 'Perro', emoji: '🐶', isIntruder: true },
    ],
  },
  {
    groupLabel: 'Animales',
    intruderLabel: 'Juguete',
    objects: [
      { id: 'gato', label: 'Gato', emoji: '🐱', isIntruder: false },
      { id: 'conejo', label: 'Conejo', emoji: '🐰', isIntruder: false },
      { id: 'vaca', label: 'Vaca', emoji: '🐮', isIntruder: false },
      { id: 'osito', label: 'Osito', emoji: '🧸', isIntruder: true },
    ],
  },
  {
    groupLabel: 'Ropa',
    intruderLabel: 'Comida',
    objects: [
      { id: 'camiseta', label: 'Camiseta', emoji: '👕', isIntruder: false },
      { id: 'pantalon', label: 'Pantalón', emoji: '👖', isIntruder: false },
      { id: 'calcetines', label: 'Calcetines', emoji: '🧦', isIntruder: false },
      { id: 'pizza', label: 'Pizza', emoji: '🍕', isIntruder: true },
    ],
  },
  {
    groupLabel: 'Vehículos',
    intruderLabel: 'Animal',
    objects: [
      { id: 'carro', label: 'Carro', emoji: '🚗', isIntruder: false },
      { id: 'avion', label: 'Avión', emoji: '✈️', isIntruder: false },
      { id: 'bici', label: 'Bicicleta', emoji: '🚲', isIntruder: false },
      { id: 'gallina', label: 'Gallina', emoji: '🐔', isIntruder: true },
    ],
  },
  {
    groupLabel: 'Instrumentos',
    intruderLabel: 'Mueble',
    objects: [
      { id: 'guitarra', label: 'Guitarra', emoji: '🎸', isIntruder: false },
      { id: 'tambor', label: 'Tambor', emoji: '🥁', isIntruder: false },
      { id: 'trompeta', label: 'Trompeta', emoji: '🎺', isIntruder: false },
      { id: 'sofa', label: 'Sofá', emoji: '🛋️', isIntruder: true },
    ],
  },
];

export default function COGNITIVO_047({ currentItem, onAnswer }: Props) {
  const trialRef = useRef<number>(Math.floor(Math.random() * TRIALS.length));
  const trial = TRIALS[trialRef.current];
  const intruder = trial.objects.find((obj) => obj.isIntruder)!;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { answerOnce } = useMinijuegoSession({ currentItem, onAnswer });
  const evidence = useMinigameEvidence();

  const [isComplete, setIsComplete] = useState(false);
  const [lastContext, setLastContext] = useState<Record<string, unknown>>({});

  useAutoEvidence({
    containerRef,
    activityId: COGNITIVO_047_CONFIG.id,
    isComplete,
    contextData: lastContext,
  });

  useEffect(() => {
    evidence.recordEvent('COG047_TRIAL_PRESENTED', {
      trialIndex: trialRef.current,
      groupLabel: trial.groupLabel,
      intruderLabel: trial.intruderLabel,
      intruderId: intruder.id,
      objects: trial.objects.map((o) => ({ id: o.id, label: o.label, isIntruder: o.isIntruder })),
    });
  }, [evidence, trial.groupLabel, trial.intruderLabel, trial.objects, intruder.id]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSelect = useCallback(
    (objectId: string) => {
      if (result !== null) return;

      const selectedObject = trial.objects.find((obj) => obj.id === objectId);
      if (!selectedObject) return;

      const isCorrect = selectedObject.isIntruder;

      setSelectedId(objectId);
      setResult(isCorrect ? 'correct' : 'incorrect');

      evidence.recordEvent('COG047_OBJECT_SELECTED', {
        trialIndex: trialRef.current,
        selectedId: objectId,
        selectedLabel: selectedObject.label,
        isIntruder: selectedObject.isIntruder,
        isCorrect,
        intruderId: intruder.id,
      });

      timerRef.current = setTimeout(() => {
        const outcome = isCorrect ? 'CORRECT' as const : 'ERROR' as const;

        evidence.recordLog({
          activity: COGNITIVO_047_CONFIG.id,
          event: 'INTRUDER_IDENTIFICATION',
          validation: 'auto',
          completedByChild: true,
          trialIndex: trialRef.current,
          groupLabel: trial.groupLabel,
          intruderLabel: trial.intruderLabel,
          selectedId: objectId,
          selectedLabel: selectedObject.label,
          isCorrect,
        });

        setLastContext({
          trialIndex: trialRef.current,
          groupLabel: trial.groupLabel,
          intruderId: intruder.id,
          selectedId: objectId,
          isCorrect,
        });
        setIsComplete(true);

        answerOnce(outcome, {
          detalle: JSON.stringify({
            activity: COGNITIVO_047_CONFIG.id,
            validation: 'auto',
            completedByChild: true,
            trialIndex: trialRef.current,
            grupo: trial.groupLabel,
            objetoIntruso: { id: intruder.id, label: intruder.label, emoji: intruder.emoji },
            objetoSeleccionado: { id: objectId, label: selectedObject.label, emoji: selectedObject.emoji },
            acierto: isCorrect,
          }),
        });
      }, 1200);
    },
    [result, trial, intruder, answerOnce, evidence],
  );

  const cardClass = (objectId: string) => {
    const classes = ['cog047-card'];
    if (result !== null) {
      classes.push('is-disabled');
      if (objectId === selectedId) {
        classes.push(result === 'correct' ? 'is-correct' : 'is-incorrect');
      }
    }
    return classes.join(' ');
  };

  const playArea = useMemo(
    () => (
      <div className="cog047-container" ref={containerRef}>
        <div className="cog047-header" role="heading" aria-level={2}>
          <span className="cog047-header-prompt">
            Toca el que no pertenece al grupo
          </span>
          <span className="cog047-header-hint">
            Tres son {trial.groupLabel.toLowerCase()}, uno es distinto
          </span>
        </div>

        {result && (
          <div
            className={`cog047-result ${result === 'correct' ? 'is-success' : 'is-error'}`}
            role="alert"
          >
            {result === 'correct' ? '¡Muy bien!' : '¡Uy! Ese pertenece al grupo.'}
          </div>
        )}

        <div className="cog047-grid" role="group" aria-label="Objetos para identificar el intruso">
          {trial.objects.map((obj) => (
            <button
              key={obj.id}
              type="button"
              className={cardClass(obj.id)}
              onClick={() => handleSelect(obj.id)}
              disabled={result !== null}
              aria-label={`${obj.label}${obj.isIntruder ? '' : ''}`}
            >
              <span className="cog047-card-emoji" aria-hidden="true">
                {obj.emoji}
              </span>
              <span className="cog047-card-label">{obj.label}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    [trial, result, handleSelect, cardClass],
  );

  return (
    <KidGameShell
      variant="embedded"
      title="¡Busca el intruso!"
      subtitle={currentItem.instruccion || 'Toca el objeto que no pertenece al grupo.'}
      progressLabel={buildProgressLabel(1, 1)}
      mascotMessage="Mira bien los objetos. Tres se parecen, uno es diferente. ¡Encuéntralo!"
      playArea={playArea}
      footer="Actividad auto-validable. El sistema registra el resultado."
    />
  );
}

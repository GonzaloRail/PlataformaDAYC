import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Modal } from '@/components/ui';
import {
  createMemoryEvidenceSink,
  revokeLabEvidenceRecords,
} from '@/components/evidence/EvidenceSink';
import type { LabEvidenceRecord } from '@/components/evidence/EvidenceSink';
import { normalizeEvidence } from '@/components/evidence/EvidenceNormalizer';
import { EvidenceControlPanel } from '@/components/evidence/EvidenceControlPanel';
import { MediaPermissionProvider } from '@/components/evidence/MediaPermissionProvider';
import { MediaPermissionPanel } from '@/components/evidence/MediaPermissionPanel';
import { EvidenceCollection } from '@/components/evidence/EvidenceCollection';
import { MinigameEvidenceProvider } from '@/components/evidence/MinigameEvidenceProvider';
import { getEvidenceDefinition } from '@/components/evidence/EvidenceRegistry';
import type { EvaluationTask } from '@/types';
import type { Answer, Item } from '@/minijuegos/types';
import {
  AbstractAttributeGame,
  type AbstractCriterion,
  type AbstractItem,
} from '@/minijuegos/shared/AbstractAttributeGame';
import { ArithmeticGame } from '@/minijuegos/shared/ArithmeticGame';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { CoinsGame, type Coin } from '@/minijuegos/shared/CoinsGame';
import { ComparisonGame } from '@/minijuegos/shared/ComparisonGame';
import { CountingGame } from '@/minijuegos/shared/CountingGame';
import { DrawingGame } from '@/minijuegos/shared/DrawingGame';
import { FractionGame } from '@/minijuegos/shared/FractionGame';
import { MatchingGame } from '@/minijuegos/shared/MatchingGame';
import { NumberMatchGame } from '@/minijuegos/shared/NumberMatchGame';
import { NumberSequenceGame } from '@/minijuegos/shared/NumberSequenceGame';
import { OrdinalPositionGame } from '@/minijuegos/shared/OrdinalPositionGame';
import { OrderingGame } from '@/minijuegos/shared/OrderingGame';
import { PersonalInfoGame } from '@/minijuegos/shared/PersonalInfoGame';
import { ReadingDirectionGame } from '@/minijuegos/shared/ReadingDirectionGame';
import { SequenceStoryGame, type StoryScene } from '@/minijuegos/shared/SequenceStoryGame';
import { StoryNarrationGame, type StoryPanel } from '@/minijuegos/shared/StoryNarrationGame';
import { VerbalResponseGame } from '@/minijuegos/shared/VerbalResponseGame';
import { WeekDaysGame } from '@/minijuegos/shared/WeekDaysGame';
import './LabPrototypes.css';

interface PrototypeDef {
  id: string;
  name: string;
  category: string;
  description: string;
  evidence: string[];
}

const PROTOTYPES: PrototypeDef[] = [
  { id: 'matching', name: 'MatchingGame', category: 'Matching', description: 'Drag & drop de figuras a zonas por matchKey.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'classification', name: 'ClassificationGame', category: 'Classification', description: 'Bandeja + N cajas, un criterio o multicriterio.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'ordering', name: 'OrderingGame', category: 'Ordering', description: 'Ordenar por tamano o numero.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'counting', name: 'CountingGame', category: 'Counting', description: 'Contar objetos y elegir el numero.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'numbermatch', name: 'NumberMatchGame', category: 'NumberMatch', description: 'Vincular grupo de objetos con numero.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'numbersequence', name: 'NumberSequenceGame', category: 'NumberSequence', description: 'Completar huecos en secuencias numericas.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'comparison', name: 'ComparisonGame', category: 'Comparison', description: 'Mas / menos / igual (cantidad o numero).', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'ordinal', name: 'OrdinalPositionGame', category: 'Ordinal', description: 'Primero / al medio / al ultimo.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'fraction', name: 'FractionGame', category: 'Fraction', description: 'Senalar mitad / completo.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'abstract', name: 'AbstractAttributeGame', category: 'Abstract', description: 'Clasificar por atributo abstracto.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'sequencestory', name: 'SequenceStoryGame', category: 'SequenceStory', description: 'Ordenar 3 escenas para formar historia.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'narration', name: 'StoryNarrationGame', category: 'Narration', description: 'Paneles + audio del nino.', evidence: ['LOG', 'AUDIO'] },
  { id: 'verbal', name: 'VerbalResponseGame', category: 'Verbal', description: 'Shell para respuesta verbal abierta.', evidence: ['LOG', 'AUDIO'] },
  { id: 'drawing', name: 'DrawingGame', category: 'Drawing', description: 'Canvas libre con consigna.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'arithmetic', name: 'ArithmeticGame', category: 'Arithmetic', description: 'Suma / resta de un digito.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'coins', name: 'CoinsGame', category: 'Coins', description: 'Moneda + nombre del nino.', evidence: ['LOG', 'AUDIO'] },
  { id: 'weekdays', name: 'WeekDaysGame', category: 'WeekDays', description: 'Dias de la semana (verbal u orden).', evidence: ['LOG', 'AUDIO'] },
  { id: 'reading', name: 'ReadingDirectionGame', category: 'ReadingDirection', description: 'Toca donde se empieza + flechas.', evidence: ['LOG', 'SCREENSHOT'] },
  { id: 'personal', name: 'PersonalInfoGame', category: 'PersonalInfo', description: 'Wrapper de VerbalResponseGame.', evidence: ['LOG', 'AUDIO'] },
];

const buildItem = (id: string): Item => ({
  id,
  area: 'COGNITIVO' as never,
  nivel: 0,
  instruccion: 'Consigna del prototipo',
});

const buildTask = (id: string, tipos: string[]): EvaluationTask => ({
  item_id: id,
  numero_item: 0,
  minijuego: id,
  pregunta: 'Prototipo',
  instrucciones: 'Consigna del prototipo',
  tipo_interaction: 'mixed',
  evaluacion_id: 'lab-prototype',
  area: 'COGNITIVO',
  area_index: 0,
  current_task: id,
  modalidad: 'INTERACTIVO_ASISTIDO',
  pantalla_nino: 'ACTIVIDAD',
  actividad_digital: id,
  requiere_evidencia: true,
  tipos_evidencia: tipos,
  auto_validable: false,
  requiere_revision_psicologo: true,
  validation_mode: 'ADULT_REQUIRED',
  estado_item: 'PENDING',
  estado_evaluacion: 'IN_PROGRESS',
});

const PrototypeStage: React.FC<{ prototype: PrototypeDef; onAnswer: (a: Answer) => void; runKey: number }> = ({
  prototype,
  onAnswer,
  runKey,
}) => {
  const item = useMemo(() => buildItem(prototype.id), [prototype.id]);
  const handler = onAnswer;
  void runKey;

  switch (prototype.id) {
    case 'matching':
      return (
        <MatchingGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_MATCHING"
          title="Empareja formas"
          instruction="Arrastra cada figura a su zona."
          items={[
            { id: 'circulo', label: 'Circulo', emoji: '⚪', zoneId: 'circulos' },
            { id: 'cuadrado', label: 'Cuadrado', emoji: '⬛', zoneId: 'cuadrados' },
            { id: 'triangulo', label: 'Triangulo', emoji: '🔺', zoneId: 'triangulos' },
            { id: 'c2', label: 'Cuadrado', emoji: '🟦', zoneId: 'cuadrados' },
            { id: 't2', label: 'Triangulo', emoji: '🔻', zoneId: 'triangulos' },
          ]}
          zones={[
            { id: 'circulos', label: 'Circulos', emoji: '⚪' },
            { id: 'cuadrados', label: 'Cuadrados', emoji: '⬛' },
            { id: 'triangulos', label: 'Triangulos', emoji: '🔺' },
          ]}
        />
      );
    case 'classification':
      return (
        <ClassificationGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_CLASSIFICATION"
          title="Clasifica por color"
          instruction="Pon cada objeto en su caja por color."
          modo="un_criterio"
          items={[
            { id: 'r1', label: 'Rojo', emoji: '🟥', zoneId: 'rojo' },
            { id: 'a1', label: 'Azul', emoji: '🟦', zoneId: 'azul' },
            { id: 'v1', label: 'Verde', emoji: '🟩', zoneId: 'verde' },
            { id: 'r2', label: 'Rojo', emoji: '🍎', zoneId: 'rojo' },
            { id: 'a2', label: 'Azul', emoji: '🫐', zoneId: 'azul' },
            { id: 'v2', label: 'Verde', emoji: '🥦', zoneId: 'verde' },
          ]}
          zones={[
            { id: 'rojo', label: 'Rojo', emoji: '🟥' },
            { id: 'azul', label: 'Azul', emoji: '🟦' },
            { id: 'verde', label: 'Verde', emoji: '🟩' },
          ]}
        />
      );
    case 'ordering':
      return (
        <OrderingGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_ORDERING"
          title="Ordena por tamano"
          instruction="Del mas chico al mas grande."
          direction="asc"
          kind="size"
          items={[
            { id: 's', label: 'Pequeno', emoji: '🐭', value: 1 },
            { id: 'm', label: 'Mediano', emoji: '🐕', value: 2 },
            { id: 'l', label: 'Grande', emoji: '🐘', value: 3 },
            { id: 'xl', label: 'Enorme', emoji: '🐋', value: 4 },
          ]}
        />
      );
    case 'counting':
      return (
        <CountingGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_COUNTING"
          title="Cuenta objetos"
          instruction="Cuenta y elige el numero correcto."
          rounds={[
            { key: 'r1', emoji: '⭐', count: 3 },
            { key: 'r2', emoji: '🌸', count: 7 },
            { key: 'r3', emoji: '🍓', count: 5 },
          ]}
          optionsPerRound={4}
        />
      );
    case 'numbermatch':
      return (
        <NumberMatchGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_NUMBERMATCH"
          title="Empareja cantidad con numero"
          instruction="Arrastra el numero a cada grupo."
          numberFormat="digit"
          groups={[
            { id: 'g1', emoji: '🐟', count: 3 },
            { id: 'g2', emoji: '🦋', count: 5 },
            { id: 'g3', emoji: '🐞', count: 2 },
          ]}
        />
      );
    case 'numbersequence':
      return (
        <NumberSequenceGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_NUMBERSQ"
          title="Completa la secuencia"
          instruction="Que numero va antes y despues?"
          center={14}
          direction="both"
          optionsPerQuestion={4}
        />
      );
    case 'comparison':
      return (
        <ComparisonGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_COMPARISON"
          title="Mas, menos o igual"
          instruction="Compara los dos grupos."
          mode="cantidad"
          rounds={[
            {
              key: 'r1',
              left: { emoji: '🍎', count: 4 },
              right: { emoji: '🍌', count: 7 },
              correct: 'mas',
            },
            {
              key: 'r2',
              left: { emoji: '🌟', count: 6 },
              right: { emoji: '🌙', count: 6 },
              correct: 'igual',
            },
            {
              key: 'r3',
              left: { emoji: '🐶', count: 3 },
              right: { emoji: '🐱', count: 8 },
              correct: 'menos',
            },
          ]}
        />
      );
    case 'ordinal':
      return (
        <OrdinalPositionGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_ORDINAL"
          title="Primero, al medio, al ultimo"
          instruction="Toca el que se pide."
          rounds={[
            {
              id: 'r1',
              key: 'r1',
              question: 'primero',
              items: [
                { id: 'a', label: 'Vagon 1', emoji: '🚃' },
                { id: 'b', label: 'Vagon 2', emoji: '🚃' },
                { id: 'c', label: 'Vagon 3', emoji: '🚃' },
              ],
              correctItemId: 'a',
            },
            {
              id: 'r2',
              key: 'r2',
              question: 'medio',
              items: [
                { id: 'a', label: 'Perro', emoji: '🐶' },
                { id: 'b', label: 'Gato', emoji: '🐱' },
                { id: 'c', label: 'Conejo', emoji: '🐰' },
              ],
              correctItemId: 'b',
            },
            {
              id: 'r3',
              key: 'r3',
              question: 'ultimo',
              items: [
                { id: 'a', label: 'Manzana', emoji: '🍎' },
                { id: 'b', label: 'Pera', emoji: '🍐' },
                { id: 'c', label: 'Naranja', emoji: '🍊' },
              ],
              correctItemId: 'c',
            },
          ]}
        />
      );
    case 'fraction':
      return (
        <FractionGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_FRACTION"
          title="Mitad o completo"
          instruction="Toca los que estan a la mitad."
          question="cual_medio"
          shapes={[
            { id: 's1', label: 'Manzana completa', emoji: '🍎', state: 'completo' },
            { id: 's2', label: 'Media manzana', emoji: '🍏', state: 'medio' },
            { id: 's3', label: 'Circulo completo', emoji: '⚫', state: 'completo' },
            { id: 's4', label: 'Medio circulo', emoji: '◐', state: 'medio' },
          ]}
        />
      );
    case 'abstract': {
      const items: AbstractItem[] = [
        { id: 'perro', label: 'Perro', emoji: '🐶', attribute: 'vivo' },
        { id: 'gato', label: 'Gato', emoji: '🐱', attribute: 'vivo' },
        { id: 'piedra', label: 'Piedra', emoji: '🪨', attribute: 'no_vivo' },
        { id: 'robot', label: 'Robot', emoji: '🤖', attribute: 'no_vivo' },
      ];
      const criteria: AbstractCriterion[] = [
        { id: 'vivo', label: 'Vivo', emoji: '🌱' },
        { id: 'no_vivo', label: 'No vivo', emoji: '🪨' },
      ];
      return (
        <AbstractAttributeGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_ABSTRACT"
          title="Vivo o no vivo"
          instruction="Clasifica segun si esta vivo o no."
          items={items}
          criteria={criteria}
          matchKey={(it, c) => it.attribute === c.id}
        />
      );
    }
    case 'sequencestory': {
      const scenes: StoryScene[] = [
        { id: 's1', order: 1, emoji: '🌱', caption: 'Semilla' },
        { id: 's2', order: 2, emoji: '🌿', caption: 'Brote' },
        { id: 's3', order: 3, emoji: '🌳', caption: 'Arbol' },
      ];
      return (
        <SequenceStoryGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_SEQSTORY"
          title="Cuenta la historia"
          instruction="Ordena las escenas."
          scenes={scenes}
        />
      );
    }
    case 'narration': {
      const panels: StoryPanel[] = [
        { id: 'p1', emoji: '🐰', caption: 'Conejo caminando' },
        { id: 'p2', emoji: '🥕', caption: 'Encuentra zanahoria' },
        { id: 'p3', emoji: '😊', caption: 'Conejo feliz' },
      ];
      return (
        <StoryNarrationGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_NARRATION"
          title="Narra la historia"
          instruction="Cuenta lo que pasa en las imagenes."
          prompt="Narra lo que ves."
          captureAudio
          panels={panels}
        />
      );
    }
    case 'verbal':
      return (
        <VerbalResponseGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_VERBAL"
          title="Respuesta verbal"
          instruction="El nino responde en voz alta."
          prompt="Cuenta hasta 5."
          captureAudio
          panelType="counter"
        />
      );
    case 'drawing':
      return (
        <DrawingGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_DRAWING"
          title="Dibuja una casa"
          instruction="Usa el lapiz para dibujar."
          consigna="Dibuja una casa"
          mostrarModelo={false}
          background="blank"
        />
      );
    case 'arithmetic':
      return (
        <ArithmeticGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_ARITHMETIC"
          title="Sumas y restas"
          instruction="Resuelve y elige la respuesta."
          rounds={[
            { id: 'r1', key: 'r1', left: 3, right: 2, operation: '+', answer: 5 },
            { id: 'r2', key: 'r2', left: 7, right: 4, operation: '-', answer: 3 },
            { id: 'r3', key: 'r3', left: 5, right: 4, operation: '+', answer: 9 },
          ]}
        />
      );
    case 'coins': {
      const coins: Coin[] = [
        { id: 'c1', value: 1, label: 'Moneda de 1', image: '🪙', description: 'Moneda pequena' },
        { id: 'c2', value: 5, label: 'Moneda de 5', image: '🪙', description: 'Moneda mediana' },
        { id: 'c3', value: 10, label: 'Moneda de 10', image: '🪙', description: 'Moneda grande' },
      ];
      return (
        <CoinsGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_COINS"
          title="Nombra las monedas"
          instruction="Mira la moneda y di su nombre."
          prompt="Como se llama esta moneda?"
          coins={coins}
        />
      );
    }
    case 'weekdays':
      return (
        <WeekDaysGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_WEEKDAYS"
          title="Dias de la semana"
          instruction="Dime los dias en orden."
          prompt="Nombra los dias de la semana."
          mode="verbal"
          captureAudio
        />
      );
    case 'reading':
      return (
        <ReadingDirectionGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_READING"
          title="Direccion de lectura"
          instruction="Toca donde se empieza a leer."
          prompt="Donde se empieza?"
          rows={3}
          cols={4}
        />
      );
    case 'personal':
      return (
        <PersonalInfoGame
          currentItem={item}
          onAnswer={handler}
          activityId="LAB_PERSONAL"
          title="Informacion personal"
          instruction="El nino responde verbalmente."
          variant="general"
          captureAudio
        />
      );
    default:
      return <p>Prototipo no encontrado.</p>;
  }
};

export const LabPrototypes: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<Record<string, unknown> | null>(null);
  const [selectedEvidenceTypes, setSelectedEvidenceTypes] = useState<string[]>(['LOG', 'SCREENSHOT']);
  const [labEvidence, setLabEvidence] = useState<LabEvidenceRecord[]>([]);
  const [lastEvidenceAt, setLastEvidenceAt] = useState<number | null>(null);
  const labEvidenceRef = useRef<LabEvidenceRecord[]>([]);
  const [runKey, setRunKey] = useState(0);

  const selected = open ? PROTOTYPES.find((p) => p.id === open) : null;

  const memorySink = useMemo(
    () =>
      createMemoryEvidenceSink((record) => {
        setLabEvidence((current) => [record, ...current]);
        setLastEvidenceAt(Date.now());
      }),
    [],
  );

  useEffect(() => {
    labEvidenceRef.current = labEvidence;
  }, [labEvidence]);

  useEffect(
    () => () => {
      revokeLabEvidenceRecords(labEvidenceRef.current);
    },
    [],
  );

  const handleAnswer = useCallback((answer: Answer) => {
    setLastAnswer(answer as unknown as Record<string, unknown>);
  }, []);

  const openPrototype = (id: string) => {
    setOpen(id);
    setLastAnswer(null);
    revokeLabEvidenceRecords(labEvidenceRef.current);
    setLabEvidence([]);
    setRunKey((current) => current + 1);
    const proto = PROTOTYPES.find((p) => p.id === id);
    if (proto) {
      setSelectedEvidenceTypes(proto.evidence);
    }
  };

  const resetRun = () => {
    setLastAnswer(null);
    revokeLabEvidenceRecords(labEvidenceRef.current);
    setLabEvidence([]);
    setRunKey((current) => current + 1);
  };

  const pendingEvidenceTypes = selectedEvidenceTypes.filter((type) => {
    if (type === 'TIME_EVENT') return !labEvidence.some((record) => record.type === 'TIME_EVENT' || record.type === 'EVENT');
    return !labEvidence.some((record) => record.type === type);
  });

  const task = selected ? buildTask(selected.id, selectedEvidenceTypes) : null;

  return (
    <div className="lab-prototypes">
      <div className="lab-prototypes-header">
        <div>
          <h3>Laboratorio de prototipos</h3>
          <p>
            {PROTOTYPES.length} prototipos reusables. Cada uno se monta con datos dummy para
            validar la mecanica sin tener que registrar un item en el catalogo.
          </p>
        </div>
      </div>

      <div className="lab-prototypes-grid">
        {PROTOTYPES.map((proto) => (
          <Card
            key={proto.id}
            className="lab-prototype-row lab-prototype-row-clickable"
            variant="elevated"
            padding="sm"
            onClick={() => openPrototype(proto.id)}
          >
            <div className="lab-prototype-row-main">
              <div className="lab-prototype-row-top">
                <span className="lab-prototype-category">{proto.category}</span>
                <span className="lab-prototype-status">Listo</span>
              </div>
              <h4>{proto.name}</h4>
              <p>{proto.description}</p>
              <code>{proto.id}</code>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!open} onClose={() => setOpen(null)} title="" size="full">
        {open && selected && task ? (
          <MediaPermissionProvider>
            <MinigameEvidenceProvider task={task} sink={memorySink}>
              <div className="lab-prototype-modal">
                <aside className="lab-prototype-sidebar">
                  <div className="lab-panel">
                    <p className="lab-kicker">Sandbox local</p>
                    <h3>{selected.name}</h3>
                    <code>{selected.id}</code>
                    <p>Datos dummy. Las evidencias se capturan en memoria.</p>
                  </div>

                  <div className="lab-panel">
                    <div className="lab-panel-header">
                      <button type="button" onClick={resetRun}>Reiniciar</button>
                    </div>
                    <EvidenceControlPanel
                      selectedTypes={selectedEvidenceTypes}
                      onChange={setSelectedEvidenceTypes}
                      description="Selecciona que evidencias se capturan."
                    />
                    <div className="lab-media-permission">
                      <MediaPermissionPanel evidenceTypes={selectedEvidenceTypes} />
                    </div>
                  </div>

                  {lastAnswer ? (
                    <div className="lab-panel">
                      <strong>Respuesta emitida</strong>
                      <pre className="lab-json">{JSON.stringify(lastAnswer, null, 2)}</pre>
                    </div>
                  ) : null}

                  <div className="lab-panel lab-evidence-panel">
                    <div className="lab-panel-header">
                      <strong>Evidencias capturadas</strong>
                      <span className="lab-evidence-count">{labEvidence.length}</span>
                    </div>
                    {lastEvidenceAt ? (
                      <p className="lab-last-update">
                        Ultima captura: hace{' '}
                        {Math.max(0, Math.floor((Date.now() - lastEvidenceAt) / 1000))}s
                      </p>
                    ) : null}
                    {labEvidence.length === 0 ? (
                      <p className="lab-empty">Aun no hay evidencias capturadas.</p>
                    ) : (
                      <EvidenceCollection evidences={labEvidence.map(normalizeEvidence)} compact />
                    )}
                    {pendingEvidenceTypes.length > 0 ? (
                      <div className="lab-pending-evidence">
                        <strong>Pendientes o procesando</strong>
                        {pendingEvidenceTypes.map((type) => {
                          const definition = getEvidenceDefinition(type);
                          return (
                            <div key={type} className="lab-pending-row">
                              <div className="lab-pending-row-head">
                                <div className="lab-pending-dot" aria-hidden="true" />
                                <span>{definition.shortLabel}</span>
                                <span className="lab-pending-status">capturando</span>
                              </div>
                              <p>{definition.label} se mostrara cuando la actividad la genere.</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </aside>

                <div className="lab-prototype-stage">
                  <div className="lab-prototype-stage-inner" key={`${open}-${runKey}`}>
                    <PrototypeStage
                      prototype={selected}
                      onAnswer={handleAnswer}
                      runKey={runKey}
                    />
                  </div>
                </div>
              </div>
            </MinigameEvidenceProvider>
          </MediaPermissionProvider>
        ) : null}
      </Modal>
    </div>
  );
};

export default LabPrototypes;

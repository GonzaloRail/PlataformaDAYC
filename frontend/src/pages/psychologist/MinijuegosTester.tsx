import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Card } from '@/components/ui';
import { getMinijuego, getMinijuegosCatalog } from '@/components/minijuegos/registry';
import { DigitalActivityExperience } from '@/components/child/DigitalActivityExperience';
import { createMemoryEvidenceSink, revokeLabEvidenceRecords } from '@/components/evidence/EvidenceSink';
import type { LabEvidenceRecord } from '@/components/evidence/EvidenceSink';
import { normalizeEvidence } from '@/components/evidence/EvidenceNormalizer';
import { EvidenceControlPanel } from '@/components/evidence/EvidenceControlPanel';
import { MediaPermissionProvider } from '@/components/evidence/MediaPermissionProvider';
import { MediaPermissionPanel } from '@/components/evidence/MediaPermissionPanel';
import { EvidenceCollection } from '@/components/evidence/EvidenceCollection';
import { getEvidenceDefinition } from '@/components/evidence/EvidenceRegistry';
import { getEvidencePolicy, updateEvidencePolicy } from '@/services/evidencePoliciesApi';
import type { EvaluationTask } from '@/types';
import '../child/EvaluationSession.css';
import './MinijuegosTester.css';

const buildPreviewTask = (id: string, area: string, nombre: string, tiposEvidencia: string[]): EvaluationTask => {
  const idParts = id.split('_');
  const itemNumber = Number(idParts[idParts.length - 1]);
  const pregunta = nombre;

  return {
    item_id: id,
    numero_item: Number.isFinite(itemNumber) ? itemNumber : undefined,
    minijuego: id,
    pregunta,
    instrucciones: pregunta,
    tipo_interaction: 'mixed',
    evaluacion_id: 'preview-evaluacion',
    area,
    area_index: 0,
    current_task: id,
    modalidad: 'INTERACTIVO_ASISTIDO',
    pantalla_nino: 'ACTIVIDAD',
    actividad_digital: id,
    requiere_evidencia: true,
    tipos_evidencia: tiposEvidencia,
    auto_validable: false,
    requiere_revision_psicologo: true,
    validation_mode: 'ADULT_REQUIRED',
    estado_item: 'PENDING',
    estado_evaluacion: 'IN_PROGRESS',
  };
};

export const MinijuegosTester: React.FC = () => {
  const minijuegos = getMinijuegosCatalog();
  const areas = ['TODOS', ...Array.from(new Set(minijuegos.map((m) => m.area)))];
  const [selectedArea, setSelectedArea] = useState('TODOS');
  const [open, setOpen] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<Record<string, unknown> | null>(null);
  const [selectedEvidenceTypes, setSelectedEvidenceTypes] = useState<string[]>(['LOG', 'SCREENSHOT']);
  const [labEvidence, setLabEvidence] = useState<LabEvidenceRecord[]>([]);
  const [lastEvidenceAt, setLastEvidenceAt] = useState<number | null>(null);
  const labEvidenceRef = useRef<LabEvidenceRecord[]>([]);
  const [runKey, setRunKey] = useState(0);

  const filteredMinijuegos = minijuegos.filter((minijuego) => {
    const byArea = selectedArea === 'TODOS' || minijuego.area === selectedArea;
    return byArea;
  });

  const selected = open ? getMinijuego(open) : null;
  const selectedMeta = minijuegos.find((minijuego) => minijuego.id === open);
  const previewTask = open && selectedMeta ? buildPreviewTask(open, selectedMeta.area, selectedMeta.nombre, selectedEvidenceTypes) : null;
  const pendingEvidenceTypes = selectedEvidenceTypes.filter((type) => {
    if (type === 'TIME_EVENT') return !labEvidence.some((record) => record.type === 'TIME_EVENT' || record.type === 'EVENT');
    return !labEvidence.some((record) => record.type === type);
  });
  const memorySink = useMemo(() => createMemoryEvidenceSink((record) => {
    setLabEvidence((current) => [record, ...current]);
    setLastEvidenceAt(Date.now());
  }), []);

  useEffect(() => {
    labEvidenceRef.current = labEvidence;
  }, [labEvidence]);

  useEffect(() => {
    return () => revokeLabEvidenceRecords(labEvidenceRef.current);
  }, []);

  const [, forceTick] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => forceTick((current) => current + 1), 250);
    return () => window.clearInterval(interval);
  }, []);

  const openMinijuego = useCallback(async (id: string) => {
    setOpen(id);
    setLastAnswer(null);
    revokeLabEvidenceRecords(labEvidenceRef.current);
    setLabEvidence([]);
    setRunKey((current) => current + 1);
    try {
      const policy = await getEvidencePolicy(id);
      if (policy.is_override && policy.evidence_types.length > 0) {
        setSelectedEvidenceTypes(policy.evidence_types);
      } else {
        setSelectedEvidenceTypes(['LOG']);
      }
    } catch {
      setSelectedEvidenceTypes(['LOG']);
    }
  }, []);

  const resetRun = () => {
    setLastAnswer(null);
    revokeLabEvidenceRecords(labEvidenceRef.current);
    setLabEvidence([]);
    setRunKey((current) => current + 1);
  };

  const updateEvidenceTypes = (types: string[]) => {
    setSelectedEvidenceTypes(types);
    if (open) {
      updateEvidencePolicy(open, types).catch(() => {});
    }
  };

  return (
    <div className="minijuegos-tester">
      <div className="minijuegos-tester-header">
        <div>
          <h3>Laboratorio de minijuegos</h3>
          <p>{minijuegos.length} actividades registradas. Prueba juegos, respuestas y evidencias en sandbox local.</p>
        </div>
      </div>

      <div className="minijuegos-toolbar">
        <div className="area-tabs">
          {areas.map((area) => (
            <button
              key={area}
              className={`area-tab ${selectedArea === area ? 'is-active' : ''}`}
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="minijuegos-list">
          {filteredMinijuegos.map((minijuego) => {
            const info = getMinijuego(minijuego.id);
            return (
              <Card
                key={minijuego.id}
                className="minijuego-row minijuego-row-clickable"
                variant={minijuego.estado === 'ready' ? 'elevated' : 'default'}
                padding="sm"
                onClick={() => {
                  openMinijuego(minijuego.id);
                }}
              >
                <div className="minijuego-row-main">
                  <div className="minijuego-row-top">
                    <span className="minijuego-area">{minijuego.area}</span>
                    <span className={`minijuego-status minijuego-status-${minijuego.estado}`}>
                      {minijuego.estado === 'ready' ? 'Listo' : 'Pendiente'}
                    </span>
                  </div>
                  <h4>{minijuego.nombre}</h4>
                  <p>{minijuego.descripcion}</p>
                  <code>{minijuego.id}</code>
                  {!info && <span className="minijuego-warning">No encontrado</span>}
                </div>
                <div className="minijuego-row-actions" aria-hidden="true" />
              </Card>
            );
          })}
      </div>

      <Modal
        isOpen={!!open}
        onClose={() => setOpen(null)}
        title=""
        size="full"
      >
        {open && selected && previewTask && selectedMeta && (
          <MediaPermissionProvider>
          <div className="minijuego-test-modal">
            <aside className="minijuego-lab-sidebar">
              <div className="lab-panel">
                <p className="lab-kicker">Sandbox local</p>
                <h3>{selectedMeta.nombre}</h3>
                <code>{selectedMeta.id}</code>
                <p>Las evidencias se capturan en memoria para inspeccionarlas sin crear una evaluación real.</p>
              </div>

              <div className="lab-panel">
                <div className="lab-panel-header">
                  <button type="button" onClick={resetRun}>Reiniciar</button>
                </div>
                <EvidenceControlPanel
                  selectedTypes={selectedEvidenceTypes}
                  onChange={updateEvidenceTypes}
                  description="Selecciona qué evidencias se capturan durante esta prueba sandbox."
                />
                <div className="lab-media-permission">
                  <MediaPermissionPanel evidenceTypes={selectedEvidenceTypes} />
                </div>
              </div>

              {lastAnswer && (
                <div className="lab-panel">
                  <strong>Respuesta emitida</strong>
                  <pre className="lab-json">{JSON.stringify(lastAnswer, null, 2)}</pre>
                </div>
              )}

              <div className="lab-panel lab-evidence-panel">
                <div className="lab-panel-header">
                  <strong>Evidencias capturadas</strong>
                  <span className="lab-evidence-count">{labEvidence.length}</span>
                </div>
                {lastEvidenceAt && (
                  <p className="lab-last-update">
                    Última captura: hace{' '}
                    {Math.max(0, Math.floor((Date.now() - lastEvidenceAt) / 1000))}s
                  </p>
                )}
                {labEvidence.length === 0 ? (
                  <p className="lab-empty">Aun no hay evidencias capturadas. Las evidencias seleccionadas apareceran aqui al registrarse.</p>
                ) : (
                  <EvidenceCollection evidences={labEvidence.map(normalizeEvidence)} compact />
                )}
                {pendingEvidenceTypes.length > 0 && (
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
                          <div className="lab-pending-bar" aria-hidden="true">
                            <div className="lab-pending-bar-fill" />
                          </div>
                          <p>{definition.label} se mostrara cuando la actividad la genere o termine de procesarse.</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            <div className="minijuego-test-stage">
              <main className="evaluation-session child-only-session evaluation-session-preview">
                <header className="child-only-header">
                  <span>DAYC en juego</span>
                  <strong>{selectedMeta.area}{previewTask.numero_item ? ` · Ítem ${previewTask.numero_item}` : ''}</strong>
                </header>
                <section className="child-only-stage">
                  <DigitalActivityExperience
                    key={`${open}-${runKey}`}
                    task={previewTask}
                    areaLabel={selectedMeta.area}
                    evidenceSink={memorySink}
                    onComplete={(resultado, confidence, rawData) => setLastAnswer({ resultado, confidence, rawData })}
                  />
                </section>
              </main>
            </div>
          </div>
          </MediaPermissionProvider>
        )}
      </Modal>
    </div>
  );
};

export default MinijuegosTester;

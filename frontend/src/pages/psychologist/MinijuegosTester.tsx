import React, { useState } from 'react';
import { Modal, Card } from '../../components/ui';
import { getMinijuego, getMinijuegosCatalog } from '../../components/minijuegos/registry';
import { DigitalActivityExperience } from '../../components/child/DigitalActivityExperience';
import type { EvaluationTask } from '../../types';
import '../child/EvaluationSession.css';
import './MinijuegosTester.css';

const buildPreviewTask = (id: string, area: string, nombre: string): EvaluationTask => {
  const idParts = id.split('_');
  const itemNumber = Number(idParts[idParts.length - 1]);
  const pregunta = id === 'COGNITIVO_045' ? 'Imita el dibujo de una cara' : nombre;

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
    tipos_evidencia: ['LOG', 'SCREENSHOT'],
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

  const filteredMinijuegos = minijuegos.filter((minijuego) => {
    const byArea = selectedArea === 'TODOS' || minijuego.area === selectedArea;
    return byArea;
  });

  const selected = open ? getMinijuego(open) : null;
  const selectedMeta = minijuegos.find((minijuego) => minijuego.id === open);
  const previewTask = open && selectedMeta ? buildPreviewTask(open, selectedMeta.area, selectedMeta.nombre) : null;

  return (
    <div className="minijuegos-tester">
      <div className="minijuegos-tester-header">
        <div>
          <h3>Catálogo de minijuegos</h3>
          <p>{minijuegos.length} actividades registradas. Visualización igual a evaluación real.</p>
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
                  setOpen(minijuego.id);
                  setLastAnswer(null);
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
          <div className="minijuego-test-modal">
            <div className="minijuego-test-stage">
              <main className="evaluation-session child-only-session evaluation-session-preview">
                <header className="child-only-header">
                  <span>DAYC en juego</span>
                  <strong>{selectedMeta.area}{previewTask.numero_item ? ` · Ítem ${previewTask.numero_item}` : ''}</strong>
                </header>
                <section className="child-only-stage">
                  <DigitalActivityExperience
                    task={previewTask}
                    areaLabel={selectedMeta.area}
                    onComplete={(resultado, confidence, rawData) => setLastAnswer({ resultado, confidence, rawData })}
                  />
                </section>
              </main>
            </div>

            {lastAnswer && (
              <Card className="minijuego-answer" variant="outlined">
                <strong>Respuesta capturada</strong>
                <pre>{JSON.stringify(lastAnswer, null, 2)}</pre>
              </Card>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MinijuegosTester;

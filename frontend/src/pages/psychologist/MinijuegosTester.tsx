import React, { useState } from 'react';
import { Modal, Card } from '../../components/ui';
import { getMinijuego, getMinijuegosCatalog } from '../../components/minijuegos/registry';
import { MinijuegoLoader } from '../../components/minijuegos/MinijuegoLoader';
import type { Answer, Item, MinijuegoConfig } from '../../minijuegos/types';
import '../child/EvaluationSession.css';
import './MinijuegosTester.css';

const fakeItem: Item = {
  id: 'test-item',
  area: 'COGNITIVA',
  nivel: 1,
  instruccion: 'Prueba si el bebe logra llevarse la mano a la boca.',
};

export const MinijuegosTester: React.FC = () => {
  const minijuegos = getMinijuegosCatalog();
  const areas = ['TODOS', ...Array.from(new Set(minijuegos.map((m) => m.area)))];
  const [selectedArea, setSelectedArea] = useState('TODOS');
  const [open, setOpen] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<Answer | null>(null);

  const filteredMinijuegos = minijuegos.filter((minijuego) => {
    const byArea = selectedArea === 'TODOS' || minijuego.area === selectedArea;
    return byArea;
  });

  const selected = open ? getMinijuego(open) : null;
  const selectedMeta = minijuegos.find((minijuego) => minijuego.id === open);
  const config: MinijuegoConfig | null = open
    ? {
        id: open,
        area: 'COGNITIVA',
        nombre: selectedMeta?.nombre ?? open,
        items: [fakeItem],
      }
    : null;

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
        {open && selected && config && selectedMeta && (
          <div className="minijuego-test-modal">
            <div className="minijuego-test-stage">
              <div className="evaluation-session evaluation-session-preview">
                <div className="evaluation-header">
                  <span className="nino-name">Vista previa: {selectedMeta.nombre}</span>
                  <span className="progress-info">1/1</span>
                </div>

                <div className="evaluation-content">
                  <div className="minijuego-container">
                    <MinijuegoLoader
                      config={config}
                      currentItem={fakeItem}
                      onAnswer={(answer) => setLastAnswer(answer)}
                    />
                  </div>
                </div>
              </div>
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

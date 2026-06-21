import React, { useState } from 'react';
import { Button, Input } from '../ui';
import type { ItemResult } from '../../minijuegos/types';
import './ManualResponseEntry.css';

interface ManualResponseEntryProps {
  onSubmit: (itemId: string, resultado: ItemResult) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  currentItemId?: string;
  items?: { id: string; instruccion: string }[];
}

export const ManualResponseEntry: React.FC<ManualResponseEntryProps> = ({
  onSubmit,
  onCancel,
  isLoading,
  currentItemId = '',
  items = [],
}) => {
  const [selectedItem, setSelectedItem] = useState(currentItemId);
  const [selectedResult, setSelectedResult] = useState<ItemResult | null>(null);
  const [customItemId, setCustomItemId] = useState('');

  const handleSubmit = async () => {
    const itemId = selectedItem || customItemId;
    if (!itemId || !selectedResult) return;

    await onSubmit(itemId, selectedResult);
  };

  const canSubmit = (selectedItem || customItemId) && selectedResult && !isLoading;

  return (
    <div className="manual-entry">
      <div className="manual-entry-info">
        <p className="info-text">
          Use esta interfaz para registrar manualmente las respuestas del niño cuando el modo interactivo no esté disponible.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="form-group">
          <label className="form-label">Seleccionar Ítem</label>
          <select
            className="form-select"
            value={selectedItem}
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setCustomItemId('');
            }}
          >
            <option value="">Seleccionar...</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} - {item.instruccion.substring(0, 40)}...
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="form-group">
          <Input
            label="ID del Ítem"
            value={customItemId}
            onChange={(e) => {
              setCustomItemId(e.target.value);
              setSelectedItem('');
            }}
            placeholder="Ej: L-001, M-002"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Resultado</label>
        <div className="result-buttons">
          <button
            type="button"
            className={`result-btn result-correct ${selectedResult === 'CORRECT' ? 'selected' : ''}`}
            onClick={() => setSelectedResult('CORRECT')}
            disabled={isLoading}
          >
            <span className="result-icon">✓</span>
            <span className="result-label">Correcto</span>
          </button>
          <button
            type="button"
            className={`result-btn result-error ${selectedResult === 'ERROR' ? 'selected' : ''}`}
            onClick={() => setSelectedResult('ERROR')}
            disabled={isLoading}
          >
            <span className="result-icon">✗</span>
            <span className="result-label">Error</span>
          </button>
          <button
            type="button"
            className={`result-btn result-na ${selectedResult === 'NOT_APPLICABLE' ? 'selected' : ''}`}
            onClick={() => setSelectedResult('NOT_APPLICABLE')}
            disabled={isLoading}
          >
            <span className="result-icon">−</span>
            <span className="result-label">N/A</span>
          </button>
        </div>
      </div>

      <div className="form-actions">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          isLoading={isLoading}
        >
          Registrar Respuesta
        </Button>
      </div>
    </div>
  );
};

export default ManualResponseEntry;
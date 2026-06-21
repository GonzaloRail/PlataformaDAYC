import React, { useState } from 'react';
import { Button } from '../ui/Button';
import type { Item, Answer, ItemResult } from '../../minijuegos/types';
import './FallbackManual.css';

interface FallbackManualProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  disabled?: boolean;
}

export const FallbackManual: React.FC<FallbackManualProps> = ({
  currentItem,
  onAnswer,
  disabled = false,
}) => {
  const [selectedResult, setSelectedResult] = useState<ItemResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedResult) return;

    setIsSubmitting(true);
    const answer: Answer = {
      item_id: currentItem.id,
      resultado: selectedResult,
      tiempo_respuesta_ms: 0,
    };

    setTimeout(() => {
      onAnswer(answer);
      setSelectedResult(null);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="fallback-manual">
      <div className="fallback-header">
        <span className="fallback-badge">Modo Manual</span>
        <span className="fallback-item-id">Ítem: {currentItem.id}</span>
      </div>

      <div className="fallback-instruccion">
        <p>{currentItem.instruccion}</p>
      </div>

      <div className="fallback-opciones">
        <p className="fallback-label">Seleccione el resultado:</p>
        <div className="fallback-buttons">
          <Button
            variant={selectedResult === 'CORRECT' ? 'primary' : 'secondary'}
            onClick={() => setSelectedResult('CORRECT')}
            disabled={disabled || isSubmitting}
          >
            ✓ Correcto
          </Button>
          <Button
            variant={selectedResult === 'ERROR' ? 'danger' : 'secondary'}
            onClick={() => setSelectedResult('ERROR')}
            disabled={disabled || isSubmitting}
          >
            ✗ Error
          </Button>
          <Button
            variant={selectedResult === 'NOT_APPLICABLE' ? 'ghost' : 'secondary'}
            onClick={() => setSelectedResult('NOT_APPLICABLE')}
            disabled={disabled || isSubmitting}
          >
            N/A No aplica
          </Button>
        </div>
      </div>

      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={!selectedResult || disabled || isSubmitting}
        isLoading={isSubmitting}
      >
        Confirmar Respuesta
      </Button>
    </div>
  );
};

export default FallbackManual;
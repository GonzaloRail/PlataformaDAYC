import React, { useState } from 'react';
import { Button } from '../ui';
import type { Resultado } from '../../types';
import './ResultAdjustment.css';

interface ResultAdjustmentProps {
  resultados: Resultado[];
  onAdjust: (resultadoId: string, newScore: number) => Promise<void>;
  onCancel: () => void;
}

interface EditableResultado extends Resultado {
  tempScore?: number;
  isChanged?: boolean;
}

export const ResultAdjustment: React.FC<ResultAdjustmentProps> = ({
  resultados,
  onAdjust,
  onCancel,
}) => {
  const [editableResults, setEditableResults] = useState<EditableResultado[]>(
    resultados.map((r) => ({
      ...r,
      tempScore: r.puntuacion_estandar ?? r.puntuación_estándar ?? 0,
      isChanged: false,
    }))
  );
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleScoreChange = (id: string, newScore: number) => {
    setEditableResults((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, tempScore: newScore, isChanged: newScore !== (r.puntuacion_estandar ?? r.puntuación_estándar ?? 0) }
          : r
      )
    );
  };

  const handleSave = async (resultadoId: string) => {
    const result = editableResults.find((r) => r.id === resultadoId);
    if (!result || !result.isChanged || result.tempScore === undefined) return;

    setIsLoading(resultadoId);
    try {
      await onAdjust(resultadoId, result.tempScore);
      setEditableResults((prev) =>
        prev.map((r) =>
          r.id === resultadoId ? { ...r, isChanged: false, puntuacion_estandar: result.tempScore as number } : r
        )
      );
    } catch (err) {
      console.error('Error adjusting result:', err);
    } finally {
      setIsLoading(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 13) return 'score-high';
    if (score >= 10) return 'score-normal';
    if (score >= 7) return 'score-low';
    return 'score-very-low';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 13) return 'Superior';
    if (score >= 10) return 'Promedio';
    if (score >= 7) return 'Bajo';
    return 'Muy Bajo';
  };

  const getGdqInterpretation = (gdq: number) => {
    if (gdq >= 110) return { label: 'Superior', color: '#059669' };
    if (gdq >= 90) return { label: 'Promedio', color: '#4f46e5' };
    if (gdq >= 80) return { label: 'Bajo', color: '#f59e0b' };
    return { label: 'Muy Bajo', color: '#dc2626' };
  };

  return (
    <div className="result-adjustment">
      <div className="adjustment-info">
        <p className="info-text">
          Los puntuaciones estándar pueden ajustarse manualmente si es necesario. Los cambios se guardarán en la evaluación.
        </p>
      </div>

      {editableResults.length === 0 ? (
        <div className="no-results">
          <p>No hay resultados disponibles para ajustar.</p>
          <p className="hint">Complete primero el cálculo de puntuaciones.</p>
        </div>
      ) : (
        <div className="results-table">
          <div className="table-header">
            <span className="col-area">Área</span>
            <span className="col-pd">P.D.</span>
            <span className="col-pe">P.E.</span>
            <span className="col-percentil">Percentil</span>
            <span className="col-ee">Edad Equivalente</span>
            <span className="col-actions">Acción</span>
          </div>

          {editableResults.map((result) => (
            <div key={result.id} className="table-row">
              {(() => {
                const tempScore = result.tempScore ?? 0;
                return (
                  <>
              <span className="col-area">
                <span className="area-badge">{result.área ?? result.area}</span>
              </span>
              <span className="col-pd">{result.puntuación_directa ?? result.puntuacion_directa}</span>
              <span className="col-pe">
                <input
                  type="number"
                  min="1"
                  max="19"
                  value={tempScore}
                  onChange={(e) => handleScoreChange(result.id, parseInt(e.target.value) || 0)}
                  className={`score-input ${getScoreColor(tempScore)}`}
                />
                <span className={`score-label ${getScoreColor(tempScore)}`}>
                  {getScoreLabel(tempScore)}
                </span>
              </span>
              <span className="col-percentil">{result.percentil || '-'}</span>
              <span className="col-ee">{result.edad_equivalente || '-'}</span>
              <span className="col-actions">
                <Button
                  size="sm"
                  variant={result.isChanged ? 'primary' : 'ghost'}
                  onClick={() => handleSave(result.id)}
                  disabled={!result.isChanged || isLoading === result.id}
                  isLoading={isLoading === result.id}
                >
                  {result.isChanged ? 'Guardar' : 'Guardado'}
                </Button>
              </span>
                  </>
                );
              })()}
            </div>
          ))}

          {editableResults[0]?.cociente_general_gdq && (
            <div className="gdq-row">
              <span className="gdq-label">Cociente General de Desarrollo (GDQ)</span>
              <span className="gdq-value">
                {editableResults[0].cociente_general_gdq}
              </span>
              <span
                className="gdq-interpretation"
                style={{ color: getGdqInterpretation(editableResults[0].cociente_general_gdq).color }}
              >
                {getGdqInterpretation(editableResults[0].cociente_general_gdq).label}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="adjustment-notes">
        <h4>Notas:</h4>
        <ul>
          <li><strong>P.D.</strong>: Puntuación Directa (raw score)</li>
          <li><strong>P.E.</strong>: Puntuación Estándar (1-19, media=10)</li>
          <li><strong>Percentil</strong>: Posición relativa respecto a la población</li>
          <li><strong>Edad Equivalente</strong>: Edad mental correspondiente a la puntuación</li>
        </ul>
      </div>

      <div className="form-actions">
        <Button onClick={onCancel}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default ResultAdjustment;

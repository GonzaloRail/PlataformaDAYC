import React from 'react';
import type { Resultado } from '../../types';
import './ResultsTable.css';

interface ResultsTableProps {
  resultados: Resultado[];
  gdqGlobal?: number;
  showGdq?: boolean;
}

const getScoreClass = (score: number): string => {
  if (score >= 13) return 'score-superior';
  if (score >= 10) return 'score-average';
  if (score >= 7) return 'score-low';
  return 'score-very-low';
};

const getPercentileClass = (percentile: number): string => {
  if (percentile >= 75) return 'percentile-high';
  if (percentile >= 25) return 'percentile-average';
  return 'percentile-low';
};

export const ResultsTable: React.FC<ResultsTableProps> = ({
  resultados,
  gdqGlobal,
  showGdq = true,
}) => {
  if (resultados.length === 0) {
    return (
      <div className="results-empty">
        <p>No hay resultados disponibles</p>
        <p className="hint">Complete la evaluación para ver las puntuaciones</p>
      </div>
    );
  }

  const formatEdadEquivalente = (ee: string | null): string => {
    if (!ee) return '-';
    return ee;
  };

  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            <th>Área</th>
            <th>P.D.</th>
            <th>P.E.</th>
            <th>Percentil</th>
            <th>Edad Equivalente</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((result) => (
            <tr key={result.id}>
              <td>
                <span className={`area-badge area-${result.area.toLowerCase()}`}>
                  {result.area}
                </span>
              </td>
              <td className="pd-cell">{result.puntuacion_directa ?? result.puntuación_directa}</td>
              <td>
                <span className={`pe-cell ${getScoreClass(result.puntuacion_estandar ?? result.puntuación_estándar ?? 0)}`}>
                  {result.puntuacion_estandar ?? result.puntuación_estándar}
                </span>
              </td>
              <td>
                <span className={`percentile-cell ${getPercentileClass(result.percentil)}`}>
                  {result.percentil}
                </span>
              </td>
              <td className="ee-cell">{formatEdadEquivalente(result.edad_equivalente)}</td>
            </tr>
          ))}
        </tbody>
        {showGdq && gdqGlobal && (
          <tfoot>
            <tr className="gdq-row">
              <td colSpan={2} className="gdq-label">Cociente General de Desarrollo (GDQ)</td>
              <td className="gdq-value">{gdqGlobal}</td>
              <td colSpan={2} className="gdq-interpretation">
                {gdqGlobal >= 110 && 'Superior'}
                {gdqGlobal >= 90 && gdqGlobal < 110 && 'Promedio'}
                {gdqGlobal >= 80 && gdqGlobal < 90 && 'Bajo'}
                {gdqGlobal < 80 && 'Muy Bajo'}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <div className="results-legend">
        <h4>Interpretación de Puntuaciones</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color score-superior"></span>
            <span>Superior (≥13)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color score-average"></span>
            <span>Promedio (10-12)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color score-low"></span>
            <span> Bajo (7-9)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color score-very-low"></span>
            <span>Muy Bajo (≤6)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { store } from '../../store';
import './EvaluationResult.css';

interface ResultLocationState {
  ninoNombre?: string;
  stopReason?: string | null;
}

export const EvaluationResult: React.FC = () => {
  const navigate = useNavigate();
  const { evaluacionId } = useParams<{ evaluacionId: string }>();
  const location = useLocation() as unknown as { state: ResultLocationState };
  const isAuthenticated = store((state) => state.isAuthenticated);

  const ninoNombre = location.state?.ninoNombre || 'Niño';
  const stopReason = location.state?.stopReason;

  return (
    <div className="evaluation-result-page">
      <div className="evaluation-result-card">
        <span className="result-emoji" aria-hidden="true">🏁</span>
        <h1>Evaluación finalizada</h1>
        <p>
          {ninoNombre} terminó su recorrido de actividades.
          {evaluacionId ? ` ID de evaluación: ${evaluacionId}.` : ''}
        </p>

        <div className="result-status-block">
          <h3>Estado final</h3>
          <p>{stopReason ? `Finalizada por regla: ${stopReason}` : 'Completada correctamente.'}</p>
        </div>

        <div className="result-actions">
          {isAuthenticated && (
            <button className="result-btn result-btn-primary" onClick={() => navigate('/research/metrics')}>
              Ver métricas
            </button>
          )}
          <button className="result-btn result-btn-secondary" onClick={() => navigate('/child/entry')}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationResult;

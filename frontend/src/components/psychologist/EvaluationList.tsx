import React from 'react';
import { Card } from '../../components/ui';
import { ViewState } from '../../components/ui';
import type { Nino, Evaluacion } from '../../types';
import './EvaluationList.css';

interface EvaluationListProps {
  evaluaciones: Evaluacion[];
  ninos: Nino[];
  onSelect: (evaluacion: Evaluacion) => void;
  isLoading: boolean;
  completed?: boolean;
}

export const EvaluationList: React.FC<EvaluationListProps> = ({
  evaluaciones,
  ninos,
  onSelect,
  isLoading,
  completed = false,
}) => {
  if (isLoading) {
    return <ViewState kind="loading" message="Cargando evaluaciones..." />;
  }

  if (evaluaciones.length === 0) {
    return (
      <ViewState
        kind="empty"
        message={completed ? 'No hay evaluaciones completadas' : 'No hay evaluaciones activas'}
      />
    );
  }

  const getNino = (ninoId: string) => ninos.find((n) => n.id === ninoId);

  const getEstadoBadge = (estado: string) => {
    const estadoConfig: Record<string, { label: string; className: string }> = {
      INITIATED: { label: 'Iniciada', className: 'badge-info' },
      IN_PROGRESS: { label: 'En Progreso', className: 'badge-warning' },
      COMPLETED: { label: 'Completada', className: 'badge-success' },
      STOPPED: { label: 'Detenida', className: 'badge-danger' },
    };
    return estadoConfig[estado] || { label: estado, className: '' };
  };

  return (
    <div className="evaluation-list">
      {evaluaciones.map((eval_) => {
        const nino = getNino(eval_.nino_id);
        const badge = getEstadoBadge(eval_.estado);

        return (
          <Card
            key={eval_.id}
            className="evaluation-card"
            onClick={() => onSelect(eval_)}
          >
            <div className="evaluation-card-header">
              <span className="nino-name">{nino?.nombre || 'Desconocido'}</span>
              <span className={`badge ${badge.className}`}>{badge.label}</span>
            </div>
            <div className="evaluation-card-info">
              <span className="info-item">
                <span className="info-label">Código:</span>
                <span className="info-value">{eval_.session_code}</span>
              </span>
              <span className="info-item">
                <span className="info-label">Edad:</span>
                <span className="info-value">{eval_.edad_meses} meses</span>
              </span>
              {eval_.started_at && (
                <span className="info-item">
                  <span className="info-label">Inicio:</span>
                  <span className="info-value">
                    {new Date(eval_.started_at).toLocaleDateString('es-MX')}
                  </span>
                </span>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EvaluationList;

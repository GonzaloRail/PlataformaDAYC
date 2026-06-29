import { memo, useMemo } from 'react';
import { Card } from '@/components/ui';
import { ViewState } from '@/components/ui';
import type { Nino, Evaluacion } from '@/types';
import './EvaluationList.css';

interface EvaluationListProps {
  evaluaciones: Evaluacion[];
  ninos: Nino[];
  onSelect: (evaluacion: Evaluacion) => void;
  isLoading: boolean;
  completed?: boolean;
}

interface EvaluationCardProps {
  evaluacion: Evaluacion;
  nino?: Nino;
  onSelect: (evaluacion: Evaluacion) => void;
}

const ESTADO_BADGES: Record<string, { label: string; className: string }> = {
  INITIATED: { label: 'Iniciada', className: 'badge-info' },
  IN_PROGRESS: { label: 'En Progreso', className: 'badge-warning' },
  COMPLETED: { label: 'Completada', className: 'badge-success' },
  STOPPED: { label: 'Detenida', className: 'badge-danger' },
};

const EvaluationCardImpl = ({ evaluacion, nino, onSelect }: EvaluationCardProps) => {
  const badge = ESTADO_BADGES[evaluacion.estado] || { label: evaluacion.estado, className: '' };
  return (
    <Card
      className="evaluation-card"
      onClick={() => onSelect(evaluacion)}
    >
      <div className="evaluation-card-header">
        <span className="nino-name">{nino?.nombre || 'Desconocido'}</span>
        <span className={`badge ${badge.className}`}>{badge.label}</span>
      </div>
      <div className="evaluation-card-info">
        <span className="info-item">
          <span className="info-label">Código:</span>
          <span className="info-value">{evaluacion.session_code}</span>
        </span>
        <span className="info-item">
          <span className="info-label">Edad:</span>
          <span className="info-value">{evaluacion.edad_meses} meses</span>
        </span>
        {evaluacion.started_at && (
          <span className="info-item">
            <span className="info-label">Inicio:</span>
            <span className="info-value">
              {new Date(evaluacion.started_at).toLocaleDateString('es-MX')}
            </span>
          </span>
        )}
      </div>
    </Card>
  );
};

const EvaluationCard = memo(EvaluationCardImpl);

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

  const ninosById = useMemo(
    () => new Map(ninos.map((n) => [n.id, n])),
    [ninos]
  );

  return (
    <div className="evaluation-list">
      {evaluaciones.map((evaluacion) => (
        <EvaluationCard
          key={evaluacion.id}
          evaluacion={evaluacion}
          nino={ninosById.get(evaluacion.nino_id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default EvaluationList;

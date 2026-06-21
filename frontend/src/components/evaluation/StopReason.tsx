import React from 'react';
import { Card, Button } from '../ui';
import './StopReason.css';

interface StopReasonProps {
  reason: string;
  evaluacionId?: string;
  onContinue?: () => void;
}

export const StopReason: React.FC<StopReasonProps> = ({ reason, evaluacionId, onContinue }) => {
  const getReasonInfo = (reasonText: string) => {
    const lowerReason = reasonText.toLowerCase();
    if (lowerReason.includes('base') || lowerReason.includes('1-1-1')) {
      return {
        icon: '🛑',
        title: 'Regla Base Aplicada',
        description: 'Se detectaron 3 errores consecutivos en diferentes subpruebas. La evaluación se detuvo según la regla BASE (1-1-1).',
        color: '#f59e0b',
      };
    }
    if (lowerReason.includes('límite') || lowerReason.includes('limit') || lowerReason.includes('3 of 5')) {
      return {
        icon: '⚠️',
        title: 'Regla Límite Alcanzada',
        description: 'Se detectaron 3 errores en los últimos 5 ítems consecutivos. La evaluación se detuvo según la regla LÍMITE.',
        color: '#ef4444',
      };
    }
    return {
      icon: '⏹️',
      title: 'Evaluación Detenida',
      description: 'La evaluación ha terminado antes de completar todos los ítems.',
      color: '#6b7280',
    };
  };

  const info = getReasonInfo(reason);

  return (
    <div className="stop-reason-container">
      <Card className="stop-reason-card">
        <div className="stop-reason-header">
          <span className="stop-icon" style={{ backgroundColor: `${info.color}20`, color: info.color }}>
            {info.icon}
          </span>
          <h2 className="stop-title">{info.title}</h2>
        </div>

        <p className="stop-description">{info.description}</p>

        <div className="stop-info">
          <div className="stop-info-item">
            <span className="info-label">Motivo:</span>
            <span className="info-value">{reason}</span>
          </div>
          {evaluacionId && (
            <div className="stop-info-item">
              <span className="info-label">Evaluación:</span>
              <span className="info-value">{evaluacionId.slice(0, 8)}...</span>
            </div>
          )}
        </div>

        {onContinue && (
          <Button onClick={onContinue} fullWidth>
            Ver Resultados
          </Button>
        )}
      </Card>
    </div>
  );
};

export default StopReason;
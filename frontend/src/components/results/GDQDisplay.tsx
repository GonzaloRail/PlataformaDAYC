import React from 'react';
import { getGdqInterpretation } from '@/utils/scoring';
import './GDQDisplay.css';

interface GDQDisplayProps {
  gdq: number;
  edadMeses?: number;
  variant?: 'card' | 'badge' | 'detailed';
}

export const GDQDisplay: React.FC<GDQDisplayProps> = ({
  gdq,
  edadMeses,
  variant = 'detailed',
}) => {
  const info = getGdqInterpretation(gdq);

  if (variant === 'badge') {
    return (
      <span className={`gdq-badge ${info.className}`}>
        <span className="gdq-badge-value">{gdq}</span>
        <span className="gdq-badge-label">{info.label}</span>
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`gdq-card ${info.className}`}>
        <div className="gdq-card-header">
          <span className="gdq-label">GDQ</span>
          <span className="gdq-value">{gdq}</span>
        </div>
        <span className="gdq-description">{info.label}</span>
      </div>
    );
  }

  return (
    <div className={`gdq-display ${info.className}`}>
      <div className="gdq-main">
        <div className="gdq-icon">🧠</div>
        <div className="gdq-info">
          <span className="gdq-title">Cociente General de Desarrollo (GDQ)</span>
          <span className="gdq-number">{gdq}</span>
          <span className="gdq-label-text">{info.label}</span>
        </div>
      </div>

      {edadMeses && (
        <div className="gdq-age-info">
          <span className="age-label">Edad cronológica:</span>
          <span className="age-value">
            {Math.floor(edadMeses / 12)} años {edadMeses % 12} meses
          </span>
        </div>
      )}

      <div className="gdq-bar">
        <div className="gdq-bar-track">
          <div
            className="gdq-bar-fill"
            style={{ width: `${Math.min((gdq / 150) * 100, 100)}%` }}
          />
          <div className="gdq-bar-marker gdq-80" title="Límite inferior"></div>
          <div className="gdq-bar-marker gdq-90" title="Promedio inferior"></div>
          <div className="gdq-bar-marker gdq-110" title="Promedio superior"></div>
        </div>
        <div className="gdq-bar-labels">
          <span>0</span>
          <span>80</span>
          <span>90</span>
          <span>110</span>
          <span>130+</span>
        </div>
      </div>

      <p className="gdq-text-description">{info.description}</p>
    </div>
  );
};

export default GDQDisplay;
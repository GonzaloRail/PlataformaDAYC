import React from 'react';
import type { Diagnostico, ActividadEstimulacion } from '../../types';
import './DiagnosisDisplay.css';

interface DiagnosisDisplayProps {
  diagnostico: Diagnostico;
  onEdit?: () => void;
}

const getGdqLevel = (gdq: number): string => {
  if (gdq >= 130) return 'Superior';
  if (gdq >= 110) return 'Alto Promedio';
  if (gdq >= 90) return 'Promedio';
  if (gdq >= 70) return 'Bajo';
  return 'Muy Bajo';
};

const getGdqClass = (gdq: number): string => {
  if (gdq >= 110) return 'gdq-excellent';
  if (gdq >= 90) return 'gdq-average';
  if (gdq >= 70) return 'gdq-low';
  return 'gdq-very-low';
};

const getActivityIcon = (index: number): string => {
  const icons = ['🧠', '💬', '👀', '🎯', '🖐️', '🎨'];
  return icons[index % icons.length];
};

export const DiagnosisDisplay: React.FC<DiagnosisDisplayProps> = ({
  diagnostico,
  onEdit,
}) => {
  const actividades = diagnostico.actividades_estimulacion || [];

  return (
    <div className="diagnosis-container">
      <div className="diagnosis-header">
        <h3>Diagnóstico AI</h3>
        <div className="diagnosis-meta">
          <span className={`model-badge ${diagnostico.modelo_ai.toLowerCase().includes('gemini') ? 'gemini' : 'claude'}`}>
            {diagnostico.modelo_ai}
          </span>
          {diagnostico.modificado_por_psicologo && (
            <span className="edited-badge">✏️ Editado</span>
          )}
        </div>
      </div>

      {diagnostico.gdq !== null && diagnostico.gdq !== undefined && (
        <div className="gdq-section">
          <div className="gdq-info">
            <span className="gdq-label">Cociente de Desarrollo General (GDQ)</span>
            <span className={`gdq-value ${getGdqClass(diagnostico.gdq)}`}>
              {diagnostico.gdq}
            </span>
            <span className={`gdq-level ${getGdqClass(diagnostico.gdq)}`}>
              {getGdqLevel(diagnostico.gdq)}
            </span>
          </div>
        </div>
      )}

      <div className="diagnosis-content">
        <h4>Resumen del Diagnóstico</h4>
        <div className="diagnosis-text">
          {diagnostico.contenido.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {actividades.length > 0 && (
        <div className="activities-section">
          <h4>📋 Actividades de Estimulación Recomendadas</h4>
          <p className="activities-hint">
            Estas actividades están diseñadas según el nivel de desarrollo del niño
          </p>
          <div className="activities-grid">
            {actividades.map((actividad: ActividadEstimulacion, index: number) => (
              <div key={actividad.id || index} className="activity-card">
                <div className="activity-header">
                  <span className="activity-icon">{getActivityIcon(index)}</span>
                  <span className="activity-number">#{actividad.id || index + 1}</span>
                </div>
                <h5 className="activity-title">{actividad.nombre}</h5>
                <p className="activity-description">{actividad.descripcion}</p>
                <div className="activity-footer">
                  <span className="activity-duration">
                    ⏱️ {actividad.duracion_minutos} min
                  </span>
                  {actividad.área && (
                    <span className="activity-area">
                      📍 {actividad.área}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {onEdit && (
        <div className="diagnosis-actions">
          <button className="edit-button" onClick={onEdit}>
            ✏️ Editar Diagnóstico
          </button>
        </div>
      )}
    </div>
  );
};

export default DiagnosisDisplay;
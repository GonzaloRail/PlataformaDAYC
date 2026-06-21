import React from 'react';
import './AgeDisplay.css';

interface AgeDisplayProps {
  años: number;
  meses: number;
  días: number;
  mesesTotales?: number;
  showDetails?: boolean;
  variant?: 'compact' | 'expanded' | 'badge';
}

export const AgeDisplay: React.FC<AgeDisplayProps> = ({
  años,
  meses,
  días,
  mesesTotales,
  showDetails = false,
  variant = 'expanded',
}) => {
  const formatAge = () => {
    if (años === 0) {
      return `${meses} meses`;
    }
    if (meses === 0) {
      return `${años} año${años !== 1 ? 's' : ''}`;
    }
    return `${años} año${años !== 1 ? 's' : ''} ${meses} mes${meses !== 1 ? 'es' : ''}`;
  };

  const getAgeCategory = () => {
    if (!mesesTotales) return null;
    if (mesesTotales < 24) return { label: 'Preescolar temprano', className: 'category-early' };
    if (mesesTotales < 48) return { label: 'Preescolar', className: 'category-preschool' };
    if (mesesTotales < 72) return { label: 'Preescolar tardío', className: 'category-late' };
    return { label: 'Escolar', className: 'school' };
  };

  const category = getAgeCategory();

  if (variant === 'badge') {
    return (
      <span className="age-badge">
        <span className="age-badge-icon">🎂</span>
        <span className="age-badge-text">{formatAge()}</span>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <span className="age-compact">
        {formatAge()}
      </span>
    );
  }

  return (
    <div className="age-display">
      <div className="age-main">
        <span className="age-icon">🎂</span>
        <span className="age-value">{formatAge()}</span>
      </div>

      {showDetails && (
        <div className="age-details">
          <div className="age-breakdown">
            <div className="age-unit">
              <span className="unit-value">{años}</span>
              <span className="unit-label">año{años !== 1 ? 's' : ''}</span>
            </div>
            <span className="age-separator">+</span>
            <div className="age-unit">
              <span className="unit-value">{meses}</span>
              <span className="unit-label">meses</span>
            </div>
            <span className="age-separator">+</span>
            <div className="age-unit">
              <span className="unit-value">{días}</span>
              <span className="unit-label">días</span>
            </div>
          </div>

          {mesesTotales !== undefined && (
            <div className="age-meta">
              <span className="meta-item">
                <span className="meta-label">Total:</span>
                <span className="meta-value">{mesesTotales} meses</span>
              </span>
              {category && (
                <span className={`meta-category ${category.className}`}>
                  {category.label}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgeDisplay;
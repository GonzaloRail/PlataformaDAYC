import React from 'react';
import './FallbackProtocolView.css';

interface FallbackProtocolViewProps {
  title?: string;
  message?: string;
  showContinueButton?: boolean;
  onContinue?: () => void;
}

export const FallbackProtocolView: React.FC<FallbackProtocolViewProps> = ({
  title = 'Protocolo de respaldo activo',
  message = 'Estamos preparando esta actividad. Un evaluador ayudara a continuar el test.',
  showContinueButton = false,
  onContinue,
}) => {
  return (
    <div className="fallback-protocol" role="status" aria-live="polite">
      <div className="fallback-worker" aria-hidden="true">
        <div className="worker-head" />
        <div className="worker-body" />
        <div className="worker-laptop" />
        <div className="worker-gear worker-gear-a" />
        <div className="worker-gear worker-gear-b" />
      </div>

      <h3>{title}</h3>
      <p>{message}</p>

      <div className="fallback-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {showContinueButton && (
        <button className="fallback-protocol-btn" onClick={onContinue}>
          Continuar con evaluador
        </button>
      )}
    </div>
  );
};

export default FallbackProtocolView;

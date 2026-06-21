import React, { useState } from 'react';
import { Button } from '../ui';
import api from '../../services/api';
import './DownloadPDFButton.css';

interface DownloadPDFButtonProps {
  evaluacionId: string;
  ninoNombre?: string;
  fecha?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
}

export const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  evaluacionId,
  ninoNombre = '',
  fecha = '',
  onSuccess,
  onError,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  label = 'Descargar PDF',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    setIsGenerating(true);

    try {
      const endpoint = `/api/evaluaciones/${evaluacionId}/reporte-pdf/`;
      const filename = `reporte_DAYC2_${ninoNombre || 'evaluacion'}_${fecha || 'fecha'}.pdf`.replace(/\s+/g, '_');
      
      await api.download(endpoint, filename);
      
      setIsGenerating(false);
      onSuccess?.();
    } catch (err) {
      setIsLoading(false);
      setIsGenerating(false);
      
      const error = err instanceof Error ? err : new Error('Error al generar PDF');
      onError?.(error);
    }
  };

  const getButtonContent = () => {
    if (isGenerating) {
      return (
        <>
          <span className="pdf-icon">⏳</span>
          <span>Generando PDF...</span>
        </>
      );
    }
    return (
      <>
        <span className="pdf-icon">📄</span>
        <span>{label}</span>
      </>
    );
  };

  return (
    <div className="download-pdf-button">
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleDownload}
        isLoading={isLoading && !isGenerating}
        leftIcon={!isGenerating ? <span>📄</span> : undefined}
      >
        {getButtonContent()}
      </Button>
      
      <p className="download-hint">
        El informe incluirá: datos del niño, resultados por área, gráficos de rendimiento, diagnóstico y recomendaciones.
      </p>
    </div>
  );
};

export default DownloadPDFButton;
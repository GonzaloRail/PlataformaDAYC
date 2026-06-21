import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Modal } from '../../components/ui';
import { ManualResponseEntry } from './ManualResponseEntry';
import { ResultAdjustment } from './ResultAdjustment';
import { DownloadPDFButton } from '../results/DownloadPDFButton';
import type { Evaluacion, Nino, Resultado, Respuesta } from '../../types';
import { useEvaluationProgress } from '../../hooks/useEvaluationProgress';
import api from '../../services/api';
import './EvaluationDetail.css';

interface EvaluationDetailProps {
  evaluacion: Evaluacion;
  nino?: Nino;
  onClose: () => void;
  onRefresh: () => void;
}

export const EvaluationDetail: React.FC<EvaluationDetailProps> = ({
  evaluacion,
  nino,
  onClose,
  onRefresh,
}) => {
  const { progress, isConnected } = useEvaluationProgress(evaluacion.id);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadData();
    startPolling();
    return () => stopPolling();
  }, [evaluacion.id]);

  const loadData = async () => {
    try {
      const [respuestasData, currentTaskData] = await Promise.all([
        api.get<Respuesta[]>(`/api/evaluaciones/${evaluacion.id}/respuestas/`).catch(() => []),
        api.get<{ current_task: string }>(`/api/evaluaciones/${evaluacion.id}/current-task/`).catch(() => ({ current_task: '' })),
      ]);
      setRespuestas(respuestasData);
      setCurrentTask(currentTaskData.current_task);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const startPolling = () => {
    pollingRef.current = setInterval(loadData, 5000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
  };

  const handleManualResponse = async (itemId: string, resultado: string) => {
    setIsLoading(true);
    try {
      await api.post(`/api/evaluaciones/${evaluacion.id}/respuesta/`, {
        item_id: itemId,
        resultado,
        tiempo_respuesta_ms: 0,
      });
      await loadData();
      onRefresh();
    } catch (err) {
      console.error('Error submitting response:', err);
    } finally {
      setIsLoading(false);
      setShowManualEntry(false);
    }
  };

  const handleScore = async () => {
    setIsLoading(true);
    try {
      const data = await api.post<{ resultados: Resultado[] }>(
        `/api/evaluaciones/${evaluacion.id}/score/`
      );
      setResultados(data.resultados);
      onRefresh();
    } catch (err) {
      console.error('Error calculating score:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustResult = async (resultadoId: string, newScore: number) => {
    try {
      await api.patch(`/api/evaluaciones/${evaluacion.id}/resultados/${resultadoId}/`, {
        puntuacion_estandar: newScore,
      });
      await loadData();
      onRefresh();
    } catch (err) {
      console.error('Error adjusting result:', err);
    }
  };

  const isActive = evaluacion.estado === 'INITIATED' || evaluacion.estado === 'IN_PROGRESS';
  const isCompleted = evaluacion.estado === 'COMPLETED' || evaluacion.estado === 'STOPPED' || evaluacion.estado === 'PENDING_REVIEW' || evaluacion.estado === 'VALIDATED';

  return (
    <Card className="evaluation-detail">
      <div className="detail-header">
        <div>
          <h3 className="detail-title">{nino?.nombre || 'Evaluación'}</h3>
          <p className="detail-code">Código: {evaluacion.session_code}</p>
        </div>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="detail-status">
        <span className={`status-badge ${evaluacion.estado.toLowerCase()}`}>
          {evaluacion.estado === 'INITIATED' && 'Iniciada'}
          {evaluacion.estado === 'IN_PROGRESS' && 'En Progreso'}
          {evaluacion.estado === 'COMPLETED' && 'Completada'}
          {evaluacion.estado === 'STOPPED' && 'Detenida'}
          {evaluacion.estado === 'WAITING_CONSENT' && 'Esperando consentimiento'}
          {evaluacion.estado === 'PENDING_REVIEW' && 'Pendiente de revisión'}
          {evaluacion.estado === 'REVIEW_IN_PROGRESS' && 'En revisión'}
          {evaluacion.estado === 'VALIDATED' && 'Validada'}
        </span>
        <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '● En vivo' : '○ Desconectado'}
        </span>
      </div>

      {isActive && progress && (
        <div className="detail-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.completedItems / progress.totalItems) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {progress.completedItems} / {progress.totalItems} ítems
          </span>
          {currentTask && (
            <span className="current-task">Tarea actual: {currentTask}</span>
          )}
        </div>
      )}

      <div className="detail-info">
        <div className="info-row">
          <span className="info-label">Fecha:</span>
          <span className="info-value">
            {evaluacion.created_at
              ? new Date(evaluacion.created_at).toLocaleDateString('es-MX')
              : '-'}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Edad:</span>
          <span className="info-value">{evaluacion.edad_meses} meses</span>
        </div>
        <div className="info-row">
          <span className="info-label">Respuestas:</span>
          <span className="info-value">{respuestas.length}</span>
        </div>
      </div>

      <div className="detail-actions">
        <Button onClick={() => { window.location.href = `/psychologist/evaluations/${evaluacion.id}/review`; }} fullWidth>
          Revisar Evidencias
        </Button>
        {isActive && (
          <Button onClick={() => setShowManualEntry(true)} fullWidth>
            Entrada Manual (Fallback)
          </Button>
        )}
        {isCompleted && (
          <Button onClick={handleScore} fullWidth isLoading={isLoading}>
            Calcular Puntuaciones
          </Button>
        )}
        {resultados.length > 0 && (
          <Button variant="secondary" onClick={() => setShowAdjustments(true)} fullWidth>
            Ajustar Resultados
          </Button>
        )}
        {isCompleted && (
          <DownloadPDFButton
            evaluacionId={evaluacion.id}
            ninoNombre={nino?.nombre}
            fecha={evaluacion.created_at ? new Date(evaluacion.created_at).toLocaleDateString('es-MX') : ''}
            variant="secondary"
            size="sm"
            fullWidth
          />
        )}
      </div>

      {respuestas.length > 0 && (
        <div className="detail-responses">
          <h4>Respuestas Recientes</h4>
          <div className="responses-list">
            {respuestas.slice(-5).reverse().map((r) => (
              <div key={r.id} className="response-item">
                <span className="response-item-id">{r.item_id}</span>
                <span className={`response-result ${r.resultado.toLowerCase()}`}>
                  {r.resultado === 'CORRECT' && '✓'}
                  {r.resultado === 'ERROR' && '✗'}
                  {r.resultado === 'NOT_APPLICABLE' && '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={showManualEntry}
        onClose={() => setShowManualEntry(false)}
        title="Entrada Manual de Respuesta"
      >
        <ManualResponseEntry
          onSubmit={handleManualResponse}
          onCancel={() => setShowManualEntry(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showAdjustments}
        onClose={() => setShowAdjustments(false)}
        title="Ajustar Resultados"
        size="lg"
      >
        <ResultAdjustment
          resultados={resultados}
          onAdjust={handleAdjustResult}
          onCancel={() => setShowAdjustments(false)}
        />
      </Modal>
    </Card>
  );
};

export default EvaluationDetail;

import React, { useEffect, useMemo, useState } from 'react';
import evaluacionesApi from '../../services/evaluacionesApi';
import { EvidenceCollection } from './EvidenceCollection';
import { normalizeEvidence } from './EvidenceNormalizer';
import './EvidenceViewer.css';

interface EvidenceViewerProps {
  evaluacionId: string;
  itemId: string;
}

interface EvidenceData {
  id: string;
  type: string;
  metadata: Record<string, any>;
  duration_ms?: number;
  size_bytes?: number;
  captured_by: string;
  created_at: string;
  download_url?: string;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ evaluacionId, itemId }) => {
  const [evidences, setEvidences] = useState<EvidenceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async (initial = false) => {
      if (!evaluacionId || !itemId) return;
      if (initial) setLoading(true);
      else setRefreshing(true);
      setError(null);
      try {
        const data = await evaluacionesApi.getEvidence(evaluacionId, itemId);
        if (mounted) setEvidences(data);
      } catch {
        if (mounted) setError('Error al cargar evidencias');
      } finally {
        if (mounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };
    void load(true);
    const interval = window.setInterval(() => void load(false), 4000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [evaluacionId, itemId]);

  const normalized = useMemo(() => evidences.map(normalizeEvidence), [evidences]);
  const counts = useMemo(() => normalized.reduce<Record<string, number>>((acc, evidence) => {
    acc[evidence.shortLabel] = (acc[evidence.shortLabel] || 0) + 1;
    return acc;
  }, {}), [normalized]);

  if (loading) return <div className="evidence-viewer loading">Cargando evidencias...</div>;
  if (error) return <div className="evidence-viewer error">{error}</div>;
  if (normalized.length === 0) {
    return (
      <div className="evidence-viewer empty">
        <span>No hay evidencias registradas para este ítem.</span>
        {refreshing && <strong>Buscando evidencias nuevas...</strong>}
      </div>
    );
  }

  return (
    <div className="evidence-viewer evidence-viewer-normalized">
      <div className="evidence-viewer-heading">
        <div>
          <h4>Evidencias del ítem</h4>
          <p>{refreshing ? 'Actualizando evidencias...' : 'Resumen clínico y archivos disponibles para revisión profesional.'}</p>
        </div>
        <div className="evidence-viewer-counts">
          {Object.entries(counts).map(([label, count]) => (
            <span key={label}>{label}: {count}</span>
          ))}
        </div>
      </div>
      <EvidenceCollection evidences={normalized} />
    </div>
  );
};

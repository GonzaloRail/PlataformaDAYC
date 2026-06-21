import React, { useEffect, useState } from 'react';
import evaluacionesApi from '../../services/evaluacionesApi';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!evaluacionId || !itemId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await evaluacionesApi.getEvidence(evaluacionId, itemId);
        if (mounted) setEvidences(data);
      } catch (err) {
        if (mounted) setError('Error al cargar evidencias');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => { mounted = false; };
  }, [evaluacionId, itemId]);

  if (loading) return <div className="evidence-viewer loading">Cargando evidencias...</div>;
  if (error) return <div className="evidence-viewer error">{error}</div>;
  if (evidences.length === 0) return <div className="evidence-viewer empty">No hay evidencias registradas para este ítem.</div>;

  return (
    <div className="evidence-viewer">
      <h4>Evidencias Recopiladas</h4>
      <div className="evidence-list">
        {evidences.map((ev) => (
          <div key={ev.id} className="evidence-card">
            <div className="evidence-meta">
              <span className="evidence-type">{ev.type}</span>
              <span className="evidence-time">{new Date(ev.created_at).toLocaleTimeString()}</span>
            </div>
            
            {ev.type === 'VIDEO' && ev.download_url && (
              <video src={ev.download_url} controls preload="metadata" className="evidence-media" />
            )}
            
            {ev.type === 'AUDIO' && ev.download_url && (
              <audio src={ev.download_url} controls preload="metadata" className="evidence-media" />
            )}
            
            {ev.type === 'SCREENSHOT' && ev.download_url && (
              <img src={ev.download_url} alt="Captura" className="evidence-media" />
            )}
            
            {(ev.type === 'LOG' || ev.type === 'SYSTEM_RESULT' || ev.type === 'TIME_EVENT') && (
              <pre className="evidence-logs">{JSON.stringify(ev.metadata, null, 2)}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

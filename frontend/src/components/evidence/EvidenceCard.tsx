import { memo, useEffect, useState } from 'react';
import api from '@/services/api';
import type { NormalizedEvidence } from '@/components/evidence/EvidenceNormalizer';
import './EvidenceCard.css';

interface EvidenceCardProps {
  evidence: NormalizedEvidence;
  compact?: boolean;
}

function EvidenceMedia({ evidence }: { evidence: NormalizedEvidence }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(evidence.objectUrl || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (evidence.objectUrl) {
      setObjectUrl(evidence.objectUrl);
      return;
    }

    let mounted = true;
    let nextUrl: string | null = null;

    const load = async () => {
      if (!evidence.downloadUrl) return;

      setError(null);
      try {
        const blob = await api.blob(evidence.downloadUrl);
        nextUrl = URL.createObjectURL(blob);
        if (mounted) setObjectUrl(nextUrl);
      } catch {
        if (mounted) setError('No se pudo cargar el archivo de evidencia.');
      }
    };

    void load();

    return () => {
      mounted = false;
      if (nextUrl) URL.revokeObjectURL(nextUrl);
    };
  }, [evidence.downloadUrl, evidence.objectUrl]);

  if (!evidence.downloadUrl && !evidence.objectUrl) return null;
  if (error) return <p className="evidence-card-file-error">{error}</p>;
  if (!objectUrl) return <p className="evidence-card-file-loading">Cargando archivo...</p>;

  if (evidence.preview === 'image') {
    return <img src={objectUrl} alt={evidence.title} className="evidence-card-media" />;
  }

  if (evidence.preview === 'audio') {
    return <audio src={objectUrl} controls className="evidence-card-media" />;
  }

  if (evidence.preview === 'video') {
    return <video src={objectUrl} controls preload="metadata" className="evidence-card-media" />;
  }

  return null;
}

function EvidenceCardImpl({ evidence, compact = false }: EvidenceCardProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const hasTechnicalDetails = Object.keys(evidence.technicalDetails || {}).length > 0;

  return (
    <article className={`evidence-card-normalized ${compact ? 'evidence-card-compact' : ''}`}>
      <header className="evidence-card-header">
        <div>
          <span className={`evidence-card-type evidence-card-type-${evidence.type.toLowerCase()}`}>{evidence.shortLabel}</span>
          <h4>{evidence.title}</h4>
        </div>
        {evidence.fileName && <small>{evidence.fileName}</small>}
      </header>

      <p className="evidence-card-summary">{evidence.clinicalSummary}</p>
      <EvidenceMedia evidence={evidence} />

      {evidence.keyDetails.length > 0 && (
        <dl className="evidence-card-details">
          {evidence.keyDetails.map((detail) => (
            <div key={`${detail.label}-${detail.value}`}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {hasTechnicalDetails && (
        <div className="evidence-card-technical">
          <button type="button" onClick={() => setShowTechnicalDetails((current) => !current)}>
            {showTechnicalDetails ? 'Ocultar detalles técnicos' : 'Ver detalles técnicos'}
          </button>
          {showTechnicalDetails && <pre>{JSON.stringify(evidence.technicalDetails, null, 2)}</pre>}
        </div>
      )}
    </article>
  );
}

export const EvidenceCard = memo(EvidenceCardImpl);
export default EvidenceCard;

import { useMemo, useState } from 'react';
import { EvidenceCard } from './EvidenceCard';
import type { NormalizedEvidence } from './EvidenceNormalizer';
import './EvidenceCollection.css';

interface EvidenceCollectionProps {
  evidences: NormalizedEvidence[];
  compact?: boolean;
}

type EvidenceGroupKey = 'all' | 'files' | 'summaries' | 'events' | 'technical';

const groupLabels: Record<EvidenceGroupKey, string> = {
  all: 'Todas',
  files: 'Archivos',
  summaries: 'Resumen',
  events: 'Eventos',
  technical: 'Técnicas',
};

function groupEvidence(evidences: NormalizedEvidence[]) {
  const files = evidences.filter((evidence) => ['SCREENSHOT', 'AUDIO', 'VIDEO', 'CAMERA_FRAME'].includes(evidence.type));
  const events = evidences.filter((evidence) => ['EVENT', 'TIME_EVENT'].includes(evidence.type));
  const summaries = evidences.filter((evidence) => ['LOG', 'SYSTEM_RESULT'].includes(evidence.type) && !String(evidence.technicalDetails?.event || '').startsWith('EVIDENCE_'));
  const technical = evidences.filter((evidence) => {
    const event = String(evidence.technicalDetails?.event || evidence.technicalDetails?.event_type || '');
    return event.startsWith('EVIDENCE_') || event.startsWith('MEDIA_') || (!files.includes(evidence) && !events.includes(evidence) && !summaries.includes(evidence));
  });

  return { all: evidences, files, summaries, events, technical };
}

export function EvidenceCollection({ evidences, compact = false }: EvidenceCollectionProps) {
  const grouped = useMemo(() => groupEvidence(evidences), [evidences]);
  const [activeGroup, setActiveGroup] = useState<EvidenceGroupKey>('all');
  const visible = grouped[activeGroup];

  return (
    <section className="evidence-collection">
      <div className="evidence-collection-tabs" role="tablist" aria-label="Filtro de evidencias">
        {(Object.keys(groupLabels) as EvidenceGroupKey[]).map((key) => (
          <button
            type="button"
            key={key}
            className={activeGroup === key ? 'is-active' : ''}
            onClick={() => setActiveGroup(key)}
            role="tab"
            aria-selected={activeGroup === key}
          >
            {groupLabels[key]}
            <span>{grouped[key].length}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="evidence-collection-empty">No hay evidencias en esta sección.</p>
      ) : (
        <div className="evidence-collection-list">
          {visible.map((evidence) => <EvidenceCard key={evidence.id} evidence={evidence} compact={compact} />)}
        </div>
      )}
    </section>
  );
}

export default EvidenceCollection;

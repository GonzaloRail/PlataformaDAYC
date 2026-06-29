import { EVIDENCE_REGISTRY } from '@/components/evidence/EvidenceRegistry';
import type { EvidenceType } from '@/components/evidence/EvidenceRegistry';
import './EvidenceControlPanel.css';

const DEFAULT_OPTIONS: EvidenceType[] = ['LOG', 'TIME_EVENT', 'SCREENSHOT', 'AUDIO', 'VIDEO', 'CAMERA_FRAME'];

interface EvidenceControlPanelProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
  availableTypes?: EvidenceType[];
  title?: string;
  description?: string;
  disabled?: boolean;
}

function permissionLabel(permission: string) {
  if (permission === 'microphone') return 'Requiere micrófono';
  if (permission === 'camera') return 'Requiere cámara';
  if (permission === 'camera_microphone') return 'Requiere cámara y micrófono';
  return 'Sin permiso adicional';
}

export function EvidenceControlPanel({
  selectedTypes,
  onChange,
  availableTypes = DEFAULT_OPTIONS,
  title = 'Evidencias activas',
  description = 'Activa o desactiva las evidencias que se capturaran durante la actividad.',
  disabled = false,
}: EvidenceControlPanelProps) {
  const toggle = (type: EvidenceType) => {
    if (disabled) return;
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((item) => item !== type));
      return;
    }
    onChange([...selectedTypes, type]);
  };

  return (
    <section className="evidence-control-panel" aria-label={title}>
      <div className="evidence-control-heading">
        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
        <span>{selectedTypes.length} activas</span>
      </div>

      <div className="evidence-control-grid">
        {availableTypes.map((type) => {
          const definition = EVIDENCE_REGISTRY[type];
          const isActive = selectedTypes.includes(type);
          return (
            <button
              type="button"
              key={type}
              className={`evidence-control-option ${isActive ? 'is-active' : ''}`}
              onClick={() => toggle(type)}
              disabled={disabled}
              aria-pressed={isActive}
            >
              <span className="evidence-control-check" aria-hidden="true">{isActive ? '✓' : '+'}</span>
              <span className="evidence-control-copy">
                <strong>{definition.label}</strong>
                <small>{definition.description}</small>
                <em>{permissionLabel(definition.permission)}</em>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default EvidenceControlPanel;

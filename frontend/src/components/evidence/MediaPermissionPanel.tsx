import { useEffect, useMemo } from 'react';
import { useMediaPermissions } from '@/components/evidence/MediaPermissionProvider';
import './MediaPermissionPanel.css';

interface MediaPermissionPanelProps {
  evidenceTypes: string[];
}

function getRequirements(evidenceTypes: string[]) {
  const needsVideo = evidenceTypes.includes('VIDEO') || evidenceTypes.includes('CAMERA_FRAME');
  const needsAudio = evidenceTypes.includes('AUDIO') || evidenceTypes.includes('VIDEO');
  return { audio: needsAudio, video: needsVideo };
}

function statusLabel(status: string) {
  if (status === 'requesting') return 'Solicitando permisos...';
  if (status === 'ready') return 'Permisos listos';
  if (status === 'denied') return 'Permiso denegado';
  if (status === 'unsupported') return 'No soportado por este navegador';
  if (status === 'error') return 'No se pudo preparar';
  return 'No preparado';
}

export function MediaPermissionPanel({ evidenceTypes }: MediaPermissionPanelProps) {
  const media = useMediaPermissions();
  const requirements = useMemo(() => getRequirements(evidenceTypes), [evidenceTypes]);
  const needsMedia = requirements.audio || requirements.video;

  useEffect(() => {
    if (!needsMedia) return;
    if (media.status === 'idle' || media.status === 'error' || media.status === 'denied') {
      void media.prepareMedia(requirements);
    }
  }, [needsMedia, media, requirements]);

  if (!needsMedia) return null;

  const requirementsLabel = requirements.video && requirements.audio
    ? 'cámara y micrófono'
    : requirements.video
      ? 'cámara'
      : 'micrófono';

  return (
    <section className={`media-permission-panel media-permission-${media.status}`}>
      <div>
        <strong>Permisos multimedia</strong>
        <p>
          {media.status === 'ready'
            ? `Esta prueba capturará ${requirementsLabel}.`
            : media.status === 'denied' || media.status === 'error'
              ? `No se pudo capturar ${requirementsLabel}. Puedes continuar sin grabar evidencia multimedia.`
              : `El navegador solicitará permiso para ${requirementsLabel}. Acepta para grabar la evidencia.`}
        </p>
        {media.error && <small>{media.error}</small>}
      </div>
      <div className="media-permission-actions">
        <span>{statusLabel(media.status)}</span>
        {(media.status === 'denied' || media.status === 'error') && (
          <button type="button" onClick={() => void media.prepareMedia(requirements)} disabled={false}>
            Reintentar
          </button>
        )}
      </div>
    </section>
  );
}

export default MediaPermissionPanel;

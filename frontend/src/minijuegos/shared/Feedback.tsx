import { useEffect, useState } from 'react';
import { FEEDBACK_COLORS, FEEDBACK_LABELS, type FeedbackConfig, type FeedbackKind } from './feedback';
import { FEEDBACK_ICONS } from './feedback';
import './feedback.css';

interface FeedbackBannerProps {
  kind: FeedbackKind | null;
  message: string;
  onDismiss?: () => void;
  autoHideMs?: number;
}

export function FeedbackBanner({ kind, message, onDismiss, autoHideMs }: FeedbackBannerProps) {
  const [visible, setVisible] = useState(!!kind);

  useEffect(() => {
    setVisible(!!kind);
    if (kind && autoHideMs) {
      const timer = window.setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, autoHideMs);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [kind, message, autoHideMs, onDismiss]);

  if (!kind || !visible) return null;

  const colors = FEEDBACK_COLORS[kind];
  const icon = FEEDBACK_ICONS[kind];

  return (
    <div className={`sg-feedback is-${kind}`} role="status" aria-live="polite" style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}>
      <img src={icon} alt={FEEDBACK_LABELS[kind]} className="sg-feedback-icon" />
      <span className="sg-feedback-text">{message}</span>
    </div>
  );
}

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="sg-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current} aria-label={`Progreso ${current} de ${total}`}>
      <div className="sg-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function CelebrationOverlay({ config, onClose }: { config: FeedbackConfig | null; onClose: () => void }) {
  if (!config) return null;
  const icon = FEEDBACK_ICONS[config.kind];
  return (
    <div className="sg-celebration-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Celebracion">
      <div className="sg-celebration-content">
        <img src={icon} alt="" className="sg-celebration-icon" />
        <p className="sg-celebration-message">{config.message}</p>
      </div>
    </div>
  );
}

export { FEEDBACK_COLORS, FEEDBACK_LABELS, FEEDBACK_ICONS };
export type { FeedbackConfig, FeedbackKind };

import { ReactNode } from 'react';
import type { RefObject } from 'react';
import { PedagogicalMascot } from '../child/PedagogicalMascot';
import './KidGameShell.css';

interface KidGameShellProps {
  title: string;
  subtitle: string;
  variant?: 'standalone' | 'embedded';
  progressLabel?: string;
  mascotMessage?: string;
  playArea: ReactNode;
  playAreaRef?: RefObject<HTMLElement | null>;
  actions?: ReactNode;
  footer?: ReactNode;
}

export default function KidGameShell({
  title,
  subtitle,
  variant = 'standalone',
  progressLabel,
  mascotMessage,
  playArea,
  playAreaRef,
  actions,
  footer,
}: KidGameShellProps) {
  const isEmbedded = variant === 'embedded';

  return (
    <section className={isEmbedded ? 'kid-shell kid-shell-embedded' : 'kid-shell'} role="group" aria-label={title}>
      <div className="kid-shell-bg" aria-hidden="true" />

      {!isEmbedded && (
        <header className="kid-shell-header">
          <div className="kid-shell-heading">
            <p className="kid-shell-eyebrow">Miniaventura</p>
            <h2>{title}</h2>
            <p className="kid-shell-subtitle">{subtitle}</p>
          </div>
          {progressLabel && <span className="kid-shell-progress">{progressLabel}</span>}
        </header>
      )}

      {!isEmbedded && mascotMessage && (
        <div className="kid-shell-mascot" role="status" aria-live="polite">
          <PedagogicalMascot className="kid-shell-mascot-animation" animation="talking" />
          <p>{mascotMessage}</p>
        </div>
      )}

      <main className="kid-shell-play" ref={playAreaRef as RefObject<HTMLElement>}>{playArea}</main>
      {actions ? <div className="kid-shell-actions">{actions}</div> : null}

      {footer && <footer className="kid-shell-footer">{footer}</footer>}
    </section>
  );
}

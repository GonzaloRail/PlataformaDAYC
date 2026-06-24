import type { ReactNode } from 'react';

interface TwoPanelActivityLayoutProps {
  leftTitle: string;
  left: ReactNode;
  rightTitle: string;
  right: ReactNode;
  rightMeta?: ReactNode;
  className?: string;
}

export function TwoPanelActivityLayout({
  leftTitle,
  left,
  rightTitle,
  right,
  rightMeta,
  className = '',
}: TwoPanelActivityLayoutProps) {
  return (
    <div className={`two-panel-activity ${className}`.trim()}>
      <section className="two-panel-card two-panel-model" aria-label={leftTitle}>
        <p className="two-panel-label">{leftTitle}</p>
        {left}
      </section>

      <section className="two-panel-card two-panel-response" aria-label={rightTitle}>
        <div className="two-panel-response-header">
          <p className="two-panel-label">{rightTitle}</p>
          {rightMeta ? <span>{rightMeta}</span> : null}
        </div>
        {right}
      </section>
    </div>
  );
}

export default TwoPanelActivityLayout;

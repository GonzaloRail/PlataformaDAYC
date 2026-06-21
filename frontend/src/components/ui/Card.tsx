import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  const classes = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    onClick ? 'card-clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
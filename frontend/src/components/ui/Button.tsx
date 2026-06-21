import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    isLoading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && <span className="btn-spinner" />}
      {!isLoading && leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
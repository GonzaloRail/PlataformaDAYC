import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftElement,
  rightElement,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <div className={`input-container ${hasError ? 'input-error' : ''}`}>
        {leftElement && <span className="input-element input-left">{leftElement}</span>}
        <input
          id={inputId}
          className={`input-field ${leftElement ? 'has-left' : ''} ${rightElement ? 'has-right' : ''}`}
          {...props}
        />
        {rightElement && <span className="input-element input-right">{rightElement}</span>}
      </div>
      {error && <span className="input-error-text">{error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
};

export default Input;
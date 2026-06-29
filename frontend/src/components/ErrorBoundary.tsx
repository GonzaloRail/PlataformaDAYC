import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches uncaught render errors and shows a fallback UI instead of
 * unmounting the whole React tree.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] uncaught render error:', error, info.componentStack);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        style={{
          padding: '40px',
          maxWidth: '640px',
          margin: '40px auto',
          fontFamily: 'system-ui, sans-serif',
          color: '#1f2937',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
        }}
      >
        <h1 style={{ marginTop: 0, color: '#991b1b' }}>Algo salió mal</h1>
        <p>La aplicación encontró un error inesperado.</p>
        {this.state.error?.message && (
          <pre
            style={{
              background: '#fff',
              padding: '12px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {this.state.error.message}
          </pre>
        )}
        <button
          type="button"
          onClick={this.handleReload}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            background: '#991b1b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Recargar página
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;

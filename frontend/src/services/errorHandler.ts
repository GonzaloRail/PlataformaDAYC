export interface ErrorInfo {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
  timestamp: string;
  context?: string;
}

export type ErrorLevel = 'error' | 'warning' | 'info';

class ErrorHandler {
  private errors: ErrorInfo[] = [];
  private listeners: ((error: ErrorInfo, level: ErrorLevel) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError);
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
  }

  private handleGlobalError = (event: ErrorEvent) => {
    const errorInfo: ErrorInfo = {
      message: event.message || 'Error de JavaScript',
      details: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      timestamp: new Date().toISOString(),
      context: 'window.onerror',
    };
    this.report(errorInfo, 'error');
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const errorInfo: ErrorInfo = {
      message: event.reason?.message || 'Promise no manejado',
      details: { reason: event.reason },
      timestamp: new Date().toISOString(),
      context: 'unhandledrejection',
    };
    this.report(errorInfo, 'error');
  };

  report(error: ErrorInfo | Error, level: ErrorLevel = 'error', context?: string): void {
    const errorInfo: ErrorInfo = {
      message: error instanceof Error ? error.message : error.message || 'Error desconocido',
      status: 'status' in error ? error.status : undefined,
      details: 'details' in error ? error.details : undefined,
      timestamp: new Date().toISOString(),
      context: context || ((error as any).context as string | undefined),
    };

    this.errors.push(errorInfo);
    
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }

    this.listeners.forEach((listener) => listener(errorInfo, level));

    if (level === 'error') {
      console.error('[ErrorHandler]', errorInfo);
    }
  }

  subscribe(listener: (error: ErrorInfo, level: ErrorLevel) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  getErrorsByContext(context: string): ErrorInfo[] {
    return this.errors.filter((e) => e.context === context);
  }
}

export const errorHandler = new ErrorHandler();

export const createApiErrorHandler = (context: string) => (error: unknown) => {
  let message = 'Error de API';
  let status: number | undefined;

  if (error && typeof error === 'object' && 'status' in error) {
    status = (error as any).status;
    message = (error as any).message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  errorHandler.report(
    { message, status, timestamp: new Date().toISOString(), context },
    'error',
    context
  );

  return { message, status };
};

export default errorHandler;
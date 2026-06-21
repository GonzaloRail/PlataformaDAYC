import { store } from '../store';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const defaultOptions: RequestOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...defaultOptions,
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        store.setState({ user: null, isAuthenticated: false });
        throw new ApiError(response.status, 'Unauthorized');
      }
      const errorText = await response.text();
      throw new ApiError(response.status, errorText || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),

  download: async (endpoint: string, filename: string) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...defaultOptions,
      method: 'GET',
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};

export { ApiError };
export default api;

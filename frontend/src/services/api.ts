import { store } from '../store';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function toApiUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  return `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const extractErrorMessage = (status: number, responseText: string): string => {
  if (!responseText) return `Error HTTP ${status}`;

  try {
    const parsed = JSON.parse(responseText) as unknown;
    if (parsed && typeof parsed === 'object') {
      const payload = parsed as Record<string, unknown>;
      const candidate = payload.detail || payload.message || payload.error || Object.values(payload)[0];
      if (typeof candidate === 'string') return candidate;
      if (Array.isArray(candidate) && typeof candidate[0] === 'string') return candidate[0];
    }
  } catch {
    // Some backend errors are HTML debug pages; do not expose them in the UI.
  }

  if (/<[a-z][\s\S]*>/i.test(responseText)) {
    return status >= 500
      ? 'El servidor devolvio un error inesperado. Intenta nuevamente.'
      : 'No se pudo completar la solicitud. Revisa los datos e intenta nuevamente.';
  }

  return responseText.length > 180 ? responseText.slice(0, 177).trim() + '...' : responseText;
};

const defaultOptions: RequestOptions = {
  credentials: 'include',
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(toApiUrl(endpoint), {
      ...defaultOptions,
      cache: 'no-store',
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        store.setState({ user: null, isAuthenticated: false });
        throw new ApiError(response.status, 'Unauthorized');
      }
      const errorText = await response.text();
      throw new ApiError(response.status, extractErrorMessage(response.status, errorText));
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

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => {
    const isFormData = data instanceof FormData;
    const headers = isFormData
      ? options?.headers
      : { 'Content-Type': 'application/json', ...(options?.headers || {}) };
    return request<T>(endpoint, { ...options, headers, method: 'POST', body: isFormData ? data : JSON.stringify(data) });
  },

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => {
    const isFormData = data instanceof FormData;
    const headers = isFormData
      ? options?.headers
      : { 'Content-Type': 'application/json', ...(options?.headers || {}) };
    return request<T>(endpoint, { ...options, headers, method: 'PUT', body: isFormData ? data : JSON.stringify(data) });
  },

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => {
    const isFormData = data instanceof FormData;
    const headers = isFormData
      ? options?.headers
      : { 'Content-Type': 'application/json', ...(options?.headers || {}) };
    return request<T>(endpoint, { ...options, headers, method: 'PATCH', body: isFormData ? data : JSON.stringify(data) });
  },

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),

  blob: async (endpoint: string, options?: RequestOptions) => {
    const response = await fetch(toApiUrl(endpoint), {
      ...defaultOptions,
      ...options,
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(response.status, extractErrorMessage(response.status, errorText));
    }

    return response.blob();
  },

  download: async (endpoint: string, filename: string) => {
    const response = await fetch(toApiUrl(endpoint), {
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

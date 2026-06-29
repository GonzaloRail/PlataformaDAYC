import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

export type SessionTarget = 'child' | 'adult';

export interface SessionJoinState {
  sessionCode: string;
  setSessionCode: (code: string) => void;
  isLoading: boolean;
  error: string | null;
  openSession: (target: SessionTarget) => Promise<void>;
}

const MIN_CODE_LENGTH = 6;

/**
 * Shared logic for joining a session by code: validates the code, calls the
 * backend, and navigates to the requested target (`/child/evaluation/...` or
 * `/adult/session/...`).
 */
export function useSessionJoin(): SessionJoinState {
  const [sessionCode, setSessionCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const openSession = async (target: SessionTarget) => {
    const normalizedCode = sessionCode.trim().toUpperCase();
    if (normalizedCode.length < MIN_CODE_LENGTH) return;
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/evaluaciones/join/', { session_code: normalizedCode });
      const path = target === 'adult' ? `/adult/session/${normalizedCode}` : `/child/evaluation/${normalizedCode}`;
      navigate(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Código de sesión no válido o evaluación no disponible');
    } finally {
      setIsLoading(false);
    }
  };

  return { sessionCode, setSessionCode, isLoading, error, openSession };
}

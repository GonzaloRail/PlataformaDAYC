import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { setSessionToken } from '@/services/evaluacionesApi';

export interface SessionJoinState {
  sessionCode: string;
  setSessionCode: (code: string) => void;
  invitationCode: string;
  setInvitationCode: (code: string) => void;
  isLoading: boolean;
  error: string | null;
  openSession: () => Promise<void>;
}

const MIN_CODE_LENGTH = 6;

function getDeviceId() {
  const stored = localStorage.getItem('dayc-device-id');
  if (stored) return stored;
  const created = crypto.randomUUID();
  localStorage.setItem('dayc-device-id', created);
  return created;
}

/**
 * Shared logic for joining a session with a server-issued invitation. The
 * invitation determines the role; the client cannot select it.
 */
export function useSessionJoin(): SessionJoinState {
  const [sessionCode, setSessionCode] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const openSession = async () => {
    const normalizedCode = sessionCode.trim().toUpperCase();
    const normalizedInvitation = invitationCode.trim();
    if (normalizedCode.length < MIN_CODE_LENGTH || !normalizedInvitation) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<{ session_token?: string; actor_role: 'CHILD' | 'ADULT' }>('/api/evaluaciones/join/', {
        session_code: normalizedCode,
        invitation_code: normalizedInvitation,
        device_id: getDeviceId(),
      });
      if (response.session_token) setSessionToken(normalizedCode, response.actor_role, response.session_token);
      const path = response.actor_role === 'ADULT' ? `/adult/session/${normalizedCode}` : `/child/evaluation/${normalizedCode}`;
      navigate(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Código de sesión no válido o evaluación no disponible');
    } finally {
      setIsLoading(false);
    }
  };

  return { sessionCode, setSessionCode, invitationCode, setInvitationCode, isLoading, error, openSession };
}

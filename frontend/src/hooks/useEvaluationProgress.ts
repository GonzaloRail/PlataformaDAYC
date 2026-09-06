import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/services/api';
import { devLog } from '@/utils/logger';

export interface ProgressInfo {
  eventId: string;
  totalItems: number;
  completedItems: number;
  currentItem: string;
  estado: string;
  version: number;
  serverTime: string;
}

interface ProgressPayload {
  event_id?: string;
  total_items?: number;
  completed_items?: number;
  current_item?: string;
  estado?: string;
  totalItems?: number;
  completedItems?: number;
  currentItem?: string;
  version?: number;
  server_time?: string;
}

export function parseProgressMessage(rawMessage: string): ProgressInfo | null {
  try {
    const data = JSON.parse(rawMessage) as { type?: string; data?: ProgressPayload } & ProgressPayload;
    if (data.type !== 'progress') return null;
    const payload = data.data || data;
    return {
      eventId: payload.event_id ?? '',
      totalItems: payload.total_items ?? payload.totalItems ?? 0,
      completedItems: payload.completed_items ?? payload.completedItems ?? 0,
      currentItem: payload.current_item ?? payload.currentItem ?? '',
      estado: payload.estado ?? '',
      version: payload.version ?? 0,
      serverTime: payload.server_time ?? '',
    };
  } catch {
    return null;
  }
}

export const useEvaluationProgress = (
  evaluacionId: string,
  sessionToken?: string,
  onRemoteUpdate?: () => void,
) => {
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const progressRef = useRef<ProgressInfo | null>(null);
  const onRemoteUpdateRef = useRef(onRemoteUpdate);

  useEffect(() => {
    onRemoteUpdateRef.current = onRemoteUpdate;
  }, [onRemoteUpdate]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const updateProgress = useCallback(async () => {
    if (!evaluacionId) return;

    try {
      const data = await api.get<{
        event_id?: string;
        total_items: number;
        completed_items: number;
        current_item: string;
        estado: string;
        version?: number;
        server_time?: string;
      }>(`/api/evaluaciones/${evaluacionId}/progress/`, {
        headers: sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {},
      });

      setProgress({
        eventId: data.event_id ?? '',
        totalItems: data.total_items,
        completedItems: data.completed_items,
        currentItem: data.current_item,
        estado: data.estado,
        version: data.version ?? 0,
        serverTime: data.server_time ?? '',
      });
    } catch (err) {
      devLog.error('EvaluationProgress', 'Error fetching progress:', err);
    }
  }, [evaluacionId, sessionToken]);

  useEffect(() => {
    if (!evaluacionId) return;

    updateProgress();

    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws/evaluation/${evaluacionId}/`;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;

      try {
        const protocols = sessionToken ? [`dayc-session.${sessionToken}`] : undefined;
        ws = new WebSocket(wsUrl, protocols);

        ws.onopen = () => {
          if (cancelled) {
            ws?.close();
            return;
          }
          setIsConnected(true);
          ws?.send(JSON.stringify({ action: 'join_evaluation', evaluation_id: evaluacionId }));
        };

        ws.onmessage = (event) => {
          const nextProgress = parseProgressMessage(event.data);
          if (!nextProgress) return;
          const previous = progressRef.current;
          const changed = Boolean(previous && (
            previous.totalItems !== nextProgress.totalItems
            || previous.completedItems !== nextProgress.completedItems
            || previous.currentItem !== nextProgress.currentItem
            || previous.estado !== nextProgress.estado
            || previous.version !== nextProgress.version
          ));
          setProgress({
            eventId: nextProgress.eventId,
            totalItems: nextProgress.totalItems ?? previous?.totalItems ?? 0,
            completedItems: nextProgress.completedItems ?? previous?.completedItems ?? 0,
            currentItem: nextProgress.currentItem,
            estado: nextProgress.estado,
            version: nextProgress.version,
            serverTime: nextProgress.serverTime,
          });
          // The consumer sends a snapshot immediately after connection. It is
          // not a remote mutation and must not trigger a reload loop.
          if (changed) onRemoteUpdateRef.current?.();
        };

        ws.onclose = () => {
          setIsConnected(false);
          if (!cancelled) reconnectTimer = setTimeout(connect, 3000);
        };
        ws.onerror = () => setIsConnected(false);

        wsRef.current = ws;
      } catch (err) {
        devLog.error('EvaluationProgress', 'WebSocket connection failed:', err);
        setIsConnected(false);
        if (!cancelled) reconnectTimer = setTimeout(connect, 3000);
      }
    };

    connect();

    const interval = setInterval(updateProgress, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [evaluacionId, sessionToken, updateProgress]);

  return {
    progress,
    isConnected,
    updateProgress,
  };
};

export default useEvaluationProgress;

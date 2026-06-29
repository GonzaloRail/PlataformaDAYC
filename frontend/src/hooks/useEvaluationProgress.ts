import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/services/api';

interface ProgressInfo {
  totalItems: number;
  completedItems: number;
  currentItem: string;
  estado: string;
}

export const useEvaluationProgress = (evaluacionId: string) => {
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const progressRef = useRef<ProgressInfo | null>(null);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const updateProgress = useCallback(async () => {
    if (!evaluacionId) return;

    try {
      const data = await api.get<{
        total_items: number;
        completed_items: number;
        current_item: string;
        estado: string;
      }>(`/api/evaluaciones/${evaluacionId}/progress/`);

      setProgress({
        totalItems: data.total_items,
        completedItems: data.completed_items,
        currentItem: data.current_item,
        estado: data.estado,
      });
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  }, [evaluacionId]);

  useEffect(() => {
    if (!evaluacionId) return;

    updateProgress();

    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws/evaluation/${evaluacionId}/`;
    let ws: WebSocket | null = null;
    let cancelled = false;

    try {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        if (cancelled) {
          ws?.close();
          return;
        }
        setIsConnected(true);
        ws?.send(JSON.stringify({ action: 'join_evaluation', evaluation_id: evaluacionId }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type !== 'progress') return;
        const previous = progressRef.current;
        setProgress({
          totalItems: data.total_items || previous?.totalItems || 0,
          completedItems: data.completed_items || previous?.completedItems || 0,
          currentItem: data.current_item || '',
          estado: data.estado || '',
        });
      };

      ws.onclose = () => setIsConnected(false);
      ws.onerror = () => setIsConnected(false);

      wsRef.current = ws;
    } catch (err) {
      console.error('WebSocket connection failed:', err);
      setIsConnected(false);
    }

    const interval = setInterval(updateProgress, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      ws?.close();
    };
  }, [evaluacionId, updateProgress]);

  return {
    progress,
    isConnected,
    updateProgress,
  };
};

export default useEvaluationProgress;

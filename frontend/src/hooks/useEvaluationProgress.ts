import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

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

  const connectWebSocket = useCallback(() => {
    if (!evaluacionId || wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws/evaluation/${evaluacionId}/`;
    
    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        ws.send(JSON.stringify({ action: 'join_evaluation', evaluation_id: evaluacionId }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'progress') {
          setProgress({
            totalItems: data.total_items || progress?.totalItems || 0,
            completedItems: data.completed_items || progress?.completedItems || 0,
            currentItem: data.current_item || '',
            estado: data.estado || '',
          });
        }
      };

      ws.onclose = () => setIsConnected(false);
      ws.onerror = () => setIsConnected(false);

      wsRef.current = ws;
    } catch (err) {
      console.error('WebSocket connection failed:', err);
      setIsConnected(false);
    }
  }, [evaluacionId, progress]);

  useEffect(() => {
    if (evaluacionId) {
      updateProgress();
      connectWebSocket();

      const interval = setInterval(updateProgress, 10000);
      return () => {
        clearInterval(interval);
        wsRef.current?.close();
      };
    }
  }, [evaluacionId, updateProgress, connectWebSocket]);

  return {
    progress,
    isConnected,
    updateProgress,
  };
};

export default useEvaluationProgress;

import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface RuleInfo {
  triggered: boolean;
  ruleName: string;
  reason: string;
}

interface RuleState {
  isMonitoring: boolean;
  base111: {
    errorsInCurrentStreak: number;
    subtestsWithErrors: string[];
    willTrigger: boolean;
  };
  limite3of5: {
    recentErrors: number;
    willTrigger: boolean;
  };
  currentRule: RuleInfo | null;
  progress: {
    totalResponses: number;
    consecutiveErrors: number;
    subtests: string[];
  };
}

const initialState: RuleState = {
  isMonitoring: false,
  base111: {
    errorsInCurrentStreak: 0,
    subtestsWithErrors: [],
    willTrigger: false,
  },
  limite3of5: {
    recentErrors: 0,
    willTrigger: false,
  },
  currentRule: null,
  progress: {
    totalResponses: 0,
    consecutiveErrors: 0,
    subtests: [],
  },
};

export const useEvaluationRules = (evaluacionId: string | null) => {
  const [state, setState] = useState<RuleState>(initialState);

  const fetchRuleStatus = useCallback(async () => {
    if (!evaluacionId) return;

    try {
      const data = await api.get<{
        total_respuestas: number;
        errores_consecutivos: number;
        subtests: string[];
        errores_por_subtest: Record<string, number>;
        ultimos_5_tienen_errores: number;
        regla_base_111: boolean;
        regla_limite_3de5: boolean;
        regla_activa: { nombre: string; razon: string } | null;
      }>(`/api/evaluaciones/${evaluacionId}/reglas-status/`);

      setState((prev) => ({
        ...prev,
        isMonitoring: true,
        progress: {
          totalResponses: data.total_respuestas,
          consecutiveErrors: data.errores_consecutivos,
          subtests: data.subtests,
        },
        base111: {
          errorsInCurrentStreak: data.errores_consecutivos,
          subtestsWithErrors: data.subtests,
          willTrigger: data.regla_base_111,
        },
        limite3of5: {
          recentErrors: data.ultimos_5_tienen_errores,
          willTrigger: data.regla_limite_3de5,
        },
        currentRule: data.regla_activa
          ? {
              triggered: true,
              ruleName: data.regla_activa.nombre,
              reason: data.regla_activa.razon,
            }
          : null,
      }));
    } catch (err) {
      console.error('Error fetching rule status:', err);
    }
  }, [evaluacionId]);

  useEffect(() => {
    if (evaluacionId) {
      fetchRuleStatus();

      const interval = setInterval(fetchRuleStatus, 3000);
      return () => clearInterval(interval);
    } else {
      setState(initialState);
    }
  }, [evaluacionId, fetchRuleStatus]);

  const getWarningMessage = useCallback((): string | null => {
    if (!state.isMonitoring) return null;

    if (state.limite3of5.willTrigger) {
      return '⚠️ Advertencia: 2 errores en los últimos 5 ítems. Un error más activará la regla LÍMITE.';
    }

    if (state.base111.willTrigger) {
      return '⚠️ Advertencia: 2 subtests tienen errores. Un error en otro subtest activará la regla BASE.';
    }

    if (state.progress.consecutiveErrors >= 3) {
      return `⚠️ ${state.progress.consecutiveErrors} errores consecutivos. La evaluación podría detenerse pronto.`;
    }

    return null;
  }, [state]);

  const getRuleDescription = useCallback((ruleName: string): string => {
    switch (ruleName) {
      case 'BASE_1-1-1':
        return 'Regla BASE (1-1-1): Se detuvo la evaluación porque se detectó 1 error en cada uno de los últimos 3 subtests.';
      case 'LIMITE_3_DE_5':
        return 'Regla LÍMITE (3 de 5): Se detuvo la evaluación porque se detectaron 3 errores en los últimos 5 ítems.';
      default:
        return 'Regla de parada aplicada.';
    }
  }, []);

  const isAtRisk = state.base111.willTrigger || state.limite3of5.willTrigger;

  return {
    ...state,
    isAtRisk,
    warningMessage: getWarningMessage(),
    getRuleDescription,
    refresh: fetchRuleStatus,
  };
};

export default useEvaluationRules;
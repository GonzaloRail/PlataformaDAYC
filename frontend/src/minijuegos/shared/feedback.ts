import checkSvg from '@/assets/minijuegos/feedback/check.svg';
import crossSvg from '@/assets/minijuegos/feedback/cross.svg';
import starSvg from '@/assets/minijuegos/feedback/star.svg';

export type FeedbackKind = 'success' | 'error' | 'partial' | 'info';

export interface FeedbackConfig {
  kind: FeedbackKind;
  message: string;
  durationMs?: number;
}

export const FEEDBACK_ICONS: Record<FeedbackKind, string> = {
  success: checkSvg,
  error: crossSvg,
  partial: starSvg,
  info: starSvg,
};

export const FEEDBACK_LABELS: Record<FeedbackKind, string> = {
  success: 'Correcto',
  error: 'Intentalo otra vez',
  partial: 'Bien',
  info: 'Informacion',
};

export const FEEDBACK_COLORS: Record<FeedbackKind, { bg: string; border: string; text: string }> = {
  success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  error: { bg: '#fee2e2', border: '#ef4444', text: '#7f1d1d' },
  partial: { bg: '#fef3c7', border: '#fbbf24', text: '#78350f' },
  info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e3a8a' },
};

export const classifyAnswer = (correct: boolean, isLast: boolean): FeedbackKind => {
  if (correct) {
    return isLast ? 'success' : 'partial';
  }
  return 'error';
};

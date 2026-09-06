import { describe, it, expect } from 'vitest';
import {
  FEEDBACK_COLORS,
  FEEDBACK_ICONS,
  FEEDBACK_LABELS,
  classifyAnswer,
  type FeedbackKind,
} from '@/minijuegos/shared/feedback';

describe('feedback module', () => {
  describe('FEEDBACK_COLORS', () => {
    it('tiene colores para los 4 kinds', () => {
      const kinds: FeedbackKind[] = ['success', 'error', 'partial', 'info'];
      kinds.forEach((kind) => {
        expect(FEEDBACK_COLORS[kind]).toBeDefined();
        expect(FEEDBACK_COLORS[kind].bg).toBeTypeOf('string');
        expect(FEEDBACK_COLORS[kind].border).toBeTypeOf('string');
        expect(FEEDBACK_COLORS[kind].text).toBeTypeOf('string');
      });
    });

    it('colores empiezan con # (hex)', () => {
      Object.values(FEEDBACK_COLORS).forEach((c) => {
        expect(c.bg.startsWith('#')).toBe(true);
        expect(c.border.startsWith('#')).toBe(true);
        expect(c.text.startsWith('#')).toBe(true);
      });
    });
  });

  describe('FEEDBACK_ICONS', () => {
    it('tiene icono para cada kind', () => {
      const kinds: FeedbackKind[] = ['success', 'error', 'partial', 'info'];
      kinds.forEach((kind) => {
        expect(FEEDBACK_ICONS[kind]).toBeTypeOf('string');
        expect(FEEDBACK_ICONS[kind].length).toBeGreaterThan(0);
      });
    });

    it('los iconos son paths a SVG', () => {
      Object.values(FEEDBACK_ICONS).forEach((icon) => {
        expect(icon.endsWith('.svg')).toBe(true);
      });
    });
  });

  describe('FEEDBACK_LABELS', () => {
    it('tiene labels legibles para cada kind', () => {
      const kinds: FeedbackKind[] = ['success', 'error', 'partial', 'info'];
      kinds.forEach((kind) => {
        expect(FEEDBACK_LABELS[kind]).toBeTypeOf('string');
        expect(FEEDBACK_LABELS[kind].length).toBeGreaterThan(0);
      });
    });
  });

  describe('classifyAnswer', () => {
    it('retorna success si es correcto y es el ultimo', () => {
      expect(classifyAnswer(true, true)).toBe('success');
    });

    it('retorna partial si es correcto pero no es el ultimo', () => {
      expect(classifyAnswer(true, false)).toBe('partial');
    });

    it('retorna error si es incorrecto', () => {
      expect(classifyAnswer(false, true)).toBe('error');
      expect(classifyAnswer(false, false)).toBe('error');
    });
  });
});

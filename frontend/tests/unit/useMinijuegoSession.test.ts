import { describe, it, expect } from 'vitest';
import { buildProgressLabel } from '@/components/minijuegos/shared/useMinijuegoSession';

describe('buildProgressLabel', () => {
  it('formato normal con current < total', () => {
    expect(buildProgressLabel(1, 5)).toBe('Pregunta 1 de 5');
    expect(buildProgressLabel(3, 10)).toBe('Pregunta 3 de 10');
  });

  it('clamp current a minimo 1', () => {
    expect(buildProgressLabel(0, 5)).toBe('Pregunta 1 de 5');
    expect(buildProgressLabel(-1, 5)).toBe('Pregunta 1 de 5');
  });

  it('clamp total a minimo de current', () => {
    expect(buildProgressLabel(5, 3)).toBe('Pregunta 5 de 5');
    expect(buildProgressLabel(10, 0)).toBe('Pregunta 10 de 10');
  });

  it('maneja current = total', () => {
    expect(buildProgressLabel(5, 5)).toBe('Pregunta 5 de 5');
  });

  it('maneja current y total en cero', () => {
    expect(buildProgressLabel(0, 0)).toBe('Pregunta 1 de 1');
  });
});

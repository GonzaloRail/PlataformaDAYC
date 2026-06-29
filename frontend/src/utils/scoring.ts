/**
 * Unified scoring interpretation helpers.
 * Single source of truth for GDQ and standard-score classification.
 *
 * GDQ range (DAYC-2): 40-160, mean 100, SD 15
 * Puntuación Estándar (PE) range: 1-19, mean 10, SD 3
 */

export type GdqLevel = {
  label: string;
  shortLabel: string;
  className: string;
  color: string;
  description: string;
};

export type ScoreLevel = {
  label: string;
  className: string;
};

const GDQ_LEVELS: Array<{ min: number; level: GdqLevel }> = [
  {
    min: 130,
    level: {
      label: 'Excepcionalmente Superior',
      shortLabel: 'Superior',
      className: 'gdq-exceptional',
      color: '#059669',
      description: 'El niño/a muestra habilidades de desarrollo significativamente avanzadas.',
    },
  },
  {
    min: 110,
    level: {
      label: 'Superior',
      shortLabel: 'Superior',
      className: 'gdq-superior',
      color: '#059669',
      description: 'El niño/a presenta un desarrollo cognitivo por encima del promedio.',
    },
  },
  {
    min: 90,
    level: {
      label: 'Promedio',
      shortLabel: 'Promedio',
      className: 'gdq-average',
      color: '#4f46e5',
      description: 'El niño/a se encuentra dentro del rango esperado para su edad.',
    },
  },
  {
    min: 80,
    level: {
      label: 'Bajo el Promedio',
      shortLabel: 'Bajo',
      className: 'gdq-low',
      color: '#f59e0b',
      description: 'El niño/a muestra un desarrollo cognitivo ligeramente inferior al esperado.',
    },
  },
  {
    min: 0,
    level: {
      label: 'Significativamente Bajo',
      shortLabel: 'Muy Bajo',
      className: 'gdq-very-low',
      color: '#dc2626',
      description: 'Se recomienda evaluación adicional y posibles intervenciones.',
    },
  },
];

export function getGdqInterpretation(gdq: number): GdqLevel {
  for (const { min, level } of GDQ_LEVELS) {
    if (gdq >= min) return level;
  }
  return GDQ_LEVELS[GDQ_LEVELS.length - 1].level;
}

const SCORE_LEVELS: Array<{ min: number; level: ScoreLevel }> = [
  { min: 13, level: { label: 'Superior', className: 'score-superior score-high' } },
  { min: 10, level: { label: 'Promedio', className: 'score-average score-normal' } },
  { min: 7, level: { label: 'Bajo', className: 'score-low score-low' } },
  { min: 0, level: { label: 'Muy Bajo', className: 'score-very-low score-very-low' } },
];

export function getScoreCategory(score: number): ScoreLevel {
  for (const { min, level } of SCORE_LEVELS) {
    if (score >= min) return level;
  }
  return SCORE_LEVELS[SCORE_LEVELS.length - 1].level;
}

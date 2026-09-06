import type { ComponentType, ReactNode } from 'react';

export type AreaDAYC2 = 'COGNITIVO' | 'COMUNICACION' | 'SOCIAL_EMOCIONAL' | 'DESARROLLO_FISICO' | 'CONDUCTA_ADAPTATIVA';

export type ItemResult = 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE';

export interface Item {
  id: string;
  area: AreaDAYC2;
  nivel: number;
  instruccion: string;
  respuesta_correcta?: string;
  tiempo_limite_ms?: number;
}

export interface Answer {
  item_id: string;
  resultado: ItemResult;
  tiempo_respuesta_ms: number;
  respuesta_usuario?: string;
}

export interface MinijuegoComponentProps {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export interface MinijuegoConfig {
  id: string;
  area: AreaDAYC2;
  nombre: string;
  items: Item[];
}

export interface MinijuegoPlugin {
  id: string;
  nombre: string;
  areaDAYC2: AreaDAYC2;
  iniciar(params: { itemData: Item; onAnswer: (answer: Answer) => void }): Promise<void>;
  render(): ReactNode;
  cleanup(): void;
  fallback?(): ReactNode;
}

export interface MinijuegoRegistry {
  [key: string]: {
    component: ComponentType<MinijuegoComponentProps>;
    fallback?: ComponentType<MinijuegoComponentProps>;
  };
}

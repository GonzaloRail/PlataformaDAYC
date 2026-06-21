import type { ReactNode } from 'react';

export type AreaDAYC2 = 'MEMORIA' | 'LENGUAJE' | 'ATENCION' | 'PERCEPCION' | 'MOTORA' | 'COGNITIVA';

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
    component: React.ComponentType<any>;
    fallback?: React.ComponentType<any>;
  };
}

export interface EvaluationTask {
  item_id: string;
  minijuego: string;
  instrucciones: string;
  tipo_interaction: 'visual' | 'audio' | 'text' | 'mixed' | 'gate';
  test_actual?: string;
  item_actual?: number;
  items_test_total?: number;
  errores_test_actual?: number;
}

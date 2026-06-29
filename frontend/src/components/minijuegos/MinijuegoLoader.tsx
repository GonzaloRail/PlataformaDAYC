import React, { useState, useEffect } from 'react';
import { minijuegosRegistry } from '@/components/minijuegos/registry';
import type { MinijuegoConfig, Answer, Item } from '@/minijuegos/types';
import { FallbackProtocolView } from '@/components/fallback/FallbackProtocolView';
import './MinijuegoLoader.css';

interface MinijuegoLoaderProps {
  config: MinijuegoConfig;
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
  onError?: (error: Error) => void;
}

export const MinijuegoLoader: React.FC<MinijuegoLoaderProps> = ({
  config,
  currentItem,
  onAnswer,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [Fallback, setFallback] = React.useState<React.ComponentType<any> | null>(null);
  const [fallbackProtocol, setFallbackProtocol] = useState(false);

  useEffect(() => {
    const loadMinijuego = async () => {
      setIsLoading(true);
      setError(null);
      setFallbackProtocol(false);

      try {
        const registryEntry = minijuegosRegistry[config.id];
        if (!registryEntry) {
          setFallbackProtocol(true);
          throw new Error(`Minijuego "${config.id}" no encontrado`);
        }

        if (registryEntry.estado === 'placeholder') {
          setFallbackProtocol(true);
          setComponent(null);
          setFallback(() => registryEntry.fallback || null);
          return;
        }

        setComponent(() => registryEntry.component);
        setFallback(() => registryEntry.fallback || null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMinijuego();
  }, [config.id, onError]);

  if (isLoading) {
    return (
      <div className="minijuego-loader minijuego-loading">
        <div className="minijuego-spinner" />
        <p>Cargando actividad...</p>
      </div>
    );
  }

  if (error || !Component) {
    return (
      <div className="minijuego-loader minijuego-error">
        <p>No se pudo cargar la actividad</p>
        {fallbackProtocol && <FallbackProtocolView />}
        {Fallback && <Fallback currentItem={currentItem} onAnswer={onAnswer} />}
      </div>
    );
  }

  return (
    <div className="minijuego-wrapper">
      <Component currentItem={currentItem} onAnswer={onAnswer} />
    </div>
  );
};

export default MinijuegoLoader;

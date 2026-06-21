import React, { useState } from 'react';
import KidGameShell from '../../components/minijuegos/KidGameShell';
import { FallbackProtocolView } from '../../components/fallback/FallbackProtocolView';
import { FallbackManual } from '../../components/fallback/FallbackManual';
import type { Item, Answer } from '../../minijuegos/types';
import './MinijuegoTemplatePlayground.css';

type PlaygroundMode = 'normal' | 'fallback' | 'manual';
type TemplateVariant = 'aventura' | 'nubes' | 'selva' | 'oceano' | 'arcoiris';

const templateOptions: Array<{ id: TemplateVariant; label: string; subtitle: string }> = [
  { id: 'aventura', label: 'Aventura', subtitle: 'Layout mision con barra lateral' },
  { id: 'nubes', label: 'Nubes', subtitle: 'Layout apilado con tarjetas grandes' },
  { id: 'selva', label: 'Selva', subtitle: 'Layout tablero 2x2 con foco central' },
  { id: 'oceano', label: 'Oceano', subtitle: 'Layout split (instruccion + accion)' },
  { id: 'arcoiris', label: 'Arcoiris', subtitle: 'Layout carrusel de desafios' },
];

const demoItem: Item = {
  id: 'TEMPLATE_001',
  area: 'COGNITIVA',
  nivel: 1,
  instruccion: 'Toca la opcion correcta para continuar.',
};

export const MinijuegoTemplatePlayground: React.FC = () => {
  const [mode, setMode] = useState<PlaygroundMode>('normal');
  const [variant, setVariant] = useState<TemplateVariant>('aventura');
  const [lastAnswer, setLastAnswer] = useState<Answer | null>(null);

  const handleAnswer = (answer: Answer) => {
    setLastAnswer(answer);
  };

  const renderPlayArea = () => {
    if (variant === 'aventura') {
      return (
        <div className="variant-area variant-aventura-area">
          <div className="variant-badge">Mision activa</div>
          <div className="variant-main-card">Ayuda al explorador a elegir la respuesta</div>
        </div>
      );
    }

    if (variant === 'nubes') {
      return (
        <div className="variant-area variant-nubes-area">
          <div className="nube nube-a" />
          <div className="nube nube-b" />
          <div className="variant-main-card">Escucha y toca la opcion correcta</div>
        </div>
      );
    }

    if (variant === 'selva') {
      return (
        <div className="variant-area variant-selva-area">
          <div className="selva-leaf leaf-a" />
          <div className="selva-leaf leaf-b" />
          <div className="variant-main-card">Encuentra la pista escondida en la selva</div>
        </div>
      );
    }

    if (variant === 'oceano') {
      return (
        <div className="variant-area variant-oceano-area">
          <div className="wave wave-a" />
          <div className="wave wave-b" />
          <div className="variant-main-card">Nada hasta la respuesta correcta</div>
        </div>
      );
    }

    return (
      <div className="variant-area variant-arcoiris-area">
        <div className="rainbow" />
        <div className="variant-main-card">Elige color y avanza de nivel</div>
      </div>
    );
  };

  const renderTemplateStructure = () => {
    if (variant === 'aventura') {
      return (
        <div className="template-structure aventura-structure">
          <aside className="structure-side">
            <h4>Mision</h4>
            <p>Explora, observa y responde.</p>
            <div className="dots-steps"><span /> <span /> <span /></div>
          </aside>
          <section className="structure-main">
            <KidGameShell
              title="Aventura guiada"
              subtitle={demoItem.instruccion}
              progressLabel="Paso 1/3"
              mascotMessage="Vamos juntos, toca el boton correcto."
              playArea={renderPlayArea()}
              actions={
                <>
                  <button className="kid-action-btn kid-action-primary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'CORRECT', tiempo_respuesta_ms: 980 })}>Correcto</button>
                  <button className="kid-action-btn kid-action-secondary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'ERROR', tiempo_respuesta_ms: 980 })}>Incorrecto</button>
                </>
              }
            />
          </section>
        </div>
      );
    }

    if (variant === 'nubes') {
      return (
        <div className="template-structure nubes-structure">
          <div className="stack-card top">1. Escucha la instruccion</div>
          <div className="stack-card mid">2. Mira la pantalla</div>
          <div className="stack-card main">3. Toca la respuesta</div>
          <KidGameShell
            title="Nubes suaves"
            subtitle={demoItem.instruccion}
            mascotMessage="Respira y elige con calma."
            playArea={renderPlayArea()}
            actions={<button className="kid-action-btn kid-action-primary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'CORRECT', tiempo_respuesta_ms: 850 })}>Entendido</button>}
          />
        </div>
      );
    }

    if (variant === 'selva') {
      return (
        <div className="template-structure selva-structure">
          <div className="grid-card">Pista A</div>
          <div className="grid-card">Pista B</div>
          <div className="grid-main">
            <KidGameShell
              title="Selva de pistas"
              subtitle={demoItem.instruccion}
              mascotMessage="Encuentra la pista correcta."
              playArea={renderPlayArea()}
              actions={<button className="kid-action-btn kid-action-primary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'CORRECT', tiempo_respuesta_ms: 760 })}>Resolver</button>}
            />
          </div>
          <div className="grid-card">Pista C</div>
          <div className="grid-card">Pista D</div>
        </div>
      );
    }

    if (variant === 'oceano') {
      return (
        <div className="template-structure oceano-structure">
          <section className="split-instruction">
            <h3>Instruccion</h3>
            <p>{demoItem.instruccion}</p>
            <button className="soft-btn" onClick={() => setMode('manual')}>Modo manual</button>
          </section>
          <section className="split-action">
            <KidGameShell
              title="Oceanico"
              subtitle="Zona de accion principal"
              mascotMessage="Hazlo en un solo toque."
              playArea={renderPlayArea()}
              actions={
                <>
                  <button className="kid-action-btn kid-action-primary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'CORRECT', tiempo_respuesta_ms: 620 })}>Si</button>
                  <button className="kid-action-btn kid-action-secondary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'ERROR', tiempo_respuesta_ms: 620 })}>No</button>
                </>
              }
            />
          </section>
        </div>
      );
    }

    return (
      <div className="template-structure arcoiris-structure">
        <div className="carousel-strip">
          <div className="carousel-item is-active">Desafio 1</div>
          <div className="carousel-item">Desafio 2</div>
          <div className="carousel-item">Desafio 3</div>
        </div>
        <KidGameShell
          title="Ruta arcoiris"
          subtitle={demoItem.instruccion}
          progressLabel="Desafio 1"
          mascotMessage="Avanza desafio por desafio."
          playArea={renderPlayArea()}
          actions={<button className="kid-action-btn kid-action-primary" onClick={() => handleAnswer({ item_id: demoItem.id, resultado: 'CORRECT', tiempo_respuesta_ms: 540 })}>Siguiente</button>}
        />
      </div>
    );
  };

  return (
    <div className="template-playground-page">
      <div className="template-playground-toolbar">
        <h1>Plantilla general de minijuegos</h1>
        <div className="template-playground-modes">
          <button className={mode === 'normal' ? 'is-active' : ''} onClick={() => setMode('normal')}>Normal</button>
          <button className={mode === 'fallback' ? 'is-active' : ''} onClick={() => setMode('fallback')}>Fallback</button>
          <button className={mode === 'manual' ? 'is-active' : ''} onClick={() => setMode('manual')}>Manual</button>
        </div>
      </div>

      <div className="template-variants">
        {templateOptions.map((option) => (
          <button
            key={option.id}
            className={`template-variant-card ${variant === option.id ? 'is-active' : ''}`}
            onClick={() => setVariant(option.id)}
          >
            <strong>{option.label}</strong>
            <span>{option.subtitle}</span>
          </button>
        ))}
      </div>

      <div className={`template-playground-stage template-variant-${variant}`}>
        <div className="evaluation-header">
          <span className="nino-name">Niño Demo</span>
          <span className="progress-info">1/10</span>
        </div>

        <div className="evaluation-content">
          {mode === 'fallback' ? (
            <div className="template-fallback-wrap">
              <FallbackProtocolView showContinueButton onContinue={() => setMode('manual')} />
            </div>
          ) : (
            renderTemplateStructure()
          )}

          {mode === 'manual' && (
            <div className="template-manual-wrap">
              <FallbackManual currentItem={demoItem} onAnswer={handleAnswer} />
            </div>
          )}

          {lastAnswer && (
            <div className="template-answer-card">
              <strong>Respuesta capturada</strong>
              <pre>{JSON.stringify(lastAnswer, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinijuegoTemplatePlayground;

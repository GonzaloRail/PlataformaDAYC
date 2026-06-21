# Plantilla de minijuego

1. Copia `MINIJUEGO_TEMPLATE.tsx` a la carpeta del area correspondiente.
2. Renombra el archivo con el formato `NOMBRE_DEL_TEST_NUMERO_PREGUNTA.tsx`.
3. Reemplaza la seccion de interaccion automatica (`playArea`).
4. Responde con `answerOnce(...)` para evitar dobles respuestas.
5. Si falla la automatizacion activa `setManualMode(true)` y usa `FallbackManual`.
6. Usa `buildProgressLabel(actual, total)` para mostrar progreso consistente.
7. Registra el nuevo `id` en `../registry.tsx`.
8. Conserva `KidGameShell` para mantener el diseno infantil estandar.

Snippet base:

```tsx
const { manualMode, setManualMode, answerOnce } = useMinijuegoSession({ currentItem, onAnswer });

<KidGameShell
  title="Nombre del minijuego"
  subtitle={currentItem.instruccion}
  progressLabel={buildProgressLabel(1, 1)}
  playArea={!manualMode ? <TuJuego /> : <FallbackManual currentItem={currentItem} onAnswer={(a) => answerOnce(a.resultado)} />}
/>
```

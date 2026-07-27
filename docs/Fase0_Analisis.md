# Fase 0 — Análisis global y decisiones de alcance

> Documento de trabajo producido al iniciar la implementación.
> Fuente: `backend/src/application/catalog/dayc2_items/cognitivo.json`
> y `backend/data/preguntas_dayc.json`.

## A001 — Inventario de items restantes (48-78)

El catálogo `cognitivo.json` contiene **49 items** con numeración 30-78.
De esos, **3 ya están implementados** (45, 46, 47) y **22 están marcados
con `gamificable: false`**, lo que deja un universo real de:

| Grupo | Cantidad | Rango | Items |
|---|---|---|---|
| Ya implementados | 3 | 45-47 | 045, 046, 047 |
| Gamificables pendientes | 24 | 31-75 | 031, 032, 033, 034, 037, 039, 041, 042, 043, 044, 048, 049, 051, 052, 053, 055, 058, 060, 061, 062, 068, 072, 073, 075 |
| No gamificables (modo asistido) | 22 | 30-78 | 030, 035, 036, 038, 040, 050, 054, 056, 057, 059, 063, 064, 065, 066, 067, 069, 070, 071, 074, 076, 077, 078 |

> **Nota importante:** el `Implementacion_Cognitivo.md` redactado cubre los
> 31 items del rango 48-78. Tras este análisis detectamos que varios
> items del rango 48-78 están en `gamificable: false` en el JSON
> (54, 56, 57, 59, 63, 64, 65, 66, 67, 69, 70, 71, 74, 76, 77, 78).
> El plan de implementación debe respetar la marca `gamificable`
> del JSON como fuente de verdad. Esos items se tratan como
> **modo asistido con estímulo visual** (ver A002).

## A002 — Viabilidad como minijuego digital puro

### Items gamificables puros (24)

Implementables como juego interactivo con `onAnswer` automático.
Mecanismo: drag & drop, click-seleccionar, canvas, audio.

Items: 031, 032, 033, 034, 037, 039, 041, 042, 043, 044, 048, 049, 051, 052, 053, 055, 058, 060, 061, 062, 068, 072, 073, 075.

### Items no gamificables puros (22)

Marcados `gamificable: false` en el JSON. Evaluación válida requiere
material físico, dibujo libre, o respuesta verbal abierta. No
autocorregible. Tres sub-categorías:

| Sub-categoría | Items | Estrategia digital |
|---|---|---|
| Material físico (cubos, bloques) | 030, 040, 050 | Modo asistido: pantalla muestra el modelo, niño usa material real, psicólogo registra |
| Dibujo / escritura libre | 054, 056, 063, 064, 065, 074, 077 | Componente `DrawingGame` (canvas + `useDrawingCanvas`), psicólogo valida |
| Verbal abierto (psicólogo marca) | 035, 036, 038, 057, 059, 066, 067, 069, 070, 071, 076, 078 | Componente `VerbalResponseGame` (pantalla con dinosaurio + botones psicólogo) |

> **Convención adoptada:** los items `gamificable: false` **no se
> excluyen** del plan. Se les crea un componente de "estímulo digital"
> que complemente la evaluación manual, sin reemplazar la validez
> clínica. Esto da cobertura completa del rango 48-78 según pidió
> el usuario.

## A003 — Items que requieren captura de audio (micrófono)

| Item | Razón | Acción |
|---|---|---|
| 052 | El niño narra historia | `useMediaCapture` + evidencia `AUDIO` |
| 057 | El niño predice verbalmente | `useMediaCapture` + evidencia `AUDIO` |
| 059 | El niño nombra letras | `useMediaCapture` + evidencia `AUDIO` |
| 066 | El niño cuenta en voz alta | `useMediaCapture` + evidencia `AUDIO` |
| 067 | El niño dice su cumpleaños | `useMediaCapture` + evidencia `AUDIO` |
| 069 | El niño dice calle/ciudad | `useMediaCapture` + evidencia `AUDIO` |
| 070 | El niño nombra días | `useMediaCapture` + evidencia `AUDIO` |
| 071 | El niño dice día antes/después | `useMediaCapture` + evidencia `AUDIO` |
| 072 | El niño nombra monedas | `useMediaCapture` + evidencia `AUDIO` |
| 076 | El niño cuenta del 1 al 100 | `useMediaCapture` + evidencia `AUDIO` |
| 078 | El niño lee palabras | `useMediaCapture` + evidencia `AUDIO` |

> 11 items con audio. Todos usan `MediaPermissionProvider` ya
> existente en `frontend/src/components/evidence/MediaPermissionProvider.tsx`.

## A004 — Componentes reusables a crear en `shared/`

Tras cruzar mecánicas con los 24 items gamificables:

| Componente | Items que lo usan | Tipo |
|---|---|---|
| `MatchingGame` | 031, 034, 037 | Drag & drop a zonas por matchKey |
| `ClassificationGame` | 042, 049 | Bandeja + N cajas, single/multicriterio |
| `IntruderGame` (existe como 047) | 047 | Toca el que no pertenece |
| `OrderingGame` | 033, 068 | Ordenar por tamaño o número |
| `CountingGame` | 039, 061 | Contar objetos y elegir número |
| `NumberMatchGame` | 061 (variante), 062 | Vincular cantidad con número |
| `NumberSequenceGame` | 073 | Completar huecos en secuencias |
| `ComparisonGame` | 044, 053 | Más/menos/igual (cantidad o número) |
| `OrdinalPositionGame` | 051 | Toca primero/medio/último |
| `ReadingDirectionGame` | 048 | Toca dónde empieza + flechas |
| `FractionGame` | 058 | Señalar mitad/completo |
| `AbstractAttributeGame` | 055 | Clasificar por atributo abstracto |
| `SequenceStoryGame` | 060 | Ordenar 3 escenas cronológicas |
| `StoryNarrationGame` | 052, 057 | Mostrar escena + grabar narración |
| `QuantityGame` | 032 | "uno" / "uno más" |
| `ArithmeticGame` | 075 | Suma/resta con opciones |
| `CoinsGame` | 072 | Mostrar moneda + capturar audio |
| `VerbalResponseGame` | 035, 036, 038, 059, 066, 067, 069, 070, 071, 076, 078 | Shell para respuesta verbal |
| `DrawingGame` | 054, 056, 063, 064, 065, 074, 077 | Canvas libre con consigna |
| `PersonalInfoGame` | 067, 069 | Sub-tipo de verbal con info personal |
| `WeekDaysGame` | 070, 071 | Sub-tipo verbal con días |

**Total: 19 componentes reusables nuevos en `shared/`** (más 1 variante
de `PersonalInfoGame`/`WeekDaysGame` que puede reusar `VerbalResponseGame`
con configuración).

## A005 — Política de evidencia por tipo de juego

| Tipo de juego | Tipos de evidencia | Mecanismo |
|---|---|---|
| Drag & drop (matching, classification, ordering) | `LOG` + `SCREENSHOT` | `useAutoEvidence` con canvas del container |
| Click-seleccionar (counting, comparison, ordinal) | `LOG` + `SCREENSHOT` | `useAutoEvidence` |
| Dibujo / canvas (drawing) | `LOG` + `SCREENSHOT` (canvas se guarda como PNG) | `useAutoEvidence` con `canvasToBlob` |
| Narración / habla (story, coins) | `LOG` + `AUDIO` | `useMediaCapture` + `MediaPermissionProvider` |
| Verbal abierto (letras, contar 1-100) | `LOG` + `AUDIO` (opcional) | `useMediaCapture` si hay audio; solo `LOG` si no |
| Físico asistido (cubos, pirámide) | `LOG` (sin SCREENSHOT del juego) | Botón del psicólogo para marcar |

> **Política por defecto:** `requiere_revision_psicologo: true` en todos
> los items nuevos. Solo se cambia a `false` si la validación es 100%
> determinista. Por ahora: 24 items nuevos con `requiere_revision_psicologo: true`.

## A006 — Decisiones de alcance documentadas

### Decisión 1: respetar `gamificable` del JSON como fuente de verdad

El campo `gamificable` del JSON es la marca canónica. Los items
`gamificable: false` se cubren con un componente de "estímulo digital"
(no son juegos puros). Esto preserva la validez clínica.

### Decisión 2: items verbales usan `VerbalResponseGame` shell

11 items requieren respuesta verbal abierta. En lugar de crear 11
componentes distintos, se crea un `VerbalResponseGame` configurable
con props: `prompt`, `mediaCapture: boolean`, `psychologistPanel:
'counter' | 'yesno' | 'free'`.

### Decisión 3: items de dibujo usan `DrawingGame` shell

7 items requieren canvas libre. Se crea un `DrawingGame` configurable
con props: `consigna`, `mostrarModelo: boolean`, `modeloSVG?: string`.

### Decisión 4: componente `PersonalInfoGame` y `WeekDaysGame` como variantes de `VerbalResponseGame`

Para evitar proliferación, se documentan como "perfiles de uso" de
`VerbalResponseGame`, no como componentes separados.

### Decisión 5: evidencia se sube por endpoint estándar

Todos los juegos usan el flujo existente:
- `useAutoEvidence` para `SCREENSHOT` (automatiza el POST a `/api/evaluaciones/:id/items/:item_id/evidence/`)
- `useMediaCapture` para `AUDIO` (idéntico endpoint, con tipo `audio/webm`)
- `evidence.recordEvent` y `evidence.recordLog` para `LOG` (van dentro de `respuesta_usuario` JSON)

### Decisión 6: IDs con padding de 3 dígitos

Confirmado: el JSON usa `COGNITIVO_031`, `COGNITIVO_045`, etc.
(mayúsculas + 3 dígitos con padding). El folder frontend también
usa `COGNITIVO_031` (3 dígitos). NO usar `COGNITIVO_31` (sin padding).

### Decisión 7: orden de implementación por lotes

Los 24 items gamificables se implementan en **6 lotes** por mecánica
reusable (siguiendo la lógica del plan Spec-Kit):

| Lote | Mecánica | Items |
|---|---|---|
| 1 | Classification | 042, 049 |
| 2 | Matching | 031, 034, 037 |
| 3 | Number concepts | 043, 062, 073 |
| 4 | Comparison | 044, 053 |
| 5 | Counting | 039, 061 |
| 6 | Ordering | 033, 068 |
| 7 | Misc únicos (3 mecánicas) | 032 (QuantityGame), 048 (ReadingDirection), 051 (OrdinalPosition), 055 (AbstractAttribute), 058 (Fraction), 060 (SequenceStory) |
| 8 | Story / audio (3 mecánicas) | 052, 057 (StoryNarration), 072 (Coins) |

> Los 22 items `gamificable: false` se implementan en **2 lotes
> paralelos** después de los gamificables:
> - **Lote 9:** DrawingGame (7 items: 054, 056, 063, 064, 065, 074, 077)
> - **Lote 10:** VerbalResponseGame (11 items: 035, 036, 038, 057, 059, 066, 067, 069, 070, 071, 076, 078) — **nota:** 057 se duplica con lote 8, unificar
> - **Lote 11:** Físico asistido (3 items: 030, 040, 050)

### Decisión 8: convención de archivos por juego

```
frontend/src/minijuegos/cognitivo/COGNITIVO_XXX/
  index.tsx       # default export, props {currentItem, onAnswer}
  config.ts       # export const COGNITIVO_XXX_CONFIG {...} as const
  COGNITIVO_XXX.css  # estilos específicos (mínimo, preferir shared/)
  README.md       # opcional, documenta la mecánica
```

## Estado de Fase 0

| Tarea | Estado | Notas |
|---|---|---|
| A001 | ✅ | 24 gamificables + 22 asistidos = 46 items por cubrir |
| A002 | ✅ | 3 sub-categorías para no-gamificables |
| A003 | ✅ | 11 items con audio |
| A004 | ✅ | 19 componentes reusables identificados |
| A005 | ✅ | Política de evidencia por tipo definida |
| A006 | ✅ | 8 decisiones documentadas |

## Próximo paso

Iniciar **Fase 1: Diseño de mecánicas reusables** (D001-D019).
Trabajar primero los 19 componentes de `shared/` antes de cualquier
carpeta de juego individual, para que las dependencias estén
resueltas cuando lleguen los lotes de Fase 3.

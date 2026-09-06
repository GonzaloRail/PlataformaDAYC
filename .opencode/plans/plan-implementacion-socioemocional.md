# Plan de Implementación: Mejora del Área Socioemocional DAYC-2
## De Juegos Simples a Validación Automática de Competencias Emocionales

> **Destino final:** `MejoraDeJuegosV2/plan-implementacion-socioemocional.md`
> **Depende de:** `plan-implementacion-cognitivo.md` (Fases 1-2), `plan-implementacion-comunicacion.md` (Fase 3 STT)

---

## 1. Visión General

### 1.1 Objetivo

Transformar los 14 minijuegos socioemocionales del DAYC-2 en experiencias interactivas ricas con validación automática, abordando el desafío único de evaluar **competencias emocionales y sociales** de forma objetiva mediante IA.

### 1.2 Estado Actual vs Objetivo

| Dimensión | Actual | Objetivo |
|-----------|--------|----------|
| Total ítems catálogo | 28 | 28 |
| Ítems gamificables (en pantalla) | 14 | 14 |
| Ítems pregunta cuidador | 9 | 9 |
| Ítems manual guiado | 5 | 5 |
| Auto-validables (gamificables) | 0/14 (0%) | **12/14 (86%)** |
| Requieren revisión psicólogo | 28/28 (100%) | 16/28 (57%) |
| Shared game dominante | InteractiveQA (7 usos) | InteractiveQA mejorado |
| Validadores emocionales | 0 | 3 nuevos |

### 1.3 Diferencias Clave vs Otras Áreas

| Aspecto | Cognitivo | Comunicación | Desarrollo Físico | **Socioemocional** |
|---------|-----------|-------------|-------------------|---------------------|
| Énfasis | Visual-espacial | Lingüístico | Motricidad | **Emociones + conducta social** |
| % gamificables | 100% | 100% | 33% | **50%** |
| % pregunta cuidador | 0% | 0% | 0% | **32%** |
| Naturaleza de "correcto" | Objetivo | Objetivo | Objetivo | **Subjetivo-conductual** |
| Validación principal | Lógica + CV | STT + NLP | Canvas analysis | **Lógica + STT + Emotion AI** |
| Shared game dominante | CountingGame | VerbalResponseGame | TracingGame | **InteractiveQA (50%)** |

### 1.4 Naturaleza Única del Área Socioemocional

El área socioemocional presenta un **desafío de validación fundamental**: a diferencia de las otras áreas donde hay respuestas objetivamente correctas o incorrectas, aquí se evalúan **comportamientos, actitudes y respuestas emocionales** que son inherentemente subjetivos.

**Tres categorías de validación:**

1. **Conocimiento emocional** (7 ítems): El niño identifica emociones, reacciones apropiadas, situaciones sociales → tiene respuesta correcta definida → **auto-validable por lógica**
2. **Expresión emocional verbal** (5 ítems): El niño habla sobre sus sentimientos, canta, saluda → requiere análisis de contenido → **auto-validable por STT + NLP emocional**
3. **Comportamiento observado** (2 ítems): El adulto observa si el niño pide ayuda, muestra orgullo → **requiere revisión del psicólogo**

### 1.5 Restricciones Técnicas

- **Procesamiento 100% en cliente** — ningún dato sale del navegador
- **Reutilización de infraestructura**: `AutoValidationEngine`, `LogicValidator`, `SpeechValidator` de planes anteriores
- **Sin dependencias nuevas** para la mayoría de ítems
- **Análisis de sentimiento básico** con keyword matching (no ML pesado)
- **Los 9 ítems de PREGUNTA_CUIDADOR** permanecen fuera del scope de auto-validación (los responde el adulto)

---

## 2. Inventario Completo de Ítems

### 2.1 Tabla Maestra: 28 Ítems Socioemocionales

#### Grupo A: Minijuegos Gamificables (14 ítems)

| # | ID | Pregunta | Shared Game | Layout/Mode | Auto-val. Propuesta |
|---|---|---|---|---|---|
| 31 | SOCIAL_EMOCIONAL_031 | Canta canciones familiares | `VerbalResponseGame` | free, audio=true | **STT-SINGING** ✅ |
| 32 | SOCIAL_EMOCIONAL_032 | Saluda espontáneamente | `VerbalResponseGame` | free, audio=true | **STT-GREETING** ✅ |
| 35 | SOCIAL_EMOCIONAL_035 | Se ríe ante eventos incongruentes | `InteractiveQA` | options-grid, 4 rounds | **LOGIC** ✅ |
| 36 | SOCIAL_EMOCIONAL_036 | Pide ayuda cuando tiene dificultad | `VerbalResponseGame` | free, audio=false | **MANUAL** ❌ |
| 37 | SOCIAL_EMOCIONAL_037 | Se muestra orgulloso de logros | `VerbalResponseGame` | free, audio=true | **MANUAL** ❌ |
| 38 | SOCIAL_EMOCIONAL_038 | Afirma si es niño o niña | `InteractiveQA` | two-images, 1 round | **LOGIC** ✅ |
| 40 | SOCIAL_EMOCIONAL_040 | Juega a disfrazarse | `DressUpGame` | 6 items, 3 slots | **COMPLETION** ✅ |
| 41 | SOCIAL_EMOCIONAL_041 | Llama atención con rimas/bailes | `VerbalResponseGame` | free, audio=true | **STT-PERFORMANCE** ✅ |
| 42 | SOCIAL_EMOCIONAL_042 | Habla de sus sentimientos | `InteractiveQA` | options-grid, 4 rounds | **LOGIC** ✅ |
| 49 | SOCIAL_EMOCIONAL_049 | Gusta de juegos competitivos | `InteractiveQA` | two-images, 1 round | **LOGIC** ✅ |
| 52 | SOCIAL_EMOCIONAL_052 | Acepta bromas suaves | `InteractiveQA` | options-grid, 4 rounds | **LOGIC** ✅ |
| 54 | SOCIAL_EMOCIONAL_054 | Expresa enojo con palabras | `InteractiveQA` | options-grid, 4 rounds | **LOGIC** ✅ |
| 56 | SOCIAL_EMOCIONAL_056 | Acepta crítica válida | `InteractiveQA` | options-grid, 4 rounds | **LOGIC** ✅ |
| 57 | SOCIAL_EMOCIONAL_057 | Responde teléfono y recuerda mensaje | `PhoneCallGame` | audio=true | **STT-MESSAGE** ✅ |

#### Grupo B: Pregunta al Cuidador (9 ítems — sin minijuego)

| # | ID | Pregunta | Modalidad |
|---|---|---|---|
| 33 | SOCIAL_EMOCIONAL_033 | Usualmente sabe esperar su turno | PREGUNTA_CUIDADOR |
| 34 | SOCIAL_EMOCIONAL_034 | Actividad solitaria observando a otros | PREGUNTA_CUIDADOR |
| 39 | SOCIAL_EMOCIONAL_039 | Juega en juegos grupales con reglas | PREGUNTA_CUIDADOR |
| 44 | SOCIAL_EMOCIONAL_044 | Selecciona sus propios amigos | PREGUNTA_CUIDADOR |
| 45 | SOCIAL_EMOCIONAL_045 | Espera su turno en juegos grupales | PREGUNTA_CUIDADOR |
| 46 | SOCIAL_EMOCIONAL_046 | Conoce y sigue reglas del salón | PREGUNTA_CUIDADOR |
| 47 | SOCIAL_EMOCIONAL_047 | Obtiene atención de manera apropiada | PREGUNTA_CUIDADOR |
| 48 | SOCIAL_EMOCIONAL_048 | Comprende reglas de juego justo | PREGUNTA_CUIDADOR |
| 50 | SOCIAL_EMOCIONAL_050 | Explica reglas de juego a otros | PREGUNTA_CUIDADOR |

#### Grupo C: Manual Guiado sin Minijuego (5 ítems)

| # | ID | Pregunta | Modalidad |
|---|---|---|---|
| 30 | SOCIAL_EMOCIONAL_030 | Se separa de padres sin llorar | MANUAL_GUIADO |
| 43 | SOCIAL_EMOCIONAL_043 | Cambia de actividad cuando lo indican | MANUAL_GUIADO |
| 51 | SOCIAL_EMOCIONAL_051 | Pide antes de levantar pertenencias | MANUAL_GUIADO |
| 53 | SOCIAL_EMOCIONAL_053 | Trabaja solo 20-30 minutos | MANUAL_GUIADO |
| 55 | SOCIAL_EMOCIONAL_055 | Establece una meta y realiza | MANUAL_GUIADO |

### 2.2 Resumen por Tipo de Validación

| Tipo | Ítems | Cantidad | % del total |
|------|-------|----------|-------------|
| **LOGIC** (respuesta cerrada emocional) | 035, 038, 042, 049, 052, 054, 056 | 7 | 25% |
| **STT** (expresión verbal emocional) | 031, 032, 041, 057 | 4 | 14% |
| **COMPLETION** (completó actividad) | 040 | 1 | 4% |
| **MANUAL** (subjetivo, requiere psicólogo) | 036, 037 | 2 | 7% |
| **PREGUNTA_CUIDADOR** (adulto responde) | 033, 034, 039, 044-048, 050 | 9 | 32% |
| **MANUAL_GUIADO** (observación adulto) | 030, 043, 051, 053, 055 | 5 | 18% |
| **Total auto-validables (gamificables)** | | **12/14** | **86%** |

### 2.3 Shared Games Usados

| Shared Game | Ítems Socioemocional | Usos |
|-------------|---------------------|------|
| `InteractiveQA` | 035, 038, 042, 049, 052, 054, 056 | **7** |
| `VerbalResponseGame` | 031, 032, 036, 037, 041 | **5** |
| `DressUpGame` | 040 | **1** |
| `PhoneCallGame` | 057 | **1** |

---

## 3. Arquitectura de Validación para Socioemocional

### 3.1 Reutilización de Infraestructura

| Componente | Origen | Uso en Socioemocional |
|-----------|--------|----------------------|
| `AutoValidationEngine` | Cognitivo Fase 2 | Motor central de decisiones |
| `LogicValidator` | Cognitivo Fase 2 | 7 ítems InteractiveQA |
| `SpeechValidator` + `whisperWorker` | Comunicación Fase 3 | 4 ítems verbales |
| `levenshtein.ts` | Cognitivo Fase 3 | Matching de mensajes |
| `keywordMatcher.ts` | Cognitivo Fase 3 | Detección de contenido emocional |

### 3.2 Nuevos Validadores Emocionales

**Ubicación:** `frontend/src/components/validation/validators/`

```
validators/
├── LogicValidator.ts              # (de Cognitivo) → 7 ítems
├── SpeechValidator.ts             # (de Comunicación, extendido) → base STT
├── EmotionContentValidator.ts     # NUEVO → análisis de contenido emocional
├── CompletionValidator.ts         # NUEVO → validación de completitud
└── ...
```

### 3.3 Nuevo Módulo: `EmotionContentValidator`

**Archivo:** `frontend/src/components/validation/validators/EmotionContentValidator.ts`

Valida que la respuesta verbal del niño contenga contenido emocional/social relevante mediante keyword matching y análisis de estructura.

```typescript
function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function tokenize(text: string): string[] {
  return normalizeSpanish(text).split(/\s+/).filter((w) => w.length > 1);
}

// ─── Diccionario emocional para niños hispanohablantes ───
const EMOTION_KEYWORDS: Record<string, string[]> = {
  feliz: ['feliz', 'contento', 'contenta', 'alegre', 'alegria', 'bien', 'gusta', 'bonito', 'lindo'],
  triste: ['triste', 'llorar', 'lloro', 'mal', 'feo', 'solo', 'sola'],
  enojado: ['enojado', 'enojada', 'bravo', 'brava', 'molesto', 'molesta', 'rabiar', 'enojo'],
  miedo: ['miedo', 'asustado', 'asustada', 'terror', 'susto'],
  cansado: ['cansado', 'cansada', 'sueno', 'dormir', 'agotado'],
  orgulloso: ['orgulloso', 'orgullosa', 'logre', 'pude', 'ganar', 'bueno', 'bien'],
};

const GREETING_KEYWORDS = [
  'hola', 'buenos dias', 'buenas tardes', 'buenas noches',
  'hey', 'saludos', 'que tal', 'como estas',
  'adios', 'chao', 'hasta luego', 'nos vemos',
];

const SINGING_INDICATORS = [
  'la la', 'lalala', 'na na', 'nanana',
  'canta', 'cancion', 'musica',
  'cumpleanos', 'estrellita', 'sol', 'luna',
];

const PERFORMANCE_INDICATORS = [
  'rima', 'cancion', 'baile', 'bailar', 'cantar',
  'habia una vez', 'erase', 'cuento',
];

export const EmotionContentValidator = {

  // ─── 031: Canta canciones familiares ───
  validateSinging(
    transcript: string,
    minDurationWords = 5
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: SingingAnalysis } {
    const words = tokenize(transcript);
    const normalized = normalizeSpanish(transcript);

    const hasSingingIndicators = SINGING_INDICATORS.some((ind) => normalized.includes(ind));
    const hasMinimumLength = words.length >= minDurationWords;
    const hasRepetition = detectRepetition(words);

    const singingScore = (hasSingingIndicators ? 0.4 : 0) +
      (hasMinimumLength ? 0.3 : 0) +
      (hasRepetition ? 0.3 : 0);

    const confidence = Math.min(singingScore, 1.0);

    return {
      outcome: confidence >= 0.5 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        wordCount: words.length,
        hasSingingIndicators,
        hasMinimumLength,
        hasRepetition,
      },
    };
  },

  // ─── 032: Saluda espontáneamente ───
  validateGreeting(
    transcript: string
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: GreetingAnalysis } {
    const normalized = normalizeSpanish(transcript);
    const words = tokenize(transcript);

    const matchedGreetings = GREETING_KEYWORDS.filter((g) => normalized.includes(g));
    const hasGreeting = matchedGreetings.length > 0;
    const hasMinimumContent = words.length >= 1;

    const confidence = (hasGreeting ? 0.7 : 0) + (hasMinimumContent ? 0.3 : 0);

    return {
      outcome: hasGreeting ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        matchedGreetings,
        hasGreeting,
        wordCount: words.length,
      },
    };
  },

  // ─── 041: Llama atención con rimas/canciones/bailes ───
  validatePerformance(
    transcript: string,
    minDurationWords = 5
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: PerformanceAnalysis } {
    const words = tokenize(transcript);
    const normalized = normalizeSpanish(transcript);

    const hasPerformanceIndicators = PERFORMANCE_INDICATORS.some((ind) => normalized.includes(ind));
    const hasMinimumLength = words.length >= minDurationWords;
    const hasRepetition = detectRepetition(words);
    const hasEmotionWords = Object.values(EMOTION_KEYWORDS)
      .flat()
      .some((kw) => normalized.includes(kw));

    const score = (hasPerformanceIndicators ? 0.35 : 0) +
      (hasMinimumLength ? 0.25 : 0) +
      (hasRepetition ? 0.2 : 0) +
      (hasEmotionWords ? 0.2 : 0);

    const confidence = Math.min(score, 1.0);

    return {
      outcome: confidence >= 0.5 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        wordCount: words.length,
        hasPerformanceIndicators,
        hasMinimumLength,
        hasRepetition,
        hasEmotionWords,
      },
    };
  },

  // ─── 057: Recuerda mensaje del teléfono ───
  validateMessageRecall(
    transcript: string,
    expectedMessage: string,
    keyPhrases: string[]
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: MessageRecallAnalysis } {
    const normalized = normalizeSpanish(transcript);
    const expectedNormalized = normalizeSpanish(expectedMessage);

    const matchedPhrases = keyPhrases.filter((phrase) =>
      normalized.includes(normalizeSpanish(phrase))
    );
    const phraseCoverage = keyPhrases.length > 0
      ? matchedPhrases.length / keyPhrases.length
      : 0;

    const words = tokenize(transcript);
    const expectedWords = tokenize(expectedMessage);
    const wordOverlap = expectedWords.filter((w) => normalized.includes(w)).length;
    const wordScore = expectedWords.length > 0
      ? wordOverlap / expectedWords.length
      : 0;

    const confidence = phraseCoverage * 0.6 + wordScore * 0.4;

    return {
      outcome: confidence >= 0.5 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        matchedPhrases,
        phraseCoverage,
        wordOverlap,
        wordScore,
        transcript,
      },
    };
  },
};

function detectRepetition(words: string[]): boolean {
  if (words.length < 4) return false;
  const counts: Record<string, number> = {};
  for (const w of words) {
    counts[w] = (counts[w] || 0) + 1;
  }
  return Object.values(counts).some((c) => c >= 2);
}

interface SingingAnalysis {
  wordCount: number;
  hasSingingIndicators: boolean;
  hasMinimumLength: boolean;
  hasRepetition: boolean;
}

interface GreetingAnalysis {
  matchedGreetings: string[];
  hasGreeting: boolean;
  wordCount: number;
}

interface PerformanceAnalysis {
  wordCount: number;
  hasPerformanceIndicators: boolean;
  hasMinimumLength: boolean;
  hasRepetition: boolean;
  hasEmotionWords: boolean;
}

interface MessageRecallAnalysis {
  matchedPhrases: string[];
  phraseCoverage: number;
  wordOverlap: number;
  wordScore: number;
  transcript: string;
}
```

### 3.4 Nuevo Módulo: `CompletionValidator`

**Archivo:** `frontend/src/components/validation/validators/CompletionValidator.ts`

Para ítems donde la validación es simplemente "completó la actividad" (como disfrazarse).

```typescript
export const CompletionValidator = {
  validateDressUp(
    placedItems: Record<string, string>,
    totalSlots: number
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: DressUpAnalysis } {
    const filledSlots = Object.keys(placedItems).length;
    const coverage = filledSlots / totalSlots;
    const confidence = coverage;

    return {
      outcome: coverage >= 0.67 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        filledSlots,
        totalSlots,
        coverage,
        placedItems,
      },
    };
  },
};

interface DressUpAnalysis {
  filledSlots: number;
  totalSlots: number;
  coverage: number;
  placedItems: Record<string, string>;
}
```

### 3.5 Flujo de Validación para Socioemocional

```
Minijuego Socioemocional termina
    │
    ▼
┌─ ¿Es InteractiveQA (respuesta cerrada emocional)? ────┐
│  SÍ → LogicValidator (de Cognitivo)                    │
│       confidence = correctCount / totalRounds           │
│       → 7 ítems (035, 038, 042, 049, 052, 054, 056)  │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es VerbalResponseGame con audio? ───────────────────┐
│  SÍ → whisperWorker.transcribe(audioBlob)              │
│       │                                                │
│       ├─ 031 → EmotionContentValidator                 │
│       │   .validateSinging(transcript)                 │
│       │                                                │
│       ├─ 032 → EmotionContentValidator                 │
│       │   .validateGreeting(transcript)                │
│       │                                                │
│       ├─ 041 → EmotionContentValidator                 │
│       │   .validatePerformance(transcript)             │
│       │                                                │
│       └─ 057 → EmotionContentValidator                 │
│           .validateMessageRecall(transcript, message)  │
│                                                        │
│       confidence → Decision Engine                     │
│       → 4 ítems                                        │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es DressUpGame (completitud)? ──────────────────────┐
│  SÍ → CompletionValidator                              │
│       .validateDressUp(placedItems, totalSlots)        │
│       confidence = filledSlots / totalSlots            │
│       → 1 ítem (040)                                   │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es subjetivo (036, 037)? ───────────────────────────┐
│  SÍ → REQUIRES_ADULT_REVIEW                            │
│       No se intenta auto-validar                       │
│       → 2 ítems                                        │
└────────────────────────────────────────────────────────┘
    │
    ▼
Decision Engine
    ├─ confidence ≥ 0.85 → SYSTEM_AUTO
    ├─ 0.60 ≤ confidence < 0.85 → SYSTEM_ASSISTED_REVIEW
    └─ confidence < 0.60 → REQUIRES_ADULT_REVIEW
```

---

## 4. Plan por Fases

### FASE 1: Mejora Visual y UX (Semanas 1-4)

**Objetivo**: Transformar la experiencia visual de los minijuegos socioemocionales.

> **Nota**: Se solapa con Fase 1 de las otras áreas. Los componentes de animación, audio y feedback se comparten.

#### 4.1.1 Tarea: Mejorar `InteractiveQA` para Contexto Emocional (7 ítems)

**Archivo:** `frontend/src/minijuegos/shared/InteractiveQA.tsx`

**Cambios específicos para socioemocional:**
- Las opciones de emoción tienen animación de "latido" suave (pulse)
- Los emojis de emociones son más grandes y expresivos
- Al seleccionar una emoción, el personaje mascota "reacciona" con la misma emoción
- Fondo de color cambia sutilmente según la emoción seleccionada (azul=triste, amarillo=feliz, rojo=enojado)
- Transición entre rondas con animación de "página de diario"

```typescript
// Ejemplo: fondo emocional reactivo
const EMOTION_COLORS: Record<string, string> = {
  feliz: '#fef3c7',
  triste: '#dbeafe',
  enojado: '#fee2e2',
  miedo: '#ede9fe',
  cansado: '#e5e7eb',
  orgulloso: '#d1fae5',
};

const EmotionalBackground = ({ emotion }: { emotion?: string }) => {
  const color = emotion ? EMOTION_COLORS[emotion] || '#f9fafb' : '#f9fafb';
  return (
    <motion.div
      className="emotional-bg"
      animate={{ backgroundColor: color }}
      transition={{ duration: 0.8 }}
    />
  );
};
```

#### 4.1.2 Tarea: Mejorar `VerbalResponseGame` para Contexto Emocional (5 ítems)

**Archivo:** `frontend/src/minijuegos/shared/VerbalResponseGame.tsx`

**Cambios específicos:**
- El estímulo emocional tiene animación de "respiración" (scale in/out suave)
- Visualización de audio con colores emocionales
- La mascota pedagógica "escucha" con atención (animación de orejas/alerta)
- Al terminar de grabar, la mascota "asiente" y sonríe
- Para ítems sin audio (036), mostrar guía visual de observación para el adulto

#### 4.1.3 Tarea: Mejorar `DressUpGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/DressUpGame.tsx`

**Cambios:**
- El personaje base es más detallado y amigable (SVG en vez de emoji)
- Las prendas tienen animación de "volar" al arrastrarlas
- Al colocar una prenda correctamente, el personaje "posó" con ella
- Sonido de "vestir" al colocar cada prenda
- Al completar el disfraz, el personaje "baila" o "desfila"
- Fondo de "escenario" o "fiesta de disfraces"
- Espejo virtual que muestra al personaje desde otro ángulo

```typescript
// Ejemplo: personaje que "desfila" al completar
const CharacterParade = ({ items }: { items: DressUpItem[] }) => {
  return (
    <motion.div
      className="character-parade"
      animate={{
        x: [0, 20, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    >
      <span className="parade-emoji">🧒</span>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="parade-item"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
};
```

#### 4.1.4 Tarea: Mejorar `PhoneCallGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/PhoneCallGame.tsx`

**Cambios:**
- Animación de teléfono sonando más realista (vibración + sonido de timbre)
- El "caller" (abuelita) tiene animación de "hablando" mientras da el mensaje
- El mensaje se muestra como "burbuja de chat" con animación de escritura
- Botón de "repetir mensaje" con animación de "rebobinar"
- Al grabar la respuesta, mostrar visualización de audio
- El teléfono tiene diseño más infantil (colores, stickers)
- Al completar, animación de "colgar" satisfactoria

#### 4.1.5 Tarea: Mejorar los Ítems de Pregunta al Cuidador (9 ítems)

**Nuevo componente:** `frontend/src/components/adult/CaregiverQuestionnaire.tsx`

Para los 9 ítems de PREGUNTA_CUIDADOR, crear una experiencia mejorada para el adulto:

```typescript
interface CaregiverQuestionProps {
  question: string;
  options?: { label: string; value: string; description?: string }[];
  scaleType?: 'frequency' | 'agreement' | 'yesno';
  onAnswer: (value: string, notes?: string) => void;
}

const FREQUENCY_OPTIONS = [
  { label: 'Nunca', value: 'never', emoji: '❌' },
  { label: 'Raramente', value: 'rarely', emoji: '😐' },
  { label: 'A veces', value: 'sometimes', emoji: '🤔' },
  { label: 'Frecuentemente', value: 'often', emoji: '😊' },
  { label: 'Siempre', value: 'always', emoji: '✅' },
];
```

**Criterios de aceptación Fase 1:**
- [ ] InteractiveQA tiene fondos emocionales reactivos
- [ ] VerbalResponseGame tiene visualización emocional
- [ ] DressUpGame tiene personaje SVG y animación de desfile
- [ ] PhoneCallGame tiene animación de timbre y burbujas de chat
- [ ] CaregiverQuestionnaire creado para los 9 ítems de cuidador
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 2: Validación Lógica Directa (Semanas 5-7)

**Objetivo**: Habilitar auto-validación para los 7 ítems de InteractiveQA.

#### 4.2.1 Tarea: Habilitar Auto-Validación en InteractiveQA

**Ítems afectados:**

| Ítem | Pregunta | Rounds | Correcto | Cambio |
|------|----------|--------|----------|--------|
| **035** | Se ríe ante eventos incongruentes | 4 | "risa" en cada round | auto si ≥3/4 correctos |
| **038** | Afirma si es niño o niña | 1 | respuesta coherente con género | auto si correcto |
| **042** | Habla de sus sentimientos | 4 | respuestas emocionalmente coherentes | auto si ≥3/4 correctos |
| **049** | Gusta de juegos competitivos | 1 | cualquier respuesta (preferencia) | auto si responde |
| **052** | Acepta bromas suaves | 4 | "chistosa" en cada round | auto si ≥3/4 correctos |
| **054** | Expresa enojo con palabras | 4 | opción verbal (no física) | auto si ≥3/4 correctos |
| **056** | Acepta crítica válida | 4 | opción de aceptación positiva | auto si ≥3/4 correctos |

**Nota especial sobre 038 y 049:**
- **038** (niño/niña): La respuesta "correcta" debe coincidir con el género del niño registrado. Si no hay dato, cualquier respuesta es válida → auto-validar con confidence 1.0.
- **049** (juegos competitivos): Es una preferencia, no hay respuesta incorrecta. Auto-validar con confidence 1.0 si el niño responde (cualquier opción).

**Patrón de cambio:**

```typescript
// En InteractiveQA.tsx — mismo patrón que Cognitivo/Comunicación
const confidence = correct / rounds.length;
const autoValidated = confidence >= 0.85;

answerOnce(correct === rounds.length ? 'CORRECT' : 'ERROR', {
  detalle: JSON.stringify({
    validation: autoValidated ? 'auto' : 'requires_adult_or_psychologist_review',
    confidence,
    autoValidated,
    correct,
    totalRounds: rounds.length,
    picks: next,
    layout,
  }),
});
```

#### 4.2.2 Tarea: Actualizar Catálogo Backend

**Archivo:** `backend/src/application/catalog/dayc2_items/social_emocional.json`

Para los 7 ítems de lógica directa:

```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Criterios de aceptación Fase 2:**
- [ ] 7 ítems de InteractiveQA auto-validables
- [ ] El backend marca estos como `AUTO_VALIDATED`
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 3: Speech-to-Text + Validadores Emocionales (Semanas 8-12)

**Objetivo**: Validar automáticamente las 4 respuestas verbales + 1 completitud.

> **Nota**: Reutiliza el `whisperWorker` de Comunicación. Solo se añaden los validadores emocionales específicos.

#### 4.3.1 Tarea: Crear `EmotionContentValidator`

**Archivo:** `frontend/src/components/validation/validators/EmotionContentValidator.ts`

(Código completo mostrado en sección 3.3 arriba)

#### 4.3.2 Tarea: Crear `CompletionValidator`

**Archivo:** `frontend/src/components/validation/validators/CompletionValidator.ts`

(Código completo mostrado en sección 3.4 arriba)

#### 4.3.3 Tarea: Extender `SpeechValidator` con métodos emocionales

**Archivo:** `frontend/src/components/validation/validators/SpeechValidator.ts`

```typescript
// Extensión de SpeechValidator para Socioemocional

export const SpeechValidator = {
  // ... métodos existentes de Cognitivo y Comunicación ...

  // SOCIAL_EMOCIONAL_031: Canta canciones
  async validateSinging(
    audioBlob: Blob
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string }> {
    const transcript = await transcribe(audioBlob);
    const result = EmotionContentValidator.validateSinging(transcript, 5);
    return { ...result, transcript };
  },

  // SOCIAL_EMOCIONAL_032: Saluda espontáneamente
  async validateGreeting(
    audioBlob: Blob
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string }> {
    const transcript = await transcribe(audioBlob);
    const result = EmotionContentValidator.validateGreeting(transcript);
    return { ...result, transcript };
  },

  // SOCIAL_EMOCIONAL_041: Llama atención con rimas/bailes
  async validatePerformance(
    audioBlob: Blob
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string }> {
    const transcript = await transcribe(audioBlob);
    const result = EmotionContentValidator.validatePerformance(transcript, 5);
    return { ...result, transcript };
  },

  // SOCIAL_EMOCIONAL_057: Recuerda mensaje del teléfono
  async validateMessageRecall(
    audioBlob: Blob,
    expectedMessage: string,
    keyPhrases: string[]
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string }> {
    const transcript = await transcribe(audioBlob);
    const result = EmotionContentValidator.validateMessageRecall(transcript, expectedMessage, keyPhrases);
    return { ...result, transcript };
  },
};
```

#### 4.3.4 Tarea: Integrar STT en VerbalResponseGame (ítems socioemocionales)

**Archivo:** `frontend/src/minijuegos/shared/VerbalResponseGame.tsx`

Mismo patrón que Comunicación — añadir `sttConfig` prop:

| Ítem | sttConfig |
|------|-----------|
| **031** | `SpeechValidator.validateSinging(blob)` |
| **032** | `SpeechValidator.validateGreeting(blob)` |
| **041** | `SpeechValidator.validatePerformance(blob)` |

**Nota:** Los ítems 036 y 037 permanecen sin STT (036 no tiene audio, 037 es subjetivo).

#### 4.3.5 Tarea: Integrar STT en PhoneCallGame

**Archivo:** `frontend/src/minijuegos/shared/PhoneCallGame.tsx`

```typescript
// PhoneCallGame.tsx — añadir sttConfig prop
interface PhoneCallGameProps {
  // ... props existentes ...
  sttConfig?: {
    expectedMessage: string;
    keyPhrases: string[];
  };
}

// Al completar la grabación del mensaje:
const finishRecording = async () => {
  const blob = await media.stop();
  if (blob && sttConfig) {
    const result = await SpeechValidator.validateMessageRecall(
      blob, sttConfig.expectedMessage, sttConfig.keyPhrases
    );
    if (result.confidence >= 0.85) {
      answerOnce(result.outcome, {
        detalle: JSON.stringify({
          validation: 'auto',
          confidence: result.confidence,
          transcript: result.transcript,
        }),
      });
      return;
    }
  }
  // Fallback a revisión manual
  answerOnce('CORRECT', { ... });
};
```

**Configuración en SOCIAL_EMOCIONAL_057:**

```typescript
// SOCIAL_EMOCIONAL_057/index.tsx
export default function SOCIAL_EMOCIONAL_057({ currentItem, onAnswer }: Props) {
  return (
    <PhoneCallGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={SOCIAL_EMOCIONAL_057_CONFIG.id}
      title="Contesta el telefono"
      instruction="El nino contesta el telefono y recuerda un mensaje simple."
      callerEmoji="👵"
      callerName="Abuelita"
      message="Dile a mama que la cena es a las 7"
      captureAudio
      sttConfig={{
        expectedMessage: 'Dile a mama que la cena es a las 7',
        keyPhrases: ['mama', 'cena', '7', 'siete'],
      }}
    />
  );
}
```

#### 4.3.6 Tarea: Integrar CompletionValidator en DressUpGame

**Archivo:** `frontend/src/minijuegos/shared/DressUpGame.tsx`

```typescript
// Al completar el disfraz:
const finish = () => {
  const result = CompletionValidator.validateDressUp(placedItems, SLOTS.length);
  const autoValidated = result.confidence >= 0.85;

  answerOnce(result.outcome, {
    detalle: JSON.stringify({
      validation: autoValidated ? 'auto' : 'requires_adult_or_psychologist_review',
      confidence: result.confidence,
      autoValidated,
      ...result.details,
    }),
  });
};
```

#### 4.3.7 Tarea: Actualizar Catálogo Backend

**Archivo:** `backend/src/application/catalog/dayc2_items/social_emocional.json`

**Fase 3 (4 ítems STT + 1 completion):**

```json
// 031, 032, 041:
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "SPEECH",
  "validation_threshold": 0.85
}

// 057:
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "SPEECH",
  "validation_threshold": 0.85
}

// 040:
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "COMPLETION",
  "validation_threshold": 0.67
}
```

**Criterios de aceptación Fase 3:**
- [ ] `EmotionContentValidator` creado con 4 métodos
- [ ] `CompletionValidator` creado
- [ ] `SpeechValidator` extendido con 4 métodos emocionales
- [ ] VerbalResponseGame soporta `sttConfig` para ítems socioemocionales
- [ ] PhoneCallGame soporta `sttConfig` para recordar mensajes
- [ ] DressUpGame integrado con CompletionValidator
- [ ] 5 ítems adicionales auto-validables (031, 032, 040, 041, 057)
- [ ] Total acumulado: 12/14 gamificables auto-validables
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 4: Mejoras Específicas por Ítem (Semanas 13-16)

**Objetivo**: Enriquecer la experiencia de juego de ítems específicos.

#### 4.4.1 Tarea: SOCIAL_EMOCIONAL_035/052 — Eventos Incongruentes y Bromas

**Mejora visual:**
- Las imágenes absurdas tienen animación de "aparición sorpresa" (pop-in con bounce)
- Al seleccionar "Me hace reír", la imagen "se ríe" también (shake + confeti)
- Sonido de risa infantil al seleccionar la opción correcta
- Las imágenes tienen detalles animados (el perro con lentes parpadea, el gato en bici pedalea)
- Progreso visual tipo "álbum de fotos graciosas"

#### 4.4.2 Tarea: SOCIAL_EMOCIONAL_042 — Identificación de Sentimientos

**Mejora visual:**
- Las 4 rondas tienen un "diario emocional" animado
- Cada emoción seleccionada se "pega" en el diario como sticker
- El personaje mascota cambia de expresión según la emoción seleccionada
- Al final, se muestra un "resumen emocional" con todas las emociones elegidas
- Colores de fondo cambian según la emoción (azul=triste, amarillo=feliz, etc.)
- Animación de "corazón latiendo" al hablar de sentimientos

#### 4.4.3 Tarea: SOCIAL_EMOCIONAL_054 — Expresar Enojo con Palabras

**Mejora visual:**
- Cada escenario se presenta como una "historieta" con viñetas animadas
- Los personajes de las viñetas tienen expresiones faciales claras
- Al seleccionar la opción verbal, el personaje "dice" la frase con burbuja de diálogo
- Al seleccionar la opción física, el personaje "se calma" y explica por qué usar palabras
- Feedback educativo: "¡Muy bien! Usar palabras es mejor que golpear"
- Progreso tipo "superhéroe emocional" que gana poderes al elegir bien

#### 4.4.4 Tarea: SOCIAL_EMOCIONAL_056 — Aceptar Críticas

**Mejora visual:**
- Similar a 054 pero con tono más suave y empático
- Las críticas se presentan como "consejos amigables" de personajes queridos
- Al aceptar la crítica, el personaje "crece" (animación de crecimiento)
- Mensaje positivo: "¡Aceptar consejos te hace más fuerte!"
- Progreso tipo "árbol que crece" con cada crítica aceptada

#### 4.4.5 Tarea: SOCIAL_EMOCIONAL_040 — Disfrazarse

**Mejora visual:**
- Escenario de "fiesta de disfraces" con música de fondo
- El personaje base es un niño/niña SVG detallado
- Las prendas tienen texturas y colores vibrantes
- Al completar el disfraz, el personaje "desfila" por una pasarela animada
- Confeti y aplausos al completar
- Opción de "tomar foto" del disfraz (screenshot automático)

#### 4.4.6 Tarea: SOCIAL_EMOCIONAL_057 — Contestar Teléfono

**Mejora visual:**
- Teléfono animado con timbre realista (vibración visual + sonido)
- La "abuelita" habla con animación de labios sincronizada
- El mensaje aparece como burbuja de chat con efecto de "escribiendo..."
- Botón de "repetir" con animación de rebobinar
- Al grabar la respuesta, visualización de audio en tiempo real
- Al completar, animación de "llamada terminada" con check verde

**Criterios de aceptación Fase 4:**
- [ ] Eventos incongruentes tiene imágenes animadas y sonido de risa
- [ ] Sentimientos tiene diario emocional con stickers
- [ ] Enojo con palabras tiene historietas animadas
- [ ] Aceptar críticas tiene árbol que crece
- [ ] Disfrazarse tiene pasarela animada
- [ ] Teléfono tiene timbre realista y burbujas de chat
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 5: Testing y Optimización (Semanas 17-19)

**Objetivo**: Asegurar calidad y rendimiento.

#### 4.5.1 Tarea: Tests Unitarios

**Archivos a crear:**

```
frontend/tests/unit/validation/
├── EmotionContentValidator.test.ts    # 4 métodos × 3 casos = 12 tests
├── CompletionValidator.test.ts        # 3 casos
└── ...

frontend/tests/unit/minijuegos/socioemocional/
├── InteractiveQA.emotional.test.tsx   # Auto-validación emocional
├── DressUpGame.test.tsx               # Auto-validación completitud
├── PhoneCallGame.stt.test.tsx         # STT para mensaje
└── VerbalResponseGame.emotional.test.tsx # STT emocional
```

**Ejemplo de test para EmotionContentValidator:**

```typescript
import { describe, it, expect } from 'vitest';
import { EmotionContentValidator } from '@/components/validation/validators/EmotionContentValidator';

describe('EmotionContentValidator', () => {
  describe('validateSinging', () => {
    it('returns CORRECT for singing-like content', () => {
      const transcript = 'la la la la la estrellita donde estas';
      const result = EmotionContentValidator.validateSinging(transcript, 5);
      expect(result.outcome).toBe('CORRECT');
      expect(result.details.hasSingingIndicators).toBe(true);
    });

    it('returns ERROR for very short transcript', () => {
      const result = EmotionContentValidator.validateSinging('si', 5);
      expect(result.outcome).toBe('ERROR');
    });
  });

  describe('validateGreeting', () => {
    it('returns CORRECT when greeting words detected', () => {
      const result = EmotionContentValidator.validateGreeting('hola como estas');
      expect(result.outcome).toBe('CORRECT');
      expect(result.details.hasGreeting).toBe(true);
    });

    it('returns ERROR when no greeting detected', () => {
      const result = EmotionContentValidator.validateGreeting('el perro come');
      expect(result.outcome).toBe('ERROR');
    });
  });

  describe('validateMessageRecall', () => {
    it('returns CORRECT when key phrases are recalled', () => {
      const result = EmotionContentValidator.validateMessageRecall(
        'dile a mama que la cena es a las siete',
        'Dile a mama que la cena es a las 7',
        ['mama', 'cena', '7']
      );
      expect(result.outcome).toBe('CORRECT');
      expect(result.details.phraseCoverage).toBeGreaterThanOrEqual(0.67);
    });
  });

  describe('validatePerformance', () => {
    it('returns CORRECT for performance-like content', () => {
      const transcript = 'habia una vez un gato que cantaba una cancion muy bonita';
      const result = EmotionContentValidator.validatePerformance(transcript, 5);
      expect(result.outcome).toBe('CORRECT');
    });
  });
});
```

#### 4.5.2 Tarea: Tests Backend

```
backend/tests/unit/
├── test_socioemocional_auto_validation.py  # Verifica catálogo actualizado
└── test_emotion_validator_integration.py    # Verifica flujo end-to-end
```

#### 4.5.3 Tarea: Verificación Final

```bash
# Frontend
cd frontend && npm run lint && npm run build && npm run test

# Backend
cd backend && source venv/bin/activate && black --check . && flake8 && pytest
```

**Criterios de aceptación Fase 5:**
- [ ] ≥15 tests unitarios pasando
- [ ] ≥2 tests de integración backend pasando
- [ ] Bundle size de EmotionContentValidator < 5KB (minified)
- [ ] STT latency < 8s para clips de 30 segundos
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

## 5. Cambios en Backend

### 5.1 Actualización del Catálogo

**Archivo:** `backend/src/application/catalog/dayc2_items/social_emocional.json`

**Fase 2 (7 ítems lógica):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Fase 3 (4 ítems STT + 1 completion):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "SPEECH",
  "validation_threshold": 0.85,
  "validation_fallback": "SYSTEM_ASSISTED_REVIEW"
}
```

**Ítems que permanecen manuales (2 gamificables + 14 no gamificables):**
```json
{
  "auto_validable": false,
  "requiere_revision_psicologo": true
}
```

### 5.2 Ajuste en Dayc2FlowService

Mismo cambio que en las otras áreas:

```python
auto_validable = catalog_item.get("auto_validable", False)
threshold = catalog_item.get("validation_threshold", 0.75)
needs_review = (not auto_validable) or confidence < threshold
```

---

## 6. Cronograma Consolidado

```
Semanas  1-2   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Animaciones + Audio (compartido)
Semanas  3-4   ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Mejora shared games emocionales
Semanas  5-6   ░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░  Fase 2: LogicValidator en 7 ítems
Semana   7     ░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░  Fase 2: Catálogo backend
Semanas  8-9   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░  Fase 3: EmotionContentValidator
Semanas 10-11  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 3: Integración STT en 5 ítems
Semana  12     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████  Fase 3: Catálogo backend
Semanas 13-14  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Mejoras específicas
Semanas 15-16  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Más mejoras
Semanas 17-19  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████  Fase 5: Testing
```

| Fase | Semanas | Ítems auto-validables acumulados |
|------|---------|--------------------------------|
| Inicio | 0 | 0 |
| Fase 1 | 1-4 | 0 (solo visual) |
| Fase 2 | 5-7 | **7** (+7 lógica directa) |
| Fase 3 | 8-12 | **12** (+4 STT + 1 completion) |
| Fase 4 | 13-16 | 12 (mejoras visuales) |
| Fase 5 | 17-19 | **12** (testing) |

---

## 7. Riesgos y Mitigaciones Específicos de Socioemocional

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | Validación emocional es inherentemente subjetiva | Alta | Alto | Solo auto-validar ítems con respuesta correcta definida (conocimiento emocional); los ítems de expresión emocional usan threshold bajo (0.5) |
| 2 | STT no detecta contenido emocional en voz infantil | Alta | Medio | Usar keyword matching en vez de análisis de tono; threshold bajo; fallback a revisión |
| 3 | El niño canta pero STT no reconoce la letra | Media | Medio | `validateSinging` no requiere palabras específicas, solo indicadores de canto (repetición, longitud, keywords musicales) |
| 4 | DressUpGame: "disfrazarse" es creativo, no hay correcto/incorrecto | Media | Bajo | Validar solo completitud (≥2/3 slots llenos), no la calidad del disfraz |
| 5 | PhoneCallGame: el niño no recuerda el mensaje exacto | Alta | Medio | `validateMessageRecall` usa fuzzy matching con keyPhrases; threshold bajo (0.5); solo requiere recordar las ideas clave |
| 6 | Ítems de emoción (042) tienen respuestas "correctas" que pueden variar culturalmente | Media | Medio | Las respuestas correctas están definidas en el catálogo; el psicólogo puede corregir si no aplica al contexto cultural |
| 7 | Los 9 ítems de PREGUNTA_CUIDADOR no se benefician de mejoras | Baja | Bajo | CaregiverQuestionnaire mejora la UX del adulto; no se intenta auto-validar |
| 8 | Niños con dificultades emocionales pueden dar respuestas "incorrectas" que son válidas clínicamente | Media | Alto | Threshold bajo para auto-validación; siempre guardar evidencia para revisión del psicólogo; nunca descartar respuestas "incorrectas" |

---

## 8. Métricas de Éxito

| KPI | Baseline | Fase 2 | Fase 5 |
|-----|----------|--------|--------|
| % ítems gamificables auto-validables | 0% | 50% | 86% |
| Tiempo revisión Socioemocional por evaluación | ~15 min | ~10 min | ~5 min |
| Concordancia STT-psicólogo (ítems verbales) | N/A | >65% | >75% |
| Tasa de falsos positivos en emoción | 0% | <12% | <8% |
| Engagement infantil en ítems emocionales | Baseline | +20% | +35% |
| Satisfacción del cuidador con cuestionario | N/A | N/A | >70% positiva |

---

## 9. Dependencias de Otros Planes

Este plan **depende** de:

| Componente | Origen | Fase Socioemocional que lo usa |
|-----------|--------|-------------------------------|
| `AutoValidationEngine` | Cognitivo Fase 2 | Fase 2 |
| `LogicValidator` | Cognitivo Fase 2 | Fase 2 |
| `whisperWorker` + `@xenova/transformers` | Comunicación Fase 3 | Fase 3 |
| `SpeechValidator` (base) | Comunicación Fase 3 | Fase 3 |
| Framer Motion + audio + animaciones | Cognitivo Fase 1 | Fase 1 |
| `InteractiveQA` mejorado | Comunicación Fase 1 | Fase 1 |

**NO depende** de:
- OCR/Tesseract (no hay escritura)
- MediaPipe/Computer Vision (no hay detección visual)
- TracingValidator (no hay trazos)

**Recomendación**: Ejecutar después de completar Fase 3 de Comunicación. Puede correr en paralelo con Fase 3-4 de Desarrollo Físico.

---

## 10. Comparativa Visual: Antes vs Después

### Ejemplo: SOCIAL_EMOCIONAL_042 (Habla de sus sentimientos)

**ANTES:**
```
┌─────────────────────────────────┐
│  ¿Cómo te sientes ahora?        │
│                                 │
│  😊 Feliz   😢 Triste           │
│  😠 Enojado 😰 Miedo            │
│  😴 Cansado 💗 Querido          │
│                                 │
│  Ronda 1/4                      │
│  El evaluador revisará.         │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│   📔  MI DIARIO EMOCIONAL  📔  │
│                                 │
│  ¿Cómo te sientes ahora?        │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │  😊  │ │  😢  │ │  😠  │   │
│  │Feliz │ │Triste│ │Enoj. │   │
│  │(pulse)│ │(pulse)│ │(pulse)│   │
│  └──────┘ └──────┘ └──────┘   │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │  😰  │ │  😴  │ │  💗  │   │
│  │Miedo │ │Cans. │ │Quer. │   │
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  (al seleccionar "Feliz":      │
│   fondo cambia a amarillo,     │
│   mascota sonríe,              │
│   sticker se pega en diario)   │
│                                 │
│  📔 Stickers: [😊] ___ ___ ___ │
│  ████████░░░░  Ronda 1/4       │
│  Confianza: 1.0 → AUTO ✓      │
└─────────────────────────────────┘
```

### Ejemplo: SOCIAL_EMOCIONAL_057 (Contesta el teléfono)

**ANTES:**
```
┌─────────────────────────────────┐
│  👵 Abuelita llama              │
│                                 │
│  "Dile a mama que la cena      │
│   es a las 7"                   │
│                                 │
│  [🎤 Grabar respuesta]          │
│  [Repetir mensaje]              │
│                                 │
│  El evaluador revisará.         │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│   📱  CONTESTA EL TELÉFONO  📱 │
│                                 │
│  ┌─────────────────────────┐   │
│  │  📞 Llamada entrante... │   │
│  │  👵 Abuelita            │   │
│  │  (vibración + timbre)   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  💬 "Dile a mamá que   │   │
│  │      la cena es a las  │   │
│  │      7" (burbuja chat)  │   │
│  └─────────────────────────┘   │
│                                 │
│  [🔄 Repetir] [🎤 Grabar]     │
│                                 │
│  ▁▂▃▅▆▇ (ondas audio)         │
│  ⏱️ 0:08                       │
│                                 │
│  📝 Transcript: "mamá cena     │
│  a las siete"                   │
│  ✅ Frases clave: mamá ✓       │
│  ✅ cena ✓  7 ✓                │
│  Confianza: 0.94 → AUTO ✓     │
└─────────────────────────────────┘
```

---

## 11. Resumen Ejecutivo

Este plan transforma el área Socioemocional del DAYC-2 abordando el desafío único de evaluar competencias emocionales de forma objetiva:

### Resultados Esperados

1. **12 de 14 ítems gamificables (86%)** serán auto-validables:
   - **7 ítems (50%)** por lógica directa (InteractiveQA con respuestas emocionales correctas)
   - **4 ítems (29%)** por STT + análisis de contenido emocional
   - **1 ítem (7%)** por validación de completitud (DressUpGame)

2. **2 ítems gamificables** permanecen con revisión manual (036: pide ayuda, 037: orgullo — demasiado subjetivos)

3. **14 ítems no gamificables** (9 pregunta cuidador + 5 manual guiado) mejoran su UX pero no se auto-validan

### Beneficios Clave

1. **Reduce la carga del psicólogo** de ~15 min a ~5 min en Socioemocional
2. **Validación emocional objetiva** para ítems de conocimiento emocional (identificar emociones, reacciones apropiadas)
3. **Análisis de contenido verbal** para ítems de expresión emocional (cantar, saludar, recordar mensajes)
4. **Reutiliza infraestructura de Cognitivo y Comunicación** — solo añade 2 validadores nuevos
5. **Preserva el juicio clínico** para los ítems genuinamente subjetivos

### Próximos Pasos

1. Completar Fase 3 de Comunicación (prerrequisito para STT)
2. Ejecutar Fase 1 de Socioemocional en paralelo con otras áreas
3. Iterar EmotionContentValidator con datos reales de respuestas infantiles
4. Validar con psicólogos que la auto-validación emocional es clínicamente apropiada

---

**Documento creado:** Julio 2026
**Versión:** 1.0
**Estado:** Plan de Implementación Completo
**Depende de:** `plan-implementacion-cognitivo.md` (Fases 1-2), `plan-implementacion-comunicacion.md` (Fase 3)

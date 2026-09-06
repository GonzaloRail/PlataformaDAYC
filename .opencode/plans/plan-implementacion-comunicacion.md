# Plan de Implementación: Mejora del Área Comunicación DAYC-2
## De Juegos Simples a Validación Automática con IA Lingüística

> **Destino final:** `MejoraDeJuegosV2/plan-implementacion-comunicacion.md`
> **Depende de:** `MejoraDeJuegosV2/plan-implementacion-cognitivo.md` (Fases 1-3)

---

## 1. Visión General

### 1.1 Objetivo

Transformar los 32 minijuegos de Comunicación del DAYC-2 de experiencias simples a juegos interactivos ricos con validación automática, aprovechando que esta área es **la más dependiente del lenguaje verbal** (37.5% de ítems requieren respuesta hablada), lo que la convierte en la candidata ideal para STT + NLP.

### 1.2 Estado Actual vs Objetivo

| Dimensión | Actual | Objetivo |
|-----------|--------|----------|
| Total ítems Comunicación | 32 | 32 |
| Auto-validables | 0/32 (0%) | 30/32 (94%) |
| Requieren revisión psicólogo | 32/32 (100%) | 2/32 (6%) |
| Ítems con STT activo | 0 | 11 |
| Validadores lingüísticos | 0 | 6 nuevos |
| Tecnologías activas | Click, drag, grabar audio sin análisis | +STT, +NLP, +análisis lingüístico |

### 1.3 Diferencias Clave vs Área Cognitiva

| Aspecto | Cognitivo | Comunicación |
|---------|-----------|-------------|
| Énfasis | Visual-espacial, numérico | **Lingüístico-verbal** |
| % ítems con audio | ~10% | **37.5%** |
| Validación principal | Lógica + CV | **STT + NLP** |
| Complejidad de validación | Media (comparación directa) | **Alta (análisis semántico)** |
| Shared game dominante | CountingGame (4 usos) | **VerbalResponseGame (12 usos)** |
| Computer Vision necesaria | Sí (cubos, dibujos) | **No** |
| OCR necesario | Sí (escritura) | **No** |

### 1.4 Restricciones Técnicas

- **Procesamiento 100% en cliente** — ningún audio sale del navegador
- **Reutilización de infraestructura**: el `AutoValidationEngine`, `whisperWorker` y `SpeechValidator` creados en el plan de Cognitivo se reutilizan directamente
- **Sin dependencias nuevas** adicionales a las ya planeadas en Cognitivo (`@xenova/transformers`)
- **El ítem 049** (observacional) y **057** (cambio de conversación) permanecen con revisión manual por su naturaleza subjetiva

---

## 2. Inventario Completo de Ítems

### 2.1 Tabla Maestra: 32 Ítems de Comunicación

| # | ID | Pregunta | Shared Game | Layout/Mode | Modalidad | Auto-val. Propuesta |
|---|---|---|---|---|---|---|
| 45 | COMUNICACION_045 | Cumple instrucciones 'al lado'/'debajo' | `SpatialGame` | relation="al-lado", 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 46 | COMUNICACION_046 | Usa ≥50 palabras distintas espontáneamente | `VerbalResponseGame` | counter, max=50 | EVIDENCIA_DIFERIDA | **STT-WORDCOUNT** ✅ |
| 47 | COMUNICACION_047 | Usa oraciones con tres palabras | `VerbalResponseGame` | free, audio | EVIDENCIA_DIFERIDA | **STT-SENTENCE** ✅ |
| 48 | COMUNICACION_048 | Entiende oraciones pasivas | `InteractiveQA` | two-images, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 49 | COMUNICACION_049 | Describe lo que está haciendo | `VerbalResponseGame` | free, audio | OBSERVACION_FISICA | **MANUAL** ❌ |
| 50 | COMUNICACION_050 | Hace preguntas con 'qué'/'dónde' | `VerbalResponseGame` | counter, max=20 | EVIDENCIA_DIFERIDA | **STT-QUESTION** ✅ |
| 51 | COMUNICACION_051 | Usa algunos plurales | `InteractiveQA` | options-grid, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 52 | COMUNICACION_052 | Dice si dos palabras riman | `RhymeGame` | 5 pairs | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 53 | COMUNICACION_053 | Responde 'quién'/'de quién' | `InteractiveQA` | scene-tap, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 54 | COMUNICACION_054 | Da su nombre completo | `VerbalResponseGame` | free, audio | MANUAL_GUIADO | **STT-NAME** ✅ |
| 55 | COMUNICACION_055 | Hace preguntas con 'cuándo'/'por qué'/'cuántos' | `VerbalResponseGame` | counter, max=20 | EVIDENCIA_DIFERIDA | **STT-QUESTION** ✅ |
| 56 | COMUNICACION_056 | Comprende 'enfrente de'/'detrás' | `SpatialGame` | relation="enfrente", 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 57 | COMUNICACION_057 | Cambia conversación según oyente | `VerbalResponseGame` | free | EVIDENCIA_DIFERIDA | **MANUAL** ❌ |
| 58 | COMUNICACION_058 | Usa 300-1000 palabras espontáneamente | `VerbalResponseGame` | counter, max=100 | EVIDENCIA_DIFERIDA | **STT-WORDCOUNT** ✅ |
| 59 | COMUNICACION_059 | Sigue órdenes de 3 pasos no relacionados | `InstructionFollowingGame` | 2 seq × 3 steps | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 60 | COMUNICACION_060 | Completa analogías verbales simples | `MatchingGame` | 4 items + 4 zones | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 61 | COMUNICACION_061 | Usa comparativos (grande/más grande/el más grande) | `ComparisonGame` | mode="tamanio", 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 62 | COMUNICACION_062 | Define 2 palabras simples | `VerbalResponseGame` | free, audio | EVIDENCIA_DIFERIDA | **STT-DEFINITION** ✅ |
| 63 | COMUNICACION_063 | Hace oraciones de causa y efecto | `InteractiveQA` | two-images, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 64 | COMUNICACION_064 | Responde a '¿Qué pasa si...?' | `InteractiveQA` | two-images, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 65 | COMUNICACION_065 | Define 5 palabras simples | `VerbalResponseGame` | free, audio | EVIDENCIA_DIFERIDA | **STT-DEFINITION** ✅ |
| 66 | COMUNICACION_066 | Cuenta historias familiares sin figuras | `StoryNarrationGame` | audio | EVIDENCIA_DIFERIDA | **STT-NARRATION** ✅ |
| 67 | COMUNICACION_067 | Responde preguntas de comprensión de historia | `InteractiveQA` | options-grid, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 68 | COMUNICACION_068 | Define 10 palabras simples | `VerbalResponseGame` | free, audio | EVIDENCIA_DIFERIDA | **STT-DEFINITION** ✅ |
| 69 | COMUNICACION_069 | Comprende estaciones del año | `ClassificationGame` | 4 zones (estaciones) | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 70 | COMUNICACION_070 | Responde conceptos de tiempo | `InteractiveQA` | options-grid, 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 71 | COMUNICACION_071 | Establece semejanzas y diferencias | `ClassificationGame` | 2 zones (semejanza/diferencia) | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 72 | COMUNICACION_072 | Responde 'Dime lo contrario de...' | `MatchingGame` | 4 items + 4 zones | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 73 | COMUNICACION_073 | Cuenta bromas sencillas | `VerbalResponseGame` | free, audio | EVIDENCIA_DIFERIDA | **STT-NARRATION** ⚠️ |
| 74 | COMUNICACION_074 | Identifica izquierda y derecha | `BodyPartsGame` | 6 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 75 | COMUNICACION_075 | Usa comparativos irregulares (bueno/mejor) | `ComparisonGame` | mode="calidad", 4 rounds | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |
| 76 | COMUNICACION_076 | Usa 'ayer' y 'mañana' con significado | `ClassificationGame` | 2 zones (ayer/mañana) | INTERACTIVO_ASISTIDO | **LOGIC** ✅ |

### 2.2 Resumen por Tipo de Validación

| Tipo | Ítems | Cantidad | % |
|------|-------|----------|---|
| **LOGIC** (respuesta cerrada visual) | 045, 048, 051, 052, 053, 056, 059, 060, 061, 063, 064, 067, 069, 070, 071, 072, 074, 075, 076 | 19 | 59% |
| **STT** (respuesta verbal) | 046, 047, 050, 054, 055, 058, 062, 065, 066, 068, 073 | 11 | 34% |
| **MANUAL** (requiere psicólogo) | 049, 057 | 2 | 6% |
| **Total auto-validables** | | **30** | **94%** |

### 2.3 Shared Games Usados

| Shared Game | Ítems Comunicación | Usos |
|-------------|-------------------|------|
| `VerbalResponseGame` | 046, 047, 049, 050, 054, 055, 057, 058, 062, 065, 068, 073 | **12** |
| `InteractiveQA` | 048, 051, 053, 063, 064, 067, 070 | **7** |
| `ClassificationGame` | 069, 071, 076 | **3** |
| `SpatialGame` | 045, 056 | **2** |
| `ComparisonGame` | 061, 075 | **2** |
| `MatchingGame` | 060, 072 | **2** |
| `RhymeGame` | 052 | **1** |
| `InstructionFollowingGame` | 059 | **1** |
| `BodyPartsGame` | 074 | **1** |
| `StoryNarrationGame` | 066 | **1** |

---

## 3. Arquitectura de Validación para Comunicación

### 3.1 Reutilización de Infraestructura Cognitivo

El plan de Comunicación **no requiere infraestructura nueva**. Reutiliza:

| Componente | Origen (Cognitivo) | Uso en Comunicación |
|-----------|-------------------|---------------------|
| `AutoValidationEngine` | Fase 2 Cognitivo | Motor central de decisiones |
| `LogicValidator` | Fase 2 Cognitivo | 19 ítems de respuesta cerrada |
| `SpeechValidator` + `whisperWorker` | Fase 3 Cognitivo | 11 ítems de respuesta verbal |
| `levenshtein.ts` | Fase 3 Cognitivo | Fuzzy matching de nombres |
| `numberParser.ts` | Fase 3 Cognitivo | Conteo de palabras |
| `keywordMatcher.ts` | Fase 3 Cognitivo | Matching de definiciones |

### 3.2 Nuevo Módulo: `LanguageValidator`

**Archivo:** `frontend/src/components/validation/validators/LanguageValidator.ts`

Este es el **único componente nuevo** específico de Comunicación. Contiene 6 validadores lingüísticos:

```typescript
import { levenshtein } from '../utils/levenshtein';

function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function tokenize(text: string): string[] {
  const stopWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'de', 'del', 'al', 'a', 'en', 'con', 'por', 'para',
    'es', 'son', 'esta', 'este', 'esto', 'ese', 'esa',
    'yo', 'tu', 'el', 'ella', 'nosotros', 'ellos',
    'y', 'o', 'pero', 'que', 'si', 'no',
    'eh', 'este', 'mmm', 'ah', 'oh', 'uh',
  ]);
  return normalizeSpanish(text)
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));
}

function splitSentences(text: string): string[] {
  return text
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export const LanguageValidator = {

  // ─── 046, 058: Conteo de palabras distintas ───
  validateWordCount(
    transcript: string,
    threshold: number,
    minDistinctRatio = 0.6
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; wordCount: number; distinctCount: number } {
    const words = tokenize(transcript);
    const distinct = new Set(words);
    const distinctCount = distinct.size;
    const ratio = distinctCount / threshold;
    const confidence = Math.min(ratio, 1.0);

    return {
      outcome: distinctCount >= threshold * minDistinctRatio ? 'CORRECT' : 'ERROR',
      confidence,
      wordCount: words.length,
      distinctCount,
    };
  },

  // ─── 047: Oraciones de 3+ palabras ───
  validateSentenceStructure(
    transcript: string,
    minWordsPerSentence = 3,
    minSentences = 1
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; qualifyingSentences: number } {
    const sentences = splitSentences(transcript);
    const qualifying = sentences.filter((s) => tokenize(s).length >= minWordsPerSentence);
    const confidence = Math.min(qualifying.length / minSentences, 1.0);

    return {
      outcome: qualifying.length >= minSentences ? 'CORRECT' : 'ERROR',
      confidence,
      qualifyingSentences: qualifying.length,
    };
  },

  // ─── 050, 055: Detección de preguntas ───
  validateQuestions(
    transcript: string,
    expectedQuestionWords: string[],
    minQuestions = 1
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; questionsFound: number } {
    const normalized = normalizeSpanish(transcript);
    const questionIndicators = ['que', 'donde', 'cuando', 'por que', 'cuantos', 'cuantas', 'como', 'quien'];

    const relevantIndicators = questionIndicators.filter((ind) =>
      expectedQuestionWords.some((ew) => normalizeSpanish(ew).includes(ind))
    );

    let questionsFound = 0;
    for (const indicator of relevantIndicators) {
      const regex = new RegExp(`\\b${indicator}\\b`, 'g');
      const matches = normalized.match(regex);
      questionsFound += matches ? matches.length : 0;
    }

    const confidence = Math.min(questionsFound / minQuestions, 1.0);

    return {
      outcome: questionsFound >= minQuestions ? 'CORRECT' : 'ERROR',
      confidence,
      questionsFound,
    };
  },

  // ─── 054: Validación de nombre completo ───
  validateFullName(
    transcript: string,
    expectedName: string,
    expectedLastName?: string
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; nameMatch: number; lastNameMatch: number } {
    const normalized = normalizeSpanish(transcript);
    const nameParts = normalizeSpanish(expectedName).split(/\s+/);
    const lastNameParts = expectedLastName ? normalizeSpanish(expectedLastName).split(/\s+/) : [];

    let nameMatch = 0;
    for (const part of nameParts) {
      if (normalized.includes(part)) nameMatch++;
    }
    const nameScore = nameParts.length > 0 ? nameMatch / nameParts.length : 0;

    let lastNameMatch = 0;
    for (const part of lastNameParts) {
      if (normalized.includes(part)) lastNameMatch++;
    }
    const lastNameScore = lastNameParts.length > 0 ? lastNameMatch / lastNameParts.length : 0;

    const totalScore = expectedLastName
      ? (nameScore * 0.5 + lastNameScore * 0.5)
      : nameScore;

    return {
      outcome: totalScore >= 0.7 ? 'CORRECT' : 'ERROR',
      confidence: totalScore,
      nameMatch: nameScore,
      lastNameMatch: lastNameScore,
    };
  },

  // ─── 062, 065, 068: Definición de palabras ───
  validateDefinitions(
    transcript: string,
    wordsToDefine: { word: string; keywords: string[] }[],
    minCorrectDefinitions = 1
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; definitionsFound: number; details: DefinitionDetail[] } {
    const normalized = normalizeSpanish(transcript);
    const details: DefinitionDetail[] = [];
    let correctDefinitions = 0;

    for (const { word, keywords } of wordsToDefine) {
      const normalizedWord = normalizeSpanish(word);
      const wordMentioned = normalized.includes(normalizedWord);
      const matchedKeywords = keywords.filter((kw) =>
        normalized.includes(normalizeSpanish(kw))
      );
      const keywordScore = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0;
      const isDefined = keywordScore >= 0.4 || (wordMentioned && matchedKeywords.length >= 1);

      if (isDefined) correctDefinitions++;
      details.push({ word, keywordScore, matchedKeywords, isDefined });
    }

    const confidence = correctDefinitions / wordsToDefine.length;

    return {
      outcome: correctDefinitions >= minCorrectDefinitions ? 'CORRECT' : 'ERROR',
      confidence,
      definitionsFound: correctDefinitions,
      details,
    };
  },

  // ─── 066, 073: Narración de historias / chistes ───
  validateNarration(
    transcript: string,
    expectedKeywords: string[],
    minKeywords = 3,
    minSentences = 2,
    minDurationWords = 10
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; analysis: NarrationAnalysis } {
    const normalized = normalizeSpanish(transcript);
    const words = tokenize(transcript);
    const sentences = splitSentences(transcript);

    const matchedKeywords = expectedKeywords.filter((kw) =>
      normalized.includes(normalizeSpanish(kw))
    );
    const keywordCoverage = expectedKeywords.length > 0
      ? matchedKeywords.length / expectedKeywords.length
      : 0;

    const sentenceScore = Math.min(sentences.length / minSentences, 1.0);
    const lengthScore = Math.min(words.length / minDurationWords, 1.0);

    const confidence = (keywordCoverage * 0.5 + sentenceScore * 0.3 + lengthScore * 0.2);

    return {
      outcome: confidence >= 0.5 ? 'CORRECT' : 'ERROR',
      confidence,
      analysis: {
        transcript,
        wordCount: words.length,
        sentenceCount: sentences.length,
        keywordCoverage,
        matchedKeywords: matchedKeywords.length,
        totalKeywords: expectedKeywords.length,
      },
    };
  },
};

interface DefinitionDetail {
  word: string;
  keywordScore: number;
  matchedKeywords: string[];
  isDefined: boolean;
}

interface NarrationAnalysis {
  transcript: string;
  wordCount: number;
  sentenceCount: number;
  keywordCoverage: number;
  matchedKeywords: number;
  totalKeywords: number;
}
```

### 3.3 Flujo de Validación para Comunicación

```
Minijuego de Comunicación termina
    │
    ▼
┌─ ¿Es respuesta cerrada (click/drag/selección)? ─┐
│  SÍ → LogicValidator (de Cognitivo)              │
│       confidence = correctCount / total           │
│       → 19 ítems                                 │
└──────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es respuesta verbal (audio grabado)? ─────────┐
│  SÍ → whisperWorker.transcribe(audioBlob)        │
│       │                                          │
│       ├─ 046/058 → LanguageValidator             │
│       │   .validateWordCount(transcript, N)      │
│       │                                          │
│       ├─ 047 → LanguageValidator                 │
│       │   .validateSentenceStructure(transcript) │
│       │                                          │
│       ├─ 050/055 → LanguageValidator             │
│       │   .validateQuestions(transcript, [...])  │
│       │                                          │
│       ├─ 054 → LanguageValidator                 │
│       │   .validateFullName(transcript, name)    │
│       │                                          │
│       ├─ 062/065/068 → LanguageValidator         │
│       │   .validateDefinitions(transcript, [...])│
│       │                                          │
│       └─ 066/073 → LanguageValidator             │
│           .validateNarration(transcript, [...])  │
│                                                  │
│       confidence → Decision Engine               │
│       → 11 ítems                                 │
└──────────────────────────────────────────────────┘
    │
    ▼
Decision Engine (igual que Cognitivo)
    ├─ confidence ≥ 0.85 → SYSTEM_AUTO
    ├─ 0.60 ≤ confidence < 0.85 → SYSTEM_ASSISTED_REVIEW
    └─ confidence < 0.60 → REQUIRES_ADULT_REVIEW
```

---

## 4. Plan por Fases

### FASE 1: Mejora Visual y UX (Semanas 1-4)

**Objetivo**: Transformar la experiencia visual de los minijuegos de Comunicación.

> **Nota**: Esta fase se solapa con la Fase 1 de Cognitivo. Los componentes de animación, audio y feedback se crean una vez y se comparten entre ambas áreas.

#### 4.1.1 Tarea: Mejorar `InteractiveQA` (7 ítems)

**Archivo:** `frontend/src/minijuegos/shared/InteractiveQA.tsx`

**Cambios:**
- Animaciones de entrada para opciones (Framer Motion stagger)
- Feedback háptico (vibración) en dispositivos móviles al seleccionar
- Efecto de "spotlight" en la opción correcta tras responder
- Sonido de narración de la pregunta (Text-to-Speech del navegador)
- Transición animada entre rondas

```typescript
// Ejemplo: narración de pregunta con Web Speech API
const speakQuestion = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
};

// En cada nueva ronda:
useEffect(() => {
  if (currentRound) speakQuestion(currentRound.question);
}, [step]);
```

#### 4.1.2 Tarea: Mejorar `VerbalResponseGame` (12 ítems)

**Archivo:** `frontend/src/minijuegos/shared/VerbalResponseGame.tsx`

**Cambios:**
- Visualización de ondas de audio en tiempo real durante grabación
- Timer animado con cuenta regresiva
- Indicador visual de volumen (VU meter)
- Animación de "pensando" mientras STT procesa
- Transcript visible en tiempo real (Fase 3)

```typescript
// Visualización de ondas de audio
const AudioVisualizer = ({ analyser }: { analyser: AnalyserNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / dataArray.length) * 2.5;
      let x = 0;

      for (const value of dataArray) {
        const barHeight = (value / 255) * canvas.height;
        ctx.fillStyle = `hsl(${200 + value * 0.5}, 70%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} width={300} height={80} className="audio-visualizer" />;
};
```

#### 4.1.3 Tarea: Mejorar `RhymeGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/RhymeGame.tsx`

**Cambios:**
- Las palabras "flotan" con animación de bounce suave
- Al presionar "Riman", las palabras se acercan y brillan
- Al presionar "No riman", las palabras se separan con shake
- Sonido de pronunciación de cada palabra (TTS)
- Efecto de ondas sonoras entre palabras que riman

#### 4.1.4 Tarea: Mejorar `SpatialGame` (2 ítems)

**Archivo:** `frontend/src/minijuegos/shared/SpatialGame.tsx`

**Cambios:**
- Escenario 3D con el objeto de referencia y posiciones
- Animación de "fantasma" mostrando dónde debería ir el objeto
- Física de snap al soltar cerca de la posición correcta
- Partículas de celebración al acertar

#### 4.1.5 Tarea: Mejorar `InstructionFollowingGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/InstructionFollowingGame.tsx`

**Cambios:**
- Los pasos se muestran como "misión" con checklist animado
- Los targets brillan/pulsan cuando son el objetivo actual
- Animación de "check" verde al completar cada paso
- Progreso visual tipo "mapa de aventura"
- Sonido de "nivel completado" al terminar una secuencia

#### 4.1.6 Tarea: Mejorar `BodyPartsGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/BodyPartsGame.tsx`

**Cambios:**
- Personaje 3D o SVG detallado (no CSS boxes)
- Zonas del cuerpo con hover highlight
- Animación de "señalar" cuando el niño toca una zona
- Feedback visual en el personaje (brillo en la zona correcta)
- Narración de la instrucción por TTS

#### 4.1.7 Tarea: Mejorar `StoryNarrationGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/StoryNarrationGame.tsx`

**Cambios:**
- Paneles de historia con animación de "pasar página"
- Indicador de progreso de narración
- Visualización de audio en tiempo real
- Timer suave que incentiva narrar (sin presión)

**Criterios de aceptación Fase 1:**
- [ ] Todos los shared games de Comunicación tienen animaciones Framer Motion
- [ ] Audio reactivo (sonidos de click, éxito, error, celebración)
- [ ] TTS para narración de preguntas en InteractiveQA
- [ ] Visualización de audio en VerbalResponseGame
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 2: Validación Lógica Directa (Semanas 5-7)

**Objetivo**: Habilitar auto-validación para los 19 ítems de respuesta cerrada.

#### 4.2.1 Tarea: Habilitar Auto-Validación en Shared Games

**Patrón de cambio idéntico al plan de Cognitivo.** Para cada shared game, cambiar el campo `validation` en el `answerOnce`:

| Shared Game | Ítems Comunicación | Cambio |
|-------------|-------------------|--------|
| `InteractiveQA` | 048, 051, 053, 063, 064, 067, 070 | `correct/total → confidence → auto si ≥0.85` |
| `SpatialGame` | 045, 056 | `correct/total → confidence → auto si ≥0.85` |
| `RhymeGame` | 052 | `correct/total → confidence → auto si ≥0.85` |
| `ComparisonGame` | 061, 075 | `correct/total → confidence → auto si ≥0.85` |
| `MatchingGame` | 060, 072 | `correct/total → confidence → auto si ≥0.85` |
| `InstructionFollowingGame` | 059 | `fullSequences/total → confidence → auto si ≥0.85` |
| `BodyPartsGame` | 074 | `correct/total → confidence → auto si ≥0.85` |
| `ClassificationGame` | 069, 071, 076 | `correct/total → confidence → auto si ≥0.85` |

**Ejemplo de cambio en `InteractiveQA.tsx`:**

```typescript
// Antes:
answerOnce(correct === rounds.length ? 'CORRECT' : 'ERROR', {
  detalle: JSON.stringify({
    validation: 'requires_adult_or_psychologist_review',
    correct,
    totalRounds: rounds.length,
    picks: next,
    layout,
  }),
});

// Después:
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

**Archivo:** `backend/src/application/catalog/dayc2_items/comunicacion.json`

Para los 19 ítems de lógica directa:

```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Lista de ítems a actualizar:**
045, 048, 051, 052, 053, 056, 059, 060, 061, 063, 064, 067, 069, 070, 071, 072, 074, 075, 076

**Criterios de aceptación Fase 2:**
- [ ] 19 ítems de Comunicación auto-validables por lógica
- [ ] El backend marca estos como `AUTO_VALIDATED`
- [ ] El psicólogo ve 13 ítems pendientes (vs 32 antes)
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 3: Speech-to-Text + Validadores Lingüísticos (Semanas 8-13)

**Objetivo**: Validar automáticamente las 11 respuestas verbales mediante STT + NLP.

> **Nota**: Esta fase reutiliza el `whisperWorker` y la infraestructura STT creada en la Fase 3 de Cognitivo. Solo se añaden los validadores lingüísticos específicos.

#### 4.3.1 Tarea: Crear `LanguageValidator`

**Archivo:** `frontend/src/components/validation/validators/LanguageValidator.ts`

(Código completo mostrado en sección 3.2 arriba)

#### 4.3.2 Tarea: Extender `SpeechValidator` con métodos lingüísticos

**Archivo:** `frontend/src/components/validation/validators/SpeechValidator.ts`

Añadir métodos que combinan transcripción + validación lingüística:

```typescript
// Extensión de SpeechValidator para Comunicación

export const SpeechValidator = {
  // ... métodos existentes de Cognitivo ...

  // COMUNICACION_046: ≥50 palabras distintas
  async validateSpontaneousWords(
    audioBlob: Blob, threshold = 50
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; wordCount: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateWordCount(transcript, threshold);
    return { ...result, transcript };
  },

  // COMUNICACION_047: Oraciones de 3+ palabras
  async validateThreeWordSentences(
    audioBlob: Blob
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; qualifyingSentences: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateSentenceStructure(transcript, 3, 1);
    return { ...result, transcript };
  },

  // COMUNICACION_050: Preguntas con qué/dónde
  async validateWhatWhereQuestions(
    audioBlob: Blob, minQuestions = 1
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; questionsFound: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateQuestions(transcript, ['que', 'donde'], minQuestions);
    return { ...result, transcript };
  },

  // COMUNICACION_054: Nombre completo
  async validateChildName(
    audioBlob: Blob, childName: string, childLastName?: string
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateFullName(transcript, childName, childLastName);
    return { ...result, transcript };
  },

  // COMUNICACION_055: Preguntas con cuándo/por qué/cuántos
  async validateComplexQuestions(
    audioBlob: Blob, minQuestions = 1
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; questionsFound: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateQuestions(
      transcript, ['cuando', 'por que', 'cuantos', 'cuantas'], minQuestions
    );
    return { ...result, transcript };
  },

  // COMUNICACION_058: 300-1000 palabras espontáneas
  async validateExtendedVocabulary(
    audioBlob: Blob, threshold = 300
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; wordCount: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateWordCount(transcript, threshold, 0.5);
    return { ...result, transcript };
  },

  // COMUNICACION_062: Definir 2 palabras
  async validateTwoDefinitions(
    audioBlob: Blob, words: { word: string; keywords: string[] }[]
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; definitionsFound: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateDefinitions(transcript, words, 2);
    return { ...result, transcript };
  },

  // COMUNICACION_065: Definir 5 palabras
  async validateFiveDefinitions(
    audioBlob: Blob, words: { word: string; keywords: string[] }[]
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; definitionsFound: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateDefinitions(transcript, words, 3);
    return { ...result, transcript };
  },

  // COMUNICACION_066: Narrar historia familiar
  async validateStoryNarration(
    audioBlob: Blob, expectedKeywords: string[]
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; analysis: NarrationAnalysis }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateNarration(transcript, expectedKeywords, 3, 2, 15);
    return { ...result, transcript };
  },

  // COMUNICACION_068: Definir 10 palabras
  async validateTenDefinitions(
    audioBlob: Blob, words: { word: string; keywords: string[] }[]
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; definitionsFound: number }> {
    const transcript = await transcribe(audioBlob);
    const result = LanguageValidator.validateDefinitions(transcript, words, 6);
    return { ...result, transcript };
  },

  // COMUNICACION_073: Contar chiste/broma
  async validateJokeTelling(
    audioBlob: Blob
  ): Promise<{ outcome: 'CORRECT' | 'ERROR'; confidence: number; transcript: string; analysis: NarrationAnalysis }> {
    const transcript = await transcribe(audioBlob);
    const jokeKeywords = ['habia', 'era', 'una vez', 'entonces', 'y dice', 'jaja', 'gracioso'];
    const result = LanguageValidator.validateNarration(transcript, jokeKeywords, 1, 1, 5);
    return { ...result, transcript };
  },
};
```

#### 4.3.3 Tarea: Integrar STT en `VerbalResponseGame`

**Archivo:** `frontend/src/minijuegos/shared/VerbalResponseGame.tsx`

**Cambios:**
1. Añadir prop `sttConfig` opcional con el validador y parámetros
2. Al detener grabación, ejecutar STT si `sttConfig` está presente
3. Mostrar transcript y confianza
4. Auto-submit si confianza ≥ 0.85

```typescript
interface STTConfig {
  validator: (blob: Blob, ...args: unknown[]) => Promise<{
    outcome: 'CORRECT' | 'ERROR';
    confidence: number;
    transcript: string;
    [key: string]: unknown;
  }>;
  args: unknown[];
}

interface VerbalResponseGameProps {
  // ... props existentes ...
  sttConfig?: STTConfig;
}

// En stopRecord():
const stopRecord = async () => {
  const blob = await media.stop();
  if (blob) {
    await evidence.uploadBlob('AUDIO', blob, { ... });

    if (sttConfig) {
      setPhase('processing');
      try {
        const sttResult = await sttConfig.validator(blob, ...sttConfig.args);
        setTranscript(sttResult.transcript);
        setSttConfidence(sttResult.confidence);

        if (sttResult.confidence >= 0.85) {
          finish(sttResult.outcome, {
            transcript: sttResult.transcript,
            sttConfidence: sttResult.confidence,
            validation: 'auto',
            ...sttResult,
          });
          return;
        }
      } catch {
        // STT falló → fallback manual
      }
    }
    setPhase('review');
  }
};
```

#### 4.3.4 Tarea: Integrar STT en `StoryNarrationGame`

**Archivo:** `frontend/src/minijuegos/shared/StoryNarrationGame.tsx`

Mismo patrón que VerbalResponseGame — añadir `sttConfig` prop y auto-validación.

#### 4.3.5 Tarea: Configurar STT en cada minijuego de Comunicación

Cada `COMUNICACION_XXX/index.tsx` que use VerbalResponseGame o StoryNarrationGame debe pasar el `sttConfig`:

| Ítem | Archivo | sttConfig |
|------|---------|-----------|
| **046** | `COMUNICACION_046/index.tsx` | `SpeechValidator.validateSpontaneousWords(blob, 50)` |
| **047** | `COMUNICACION_047/index.tsx` | `SpeechValidator.validateThreeWordSentences(blob)` |
| **050** | `COMUNICACION_050/index.tsx` | `SpeechValidator.validateWhatWhereQuestions(blob, 1)` |
| **054** | `COMUNICACION_054/index.tsx` | `SpeechValidator.validateChildName(blob, childName, childLastName)` |
| **055** | `COMUNICACION_055/index.tsx` | `SpeechValidator.validateComplexQuestions(blob, 1)` |
| **058** | `COMUNICACION_058/index.tsx` | `SpeechValidator.validateExtendedVocabulary(blob, 300)` |
| **062** | `COMUNICACION_062/index.tsx` | `SpeechValidator.validateTwoDefinitions(blob, wordList)` |
| **065** | `COMUNICACION_065/index.tsx` | `SpeechValidator.validateFiveDefinitions(blob, wordList)` |
| **066** | `COMUNICACION_066/index.tsx` | `SpeechValidator.validateStoryNarration(blob, keywords)` |
| **068** | `COMUNICACION_068/index.tsx` | `SpeechValidator.validateTenDefinitions(blob, wordList)` |
| **073** | `COMUNICACION_073/index.tsx` | `SpeechValidator.validateJokeTelling(blob)` |

**Ejemplo para COMUNICACION_062 (definir 2 palabras):**

```typescript
// COMUNICACION_062/index.tsx
const WORDS_TO_DEFINE = [
  { word: 'perro', keywords: ['animal', 'ladra', 'mascota', 'cuatro patas', 'peludo', 'fiel'] },
  { word: 'sol', keywords: ['estrella', 'calor', 'luz', 'dia', 'brillante', 'cielo', 'amarillo'] },
];

export default function COMUNICACION_062({ currentItem, onAnswer }: Props) {
  return (
    <VerbalResponseGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COMUNICACION_062_CONFIG.id}
      title="Define 2 palabras"
      instruction="El nino debe definir 2 palabras simples."
      prompt="Que es un perro? Y el sol?"
      panelType="free"
      captureAudio
      sttConfig={{
        validator: SpeechValidator.validateTwoDefinitions,
        args: [WORDS_TO_DEFINE],
      }}
    />
  );
}
```

#### 4.3.6 Tarea: Pasar datos del niño a los minijuegos

Para COMUNICACION_054 (nombre completo), el minijuego necesita acceder al nombre del niño evaluado.

**Cambio en el flujo de datos:**

```typescript
// En EvaluationTask type (frontend/src/types/index.ts):
interface EvaluationTask {
  // ... campos existentes ...
  child_name?: string;
  child_last_name?: string;
}
```

**Cambio en backend** (`dayc2_flow_service.py`):

```python
# En get_current_task_payload():
nino = evaluación.nino
if nino and nino.nombre:
    parts = nino.nombre.strip().split()
    payload["child_name"] = parts[0] if parts else ""
    payload["child_last_name"] = " ".join(parts[1:]) if len(parts) > 1 else ""
```

#### 4.3.7 Tarea: Keywords de Definiciones

**Archivo:** `frontend/src/minijuegos/comunicacion/data/definitionKeywords.ts`

```typescript
export const DEFINITION_WORDS_062 = [
  { word: 'perro', keywords: ['animal', 'ladra', 'mascota', 'patas', 'peludo'] },
  { word: 'sol', keywords: ['estrella', 'calor', 'luz', 'dia', 'cielo'] },
];

export const DEFINITION_WORDS_065 = [
  { word: 'perro', keywords: ['animal', 'ladra', 'mascota', 'patas', 'peludo'] },
  { word: 'sol', keywords: ['estrella', 'calor', 'luz', 'dia', 'cielo'] },
  { word: 'casa', keywords: ['lugar', 'vivir', 'hogar', 'techo', 'puerta', 'habitacion'] },
  { word: 'agua', keywords: ['liquido', 'beber', 'tomar', 'rio', 'lluvia', 'transparente'] },
  { word: 'gato', keywords: ['animal', 'mascota', 'miau', 'patas', 'peludo', 'ronronea'] },
];

export const DEFINITION_WORDS_068 = [
  { word: 'perro', keywords: ['animal', 'ladra', 'mascota', 'patas', 'peludo'] },
  { word: 'sol', keywords: ['estrella', 'calor', 'luz', 'dia', 'cielo'] },
  { word: 'casa', keywords: ['lugar', 'vivir', 'hogar', 'techo', 'puerta'] },
  { word: 'agua', keywords: ['liquido', 'beber', 'tomar', 'rio', 'lluvia'] },
  { word: 'gato', keywords: ['animal', 'mascota', 'miau', 'patas', 'peludo'] },
  { word: 'mesa', keywords: ['mueble', 'comer', 'madera', 'patas', 'superficie'] },
  { word: 'libro', keywords: ['leer', 'paginas', 'hojas', 'cuento', 'letras', 'papel'] },
  { word: 'arbol', keywords: ['planta', 'hojas', 'tronco', 'ramas', 'verde', 'grande'] },
  { word: 'lluvia', keywords: ['agua', 'cielo', 'nubes', 'mojar', 'caer', 'clima'] },
  { word: 'zapato', keywords: ['calzado', 'pie', 'poner', 'caminar', 'vestir'] },
];

export const STORY_KEYWORDS_066 = [
  'habia', 'entonces', 'despues', 'luego', 'personaje', 'final',
  'casa', 'bosque', 'camino', 'amigo', 'familia',
];
```

**Criterios de aceptación Fase 3:**
- [ ] `LanguageValidator` creado con 6 métodos de validación
- [ ] `SpeechValidator` extendido con 11 métodos para Comunicación
- [ ] `VerbalResponseGame` soporta `sttConfig` prop
- [ ] `StoryNarrationGame` soporta `sttConfig` prop
- [ ] 11 ítems de Comunicación con STT activo
- [ ] 054 recibe nombre del niño desde el backend
- [ ] Keywords de definiciones configuradas
- [ ] Fallback manual si STT falla
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 4: Mejoras Específicas por Ítem (Semanas 14-17)

**Objetivo**: Enriquecer la experiencia de juego de ítems específicos que lo necesitan.

#### 4.4.1 Tarea: COMUNICACION_045/056 — SpatialGame Mejorado

- Escenario tipo "habitación de juguete" 3D
- El objeto a colocar tiene física de snap
- La mascota pedagógica "guía" al niño señalando la zona correcta
- Animación de "objeto flotando" hacia la posición

#### 4.4.2 Tarea: COMUNICACION_052 — RhymeGame Mejorado

- Las palabras aparecen en "burbujas de diálogo" animadas
- Al presionar "Riman", las burbujas se fusionan con efecto de ondas sonoras
- Al presionar "No riman", las burbujas rebotan y se separan
- TTS pronuncia cada palabra con énfasis en la rima
- Mini-animación mostrando la similitud fonética (letras finales brillan)

#### 4.4.3 Tarea: COMUNICACION_059 — InstructionFollowingGame Mejorado

- Los 3 pasos se muestran como "tarjetas de misión" con iconos
- Cada target brilla con un color distinto
- Al completar un paso, la tarjeta se "sella" con un stamp animado
- Progreso tipo "mapa de tesoro" con camino entre pasos
- Celebración especial al completar los 3 pasos de una secuencia

#### 4.4.4 Tarea: COMUNICACION_069 — Estaciones del Año

- 4 zonas representando las 4 estaciones con fondos distintos
- Objetos que "caen" del cielo (nieve en invierno, hojas en otoño, flores en primavera, sol en verano)
- Drag con física de "aterrizaje suave" en la zona correcta
- Música ambiental que cambia según la estación

#### 4.4.5 Tarea: COMUNICACION_074 — BodyPartsGame Mejorado

- Personaje SVG detallado y amigable (no CSS boxes)
- Zonas del cuerpo con hit areas más grandes para facilitar el toque
- Animación de "hormigueo" en la zona correcta como pista
- El personaje "reacciona" al ser tocado (sonrisa, guiño)
- Narración TTS de cada instrucción ("Toca tu oreja derecha")

#### 4.4.6 Tarea: COMUNICACION_060/072 — MatchingGame para Analogías y Antónimos

- Las palabras aparecen en "tarjetas" con flip animation
- Las zonas de destino tienen forma de "puzzle piece"
- Al emparejar correctamente, las piezas se "conectan" con animación
- Para analogías: mostrar la relación visual (pez→agua como vaca→pasto)
- Para antónimos: mostrar contraste visual (grande↔pequeño con tamaños)

#### 4.4.7 Tarea: COMUNICACION_061/075 — ComparisonGame para Comparativos

- Objetos 3D que cambian de tamaño suavemente (scale animation)
- Para "tamaño": 3 objetos lado a lado con diferencia visual clara
- Para "calidad": 3 objetos con estrellas de valoración
- Animación de "crecimiento" al seleccionar el más grande
- Podio animado para ordenar de menor a mayor

**Criterios de aceptación Fase 4:**
- [ ] SpatialGame tiene escenario 3D con snap
- [ ] RhymeGame tiene TTS y animaciones de fusión/separación
- [ ] InstructionFollowingGame tiene progreso tipo "mapa"
- [ ] Estaciones del año tiene 4 fondos distintos con partículas
- [ ] BodyPartsGame tiene personaje SVG detallado
- [ ] MatchingGame tiene flip animations para analogías/antónimos
- [ ] ComparisonGame tiene objetos 3D con scale animation
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 5: Testing y Optimización (Semanas 18-20)

**Objetivo**: Asegurar calidad y rendimiento.

#### 4.5.1 Tarea: Tests Unitarios

**Archivos a crear:**

```
frontend/tests/unit/validation/
├── LanguageValidator.test.ts       # 6 métodos × 3 casos = 18 tests
├── SpeechValidator.comunicacion.test.ts  # 11 métodos × 2 casos = 22 tests
└── ...

frontend/tests/unit/minijuegos/comunicacion/
├── InteractiveQA.test.tsx          # Auto-validación
├── RhymeGame.test.tsx              # Auto-validación
├── SpatialGame.comunicacion.test.tsx  # Auto-validación
├── InstructionFollowingGame.test.tsx  # Auto-validación
├── BodyPartsGame.test.tsx          # Auto-validación
└── VerbalResponseGame.stt.test.tsx # STT integration
```

**Ejemplo de test para LanguageValidator:**

```typescript
import { describe, it, expect } from 'vitest';
import { LanguageValidator } from '@/components/validation/validators/LanguageValidator';

describe('LanguageValidator', () => {
  describe('validateWordCount', () => {
    it('returns CORRECT when distinct words meet threshold', () => {
      const transcript = 'el perro come huesos y el gato bebe leche y la nina juega con la pelota';
      const result = LanguageValidator.validateWordCount(transcript, 10, 0.6);
      expect(result.outcome).toBe('CORRECT');
      expect(result.distinctCount).toBeGreaterThanOrEqual(6);
    });

    it('returns ERROR when too few distinct words', () => {
      const transcript = 'si si si si si no no no';
      const result = LanguageValidator.validateWordCount(transcript, 50, 0.6);
      expect(result.outcome).toBe('ERROR');
    });
  });

  describe('validateSentenceStructure', () => {
    it('detects sentences with 3+ words', () => {
      const transcript = 'El perro come huesos. La nina juega. Yo quiero agua.';
      const result = LanguageValidator.validateSentenceStructure(transcript, 3, 1);
      expect(result.outcome).toBe('CORRECT');
      expect(result.qualifyingSentences).toBeGreaterThanOrEqual(1);
    });
  });

  describe('validateQuestions', () => {
    it('detects question words in transcript', () => {
      const transcript = 'que es eso donde esta el perro';
      const result = LanguageValidator.validateQuestions(transcript, ['que', 'donde'], 1);
      expect(result.outcome).toBe('CORRECT');
      expect(result.questionsFound).toBeGreaterThanOrEqual(1);
    });
  });

  describe('validateFullName', () => {
    it('matches child name in transcript', () => {
      const result = LanguageValidator.validateFullName('me llamo maria gonzalez', 'maria', 'gonzalez');
      expect(result.outcome).toBe('CORRECT');
      expect(result.confidence).toBeGreaterThanOrEqual(0.7);
    });
  });

  describe('validateDefinitions', () => {
    it('detects keyword-based definitions', () => {
      const transcript = 'el perro es un animal que ladra y es una mascota';
      const words = [{ word: 'perro', keywords: ['animal', 'ladra', 'mascota'] }];
      const result = LanguageValidator.validateDefinitions(transcript, words, 1);
      expect(result.outcome).toBe('CORRECT');
      expect(result.definitionsFound).toBe(1);
    });
  });

  describe('validateNarration', () => {
    it('evaluates narration quality', () => {
      const transcript = 'habia una vez un nino que caminaba por el bosque. entonces encontro una casa. despues entro y vio a su familia.';
      const keywords = ['habia', 'bosque', 'casa', 'familia', 'entonces', 'despues'];
      const result = LanguageValidator.validateNarration(transcript, keywords, 3, 2, 10);
      expect(result.outcome).toBe('CORRECT');
      expect(result.confidence).toBeGreaterThanOrEqual(0.5);
    });
  });
});
```

#### 4.5.2 Tarea: Tests Backend

```
backend/tests/unit/
├── test_comunicacion_auto_validation.py  # Verifica catálogo actualizado
├── test_language_validator_integration.py # Verifica flujo end-to-end
└── test_child_name_in_payload.py          # Verifica que el nombre del niño llega al frontend
```

#### 4.5.3 Tarea: Optimización de Rendimiento

- Lazy loading de `LanguageValidator` (solo cuando se necesita STT)
- Cache de keywords de definiciones en `sessionStorage`
- Debounce de transcript updates en VerbalResponseGame
- Web Worker para tokenización y normalización de texto

#### 4.5.4 Tarea: Verificación Final

```bash
# Frontend
cd frontend && npm run lint && npm run build && npm run test

# Backend
cd backend && source venv/bin/activate && black --check . && flake8 && pytest
```

**Criterios de aceptación Fase 5:**
- [ ] ≥40 tests unitarios pasando
- [ ] ≥3 tests de integración backend pasando
- [ ] Bundle size de LanguageValidator < 5KB (minified)
- [ ] STT latency < 8s para clips de 30 segundos
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

## 5. Cambios en Backend

### 5.1 Actualización del Catálogo

**Archivo:** `backend/src/application/catalog/dayc2_items/comunicacion.json`

**Fase 2 (19 ítems lógica):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Fase 3 (11 ítems STT):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "SPEECH",
  "validation_threshold": 0.85,
  "validation_fallback": "SYSTEM_ASSISTED_REVIEW"
}
```

**Ítems que permanecen manuales (2):**
```json
{
  "auto_validable": false,
  "requiere_revision_psicologo": true
}
```
- COMUNICACION_049 (observacional puro)
- COMUNICACION_057 (cambio de conversación — demasiado subjetivo)

### 5.2 Ajuste en Dayc2FlowService

**Archivo:** `backend/src/application/services/dayc2_flow_service.py`

Mismo cambio que en el plan de Cognitivo:

```python
# En complete_current_item():
auto_validable = catalog_item.get("auto_validable", False)
threshold = catalog_item.get("validation_threshold", 0.75)
needs_review = (not auto_validable) or confidence < threshold
```

### 5.3 Nombre del Niño en Task Payload

**Archivo:** `backend/src/application/services/dayc2_flow_service.py`

```python
# En get_current_task_payload():
nino = evaluación.nino
if nino and nino.nombre:
    parts = nino.nombre.strip().split()
    payload["child_name"] = parts[0] if parts else ""
    payload["child_last_name"] = " ".join(parts[1:]) if len(parts) > 1 else ""
```

### 5.4 Nuevo Endpoint: Resumen de Validación por Área

**Archivo:** `backend/src/api/evaluaciones/views.py`

```python
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def area_validation_summary(request, pk):
    """Resumen de auto-validación por área."""
    evaluación = get_object_or_404(Evaluación, pk=pk)

    areas = {}
    for item in evaluación.items.all():
        area = item.area
        if area not in areas:
            areas[area] = {"auto": 0, "review": 0, "pending": 0, "total": 0}
        areas[area]["total"] += 1
        if item.estado == "AUTO_VALIDATED":
            areas[area]["auto"] += 1
        elif item.estado == "REVIEWED":
            areas[area]["review"] += 1
        else:
            areas[area]["pending"] += 1

    return Response(areas)
```

---

## 6. Cronograma Consolidado

```
Semanas  1-2   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Animaciones + Audio (compartido con Cognitivo)
Semanas  3-4   ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Mejora shared games específicos
Semanas  5-6   ░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░  Fase 2: LogicValidator en 19 ítems
Semana   7     ░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░  Fase 2: Catálogo backend
Semanas  8-9   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░  Fase 3: LanguageValidator + SpeechValidator
Semanas 10-11  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 3: Integración STT en 11 ítems
Semanas 12-13  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 3: Keywords + child name
Semanas 14-15  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Mejoras específicas
Semanas 16-17  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Más mejoras
Semanas 18-20  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████  Fase 5: Testing + optimización
```

| Fase | Semanas | Ítems auto-validables acumulados |
|------|---------|--------------------------------|
| Inicio | 0 | 0 |
| Fase 1 | 1-4 | 0 (solo visual) |
| Fase 2 | 5-7 | **19** (+19 lógica directa) |
| Fase 3 | 8-13 | **30** (+11 STT) |
| Fase 4 | 14-17 | 30 (mejoras visuales) |
| Fase 5 | 18-20 | **30** (testing) |

---

## 7. Riesgos y Mitigaciones Específicos de Comunicación

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | STT no detecta preguntas infantiles (entonación vs palabras interrogativas) | Alta | Alto | Usar keyword matching (qué, dónde, etc.) en vez de detección de entonación; threshold bajo (1 pregunta mínima) |
| 2 | Definiciones de palabras muy variadas (cada niño define distinto) | Alta | Medio | Keywords amplias (5-6 por palabra); threshold de 40% de keywords match; fallback a revisión si <60% |
| 3 | Narración de historias sin estructura clara | Media | Medio | Validación suave: solo requiere keywords + oraciones + duración mínima; no evaluar coherencia narrativa profunda |
| 4 | Nombre del niño mal transcrito por STT | Media | Alto | Fuzzy matching con Levenshtein distance ≤ 3; normalizar acentos; mostrar transcript para que el psicólogo verifique |
| 5 | Conteo de palabras inflado por muletillas ("este...", "eh...") | Media | Medio | Stop words filter extenso; excluir interjecciones y muletillas del conteo de palabras distintas |
| 6 | COMUNICACION_058 (300-1000 palabras) requiere grabación larga | Media | Medio | Permitir grabación de hasta 5 minutos; chunking para STT (30s por chunk); mostrar progreso |
| 7 | Chistes/bromas (073) son culturalmente específicas y difíciles de validar | Alta | Bajo | Threshold muy bajo (solo verificar que narró algo con estructura); casi siempre requerirá revisión manual |
| 8 | TTS en español suena robótico para niños | Media | Bajo | Usar voz de alta calidad del navegador; rate=0.85, pitch=1.1 para sonar más amigable |

---

## 8. Métricas de Éxito

| KPI | Baseline | Fase 2 | Fase 5 |
|-----|----------|--------|--------|
| % ítems Comunicación auto-validables | 0% | 59% | 94% |
| Tiempo revisión Comunicación por evaluación | ~20 min | ~12 min | ~4 min |
| Concordancia STT-psicólogo (ítems verbales) | N/A | >75% | >85% |
| Tasa de falsos positivos en definiciones | 0% | <8% | <5% |
| Engagement infantil en ítems verbales | Baseline | +15% | +30% |
| Latencia STT por ítem | N/A | <10s | <6s |

---

## 9. Dependencias del Plan de Cognitivo

Este plan **depende** de que las siguientes fases del plan de Cognitivo estén completadas primero:

| Componente Cognitivo | Fase Cognitivo | Fase Comunicación que lo usa |
|---------------------|---------------|------------------------------|
| `AutoValidationEngine` | Fase 2 | Fase 2 |
| `LogicValidator` | Fase 2 | Fase 2 |
| `whisperWorker` + `@xenova/transformers` | Fase 3 | Fase 3 |
| `SpeechValidator` (base) | Fase 3 | Fase 3 |
| `levenshtein.ts` | Fase 3 | Fase 3 |
| Framer Motion + audio + animaciones | Fase 1 | Fase 1 |

**Recomendación**: Ejecutar Fase 1 de Comunicación en paralelo con Fase 1 de Cognitivo (comparten componentes). Las Fases 2-3 de Comunicación pueden comenzar inmediatamente después de las Fases 2-3 de Cognitivo.

---

## 10. Comparativa Visual: Antes vs Después

### Ejemplo: COMUNICACION_052 (Riman)

**ANTES:**
```
┌─────────────────────────────────┐
│  🌞 sol  +  🎨 col              │
│                                 │
│  ¿Estas palabras riman?         │
│  [Riman!]  [No riman]          │
│                                 │
│  Par 1/5                        │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│     🎵  JUEGO DE RIMAS  🎵     │
│                                 │
│   ┌─────────┐   ┌─────────┐   │
│   │  🌞     │   │  🎨     │   │
│   │  SOL    │ ∿ │  COL    │   │
│   │         │   │         │   │
│   └─────────┘   └─────────┘   │
│   (burbujas flotantes con      │
│    ondas sonoras entre ellas)  │
│                                 │
│   🔊 "sol... col..." (TTS)     │
│                                 │
│   [✨ Riman! ✨]  [No riman]   │
│   (al presionar Riman:         │
│    burbujas se fusionan        │
│    con efecto de brillo)       │
│                                 │
│   ████████░░░░  Par 2/5        │
│   🎵 música de fondo suave     │
└─────────────────────────────────┘
```

### Ejemplo: COMUNICACION_062 (Define 2 palabras)

**ANTES:**
```
┌─────────────────────────────────┐
│  Define 2 palabras              │
│                                 │
│  ¿Qué es un perro?              │
│  ¿Qué es el sol?                │
│                                 │
│  [🎤 Grabar respuesta]          │
│                                 │
│  El evaluador revisara.         │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│   📖  DEFINE PALABRAS  📖      │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🐶 PERRO               │   │
│  │  ¿Qué es un perro?      │   │
│  │                         │   │
│  │  ▁▂▃▅▆▇ (ondas audio)  │   │
│  │  ⏱️ 0:12                │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ☀️ SOL                  │   │
│  │  ¿Qué es el sol?        │   │
│  │                         │   │
│  │  [Pendiente]            │   │
│  └─────────────────────────┘   │
│                                 │
│  [🎤 Grabar] [⏹️ Detener]      │
│                                 │
│  📝 Transcript: "el perro es   │
│  un animal que ladra..."       │
│  ✅ 2/2 definiciones detectadas │
│  Confianza: 0.92 → AUTO ✓     │
└─────────────────────────────────┘
```

---

## 11. Resumen Ejecutivo

Este plan transforma el área de Comunicación del DAYC-2 de un sistema donde **el 100% de los ítems requieren revisión manual** a uno donde el **94% se auto-valida**, aprovechando que:

1. **19 ítems (59%)** son de respuesta cerrada visual → validación lógica directa (Fase 2)
2. **11 ítems (34%)** son de respuesta verbal → STT + validadores lingüísticos (Fase 3)
3. **Solo 2 ítems (6%)** permanecen con revisión manual (observacional + subjetivo)

### Beneficios Clave

1. **Reduce la carga del psicólogo** de ~20 min a ~4 min en Comunicación
2. **Validación lingüística objetiva** — el STT + NLP elimina sesgo del evaluador en respuestas verbales
3. **Reutiliza infraestructura de Cognitivo** — no duplica esfuerzo
4. **Mejora el engagement** — TTS, animaciones, audio reactivo hacen los juegos más interactivos
5. **Preserva el juicio clínico** para los 2 ítems que genuinamente lo requieren

### Próximos Pasos

1. Completar Fase 2-3 de Cognitivo (prerrequisito)
2. Ejecutar Fase 1 de Comunicación en paralelo con Fase 1 de Cognitivo
3. Iterar con feedback de psicólogos sobre calidad de validación STT
4. Ajustar thresholds de LanguageValidator basado en datos reales

---

**Documento creado:** Julio 2026
**Versión:** 1.0
**Estado:** Plan de Implementación Completo
**Depende de:** `plan-implementacion-cognitivo.md` (Fases 1-3)

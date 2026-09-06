# Plan de Implementación: Mejora del Área Desarrollo Físico DAYC-2
## De Juegos Simples a Validación Automática de Motricidad Fina

> **Destino final:** `MejoraDeJuegosV2/plan-implementacion-desarrollo-fisico.md`
> **Depende de:** `plan-implementacion-cognitivo.md` (Fases 1-2, infraestructura de validación)

---

## 1. Visión General

### 1.1 Objetivo

Transformar los 11 minijuegos de Desarrollo Físico del DAYC-2 y mejorar la experiencia de los 22 ítems de observación física, habilitando auto-validación para el 100% de los ítems gamificables (motricidad fina en pantalla).

### 1.2 Estado Actual vs Objetivo

| Dimensión | Actual | Objetivo |
|-----------|--------|----------|
| Total ítems catálogo | 33 | 33 |
| Ítems gamificables (en pantalla) | 11 | 11 |
| Ítems observación física (adulto) | 22 | 22 |
| Auto-validables (gamificables) | 0/11 (0%) | **11/11 (100%)** |
| Observación con guía interactiva | 0/22 (0%) | **22/22 (100%)** |
| Shared game dominante | TracingGame (5 usos) | TracingGame mejorado |
| Validadores de canvas | 0 | 3 nuevos (Tracing, Coloring, Drawing) |

### 1.3 Diferencias Clave vs Otras Áreas

| Aspecto | Cognitivo | Comunicación | Desarrollo Físico |
|---------|-----------|-------------|-------------------|
| Énfasis | Visual-espacial, numérico | Lingüístico-verbal | **Motricidad fina + gruesa** |
| % ítems en pantalla | 100% | 100% | **33%** (11 de 33) |
| % ítems observación | 0% | 3% | **67%** (22 de 33) |
| Validación principal | Lógica + CV + OCR | STT + NLP | **Análisis de canvas (trazos)** |
| Shared game dominante | CountingGame | VerbalResponseGame | **TracingGame (45%)** |
| STT necesario | Sí (10 ítems) | Sí (11 ítems) | **No** |
| Computer Vision | Sí (cubos) | No | **Pose detection (futuro)** |
| Complejidad de validación | Media | Alta | **Media-alta (análisis geométrico)** |

### 1.4 Naturaleza Dual del Área

El área de Desarrollo Físico tiene **dos mundos completamente distintos**:

**Mundo A: Motricidad Fina en Pantalla (11 ítems, 33%)**
- El niño interactúa directamente con el dispositivo
- Actividades: trazar formas, dibujar, colorear, agarrar lápiz, colocar clips, tocar dedos
- **Todos son auto-validables** mediante análisis de canvas
- Shared games: TracingGame (5), InteractiveQA (3), ColoringGame (1), DrawingGame (1), MatchingGame (1)

**Mundo B: Motricidad Gruesa Observacional (22 ítems, 67%)**
- El adulto observa al niño y registra el resultado
- Actividades: caminar, saltar, trepar, galopar, atrapar pelota, dar volteretas
- **NO son auto-validables** por naturaleza (requieren observación humana)
- Pero se puede **mejorar drásticamente la experiencia** del adulto con guías interactivas

### 1.5 Restricciones Técnicas

- **Procesamiento 100% en cliente** — análisis de canvas en el navegador
- **Reutilización de infraestructura**: `AutoValidationEngine`, `LogicValidator` de Cognitivo
- **Sin dependencias nuevas** para los 11 ítems gamificables
- **Pose detection (MediaPipe Pose)** es una posibilidad futura para los 22 ítems observacionales, pero no está en este plan por complejidad y ROI
- **Los ítems de observación física** mantienen `requiere_revision_psicologo: true` pero mejoran su UX

---

## 2. Inventario Completo de Ítems

### 2.1 Tabla Maestra: 33 Ítems de Desarrollo Físico

#### Mundo A: Motricidad Fina en Pantalla (11 ítems gamificables)

| # | ID | Pregunta | Shared Game | Detalle | Auto-val. Propuesta |
|---|---|---|---|---|---|
| 56 | DESARROLLO_FISICO_056 | Usa una mano consistentemente | `InteractiveQA` | options-grid, 1 round (mano izq/der) | **LOGIC** ✅ |
| 59 | DESARROLLO_FISICO_059 | Imita trazos circulares, vert. y horiz. | `TracingGame` | 3 rounds (círculo, vertical, horizontal) | **TRACING** ✅ |
| 60 | DESARROLLO_FISICO_060 | Sostiene el lápiz (pinza) | `InteractiveQA` | options-grid, 1 round (pinza/puño/mano) | **LOGIC** ✅ |
| 61 | DESARROLLO_FISICO_061 | Usa movimientos vert., horiz., circ. al dibujar | `DrawingGame` | Dibujo libre sin modelo | **DRAWING** ✅ |
| 68 | DESARROLLO_FISICO_068 | Copia una cruz | `TracingGame` | 1 round (cruz) | **TRACING** ✅ |
| 72 | DESARROLLO_FISICO_072 | Copia un cuadrado | `TracingGame` | 1 round (cuadrado) | **TRACING** ✅ |
| 73 | DESARROLLO_FISICO_073 | Copia un rectángulo | `TracingGame` | 1 round (rectángulo) | **TRACING** ✅ |
| 77 | DESARROLLO_FISICO_077 | Colorea dentro de las líneas | `ColoringGame` | 2 formas (flor 3 zonas, estrella 1 zona) | **COLORING** ✅ |
| 80 | DESARROLLO_FISICO_080 | Toca rápidamente cada dedo con pulgar | `InteractiveQA` | options-grid, 1 round (sí/cuesta/no) | **LOGIC** ✅ |
| 82 | DESARROLLO_FISICO_082 | Coloca clips en el papel | `MatchingGame` | 3 clips → 3 zonas (bordes) | **LOGIC** ✅ |
| 85 | DESARROLLO_FISICO_085 | Copia figura de diamante | `TracingGame` | 1 round (diamante) | **TRACING** ✅ |

#### Mundo B: Motricidad Gruesa Observacional (22 ítems)

| # | ID | Pregunta | Tipo de Movimiento | Mejora Propuesta |
|---|---|---|---|---|
| 55 | DESARROLLO_FISICO_055 | Camina hacia atrás | Locomoción | Guía adulto + timer + checklist |
| 57 | DESARROLLO_FISICO_057 | Sube gradas alternando pies | Locomoción | Guía adulto + video asistido |
| 58 | DESARROLLO_FISICO_058 | Escala con equipo de juego | Locomoción | Guía adulto + video asistido |
| 62 | DESARROLLO_FISICO_062 | Camina balanceando brazos y piernas | Locomoción | Guía adulto + video asistido |
| 63 | DESARROLLO_FISICO_063 | Coge la pelota contra el pecho | Coordinación | Guía adulto + video asistido |
| 64 | DESARROLLO_FISICO_064 | Hace recortes con tijeras | Motricidad fina | Guía adulto + video asistido |
| 65 | DESARROLLO_FISICO_065 | Salta de un pie varios pasos | Equilibrio | Guía adulto + timer + checklist |
| 66 | DESARROLLO_FISICO_066 | Da vuelcos (voltereta) | Coordinación | Guía adulto + video asistido |
| 67 | DESARROLLO_FISICO_067 | Camina talón-dedos sin equilibrio | Equilibrio | Guía adulto + timer + checklist |
| 69 | DESARROLLO_FISICO_069 | Se balancea sobre un pie 5-10s | Equilibrio | Guía adulto + timer automático |
| 70 | DESARROLLO_FISICO_070 | Salta sobre objetos >6 pulgadas | Locomoción | Guía adulto + video asistido |
| 71 | DESARROLLO_FISICO_071 | Corta con tijeras siguiendo línea | Motricidad fina | Guía adulto + video asistido |
| 74 | DESARROLLO_FISICO_074 | Galopa guiándose con un pie | Locomoción | Guía adulto + video asistido |
| 75 | DESARROLLO_FISICO_075 | Se balancea en columpio | Coordinación | Guía adulto + video asistido |
| 76 | DESARROLLO_FISICO_076 | Da botes y coge pelota | Coordinación | Guía adulto + video asistido |
| 78 | DESARROLLO_FISICO_078 | Corta figuras geométricas | Motricidad fina | Guía adulto + video asistido |
| 79 | DESARROLLO_FISICO_079 | Brinca alternando pies | Equilibrio | Guía adulto + timer + checklist |
| 81 | DESARROLLO_FISICO_081 | Salta en un pie en línea recta | Equilibrio | Guía adulto + timer + checklist |
| 83 | DESARROLLO_FISICO_083 | Da tres vuelcos consecutivos | Coordinación | Guía adulto + video asistido |
| 84 | DESARROLLO_FISICO_084 | Engoma con cuidado | Motricidad fina | Guía adulto + video asistido |
| 86 | DESARROLLO_FISICO_086 | Deja caer pelota y la patea | Coordinación | Guía adulto + video asistido |
| 87 | DESARROLLO_FISICO_087 | Salta a la soga solo | Coordinación | Guía adulto + video asistido |

### 2.2 Resumen por Tipo de Validación

| Tipo | Ítems | Cantidad | % |
|------|-------|----------|---|
| **LOGIC** (respuesta cerrada) | 056, 060, 080, 082 | 4 | 12% |
| **TRACING** (análisis de trazos) | 059, 068, 072, 073, 085 | 5 | 15% |
| **DRAWING** (análisis de dibujo libre) | 061 | 1 | 3% |
| **COLORING** (análisis de coloreo) | 077 | 1 | 3% |
| **OBSERVACIÓN** (adulto registra) | 055, 057, 058, 062-067, 069-071, 074-076, 078-079, 081, 083-084, 086-087 | 22 | 67% |
| **Total auto-validables (gamificables)** | | **11/11** | **100%** |

### 2.3 Shared Games Usados

| Shared Game | Ítems Desarrollo Físico | Usos |
|-------------|------------------------|------|
| `TracingGame` | 059, 068, 072, 073, 085 | **5** |
| `InteractiveQA` | 056, 060, 080 | **3** |
| `ColoringGame` | 077 | **1** |
| `DrawingGame` | 061 | **1** |
| `MatchingGame` | 082 | **1** |

---

## 3. Arquitectura de Validación para Desarrollo Físico

### 3.1 Reutilización de Infraestructura

| Componente | Origen | Uso en Desarrollo Físico |
|-----------|--------|--------------------------|
| `AutoValidationEngine` | Cognitivo Fase 2 | Motor central de decisiones |
| `LogicValidator` | Cognitivo Fase 2 | 4 ítems de respuesta cerrada (056, 060, 080, 082) |
| `DrawingCanvas` + `useDrawingCanvas` | Ya existente | Base para TracingValidator y DrawingValidator |

### 3.2 Nuevos Validadores de Canvas (específicos de Desarrollo Físico)

**Ubicación:** `frontend/src/components/validation/validators/`

```
validators/
├── LogicValidator.ts          # (de Cognitivo) → 4 ítems
├── TracingValidator.ts        # NUEVO → 5 ítems de trazado
├── ColoringValidator.ts       # NUEVO → 1 ítem de coloreo
├── DrawingAnalysisValidator.ts # NUEVO → 1 ítem de dibujo libre
└── ...
```

### 3.3 Nuevo Módulo: `TracingValidator`

**Archivo:** `frontend/src/components/validation/validators/TracingValidator.ts`

Este es el validador más importante del área — analiza si el trazo del niño sigue aproximadamente la forma modelo.

```typescript
interface TracingAnalysisResult {
  outcome: 'CORRECT' | 'ERROR';
  confidence: number;
  details: {
    shapeType: string;
    strokeCount: number;
    coverageScore: number;
    deviationScore: number;
    hasRequiredFeatures: boolean;
  };
}

interface ShapeModel {
  type: 'cross' | 'square' | 'rectangle' | 'diamond' | 'circle' | 'vertical' | 'horizontal';
  requiredFeatures: FeatureCheck[];
}

interface FeatureCheck {
  name: string;
  check: (strokes: StrokeData[], canvasWidth: number, canvasHeight: number) => boolean;
}

interface StrokeData {
  points: { x: number; y: number }[];
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number };
  length: number;
}

function analyzeStrokes(canvas: HTMLCanvasElement): StrokeData[] {
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Detectar puntos dibujados (no blancos)
  const drawnPoints: { x: number; y: number }[] = [];
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2], a = pixels[idx + 3];
      if (a > 50 && (r < 200 || g < 200 || b < 200)) {
        drawnPoints.push({ x, y });
      }
    }
  }

  if (drawnPoints.length < 10) return [];

  // Agrupar puntos en strokes por proximidad
  const strokes: StrokeData[] = [];
  let currentStroke: { x: number; y: number }[] = [drawnPoints[0]];

  for (let i = 1; i < drawnPoints.length; i++) {
    const prev = drawnPoints[i - 1];
    const curr = drawnPoints[i];
    const dist = Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2);

    if (dist > 50) {
      if (currentStroke.length > 5) {
        strokes.push(buildStrokeData(currentStroke));
      }
      currentStroke = [curr];
    } else {
      currentStroke.push(curr);
    }
  }
  if (currentStroke.length > 5) {
    strokes.push(buildStrokeData(currentStroke));
  }

  return strokes;
}

function buildStrokeData(points: { x: number; y: number }[]): StrokeData {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.sqrt((points[i].x - points[i - 1].x) ** 2 + (points[i].y - points[i - 1].y) ** 2);
  }
  return {
    points,
    boundingBox: {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
    },
    length,
  };
}

function isVerticalLine(stroke: StrokeData, canvasHeight: number): boolean {
  const height = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  const width = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  return height > canvasHeight * 0.15 && height > width * 2;
}

function isHorizontalLine(stroke: StrokeData, canvasWidth: number): boolean {
  const width = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  const height = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  return width > canvasWidth * 0.15 && width > height * 2;
}

function isClosedShape(stroke: StrokeData): boolean {
  if (stroke.points.length < 10) return false;
  const first = stroke.points[0];
  const last = stroke.points[stroke.points.length - 1];
  const dist = Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
  return dist < stroke.length * 0.15;
}

function isRoughlySquare(stroke: StrokeData): boolean {
  const w = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  const h = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  if (w < 30 || h < 30) return false;
  const ratio = w / h;
  return ratio > 0.6 && ratio < 1.6 && isClosedShape(stroke);
}

function isRoughlyRectangle(stroke: StrokeData): boolean {
  const w = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  const h = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  if (w < 30 || h < 30) return false;
  const ratio = w / h;
  return (ratio > 1.4 || ratio < 0.7) && isClosedShape(stroke);
}

function isRoughlyDiamond(stroke: StrokeData): boolean {
  if (!isClosedShape(stroke)) return false;
  const w = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  const h = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  if (w < 30 || h < 30) return false;
  const ratio = w / h;
  return ratio > 0.6 && ratio < 1.6;
}

function isRoughlyCircle(stroke: StrokeData): boolean {
  if (!isClosedShape(stroke)) return false;
  const w = stroke.boundingBox.maxX - stroke.boundingBox.minX;
  const h = stroke.boundingBox.maxY - stroke.boundingBox.minY;
  if (w < 20 || h < 20) return false;
  const ratio = w / h;
  return ratio > 0.5 && ratio < 2.0;
}

const SHAPE_MODELS: Record<string, ShapeModel> = {
  cross: {
    type: 'cross',
    requiredFeatures: [
      { name: 'verticalLine', check: (strokes, _w, h) => strokes.some((s) => isVerticalLine(s, h)) },
      { name: 'horizontalLine', check: (strokes, w, _h) => strokes.some((s) => isHorizontalLine(s, w)) },
    ],
  },
  square: {
    type: 'square',
    requiredFeatures: [
      { name: 'closedSquare', check: (strokes) => strokes.some((s) => isRoughlySquare(s)) },
    ],
  },
  rectangle: {
    type: 'rectangle',
    requiredFeatures: [
      { name: 'closedRectangle', check: (strokes) => strokes.some((s) => isRoughlyRectangle(s)) },
    ],
  },
  diamond: {
    type: 'diamond',
    requiredFeatures: [
      { name: 'closedDiamond', check: (strokes) => strokes.some((s) => isRoughlyDiamond(s)) },
    ],
  },
  circle: {
    type: 'circle',
    requiredFeatures: [
      { name: 'closedCircle', check: (strokes) => strokes.some((s) => isRoughlyCircle(s)) },
    ],
  },
  vertical: {
    type: 'vertical',
    requiredFeatures: [
      { name: 'verticalLine', check: (strokes, _w, h) => strokes.some((s) => isVerticalLine(s, h)) },
    ],
  },
  horizontal: {
    type: 'horizontal',
    requiredFeatures: [
      { name: 'horizontalLine', check: (strokes, w, _h) => strokes.some((s) => isHorizontalLine(s, w)) },
    ],
  },
};

export const TracingValidator = {
  validateTracing(
    canvas: HTMLCanvasElement,
    shapeType: string
  ): TracingAnalysisResult {
    const strokes = analyzeStrokes(canvas);
    const model = SHAPE_MODELS[shapeType];

    if (!model) {
      return {
        outcome: 'ERROR',
        confidence: 0,
        details: { shapeType, strokeCount: strokes.length, coverageScore: 0, deviationScore: 0, hasRequiredFeatures: false },
      };
    }

    const featuresPassed = model.requiredFeatures.filter((f) =>
      f.check(strokes, canvas.width, canvas.height)
    );
    const featureScore = featuresPassed.length / model.requiredFeatures.length;

    const hasMinimumStrokes = strokes.length >= 1;
    const hasMinimumCoverage = strokes.some((s) => s.length > 30);

    const confidence = featureScore * 0.7 + (hasMinimumStrokes ? 0.15 : 0) + (hasMinimumCoverage ? 0.15 : 0);

    return {
      outcome: confidence >= 0.6 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        shapeType,
        strokeCount: strokes.length,
        coverageScore: hasMinimumCoverage ? 1 : 0,
        deviationScore: featureScore,
        hasRequiredFeatures: featureScore >= 0.8,
      },
    };
  },

  validateMultipleTracings(
    canvasResults: { canvas: HTMLCanvasElement; shapeType: string }[]
  ): { outcome: 'CORRECT' | 'ERROR'; confidence: number; details: TracingAnalysisResult[] } {
    const results = canvasResults.map((r) => this.validateTracing(r.canvas, r.shapeType));
    const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length;
    const allPassed = results.every((r) => r.outcome === 'CORRECT');

    return {
      outcome: allPassed ? 'CORRECT' : 'ERROR',
      confidence: avgConfidence,
      details: results,
    };
  },
};
```

### 3.4 Nuevo Módulo: `ColoringValidator`

**Archivo:** `frontend/src/components/validation/validators/ColoringValidator.ts`

```typescript
interface ColoringAnalysisResult {
  outcome: 'CORRECT' | 'ERROR';
  confidence: number;
  details: {
    totalZones: number;
    coloredZones: number;
    zonesWithColorInside: number;
    zonesWithColorOutside: number;
    coveragePercentage: number;
  };
}

export const ColoringValidator = {
  validateColoring(
    svgElement: SVGSVGElement,
    totalZones: number
  ): ColoringAnalysisResult {
    const zones = svgElement.querySelectorAll('[data-coloring-zone]');
    let coloredZones = 0;
    let zonesInside = 0;
    let zonesOutside = 0;

    zones.forEach((zone) => {
      const fill = zone.getAttribute('fill');
      if (fill && fill !== 'none' && fill !== '#ffffff' && fill !== 'white') {
        coloredZones++;
        zonesInside++;
      }
    });

    const coveragePercentage = totalZones > 0 ? coloredZones / totalZones : 0;
    const confidence = coveragePercentage * 0.8 + (coloredZones > 0 ? 0.2 : 0);

    return {
      outcome: coveragePercentage >= 0.5 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        totalZones,
        coloredZones,
        zonesWithColorInside: zonesInside,
        zonesWithColorOutside: zonesOutside,
        coveragePercentage,
      },
    };
  },
};
```

### 3.5 Nuevo Módulo: `DrawingAnalysisValidator`

**Archivo:** `frontend/src/components/validation/validators/DrawingAnalysisValidator.ts`

Para DESARROLLO_FISICO_061 — detectar si el dibujo libre contiene movimientos verticales, horizontales y circulares.

```typescript
interface DrawingAnalysisResult {
  outcome: 'CORRECT' | 'ERROR';
  confidence: number;
  details: {
    hasVerticalStrokes: boolean;
    hasHorizontalStrokes: boolean;
    hasCircularStrokes: boolean;
    totalStrokes: number;
    movementTypesFound: number;
  };
}

export const DrawingAnalysisValidator = {
  validateDrawingMovements(
    canvas: HTMLCanvasElement
  ): DrawingAnalysisResult {
    const strokes = analyzeStrokes(canvas);

    const hasVertical = strokes.some((s) => isVerticalLine(s, canvas.height));
    const hasHorizontal = strokes.some((s) => isHorizontalLine(s, canvas.width));
    const hasCircular = strokes.some((s) => isClosedShape(s) && isRoughlyCircle(s));

    const movementTypesFound = [hasVertical, hasHorizontal, hasCircular].filter(Boolean).length;
    const confidence = movementTypesFound / 3;

    return {
      outcome: movementTypesFound >= 2 ? 'CORRECT' : 'ERROR',
      confidence,
      details: {
        hasVerticalStrokes: hasVertical,
        hasHorizontalStrokes: hasHorizontal,
        hasCircularStrokes: hasCircular,
        totalStrokes: strokes.length,
        movementTypesFound,
      },
    };
  },
};
```

### 3.6 Flujo de Validación para Desarrollo Físico

```
Minijuego de Desarrollo Físico termina
    │
    ▼
┌─ ¿Es respuesta cerrada (InteractiveQA/MatchingGame)? ─┐
│  SÍ → LogicValidator (de Cognitivo)                    │
│       confidence = correct ? 1.0 : 0.0                 │
│       → 4 ítems (056, 060, 080, 082)                  │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es trazado de forma (TracingGame)? ─────────────────┐
│  SÍ → TracingValidator.validateTracing(canvas, shape)  │
│       Analiza: líneas vert/horiz, formas cerradas,     │
│       proporciones, features requeridas                │
│       confidence = featureScore × 0.7 + coverage       │
│       → 5 ítems (059, 068, 072, 073, 085)            │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es dibujo libre (DrawingGame)? ─────────────────────┐
│  SÍ → DrawingAnalysisValidator                         │
│       .validateDrawingMovements(canvas)                │
│       Detecta: verticales + horizontales + circulares  │
│       confidence = movementTypesFound / 3              │
│       → 1 ítem (061)                                   │
└────────────────────────────────────────────────────────┘
    │
    ▼
┌─ ¿Es coloreo (ColoringGame)? ─────────────────────────┐
│  SÍ → ColoringValidator.validateColoring(svg, zones)   │
│       Analiza: zonas coloreadas / zonas totales        │
│       confidence = coveragePercentage                  │
│       → 1 ítem (077)                                   │
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

**Objetivo**: Transformar la experiencia visual de los minijuegos de Desarrollo Físico.

> **Nota**: Se solapa con Fase 1 de Cognitivo y Comunicación. Los componentes de animación, audio y feedback se comparten.

#### 4.1.1 Tarea: Mejorar `TracingGame` (5 ítems — el más importante)

**Archivo:** `frontend/src/minijuegos/shared/TracingGame.tsx`

**Cambios:**
- El modelo de referencia se dibuja con animación de "trazo fantasma" que muestra cómo trazar
- Guía paso a paso: "Primero la línea vertical, luego la horizontal"
- El trazo del niño se muestra con color distinto al modelo
- Feedback en tiempo real: el trazo se pone verde cuando está cerca del modelo, rojo cuando se aleja
- Animación de "sello de aprobación" al completar cada forma
- Sonido de "lápiz sobre papel" mientras dibuja
- El modelo parpadea suavemente como referencia

```typescript
// Ejemplo: trazo fantasma animado
const GhostTraceAnimation = ({ shapeType }: { shapeType: string }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = 'stroke-dashoffset 3s ease-in-out';
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = '0';
    });
  }, [shapeType]);

  return (
    <svg className="ghost-trace" viewBox="0 0 400 400">
      <path ref={pathRef} d={getShapePath(shapeType)} fill="none" stroke="#93c5fd" strokeWidth="3" strokeDasharray="8 4" opacity="0.6" />
    </svg>
  );
};
```

#### 4.1.2 Tarea: Mejorar `ColoringGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/ColoringGame.tsx`

**Cambios:**
- Paleta de colores con animación de selección (bounce + glow)
- Efecto de "pintura llenando" la zona (fill animation)
- Feedback cuando se sale de las líneas (zona parpadea en rojo brevemente)
- Sonido de "pincel" al colorear
- Las zonas se iluminan suavemente al pasar el cursor
- Progreso visual: "2/4 zonas coloreadas"

#### 4.1.3 Tarea: Mejorar `DrawingGame` (1 ítem)

**Archivo:** `frontend/src/minijuegos/shared/DrawingGame.tsx`

**Cambios:**
- Herramientas de dibujo: lápiz, crayón, marcador (diferentes grosores y texturas)
- Colores seleccionables
- Undo/redo
- Animación de "partículas de color" al dibujar
- Sonido de lápiz sobre papel
- Guía visual sutil: "Intenta hacer líneas verticales, horizontales y círculos"

#### 4.1.4 Tarea: Mejorar `InteractiveQA` y `MatchingGame`

Ya planeados en Comunicación y Cognitivo respectivamente. Se reutilizan las mejoras.

#### 4.1.5 Tarea: Mejorar los ítems de Observación Física (22 ítems)

**Nuevo componente:** `frontend/src/components/child/ObservationGuide.tsx`

Este componente mejora la experiencia del adulto cuando el ítem requiere observación física:

```typescript
interface ObservationGuideProps {
  itemQuestion: string;
  instructions: string;
  checklistItems?: string[];
  timerSeconds?: number;
  onResult: (result: 'CORRECT' | 'ERROR', notes?: string) => void;
}

export function ObservationGuide({ itemQuestion, instructions, checklistItems, timerSeconds, onResult }: ObservationGuideProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timerSeconds ?? 0);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  return (
    <div className="observation-guide">
      <div className="observation-header">
        <h2>{itemQuestion}</h2>
        <p className="observation-instructions">{instructions}</p>
      </div>

      {checklistItems && (
        <div className="observation-checklist">
          <h3>Lista de verificación:</h3>
          {checklistItems.map((item, i) => (
            <label key={i} className="checklist-item">
              <input type="checkbox" checked={checkedItems.has(i)} onChange={() => toggleCheck(i)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}

      {timerSeconds && (
        <div className="observation-timer">
          <button onClick={() => setTimerActive(!timerActive)}>
            {timerActive ? '⏸️ Pausar' : '▶️ Iniciar timer'}
          </button>
          <span className="timer-display">{formatTime(timeRemaining)}</span>
        </div>
      )}

      <div className="observation-actions">
        <button className="btn-success" onClick={() => onResult('CORRECT')}>✅ Lo logró</button>
        <button className="btn-error" onClick={() => onResult('ERROR')}>❌ No lo logró</button>
      </div>
    </div>
  );
}
```

**Checklists por tipo de movimiento:**

| Tipo de Movimiento | Ítems | Checklist |
|-------------------|-------|-----------|
| **Equilibrio** | 065, 067, 069, 079, 081 | "Mantiene equilibrio", "No se cae", "Completa la acción" |
| **Locomoción** | 055, 057, 058, 062, 070, 074 | "Movimiento coordinado", "Alterna correctamente", "Sin perder equilibrio" |
| **Coordinación** | 063, 066, 075, 076, 083, 086, 087 | "Atrapa/bota correctamente", "Movimiento fluido", "Completa la secuencia" |
| **Motricidad fina física** | 064, 071, 078, 084 | "Usa tijeras correctamente", "Sigue la línea", "Engoma con precisión" |

**Timers automáticos:**

| Ítem | Timer | Descripción |
|------|-------|-------------|
| 069 | 10 segundos | "Se balancea sobre un pie durante 5-10 segundos" |
| 065 | 15 segundos | "Salta de un pie varios pasos" |
| 067 | 20 segundos | "Camina talón-dedos sin perder equilibrio" |
| 079 | 15 segundos | "Brinca alternando los pies" |
| 081 | 15 segundos | "Salta en un pie en línea recta" |

**Criterios de aceptación Fase 1:**
- [ ] TracingGame tiene trazo fantasma animado y feedback de color
- [ ] ColoringGame tiene paleta animada y efecto de llenado
- [ ] DrawingGame tiene herramientas de dibujo y colores
- [ ] ObservationGuide creado con checklist + timer
- [ ] Los 22 ítems observacionales tienen guía interactiva
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 2: Validación Lógica Directa (Semanas 5-6)

**Objetivo**: Habilitar auto-validación para los 4 ítems de respuesta cerrada.

#### 4.2.1 Tarea: Habilitar Auto-Validación en InteractiveQA y MatchingGame

**Ítems afectados:**

| Ítem | Shared Game | Cambio |
|------|-------------|--------|
| **056** | `InteractiveQA` | Mano dominante → respuesta cerrada → auto-validar |
| **060** | `InteractiveQA` | Agarre de lápiz → respuesta cerrada → auto-validar |
| **080** | `InteractiveQA` | Dedos con pulgar → respuesta cerrada → auto-validar |
| **082** | `MatchingGame` | Colocar clips → drag correcto → auto-validar |

**Patrón de cambio:** Idéntico al de Cognitivo y Comunicación — cambiar `validation` field a `'auto'` cuando confidence ≥ 0.85.

#### 4.2.2 Tarea: Actualizar Catálogo Backend

**Archivo:** `backend/src/application/catalog/dayc2_items/desarrollo_fisico.json`

Para los 4 ítems de lógica directa:

```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Criterios de aceptación Fase 2:**
- [ ] 4 ítems auto-validables por lógica (056, 060, 080, 082)
- [ ] El backend marca estos como `AUTO_VALIDATED`
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 3: Validación de Canvas — Trazos, Dibujo y Coloreo (Semanas 7-11)

**Objetivo**: Habilitar auto-validación para los 7 ítems de motricidad fina en canvas.

#### 4.3.1 Tarea: Crear `TracingValidator`

**Archivo:** `frontend/src/components/validation/validators/TracingValidator.ts`

(Código completo mostrado en sección 3.3 arriba)

#### 4.3.2 Tarea: Crear `ColoringValidator`

**Archivo:** `frontend/src/components/validation/validators/ColoringValidator.ts`

(Código completo mostrado en sección 3.4 arriba)

#### 4.3.3 Tarea: Crear `DrawingAnalysisValidator`

**Archivo:** `frontend/src/components/validation/validators/DrawingAnalysisValidator.ts`

(Código completo mostrado en sección 3.5 arriba)

#### 4.3.4 Tarea: Integrar validadores en TracingGame

**Archivo:** `frontend/src/minijuegos/shared/TracingGame.tsx`

**Cambios:**
1. Al completar cada trazo, ejecutar `TracingValidator.validateTracing(canvas, shapeType)`
2. Mostrar resultado de validación en tiempo real (feedback visual)
3. Al finalizar todos los rounds, calcular confidence promedio
4. Auto-submit si confidence ≥ 0.85

```typescript
// En TracingGame, al completar cada trazo:
const finishTracing = async () => {
  const canvas = drawing.canvasRef.current;
  if (!canvas) return;

  const result = TracingValidator.validateTracing(canvas, currentRound.shapeType);

  evidence.recordEvent(`${activityId}_TRACING_ANALYZED`, {
    shapeType: currentRound.shapeType,
    confidence: result.confidence,
    ...result.details,
  });

  if (step + 1 < rounds.length) {
    setStep(step + 1);
  } else {
    const allResults = [...roundResults, result];
    const avgConfidence = allResults.reduce((s, r) => s + r.confidence, 0) / allResults.length;
    const allCorrect = allResults.every((r) => r.outcome === 'CORRECT');
    const autoValidated = avgConfidence >= 0.85;

    answerOnce(allCorrect ? 'CORRECT' : 'ERROR', {
      detalle: JSON.stringify({
        validation: autoValidated ? 'auto' : 'requires_adult_or_psychologist_review',
        confidence: avgConfidence,
        autoValidated,
        roundResults: allResults,
      }),
    });
  }
};
```

#### 4.3.5 Tarea: Integrar validadores en ColoringGame

**Archivo:** `frontend/src/minijuegos/shared/ColoringGame.tsx`

```typescript
// Al completar el coloreo:
const finishColoring = () => {
  const svg = svgRef.current;
  if (!svg) return;

  const result = ColoringValidator.validateColoring(svg, totalZones);
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

#### 4.3.6 Tarea: Integrar validadores en DrawingGame (para DESARROLLO_FISICO_061)

**Archivo:** `frontend/src/minijuegos/shared/DrawingGame.tsx`

```typescript
// Añadir prop opcional para análisis de movimientos
interface DrawingGameProps {
  // ... props existentes ...
  analyzeMovements?: boolean;
}

// Al finalizar, si analyzeMovements es true:
const finish = async () => {
  const canvas = drawing.canvasRef.current;

  if (analyzeMovements && canvas) {
    const result = DrawingAnalysisValidator.validateDrawingMovements(canvas);
    const autoValidated = result.confidence >= 0.85;

    answerOnce(result.outcome, {
      detalle: JSON.stringify({
        validation: autoValidated ? 'auto' : 'requires_adult_or_psychologist_review',
        confidence: result.confidence,
        autoValidated,
        ...result.details,
      }),
    });
  } else {
    // Comportamiento existente (NOT_APPLICABLE)
    answerOnce('NOT_APPLICABLE', { ... });
  }
};
```

**Configuración en DESARROLLO_FISICO_061:**

```typescript
// DESARROLLO_FISICO_061/index.tsx
export default function DESARROLLO_FISICO_061({ currentItem, onAnswer }: Props) {
  return (
    <DrawingGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={DESARROLLO_FISICO_061_CONFIG.id}
      title="Dibuja líneas"
      instruction="Usa movimientos verticales, horizontales y circulares al dibujar."
      consigna="Dibuja líneas en el canvas"
      mostrarModelo={false}
      analyzeMovements  // NUEVO: habilita análisis de movimientos
    />
  );
}
```

#### 4.3.7 Tarea: Actualizar Catálogo Backend

**Archivo:** `backend/src/application/catalog/dayc2_items/desarrollo_fisico.json`

Para los 7 ítems de canvas:

```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "TRACING",
  "validation_threshold": 0.85
}
```

**Ítems a actualizar:** 059, 061, 068, 072, 073, 077, 085

**Criterios de aceptación Fase 3:**
- [ ] `TracingValidator` creado con análisis de 7 tipos de forma
- [ ] `ColoringValidator` creado con análisis de zonas coloreadas
- [ ] `DrawingAnalysisValidator` creado con detección de 3 tipos de movimiento
- [ ] TracingGame integrado con TracingValidator
- [ ] ColoringGame integrado con ColoringValidator
- [ ] DrawingGame soporta `analyzeMovements` prop
- [ ] 7 ítems de canvas auto-validables
- [ ] Total acumulado: 11/11 ítems gamificables auto-validables
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

### FASE 4: Mejoras Específicas por Ítem (Semanas 12-15)

**Objetivo**: Enriquecer la experiencia de juego y la guía de observación.

#### 4.4.1 Tarea: TracingGame — Progresión de Dificultad

**Mejora:** Los 5 ítems de trazado deben tener una progresión visual clara:

| Ítem | Forma | Dificultad | Mejora Visual |
|------|-------|-----------|---------------|
| 059 | Círculo + Vertical + Horizontal | Fácil | Guía animada paso a paso, trazo fantasma grueso |
| 068 | Cruz | Media | Modelo con líneas punteadas, trazo fantasma más fino |
| 072 | Cuadrado | Media-Alta | Modelo con esquinas marcadas, sin trazo fantasma |
| 073 | Rectángulo | Alta | Modelo sin guía de trazo, solo forma final |
| 085 | Diamante | Más alta | Modelo con ángulos marcados, sin guía |

#### 4.4.2 Tarea: ColoringGame — Más Formas y Colores

**Mejora para DESARROLLO_FISICO_077:**
- Añadir más formas: mariposa (4 zonas), casa (5 zonas), pez (3 zonas)
- Paleta de 10 colores en vez de 6
- Herramienta de "borrador" para corregir
- Modo "rellenar" (click en zona = se llena completa) vs "pincel" (pintar manualmente)
- Animación de la forma "cobrando vida" al completar el coloreo

#### 4.4.3 Tarea: ObservationGuide — Guías Detalladas por Ítem

**Archivo:** `frontend/src/minijuegos/desarrollo_fisico/data/observationGuides.ts`

```typescript
export const OBSERVATION_GUIDES: Record<string, ObservationGuideConfig> = {
  DESARROLLO_FISICO_055: {
    question: 'Camina hacia atrás',
    instructions: 'Pida al niño que camine hacia atrás unos 5 pasos. Observe si lo hace sin perder el equilibrio.',
    checklist: [
      'Camina hacia atrás sin ayuda',
      'Mantiene el equilibrio',
      'Da al menos 3-5 pasos',
      'No se voltea para mirar',
    ],
    timerSeconds: 15,
    tips: 'Puede motivar al niño diciendo "Vamos a caminar como un cangrejo".',
  },
  DESARROLLO_FISICO_069: {
    question: 'Se balancea sobre un pie durante 5-10 segundos',
    instructions: 'Pida al niño que se pare en un solo pie. Use el timer para medir cuánto tiempo mantiene el equilibrio.',
    checklist: [
      'Levanta un pie del suelo',
      'Mantiene el equilibrio sin apoyo',
      'Dura al menos 5 segundos',
      'No se tambalea excesivamente',
    ],
    timerSeconds: 10,
    tips: 'Puede decir "A ver cuánto aguantas como un flamenco".',
  },
  // ... guías para los otros 20 ítems observacionales
};
```

#### 4.4.4 Tarea: Observación Física con Video Asistido

**Mejora:** Para los ítems que requieren video, mejorar la experiencia de grabación:

- Botón grande de "Grabar video" con countdown 3-2-1
- Timer visible durante la grabación
- Botón de "Detener y revisar" para que el adulto vea el video antes de enviarlo
- Checklist interactiva que el adulto marca mientras observa
- Campo de notas rápidas para observaciones cualitativas

#### 4.4.5 Tarea: MatchingGame para Clips (082)

**Mejora visual:**
- Los clips tienen animación de "resorte" al arrastrarlos
- Los bordes del papel brillan cuando un clip se acerca
- Sonido de "click" metálico al colocar un clip
- El papel se "dobla" ligeramente donde se coloca el clip
- Celebración con confeti al colocar los 3 clips

**Criterios de aceptación Fase 4:**
- [ ] TracingGame tiene progresión de dificultad visual
- [ ] ColoringGame tiene más formas y herramienta borrador
- [ ] ObservationGuide tiene guías detalladas para los 22 ítems
- [ ] Video asistido mejorado para ítems observacionales
- [ ] MatchingGame de clips tiene animaciones de resorte
- [ ] `npm run lint` y `npm run build` pasan

---

### FASE 5: Testing y Optimización (Semanas 16-18)

**Objetivo**: Asegurar calidad y rendimiento.

#### 4.5.1 Tarea: Tests Unitarios

**Archivos a crear:**

```
frontend/tests/unit/validation/
├── TracingValidator.test.ts       # 7 formas × 3 casos = 21 tests
├── ColoringValidator.test.ts      # 3 casos
├── DrawingAnalysisValidator.test.ts # 4 casos
└── ...

frontend/tests/unit/minijuegos/desarrollo_fisico/
├── TracingGame.test.tsx           # Auto-validación de trazos
├── ColoringGame.test.tsx          # Auto-validación de coloreo
├── DrawingGame.movements.test.tsx # Análisis de movimientos
└── ObservationGuide.test.tsx      # Guía de observación
```

**Ejemplo de test para TracingValidator:**

```typescript
import { describe, it, expect } from 'vitest';
import { TracingValidator } from '@/components/validation/validators/TracingValidator';

function createMockCanvas(drawFn: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 400, 400);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  drawFn(ctx);
  return canvas;
}

describe('TracingValidator', () => {
  describe('validateTracing - cross', () => {
    it('returns CORRECT for a well-drawn cross', () => {
      const canvas = createMockCanvas((ctx) => {
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(200, 350);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(350, 200);
        ctx.stroke();
      });
      const result = TracingValidator.validateTracing(canvas, 'cross');
      expect(result.outcome).toBe('CORRECT');
      expect(result.confidence).toBeGreaterThanOrEqual(0.6);
    });

    it('returns ERROR for empty canvas', () => {
      const canvas = createMockCanvas(() => {});
      const result = TracingValidator.validateTracing(canvas, 'cross');
      expect(result.outcome).toBe('ERROR');
      expect(result.confidence).toBe(0);
    });
  });

  describe('validateTracing - square', () => {
    it('returns CORRECT for a closed square-like shape', () => {
      const canvas = createMockCanvas((ctx) => {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(300, 100);
        ctx.lineTo(300, 300);
        ctx.lineTo(100, 300);
        ctx.lineTo(100, 100);
        ctx.stroke();
      });
      const result = TracingValidator.validateTracing(canvas, 'square');
      expect(result.outcome).toBe('CORRECT');
      expect(result.details.hasRequiredFeatures).toBe(true);
    });
  });

  describe('validateTracing - circle', () => {
    it('returns CORRECT for a closed circular shape', () => {
      const canvas = createMockCanvas((ctx) => {
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2);
        ctx.stroke();
      });
      const result = TracingValidator.validateTracing(canvas, 'circle');
      expect(result.outcome).toBe('CORRECT');
    });
  });
});
```

#### 4.5.2 Tarea: Tests Backend

```
backend/tests/unit/
├── test_desarrollo_fisico_auto_validation.py  # Verifica catálogo actualizado
└── test_observation_guide_data.py             # Verifica datos de guías
```

#### 4.5.3 Tarea: Optimización de Rendimiento

- `TracingValidator.analyzeStrokes()` usa `getImageData` — optimizar con `OffscreenCanvas` en WebWorker si el canvas es grande
- Cache de resultados de validación por round (no re-analizar si no cambió el canvas)
- Lazy loading de validadores (solo cuando se necesita)
- `ColoringValidator` es muy ligero — no necesita optimización

#### 4.5.4 Tarea: Verificación Final

```bash
# Frontend
cd frontend && npm run lint && npm run build && npm run test

# Backend
cd backend && source venv/bin/activate && black --check . && flake8 && pytest
```

**Criterios de aceptación Fase 5:**
- [ ] ≥28 tests unitarios pasando
- [ ] ≥2 tests de integración backend pasando
- [ ] Bundle size de validadores de canvas < 8KB (minified)
- [ ] Análisis de canvas < 200ms por forma
- [ ] `npm run lint`, `npm run build`, `pytest` pasan

---

## 5. Cambios en Backend

### 5.1 Actualización del Catálogo

**Archivo:** `backend/src/application/catalog/dayc2_items/desarrollo_fisico.json`

**Fase 2 (4 ítems lógica):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "LOGIC",
  "validation_threshold": 0.85
}
```

**Fase 3 (7 ítems canvas):**
```json
{
  "auto_validable": true,
  "requiere_revision_psicologo": false,
  "validation_engine": "TRACING",
  "validation_threshold": 0.85,
  "validation_fallback": "SYSTEM_ASSISTED_REVIEW"
}
```

**Ítems de observación física (22) — permanecen manuales:**
```json
{
  "auto_validable": false,
  "requiere_revision_psicologo": true
}
```

### 5.2 Ajuste en Dayc2FlowService

Mismo cambio que en Cognitivo y Comunicación:

```python
auto_validable = catalog_item.get("auto_validable", False)
threshold = catalog_item.get("validation_threshold", 0.75)
needs_review = (not auto_validable) or confidence < threshold
```

---

## 6. Cronograma Consolidado

```
Semanas  1-2   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Animaciones + Audio (compartido)
Semanas  3-4   ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fase 1: Mejora TracingGame + ColoringGame + ObservationGuide
Semanas  5-6   ░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░  Fase 2: LogicValidator en 4 ítems
Semanas  7-8   ░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░  Fase 3: TracingValidator + ColoringValidator
Semanas  9-10  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░  Fase 3: DrawingAnalysisValidator + integración
Semana  11     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████  Fase 3: Catálogo backend
Semanas 12-13  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Mejoras específicas
Semanas 14-15  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████  Fase 4: Guías observacionales
Semanas 16-18  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████  Fase 5: Testing + optimización
```

| Fase | Semanas | Ítems auto-validables acumulados |
|------|---------|--------------------------------|
| Inicio | 0 | 0 |
| Fase 1 | 1-4 | 0 (solo visual + ObservationGuide) |
| Fase 2 | 5-6 | **4** (+4 lógica directa) |
| Fase 3 | 7-11 | **11** (+7 canvas validators) |
| Fase 4 | 12-15 | 11 (mejoras visuales) |
| Fase 5 | 16-18 | **11** (testing) |

---

## 7. Riesgos y Mitigaciones Específicos de Desarrollo Físico

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | TracingValidator no reconoce trazos infantiles imprecisos | Alta | Alto | Threshold bajo (0.6 para CORRECT); análisis geométrico tolerante (ratios amplios); fallback a revisión si confidence < 0.6 |
| 2 | ColoringValidator no detecta "dentro de las líneas" | Media | Medio | Simplificar a "zonas coloreadas" sin análisis de bordes; el psicólogo revisa la precisión del coloreo |
| 3 | DrawingAnalysisValidator confunde garabatos con líneas | Alta | Medio | Análisis de bounding box ratio (vertical = alto>ancho×2); no intentar reconocer la calidad del trazo, solo la dirección |
| 4 | Los 22 ítems observacionales no mejoran sin pose detection | Media | Bajo | ObservationGuide con checklist + timer ya mejora significativamente la UX; pose detection es futuro |
| 5 | Canvas resolution varía entre dispositivos | Media | Medio | Normalizar coordenadas a porcentaje del canvas; análisis basado en ratios, no píxeles absolutos |
| 6 | Niños muy pequeños (36m) no pueden trazar en pantalla táctil | Media | Medio | TracingGame con hit areas grandes; tolerancia alta en validación; fallback manual siempre disponible |
| 7 | getImageData es lento en canvas grandes | Baja | Medio | Limitar análisis a bounding box del trazo; downsample si canvas > 800px |
| 8 | ObservationGuide no se usa porque el adulto prefiere el método actual | Media | Bajo | Hacer la guía opcional; mostrar beneficios claros (timer, checklist pre-llenada, notas) |

---

## 8. Métricas de Éxito

| KPI | Baseline | Fase 2 | Fase 5 |
|-----|----------|--------|--------|
| % ítems gamificables auto-validables | 0% | 36% | 100% |
| % ítems observacionales con guía interactiva | 0% | 0% | 100% |
| Tiempo revisión Desarrollo Físico por evaluación | ~15 min | ~10 min | ~5 min |
| Concordancia TracingValidator-psicólogo | N/A | >70% | >80% |
| Tasa de falsos positivos en trazos | 0% | <10% | <7% |
| Engagement infantil en TracingGame | Baseline | +20% | +35% |
| Satisfacción del adulto con ObservationGuide | N/A | N/A | >75% positiva |

---

## 9. Dependencias de Otros Planes

Este plan **depende** de:

| Componente | Origen | Fase Desarrollo Físico que lo usa |
|-----------|--------|-----------------------------------|
| `AutoValidationEngine` | Cognitivo Fase 2 | Fase 2 |
| `LogicValidator` | Cognitivo Fase 2 | Fase 2 |
| Framer Motion + audio + animaciones | Cognitivo Fase 1 | Fase 1 |
| `InteractiveQA` mejorado | Comunicación Fase 1 | Fase 1 |
| `MatchingGame` mejorado | Cognitivo Fase 1 | Fase 1 |

**NO depende** de:
- STT/Whisper (no hay ítems verbales en Desarrollo Físico)
- OCR/Tesseract (no hay escritura en Desarrollo Físico)
- MediaPipe (no hay computer vision en esta fase)

**Recomendación**: Ejecutar después de completar Fase 2 de Cognitivo. Puede correr en paralelo con Fase 3 de Cognitivo y Comunicación.

---

## 10. Comparativa Visual: Antes vs Después

### Ejemplo: DESARROLLO_FISICO_068 (Copia una cruz)

**ANTES:**
```
┌─────────────────────────────────┐
│  Modelo:        Tu trazo:       │
│  ┌─────┐       ┌─────────┐    │
│  │  ┼  │       │         │    │
│  │ ─┼─ │       │  (vacío)│    │
│  │  ┼  │       │         │    │
│  └─────┘       └─────────┘    │
│                                 │
│  [Termine este trazo]           │
│  El evaluador revisará.         │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│   ✏️  COPIA LA CRUZ  ✏️        │
│                                 │
│  ┌─────────┐   ┌─────────┐    │
│  │ MODELO  │   │ TU TRAZO│    │
│  │         │   │         │    │
│  │    │    │   │    │    │    │
│  │  ──┼──  │   │  ──┼──  │    │
│  │    │    │   │    │    │    │
│  │ (trazo  │   │ (verde= │    │
│  │ fantasma│   │  cerca, │    │
│  │ animado)│   │  rojo=  │    │
│  │         │   │  lejos) │    │
│  └─────────┘   └─────────┘    │
│                                 │
│  ✅ Línea vertical detectada    │
│  ✅ Línea horizontal detectada  │
│  Confianza: 0.91 → AUTO ✓     │
│                                 │
│  [✨ Termine este trazo ✨]     │
│  🎵 sonido de lápiz            │
└─────────────────────────────────┘
```

### Ejemplo: DESARROLLO_FISICO_069 (Observación — Balance en un pie)

**ANTES:**
```
┌─────────────────────────────────┐
│  Se balancea sobre un pie       │
│  durante 5-10 segundos          │
│                                 │
│  [Lo logró]  [No lo logró]     │
│                                 │
│  El psicólogo revisará.         │
└─────────────────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│  🦩  BALANCE EN UN PIE  🦩     │
│                                 │
│  "Se balancea sobre un pie      │
│   durante 5-10 segundos"        │
│                                 │
│  💡 Tip: "A ver cuánto aguantas │
│  como un flamenco"              │
│                                 │
│  ☑️ Levanta un pie del suelo    │
│  ☑️ Mantiene equilibrio sin     │
│     apoyo                       │
│  ☐ Dura al menos 5 segundos     │
│  ☐ No se tambalea excesivamente │
│                                 │
│  ⏱️  00:07 / 00:10             │
│  [▶️ Iniciar] [⏸️ Pausar]       │
│                                 │
│  [✅ Lo logró]  [❌ No lo logró]│
│                                 │
│  📝 Notas: ________________     │
└─────────────────────────────────┘
```

---

## 11. Resumen Ejecutivo

Este plan transforma el área de Desarrollo Físico del DAYC-2 en dos frentes:

### Frente A: Motricidad Fina en Pantalla (11 ítems → 100% auto-validables)

1. **4 ítems (36%)** son de respuesta cerrada → validación lógica directa (Fase 2)
2. **5 ítems (45%)** son de trazado de formas → `TracingValidator` con análisis geométrico (Fase 3)
3. **1 ítem (9%)** es de dibujo libre → `DrawingAnalysisValidator` con detección de movimientos (Fase 3)
4. **1 ítem (9%)** es de coloreo → `ColoringValidator` con análisis de zonas (Fase 3)

### Frente B: Motricidad Gruesa Observacional (22 ítems → 100% con guía interactiva)

- **ObservationGuide** con checklist, timer y tips para cada ítem
- **Video asistido** con countdown, revisión y notas
- **No auto-validables** por naturaleza, pero la UX del adulto mejora drásticamente

### Beneficios Clave

1. **100% de los ítems gamificables auto-validables** — el psicólogo solo revisa los 22 observacionales
2. **Validación de trazos objetiva** — análisis geométrico elimina sesgo
3. **Guía interactiva para el adulto** — checklist + timer + tips mejoran la calidad de la observación
4. **Reutiliza infraestructura de Cognitivo** — solo añade 3 validadores de canvas nuevos
5. **TracingGame mejorado** — trazo fantasma, feedback de color, progresión de dificultad

### Próximos Pasos

1. Completar Fase 2 de Cognitivo (prerrequisito)
2. Ejecutar Fase 1 de Desarrollo Físico en paralelo con Fase 1 de Cognitivo/Comunicación
3. Iterar TracingValidator con datos reales de trazos infantiles
4. Validar ObservationGuide con psicólogos en evaluaciones reales

---

**Documento creado:** Julio 2026
**Versión:** 1.0
**Estado:** Plan de Implementación Completo
**Depende de:** `plan-implementacion-cognitivo.md` (Fases 1-2)

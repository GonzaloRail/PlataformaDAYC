# Plan de Corrección — DAYC-2

> Basado en el análisis de 69 hallazgos. Cada fase agrupa tareas relacionadas.
> Marcar `[x]` al completar cada tarea.

---

## Fase 1: Seguridad y configuración crítica

### 1.1 Variables de entorno y credenciales
- [ ] **Crear `.env.example`** en `backend/` documentando las 9 variables: `SECRET_KEY`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`, `OPENAI_API_KEY`, `BAREMOS_JSON_PATH`, `ALLOWED_HOSTS`
- [ ] **Eliminar defaults hardcodeados** en `backend/src/dayc2/settings.py`:
  - [ ] L9: `SECRET_KEY` — solo leer de env, `os.environ['SECRET_KEY']` (sin default)
  - [ ] L68-69: `DATABASE_USER` y `DATABASE_PASSWORD` — mismo tratamiento
- [ ] **Eliminar credenciales hardcodeadas** en `backend/docker-compose.yml` — usar `${VAR}` de `.env`

### 1.2 CSRF y autenticación
- [ ] **Evaluar/arreglar CSRF** en `backend/src/api/auth.py:4-5`:
  - Opción A: Quitar `CsrfExemptSessionAuthentication` y usar CSRF normal con tokens en frontend
  - Opción B: Si es necesario para la arquitectura actual, documentar por qué y qué protecciones alternativas existen
- [ ] **Quitar `BasicAuthentication`** de `backend/src/dayc2/settings.py:105` — solo mantener session auth
- [ ] **Agregar `@permission_classes([IsAuthenticated])`** a `backend/src/api/metricas/views.py:38` (`registrar_métricas`)

### 1.3 Corrección de fugas de información
- [ ] **Cambiar `__debug__` por `settings.DEBUG`** en `backend/src/api/exceptions.py:80`

### 1.4 Sincronizar dependencias
- [ ] **Agregar a `backend/pyproject.toml`**: `django-cors-headers`, `channels`, `weasyprint`
- [ ] **Agregar `eslint-plugin-react`** a `frontend/devDependencies`

---

## Fase 2: Código muerto — Backend

### 2.1 Archivo entero para eliminar
- [ ] **Eliminar `backend/src/application/services/diagnosis_prompt.py`** (188 líneas, nunca importado)
  - Verificar que `ai_service.py` tiene toda la funcionalidad equivalente (`_construir_prompt`, `_generar_actividades_por_gdq`)

### 2.2 Clases de excepción sin uso
- [ ] **Limpiar `backend/src/api/exceptions.py`**:
  - [ ] Eliminar clases nunca usadas: `ValidationError` (L19), `NotFoundError` (L25), `UnauthorizedError` (L31), `ForbiddenError` (L37), `ExternalServiceError` (L43)
  - [ ] Si se quiere mantener `custom_exception_handler` (L49), registrarlo en `REST_FRAMEWORK.EXCEPTION_HANDLER` en settings

### 2.3 Imports sin uso
- [ ] `backend/src/infrastructure/pdf/reporte_generator.py:4` — quitar `from typing import Optional`
- [ ] `backend/src/infrastructure/pdf/reporte_generator.py:2` — quitar `import os`
- [ ] `backend/src/api/reportes/views.py:2` — quitar `import os`
- [ ] `backend/src/api/reportes/views.py:6-7` — quitar `parser_classes` y `MultiPartParser`

### 2.4 Métodos y variables sin uso
- [ ] `backend/src/application/services/edad_service.py` — eliminar `a_string()` (L21-24) y `validar_fecha_nacimiento()` (L73-84)
- [ ] `backend/src/application/services/rules_service.py:31` — eliminar `regla_activa`
- [ ] `backend/src/dayc2/settings.py:127-129` — eliminar formatter `'json'` si no se usa, o usarlo en el handler `console`

### 2.5 Dependencia sin uso
- [ ] `backend/requirements.txt:5` — quitar `pydantic>=2.0`

### 2.6 Tests duplicados
- [ ] Elegir uno y eliminar el otro:
  - [ ] `backend/tests/test_baremos_service.py` vs `backend/tests/unit/test_baremos_service.py`
  - [ ] `backend/tests/test_rules_service.py` vs `backend/tests/unit/test_rules_service.py`

---

## Fase 3: Código muerto — Frontend

### 3.1 Archivos/páginas huérfanos (nunca importados ni enrutados)
- [ ] **Eliminar** `frontend/src/layouts/ChildSessionLayout.tsx` + `ChildSessionLayout.css`
- [ ] **Eliminar** `frontend/src/pages/child/EvaluationResult.tsx` + su CSS
- [ ] **Eliminar** `frontend/src/pages/playground/MinijuegoTemplatePlayground.tsx` + su CSS
- [ ] **Eliminar** `frontend/src/components/evidence/EvidenceRecorder.tsx`
- [ ] **Eliminar** `frontend/src/components/evidence/useEvidenceFlush.ts`
- [ ] **Eliminar** `frontend/src/styles/minijuegos/cognitivo/COGNITIVO_002.css`

### 3.2 Servicios/hooks sin uso
- [ ] **Eliminar** `frontend/src/services/evaluation.ts` (duplicado de `evaluacionesApi.ts`)
- [ ] **Eliminar** `frontend/src/services/errorHandler.ts` (nunca importado)
- [ ] **Eliminar** `frontend/src/hooks/useEvaluationRules.ts` (nunca importado)

### 3.3 Minijuegos de arquitectura vieja (no registrados en `minijuegosRegistry`)
- [ ] **Eliminar** `frontend/src/components/minijuegos/Cognitivo/COGNITIVO_001.tsx` (también elimina dependencia pesada `@mediapipe/holistic`)
- [ ] **Eliminar** `frontend/src/components/minijuegos/Cognitivo/COGNITIVO_003.tsx`
- [ ] **Eliminar** `frontend/src/components/minijuegos/Social_Emocional/SOCIAL_EMOCIONAL_001.tsx`
- [ ] **Eliminar** `frontend/src/components/minijuegos/Plantilla/MINIJUEGO_TEMPLATE.tsx`
- [ ] **Eliminar** `frontend/src/components/minijuegos/Plantilla/COGNITIVO_OFICIAL_TEMPLATE.tsx`
- [ ] Si los archivos CSS de estos minijuegos existen, eliminarlos también

### 3.4 Barrel exports sin uso
- [ ] `frontend/src/components/results/index.ts` — si ningún consumidor lo usa, eliminar el barrel (o mantener solo si se planea migrar a imports de barrel)
- [ ] `frontend/src/components/research/index.ts` — mismo criterio
- [ ] `frontend/src/components/evaluation/index.ts` — mismo criterio

### 3.5 Export sin uso
- [ ] `frontend/src/components/minijuegos/registry.tsx:53` — evaluar si quitar `getAvailableMinijuegos()` o dejarlo si es API pública

### 3.6 Dependencias npm sin uso
- [ ] `npm uninstall framer-motion` (si no se planea usar)
- [ ] `npm uninstall lottie-react` (si `PedagogicalMascot` ya no usa Lottie)
- [ ] `npm uninstall recharts` (si `MetricsCharts` se elimina o no usa recharts)
- [ ] `npm uninstall @mediapipe/holistic @mediapipe/camera_utils @mediapipe/tasks-vision` (si COGNITIVO_001 viejo se elimina)

### 3.7 Limpiar imports React innecesarios
- [ ] Eliminar `import React from 'react'` en ~30 archivos `.tsx` (no necesario con `"jsx": "react-jsx"`)
  - Archivos: todos bajo `components/ui/`, `components/results/`, `components/evaluation/`, `components/evidence/`, y varias páginas
  - Mantener solo en `main.tsx` (usa `React.StrictMode`, `ReactDOM`)

---

## Fase 4: Corrección de bugs

### 4.1 Scoring roto por nombres de área incorrectos
- [ ] **Arreglar `_map_minijuego_to_area`** en `backend/src/application/services/scoring_service.py:71-83`
  - Cambiar `'MEMORIA'` → `'COGNITIVO'`, `'LENGUAJE'` → `'COMUNICACION'`, `'ATENCIÓN'` → `'COGNITIVO'`, `'PERCEPCIÓN'` → `'DESARROLLO_FISICO'`
  - O mejor: eliminar el mapping legacy y usar `Respuesta.area` directamente (ya existe ese campo)

### 4.2 Umbrales GDQ incorrectos en AI service
- [ ] **Corregir** `backend/src/infrastructure/external/ai_service.py:60-83`
  - Cambiar `>= 13` → `>= 130`, `>= 10` → `>= 110`, `>= 7` → `>= 70`
  - O usar directamente los umbrales de `diagnosis_prompt.py` (que son correctos)

### 4.3 GDQ tomado del primer área en vez del global
- [ ] **Corregir** `backend/src/infrastructure/external/ai_service.py:17-19` — obtener GDQ del resultado global, no de `resultados[0]`

### 4.4 Cálculo de edad duplicado e inconsistente
- [ ] **Eliminar propiedad `Niño.edad_meses`** en `backend/src/api/children/models.py:31-36`
- [ ] **Usar `EdadService.calcular_edad_meses()`** en todos los lugares que antes usaban `niño.edad_meses`
  - Buscar referencias con: `grep -r "edad_meses" backend/`

### 4.5 Race condition en generación de código de sesión
- [ ] **Arreglar `generar_códigoSesión()`** en `backend/src/api/evaluaciones/views.py:21-26`
  - Opción A: Agregar `unique=True` al campo `session_code` del modelo + retry loop
  - Opción B: Usar `secrets.token_urlsafe(6)` que es más resistente a colisiones

### 4.6 Race condition en métricas
- [ ] **Usar `F()` expression** en `backend/src/api/metricas/views.py:44-63`
  - Cambiar `.get_or_create()` + attr increment + `.save()` por `.update()` con `F()`

### 4.7 Validación de fecha sin try/except
- [ ] **Agregar try/except** en `backend/src/api/metricas/views.py:19-21` alrededor de `datetime.fromisoformat()` — retornar 400 si formato inválido

### 4.8 PDF fallback genera archivo inválido
- [ ] **Corregir** `backend/src/infrastructure/pdf/reporte_generator.py:43-45`
  - Cambiar `except Exception` genérico por catch específico (`ImportError`, `OSError`)
  - Si falla WeasyPrint, retornar error 503 en vez de generar un PDF inválido con HTML crudo

### 4.9 `except Exception` genérico en startup
- [ ] **Especificar excepciones** en `backend/src/dayc2/apps.py:34-36` — `FileNotFoundError`, `json.JSONDecodeError`

### 4.10 `print()` en vez de logging
- [ ] **Cambiar a `logging.warning()`** en `backend/src/application/services/baremos_service.py:114-116`

### 4.11 Transacción en scoring
- [ ] **Envolver en transacción** `backend/src/application/services/scoring_service.py:13` — el `.delete()` + recálculo debería ser atómico

### 4.12 Hardcoded `total_items: 50`
- [ ] **Consultar catálogo real** en `backend/src/api/evaluaciones/views.py:634` en vez de usar `50` hardcodeado

### 4.13 `nino_id` vs `niño_id` inconsistente
- [ ] **Estandarizar** a una sola key en `backend/src/api/evaluaciones/views.py:30` y donde se consuma

### 4.14 Strings en vez de enum para estado
- [ ] **Usar `Evaluación.Estado` enum** en `backend/src/api/reportes/views.py:24` en vez de strings crudos `'COMPLETED'`, `'STOPPED'`, `'ARCHIVED'`

---

## Fase 5: Consolidación de código duplicado

### 5.1 PDF generation duplicado
- [ ] **Extraer función compartida** `generar_pdf_evaluacion(evaluacion_id)` usada por:
  - `backend/src/api/reportes/views.py:15-35`
  - `backend/src/api/evaluaciones/views.py:826-835`
- [ ] Dejar un solo endpoint o hacer que uno redirija al otro

### 5.2 Serialización de Niño
- [ ] **Crear helper `_serialize_niño(niño)`** en `backend/src/api/children/views.py` y usarlo en L98-111, L130-140, L153-164

### 5.3 Verificación de autorización
- [ ] **Crear helper `_autorizar_evaluacion(request, evaluacion)`** en `backend/src/api/evaluaciones/views.py` y reemplazar las 4 ocurrencias (L162, L198-203, L422-427, L449-454)

### 5.4 Serialización de ResultadoÁrea
- [ ] **Crear helper `_serialize_resultado_area(r)`** y usarlo en `listar_resultados` (L642-662), `resultados_evaluacion` (L714-730), y `calcular_puntuacion_preliminar` (L749-761)

### 5.5 Finalización de evaluación
- [ ] **Crear helper `_finalizar_evaluacion()`** en vez de repetir L156-160 y L172-176 en `dayc2_flow_service.advance_after_item`

### 5.6 Frontend: interpretación GDQ unificada
- [ ] **Crear `getGdqInterpretation(gdq: number): GdqLevel`** en `frontend/src/utils/scoring.ts`
  - Consensuar umbrales correctos (actualmente hay 3, 4 y 5 niveles en distintos archivos)
  - Reemplazar en: `ResultAdjustment.tsx:74-79`, `DiagnosisDisplay.tsx:10-16`, `ResultsTable.tsx:84-88`, `GDQDisplay.tsx:10-44`

### 5.7 Frontend: clasificación de puntuación unificada
- [ ] **Crear `getScoreCategory(score: number): ScoreCategory`** en `frontend/src/utils/scoring.ts`
  - Reemplazar en: `ResultAdjustment.tsx:60-72`, `ResultsTable.tsx:11-16`

### 5.8 Frontend: helper canvasToBlob
- [ ] **Mover a `frontend/src/utils/media.ts`** la función duplicada en:
  - `frontend/src/components/evidence/useAutoEvidence.ts:16-18`
  - `frontend/src/components/evidence/MinigameEvidenceProvider.tsx:59-61`
  - `frontend/src/minijuegos/cognitivo/COGNITIVO_045/index.tsx:18-20`

### 5.9 Frontend: lógica de join de sesión
- [ ] **Extraer hook `useSessionJoin()`** de la lógica duplicada en:
  - `frontend/src/pages/child/SessionEntry.tsx:18-32`
  - `frontend/src/pages/psychologist/SessionAccess.tsx:13-27`

### 5.10 Frontend: verificación de auth
- [ ] **Extraer hook `useAuthCheck()`** de la lógica duplicada en:
  - `frontend/src/components/auth/ProtectedRoute.tsx:15-29`
  - `frontend/src/components/auth/PublicRoute.tsx:15-28`

---

## Fase 6: Correcciones React y error handling

### 6.1 Loop de reconexión WebSocket
- [ ] **Arreglar `frontend/src/hooks/useEvaluationProgress.ts:74-85`**
  - Sacar `progress` y `isConnected` de las dependencias de `useCallback` que construyen `connectWebSocket`
  - Usar refs (`useRef`) para valores que no deben triggerear reconexión

### 6.2 `window.location.href` → React Router
- [ ] **Cambiar por `navigate()`** en `frontend/src/components/psychologist/EvaluationDetail.tsx:175`

### 6.3 Fire-and-forget sin manejo de errores
- [ ] **Agregar `.catch()`** en `frontend/src/pages/child/AdultSession.tsx:186` para `recordAdultEvidence()`
- [ ] **Agregar `.catch()`** en `frontend/src/pages/child/EvaluationSession.tsx:33` para `loadSessionState()` dentro de `setInterval`

### 6.4 Dependencias de useEffect faltantes
- [ ] **Corregir** `frontend/src/components/psychologist/EvaluationDetail.tsx:34-37` — memoizar `loadData`, `startPolling`, `stopPolling` con `useCallback` o incluirlos en deps

### 6.5 Error boundary
- [ ] **Agregar `ErrorBoundary`** en la raíz de la app (`App.tsx` o `main.tsx`) y en rutas clave (evaluación, dashboard)

### 6.6 Keys en listas
- [ ] **Revisar** `frontend/src/components/results/DiagnosisDisplay.tsx:67` — si es posible usar key más estable que `index`

### 6.7 Limpiar console.log/warn
- [ ] **Quitar o condicionar a `import.meta.env.DEV`** los `console.log` y `console.warn` en:
  - `EvidenceOrchestrator.tsx`
  - `MinigameEvidenceProvider.tsx`
  - Otros que aparezcan

### 6.8 Imports inline en backend
- [ ] **Mover al inicio del archivo** los imports inline en `backend/src/api/evaluaciones/views.py`:
  - [ ] L192: `from src.api.evaluaciones.models import Evaluación`
  - [ ] L214: `import json`
  - [ ] L220: `from src.api.evaluaciones.models import Evidencia, Respuesta`
  - [ ] L233: `from src.application.services.dayc2_flow_service import dayc2_flow_service` (ya importado arriba, eliminar inline)
  - [ ] L478: `import json`
  - [ ] L832: `from src.infrastructure.pdf.reporte_generator import ReporteGenerator`

---

## Fase 7: Mejoras de rendimiento

### 7.1 Backend
- [ ] **Índice O(1) de items** en `backend/src/application/services/item_catalog_service.py:81-85`
  - Construir `{item.item_id: item}` al cargar el catálogo
- [ ] **Query limitada a 3** en `backend/src/application/services/dayc2_flow_service.py:215-230`
  - Cambiar `evaluación.items_completados.filter(area=area)` por `.order_by('-orden')[:3]`
- [ ] **Agregar paginación** en:
  - [ ] `backend/src/api/children/views.py:97-111` (`listar_niños`)
  - [ ] `backend/src/api/evaluaciones/views.py:96` (`crear_evaluación` GET)

### 7.2 Frontend
- [ ] **Code splitting con `React.lazy()`** en `App.tsx` para rutas pesadas:
  - `MinijuegosTester`
  - `MetricsDashboard`
  - `ReviewPage`
- [ ] **Agregar `React.memo`** a componentes de lista:
  - `EvaluationList` — extraer `EvaluationCard` memoizado
  - `EvidenceCollection` — memoizar `EvidenceCard`
- [ ] **Arreglar polling sin debounce** — agregar flag `isPolling` para evitar solapamiento en:
  - `EvaluationSession.tsx` (2s)
  - `EvidenceViewer.tsx` (4s)
  - `EvaluationDetail.tsx` (5s)
- [ ] **Desactivar sourcemaps en producción** en `frontend/vite.config.ts:17`
  - `sourcemap: process.env.NODE_ENV !== 'production'`

---

## Fase 8: Estructura, convenciones y limpieza final

### 8.1 Archivos fuera de lugar
- [ ] **Mover `baremos.py`** (755 líneas) de raíz a `backend/src/application/scoring/baremos.py`
- [ ] **Mover `preguntas_dayc.json`** (1816 líneas) de raíz a `backend/data/` o eliminar si el catálogo `dayc2_items/` es canónico
- [ ] **Mover assets** de raíz a `frontend/`:
  - [ ] `green dino.svg` → `frontend/src/assets/` (corregir nombre: `green-dino.svg`)
  - [ ] `greendino.json` → `frontend/src/assets/`

### 8.2 Archivos grandes — dividir
- [ ] **Dividir `backend/src/api/evaluaciones/views.py`** (891 líneas):
  - `session_views.py` — crear/join/avanzar sesión
  - `evidence_views.py` — subir/ver evidencia
  - `scoring_views.py` — scoring y resultados
  - `review_views.py` — revisión del psicólogo
- [ ] **Dividir `frontend/src/components/evidence/EvidenceOrchestrator.tsx`** (535 líneas):
  - Extraer `useScreenshotCapture`
  - Extraer `useAudioRecorder`
  - Extraer `useVideoRecorder`

### 8.3 Convenciones de nombres
- [ ] **Renombrar `generar_códigoSesión()`** a `generar_codigo_sesion()` en `backend/src/api/evaluaciones/views.py:21`
- [ ] **Unificar `Evaluación.psychologist_id`**: cambiar `CharField` a `ForeignKey(User)` o viceversa (documentar razón si se mantiene CharField)
- [ ] **Normalizar keys de API**: eliminar duplicados con/sin acento (`area`/`área`), normalizar en el serializador del backend
- [ ] **Usar path alias `@/*`** en imports de frontend en vez de rutas relativas (o eliminar el alias de tsconfig si no se va a usar)

### 8.4 Configuración
- [ ] **Mover a `devDependencies`**: `@tailwindcss/postcss`, `autoprefixer` en `frontend/package.json`
- [ ] **Agregar `__pycache__/`** a `.gitignore`
- [ ] **Crear `vitest.config.ts`** en `frontend/` si se planea escribir tests
- [ ] **Escribir tests de frontend** (al menos smoke tests para páginas principales)

### 8.5 Tipo `EvaluationTask` duplicado
- [ ] **Unificar en un solo archivo** las definiciones divergentes de `EvaluationTask` en:
  - `frontend/src/types/index.ts:89-110`
  - `frontend/src/minijuegos/types.ts:47-56`
- [ ] Que todos los consumidores importen desde la misma fuente

### 8.6 Campo `authLoading` sin uso
- [ ] **Eliminar `authLoading`** de `frontend/src/store/types.ts:3-12` (solo se usa `isLoading`)

### 8.7 `start.sh` portable
- [ ] **Usar rutas relativas** en vez de `$HOME/Proyectos/dayc/` hardcodeado en `start.sh`

---

## Resumen de progreso

| Fase | Tareas | Completadas | Estado |
|------|--------|-------------|--------|
| Fase 1: Seguridad y configuración | 12 | 0 | ⬜ Pendiente |
| Fase 2: Código muerto — Backend | 11 | 0 | ⬜ Pendiente |
| Fase 3: Código muerto — Frontend | 12 | 0 | ⬜ Pendiente |
| Fase 4: Corrección de bugs | 14 | 0 | ⬜ Pendiente |
| Fase 5: Código duplicado | 10 | 0 | ⬜ Pendiente |
| Fase 6: React y error handling | 10 | 0 | ⬜ Pendiente |
| Fase 7: Rendimiento | 11 | 0 | ⬜ Pendiente |
| Fase 8: Estructura y convenciones | 14 | 0 | ⬜ Pendiente |
| **Total** | **94** | **0** | |

# Plan de Corrección — DAYC-2

> Basado en el análisis de 69 hallazgos. Cada fase agrupa tareas relacionadas.
> Marcar `[x]` al completar cada tarea.

---

## Fase 1: Seguridad y configuración crítica

### 1.1 Variables de entorno y credenciales
- [x] **Crear `.env.example`** en `backend/` documentando las 9 variables: `SECRET_KEY`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`, `OPENAI_API_KEY`, `BAREMOS_JSON_PATH`, `ALLOWED_HOSTS`
- [x] **Eliminar defaults hardcodeados** en `backend/src/dayc2/settings.py`:
  - [x] L9: `SECRET_KEY` — solo leer de env, `os.environ['SECRET_KEY']` (sin default)
  - [x] L68-69: `DATABASE_USER` y `DATABASE_PASSWORD` — mismo tratamiento
- [x] **Eliminar credenciales hardcodeadas** en `backend/docker-compose.yml` — usar `${VAR}` de `.env`

### 1.2 CSRF y autenticación
- [x] **Evaluar/arreglar CSRF** en `backend/src/api/auth.py:4-5`:
  - Opción B aplicada: documentado por qué es necesario con CORS + SPA. Requiere frontend changes para opción A (CSRF_TRUSTED_ORIGINS + token en header)
- [x] **Quitar `BasicAuthentication`** de `backend/src/dayc2/settings.py:105` — solo mantener session auth
- [x] **Agregar `@permission_classes([IsAuthenticated])`** a `backend/src/api/metricas/views.py:38` (`registrar_métricas`)

### 1.3 Corrección de fugas de información
- [x] **Cambiar `__debug__` por `settings.DEBUG`** en `backend/src/api/exceptions.py:80`

### 1.4 Sincronizar dependencias
- [x] **Agregar a `backend/pyproject.toml`**: `django-cors-headers`, `channels`, `weasyprint`
- [x] **Agregar `eslint-plugin-react`** a `frontend/devDependencies`

---

## Fase 2: Código muerto — Backend

### 2.1 Archivo entero para eliminar
- [x] **Eliminar `backend/src/application/services/diagnosis_prompt.py`** (188 líneas, nunca importado)
  - Verificar que `ai_service.py` tiene toda la funcionalidad equivalente (`_construir_prompt`, `_generar_actividades_por_gdq`)

### 2.2 Clases de excepción sin uso
- [x] **Limpiar `backend/src/api/exceptions.py`**:
  - [x] Eliminar clases nunca usadas: `ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ExternalServiceError`
  - [ ] Registrar `custom_exception_handler` en `REST_FRAMEWORK.EXCEPTION_HANDLER` (puede hacerse junto con migración a custom handler en otra fase)

### 2.3 Imports sin uso
- [x] `backend/src/infrastructure/pdf/reporte_generator.py:4` — quitar `from typing import Optional`
- [x] `backend/src/infrastructure/pdf/reporte_generator.py:2` — quitar `import os`
- [x] `backend/src/api/reportes/views.py:2` — quitar `import os`
- [x] `backend/src/api/reportes/views.py:6-7` — quitar `parser_classes` y `MultiPartParser`

### 2.4 Métodos y variables sin uso
- [x] `backend/src/application/services/edad_service.py` — eliminar `a_string()` (L21-24) y `validar_fecha_nacimiento()` (L73-84)
- [x] `backend/src/application/services/rules_service.py:31` — eliminar `regla_activa`
- [x] `backend/src/dayc2/settings.py:127-129` — eliminar formatter `'json'`

### 2.5 Dependencia sin uso
- [x] `backend/requirements.txt:5` — quitar `pydantic>=2.0`
- [x] `backend/pyproject.toml:10` — quitar `pydantic>=2.0`

### 2.6 Tests duplicados
- [x] Eliminar `backend/tests/unit/test_baremos_service.py` (duplicado de `tests/test_baremos_service.py`)
- [x] Eliminar `backend/tests/unit/test_rules_service.py` (duplicado de `tests/test_rules_service.py`)
- [x] Eliminar atributo fantasma `_baremos_module` en `tests/unit/test_baremos_canonical_logic.py:16`

---

## Fase 3: Código muerto — Frontend

### 3.1 Archivos/páginas huérfanos (nunca importados ni enrutados)
- [x] **Eliminar** `frontend/src/layouts/ChildSessionLayout.tsx` + `ChildSessionLayout.css`
- [x] **Eliminar** `frontend/src/pages/child/EvaluationResult.tsx` + su CSS
- [x] **Eliminar** `frontend/src/pages/playground/MinijuegoTemplatePlayground.tsx` + su CSS
- [x] **Eliminar** `frontend/src/components/evidence/EvidenceRecorder.tsx`
- [x] **Eliminar** `frontend/src/components/evidence/useEvidenceFlush.ts`
- [x] **Eliminar** `frontend/src/styles/minijuegos/cognitivo/COGNITIVO_002.css`

### 3.2 Servicios/hooks sin uso
- [x] **Eliminar** `frontend/src/services/evaluation.ts` (duplicado de `evaluacionesApi.ts`)
- [x] **Eliminar** `frontend/src/services/errorHandler.ts` (nunca importado)
- [x] **Eliminar** `frontend/src/hooks/useEvaluationRules.ts` (nunca importado)

### 3.3 Minijuegos de arquitectura vieja (no registrados en `minijuegosRegistry`)
- [x] **Eliminar** `frontend/src/components/minijuegos/Cognitivo/COGNITIVO_001.tsx`
- [x] **Eliminar** `frontend/src/components/minijuegos/Cognitivo/COGNITIVO_003.tsx`
- [x] **Eliminar** `frontend/src/components/minijuegos/Social_Emocional/SOCIAL_EMOCIONAL_001.tsx`
- [x] **Eliminar** `frontend/src/components/minijuegos/Plantilla/MINIJUEGO_TEMPLATE.tsx`
- [x] **Eliminar** `frontend/src/components/minijuegos/Plantilla/COGNITIVO_OFICIAL_TEMPLATE.tsx`
- [x] **Eliminar CSS huérfano** `frontend/src/styles/minijuegos/cognitivo/COGNITIVO_001.css`
- [x] **Eliminar** `frontend/src/components/research/MetricsCharts.tsx` + CSS (también requería `recharts`)

### 3.4 Barrel exports sin uso
- [x] **Eliminar** `frontend/src/components/results/index.ts`
- [x] **Eliminar** `frontend/src/components/research/index.ts`
- [x] **Eliminar** `frontend/src/components/evaluation/index.ts`

### 3.5 Export sin uso
- [x] **Eliminar** `getAvailableMinijuegos()` de `frontend/src/components/minijuegos/registry.tsx:53`

### 3.6 Dependencias npm sin uso
- [x] `npm uninstall framer-motion`
- [x] `npm uninstall lottie-react`
- [x] `npm uninstall recharts` (tras eliminar MetricsCharts)
- [x] `npm uninstall @mediapipe/holistic @mediapipe/camera_utils @mediapipe/tasks-vision`

### 3.7 Limpiar imports React innecesarios
- [x] Eliminar `import React from 'react'` en archivos que no lo usan (Skeleton, LoginPage, Dashboard, SessionEntry, AdultSession, DateRangeFilter, ProtectedRoute, PublicRoute) — migrados a imports con tipos (`type FormEvent`, `type ChangeEvent`, `type ReactNode`) o `Fragment` named import

---

## Fase 4: Corrección de bugs

### 4.1 Scoring roto por nombres de área incorrectos
- [x] **Eliminado `_map_minijuego_to_area`** y `_obtener_áreas`/`_sumar_puntuación` legacy en `scoring_service.py`
  - Ahora se usa `Respuesta.area` directamente (que ya es un campo del modelo y se setea correctamente en `dayc2_flow_service.py:131` y `views.py:579`)

### 4.2 Umbrales GDQ incorrectos en AI service
- [x] **Corregido** `ai_service.py:60-83`
  - `>= 130` (superior), `>= 110` (alto), `>= 90` (promedio), `>= 70` (bajo), `< 70` (muy bajo)
  - Escala DAYC-2 standard GDQ: 40-160

### 4.3 GDQ tomado del primer área en vez del global
- [x] **Creado método `_obtener_gdq_global()`** en `ai_service.py` que promedia los `cociente_general_gdq` de todos los `ResultadoÁrea`

### 4.4 Cálculo de edad duplicado e inconsistente
- [x] **`Niño.edad_meses` ahora delega a `EdadService.calcular_edad_meses()`** — sin más discrepancia de un mes

### 4.5 Race condition en generación de código de sesión
- [x] **Renombrado y refactorizado** `generar_códigoSesión()` → `generar_codigo_sesion()`
  - Ahora usa `secrets.token_urlsafe(6)` (collision-resistant). El modelo ya tiene `unique=True` en `session_code`

### 4.6 Race condition en métricas
- [x] **Usado `F()` expression** en `registrar_métricas` con `Métricas.objects.filter(...).update(field=F(field) + 1)`

### 4.7 Validación de fecha sin try/except
- [x] **Agregado helper `_parse_iso_date()`** y validaciones en `obtener_métricas` y `registrar_métricas` — retornan 400 si formato inválido

### 4.8 PDF fallback genera archivo inválido
- [x] **Cambiado `except Exception` a `except (ImportError, OSError)`** y se hace `raise RuntimeError` con logging — no se genera PDF inválido

### 4.9 `except Exception` genérico en startup
- [x] **Especificadas excepciones** en `apps.py:34-36` — `FileNotFoundError` y `json.JSONDecodeError`

### 4.10 `print()` en vez de logging
- [x] **Cambiado a `logger.warning`** en `baremos_service.py:114-116`

### 4.11 Transacción en scoring
- [x] **Envuelto `calcular_resultados` con `@transaction.atomic`** en `scoring_service.py`

### 4.12 Hardcoded `total_items: 50`
- [x] **Consulta real al catálogo** vía `len(item_catalog_service.all_items())`

### 4.13 `nino_id` vs `niño_id` inconsistente
- [x] **Estandarizado a `nino_id`** en input del endpoint `crear_evaluación` (frontend ya usa `nino_id` consistentemente)

### 4.14 Strings en vez de enum para estado
- [x] **Usado `Evaluación.Estado` enum** en `reportes/views.py:24`

### Bonus: imports inline y limpieza
- [x] Movidos imports inline al inicio de `views.py` (`Evidencia`, `Respuesta`, `ReporteGenerator`)
- [x] Eliminados imports sin uso: `random`, `string`

---

## Fase 5: Consolidación de código duplicado

### 5.1 PDF generation duplicado
- [x] **Creado helper `_generar_pdf_evaluacion(evaluación)`** en `evaluaciones/views.py`
  - `reportes/views.py` ahora lo importa y lo usa (un solo punto de generación)

### 5.2 Serialización de Niño
- [x] **Creado `serialize_niño(niño, include_edad=False)`** en `children/views.py` y reemplazado las 3 ocurrencias

### 5.3 Verificación de autorización
- [x] **Creado `_autorizar_evaluacion(request, evaluación)`** en `evaluaciones/views.py`
  - Reemplazadas las 5 ocurrencias (registrar_respuesta, registrar_auto_result, registrar_evento_item, manejar_evidencia_item, descargar_evidencia)

### 5.4 Serialización de ResultadoÁrea
- [x] **Creado `_serialize_resultado_area(r)`** en `evaluaciones/views.py`
  - Reemplazadas las 4 ocurrencias (listar_resultados, calcular_puntuación, calcular_puntuación_preliminar, calcular_puntuación_validada)
  - También unificadas las keys con/sin acento (siempre no acentuadas)

### 5.5 Finalización de evaluación
- [x] **Creado `_finalizar_evaluacion(evaluación)`** en `dayc2_flow_service.py`
  - Reemplaza el bloque duplicado (estado PENDING_REVIEW + completed_at + current_item_id)

### 5.6 Frontend: interpretación GDQ unificada
- [x] **Creado `getGdqInterpretation(gdq)`** en `frontend/src/utils/scoring.ts` con 5 niveles estandarizados (130/110/90/80/<80)
- [x] Reemplazado en: `GDQDisplay.tsx`, `DiagnosisDisplay.tsx`, `ResultsTable.tsx`, `ResultAdjustment.tsx`

### 5.7 Frontend: clasificación de puntuación unificada
- [x] **Creado `getScoreCategory(score)`** en `frontend/src/utils/scoring.ts`
- [x] Reemplazado en: `ResultsTable.tsx` y `ResultAdjustment.tsx`

### 5.8 Frontend: helper canvasToBlob
- [x] **Movido a `frontend/src/utils/media.ts`**
- [x] Reemplazado en: `useAutoEvidence.ts`, `MinigameEvidenceProvider.tsx`, `COGNITIVO_045/index.tsx`

### 5.9 Frontend: lógica de join de sesión
- [x] **Creado hook `useSessionJoin()`** en `frontend/src/hooks/useSessionJoin.ts`
- [x] `SessionEntry.tsx` y `SessionAccess.tsx` ahora lo usan

### 5.10 Frontend: verificación de auth
- [x] **Creado hook `useAuthCheck()`** en `frontend/src/hooks/useAuthCheck.ts`
- [x] `ProtectedRoute.tsx` y `PublicRoute.tsx` ahora lo usan

---

## Fase 6: Correcciones React y error handling

### 6.1 Loop de reconexión WebSocket
- [x] **Refactorizado `useEvaluationProgress`**
  - `connectWebSocket` eliminado: la conexión WebSocket se establece una vez dentro de `useEffect` (con cleanup)
  - `progress` se lee vía `progressRef` (sin re-disparar el effect)
  - `setInterval` y WebSocket se cierran juntos en el cleanup

### 6.2 `window.location.href` → React Router
- [x] **Cambiado por `navigate()`** en `EvaluationDetail.tsx:175` (agregado `useNavigate`)

### 6.3 Fire-and-forget sin manejo de errores
- [x] **Agregado `.catch()`** a `recordAdultEvidence()` en `AdultSession.tsx:186`
- [x] **Agregado `.catch()`** a `loadSessionState()` (en initial y en `setInterval`) en `EvaluationSession.tsx`

### 6.4 Dependencias de useEffect faltantes
- [x] **Memoizado** `loadData`, `startPolling`, `stopPolling` con `useCallback` en `EvaluationDetail.tsx`
- [x] **Incluidos en deps** del `useEffect`

### 6.5 Error boundary
- [x] **Creado `ErrorBoundary`** en `frontend/src/components/ErrorBoundary.tsx`
- [x] **Envuelto `<App />`** dentro de `<ErrorBoundary>` en `main.tsx`

### 6.6 Keys en listas
- [x] **Mejorado key** en `DiagnosisDisplay.tsx:54` — usa `paragraph.slice(0, 64)` en vez de `index`

### 6.7 Limpiar console.log/warn
- [x] **Removidos todos los `console.log`** de `EvidenceOrchestrator.tsx` y `MinigameEvidenceProvider.tsx`
- [x] **Creado `utils/logger.ts`** (`devLog.*` que se silencia en producción) para uso futuro
- [x] Conservados `console.warn`/`console.error` (señales legítimas en producción)

### 6.8 Imports inline en backend
- [x] **Eliminados imports inline restantes** en `views.py` (`import json`, `from src.infrastructure.pdf.reporte_generator`)

---

## Fase 7: Mejoras de rendimiento

### 7.1 Backend
- [x] **Índice O(1) de items** en `item_catalog_service.py` — `_index()` cacheado con `lru_cache`
- [x] **Query limitada a 3** en `dayc2_flow_service._has_three_consecutive_fails` — usa `.order_by('-orden')[:3]`
- [x] **Paginación agregada** en:
  - `children/views.py:listar_niños` — helper `_paginate()` con `?page` y `?page_size` (max 200)
  - `evaluaciones/views.py:crear_evaluación` (GET) — reutiliza el mismo helper

### 7.2 Frontend
- [x] **Code splitting con `React.lazy()`** en `App.tsx` para:
  - `PsychologistDashboard`, `MinijuegosTester`, `SessionAccess`, `ReviewPage`, `MetricsDashboard`
  - Bundle principal: 504KB → 456KB
- [x] **Agregado `React.memo`** a:
  - `EvaluationList` — extraído `EvaluationCard` memoizado + `Map` indexado para ninos
  - `EvidenceCard` — wrapeado con `memo()`
- [x] **Arreglado polling sin debounce** — flag `inFlight` en:
  - `EvidenceViewer.tsx` (4s)
  - `EvaluationDetail.tsx` (5s)
- [x] **Sourcemaps solo en dev** en `vite.config.ts` — `sourcemap: process.env.NODE_ENV !== 'production'`

---

## Fase 8: Estructura, convenciones y limpieza final

### 8.1 Archivos fuera de lugar
- [x] **Movido `baremos.py`** a `backend/src/application/scoring/baremos.py`
- [x] **Movido `preguntas_dayc.json`** a `backend/data/`
- [x] **Movidos assets de raíz**:
  - `green dino.svg` → `frontend/src/assets/mascot/dino.svg` (corregido nombre)
  - `greendino.json` → `frontend/src/assets/mascot/dino-lottie.json`

### 8.2 Archivos grandes — dividir
- [x] **Extraído `serializers.py`** (112 líneas) de `evaluaciones/views.py` (857→760 líneas)
  - Todos los helpers (`generar_codigo_sesion`, serializers, autorizar, ensure_session_token, generar_pdf_evaluacion) ahora en `src/api/evaluaciones/serializers.py`
  - `reportes/views.py` actualizado para importar de `serializers`
- [x] **Dividido `EvidenceOrchestrator.tsx`** (521→151 líneas, 71% reducción)
  - Lógica de MediaRecorder/Stream extraída a `useMediaCapture.ts` (235 líneas, hook reutilizable)
  - `useMediaCapture` maneja lifecycle, status (idle/preparing/recording/failed/permission-denied/ready), y cleanup
  - `EvidenceOrchestrator` ahora enfocado en upload + provider

### 8.3 Convenciones de nombres
- [x] **Renombrado `generar_códigoSesión()` → `generar_codigo_sesion()`** (Fase 4)
- [x] **Documentado `Evaluación.psychologist_id` como deprecated** con plan de migración (4 pasos)
  - Agregado `get_evaluación_for_psychologist()` helper en `serializers.py` para centralizar el patrón
  - El cambio a FK se hizo en pasos por compatibilidad (CharField coexiste con comentario de plan)
- [x] **Normalizar keys de API sin acentos** en backend (`_serialize_resultado_area`)
- [x] **Normalizado tipo `Resultado` en frontend** — eliminadas keys duplicadas con/sin acento
- [x] **Usar path alias `@/*`**: **202 imports convertidos** (68 archivos)
  - `tsconfig.json` ya tenía `paths` configurado
  - `vite.config.ts` agregado con `resolve.alias`
  - `vite-env.d.ts` agregado con declaraciones de módulos para `*.png`, `*.jpg`, `*.svg`, `*.webp`

### 8.4 Configuración
- [x] **Movidos a `devDependencies`**: `@tailwindcss/postcss`, `autoprefixer` en `frontend/package.json`
- [x] **`__pycache__/`** en `.gitignore` (Fase 1)
- [x] **Creado `vitest.config.ts`** en `frontend/` con jsdom + setup
- [x] **Creado `tests/setup.ts`** con `@testing-library/jest-dom/vitest`

### 8.5 Tipo `EvaluationTask` duplicado
- [x] **Eliminado `EvaluationTask` duplicado** en `src/minijuegos/types.ts`
- [x] **`TaskDisplay.tsx` actualizado** para importar desde `types/`

### 8.6 Campo `authLoading` sin uso
- [x] **Eliminado `authLoading`** de `frontend/src/store/types.ts` y `authStore.ts`
- [x] **Removidas 4 set** de `authLoading` en login/register

### 8.7 `start.sh` portable
- [x] **Usa `$(dirname "${BASH_SOURCE[0]}")`** en vez de `$HOME/Proyectos/dayc/`
- [x] **Validación** agregada (error si no encuentra backend/frontend)

---

## Resumen de progreso

| Fase | Tareas | Completadas | Estado |
|------|--------|-------------|--------|
| Fase 1: Seguridad y configuración | 12 | 12 | ✅ Completada |
| Fase 2: Código muerto — Backend | 11 | 11 | ✅ Completada |
| Fase 3: Código muerto — Frontend | 12 | 12 | ✅ Completada |
| Fase 4: Corrección de bugs | 14 | 14 | ✅ Completada |
| Fase 5: Código duplicado | 10 | 10 | ✅ Completada |
| Fase 6: React y error handling | 10 | 10 | ✅ Completada |
| Fase 7: Rendimiento | 11 | 11 | ✅ Completada |
| Fase 8: Estructura y convenciones | 14 | 14 | ✅ Completada |
| **Total** | **94** | **94** | ✅ 100% |

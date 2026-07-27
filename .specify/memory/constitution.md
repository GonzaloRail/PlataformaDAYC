<!--
Sync Impact Report
- Version change: (template) -> 1.0.0 (MAJOR: first concrete adoption; template placeholders replaced with project-specific principles)
- Modified principles: all 5 placeholders replaced (PRINCIPLE_1..5)
- Added sections: "Convenciones de Minijuegos Clínicos" (section 2), "Estándares de Calidad y Verificación" (section 3)
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md      -> pending (Constitution Check gates will be derived from this constitution; no change strictly required for v1.0.0)
  - .specify/templates/spec-template.md       -> pending (no mandatory sections added beyond functional/non-functional already present)
  - .specify/templates/tasks-template.md      -> pending (no new task types strictly required; quality-gate tasks may be added per feature)
  - .specify/templates/checklist-template.md  -> pending (quality and minijuego compliance checks can be added per feature)
- Deferred items: none
-->

# DAYC-2 Constitution

## Core Principles

### I. Identidad Consistente del Minijuego (ID Cross-Repo)

El identificador de un minijuego (formato `<AREA>_<NNN>`, p. ej.
`COGNITIVO_031`) DEBE ser idéntico, carácter por carácter, en los cuatro
puntos de cruce del sistema:

- (a) Campo `actividad_digital` en el JSON del catálogo backend
  `backend/src/application/catalog/dayc2_items/<area>.json`.
- (b) Carpeta frontend `frontend/src/minijuegos/<area>/<ITEM_ID>/`.
- (c) Entrada en `frontend/src/components/minijuegos/registry.tsx` con la
  misma `key`.
- (d) Campo `current_task.actividad_digital` devuelto por
  `GET /api/evaluaciones/session/:sessionCode/state/`.

Razón: una sola inconsistencia rompe la carga del minijuego en runtime y
el bug es silencioso (no lanza excepción, simplemente no se monta el
componente). Esta regla convierte la consistencia en una invariante
verificable en CI, no en disciplina manual.

### II. Reuso Obligatorio de Componentes Compartidos

Todo minijuego nuevo DEBE construirse sobre `KidGameShell`
(`frontend/src/components/minijuegos/KidGameShell.tsx`) con
`variant="embedded"`, usar el hook `useMinijuegoSession` para invocar
`onAnswer` exactamente una vez, y el hook `useAutoEvidence` para captura
automática de evidencia.

Componentes adicionales en `frontend/src/minijuegos/shared/`
(`DrawingCanvas`, `TwoPanelActivityLayout`, `useDrawingCanvas`, futuras
mecánicas reutilizables) SOLO viven en `shared/` cuando se usan en dos o
más minijuegos. Si un componente es de un solo juego, DEBE residir
dentro de la carpeta del propio juego (por convención, en `components/`
local). Subir prematuramente a `shared/` es una violación: complica el
blast radius de cambios sin beneficiar a nadie.

Razón: el reuso real reduce duplicación; el reuso aparente la oculta.
La regla del "2 o más" mantiene `shared/` pequeño, opinionado y
probado en producción.

### III. Resultado Trazable vía `onAnswer` y Revisión Profesional

El minijuego DEBE llamar a `onAnswer` con un objeto `Answer` cuyo campo
`resultado` sea estrictamente uno de: `CORRECT`, `ERROR`,
`NOT_APPLICABLE`. La metadata de la respuesta DEBE ser trazable y
declarar su modo de validación.

Política por área:

- **COGNITIVO** (región clínica por defecto): los items nuevos en el
  catálogo JSON arrancan con `requiere_revision_psicologo=true`. La
  metadata de la respuesta DEBE incluir
  `validation: "requires_adult_or_psychologist_review"`. Los tipos de
  evidencia configurados son `LOG` (siempre) más `SCREENSHOT` para
  drag/click o `AUDIO` para narración/habla, según la mecánica.
- Solo se cambia `requiere_revision_psicologo` a `false` cuando la
  validación es 100% determinista y clínicamente inequívoca
  (p. ej. emparejar formas por igualdad visual exacta).
- Cuando `requiere_revision_psicologo=true`, el resultado queda
  pendiente y se gestiona desde
  `frontend/src/pages/psychologist/ReviewPage.tsx` con
  `frontend/src/components/evidence/EvidenceViewer.tsx`.

Razón: en evaluación infantil el falso-positivo ("CORRECT" sin
verificación adulta) tiene coste clínico. La política por defecto
protege al niño; el cambio a automático debe ganarse con evidencia
técnica y clínica, no pedirse por simplicidad.

### IV. Convención Estricta de Rutas y Archivos

Cada minijuego vive en
`frontend/src/minijuegos/<area>/<ITEM_ID>/` con exactamente tres
archivos:

- `index.tsx` — componente con `default export`. Props estrictamente
  `{ currentItem: Item, onAnswer: (a: Answer) => void }`. Ninguna prop
  adicional, ninguna prop opcional. Si un juego necesita más contexto,
  ese contexto va por `currentItem.metadata` o por hooks
  (`useMinijuegoSession`, `useAutoEvidence`).
- `config.ts` — metadatos clínicos inmutables exportados como
  constante `UPPER_SNAKE_CASE_CONFIG` (mecánica, área, evidencia
  esperada, política de revisión).
- `<ITEM_ID>.css` — estilos específicos del juego.

Áreas válidas: `cognitivo`, `comunicacion`, `social_emocional`,
`desarrollo_fisico`, `conducta_adaptativa` (en minúsculas, sin acentos,
alineadas con los nombres de archivo JSON del catálogo).

Razón: una convención rígida de tres archivos permite generar tooling
y checklists automáticos; cualquier desviación se detecta en revisión.

### V. Mecánicas Reusables Configurables

Cuando varios items clínicos comparten mecánica (emparejar figuras,
clasificar en cajas, ordenar elementos, contar, comparar cantidades,
etc.), DEBE crearse un componente reusable configurable por props
ubicado en `frontend/src/minijuegos/shared/`. El `config.ts` de cada
item declara qué mecánica usa y qué configuración clínica particular
aporta.

Mecánicas ya planificadas (catálogo de referencia, no exhaustivo):
`MatchingGame`, `ClassificationGame`, `NumberConceptGame`,
`NumberSequenceGame`, `ComparisonGame`, `CountingGame`,
`NumberMatchGame`, `OrderingGame`, `QuantityGame`,
`StoryNarrationGame`, `SequenceStoryGame`, `SameDifferentGame`,
`OrdinalPositionGame`, `ReadingDirectionGame`, `FractionGame`,
`AbstractAttributeGame`, `CoinsGame`, `ArithmeticGame`.

Razón: la clínica agrupa items por constructo, no por azar; la
arquitectura frontend debe reflejarlo. Cada mecánica reusable reduce
la deuda de mantenimiento y homogeneiza la captura de evidencia.

## Convenciones de Minijuegos Clínicos

- **Modelo de datos backend** (referencia operativa): `Niño`,
  `Evaluación`, `Respuesta`, `Sesión` — todos en español, en
  `backend/src/domain/` siguiendo el patrón DDD del repositorio
  (domain / application / infrastructure / api).
- **Catálogo clínico**: `backend/src/application/catalog/dayc2_items/`
  contiene cinco archivos (`cognitivo.json`, `comunicacion.json`,
  `social_emocional.json`, `desarrollo_fisico.json`,
  `conducta_adaptativa.json`). El servicio
  `backend/src/application/services/item_catalog_service.py` cachea
  estos JSON con `lru_cache`; después de modificar cualquier archivo
  de catálogo, el servidor Django DEBE reiniciarse
  (`python manage.py runserver`) antes de re-probar. Si no se
  reinicia, el endpoint `GET /api/evaluaciones/session/:sessionCode/state/`
  sigue devolviendo contenido cacheado y
  `current_task.actividad_digital` aparece `null` aunque el JSON
  diga lo contrario. Esta regla NO es opcional.
- **Áreas DAYC-2 evaluadas**: `COGNITIVO`, `COMUNICACION`,
  `SOCIAL_EMOCIONAL`, `DESARROLLO_FISICO`, `CONDUCTA_ADAPTATIVA`
  (en MAYÚSCULAS en payloads, en minúsculas en rutas).
- **API**: rutas bajo `/api/auth/`, `/api/children/`,
  `/api/evaluaciones/`, `/api/diagnostico/`, `/api/metricas/`,
  `/api/reportes/`. Respuestas en español, sin acentos en keys.

## Estándares de Calidad y Verificación

- **Frontend**: TypeScript `strict: true` con
  `noUnusedLocals`/`noUnusedParameters`; ESLint
  (`--max-warnings 0`); `npm run build` que ejecuta `tsc && vite build`
  sin errores; `npm run test` con vitest. Path alias `@/*` →
  `src/*` (tsconfig y Vite). Sin `console.log`, sin código muerto, sin
  dependencias no usadas, sin comentarios innecesarios.
- **Backend**: `black .`, `flake8`, `pytest` en verde. Sin
  dependencias no usadas, sin código muerto, sin comentarios
  innecesarios. Logging estructurado en JSON (configurado en
  `settings.py`).
- **Tests**: cada minijuego crítico DEBE tener al menos un test de
  smoke (vitest) que verifique que el componente renderiza con props
  mínimas sin lanzar excepción. Juegos con lógica de validación
  clínica DEBEN tener tests unitarios de la función de evaluación
  pura (sin DOM). Tests en `frontend/tests/unit/`,
  `frontend/tests/e2e/`, `backend/tests/unit/`.
- **Idioma y convenciones**: todo en español (modelos, API, UI, logs,
  commits). snake_case en Python, camelCase en TypeScript para
  variables y funciones, UPPER_SNAKE_CASE para constantes. Sin
  acentos en keys de API.
- **Verificación estándar** antes de merge: `cd frontend && npm run
  lint && npm run build && npm run test`; `cd backend && source
  venv/bin/activate && black --check . && flake8 && pytest`.

## Governance

Esta constitución es la fuente de verdad de las reglas de arquitectura
y calidad del proyecto DAYC-2. Toda especificación (`spec.md`), plan
(`plan.md`), lista de tareas (`tasks.md`) y revisión de código DEBE
verificar cumplimiento contra estos principios antes de ser aceptada.

**Procedimiento de enmienda**:

1. Proponer el cambio en una issue o PR describiendo el principio
   afectado, la motivación y el impacto.
2. Versionar según semver: **MAJOR** para eliminación o redefinición
   incompatible de un principio; **MINOR** para añadir principio o
   sección nueva o expandir materialmente la guía; **PATCH** para
   aclaraciones, correcciones tipográficas o refinamientos no
   semánticos.
3. Documentar el cambio en el Sync Impact Report al tope de este
   archivo (encabezado HTML-coment) y propagar a los templates
   dependientes en `.specify/templates/` si corresponde.
4. Actualizar `LAST_AMENDED_DATE`.

**Revisión de cumplimiento**: cada PR que toque `frontend/src/minijuegos/`,
`frontend/src/components/minijuegos/`,
`backend/src/application/catalog/dayc2_items/` o
`backend/src/application/services/item_catalog_service.py` DEBE
declarar explícitamente qué principios de esta constitución aplica y
cómo los cumple. Las desviaciones requieren justificación documentada
en la sección "Complexity Tracking" del plan, no en commit message.

**Runtime guidance**: para comandos rápidos, convenciones de stack y
arranque del entorno, consultar `AGENTS.md` en la raíz del repositorio.

**Version**: 1.0.0 | **Ratified**: 2026-06-29 | **Last Amended**: 2026-06-29

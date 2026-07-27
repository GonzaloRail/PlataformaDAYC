# Plan Capítulo 3 Mejorado — Elaboración de la Propuesta

> **Estado:** En construcción  
> **Nota:** Todo el contenido previo del Capítulo III se descarta. Este documento es la nueva base.

---

## Estructura final (numeración)

```
3.1  Generalidades
     3.1.1  Descripción de la propuesta
     3.1.2  Delimitación del alcance

3.2  Esquema de la propuesta
     3.2.1  Visión general de las 5 fases
     3.2.2  Diagrama esquemático (para Lucidchart)

3.3  Enfoque metodológico
     3.3.1  Metodología de desarrollo (Scrum + 7 sprints)
     3.3.2  Stack tecnológico
     3.3.3  Principios de diseño (DDD, full-stack desacoplado)

3.4  Fase 1: Análisis del instrumento psicométrico DAYC-2 y especificación
     de requerimientos del sistema
     3.4.1  Revisión del manual metodológico y flujo analógico tradicional
     3.4.2  Identificación de deficiencias operativas del proceso tradicional
     3.4.3  Matriz de clasificación de ítems por criterios de digitalización
     3.4.4  Especificación de requerimientos funcionales (RF-01 a RF-22)
     3.4.5  Especificación de requerimientos no funcionales (RNF-01 a RNF-12)

3.5  Fase 2: Diseño de la arquitectura full-stack y experiencia de usuario
     multidispositivo
     3.5.1  Selección y justificación del stack tecnológico
     3.5.2  Diseño de la arquitectura desacoplada cliente-servidor
     3.5.3  Modelo de persistencia de datos (12 modelos, entidad-relación)
     3.5.4  Flujo de comunicación tripartito (niño ↔ adulto ↔ psicólogo)
     3.5.5  Diseño de interfaces de usuario

3.6  Fase 3: Implementación del ecosistema tecnológico híbrido y semiasistido
     3.6.1  Backend: arquitectura DDD pragmática en 4 capas
     3.6.2  Automatización del core psicométrico (EdadService, Dayc2FlowService, ScoringService)
     3.6.3  Frontend: componentes modulares y sistema de minijuegos (MinijuegoRegistry)
     3.6.4  Sincronización multidispositivo (BroadcastChannel + localStorage + polling)
     3.6.5  Pipeline de generación de reportes PDF con gráficos SVG (WeasyPrint)
     3.6.6  Seguridad y autenticación (sesiones, tokens CSPRNG, rate-limiting)
     3.6.7  Sistema de captura y persistencia de evidencias multimodales

3.7  Fase 4: Validación del sistema mediante pruebas y métricas de calidad
     3.7.1  Estrategia de pruebas unitarias y de integración (pytest + vitest)
     3.7.2  Evaluación de usabilidad del sistema (System Usability Scale - SUS)
     3.7.3  Evaluación de eficiencia operativa (benchmarks de rendimiento)

3.8  Fase 5: Despliegue, documentación y entrega de la sistema web
     3.8.1  Infraestructura de despliegue (Vercel, servidor cloud, PostgreSQL)
     3.8.2  Distribución como Progressive Web App (PWA) multidispositivo
     3.8.3  Gestión del almacenamiento de evidencias y archivos clínicos
     3.8.4  Documentación técnica y manuales de operación
```

---

## Diagrama de texto para Lucidchart

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CAPÍTULO III — ELABORACIÓN DE LA PROPUESTA          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  3.1  GENERALIDADES                                              │  │
│  │  ├── Descripción de la propuesta                                 │  │
│  │  ├── Delimitación del alcance (4:0–5:11, gamificación parcial)   │  │
│  │  └── Plataforma híbrida y modelo semiasistido                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  3.2  ESQUEMA DE LA PROPUESTA  (Visión general de 5 fases)      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  3.3  ENFOQUE METODOLÓGICO                                       │  │
│  │  ├── Scrum (7 sprints iterativos)                                │  │
│  │  ├── Stack: Django 5 + DRF │ React 18 + TS │ PostgreSQL 16      │  │
│  │  └── Principios: DDD pragmático (4 capas), full-stack desacoplado│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│         ┌──────────────────────────┼──────────────────────────┐        │
│         ▼                          ▼                          ▼        │
│  ┌──────────────┐  ┌──────────────────────────┐  ┌──────────────────┐  │
│  │  FASE 1      │  │  FASE 2                  │  │  FASE 3          │  │
│  │  ANÁLISIS    │  │  DISEÑO                  │  │  IMPLEMENTACIÓN  │  │
│  │              │  │                          │  │                  │  │
│  │ M1.1 Manual  │  │ M2.1 Stack tecnológico   │  │ M3.1 Backend DDD │  │
│  │ DAYC-2       │  │ M2.2 Arquitectura        │  │ M3.2 Core psico- │  │
│  │ M1.2 Defic.  │  │ M2.3 Modelo de datos     │  │     métrico      │  │
│  │ operativas   │  │ M2.4 Flujo comunicación  │  │ M3.3 Frontend y  │  │
│  │ M1.3 Matriz  │  │ M2.5 Diseño interfaces   │  │     minijuegos   │  │
│  │ clasif.      │  │                          │  │ M3.4 Sincroniz.  │  │
│  │ M1.4 RF 1-22 │  │                          │  │ M3.5 Reportes PDF│  │
│  │ M1.5 RNF 1-12│  │                          │  │ M3.6 Seguridad   │  │
│  │              │  │                          │  │ M3.7 Evidencias  │  │
│  └──────┬───────┘  └───────────┬──────────────┘  └────────┬─────────┘  │
│         │                      │                          │            │
│         └──────────────────────┼──────────────────────────┘            │
│                                ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  FASE 4                     │  FASE 5                            │  │
│  │  VALIDACIÓN                 │  DESPLIEGUE Y ENTREGA             │  │
│  │                             │                                    │  │
│  │ M4.1 Pruebas unitarias      │ M5.1 Infraestructura (Vercel,      │  │
│  │       e integración         │      cloud, PostgreSQL)            │  │
│  │ M4.2 Evaluación SUS         │ M5.2 Distribución PWA              │  │
│  │ M4.3 Eficiencia operativa   │ M5.3 Almacenamiento evidencias     │  │
│  │                             │ M5.4 Documentación y manuales      │  │
│  └─────────────────────────────┴────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Contenido detallado por módulo

---

### 3.1 Generalidades

- [ ] **3.1.1 Descripción de la propuesta**  
  Máximo 50 palabras. Describir qué hace el sistema web: aplicación del Test DAYC-2
  de forma digital, registro de respuestas, procesamiento automático de puntuaciones
  y generación de reportes para psicólogos. Sin sustituir la observación profesional.

- [ ] **3.1.2 Delimitación del alcance**  
  Rango de edad: 4 años 0 meses a 5 años 11 meses. Gamificación parcial (solo ítems
  digitalizables sin alterar el constructo clínico). El sistema web asiste al
  psicólogo, no lo reemplaza. No es una nueva versión del DAYC-2 ni un mecanismo de
  diagnóstico autónomo.

---

### 3.2 Esquema de la propuesta

- [ ] **3.2.1 Visión general de las 5 fases**  
  Resumen narrativo del flujo completo: análisis → diseño → implementación →
  validación → despliegue. Descripción de una oración por fase.

- [ ] **3.2.2 Diagrama esquemático**  
  Insertar el diagrama de Lucidchart generado a partir del esquema de texto de arriba.

---

### 3.3 Enfoque metodológico

- [ ] **3.3.1 Metodología de desarrollo (Scrum + 7 sprints)**  
  Desarrollo iterativo e incremental con Scrum. Sprints de 2 semanas. Tabla resumen
  de 7 sprints mapeados a fases y entregables. Criterios de aceptación al final de
  cada sprint.

- [ ] **3.3.2 Stack tecnológico**  
  - **Backend:** Python 3.12, Django 5, Django REST Framework, Django Channels
    (WebSocket), PostgreSQL 16
  - **Frontend:** React 18, TypeScript (strict), Vite 5, Tailwind CSS, Zustand,
    Lottie (animaciones), html2canvas, recharts
  - **Infraestructura:** WeasyPrint (PDF), Docker Compose (desarrollo)

- [ ] **3.3.3 Principios de diseño**  
  Diseño Dirigido por el Dominio (DDD) pragmático de 4 capas: dominio, aplicación,
  infraestructura, API. Frontend con separación de responsabilidades: pages,
  components, services, store, hooks, types. Principio YAGNI aplicado en la fusión
  dominio-aplicación.

---

### 3.4 Fase 1: Análisis del instrumento psicométrico DAYC-2 y especificación de requerimientos del sistema

- [ ] **3.4.1 Revisión del manual metodológico y flujo analógico tradicional**  
  Revisión exhaustiva del manual psicométrico oficial. Reconstrucción del flujo
  operativo analógico: administración secuencial con plantillas impresas, materiales
  físicos, registro manual de éxito/fallo por ítem. Cinco dominios evaluados:
  Cognición, Comunicación, Desarrollo Físico, Socio-Emocional, Conducta Adaptativa.

- [ ] **3.4.2 Identificación de deficiencias operativas del proceso tradicional**  
  Tres deficiencias críticas identificadas:
  1. **Cognitiva:** sobrecarga atencional del especialista al alternar entre
     observación del menor y registro escrito.
  2. **Aritmética:** alta propensión al error al cruzar manualmente tablas normativas
     de baremos por edad para calcular el Cociente de Desarrollo General (GDQ).
  3. **Logística:** exigencia de presencia síncrona obligatoria en entorno clínico
     ajeno, pudiendo inducir estrés y comprometer la validez ecológica.

- [ ] **3.4.3 Matriz de clasificación de ítems por criterios de digitalización**  
  Categorización de 127 ítems del rango 4:0–5:11. Criterio: digitalizable (interacción
  táctil en pantalla sin alterar el constructo clínico) vs. manual asistido
  (manipulación física, observación espontánea, reporte del cuidador).

  **Tabla 1 — Distribución por dominio:**

  | Dominio | Total | Digitalizable | Manual | % Digitalizable |
  |---|---|---|---|---|
  | Cognición | 34 | 17 | 17 | 50.0% |
  | Comunicación | 27 | 17 | 10 | 63.0% |
  | Conducta Adaptativa | 24 | 8 | 16 | 33.3% |
  | Desarrollo Físico | 23 | 7 | 16 | 30.4% |
  | Socio-Emocional | 19 | 8 | 11 | 42.1% |
  | **Total** | **127** | **57** | **70** | **44.9%** |

  **Tabla 2 — Ítems representativos (muestra ilustrativa):**

  | Dominio | Ítem | Clasificación | Mecanismo de registro |
  |---|---|---|---|
  | Cognición | Identifica el más grande de dos números | Digitalizable | Minijuego de selección en pantalla |
  | Cognición | Dibuja persona con 6 partes reconocibles | Manual asistido | Observación del psicólogo (evidencia: video) |
  | Comunicación | Dice si dos palabras riman | Digitalizable | Minijuego de selección auditiva |
  | Comunicación | Define 5 palabras simples | Manual asistido | Registro tras evidencia del cuidador |
  | Desarrollo Físico | Copia un cuadrado | Digitalizable | Minijuego de trazado en pantalla táctil |
  | Desarrollo Físico | Salta a la soga solo | Manual asistido | Observación directa (evidencia: video) |
  | Socio-Emocional | Responde al teléfono y recuerda mensaje | Digitalizable | Minijuego simulador de llamada |
  | Socio-Emocional | Espera su turno en juegos grupales | Manual asistido | Reporte del cuidador |
  | Conducta Adaptativa | Cruza la calle con seguridad | Digitalizable | Escena interactiva de cruce peatonal |
  | Conducta Adaptativa | Se amarra las hileras del zapato | Manual asistido | Reporte del cuidador |

  El catálogo completo con justificación individual por ítem va en el Anexo A.

- [ ] **3.4.4 Especificación de requerimientos funcionales (RF-01 a RF-22)**  
  22 requerimientos en 8 categorías, extraídos del prototipo funcional ya construido.
  Cada requerimiento incluye: ID, nombre, descripción funcional y técnica, prioridad.

  | Categoría | RF | Resumen |
  |---|---|---|
  | Seguridad y acceso | RF-01, RF-02 | Autenticación dual (sesiones + tokens), registro y login |
  | Gestión de datos maestros | RF-03, RF-04 | CRUD de perfiles infantiles, creación de evaluaciones con código único |
  | Core psicométrico | RF-05, RF-10, RF-11 | Controlador de flujo + regla de parada, catálogo de 176 ítems, motor de puntuación y baremación |
  | Interfaces de sesión | RF-06 a RF-09, RF-22 | Acceso por código, consentimiento, registro asistido, minijuegos digitales, agente guía GreenDino |
  | Panel de control | RF-12, RF-18, RF-21 | Bandeja de revisión/auditoría, dashboard integral, métricas de uso |
  | Reportabilidad e IA | RF-13 a RF-15 | Reporte PDF, diagnóstico IA, calculadora de puntuaciones |
  | Sincronización | RF-16, RF-17 | Sincronización multidispositivo, telemetría en tiempo real |
  | Evidencias | RF-19, RF-20 | Orquestador de evidencias multitipo, trazabilidad inmutable |

  Tabla completa con las 22 filas detalladas en el documento actual (líneas 514-591).

- [ ] **3.4.5 Especificación de requerimientos no funcionales (RNF-01 a RNF-12)**  
  12 atributos de calidad, cada uno con métrica de aceptación cuantificable.

  | RNF | Atributo | Métrica |
  |---|---|---|
  | RNF-01 | Tiempo de respuesta API | 95% requests < 2 s, timeout a 30 s |
  | RNF-02 | Concurrencia entre paneles | Avance reflejado en < 500 ms en red local |
  | RNF-03 | Persistencia y atomicidad | Cero pérdida de datos en scoring, rollback automático |
  | RNF-04 | Compatibilidad multidispositivo | Funcionamiento 360 px – 1920 px |
  | RNF-05 | Seguridad en sesiones infantiles | Tokens CSPRNG 32 bytes, expiración 7 días, sin accesos no autorizados |
  | RNF-06 | Disponibilidad y tolerancia a fallos | Sin pantallas blancas, error descriptivo con reintento en todos los fallos de red |
  | RNF-07 | Rendimiento de minijuegos | Render < 500 ms, animaciones 30+ fps, sin jank táctil |
  | RNF-08 | Mantenibilidad del código | Cobertura > 60% lógica de negocio, 0 warnings de lint en CI |
  | RNF-09 | Usabilidad y accesibilidad | Navegación completa por teclado, aria-labels, lectores de pantalla |
  | RNF-10 | Escalabilidad del catálogo | Agregar ítem sin cambios en lógica, carga < 100 ms |
  | RNF-11 | Trazabilidad y auditoría | Historial completo reconstruible de cualquier evaluación |
  | RNF-12 | Modos de evaluación flexibles | 3 modos (SYNCHRONOUS, DEFERRED, HYBRID) con pipeline de scoring unificado |

---

### 3.5 Fase 2: Diseño de la arquitectura full-stack y experiencia de usuario multidispositivo

- [ ] **3.5.1 Selección y justificación del stack tecnológico**  
  Análisis comparativo de alternativas y justificación técnica de cada tecnología
  seleccionada:
  - **Django 5 + DRF:** madurez del ecosistema, ORM robusto, soporte nativo para
    autenticación, migraciones y transacciones atómicas requeridas para el scoring
    psicométrico.
  - **React 18 + TypeScript:** renderizado declarativo para interfaces infantiles
    interactivas, ecosistema de hooks para manejo de estado de sesión, tipado estricto
    para prevenir errores en lógica de juego.
  - **PostgreSQL 16:** transaccionalidad ACID, integridad referencial, soporte para
    consultas complejas de scoring y auditoría.
  - **Zustand:** gestión de estado global ligera con patrón de slices (auth, children,
    evaluaciones, UI), sin boilerplate de Redux.
  - **Tailwind CSS:** diseño responsive utility-first con baja fricción para
    breakpoints (360 px a 1920 px).
  - **WeasyPrint:** generación de PDF sin dependencia de navegador, SVG inline.
  - **Django Channels:** WebSocket para telemetría en tiempo real.

- [ ] **3.5.2 Diseño de la arquitectura desacoplada cliente-servidor**  
  Arquitectura en 4 capas (DDD pragmático):
  1. **Capa de dominio** (`domain/`): modelos Django como agregados del dominio
     clínico (Evaluación, Niño, Respuesta, Evidencia).
  2. **Capa de aplicación** (`application/services/`): servicios singleton con la
     lógica de negocio pura (EdadService, Dayc2FlowService, ScoringService,
     ItemCatalogService, baremos.py).
  3. **Capa de infraestructura** (`infrastructure/`): adaptadores externos (generación
     PDF con WeasyPrint, servicio de IA externo).
  4. **Capa de API** (`api/`): vistas DRF y consumidores WebSocket como interfaz de
     transporte HTTP/WS.

  Frontend con patrón de slices:
  - `pages/` — vistas de ruta (login, evaluación, dashboard)
  - `components/` — componentes reutilizables (minijuegos, evidencia, UI shell)
  - `services/` — capa de acceso a API con timeout y manejo de errores
  - `store/` — estado global con Zustand (auth, children, evaluaciones, ui)
  - `hooks/` — lógica de sesión y captura de medios
  - `types/` — definiciones TypeScript compartidas

  Incluir diagrama de arquitectura (generado desde el esquema de texto).

- [ ] **3.5.3 Modelo de persistencia de datos (12 modelos, entidad-relación)**  
  12 modelos organizados alrededor del agregado raíz Evaluación:
  
  | Modelo | Descripción |
  |---|---|
  | Niño | Datos demográficos del menor evaluado (nombre, fecha de nacimiento, tutor) |
  | Evaluación | Sesión de evaluación con código único, estado y timestamps de ciclo de vida |
  | EvaluacionItem | Ítem administrado con estado, resultado, orden y duración |
  | Respuesta | Cada intento de respuesta con fuente, validación, confianza y número de intento |
  | ResultadoArea | Puntuaciones estándar, percentiles, edad equivalente y GDQ por dominio |
  | Evidencia | Archivo multimedia (audio, video, captura) con metadatos y tipo de captura |
  | InteractionEvent | Evento granular de interacción (toques, arrastres) con payload JSON y tiempo relativo |
  | Consentimiento | Registro legal de consentimiento del cuidador con banderas por tipo de evidencia |
  | Diagnóstico | Resultado del servicio de IA externo, vinculado 1:1 a la evaluación |
  | EvidencePolicy | Catálogo configurable de qué tipos de evidencia se requieren por ítem |
  | SessionToken | Token criptográfico temporal para acceso del niño/adulto |
  | User | Modelo nativo de Django para autenticación de psicólogos |

  **Decisiones de diseño relevantes:**
  - `EvaluacionItem ↔ Respuesta` es 1:N, permitiendo reintentos y correcciones
    diferidas con `attempt_number` e `is_final`.
  - `InteractionEvent` captura eventos discretos en JSON (toques, arrastres,
    selecciones), separado de `Evidencia` que almacena archivos binarios.
  - `psychologist_id` como campo de texto, no FK, para que el expediente clínico
    persista aunque la cuenta del especialista sea eliminada.
  - `Evaluacion.modo_evaluacion` soporta 3 modos: SYNCHRONOUS, DEFERRED, HYBRID.

  Incluir diagrama entidad-relación.

- [ ] **3.5.4 Flujo de comunicación tripartito (niño ↔ adulto ↔ psicólogo)**  
  5 pasos secuenciales con tres canales de comunicación distintos:

  | Paso | Actor | Acción | Mecanismo | RF |
  |---|---|---|---|---|
  | 1 | Psicólogo | Genera código de sesión de 6 caracteres | `secrets.choice` CSPRNG | RF-04 |
  | 2 | Adulto | Ingresa código en interfaz unificada | `SessionEntry.tsx`, bifurcación dinámica | RF-06 |
  | 3 | Backend | Valida código, emite `session_token` 32 bytes | `secrets.token_urlsafe()`, header Bearer | RF-01 |
  | 4 | Adulto | Registra respuesta observacional del ítem activo | POST transaccional a API | RF-08 |
  | 5a | Niño | Recibe avance al siguiente ítem | BroadcastChannel + localStorage (cliente-cliente) | RF-16 |
  | 5b | Psicólogo | Recibe telemetría en tiempo real | WebSocket vía Django Channels | RF-17 |

- [ ] **3.5.5 Diseño de interfaces de usuario**  
  **Panel del niño — principio de adecuación al desarrollo (Crescenzi-Lanna, 2022):**
  - Mínimo texto instruccional, iconografía grande, colores simples y contrastados.
  - Sin menús anidados ni navegación jerárquica.
  - Agente guía GreenDino (RF-22): instrucciones dinámicas pre-ítem + refuerzo
    positivo post-respuesta.
  - Shell de minijuego (`KidGameShell`) con progreso, mascota y área interactiva.

  **Panel del adulto/cuidador:**
  - Interfaz de consentimiento digital previo a la sesión.
  - Visualización de instrucciones clínicas del ítem activo.
  - Botones de registro observacional ("Lo logró" / "No lo logró").
  - Notificación en tiempo real del avance de ítem.

  **Dashboard del psicólogo:**
  - Bandeja de evaluaciones con carga perezosa (activas, completadas).
  - Revisión de ítems con reproducción de evidencias.
  - Edición y validación diferida de resultados.
  - Gráficos de perfil psicométrico por dominio.
  - Consola de métricas de uso para investigación.

  Incluir capturas de pantalla de cada panel.

---

### 3.6 Fase 3: Implementación del ecosistema tecnológico híbrido y semiasistido

> **Nota:** Esta sección describe la implementación en prosa, sin incluir código
> fuente. Se describen los algoritmos, estructuras y decisiones de diseño.

- [ ] **3.6.1 Backend: arquitectura DDD pragmática en 4 capas**  
  Descripción de la organización física del servidor:
  ```
  backend/src/
  ├── domain/        → Modelos Django (agregados del dominio clínico)
  ├── application/   → Servicios singleton: EdadService, Dayc2FlowService,
  │                    ScoringService, ItemCatalogService, baremos.py
  ├── infrastructure/ → Adaptadores: ReporteGenerator (PDF), AIService
  └── api/           → Vistas DRF, consumidores WebSocket
  ```

  Justificación de la fusión dominio-aplicación bajo principio YAGNI: al acoplar
  objetos de valor del dominio con el patrón Active Record del ORM de Django, se
  elimina la sobrecarga de serialización de entidades puras con mapeadores intermedios
  (Repository/Data Mapper), optimizando tiempos de respuesta sin comprometer la
  separación de responsabilidades.

- [ ] **3.6.2 Automatización del core psicométrico**  
  **Motor cronológico (EdadService):**
  - Calcula edad exacta del menor (años, meses, días) con aritmética de fechas y
    préstamos dinámicos de unidades temporales (días del mes anterior, meses del año
    anterior).
  - Omite deliberadamente el ajuste por prematurez: clínicamente solo aplica hasta los
    24 meses. La población objetivo (48–71 meses) no lo requiere.

  **Regla de parada por techo (Dayc2FlowService):**
  - Evalúa si los últimos 3 ítems administrados en un área tienen resultado FAIL.
  - Doble ordenamiento descendente (`orden`, `attempt_number`) para recuperar los 3
    intentos más recientes, incluso si el evaluador retrocede para reintentar.
  - Prioridad del juicio clínico sobre la calificación automática: `final_result OR
    system_result`. El psicólogo siempre tiene la última palabra.

  **Pipeline de puntuación transaccional (ScoringService):**
  - Tres fases atómicas con `@transaction.atomic`:
    1. **Purga:** eliminación de cálculos preliminares previos (DELETE).
    2. **Ingesta:** cálculo de puntajes directos, estándar, percentil, edad equivalente
       y nivel de interpretación por dominio (INSERT).
    3. **Sincronización:** consolidación del Cociente de Desarrollo General (GDQ) y
       propagación a todos los registros (UPDATE).
  - Rollback automático ante cualquier excepción (KeyError en baremos, desborde de
    memoria), garantizando que el expediente nunca quede corrupto.

  **Base de conocimiento normativa (baremos.py):**
  - 6,366 líneas de estructuras normativas en memoria.
  - Búsquedas O(1) por índice para puntajes estándar, percentiles y edades
    equivalentes.
  - Cálculo de GDQ en < 1 ms por operar completamente en RAM.

- [ ] **3.6.3 Frontend: componentes modulares y sistema de minijuegos**  
  **MinijuegoRegistry:**
  - Mapa objeto plano que asocia cada ID de ítem digitalizable a un componente React.
  - 19 motores de juego reutilizables: `ClassificationGame` (clasificación
    uni/multicriterio), `MatchingGame` (emparejamiento), `TracingGame` (trazado en
    canvas), `SelectionGame` (selección múltiple), `MemoryGame`, `SequencingGame`,
    `CountingGame`, `ComparisonGame`, `PatternGame`, `SimulationGame`, entre otros.
  - Cada motor se parametriza con contenido distinto (imágenes, categorías, reglas de
    acierto) según el ítem activo — no se programa un componente por ítem.
  - Agregar un ítem solo requiere: entrada JSON en el catálogo + opcionalmente
    registrar un componente en el registry (RNF-10).

  **Ciclo de vida del minijuego:**
  - `useMinijuegoSession`: hook que gestiona el tiempo de respuesta, evita doble
    envío, y expone `answerOnce()` con resultado y metadatos.
  - `KidGameShell`: shell visual con cabecera, progreso, mascota animada, área de
    juego y footer.
  - `PedagogicalMascot` (GreenDino): animación Lottie controlada por estados de
    sesión (talking, idle, celebration).

  **Catálogo de ítems (ItemCatalogService):**
  - Carga en memoria los 176 ítems oficiales del DAYC-2.
  - Indexado por ID (O(1)), agrupado por área.
  - Selección de ítem inicial por edad del menor.

- [ ] **3.6.4 Sincronización multidispositivo**  
  Estrategia en tres capas para comunicación entre panel del adulto y panel del niño
  (mismo origen, potencialmente distintas pestañas/dispositivos):

  1. **Capa principal — BroadcastChannel:** comunicación asíncrona inmediata en
     memoria entre contextos del navegador. Canal `dayc-session-advance`. Latencia
     < 500 ms.
  2. **Capa de fallback — localStorage + StorageEvent:** compatibilidad con
     navegadores que restrinjan canales de difusión o entornos sin soporte
     BroadcastChannel.
  3. **Capa de redundancia — Polling activo:** intervalo de 2,000 ms (`setInterval`)
     que reconcilia el estado contra el endpoint `/api/sessionState` como red de
     seguridad ante cierre del canal por el recolector de basura.

  **Telemetría al psicólogo:** WebSocket vía Django Channels (consumidor
  `SessionConsumer`) para transmitir progreso granular en tiempo real al dashboard.

  **Justificación:** No se usa WebSocket para la sincronización niño↔adulto porque
  BroadcastChannel opera directamente en memoria del navegador, liberando al backend
  de procesar eventos de señalización efímeros y reduciendo la latencia percibida.

- [ ] **3.6.5 Pipeline de generación de reportes PDF con gráficos SVG**  
  **Módulo `ReporteGenerator` (infraestructura):**
  - Construye HTML y CSS inline mediante interpolación directa de cadenas (f-strings
    Python), sin pasar por motor de plantillas (Jinja2/Django templates).
  - Genera gráficos de barras SVG programáticamente: un nodo `<rect>` por dominio
    codificado por color (COGNITIVO = azul, COMUNICACION = rojo, DESARROLLO FISICO =
    verde, SOCIO-EMOCIONAL = naranja, CONDUCTA ADAPTATIVA = púrpura).
  - Interpolación lineal de altura de barra en rango normativo (puntaje estándar 40 a
    160).
  - Línea de referencia en puntaje 100 (promedio normativo).
  - El string HTML+SVG unificado se compila a PDF con WeasyPrint y se sirve como
    descarga.
  - Tiempo de generación < 500 ms.

  **Contenido del reporte:**
  - Datos del menor y de la evaluación.
  - Perfil psicométrico gráfico por dominios.
  - Tabla de puntuaciones (directa, estándar, percentil, edad equivalente,
    interpretación).
  - Cociente de Desarrollo General (GDQ).
  - Tasa de concordancia sistema-psicólogo.
  - Recomendaciones generadas por IA (opcional, parametrizable).

- [ ] **3.6.6 Seguridad y autenticación**  
  **Dos mecanismos de autenticación independientes:**
  1. **Psicólogo:** sesión-cookie Django con `CsrfExemptSessionAuthentication`,
     rate-limiting (bloqueo de 30 s tras 5 intentos fallidos), contraseñas con 4
     validadores estándar de Django. CORS con `CORS_ALLOW_CREDENTIALS=True` y
     orígenes explícitos.
  2. **Niño y adulto:** `session_token` de 32 bytes generado con
     `secrets.token_urlsafe()` (CSPRNG), expiración de 7 días. Transmitido como
     header `Authorization: Bearer <token>`. No requiere contraseña.

  **Código de sesión:** `session_code` de 6 caracteres alfanuméricos generado con
  `secrets.choice` sobre alfabeto de 36 símbolos. Espacio de 36^6 ≈ 2.1 billones
  de combinaciones. Probabilidad de colisión insignificante.

  **Rate-limiting:** 5 intentos fallidos de login → bloqueo de 30 segundos.

- [ ] **3.6.7 Sistema de captura y persistencia de evidencias multimodales**  
  **Captura en frontend:**
  - `MediaPermissionProvider` (contexto React): gestiona permisos de cámara y
    micrófono con `getUserMedia()`, expone stream preparado a componentes hijos.
  - `useMediaCapture` (hook): controla el ciclo de vida del `MediaRecorder`, inicia
    grabación al montar el componente, expone `stop()` que devuelve el Blob final.
  - Tipos de evidencia: `AUDIO`, `VIDEO`, `SCREENSHOT`, `CAMERA_FRAME`, `LOG`,
    `TIME_EVENT`, `SYSTEM_RESULT`.
  - Captura de pantalla vía `html2canvas` bajo demanda.
  - Frame de cámara: extrae un fotograma del stream de video y lo convierte a JPEG.

  **Cola de subida (`EvidenceUploadQueue`):**
  - Singleton que encola evidencias como `FormData` y las sube secuencialmente.
  - Política de reintentos: 1 s de delay entre reintentos, fallback polling a 10 s si
    la cola queda con pendientes.
  - Cada payload incluye: tipo, archivo Blob, duración, metadatos, origen de captura.

  **Persistencia en backend:**
  - Modelo `Evidencia` con `FileField` de Django. Archivos almacenados en `MEDIA_ROOT`
    del servidor.
  - Endpoint de subida: POST multipart a
    `/api/evaluaciones/{id}/items/{itemId}/evidencias/`.
  - `InteractionEvent`: eventos granulares (toques, arrastres, selecciones) con
    timestamp relativo y payload JSON, persistidos en base de datos sin archivos
    binarios.

  **¿Dónde se guardan las evidencias en producción?**
  - Frontend desplegado en Vercel (hosting estático) — no almacena archivos.
  - Backend desplegado en servidor cloud (Railway, Render, EC2, etc.) con volumen
    persistente para `MEDIA_ROOT`.
  - Las evidencias se centralizan en el disco del servidor backend. PostgreSQL
    almacena solo los metadatos (ruta del archivo, tipo, duración, tamaño).
  - Para entornos productivos con múltiples instancias, se recomienda migrar a
    almacenamiento en la nube (S3, Cloud Storage) mediante `django-storages`.

---

### 3.7 Fase 4: Validación del sistema mediante pruebas y métricas de calidad

- [ ] **3.7.1 Estrategia de pruebas unitarias y de integración**  
  **Backend (pytest):**
  - Pruebas unitarias de servicios core: `EdadService.calcular_edad()`,
    `Dayc2FlowService._has_three_consecutive_fails()`, `ScoringService.calcular_resultados()`.
  - Pruebas de integración de endpoints API: creación de evaluación, registro de
    respuestas, scoring, generación de reportes.
  - Pruebas de casos borde: edad en transición de mes, ítems sin respuesta, área sin
    ítems administrados, evaluación sin resultados.
  - Cobertura objetivo: > 60% en lógica de negocio.

  **Frontend (vitest):**
  - Pruebas unitarias de hooks: `useMinijuegoSession`, `useMediaCapture`.
  - Pruebas de componentes: `ClassificationGame`, `MatchingGame`, `KidGameShell`.
  - Pruebas de store (Zustand slices): flujo de autenticación, creación de
    evaluación.

  **Pruebas de integración end-to-end:**
  - Flujo completo: login → crear niño → crear evaluación → ingresar código de sesión
    → registrar respuestas → calcular scoring → generar reporte PDF.

  **Ejecución:** `pytest` en backend, `npm run test` (vitest) en frontend.

- [ ] **3.7.2 Evaluación de usabilidad del sistema (System Usability Scale - SUS)**  
  **Instrumento:** Cuestionario SUS de 10 ítems (escala Likert 1–5), validado
  internacionalmente para medir usabilidad percibida (Brooke, 1996).
  
  **Participantes:** Psicólogos especialistas en desarrollo infantil que utilicen el
  Test DAYC-2 en su práctica profesional.
  
  **Procedimiento:**
  1. Sesión guiada de uso de la sistema web (30 min).
  2. Aplicación del cuestionario SUS.
  3. Entrevista abierta para recoger observaciones cualitativas (opcional).
  
  **Interpretación:** Puntaje SUS ≥ 68 se considera usabilidad aceptable. Puntaje
  ≥ 80.3 se considera excelente (percentil 90, Sauro & Lewis, 2016).

- [ ] **3.7.3 Evaluación de eficiencia operativa**  
  **Métricas de rendimiento del sistema:**
  
  | Métrica | Objetivo | Método de medición |
  |---|---|---|
  | Tiempo de scoring (cálculo GDQ) | < 1 ms | Temporizador Python (`time.perf_counter`) |
  | Tiempo de respuesta API | 95% requests < 2 s | DevTools Network panel + logs del servidor |
  | Latencia de sincronización entre paneles | < 500 ms en red local | `Date.now()` diferencia emisor-receptor |
  | Generación de reporte PDF | < 500 ms | Temporizador en `ReporteGenerator` |
  | Renderizado de minijuego | < 500 ms | React Profiler + `performance.now()` |
  | Animaciones (GreenDino, transiciones) | 30+ fps | `requestAnimationFrame` + frame counter |
  | Carga del catálogo de ítems en memoria | < 100 ms | Temporizador en `ItemCatalogService.__init__` |

  **Métricas de calidad del sistema:**
  
  | Métrica | Objetivo |
  |---|---|
  | Tasa de completitud de evaluaciones | > 90% |
  | Concordancia sistema-psicólogo en scoring | > 95% |
  | Disponibilidad del sistema | > 99% durante el período de evaluación |
  | Tasa de errores de red con reintento exitoso | 100% (todos los errores recuperables) |

---

### 3.8 Fase 5: Despliegue, documentación y entrega de la sistema web

- [ ] **3.8.1 Infraestructura de despliegue**  
  **Frontend (Vercel):**
  - Build: `npm run build` (TypeScript + Vite).
  - Output: SPA estática servida desde CDN global de Vercel.
  - Variables de entorno: `VITE_API_URL` apuntando al backend en producción.
  - Dominio personalizado (opcional).

  **Backend (servidor cloud):**
  - Opciones viables: Railway, Render, Fly.io, AWS EC2, Google Cloud Run.
  - Requisitos: Python 3.12, servidor WSGI/ASGI (Gunicorn + Daphne para WebSocket),
    PostgreSQL 16.
  - Variables de entorno: `DATABASE_URL`, `SECRET_KEY`, `ALLOWED_HOSTS`, `CORS_ORIGINS`,
    `AI_API_KEY`.
  - Comando de despliegue: `gunicorn dayc2.asgi:application -k uvicorn.workers.UvicornWorker`.

  **Base de datos (PostgreSQL 16):**
  - Servicio gestionado: Railway Postgres, Render PostgreSQL, Supabase, AWS RDS.
  - Migraciones automáticas en despliegue: `python manage.py migrate`.

- [ ] **3.8.2 Distribución como Progressive Web App (PWA) multidispositivo**  
  - Service Worker para caché offline de assets estáticos (minijuegos, estilos,
    animaciones).
  - Manifest JSON con nombre, iconos, colores y orientación.
  - Instalable en pantalla de inicio en Android, iOS (Safari "Add to Home Screen"),
    Windows, macOS.
  - Funcionamiento responsive desde 360 px (móvil) hasta 1920 px (escritorio).
  - Eventos táctiles (touch) para tablets y móviles en minijuegos (RNF-04).
  - `prefers-reduced-motion` respetado para accesibilidad (RNF-09).

- [ ] **3.8.3 Gestión del almacenamiento de evidencias y archivos clínicos**  
  **Arquitectura de almacenamiento en producción:**
  - Las evidencias capturadas (audio, video, capturas de pantalla) viajan del
    frontend al backend como `multipart/form-data` a través de la cola
    `EvidenceUploadQueue`.
  - El backend persiste los archivos en el sistema de archivos del servidor mediante
    `FileField` de Django, bajo el directorio configurado en `MEDIA_ROOT`.
  - PostgreSQL almacena únicamente los metadatos: ruta relativa del archivo, tipo de
    evidencia, duración, tamaño en bytes, origen de captura, timestamp.

  **Consideraciones de escalabilidad:**
  - En entornos con una sola instancia, `MEDIA_ROOT` en disco local es suficiente.
  - Para múltiples instancias o alta disponibilidad, se recomienda migrar a
    almacenamiento en la nube (AWS S3, Google Cloud Storage, Cloudflare R2) mediante
    `django-storages`, lo que permite que todas las réplicas accedan al mismo
    repositorio de archivos.

  **Consideraciones de privacidad:**
  - Las evidencias contienen datos sensibles de menores (Ley de Protección de Datos).
  - Acceso restringido por `session_token` y sesión de psicólogo.
  - Se recomienda cifrado en reposo (S3 server-side encryption, LUKS en disco) y en
    tránsito (HTTPS obligatorio en producción).

- [ ] **3.8.4 Documentación técnica y manuales de operación**  
  **Entregables de documentación:**
  1. **Manual técnico:** arquitectura del sistema, estructura de directorios,
     dependencias, configuración de entornos, comandos de despliegue.
  2. **Manual de usuario — Psicólogo:** cómo crear niños, iniciar evaluaciones,
     revisar resultados, generar reportes, interpretar el dashboard.
  3. **Manual de usuario — Cuidador:** cómo ingresar el código de sesión, otorgar
     consentimiento, registrar respuestas observacionales.
  4. **Guía de despliegue:** instrucciones paso a paso para Vercel (frontend) y
     servidor cloud (backend), variables de entorno requeridas, configuración de
     dominio y HTTPS.
  5. **README del repositorio:** quick start, comandos de desarrollo, estructura del
     proyecto (ya existente en AGENTS.md).

  **Código fuente:** disponible en repositorio Git con historial completo de commits
  organizados por sprint y fase.

---

## Cronograma (Gantt)

### Tabla de objetivos y actividades (para copiar a Excel)

| Objetivo (Sprint) | Actividades |
|---|---|
| **Sprint 1 — Analizar el instrumento DAYC-2 y especificar los requerimientos del sistema** | Revisar el manual metodológico oficial del Test DAYC-2 (5 dominios: Cognición, Comunicación, Desarrollo Físico, Socio-Emocional, Conducta Adaptativa) |
| | Reconstruir el flujo operativo del proceso analógico tradicional (administración secuencial, plantillas impresas, registro manual) |
| | Identificar y documentar las tres deficiencias operativas críticas: sobrecarga atencional, error aritmético en baremos, limitación logística síncrona |
| | Clasificar los 127 ítems del rango 4:0–5:11 según criterio de digitalización (digitalizable vs. manual asistido) |
| | Construir la matriz de clasificación con distribución porcentual por dominio (Cognición 50%, Comunicación 63%, Conducta Adaptativa 33%, Desarrollo Físico 30%, Socio-Emocional 42%) |
| | Elaborar tabla de ítems representativos con justificación individual del criterio aplicado |
| | Especificar los 22 requerimientos funcionales en 8 categorías (seguridad, datos maestros, core psicométrico, interfaces, panel, reportes, sincronización, evidencias) |
| | Especificar los 12 requerimientos no funcionales con métrica de aceptación cuantificable por cada uno |
| **Sprint 2 — Diseñar la arquitectura full-stack y la experiencia de usuario multidispositivo** | Seleccionar y justificar cada tecnología del stack (Django 5, React 18, PostgreSQL 16, Vite 5, Tailwind CSS, Zustand, WeasyPrint, Django Channels) |
| | Diseñar la arquitectura desacoplada en 4 capas DDD: dominio, aplicación, infraestructura, API |
| | Diseñar la estructura del frontend con patrón de slices: pages, components, services, store, hooks, types |
| | Modelar las 12 entidades de persistencia con sus relaciones (Niño, Evaluación, EvaluacionItem, Respuesta, ResultadoArea, Evidencia, InteractionEvent, Consentimiento, Diagnóstico, EvidencePolicy, SessionToken, User) |
| | Elaborar el diagrama entidad-relación completo |
| | Diseñar el flujo de comunicación tripartito en 5 pasos: generación de código → ingreso → validación → registro → sincronización |
| | Definir los 3 canales de comunicación: API REST (cliente↔servidor), BroadcastChannel (niño↔adulto), WebSocket (servidor→psicólogo) |
| | Diseñar la interfaz del panel del niño bajo el principio de adecuación al desarrollo (Crescenzi-Lanna, 2022) |
| | Diseñar la interfaz del panel del adulto (consentimiento, registro observacional) |
| | Diseñar el dashboard del psicólogo (bandeja, revisión, validación diferida, métricas) |
| | Diseñar el agente guía pedagógico GreenDino (instrucciones pre-ítem + refuerzo post-respuesta) |
| **Sprint 3 — Implementar el backend y el core psicométrico** | Implementar la capa de dominio con modelos Django: Niño, Evaluación, EvaluacionItem, Respuesta, ResultadoArea, Evidencia, InteractionEvent, Consentimiento, Diagnóstico, EvidencePolicy, SessionToken |
| | Implementar los 11 estados del ciclo de vida de Evaluación con timestamps de transición |
| | Implementar el servicio EdadService: cálculo cronológico con préstamos dinámicos de días y meses, omisión del ajuste por prematurez |
| | Implementar el catálogo ItemCatalogService: carga en memoria de 176 ítems indexados por ID (O(1)) y agrupados por área |
| | Implementar el motor de flujo Dayc2FlowService: selección de ítem inicial por edad, regla de parada por 3 fallos consecutivos, prioridad del juicio clínico |
| | Implementar el motor de puntuación ScoringService: pipeline transaccional en 3 fases (purga, ingesta, sincronización GDQ) con @transaction.atomic |
| | Cargar la base de conocimiento normativa baremos.py (6,366 líneas de tablas de baremos en memoria) |
| | Implementar la capa de API REST con DRF: endpoints de niños, evaluaciones, respuestas, evidencias, scoring, reportes |
| | Implementar autenticación dual: sesiones Django para psicólogos + token Bearer CSPRNG para niño/adulto |
| | Implementar rate-limiting en login (bloqueo 30 s tras 5 intentos fallidos) |
| | Implementar WebSocket con Django Channels para telemetría en tiempo real al dashboard |
| **Sprint 4 — Implementar el frontend y el sistema de minijuegos** | Configurar proyecto Vite 5 + React 18 + TypeScript strict + Tailwind CSS + Zustand |
| | Implementar store global con 4 slices de Zustand: authStore, childrenStore, evaluacionesStore, uiStore |
| | Implementar capa de servicios API con wrapper fetch (timeout 30 s, AbortController, manejo de errores) |
| | Implementar pantallas de ruta: Login, ChildEntry, EvaluationSession, AdultSession, PsychologistDashboard |
| | Implementar SessionEntry: validación de código de 6 caracteres y bifurcación dinámica niño/adulto |
| | Implementar flujo de consentimiento digital en panel del adulto (validación de datos, checkboxes por tipo de evidencia) |
| | Implementar los 19 motores de minijuegos reutilizables: ClassificationGame, MatchingGame, TracingGame, SelectionGame, MemoryGame, SequencingGame, CountingGame, ComparisonGame, PatternGame, SimulationGame, etc. |
| | Implementar MinijuegoRegistry: mapa de ID de ítem → componente React parametrizable |
| | Implementar KidGameShell: shell visual con cabecera, progreso, mascota, área de juego y footer |
| | Implementar PedagogicalMascot (GreenDino): animación Lottie controlada por estados de sesión |
| | Implementar hook useMinijuegoSession: gestión de tiempo de respuesta, prevención de doble envío |
| | Implementar diseño responsive: sidebar colapsable (breakpoint 1100 px), 100dvh en layout, viewport meta tag |
| | Implementar accesibilidad básica: aria-labels, role="status", role="alert", navegación por teclado, prefers-reduced-motion |
| **Sprint 5 — Implementar la sincronización, reportes y sistema de evidencias** | Implementar sincronización multidispositivo en 3 capas: BroadcastChannel → localStorage/StorageEvent → polling 2 s |
| | Implementar canal dayc-session-advance con payload JSON { sessionCode, itemId, timestamp } |
| | Implementar pipeline de reportes PDF con ReporteGenerator: HTML inline + SVG programático + WeasyPrint |
| | Implementar gráfico de barras SVG con 5 dominios codificados por color y línea de referencia normativa (puntaje 100) |
| | Implementar MediaPermissionProvider (contexto React): permisos cámara/micrófono con getUserMedia() |
| | Implementar useMediaCapture (hook): ciclo de vida de MediaRecorder, captura de frame de cámara vía canvas |
| | Implementar MediaPermissionPanel: UI de solicitud de permisos con reintentos |
| | Implementar EvidenceUploadQueue: cola singleton de subida secuencial con reintentos y fallback polling |
| | Implementar captura de 7 tipos de evidencia: AUDIO, VIDEO, SCREENSHOT, CAMERA_FRAME, LOG, TIME_EVENT, SYSTEM_RESULT |
| | Implementar modelo Evidencia en backend con FileField y endpoint multipart de subida |
| | Implementar InteractionEvent: eventos granulares con payload JSON y timestamp relativo |
| | Implementar servicio de diagnóstico IA (AIService): integración modular con API externa, parametrizable por entorno |
| | Implementar ErrorBoundary global + ViewState (loading, empty, error) en frontend |
| **Sprint 6 — Validar el sistema con pruebas y métricas de calidad** | Escribir pruebas unitarias backend: EdadService (casos borde de fechas, transición de mes/año) |
| | Escribir pruebas unitarias backend: Dayc2FlowService (regla de parada, prioridad final_result, ordenamiento) |
| | Escribir pruebas unitarias backend: ScoringService (integridad transaccional, rollback ante KeyError) |
| | Escribir pruebas unitarias backend: baremos.py (consistencia de puntajes estándar, percentiles, GDQ) |
| | Escribir pruebas de integración backend: API endpoints (crear evaluación, registrar respuestas, scoring, reporte) |
| | Escribir pruebas unitarias frontend: useMinijuegoSession, useMediaCapture |
| | Escribir pruebas unitarias frontend: ClassificationGame, MatchingGame, KidGameShell |
| | Ejecutar suite completa: pytest backend + vitest frontend, verificar cobertura > 60% |
| | Diseñar y aplicar cuestionario SUS de 10 ítems a psicólogos especialistas |
| | Medir tiempos de scoring (< 1 ms), sincronización (< 500 ms), generación PDF (< 500 ms), renderizado minijuegos (< 500 ms) |
| | Medir tasa de completitud de evaluaciones (> 90%) y concordancia sistema-psicólogo (> 95%) |
| | Documentar resultados de validación para el Capítulo IV |
| **Sprint 7 — Desplegar y documentar la sistema web** | Configurar despliegue del frontend en Vercel con variables de entorno (VITE_API_URL) |
| | Configurar despliegue del backend en servidor cloud (Gunicorn + Daphne + PostgreSQL) |
| | Configurar dominio, HTTPS y política CORS para producción |
| | Configurar Service Worker y manifest.json para distribución PWA |
| | Verificar funcionamiento responsive en dispositivos reales (móvil 360 px, tablet 768 px, escritorio 1920 px) |
| | Probar flujo completo multidispositivo en entorno de producción |
| | Redactar manual técnico (arquitectura, dependencias, comandos, configuración) |
| | Redactar manual de usuario — Psicólogo (gestión de niños, evaluaciones, revisión, reportes) |
| | Redactar manual de usuario — Cuidador (código de sesión, consentimiento, registro de respuestas) |
| | Redactar guía de despliegue (paso a paso para Vercel + servidor cloud) |

---

## Progreso

| Sección | Estado |
|---|---|
| 3.1 Generalidades | ⬜ Pendiente |
| 3.2 Esquema de la propuesta | ⬜ Pendiente |
| 3.3 Enfoque metodológico | ⬜ Pendiente |
| 3.4 Fase 1: Análisis | ⬜ Pendiente |
| 3.5 Fase 2: Diseño | ⬜ Pendiente |
| 3.6 Fase 3: Implementación | ⬜ Pendiente |
| 3.7 Fase 4: Validación | ⬜ Pendiente |
| 3.8 Fase 5: Despliegue | ⬜ Pendiente |
| Cronograma Gantt | ⬜ Pendiente |
| Diagrama Lucidchart | ⬜ Pendiente |

---

## Anexos referenciados

| Anexo | Contenido | Estado |
|---|---|---|
| Anexo A | Catálogo completo de 127 ítems con justificación individual de clasificación | ⬜ Pendiente |
| Anexo B | Detalle de los 12 modelos con todos sus campos, tipos y restricciones | ⬜ Pendiente |
| Anexo C | Tabla completa de RF-01 a RF-22 con descripciones extensas | ⬜ Pendiente |
| Anexo D | Tabla completa de RNF-01 a RNF-12 con métricas de aceptación | ⬜ Pendiente |

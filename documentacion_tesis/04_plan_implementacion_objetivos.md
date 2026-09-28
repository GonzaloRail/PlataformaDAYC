# Plan maestro de implementación y validación de la arquitectura distribuida

## 1. Control del documento

| Campo | Valor |
|---|---|
| Documento | Plan maestro de implementación y validación |
| Proyecto | Arquitectura distribuida orientada a eventos para procesos multi-actor con evidencias multimodales |
| Versión inicial | 1.0 |
| Estado | Propuesto para ejecución |
| Número de fases | 10 |
| Fecha de creación | 2026-09-10 |
| Documentos relacionados | `01_matriz_cobertura.md`, `02_variables_indicadores.md`, `03_protocolo_validacion.md` |
| Código relacionado | `backend/`, `frontend/` |

### 1.1 Propósito

Este documento convierte los objetivos de investigación y las brechas identificadas en un plan de trabajo ejecutable, trazable y supervisable. Cada fase contiene tareas con checkbox, entregables, pruebas, evidencias y una puerta de salida que debe cumplirse antes de iniciar la fase dependiente.

El plan cubre la finalización técnica del artefacto, su instrumentación, la evaluación confirmatoria y la exploración de factibilidad con cuidadores y profesionales. La ejecución deberá mantener separados los resultados técnicos de los resultados obtenidos con participantes.

### 1.2 Decisiones de alcance

- El artefacto se preparará para un piloto reproducible, no para un despliegue clínico productivo de alta disponibilidad.
- PostgreSQL será la fuente de verdad durable del estado y de las operaciones.
- Redis y Django Channels se usarán como mecanismos de transporte y notificación, no como única fuente de eventos.
- La captura offline se extenderá a todas las operaciones críticas, no solamente a archivos de evidencia.
- Las evidencias originales serán inmutables y los derivados se almacenarán como activos independientes y versionados.
- El modelo de proveniencia será compatible conceptualmente con entidades, actividades, agentes y relaciones de derivación.
- No se inferirá consentimiento o asentimiento desde la conducta observada.
- La interpretación clínica final seguirá siendo responsabilidad del profesional autorizado.
- El módulo de diagnóstico automatizado existente se deshabilitará o aislará en todos los ambientes de tesis, incluidas rutas, interfaz, reportes, persistencia y modelos, y su exclusión se demostrará mediante pruebas negativas.
- Los ensayos de carga y fallos utilizarán exclusivamente datos sintéticos.
- El estudio con personas solo podrá iniciarse después de la aprobación del comité de ética y de la autorización institucional que correspondan.

### 1.3 Uso de los checkboxes

- `[ ]` significa que la tarea no ha sido demostrada como terminada.
- `[x]` significa que existe una evidencia verificable de cumplimiento.
- Una tarea no se marca por tener código escrito; se marca después de superar revisión, pruebas y documentación.
- Cada checkbox cerrado debe apuntar a una ruta, prueba, informe, captura, hash o acta dentro del registro de ejecución.
- Si una tarea deja de ser aplicable, no debe borrarse. Debe registrarse como `N/A` con justificación y aprobación.
- Si una tarea cambia después del congelamiento confirmatorio, se invalida la ejecución afectada y se registra una nueva versión del protocolo.

### 1.4 Estructura de evidencias de ejecución

Durante la ejecución se creará y mantendrá la siguiente estructura:

```text
documentacion_tesis/
  evidencias_ejecucion/
    fase_01/
    fase_02/
    fase_03/
    fase_04/
    fase_05/
    fase_06/
    fase_07/
    fase_08/
    fase_09/
    fase_10/
    registro_decisiones.md
    registro_riesgos.md
    registro_cambios.md
    matriz_cumplimiento.csv
```

Cada carpeta de fase deberá contener, como mínimo, un `README.md` con fecha, responsable, versión de código, tareas cerradas, tareas abiertas, comandos ejecutados, resultados, defectos conocidos y decisión de aprobación o rechazo de la puerta de salida.

## 2. Estado inicial

El sistema ya cuenta con una base funcional que debe conservarse y endurecerse:

- Frontend React con vistas diferenciadas para niño, adulto y profesional.
- Backend Django, Django REST Framework y Django Channels.
- PostgreSQL como base principal.
- Redis como channel layer.
- Comunicación WebSocket y sondeo REST de respaldo.
- Máquina básica de estados de evaluación.
- Tokens de sesión con roles `CHILD` y `ADULT`.
- Control optimista de versión en una parte de las mutaciones.
- Captura de logs, eventos, capturas, audio, video y frames.
- Cola IndexedDB para algunas evidencias.
- Claves de idempotencia para evidencias y respuestas seleccionadas.
- Revisión profesional por ítem.
- Documentación de indicadores, escenarios y protocolo de validación.

Las brechas principales que justifican este plan son:

- Identidad y autorización insuficientes para cuidadores y profesionales.
- Consentimiento no granular.
- Ausencia de asentimiento, pausa y retiro ejecutables.
- Idempotencia, orden y control de conflictos no uniformes.
- Offline limitado y fallos de IndexedDB silenciosos.
- Ausencia de registro durable y reproducible de operaciones.
- Ausencia de originales y derivados formalmente separados.
- Ausencia de hashes, versiones y controles completos de calidad.
- Ausencia de un modelo de proveniencia y consulta de linaje.
- Cierre profesional eludible desde ciertos endpoints.
- Telemetría insuficiente para los indicadores de investigación.
- Falta de herramientas de carga, fallos, replay y convergencia.
- Umbrales técnicos todavía pendientes de congelamiento.
- Ausencia de resultados confirmatorios y de estudio humano ejecutado.

## 3. Trazabilidad general

| Objetivo | Fases principales | Resultado esperado |
|---|---|---|
| Objetivo principal | 1-10 | Artefacto implementado y evaluado con evidencia reproducible |
| Objetivo específico 1 | 1-2 | Actores, estados, eventos, responsabilidades e invariantes formalizados |
| Objetivo específico 2 | 3-4 | Sincronización durable, offline, causal, idempotente y convergente |
| Objetivo específico 3 | 5-7 | Pipeline multimodal, proveniencia, gobernanza y cierre profesional no eludible |
| Objetivo específico 4 | 8-9 | Pruebas funcionales, carga, fallos, replay y trazas con datos sintéticos |
| Objetivo específico 5 | 9 | Resultados técnicos por dimensión y escenarios no conformes |
| Objetivo específico 6 | 10 | Estudio de uso separado del contraste técnico |

### 3.1 Mapa técnico previsto

Esta tabla orienta la exploración inicial de cada fase. Las rutas nuevas son propuestas y podrán ajustarse mediante un registro de decisión sin cambiar el resultado exigido.

| Fase | Backend | Frontend | Infraestructura y documentación |
|---|---|---|---|
| 1 | Modelos, máquinas de estado, servicios de flujo y pruebas de contrato | Rutas, roles, stores y flujos de sesión | Diagramas, catálogo de eventos y ADR |
| 2 | Autenticación, permisos, consentimiento, auditoría y retención | Consentimiento granular, asentimiento, pausa y retiro | TLS, secretos, modelo de amenazas y política ética |
| 3 | Registro de operaciones, inbox, outbox, sincronización y consumers | Cliente de sincronización y contratos API | PostgreSQL, Redis, worker y healthchecks |
| 4 | Endpoints de cursor, snapshot y conflictos | IndexedDB, cola común, service worker y estados de sincronización | Pruebas de navegador y escenarios de red |
| 5 | Activos, transformaciones, calidad y jobs | Captura, estado de carga y visualización de calidad | MinIO, backups, restauración y validadores multimedia |
| 6 | Entidades, actividades, agentes y consultas de linaje | Visor de proveniencia | Oráculo y exportaciones versionadas |
| 7 | Asignación, decisiones, cierre e informes | Cola profesional y revisión por ítem | SLA, auditoría y pruebas negativas |
| 8 | Instrumentación, métricas y exportadores | Trazas cliente y telemetría de sincronización | OpenTelemetry, Prometheus, Grafana, Locust y Toxiproxy |
| 9 | Congelamiento y exportación de resultados | Instrumentos autorizados de campo | Matrices, actas, análisis y anexos reproducibles |

## 4. Reglas globales de ejecución

### 4.1 Definición global de terminado

Una tarea técnica solo se considera terminada cuando cumple todos los puntos aplicables:

- [ ] El contrato o comportamiento esperado está documentado.
- [ ] El código y las migraciones están implementados.
- [ ] Existen pruebas positivas, negativas y de autorización.
- [ ] Las pruebas relevantes pasan en un entorno limpio.
- [ ] El lint, typecheck y formato pasan.
- [ ] Los logs no exponen datos sensibles.
- [ ] La documentación técnica y de usuario fue actualizada.
- [ ] La evidencia de ejecución se almacenó en la carpeta de la fase.
- [ ] Los defectos residuales y riesgos fueron registrados.
- [ ] La puerta de salida fue revisada y aprobada.

### 4.2 Comandos base de verificación

```bash
cd frontend && npm run lint && npm run build && npm run test
cd backend && source venv/bin/activate && python -m black --check . && python -m flake8 && python -m pytest
```

Las fases 3 a 9 añadirán comandos específicos de integración, workers, almacenamiento, carga, inyección de fallos y análisis estadístico.

### 4.3 Gestión de cambios

- [ ] Crear un registro de decisiones arquitectónicas.
- [ ] Crear un registro de riesgos con probabilidad, impacto, responsable y mitigación.
- [ ] Crear una matriz requisito-tarea-prueba-evidencia.
- [ ] Registrar migraciones destructivas y su estrategia de respaldo.
- [ ] Mantener datos de prueba separados de cualquier dato de participantes.
- [ ] Versionar contratos API, eventos, metadatos y transformaciones.
- [ ] No modificar umbrales confirmatorios después del acta de congelamiento.
- [ ] Registrar cualquier desviación respecto al protocolo aprobado.

### 4.4 Ciclo obligatorio de ejecución de cada fase

Cada orden de ejecución de fase deberá seguir este ciclo:

1. Revisar la puerta de entrada, dependencias y riesgos abiertos.
2. Registrar commit inicial, configuración, responsable y fecha.
3. Ejecutar pruebas base para detectar fallos preexistentes.
4. Implementar las tareas en el orden indicado por sus dependencias.
5. Crear o actualizar migraciones, contratos y documentación.
6. Ejecutar pruebas unitarias después de cada bloque funcional.
7. Ejecutar pruebas de integración y escenarios negativos de la fase.
8. Ejecutar lint, formato, typecheck y build.
9. Guardar comandos, versiones, resultados y artefactos en `evidencias_ejecucion/fase_XX/`.
10. Revisar cada checkbox y marcar únicamente los respaldados por evidencia.
11. Evaluar la puerta de salida y registrar la decisión.
12. Actualizar la tabla de avance, riesgos y cambios antes de iniciar la siguiente fase.

Si la puerta de salida falla, la fase permanece `En curso` o `Bloqueada`; no debe marcarse como completada por porcentaje de tareas.

## 5. Fase 1: contrato de dominio y arquitectura

### 5.1 Objetivo

Formalizar actores, responsabilidades, estados, eventos, reglas, invariantes y límites del artefacto para eliminar ambigüedades antes de modificar sincronización, evidencias o revisión.

### 5.2 Dependencias

Esta fase no tiene dependencias técnicas previas. Debe utilizar como insumo `01_matriz_cobertura.md`, `02_variables_indicadores.md`, `03_protocolo_validacion.md` y el comportamiento real del frontend y backend.

### 5.3 Tareas de análisis y dominio

- [ ] `F1-T01` Inventariar todos los actores implementados y propuestos.
- [ ] `F1-T02` Definir identidad, responsabilidad, permisos y límites del participante; documentar su correspondencia con el niño solo en el perfil del caso.
- [ ] `F1-T03` Definir identidad, responsabilidad, permisos y límites del facilitador; documentar su correspondencia con el cuidador solo en el perfil del caso.
- [ ] `F1-T04` Definir identidad, responsabilidad, permisos y límites del revisor asignado.
- [ ] `F1-T05` Definir identidad, responsabilidad, permisos y límites del revisor de calidad.
- [ ] `F1-T06` Definir los servicios automáticos como agentes técnicos auditables.
- [ ] `F1-T07` Definir responsable técnico, responsable ético y revisor independiente para la evaluación.
- [ ] `F1-T08` Crear la matriz actor-operación-recurso-estado.
- [ ] `F1-T09` Identificar datos clínicos, personales, técnicos y de investigación.
- [ ] `F1-T10` Clasificar cada dato por sensibilidad, propietario, custodio, finalidad y retención.

### 5.4 Tareas de estados y transiciones

- [ ] `F1-T11` Definir la máquina de estados completa de la evaluación.
- [ ] `F1-T12` Incorporar estados explícitos de espera de asentimiento, pausa, retiro, recepción y revisión.
- [ ] `F1-T13` Definir la máquina de estados de cada ítem.
- [ ] `F1-T14` Definir la máquina de estados de las operaciones sincronizables.
- [ ] `F1-T15` Definir la máquina de estados de evidencias y transformaciones.
- [ ] `F1-T16` Definir la máquina de estados de asignación y revisión profesional.
- [ ] `F1-T17` Documentar precondiciones y efectos de cada transición.
- [ ] `F1-T18` Documentar transiciones prohibidas y respuesta esperada.
- [ ] `F1-T19` Definir qué transiciones requieren transacción atómica.
- [ ] `F1-T20` Crear pruebas de contrato para todas las transiciones.

### 5.5 Tareas de eventos e invariantes

- [ ] `F1-T21` Crear un catálogo único de comandos y eventos.
- [ ] `F1-T22` Definir versión de esquema para cada evento.
- [ ] `F1-T23` Definir actor emisor, agregado, payload y efecto de cada evento.
- [ ] `F1-T24` Clasificar eventos como reintentables, ordenables, sensibles o irreversibles.
- [ ] `F1-T25` Definir invariantes de consentimiento, asentimiento, pausa y retiro.
- [ ] `F1-T26` Definir invariantes de idempotencia, orden, conflicto y convergencia.
- [ ] `F1-T27` Definir invariantes de original, derivado, integridad y proveniencia.
- [ ] `F1-T28` Definir invariantes de recepción, revisión y cierre profesional.
- [ ] `F1-T29` Diferenciar resultado del sistema, decisión profesional y resultado final.
- [ ] `F1-T30` Documentar el alcance MVP de las reglas de la instanciación y las reglas completas pendientes.

### 5.6 Entregables

- [ ] `F1-E01` Diagrama de contexto y actores.
- [ ] `F1-E02` Diagrama de componentes actuales y objetivo.
- [ ] `F1-E03` Matriz de actores y permisos.
- [ ] `F1-E04` Diagramas de estado.
- [ ] `F1-E05` Catálogo versionado de comandos y eventos.
- [ ] `F1-E06` Diccionario de datos y clasificación de sensibilidad.
- [ ] `F1-E07` Matriz requisito-invariante-prueba.
- [ ] `F1-E08` Registros de decisión sobre estado canónico, eventos y diagnóstico excluido.

### 5.7 Puerta de salida

- [ ] `F1-G01` Todas las operaciones actuales tienen actor, permiso, estado previo y efecto definidos.
- [ ] `F1-G02` No se reutiliza un estado para significados incompatibles.
- [ ] `F1-G03` Todos los eventos críticos tienen esquema y versión.
- [ ] `F1-G04` Cada indicador técnico apunta a requisitos verificables.
- [ ] `F1-G05` La fase fue revisada por responsable técnico y responsable metodológico.

## 6. Fase 2: gobernanza ética, identidad y seguridad

### 6.1 Objetivo

Implementar controles no eludibles de identidad, autorización, consentimiento, asentimiento, pausa, retiro, auditoría, privacidad y retención.

### 6.2 Dependencias

- [ ] Fase 1 aprobada.
- [ ] Matriz de actores y permisos congelada para esta iteración.
- [ ] Estados de consentimiento, asentimiento, pausa y retiro definidos.

### 6.3 Identidad y autorización

- [ ] `F2-T01` Separar la cuenta de usuario de la condición de profesional autorizado.
- [ ] `F2-T02` Implementar invitación, aprobación o verificación de profesionales.
- [ ] `F2-T03` Impedir que el registro público otorgue privilegios profesionales.
- [ ] `F2-T04` Asociar evaluaciones con una identidad profesional referencialmente íntegra.
- [ ] `F2-T05` Definir emisión controlada de credenciales de cuidador.
- [ ] `F2-T06` Impedir la autoasignación arbitraria del rol `ADULT`.
- [ ] `F2-T07` Definir permisos por operación y por recurso.
- [ ] `F2-T08` Aplicar mínimo privilegio a niño, cuidador, profesional y servicios.
- [ ] `F2-T09` Implementar revocación de tokens de dispositivo.
- [ ] `F2-T10` Implementar expiración y rotación controlada de credenciales.
- [ ] `F2-T11` Añadir rate limiting y bloqueo temporal para códigos de sesión.
- [ ] `F2-T12` Añadir pruebas de acceso cruzado entre profesionales.
- [ ] `F2-T13` Añadir pruebas de escalamiento de privilegios.

### 6.4 Consentimiento y asentimiento

- [ ] `F2-T14` Diseñar un consentimiento granular por modalidad.
- [ ] `F2-T15` Guardar versión y hash del texto presentado.
- [ ] `F2-T16` Registrar finalidad, alcance, vigencia, custodio y responsable.
- [ ] `F2-T17` Permitir aceptar o rechazar audio, video, capturas y derivados por separado.
- [ ] `F2-T18` Aplicar el alcance del consentimiento en backend, no solo en UI.
- [ ] `F2-T19` Implementar un registro de asentimiento infantil adecuado al protocolo.
- [ ] `F2-T20` Implementar checkpoints de asentimiento durante la sesión.
- [ ] `F2-T21` Permitir que el adulto registre rechazo o incomodidad sin inferencia automática.
- [ ] `F2-T22` Registrar quién presentó y quién confirmó cada autorización.
- [ ] `F2-T23` Probar que ninguna modalidad no autorizada puede capturarse o cargarse.

### 6.5 Pausa y retiro

- [ ] `F2-T24` Implementar transición explícita a `PAUSED`.
- [ ] `F2-T25` Implementar reanudación autorizada y auditada.
- [ ] `F2-T26` Detener captura y procesamiento al confirmar la pausa.
- [ ] `F2-T27` Implementar solicitud de retiro parcial y total.
- [ ] `F2-T28` Definir alcance del retiro por sesión, modalidad, evidencia o uso futuro.
- [ ] `F2-T29` Bloquear nuevas capturas después del retiro.
- [ ] `F2-T30` Cancelar operaciones y transformaciones pendientes afectadas.
- [ ] `F2-T31` Propagar retiro a originales, derivados, exportaciones y respaldos según política.
- [ ] `F2-T32` Registrar eliminación, anonimización, conservación justificada o imposibilidad técnica.
- [ ] `F2-T33` Probar carreras entre pausa o retiro y captura concurrente.

### 6.6 Seguridad y privacidad

- [ ] `F2-T34` Restablecer protección CSRF para autenticación de sesión.
- [ ] `F2-T35` Configurar cookies seguras y política `SameSite` apropiada.
- [ ] `F2-T36` Configurar HTTPS para el entorno piloto.
- [ ] `F2-T37` Restringir CORS y orígenes WebSocket.
- [ ] `F2-T38` Eliminar exposición no autenticada de Redis.
- [ ] `F2-T39` Definir cifrado en tránsito y en reposo.
- [ ] `F2-T40` Evitar datos sensibles en logs, URLs y errores.
- [ ] `F2-T41` Validar archivos por contenido real, no solo por `Content-Type`.
- [ ] `F2-T42` Implementar política de retención ejecutable.
- [ ] `F2-T43` Implementar borrado trazable y verificable.
- [ ] `F2-T44` Revisar archivos rastreados en `backend/private_evidence/`.
- [ ] `F2-T45` Retirar del control de versiones cualquier evidencia no sintética.
- [ ] `F2-T46` Documentar respuesta ante incidentes y filtraciones.

### 6.7 Auditoría

- [ ] `F2-T47` Crear auditoría append-only para acciones sensibles.
- [ ] `F2-T48` Registrar accesos permitidos y denegados.
- [ ] `F2-T49` Registrar actor, rol, recurso, operación, propósito y resultado.
- [ ] `F2-T50` Asociar la auditoría con `operation_id`.
- [ ] `F2-T51` Registrar cambios de consentimiento, asentimiento, pausa y retiro.
- [ ] `F2-T52` Restringir modificación y eliminación de registros de auditoría.

### 6.8 Entregables

- [ ] `F2-E01` Matriz RBAC implementada y probada.
- [ ] `F2-E02` Política de consentimiento y asentimiento.
- [ ] `F2-E03` Procedimiento de pausa y retiro.
- [ ] `F2-E04` Política de retención y borrado.
- [ ] `F2-E05` Modelo de amenazas y mitigaciones.
- [ ] `F2-E06` Informe de revisión de datos almacenados en Git.
- [ ] `F2-E07` Informe de pruebas de seguridad y autorización.

### 6.9 Puerta de salida

- [ ] `F2-G01` Cero accesos indebidos en la suite de autorización.
- [ ] `F2-G02` Cero capturas antes de autorización, durante pausa o después del retiro.
- [ ] `F2-G03` Todas las modalidades respetan consentimiento granular en backend.
- [ ] `F2-G04` Todos los accesos sensibles generan auditoría verificable.
- [ ] `F2-G05` No existen evidencias reales o no verificadas rastreadas por Git.
- [ ] `F2-G06` Existe aprobación técnica y ética del flujo implementado.

## 7. Fase 3: registro durable y sincronización backend

### 7.1 Objetivo

Garantizar que todas las operaciones críticas sean identificables, idempotentes, ordenables, auditables y recuperables aun cuando fallen Redis, WebSocket o un worker.

### 7.2 Dependencias

- [ ] Fase 1 aprobada.
- [ ] Fase 2 aprobada para operaciones sensibles.
- [ ] Catálogo de eventos versionado.

### 7.3 Contrato de operación

- [ ] `F3-T01` Definir el esquema común de operación.
- [ ] `F3-T02` Incluir `operation_id` globalmente único.
- [ ] `F3-T03` Incluir sesión, actor, rol y dispositivo.
- [ ] `F3-T04` Incluir agregado, tipo de evento y versión de payload.
- [ ] `F3-T05` Incluir `base_version` y secuencia del dispositivo.
- [ ] `F3-T06` Incluir fecha del cliente, recepción del servidor y referencia temporal.
- [ ] `F3-T07` Versionar y validar el esquema del payload.
- [ ] `F3-T08` Rechazar operaciones sin identidad o contexto suficiente.
- [ ] `F3-T08a` Formalizar consistencia eventual con versión canónica de PostgreSQL y orden causal por sesión.

### 7.4 Persistencia y entrega

- [ ] `F3-T09` Crear registro append-only de operaciones.
- [ ] `F3-T10` Crear bandeja de entrada idempotente.
- [ ] `F3-T11` Crear outbox transaccional.
- [ ] `F3-T12` Persistir estado y evento en una misma transacción.
- [ ] `F3-T13` Publicar eventos después del commit.
- [ ] `F3-T14` Crear worker de publicación del outbox.
- [ ] `F3-T15` Reintentar publicaciones con backoff y límite observable.
- [ ] `F3-T16` Marcar entrega, error, reintento y cuarentena.
- [ ] `F3-T17` Recuperar publicaciones después de reiniciar API o worker.
- [ ] `F3-T18` Mantener PostgreSQL como estado durable aun si Redis falla.

### 7.5 Idempotencia y orden

- [ ] `F3-T19` Extender idempotencia a respuestas.
- [ ] `F3-T20` Extender idempotencia a eventos temporales.
- [ ] `F3-T21` Extender idempotencia a consentimiento y asentimiento.
- [ ] `F3-T22` Extender idempotencia a pausa, reanudación y retiro.
- [ ] `F3-T23` Extender idempotencia a revisión y cierre.
- [ ] `F3-T24` Extender idempotencia a transformaciones.
- [ ] `F3-T25` Mantener la misma respuesta semántica ante replay.
- [ ] `F3-T26` Detectar huecos de secuencia por dispositivo.
- [ ] `F3-T27` Detectar operaciones atrasadas y fuera de orden.
- [ ] `F3-T28` Persistir operaciones incompatibles sin aplicar efectos duplicados.
- [ ] `F3-T28a` Documentar la semántica de entrega al menos una vez y el efecto efectivamente único por deduplicación.

### 7.6 Conflictos y convergencia

- [ ] `F3-T29` Definir política para respuesta contra respuesta.
- [ ] `F3-T30` Definir política para edición contra cierre.
- [ ] `F3-T31` Definir política para pausa o retiro contra captura.
- [ ] `F3-T32` Definir política para revisión contra corrección.
- [ ] `F3-T33` Definir política para dos dispositivos con versiones incompatibles.
- [ ] `F3-T34` Devolver HTTP 409 con versión y contexto recuperable.
- [ ] `F3-T35` Conservar ambos intentos para auditoría.
- [ ] `F3-T36` Crear endpoint de sincronización incremental por cursor.
- [ ] `F3-T37` Crear endpoint de snapshot canónico normalizado.
- [ ] `F3-T38` Permitir reconstrucción desde snapshot y operaciones posteriores.

### 7.7 WebSocket

- [ ] `F3-T39` Asociar cada notificación con la operación original.
- [ ] `F3-T40` Incluir versión canónica y cursor en la notificación.
- [ ] `F3-T41` Evitar IDs nuevos sin relación causal.
- [ ] `F3-T42` Unificar el cálculo de progreso REST y WebSocket.
- [ ] `F3-T43` Mantener sondeo REST como recuperación, no como consistencia primaria.
- [ ] `F3-T44` Probar autorización del WebSocket por actor y sesión.

### 7.8 Infraestructura piloto

- [ ] `F3-T45` Crear servicios reproducibles para PostgreSQL, Redis, API y worker.
- [ ] `F3-T46` Añadir healthchecks.
- [ ] `F3-T47` Añadir migraciones y recuperación documentada.
- [ ] `F3-T48` Separar configuración de desarrollo, pruebas y piloto.
- [ ] `F3-T49` Gestionar secretos fuera del repositorio.

### 7.9 Pruebas obligatorias

- [ ] `F3-P01` Replay antes del commit.
- [ ] `F3-P02` Replay después del commit y antes de responder.
- [ ] `F3-P03` Replay después de reiniciar API.
- [ ] `F3-P04` Caída de Redis después del commit.
- [ ] `F3-P05` Reinicio del worker con outbox pendiente.
- [ ] `F3-P06` Duplicación masiva de la misma operación.
- [ ] `F3-P07` Permutación y huecos de secuencia.
- [ ] `F3-P08` Conflictos concurrentes de todas las clases definidas.
- [ ] `F3-P09` Reconstrucción de estado desde snapshot y log.

### 7.10 Puerta de salida

- [ ] `F3-G01` Una operación repetida produce exactamente un efecto.
- [ ] `F3-G02` Una caída posterior al commit no pierde la operación.
- [ ] `F3-G03` Las operaciones fuera de orden son detectadas.
- [ ] `F3-G04` Todos los efectos críticos tienen `operation_id` trazable.
- [ ] `F3-G05` El estado se reconstruye correctamente desde datos durables.

## 8. Fase 4: cliente offline y convergencia multi-actor

### 8.1 Objetivo

Conservar operaciones y evidencias durante conectividad intermitente, recuperar la cola después de reinicios y demostrar que todos los actores alcanzan el mismo estado canónico.

### 8.2 Dependencias

- [ ] Fase 3 aprobada.
- [ ] Endpoint de sincronización incremental disponible.
- [ ] Contrato de operación estable.

### 8.3 Almacenamiento local

- [ ] `F4-T01` Diseñar una base IndexedDB versionada.
- [ ] `F4-T02` Crear almacén local de operaciones.
- [ ] `F4-T03` Crear almacén local de blobs de evidencia.
- [ ] `F4-T04` Crear almacén de snapshots y cursores.
- [ ] `F4-T05` Persistir respuestas antes de avanzar la UI.
- [ ] `F4-T06` Persistir eventos temporales antes de enviarlos.
- [ ] `F4-T07` Persistir pausas, reanudaciones y retiros.
- [ ] `F4-T08` Persistir consentimiento y asentimiento pendientes.
- [ ] `F4-T09` Detectar y reportar fallos de apertura, escritura y lectura.
- [ ] `F4-T10` Detectar cuota insuficiente y degradación del almacenamiento.
- [ ] `F4-T11` Definir migraciones de IndexedDB.

### 8.4 Cola y reintentos

- [ ] `F4-T12` Definir estados `LOCAL`, `PENDING`, `SENDING`, `ACKNOWLEDGED`, `CONFLICT`, `QUARANTINED` y `FAILED_PERMANENTLY`.
- [ ] `F4-T13` Mantener idempotency key entre reintentos.
- [ ] `F4-T14` Aplicar backoff exponencial con jitter.
- [ ] `F4-T15` Reintentar al recuperar conectividad.
- [ ] `F4-T16` Respetar dependencias entre operaciones.
- [ ] `F4-T17` No enviar una respuesta antes del inicio del ítem correspondiente.
- [ ] `F4-T18` Separar errores transitorios de errores permanentes.
- [ ] `F4-T19` Ofrecer recuperación o escalamiento para operaciones en conflicto.
- [ ] `F4-T20` Evitar bucles infinitos de reintento.

### 8.5 Sincronización y UX

- [ ] `F4-T21` Sincronizar desde el último cursor confirmado.
- [ ] `F4-T22` Aplicar cambios remotos en orden.
- [ ] `F4-T23` Comparar versión local y canónica.
- [ ] `F4-T24` Calcular hash del estado normalizado.
- [ ] `F4-T25` Mostrar conectividad y estado de sincronización.
- [ ] `F4-T26` Mostrar cantidad y tipo de operaciones pendientes.
- [ ] `F4-T27` Mostrar conflictos que requieren intervención.
- [ ] `F4-T28` Evitar cerrar silenciosamente con operaciones críticas pendientes.
- [ ] `F4-T29` Permitir cierre explícito con advertencia y recuperación posterior.
- [ ] `F4-T30` Corregir, registrar y probar el service worker.
- [ ] `F4-T31` Evitar caché inseguro de respuestas clínicas.

### 8.6 Pruebas obligatorias

- [ ] `F4-P01` Fallo de red antes de enviar.
- [ ] `F4-P02` Timeout antes del commit.
- [ ] `F4-P03` Timeout después del commit.
- [ ] `F4-P04` Reconexión con backlog.
- [ ] `F4-P05` Recarga de pestaña con operaciones pendientes.
- [ ] `F4-P06` Cierre y reapertura completa del navegador.
- [ ] `F4-P07` Falla de IndexedDB.
- [ ] `F4-P08` Cuota local agotada.
- [ ] `F4-P09` Dos dispositivos con la misma versión base.
- [ ] `F4-P10` Pausa mientras el participante genera evidencia.
- [ ] `F4-P11` Retiro con transformaciones pendientes.
- [ ] `F4-P12` Backlog grande sin bloqueo de interfaz.
- [ ] `F4-P13` Convergencia de participante, facilitador y revisor.

### 8.7 Puerta de salida

- [ ] `F4-G01` Cero operaciones confirmadas perdidas.
- [ ] `F4-G02` Cero efectos duplicados.
- [ ] `F4-G03` Todos los clientes convergen al snapshot canónico después de reconectar.
- [ ] `F4-G04` Los conflictos críticos se detectan y auditan.
- [ ] `F4-G05` El sistema recupera operaciones tras reiniciar el navegador.
- [ ] `F4-G06` Ningún fallo de persistencia local queda silencioso.

## 9. Fase 5: pipeline de evidencias multimodales

### 9.1 Objetivo

Preservar originales inmutables, generar derivados versionados y asegurar metadatos, integridad, calidad, autorización, retención y recuperación.

### 9.2 Dependencias

- [ ] Fase 2 aprobada.
- [ ] Fase 3 aprobada.
- [ ] Fase 4 aprobada para captura offline.

### 9.3 Modelo de datos

- [ ] `F5-T01` Separar identidad clínica de evidencia y archivo físico.
- [ ] `F5-T02` Crear entidad de activo original.
- [ ] `F5-T03` Crear entidad de activo derivado.
- [ ] `F5-T04` Crear entidad de transformación.
- [ ] `F5-T05` Crear entidad de evaluación de calidad.
- [ ] `F5-T06` Crear relación explícita con autorización.
- [ ] `F5-T07` Crear estado de trabajo de procesamiento.
- [ ] `F5-T08` Versionar esquemas de metadatos.
- [ ] `F5-T09` Migrar evidencias actuales conservando trazabilidad.

### 9.4 Almacenamiento e integridad

- [ ] `F5-T10` Incorporar MinIO o almacenamiento compatible con S3 al piloto.
- [ ] `F5-T11` Configurar buckets privados y mínimo privilegio.
- [ ] `F5-T12` Evitar URLs públicas permanentes.
- [ ] `F5-T13` Calcular SHA-256 durante la recepción.
- [ ] `F5-T14` Registrar tamaño calculado por servidor.
- [ ] `F5-T15` Detectar tipo real y firma mágica.
- [ ] `F5-T16` Validar formato, códec y corrupción.
- [ ] `F5-T17` Hacer inmutable el original.
- [ ] `F5-T18` Impedir reemplazo silencioso de objetos.
- [ ] `F5-T19` Verificar integridad durante lectura y auditoría.
- [ ] `F5-T20` Implementar backup y restauración del almacén.

### 9.5 Metadatos mínimos

- [ ] `F5-T21` Exigir `evidence_id` y `session_id`.
- [ ] `F5-T22` Exigir actor, rol y dispositivo.
- [ ] `F5-T23` Exigir tarea, ítem y modalidad.
- [ ] `F5-T24` Exigir inicio, final y referencia temporal aplicable.
- [ ] `F5-T25` Exigir formato, tamaño y hash.
- [ ] `F5-T26` Exigir versión y estado de calidad.
- [ ] `F5-T27` Exigir autorización y custodio.
- [ ] `F5-T28` Registrar causa normalizada de ausencia cuando corresponda.
- [ ] `F5-T29` Rechazar o poner en cuarentena metadatos inválidos.

### 9.6 Derivados y transformaciones

- [ ] `F5-T30` Generar cada derivado como un activo nuevo.
- [ ] `F5-T31` Asociar derivado con uno o más originales.
- [ ] `F5-T32` Registrar software y versión de transformación.
- [ ] `F5-T33` Registrar parámetros y modelo cuando aplique.
- [ ] `F5-T34` Registrar agente, fecha y entorno de ejecución.
- [ ] `F5-T35` Registrar hash del derivado.
- [ ] `F5-T36` Versionar transformaciones.
- [ ] `F5-T37` Hacer idempotentes los trabajos de procesamiento.
- [ ] `F5-T38` Mantener versiones previas después de reprocesar.
- [ ] `F5-T39` Cancelar o invalidar derivados afectados por retiro.

### 9.7 Calidad por modalidad

- [ ] `F5-T40` Definir calidad mínima de audio.
- [ ] `F5-T41` Definir calidad mínima de video.
- [ ] `F5-T42` Definir calidad mínima de capturas.
- [ ] `F5-T43` Definir calidad mínima de eventos temporales.
- [ ] `F5-T44` Definir calidad mínima de logs.
- [ ] `F5-T45` Registrar evaluación de calidad automática y revisión manual.
- [ ] `F5-T46` Impedir que una evidencia inválida se use silenciosamente.

### 9.8 Retención y recuperación

- [ ] `F5-T47` Ejecutar vencimiento de retención mediante worker programado.
- [ ] `F5-T48` Aplicar retención a originales y derivados.
- [ ] `F5-T49` Registrar borrado o conservación justificada.
- [ ] `F5-T50` Incluir copias y respaldos en la política.
- [ ] `F5-T51` Probar restauración de evidencias y metadatos.

### 9.9 Puerta de salida

- [ ] `F5-G01` 100% de originales con hash y metadatos críticos válidos.
- [ ] `F5-G02` 100% de derivados vinculados con transformación versionada.
- [ ] `F5-G03` Ningún original puede sobrescribirse.
- [ ] `F5-G04` Toda alteración introducida deliberadamente es detectada.
- [ ] `F5-G05` Retiro y retención alcanzan originales, derivados y trabajos pendientes.
- [ ] `F5-G06` Backup y restauración fueron probados.

## 10. Fase 6: proveniencia y reconstrucción de linaje

### 10.1 Objetivo

Representar entidades, actividades, agentes y relaciones para reconstruir de forma verificable el recorrido desde un resultado hasta las evidencias, transformaciones, actores y autorizaciones que lo sustentan.

### 10.2 Dependencias

- [ ] Fase 3 aprobada.
- [ ] Fase 5 aprobada.
- [ ] Identificadores estables de operaciones y activos disponibles.

### 10.3 Modelo de proveniencia

- [ ] `F6-T01` Definir entidad de proveniencia.
- [ ] `F6-T02` Definir actividad de proveniencia.
- [ ] `F6-T03` Definir agente de proveniencia.
- [ ] `F6-T04` Definir relaciones `generatedBy`, `derivedFrom`, `attributedTo`, `used`, `associatedWith`, `invalidatedBy` y `revisionOf` o equivalentes.
- [ ] `F6-T05` Versionar el esquema de proveniencia.
- [ ] `F6-T06` Vincular entidades con originales y derivados.
- [ ] `F6-T07` Vincular actividades con captura, carga, transformación, revisión y cálculo.
- [ ] `F6-T08` Vincular agentes con personas, dispositivos y servicios.
- [ ] `F6-T09` Vincular cada relación con operación y fecha.

### 10.4 Integración del linaje

- [ ] `F6-T10` Crear proveniencia al capturar evidencia.
- [ ] `F6-T11` Crear proveniencia al cargar y verificar evidencia.
- [ ] `F6-T12` Crear proveniencia al generar derivados.
- [ ] `F6-T13` Crear proveniencia al registrar una respuesta preliminar.
- [ ] `F6-T14` Crear proveniencia al revisar un ítem.
- [ ] `F6-T15` Crear proveniencia al calcular puntuaciones.
- [ ] `F6-T16` Crear proveniencia al generar informes.
- [ ] `F6-T17` Vincular cada decisión profesional con evidencias consultadas.
- [ ] `F6-T18` Conservar relaciones al corregir o reabrir una decisión.

### 10.5 Consulta y verificación

- [ ] `F6-T19` Crear endpoint de linaje desde resultado hacia fuentes.
- [ ] `F6-T20` Crear endpoint inverso desde evidencia hacia usos.
- [ ] `F6-T21` Crear visualizador profesional de linaje.
- [ ] `F6-T22` Restringir acceso a nodos sensibles.
- [ ] `F6-T23` Verificar hashes durante la reconstrucción.
- [ ] `F6-T24` Detectar nodos o relaciones faltantes.
- [ ] `F6-T25` Detectar objetos físicos inexistentes.
- [ ] `F6-T26` Detectar versiones incompatibles.
- [ ] `F6-T27` Exportar linaje mínimo en JSON versionado.
- [ ] `F6-T28` Crear oráculo independiente de proveniencia para pruebas.

### 10.6 Pruebas obligatorias

- [ ] `F6-P01` Reconstruir resultado hasta decisión profesional.
- [ ] `F6-P02` Reconstruir decisión hasta derivado y transformación.
- [ ] `F6-P03` Reconstruir transformación hasta original.
- [ ] `F6-P04` Reconstruir original hasta sesión, actor, dispositivo y autorización.
- [ ] `F6-P05` Recorrer evidencia hacia todos los resultados e informes que la utilizaron.
- [ ] `F6-P06` Introducir huecos y comprobar detección.
- [ ] `F6-P07` Alterar un objeto y comprobar falla de integridad.
- [ ] `F6-P08` Conservar versiones después de corrección y reprocesamiento.

### 10.7 Puerta de salida

- [ ] `F6-G01` 100% de resultados de prueba reconstruibles de extremo a extremo.
- [ ] `F6-G02` 100% de huecos inyectados detectados.
- [ ] `F6-G03` 100% de relaciones original-derivado verificables.
- [ ] `F6-G04` Ninguna corrección elimina versiones anteriores.
- [ ] `F6-G05` La exportación de linaje coincide con el oráculo independiente.

## 11. Fase 7: recepción, revisión y cierre profesional

### 11.1 Objetivo

Garantizar que toda salida final pase por recepción, asignación, revisión y cierre profesional explícitos, versionados, auditados y no eludibles desde la API.

### 11.2 Dependencias

- [ ] Fase 2 aprobada.
- [ ] Fase 6 aprobada.
- [ ] Roles y linaje disponibles.

### 11.3 Recepción y asignación

- [ ] `F7-T01` Crear evento explícito de recepción de evaluación.
- [ ] `F7-T02` Crear cola de evaluaciones pendientes.
- [ ] `F7-T03` Implementar asignación a profesional autorizado.
- [ ] `F7-T04` Implementar reasignación con motivo.
- [ ] `F7-T05` Registrar acuse de recepción.
- [ ] `F7-T06` Registrar fecha límite y SLA.
- [ ] `F7-T07` Implementar escalamiento por vencimiento.
- [ ] `F7-T08` Mostrar cola, asignación, antigüedad y estado.

### 11.4 Revisión por ítem

- [ ] `F7-T09` Crear una decisión profesional versionada por ítem.
- [ ] `F7-T10` Permitir confirmar resultado preliminar.
- [ ] `F7-T11` Permitir corregir con motivo.
- [ ] `F7-T12` Permitir marcar no administrado o inconcluso explícitamente.
- [ ] `F7-T13` Permitir solicitar repetición o evidencia adicional.
- [ ] `F7-T14` Registrar notas profesionales.
- [ ] `F7-T15` Registrar evidencias y linaje consultados.
- [ ] `F7-T16` Registrar responsable y fecha.
- [ ] `F7-T17` Conservar decisiones previas después de corrección.
- [ ] `F7-T18` Detectar edición concurrente durante revisión.

### 11.5 Cierre y salidas

- [ ] `F7-T19` Eliminar cierre automático de pendientes como `NOT_APPLICABLE`.
- [ ] `F7-T20` Exigir decisión explícita para cada ítem pendiente.
- [ ] `F7-T21` Implementar cierre transaccional.
- [ ] `F7-T22` Verificar completitud y linaje antes de validar.
- [ ] `F7-T23` Bloquear reportes finales antes de `VALIDATED`.
- [ ] `F7-T24` Unificar reglas de todos los endpoints de reportes.
- [ ] `F7-T25` Evitar etiquetas de validación en informes preliminares.
- [ ] `F7-T26` Versionar informes y resultados.
- [ ] `F7-T27` Implementar reapertura controlada.
- [ ] `F7-T28` Registrar nueva versión después de reapertura.
- [ ] `F7-T29` Auditar recepción, revisión, cierre, reapertura y exportación.

### 11.6 Exclusión del diagnóstico automatizado

- [ ] `F7-T30` Deshabilitar o aislar las rutas y servicios de diagnóstico automatizado en todos los ambientes de tesis.
- [ ] `F7-T31` Retirar de la interfaz y bloquear por configuración cualquier pantalla o acción de diagnóstico automatizado.
- [ ] `F7-T32` Excluir campos diagnósticos automáticos de reportes, exportaciones, persistencia, eventos y artefactos.
- [ ] `F7-T33` Ejecutar `PT17` contra API, URL directa, replay, sesiones históricas y rol administrador, conservando el hash de configuración y la evidencia.

### 11.7 Pruebas obligatorias

- [ ] `F7-P01` Intentar cierre con ítems pendientes desde API.
- [ ] `F7-P02` Intentar generar informe antes de validación.
- [ ] `F7-P03` Intentar revisar con profesional no asignado.
- [ ] `F7-P04` Revisar concurrentemente desde dos clientes.
- [ ] `F7-P05` Reabrir y conservar todas las versiones.
- [ ] `F7-P06` Comprobar cálculo del SLA.
- [ ] `F7-P07` Comprobar linaje de cada decisión e informe.
- [ ] `F7-P08` Comprobar cero generaciones, visualizaciones, exportaciones y persistencias diagnósticas automáticas mediante `PT17`.

### 11.8 Puerta de salida

- [ ] `F7-G01` Cero evaluaciones validadas con ítems pendientes.
- [ ] `F7-G02` Cero informes finales sin cierre profesional.
- [ ] `F7-G03` 100% de decisiones con responsable, versión, fecha y linaje.
- [ ] `F7-G04` 100% de casos con recepción y asignación trazables.
- [ ] `F7-G05` Ninguna llamada directa a API elude las restricciones.
- [ ] `F7-G06` `G_DX` cumple en la suite completa de exclusión diagnóstica.

## 12. Fase 8: telemetría y banco de validación técnica

### 12.1 Objetivo

Implementar las fuentes de telemetría, fórmulas, oráculos, herramientas de carga e inyección de fallos necesarias para ejecutar los indicadores técnicos `I01-I34` y `I37-I40`, junto con `PT01-PT18`, de forma reproducible. Los procedimientos humanos de `I35-I36` e `I41-I45` se prepararán y ejecutarán exclusivamente en la fase 10.

### 12.2 Dependencias

- [ ] Fases 1 a 7 aprobadas.
- [ ] Contratos funcionales suficientemente estables.
- [ ] Infraestructura piloto reproducible.

### 12.3 Trazas, métricas y logs

- [ ] `F8-T01` Propagar `operation_id` entre frontend, API, worker y almacenamiento.
- [ ] `F8-T02` Incorporar OpenTelemetry o mecanismo equivalente.
- [ ] `F8-T03` Instrumentar API, WebSocket, worker y sincronización.
- [ ] `F8-T04` Exponer métricas Prometheus o equivalentes.
- [ ] `F8-T05` Crear dashboards reproducibles.
- [ ] `F8-T06` Registrar latencia por etapa.
- [ ] `F8-T07` Registrar throughput y errores.
- [ ] `F8-T08` Registrar backlog y reintentos.
- [ ] `F8-T09` Registrar conflictos y resolución.
- [ ] `F8-T10` Registrar duplicados recibidos y efectos adicionales.
- [ ] `F8-T11` Registrar tiempo de recuperación y convergencia.
- [ ] `F8-T12` Registrar CPU, memoria, red y almacenamiento.
- [ ] `F8-T13` Registrar completitud de metadatos y linaje.
- [ ] `F8-T14` Registrar recepción, revisión y cierre profesional.
- [ ] `F8-T15` Eliminar o seudonimizar campos sensibles de telemetría.

### 12.4 Tiempo y alineación

- [ ] `F8-T16` Definir reloj de referencia para el entorno experimental.
- [ ] `F8-T17` Registrar incertidumbre de sincronización.
- [ ] `F8-T18` Separar RTT de latencia unidireccional.
- [ ] `F8-T19` Registrar anclas temporales para corrientes sincronizables.
- [ ] `F8-T20` Calcular error P95, máximo y deriva en ppm.
- [ ] `F8-T21` Declarar `N/A` cuando no exista referencia común válida.

### 12.5 Cálculo de indicadores

- [ ] `F8-T22` Implementar P50, P95, P99 y máximo.
- [ ] `F8-T23` Implementar percentil tipo 7.
- [ ] `F8-T24` Implementar bootstrap unilateral.
- [ ] `F8-T25` Implementar Clopper-Pearson unilateral.
- [ ] `F8-T26` Implementar latencia y throughput.
- [ ] `F8-T27` Implementar recuperación y convergencia.
- [ ] `F8-T28` Implementar pérdida y duplicación.
- [ ] `F8-T29` Implementar detección y resolución de conflictos.
- [ ] `F8-T30` Implementar completitud de metadatos.
- [ ] `F8-T31` Implementar reconstrucción y huecos de linaje.
- [ ] `F8-T32` Implementar integridad original-derivado.
- [ ] `F8-T33` Implementar cierre y SLA profesional.
- [ ] `F8-T34` Implementar alineación temporal cuando aplique.
- [ ] `F8-T36` Implementar regla de peor caso indicador-escenario-carga.

### 12.6 Herramientas de ensayo

- [ ] `F8-T37` Crear pruebas de contrato con Pytest.
- [ ] `F8-T38` Crear pruebas offline con Vitest y `fake-indexeddb`.
- [ ] `F8-T39` Crear pruebas multi-dispositivo con Playwright.
- [ ] `F8-T40` Crear generador de carga con Locust o equivalente.
- [ ] `F8-T41` Crear inyector de red y fallos con Toxiproxy o equivalente.
- [ ] `F8-T42` Automatizar reinicio de API, worker y Redis.
- [ ] `F8-T43` Automatizar degradación del almacenamiento de objetos.
- [ ] `F8-T44` Crear generador de operaciones sintéticas.
- [ ] `F8-T45` Crear manifiesto externo previo al ensayo.
- [ ] `F8-T46` Crear oráculo de estado canónico.
- [ ] `F8-T47` Crear oráculo de operaciones y efectos.
- [ ] `F8-T48` Crear oráculo de proveniencia.
- [ ] `F8-T49` Exportar configuración, semillas y versiones.

### 12.7 Escenarios y cargas

- [ ] `F8-T50` Automatizar operación normal.
- [ ] `F8-T51` Automatizar red lenta y variable.
- [ ] `F8-T52` Automatizar desconexión completa.
- [ ] `F8-T53` Automatizar reconexión con backlog.
- [ ] `F8-T54` Automatizar duplicación y replay.
- [ ] `F8-T55` Automatizar reordenamiento y omisión.
- [ ] `F8-T56` Automatizar conflictos concurrentes.
- [ ] `F8-T57` Automatizar reinicio de cliente.
- [ ] `F8-T58` Automatizar reinicio de API.
- [ ] `F8-T59` Automatizar reinicio de worker.
- [ ] `F8-T60` Automatizar reinicio de Redis.
- [ ] `F8-T61` Automatizar falla del almacenamiento.
- [ ] `F8-T62` Automatizar combinaciones de fallos.
- [ ] `F8-T63` Ejecutar cada escenario aplicable con 1 sesión.
- [ ] `F8-T64` Ejecutar cada escenario aplicable con 10 sesiones.
- [ ] `F8-T65` Ejecutar cada escenario aplicable con 25 sesiones.
- [ ] `F8-T66` Ejecutar cada escenario aplicable con 50 sesiones.
- [ ] `F8-T67` Ejecutar cada escenario aplicable con 100 sesiones.

### 12.8 Requisitos independientes, calibración y congelamiento

- [ ] `F8-T68` Documentar propietario, fuente, versión, unidad y justificación independiente de cada umbral.
- [ ] `F8-T69` Cerrar antes de la calibración los umbrales obligatorios de latencia, error, throughput, recursos y propiedades multimodales aplicables.
- [ ] `F8-T70` Cerrar los requisitos de recuperación, convergencia, cierre profesional y alineación temporal que resulten aplicables.
- [ ] `F8-T71` Ejecutar calibración técnica con corpus sintético separado para comprobar medibilidad y estimar variabilidad.
- [ ] `F8-T72` Corregir defectos permitidos durante calibración y repetir la regresión completa.
- [ ] `F8-T73` Determinar duración y repeticiones de cada ensayo a partir de la variabilidad, sin modificar umbrales.
- [ ] `F8-T74` Cerrar distribución y ritmo de operaciones.
- [ ] `F8-T75` Cerrar reglas de inclusión, exclusión y repetición.
- [ ] `F8-T76` Separar y sellar los datos de calibración respecto del corpus confirmatorio nuevo.
- [ ] `F8-T77` Congelar protocolo técnico v2, commit, imágenes, dependencias, infraestructura, scripts y semillas antes de abrir datos confirmatorios.

### 12.9 Puerta de salida

- [ ] `F8-G01` Todos los indicadores técnicos aplicables se calculan automáticamente.
- [ ] `F8-G02` Ningún indicador crítico, de desempeño o multimodal aplicable permanece como `TBD` antes de la evaluación confirmatoria.
- [ ] `F8-G03` Los escenarios generan resultados reproducibles.
- [ ] `F8-G04` Cada medición conserva escenario, carga, versión, semilla y fuente.
- [ ] `F8-G05` Los oráculos son independientes de la lógica que evalúan.
- [ ] `F8-G06` La calibración no contamina el conjunto confirmatorio.
- [ ] `F8-G07` `PT17` y `PT18` demuestran `G_DX` y `G_SEC` sobre la versión candidata congelada después de todos los cambios funcionales.

## 13. Fase 9: evaluación técnica confirmatoria

### 13.1 Objetivo

Ejecutar el protocolo técnico congelado, determinar el grado de cumplimiento e identificar escenarios no conformes sin incorporar datos humanos.

### 13.2 Dependencias

- [ ] Fases 1 a 8 aprobadas.
- [ ] Código, infraestructura, scripts, datos y umbrales congelados.
- [ ] Protocolo técnico v2 y corpus confirmatorio nuevo sellados.
- [ ] `G_DX` y `G_SEC` aprobadas sobre la misma versión candidata que se someterá a contraste.

### 13.3 Preparación confirmatoria

- [ ] `F9-T01` Verificar sellos y hashes del protocolo técnico v2, código, infraestructura, scripts, corpus y semillas.
- [ ] `F9-T02` Emitir el acta de apertura de la base confirmatoria.
- [ ] `F9-T03` Verificar reproducibilidad en un entorno limpio sin modificar artefactos congelados.

### 13.4 Ejecución técnica

- [ ] `F9-T04` Ejecutar todas las celdas indicador-escenario-carga aplicables.
- [ ] `F9-T05` Conservar logs, trazas, snapshots, métricas, manifiestos externos y hashes sin modificación.
- [ ] `F9-T06` Comparar estado final contra oráculos.
- [ ] `F9-T07` Calcular intervalos y percentiles predefinidos.
- [ ] `F9-T08` Aplicar la regla del peor caso.
- [ ] `F9-T09` Clasificar cada indicador como cumple, no cumple, no aplicable o indeterminado.
- [ ] `F9-T10` Identificar componente y causa de cada incumplimiento.
- [ ] `F9-T11` Repetir únicamente cuando lo permitan las reglas congeladas.
- [ ] `F9-T12` Publicar resultados negativos, limitaciones y matriz final de cumplimiento.

### 13.5 Entregables y puerta técnica

- [ ] `F9-E01` Acta de congelamiento y apertura técnica.
- [ ] `F9-E02` Matriz indicador-escenario-carga.
- [ ] `F9-E03` Matriz final de cumplimiento.
- [ ] `F9-E04` Informe de escenarios no conformes y amenazas a la validez.
- [ ] `F9-E05` Informe técnico reproducible con anexos permitidos.
- [ ] `F9-G01` Todas las celdas confirmatorias fueron ejecutadas o justificadas como no aplicables.
- [ ] `F9-G02` Todos los resultados son reproducibles desde artefactos conservados.
- [ ] `F9-G03` Los incumplimientos se reportaron sin ocultamiento ni promedio compensatorio.

## 14. Fase 10: piloto y estudio humano

### 14.1 Objetivo

Explorar la factibilidad operativa con actores autorizados del caso mediante un protocolo humano separado, sin modificar ni sustituir el contraste técnico de H1.

### 14.2 Dependencias y puerta ética

- [ ] Fase 9 técnica concluida y versión candidata estable.
- [ ] `F10-T01` Obtener aprobación del comité de ética y autorización institucional.
- [ ] `F10-T02` Aprobar consentimiento, materiales informativos, asentimiento, pausa y retiro.
- [ ] `F10-T03` Aprobar privacidad, manejo de incidentes, instrumentos de observación, entrevista y SUS cuando se utilice.
- [ ] `F10-T04` Capacitar a observadores, revisores y responsables.
- [ ] `F10-T05` Verificar `K_G-pre`, `G_DX`, `G_SEC` y aprobación experta de `I35-I36`.
- [ ] `F10-T06` Verificar `G_CASE` mediante `I40` cuando el flujo use cálculos dependientes del instrumento.

### 14.3 Piloto humano

- [ ] `F10-T07` Reclutar cinco díadas según criterios aprobados.
- [ ] `F10-T08` Verificar autorización de los profesionales participantes.
- [ ] `F10-T09` Ejecutar las tareas aprobadas por rol.
- [ ] `F10-T10` Registrar `I35-I36`, finalización, incidencias, ayuda, pausas y retiros sin inferencia conductual.
- [ ] `F10-T11` Aplicar los instrumentos aprobados y analizar problemas de procedimiento.
- [ ] `F10-T12` Ajustar únicamente aspectos permitidos y congelar el protocolo de campo v2.
- [ ] `F10-G01` Impedir el estudio principal si `I35-I36` incumplen o existen incidencias éticas o institucionales pendientes.

### 14.4 Estudio principal

- [ ] `F10-T13` Reclutar entre 25 y 30 díadas e incluir entre 3 y 5 profesionales autorizados según protocolo.
- [ ] `F10-T14` Ejecutar las tareas congeladas.
- [ ] `F10-T15` Medir `I41-I45`: finalización, incidencias, ayuda, comprensión, usabilidad y carga percibida.
- [ ] `F10-T16` Registrar tiempo y carga de revisión profesional e incidentes de privacidad, confianza o incomodidad.
- [ ] `F10-T17` Analizar resultados por rol y tarea sin inferencias poblacionales injustificadas.

### 14.5 Reporte y puerta de cierre humano

- [ ] `F10-E01` Aprobaciones y materiales autorizados.
- [ ] `F10-E02` Informe del piloto y decisión de `K_G-campo`.
- [ ] `F10-E03` Informe de factibilidad por rol, separado del informe técnico.
- [ ] `F10-E04` Desviaciones, incidentes y amenazas a la validez humana.
- [ ] `F10-G02` El estudio cuenta con trazabilidad ética e institucional completa.
- [ ] `F10-G03` Los resultados humanos no se usan como sustituto del cumplimiento técnico.
- [ ] `F10-G04` La tesis puede responder por separado el contraste arquitectónico y la factibilidad del caso.

## 15. Matriz de hitos

| Hito | Condición | Estado |
|---|---|---|
| M1: contrato congelado | Fase 1 aprobada | [ ] |
| M2: gobernanza operativa | Fase 2 aprobada | [ ] |
| M3: backend durable | Fase 3 aprobada | [ ] |
| M4: continuidad offline | Fase 4 aprobada | [ ] |
| M5: evidencias trazables | Fase 5 aprobada | [ ] |
| M6: linaje reconstruible | Fase 6 aprobada | [ ] |
| M7: cierre profesional garantizado | Fase 7 aprobada | [ ] |
| M8: banco técnico listo | Fase 8 aprobada | [ ] |
| M9: evaluación técnica concluida | Fase 9 aprobada | [ ] |
| M10: estudio humano concluido | Fase 10 aprobada | [ ] |

## 16. Riesgos prioritarios

| Riesgo | Impacto | Tratamiento previsto | Fase |
|---|---|---|---|
| Evidencias sensibles versionadas en Git | Crítico | Inventario, clasificación, retiro y rotación de secretos si aplica | 2 |
| Autorización adulta basada solo en código | Alto | Emisión controlada de credenciales y rate limiting | 2 |
| Captura sin consentimiento granular | Crítico | Políticas por modalidad aplicadas en backend | 2 |
| Ausencia de asentimiento y retiro | Crítico | Estados, endpoints, UI y auditoría | 2 |
| Pérdida de operaciones offline | Crítico | Cola durable común, acuses y recuperación | 3-4 |
| Efectos duplicados por replay | Crítico | Inbox idempotente y claves estables | 3 |
| Dependencia de Redis para notificación | Alto | Outbox durable en PostgreSQL | 3 |
| Metadatos incompletos | Alto | Esquema obligatorio y cuarentena | 5 |
| Alteración silenciosa de evidencia | Crítico | Inmutabilidad y hashes | 5 |
| Linaje incompleto | Crítico | Modelo y oráculo de proveniencia | 6 |
| Validación sin revisar pendientes | Crítico | Cierre transaccional no eludible | 7 |
| Umbrales elegidos después de observar resultados | Crítico | Congelamiento previo y acta | 8-9 |
| Estudio humano sin aprobación | Crítico | Puertas ética e institucional bloqueantes | 10 |
| Diagnóstico confundido con alcance evaluado | Alto | Aislamiento técnico y `PT17` | 1, 7, 9 y 10 |

## 17. Secuencia de ejecución

```text
Fase 1: contrato de dominio
  -> Fase 2: gobernanza y seguridad
  -> Fase 3: registro durable backend
  -> Fase 4: offline y convergencia
  -> Fase 5: pipeline multimodal
  -> Fase 6: proveniencia y linaje
  -> Fase 7: revisión profesional
  -> Fase 8: telemetría y banco técnico
  -> Fase 9: evaluación técnica confirmatoria
  -> Fase 10: piloto y estudio humano
```

Las fases no deben considerarse diez entregas aisladas. Cada una construye una condición necesaria para la siguiente. Se permite trabajo preparatorio en paralelo, pero ninguna puerta dependiente debe aprobarse con tareas críticas pendientes.

## 18. Estimación orientativa

La estimación asume una persona desarrolladora con acceso a revisión metodológica y ética. No incluye tiempos administrativos de aprobación o reclutamiento.

| Fase | Rango orientativo |
|---|---:|
| Fase 1 | 2-3 semanas |
| Fase 2 | 3-5 semanas |
| Fase 3 | 4-6 semanas |
| Fase 4 | 4-6 semanas |
| Fase 5 | 4-6 semanas |
| Fase 6 | 3-5 semanas |
| Fase 7 | 3-4 semanas |
| Fase 8 | 4-6 semanas |
| Fase 9 | 2-4 semanas |
| Fase 10 | Variable según aprobación ética y reclutamiento |

El trabajo técnico estimado es de 27 a 41 semanas para una persona. Esta estimación deberá actualizarse después de la fase 1 utilizando el inventario real de contratos, migraciones y pruebas.

## 19. Criterio final de cumplimiento

El objetivo principal no se declarará cumplido por completar pantallas o endpoints. Solo podrá declararse cumplido cuando:

- [ ] La arquitectura multi-actor esté implementada y documentada.
- [ ] La continuidad offline haya sido demostrada bajo fallos controlados.
- [ ] La idempotencia, el orden y la convergencia hayan sido verificados.
- [ ] Los originales y derivados sean íntegros, versionados y trazables.
- [ ] El linaje pueda reconstruirse de extremo a extremo.
- [ ] Consentimiento, asentimiento, pausa y retiro sean ejecutables y auditables.
- [ ] Ninguna salida final pueda eludir la revisión profesional.
- [ ] Los umbrales estén congelados antes del contraste confirmatorio.
- [ ] Las pruebas de carga, fallos y replay sean reproducibles.
- [ ] La matriz final identifique tanto cumplimientos como incumplimientos.
- [ ] El estudio humano tenga aprobación ética y se reporte por separado.
- [ ] Las conclusiones excluyan cualquier capacidad no evaluada, incluido el diagnóstico automatizado.

## 20. Registro de avance

Esta tabla deberá actualizarse durante la ejecución sin sustituir los checkboxes detallados.

| Fase | Estado | Inicio | Cierre | Responsable | Evidencia de aprobación |
|---|---|---|---|---|---|
| 1. Contrato de dominio | No iniciada |  |  |  |  |
| 2. Gobernanza y seguridad | Bloqueada por F1 |  |  |  |  |
| 3. Sincronización backend | Bloqueada por F1-F2 |  |  |  |  |
| 4. Offline y convergencia | Bloqueada por F3 |  |  |  |  |
| 5. Pipeline multimodal | Bloqueada por F2-F4 |  |  |  |  |
| 6. Proveniencia y linaje | Bloqueada por F3-F5 |  |  |  |  |
| 7. Revisión profesional | Bloqueada por F2-F6 |  |  |  |  |
| 8. Telemetría y banco técnico | Bloqueada por F1-F7 |  |  |  |  |
| 9. Evaluación técnica confirmatoria | Bloqueada por F1-F8 |  |  |  |  |
| 10. Piloto y estudio humano | Bloqueada por F9 y puertas ética e institucional |  |  |  |  |

## 21. Aprobación del plan

- [ ] Alcance técnico revisado.
- [ ] Alcance metodológico revisado.
- [ ] Exclusión del diagnóstico automatizado documentada y aceptada.
- [ ] Arquitectura piloto reproducible aceptada.
- [ ] Secuencia de diez fases aceptada.
- [ ] Responsables iniciales asignados.
- [ ] Registro de riesgos creado.
- [ ] Ejecución de la fase 1 autorizada.

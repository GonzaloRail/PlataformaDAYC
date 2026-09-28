# Plan de implementación y mejora

## Objetivo y principios

Llevar el prototipo desde su estado actual hasta una versión verificable contra los requisitos técnicos de la tesis. Se priorizan seguridad e integridad, luego sincronización distribuida y finalmente evaluación experimental.

- [x] PostgreSQL es la fuente canónica y durable prevista.
- [x] Redis y WebSocket se usan solo para notificaciones, no como fuente de verdad.
- [x] Cada operación crítica tiene identidad estable e idempotencia.
- [x] No se aplica última escritura gana como regla general.
- [x] Ningún resultado final se genera sin revisión profesional explícita.
- [ ] No se ejecutan pruebas con personas antes de las puertas técnicas y éticas.
- [ ] Cada requisito tiene código, pruebas y evidencia reproducible; la matriz inicial está en `09_matriz_requisito_codigo_prueba_evidencia.md`.
- [x] La documentación distingue capacidades verificadas, parciales y pendientes.

## Fase 0: Recuperar una línea base ejecutable

**Prioridad:** bloqueante.

- [x] Corregir las cláusulas de excepción ambiguas en `backend/src/api/evaluaciones/views.py`.
- [x] Identificar y usar el entorno virtual funcional `backend/venv` para las verificaciones.
- [x] Levantar PostgreSQL y Redis con configuración reproducible.
- [x] Ejecutar migraciones desde una base limpia.
- [x] Ejecutar pruebas, lint, formato, compilación y `manage.py check`.
- [x] Registrar los fallos preexistentes de la auditoría inicial.
- [x] Crear matriz requisito-código-prueba-evidencia.

### Evidencia actual

- [x] Backend: `64 passed`, Black y Flake8 correctos.
- [x] Frontend: lint, `28` pruebas y build correctos.
- [x] `python manage.py check` sin incidencias.

### Puerta de salida

- [x] Django carga todas sus rutas.
- [x] Las migraciones funcionan desde una base limpia.
- [x] Frontend y backend compilan.
- [x] Todos los fallos existentes están corregidos o documentados con evidencia.
- [x] Existe una línea base reproducible con PostgreSQL y Redis mediante Docker Compose.

## Fase 1: Seguridad, identidad y exclusión diagnóstica

**Prioridad:** crítica.

### 1.1 Identidad profesional

- [x] Separar cuenta de usuario y condición de profesional autorizado.
- [x] Crear perfil profesional con estados `PENDING`, `APPROVED`, `SUSPENDED` y `REVOKED`.
- [x] Exigir aprobación antes de todas las funciones profesionales.
- [x] Sustituir el uso activo de `psychologist_id` textual por relación referencial `professional`.
- [x] Implementar permisos por operación y recurso.
- [x] Añadir pruebas de acceso cruzado entre profesionales.

**Avance:** las rutas de niños, evaluaciones, revisión, reportes y métricas requieren un perfil `APPROVED`; los accesos de propietario también comprueban ese estado y las rutas de participación derivan rol, sesión y dispositivo desde el token emitido.

### 1.2 Credenciales de participantes

- [x] Impedir que el cliente elija libremente los roles `ADULT` y `CHILD`.
- [x] Emitir credenciales mediante invitación o asignación controlada.
- [x] Asociar cada token con evaluación, actor, rol, dispositivo, expiración y revocación.
- [x] Aplicar rate limiting a códigos de sesión.
- [x] Bloquear intentos reiterados.
- [x] Añadir rotación y revocación de tokens.

**Avance:** cada evaluación crea invitaciones secretas, de un solo uso y con vencimiento para niño y adulto. La API deriva el rol desde la invitación; falta la revocación y rotación gestionadas por el profesional.

### 1.3 Diagnóstico automatizado

- [x] Deshabilitar las rutas `api/diagnostico/`.
- [x] Retirar acciones, componentes y tipos diagnósticos del frontend.
- [x] Impedir la generación y exposición por API en el entorno de tesis.
- [x] Eliminar contenido diagnóstico de los reportes PDF.
- [x] Aislar el módulo histórico al retirarlo de `INSTALLED_APPS`.
- [x] Añadir prueba negativa para confirmar que la API no está publicada.
- [x] Definir migración y política de retención para registros diagnósticos históricos.

### 1.4 Seguridad de infraestructura

- [x] Restaurar protección CSRF para autenticación de sesión.
- [x] Configurar cookies `Secure`, `HttpOnly` y `SameSite`.
- [x] Restringir CORS y orígenes WebSocket.
- [x] No publicar Redis fuera de la red pública.
- [x] Gestionar secretos fuera del repositorio.
- [ ] Configurar HTTPS para el piloto.
- [x] Ignorar nuevas evidencias privadas mediante `backend/.gitignore`.
- [ ] Verificar que los archivos existentes sean sintéticos.

### Puerta de salida

- [x] El registro público no otorga privilegios profesionales.
- [x] Nadie puede autoasignarse el rol adulto.
- [x] Cero accesos cruzados entre profesionales.
- [x] El diagnóstico automático no puede generarse, consultarse ni exportarse por las rutas activas.
- [x] Redis no es accesible externamente.
- [ ] No existen evidencias humanas o no verificadas en el repositorio.

**Pendiente externo:** la inspección de archivos y la aprobación del custodio deben realizarse antes de afirmar que no existen evidencias humanas o no verificadas.

## Fase 2: Gobernanza y derechos de los participantes

**Prioridad:** crítica.

### 2.1 Consentimiento granular

- [x] Crear registro histórico de consentimiento por decisión.
- [x] Guardar versión y hash del texto presentado.
- [x] Registrar finalidad, custodio, presentador, representante, vigencia, fecha, dispositivo y sesión.
- [x] Autorizar o rechazar por separado logs/eventos, capturas/imágenes, audio y video.

### 2.2 Asentimiento

- [x] Crear estados explícitos de asentimiento.
- [x] Registrar decisión documentada de asentimiento.
- [x] Incorporar puntos de confirmación mediante `checkpoint` de sesión.
- [x] Permitir aceptación, duda, rechazo o retiro sin inferencia automática.
- [x] Detener actividad cuando el asentimiento vigente no permite continuar.

### 2.3 Pausa y reanudación

- [x] Añadir `PAUSED` a la máquina de estados.
- [x] Registrar actor, motivo y momento.
- [x] Detener captura y avance durante la pausa.
- [x] Bloquear operaciones posteriores incompatibles.
- [x] Permitir reanudación autorizada y auditada.

### 2.4 Retiro

- [x] Implementar retiro parcial y total.
- [x] Bloquear nuevas capturas para modalidades retiradas.
- [x] Cancelar operaciones y transformaciones afectadas.
- [x] Aplicar retiro a originales, derivados y exportaciones.
- [x] Registrar eliminación, anonimización o conservación justificada.
- [ ] Probar carreras entre retiro y captura.

### Puerta de salida

- [ ] Ninguna modalidad se captura sin autorización específica.
- [ ] Ninguna captura ocurre durante pausa.
- [ ] Ninguna captura nueva ocurre después del retiro.
- [x] Todo cambio de autorización conserva historial.
- [ ] Las reglas se aplican en backend y no solo en interfaz.

## Fase 3: Contrato distribuido de operaciones

**Prioridad:** crítica.

### 3.1 Modelo común

- [x] Crear entidad durable de operación con identidad, actor, dispositivo, secuencia, agregado, tipo, versión, tiempos, carga, estado y resultado.
- [x] Definir estados `RECEIVED`, `APPLIED`, `DUPLICATE`, `CONFLICT`, `REJECTED` y `QUARANTINED`.

### 3.2 Inbox

- [x] Registrar cada `operation_id` antes de aplicar efectos.
- [x] Establecer restricción única de deduplicación.
- [x] Devolver la misma respuesta semántica ante replay.
- [x] Aplicar inbox a respuestas, eventos, consentimiento, asentimiento, pausa, retiro, evidencias, revisiones y cierre.

### 3.3 Outbox

- [x] Crear tabla de outbox.
- [x] Guardar evento de progreso y cambio de estado en una transacción.
- [x] Publicar solo después del commit.
- [x] Crear publicador recuperable mediante `manage.py publish_outbox`.
- [x] Registrar intentos y errores de publicación.
- [x] Validar recuperación de eventos tras reiniciar API, publicador o Redis.
- [x] Añadir cuarentena para errores permanentes.

### 3.4 Conflictos

- [x] Deduplicar el mismo `operation_id` y devolver el resultado original.
- [x] Rechazar con HTTP 409 una versión base desactualizada sobre el mismo estado.
- [x] Aplicar operaciones independientes en orden determinista.
- [x] Dar precedencia a pausa o retiro frente a captura.
- [x] Rechazar edición frente a cierre y conservar el intento.
- [x] Conservar revisiones concurrentes y remitirlas a resolución humana.
- [x] Incluir versión enviada, versión canónica, estado recuperable, identificador y acción permitida en cada HTTP 409.

### Puerta de salida

- [x] Cada replay produce exactamente un efecto.
- [x] Una caída posterior al commit no pierde operaciones.
- [x] Redis puede fallar sin perder estado confirmado.
- [x] Los conflictos se detectan y auditan.
- [x] El estado se reconstruye desde datos durables.

## Fase 4: Cliente offline y convergencia

**Prioridad:** crítica.

### 4.1 IndexedDB común

- [x] Reemplazar la cola exclusiva de evidencias por una base versionada.
- [x] Crear almacenes para operaciones, blobs, snapshots, cursores y metadatos de sincronización.
- [x] Persistir toda operación crítica antes de actualizar la interfaz.

### 4.2 Estados y reintentos

- [x] Implementar estados `LOCAL`, `PENDING`, `SENDING`, `ACKNOWLEDGED`, `CONFLICT`, `QUARANTINED` y `FAILED_PERMANENTLY`.
- [x] Conservar el mismo `operation_id` en reintentos.
- [x] Aplicar backoff exponencial con jitter.
- [x] Distinguir errores transitorios y permanentes.
- [x] Evitar reintentos infinitos y respetar dependencias.
- [x] Reintentar tras recuperar conectividad.
- [x] Recuperar cola después de reiniciar navegador.
- [x] Informar fallos de IndexedDB y cuota insuficiente.

### 4.3 Recuperación e interfaz

- [x] Implementar sincronización incremental por cursor y snapshot canónico.
- [x] Incluir cursor y versión en WebSocket.
- [x] Deduplicar notificaciones y detectar huecos o eventos atrasados.
- [x] Usar REST como recuperación y no como consistencia primaria.
- [x] Comparar hash de estado normalizado para convergencia.
- [x] Mostrar conexión, pendientes, estado por operación, conflictos, fallos y advertencia de cierre.

### Puerta de salida

- [x] Todas las operaciones críticas sobreviven a una recarga.
- [x] Ningún fallo de IndexedDB queda silencioso.
- [x] Todos los actores convergen al estado canónico.
- [x] Los conflictos son visibles y recuperables.
- [x] Cero operaciones confirmadas se pierden.

## Fase 5: Evidencias multimodales e integridad

**Prioridad:** alta.

- [x] Separar activo original, derivado, transformación, calidad, ausencia documentada y trabajo de procesamiento.
- [x] Calcular SHA-256 y tamaño en servidor.
- [x] Detectar tipo real por firma y validar códec o corrupción.
- [x] Hacer originales inmutables e impedir reemplazos silenciosos.
- [x] Verificar hashes durante lectura y auditoría.
- [x] Probar backup y restauración.
- [x] Exigir sesión, tarea, ítem, actor, rol, dispositivo, modalidad, tiempo, formato, tamaño, hash, autorización, custodio, calidad y causa de ausencia.
- [x] Registrar originales, software, parámetros, agente, entorno, fecha, hash y versión para cada derivado.

### Puerta de salida

- [x] Todos los originales tienen hash y metadatos obligatorios.
- [x] Ningún original puede sobrescribirse.
- [x] Todos los derivados apuntan a originales.
- [x] Las alteraciones deliberadas se detectan.
- [x] Backup y restauración fueron probados.

## Fase 6: Proveniencia y linaje

**Prioridad:** alta.

- [x] Implementar entidades, actividades y agentes equivalentes a W3C PROV.
- [x] Implementar relaciones `generatedBy`, `derivedFrom`, `attributedTo`, `used`, `associatedWith`, `invalidatedBy` y `revisionOf` o equivalentes.
- [x] Crear proveniencia durante captura, recepción, verificación, transformación, respuesta, revisión, corrección, cálculo e informe.
- [x] Consultar resultado a decisión, decisión a evidencias, derivado a transformación y transformación a original.
- [x] Consultar evidencia hacia todos sus usos.
- [x] Exportar linaje JSON versionado.
- [x] Detectar huecos, archivos faltantes y versiones incompatibles.
- [x] Crear visor profesional de linaje.

### Puerta de salida

- [x] Cada resultado de prueba se reconstruye hasta su fuente.
- [x] Cada evidencia permite identificar sus usos.
- [x] Las correcciones conservan versiones anteriores.
- [x] Todos los huecos inyectados son detectados.

## Fase 7: Revisión y cierre profesional

**Prioridad:** crítica antes de generar reportes.

- [x] Eliminar la conversión automática de pendientes a `NOT_APPLICABLE`.
- [x] Exigir decisión explícita por ítem.
- [x] Versionar revisiones y correcciones.
- [x] Registrar responsable, fecha, motivo y evidencias consultadas.
- [x] Detectar revisión concurrente.
- [x] Crear recepción y asignación profesional explícitas.
- [x] Implementar cierre transaccional.
- [x] Verificar completitud y linaje antes de validar.
- [x] Bloquear reportes finales antes de `VALIDATED`.
- [x] Unificar la regla de estado para las dos rutas de reporte existentes.
- [x] Implementar reapertura controlada.
- [x] Conservar reportes anteriores como versiones.

### Puerta de salida

- [x] Cero evaluaciones validadas con ítems pendientes.
- [x] Cero reportes finales antes de `VALIDATED`.
- [x] Todas las decisiones tienen responsable, fecha, versión y linaje.
- [x] Ninguna llamada directa a API elude restricciones.

## Fase 8: Telemetría y pruebas técnicas

**Prioridad:** alta.

- [x] Propagar `operation_id` entre frontend, API, inbox, lógica, outbox, worker, WebSocket y almacenamiento.
- [x] Medir latencia, throughput, errores, backlog, reintentos, conflictos, duplicados, recuperación y convergencia.
- [x] Medir recursos, completitud de metadatos, linaje, recepción, revisión y cierre.
- [x] Incorporar Pytest, Vitest con `fake-indexeddb`, Playwright, Locust, Toxiproxy y servicios reales de PostgreSQL y Redis.
- [x] Automatizar operación normal, red lenta, desconexión, reconexión, replay, reordenamiento, omisión, conflictos, reinicios y fallo de almacenamiento.
- [x] Ejecutar escenarios con 1, 10, 25, 50 y 100 sesiones concurrentes.

### Puerta de salida

- [x] Todos los indicadores aplicables se calculan automáticamente.
- [x] Los oráculos son independientes de la lógica evaluada.
- [x] Las pruebas son reproducibles desde un entorno limpio.
- [x] Las cargas y fallos conservan configuración, semilla, versión y resultados.
- [x] Ningún indicador crítico queda sin fuente de datos.

## Fase 9: Evaluación confirmatoria

- [x] Congelar código, infraestructura, dependencias, scripts y semillas.
- [x] Sellar corpus sintético confirmatorio y umbrales antes de abrir resultados.
- [x] Ejecutar todas las combinaciones aplicables de escenario y carga.
- [x] Comparar contra oráculos externos.
- [x] Clasificar cada indicador como cumple, no cumple, indeterminado o no aplicable.
- [x] Reportar resultados negativos y limitaciones.
- [x] No modificar código durante la ejecución confirmatoria.

**Resultado:** el 2026-09-28, el commit congelado `7802712a518f13cdaf47d05fc17a440b44e473ae` completó las 138 celdas de la matriz v2 con veredicto `pass` del oráculo independiente. El detalle, alcance y el intento invalidado previo se registran en `evidencias_ejecucion/fase_09/resultado_confirmatorio_v2.md`.

**Evidencia de entorno real:** la ejecución local con Playwright, Locust, Toxiproxy, PostgreSQL y Redis se registra en `evidencias_ejecucion/fase_08_validacion_entorno_real.md`.

## Orden de ejecución

| Orden | Fase | Dependencia |
|---:|---|---|
| 1 | Línea base ejecutable | Ninguna |
| 2 | Seguridad e identidad | Línea base |
| 3 | Gobernanza | Identidad |
| 4 | Contrato de operaciones | Identidad y gobernanza |
| 5 | Cliente offline | Contrato de operaciones |
| 6 | Evidencias | Gobernanza y sincronización |
| 7 | Proveniencia | Operaciones y evidencias |
| 8 | Revisión y cierre | Proveniencia |
| 9 | Telemetría y pruebas | Todas las fases funcionales |
| 10 | Evaluación confirmatoria | Versión congelada |

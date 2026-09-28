# CAPÍTULO IV: DESARROLLO, IMPLEMENTACIÓN Y EVALUACIÓN DE LA ARQUITECTURA

## 4.1 Generalidades

Este capítulo documenta la versión de trabajo efectivamente implementada y la preparación de su evaluación. A diferencia del capítulo III, que define la propuesta y el procedimiento previsto, aquí se emplea tiempo pasado para explicar qué mecanismos se construyeron, cómo se integraron y qué cobertura automatizada quedó disponible.

La revisión técnica se realizó sobre el cliente React y TypeScript, los servicios Django, la persistencia PostgreSQL, el canal Django Channels con Redis y las pruebas automatizadas existentes. Esta revisión no se consideró evaluación confirmatoria: todavía no se congelaron todos los umbrales, scripts, semillas, perfiles de red ni configuraciones de carga. Por ello, el capítulo distingue entre capacidades implementadas, cobertura preliminar y brechas pendientes.

## 4.2 Alcance de la versión implementada

La versión examinada incluyó participación diferenciada de niño, adulto y profesional; estados de evaluación; captura de respuestas, eventos y evidencias; consentimiento por modalidad; pausa y retiro; revisión profesional por ítem; control optimista de versión en mutaciones seleccionadas; y notificaciones de progreso mediante WebSocket.

No se consideraron terminados el contrato común de operaciones, la *inbox* para todas las mutaciones, la *outbox* transaccional, la recuperación incremental por cursor, la cola offline común, los hashes de archivos, el modelo original-derivado, el grafo formal de proveniencia, la telemetría confirmatoria ni el banco de carga e inyección de fallos. Esta delimitación impidió presentar el prototipo actual como evidencia de cumplimiento integral.

**Tabla 4.1. Estado de los diferenciadores de la arquitectura**

| Diferenciador | Mecanismo implementado | Alcance comprobable | Brecha pendiente |
|---|---|---|---|
| Multi-actor | Invitaciones de un solo uso, tokens por rol y dispositivo, permisos diferenciados y revisión profesional. | El servidor asignó el rol y restringió operaciones sensibles. | Completar matriz exhaustiva, autorización por recurso y concurrencia sobre todas las operaciones. |
| Tiempo casi real | WebSocket autorizado, Django Channels, Redis y mensajes de progreso con versión y hora del servidor. | Los clientes autorizados pudieron recibir el estado persistido. | Medir latencia, propagar `operation_id`, detectar huecos y recuperar notificaciones perdidas. |
| Trazabilidad | Actor, dispositivo, sesión, ítem, fecha, versión, metadatos y auditoría de ciertos accesos. | Se pudo atribuir una parte de las capturas y revisiones. | Implementar entidades, actividades, agentes, transformaciones, hashes y recorrido completo hasta una decisión. |

## 4.3 Implementación del flujo multi-actor

Se separaron las identidades de los participantes mediante los roles `CHILD` y `ADULT`, mientras el profesional utilizó una cuenta autenticada y un perfil aprobado. Para ingresar a una sesión, el servidor emitió una invitación asociada previamente con un rol. La invitación se almacenó como hash, tuvo vencimiento y solo pudo utilizarse una vez. Al canjearla, el backend ignoró cualquier rol propuesto por el cliente y emitió un token asociado con la evaluación, el rol y el dispositivo.

Esta decisión evitó que un participante se autoasignara el rol adulto. La implementación se ubicó en `SessionInvitation`, `SessionAccessToken` y el endpoint `join_evaluación`. La prueba `test_join_issues_actor_scoped_device_token` comprobó que una invitación adulta siguió produciendo un token adulto aunque el cliente enviara `CHILD`, y que la reutilización de la invitación fuera rechazada.

Los permisos se aplicaron por operación. El adulto pudo registrar consentimiento, completar datos y pausar la sesión; niño y adulto pudieron enviar las evidencias autorizadas; y solo el profesional propietario pudo listar, descargar y revisar evidencias. La identidad de captura no se aceptó desde el formulario: el backend la derivó del token. Las pruebas de contrato cubrieron la prohibición de consentimiento infantil, la consulta profesional de evidencias y la atribución de captura por dispositivo.

La protección no fue todavía exhaustiva. `psychologist_id` permaneció como campo textual y no como relación referencial; algunas decisiones se limitaron al propietario de la evaluación y no a una política formal por recurso; y faltaron casos sistemáticos para tokens vencidos, revocados y accesos cruzados en toda la API.

## 4.4 Implementación de sincronización y control concurrente

La entidad `Evaluación` incorporó una versión numérica. Antes de determinadas mutaciones, el cliente debió enviar `expected_version`. El backend bloqueó la fila con `select_for_update`, comparó ambas versiones y devolvió HTTP 409 cuando detectó una escritura basada en un estado anterior. Después de una mutación válida, incrementó la versión persistida.

Este mecanismo se aplicó a respuestas, resultados automáticos, datos iniciales, consentimiento, pausa, reanudación, inicio y finalización de sesión. La prueba `test_second_actor_write_with_same_version_is_rejected` simuló dos actores con la misma versión inicial: la primera escritura avanzó la versión y la segunda fue rechazada como conflicto.

La idempotencia se incorporó parcialmente mediante `Idempotency-Key`. Las respuestas y evidencias buscaron una operación previa con la misma clave y devolvieron el resultado existente ante un reintento. En evidencias se añadió además una restricción única por evaluación y clave de idempotencia. Como base del contrato común se creó `DistributedOperation`, que conserva identidad de operación, actor, dispositivo, agregado, versión base, carga, estado y resultado.

Esta implementación no constituyó todavía un protocolo distribuido común. Los eventos de interacción no utilizaron la misma clave ni el mismo control de versión; no existió una *inbox* general; y no se conservaron de manera uniforme los intentos rechazados. Por ello, la entrega al menos una vez y el efecto efectivamente único solo quedaron cubiertos en operaciones seleccionadas.

## 4.5 Implementación de operación local

El cliente implementó una cola específica para evidencias en `EvidenceUploadQueue.ts`. Cada elemento recibió un identificador local y una clave de idempotencia. Antes del envío, se guardó en un almacén IndexedDB denominado `pending-evidence`. Cuando el envío terminó correctamente, el elemento se eliminó de la cola y del almacenamiento. Si ocurrió un error, permaneció pendiente y se programó un nuevo intento.

Al iniciar la cola, el cliente recuperó los elementos persistidos y evitó incorporar dos veces el mismo identificador local. La prueba `evidence-queue.test.ts` simuló un fallo de red seguido de una respuesta exitosa y comprobó que el payload permaneciera hasta el segundo intento.

La continuidad offline quedó incompleta porque la cola cubrió evidencias, pero no todas las respuestas, eventos, decisiones de gobernanza y revisiones. Además, los errores al abrir o escribir IndexedDB se resolvieron silenciosamente y no generaron telemetría. No se demostró todavía recuperación después de cerrar el navegador, agotamiento de cuota ni convergencia de todos los actores.

## 4.6 Implementación de notificaciones en tiempo casi real

Se implementó un consumidor WebSocket por evaluación. Antes de aceptar una conexión, el servidor verificó al profesional propietario o un token válido de sesión. Una conexión autorizada recibió un mensaje de progreso con evaluación, estado, ítem actual, conteo de ítems, versión y hora del servidor. Los participantes no pudieron publicar arbitrariamente estados de progreso; el consumidor solo admitió solicitudes de consulta.

En el entorno normal, Django Channels utilizó Redis como capa de canales. PostgreSQL permaneció como persistencia del estado; Redis transportó mensajes y no se utilizó como fuente canónica. Antes de enviar un progreso, el backend creó un `OutboxEvent` vinculado a una `DistributedOperation` y registró la publicación con `transaction.on_commit`. Un comando `publish_outbox` permitió reintentar eventos pendientes después de un fallo del canal. Las pruebas del consumidor utilizaron una capa en memoria y verificaron conexión autorizada, rechazo sin token y rechazo de acciones no soportadas.

El `event_id` generado identificó cada notificación, no la operación original. Aunque la outbox retiene eventos que fallan al publicar, todavía no se implementaron cursor, detección de huecos, política de reintento diferido ni ensayos de reinicio de Redis. En consecuencia, el mecanismo permitió actualización conectada y publicación durable básica, pero todavía no demostró recuperación completa ni latencia objetivo.

## 4.7 Implementación de evidencias y gobernanza

El backend aceptó registros `LOG`, eventos temporales, capturas, audio, video, cuadros de cámara y resultados de sistema. Cada evidencia se relacionó con evaluación e ítem y conservó tipo, archivo opcional, metadatos, duración, tamaño, actor de captura, clave de idempotencia y fecha de retención. Los archivos se guardaron en una ubicación privada organizada por evaluación e ítem.

Antes de aceptar una evidencia, el servidor verificó consentimiento vigente, modalidad autorizada, tamaño máximo y compatibilidad básica entre el tipo declarado y el tipo MIME. El consentimiento registró versión y hash del texto presentado y cuatro decisiones separadas para logs, capturas, audio y video. Además, se creó un registro histórico de la decisión.

El asentimiento inicial se registró junto con el consentimiento y se añadieron registros por `checkpoint` con decisiones aceptado, duda, rechazado o retirado. Una decisión distinta de aceptado pausó la sesión y bloqueó nuevas capturas hasta registrar una nueva aceptación y reanudarla. La pausa y la reanudación conservaron actor, dispositivo y motivo. El retiro parcial deshabilitó modalidades seleccionadas; el retiro total revocó tokens, marcó la retención de evidencias y canceló la sesión. Las pruebas automatizadas cubrieron selección de modalidades, pausa, rechazo de capturas durante pausa, retiro parcial o total y bloqueo por asentimiento no vigente.

Persistieron límites importantes: el asentimiento sigue siendo una decisión registrada por el adulto y los checkpoints aún no están integrados en todas las actividades infantiles; el retiro no demostró eliminación o anonimización de derivados y respaldos; la validación MIME no inspeccionó la firma real del archivo; y no se calcularon hashes de cada evidencia ni se modelaron originales, derivados y transformaciones.

## 4.8 Implementación de revisión y cierre profesional

La revisión se organizó por ítem. El profesional pudo consultar las evidencias, confirmar o corregir el resultado preliminar, registrar observaciones y producir una respuesta final atribuida a su cuenta. El backend impidió completar la revisión mientras existiera un ítem que requiriera decisión y no tuviera resultado final. Los reportes finales también exigieron que la evaluación estuviera en estado `VALIDATED`.

Las pruebas `test_review_completion_requires_explicit_decision_for_each_pending_item` y `test_final_reports_require_validated_evaluation` comprobaron estas restricciones sobre la API, no solo sobre la interfaz. Además, el módulo de diagnóstico automatizado se retiró de las rutas activas y una prueba negativa verificó que su API no estuviera publicada.

El cierre permaneció parcial. No se implementaron recepción y asignación profesional explícitas, siguiente acción obligatoria, reapertura controlada ni versiones históricas completas de cada revisión. Por ello, la ausencia de ítems pendientes no fue todavía equivalente a un circuito cerrado integral.

## 4.9 Infraestructura tecnológica utilizada

**Tabla 4.2. Infraestructura de la versión de trabajo**

| Capa | Configuración utilizada | Función |
|---|---|---|
| Cliente | React 18, TypeScript, Vite y Zustand | Interfaces por rol, estado del cliente y captura. |
| Persistencia local | IndexedDB | Cola persistente de evidencias pendientes. |
| Backend | Django, Django REST Framework y Django Channels | API, reglas, autenticación y WebSocket. |
| Base de datos | PostgreSQL 16 en el entorno normal, puerto local 5434 | Estado canónico y registros durables. |
| Mensajería | Redis 7 Alpine, expuesto solo en `127.0.0.1:6379` | Capa de canales y notificaciones. |
| Contenedores | Docker Compose | PostgreSQL y Redis reproducibles. |
| Pruebas backend | SQLite en memoria e `InMemoryChannelLayer` | Aislamiento de pruebas unitarias; no representa la topología normal. |
| Pruebas frontend | Vitest | Verificación de cola y contrato de progreso. |

La evaluación confirmatoria deberá registrar hardware, sistema operativo, versiones exactas del backend, límites de contenedor, almacenamiento, red y hash del código. La tabla anterior describe la composición lógica y las versiones visibles en la configuración, pero no sustituye ese congelamiento.

## 4.10 Configuración de escenarios de prueba

La cobertura automatizada existente se organizó como línea base, no como resultado confirmatorio. Se identificaron casos para identidad por rol, consentimiento, pausa, retiro, evidencia, conflicto de versión, WebSocket, revisión y reporte. Los escenarios de desconexión integral, reinicio de componentes, carga concurrente, linaje y verificación criptográfica quedaron pendientes de construir.

**Tabla 4.3. Relación entre escenarios y estado de ejecución**

| Escenario | Configuración preparada | Estado al cierre de este borrador |
|---|---|---|
| E0: operación nominal | Pruebas unitarias backend y frontend con datos sintéticos. | Cobertura preliminar disponible; falta ejecución confirmatoria congelada. |
| E1: carga concurrente | Niveles previstos de 1, 10, 25, 50 y 100 sesiones. | Generador, duración, repeticiones y telemetría pendientes. |
| E2-E3: desconexión y reconexión | Cola IndexedDB de evidencias y reintento simulado. | Cobertura parcial; falta cola común, controlador de red y oráculo de convergencia. |
| E4-E6: replay, omisión y desorden | Claves idempotentes en respuestas y evidencias. | Replay parcial; omisión y orden causal pendientes. |
| E7: reinicios | Docker para PostgreSQL y Redis. | Guiones de caída y recuperación pendientes. |
| E8: conflictos | Dos actores con igual versión base sobre una respuesta. | Caso preliminar disponible; falta matriz completa de operaciones y auditoría de intentos. |
| E9: recorrido integral | Flujo de captura, revisión y validación parcial. | Linaje formal, hashes y siguiente acción pendientes. |

## 4.11 Procedimiento pendiente de evaluación confirmatoria

La ejecución confirmatoria no se realizó durante la elaboración de este borrador. Antes de iniciarla se deberá completar la instrumentación, cerrar los valores `TBD`, sellar el corpus sintético y los oráculos, fijar la infraestructura y ejecutar cada combinación aplicable sin modificar el código. Cada corrida deberá conservar configuración, semilla, tiempos, logs, snapshots, manifiestos y decisión de inclusión.

Esta declaración evita convertir pruebas unitarias de desarrollo en evidencia de rendimiento o cumplimiento global. Los valores confirmatorios se incorporarán exclusivamente en el capítulo V después de completar el protocolo.

## 4.12 Incidencias y brechas de implementación

La revisión detectó que la implementación ya contiene mecanismos útiles, pero su cobertura es desigual. Los principales bloqueos para la evaluación fueron la ausencia de un contrato común de operaciones, *outbox*, cola offline general, hashes y linaje completo; la falta de telemetría de latencia y recursos; y la inexistencia de guiones reproducibles para carga, red y reinicios.

Estas brechas no se ocultarán mediante resultados parciales. Cada una deberá cerrarse o declararse no aplicable antes de evaluar el indicador correspondiente. Si una dimensión carece de mecanismo, telemetría u oráculo suficiente, su resultado será **indeterminado** y no se reemplazará por una apreciación cualitativa.

# Matriz requisito-código-prueba-evidencia

## Propósito

Esta matriz registra la relación entre los requisitos técnicos prioritarios, los componentes que los implementan, las pruebas que los verifican y la evidencia disponible. No convierte una prueba unitaria en cumplimiento integral: cada fila declara el alcance real y las brechas que aún deben cerrarse antes de la evaluación confirmatoria.

## Línea base y seguridad

| Requisito | Código o configuración | Prueba | Evidencia disponible | Estado |
|---|---|---|---|---|
| Migraciones reproducibles | Migraciones `0001` a `0015` de `evaluaciones` | `manage.py migrate` sobre `dayc2_migration_check` | Migración limpia ejecutada el 2026-09-27 | Verificado |
| Perfil profesional aprobado | `ProfessionalProfile`, `is_approved_professional` | `test_pending_professional_cannot_access_evaluations`, `test_approved_professional_can_access_evaluations` | Pruebas backend | Verificado |
| Propiedad referencial de evaluación | `Evaluación.professional` y migración `0015_evaluacion_professional` | Pruebas de rutas profesionales | Migración aplicada y suite backend | Verificado |
| Aislamiento entre profesionales | Consultas activas filtradas por `professional` | `test_other_approved_professional_cannot_access_owned_evaluation` | Prueba backend | Verificado |
| Rol de participante emitido por servidor | `SessionInvitation`, `join_evaluación` | `test_join_issues_actor_scoped_device_token` | Prueba backend | Verificado |
| Token por dispositivo, expiración y revocación | `SessionAccessToken`, `ensure_session_token`, `rotate_session_credentials` | Pruebas de autorización y contrato multi-actor | Modelo y pruebas backend | Parcial: falta cobertura exhaustiva de rotación y vencimiento por ruta |
| CSRF y cookies de sesión | `settings.py`, endpoint CSRF | `test_session_mutations_require_csrf_token` | Prueba backend | Verificado |
| Redis solo local | `docker-compose.yml` | Inspección de `docker compose ps` | Puerto `127.0.0.1:6379` | Verificado |
| Origen WebSocket validado | `AllowedHostsOriginValidator` en `asgi.py` | Pendiente de prueba de origen no permitido | Configuración ASGI | Parcial |

## Gobernanza, sincronización y cierre

| Requisito | Código o configuración | Prueba | Evidencia disponible | Estado |
|---|---|---|---|---|
| Consentimiento por modalidad | `Consentimiento`, `ConsentRecord`, `accept_consent` | `test_consent_persists_selected_modalities` | Prueba backend | Parcial: faltan finalidad, vigencia y destinatarios |
| Pausa bloquea captura | `pause_session`, `_pause_conflict` | `test_paused_session_rejects_response_submission`, `test_paused_session_rejects_event_and_evidence_capture` | Pruebas backend | Parcial: falta auditoría de actor y motivo |
| Retiro parcial y total | `WithdrawalRecord`, `withdraw_session` | `test_withdrawal_cancels_session_and_revokes_tokens`, `test_partial_withdrawal_revokes_only_selected_modalities` | Pruebas backend | Parcial: faltan derivados, respaldos y carreras |
| Conflicto optimista | `expected_version`, `_require_expected_version`, `DistributedOperation` | `test_second_actor_write_with_same_version_is_rejected` | Prueba backend | Parcial: el conflicto de respuesta se audita y su replay conserva HTTP 409; faltan las demás operaciones |
| Inbox de operaciones | `_receive_operation`, `_apply_operation`, `DistributedOperation` | `test_second_actor_write_with_same_version_is_rejected`, `test_interaction_event_replay_creates_one_effect` | Pruebas backend | Parcial: captura, gobernanza, ciclo de sesión, revisión y cierre persisten operaciones antes de sus efectos; faltan cobertura de replay por cada ruta y operaciones locales del cliente |
| Secuencia causal por dispositivo | Restricción `unique_evaluation_device_sequence` y `_receive_operation` | Migración `0020_distributed_operation_device_sequence` y suite backend | `makemigrations --check` y pruebas backend | Parcial: impide secuencias duplicadas y rechaza secuencias atrasadas; falta ensayo concurrente multiproceso |
| Revisión frente a cierre | `review_item`, `review_complete`, bloqueo transaccional e inbox | Replays de revisión y cierre en `test_multi_actor_contract.py` | Pruebas backend | Verificado en API: edición tras `VALIDATED`/`ARCHIVED` se rechaza y una segunda revisión queda como conflicto recuperable |
| Retiro precede a captura | `withdraw_session`, revocación de tokens y `_pause_conflict` | `test_withdrawal_precedes_subsequent_capture` | Prueba backend | Verificado: el retiro total revoca la credencial y no permite crear eventos posteriores |
| Conflictos recuperables | `_conflict_response`, `_finalize_operation`, `_require_expected_version` | `test_multi_actor_contract.py` | Pruebas backend | Verificado: los conflictos críticos incluyen identificador, versión/estado canónico, estado recuperable y acción permitida |
| Cliente offline y convergencia | `offlineOperationQueue`, `OfflineSyncStatus`, cursor WebSocket | `offline-operation-queue.test.ts`, `offline-sync-status.test.ts`, `evaluaciones-api-offline.test.ts` | Pruebas frontend, build y protocolo WebSocket | Verificado: operaciones y blobs sobreviven recarga, los conflictos/fallos son visibles y REST recupera snapshots/cursor canónicos |
| Integridad de evidencia multimodal | `EvidenceAsset`, hash SHA-256, inspección de firma, auditoría encadenada y backup service | `test_multi_actor_contract.py`, `test_evidence_backup_service.py` | 86 pruebas backend, manifiesto de respaldo versionado | Verificado: originales inmutables, derivados vinculados, corrupción detectable y restauración validada |
| Proveniencia y linaje | `ProvenanceEntity`, `ProvenanceActivity`, `ProvenanceAgent`, `ProvenanceRelation`, `provenance_service` | `test_provenance_lineage.py`, `lineage-api.test.ts` | 88 pruebas backend, 48 frontend, exportación JSON y visor profesional | Verificado: relaciones PROV, recorridos a fuente/usos, detección de huecos y visor profesional |
| Revisión y cierre profesional | `ItemReview`, `ProfessionalReviewAssignment`, `EvaluationClosure`, `VersionedReport` | `test_versioned_review_closure.py`, `evaluaciones-api-review-workflow.test.ts` | 92 pruebas backend, 49 frontend, cierre transaccional | Verificado: asignación/recepción, decisiones versionadas, linaje obligatorio, reapertura y reportes preservados |
| Telemetría y pruebas técnicas | `TelemetryEvent`, `telemetry_report`, arnés técnico y oráculo independiente | `test_telemetry.py`, `test_reproducible_harness.py`, pruebas de cola | 101 pruebas backend, 51 frontend, manifiestos de carga 1/10/25/50/100 | Verificado: métricas, escenarios de fallos, propagación de operación y resultados reproducibles |
| Idempotencia de evidencia | `Idempotency-Key`, restricción única de `Evidencia`, inbox común | Pruebas de contrato y cola | Código y pruebas actuales | Parcial: la ruta se integra al inbox; falta prueba específica de replay de evidencia y cola común del cliente |
| Persistencia local de evidencia | `EvidenceUploadQueue`, IndexedDB | `evidence-queue.test.ts` | Prueba frontend | Parcial: falta cola común y errores visibles |
| Notificación autorizada | `EvaluationConsumer`, Channels y Redis | `test_evaluation_consumer.py`, `distributed-flow.test.ts` | Pruebas backend y frontend | Parcial: faltan cursor y recuperación por huecos |
| Publicación durable posterior al commit | `OutboxEvent`, `outbox_service`, comando `publish_outbox` | Pruebas de outbox y ensayo real de Redis | Evento `04d51483-43d0-4ef7-a1b7-58741e384d4b`: falló con Redis detenido y se publicó tras restaurarlo | Verificado: publicación posterior al commit, reintento y recuperación del publicador tras reinicio de Redis |
| Revisión explícita antes de salida final | `review_complete`, restricción `VALIDATED` | `test_review_completion_requires_explicit_decision_for_each_pending_item`, `test_final_reports_require_validated_evaluation` | Pruebas backend | Parcial: falta recepción, asignación y cierre integral |

## Uso de la matriz

- Las filas **Verificado** tienen evidencia de código y prueba repetible en el estado actual.
- Las filas **Parcial** no pueden declararse como cumplimiento integral en el capítulo V hasta completar su brecha y ejecutar el escenario confirmatorio correspondiente.
- Las evidencias futuras se almacenarán en `evidencias_ejecucion/` con versión, fecha, comando, configuración, resultado y responsable.

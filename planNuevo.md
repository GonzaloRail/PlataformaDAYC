# Plan Completo de Implementación — Plataforma DAYC-2 Semiasistida

> Documento guía para continuar el desarrollo del sistema DAYC-2 semiasistido.  
> Incluye decisiones técnicas, fases, estado actual, tareas pendientes, criterios de finalización y prompt de continuación para OpenCode u otro agente de codificación.

---

## 1. Contexto General

El sistema se está adaptando para funcionar como una plataforma web multidispositivo, híbrida y semiasistida de apoyo a la aplicación del DAYC-2.

La idea central ya no es que el sistema sea únicamente un conjunto de minijuegos, sino una plataforma que administra:

```text
Evaluación → Área → Ítem DAYC-2 → Actividad o evidencia → Resultado preliminar → Revisión profesional → Resultado validado
```

El software debe permitir que el niño realice actividades desde una pantalla infantil, con acompañamiento obligatorio de un adulto, mientras el psicólogo puede revisar después las evidencias generadas y validar los resultados.

---

## 2. Decisiones Confirmadas

| Elemento | Decisión |
|---|---|
| Áreas | Cognitivo, Comunicación, Social-emocional, Desarrollo físico, Conducta adaptativa |
| Psicólogo presente | No siempre |
| Adulto acompañante | Sí, obligatorio durante la sesión infantil |
| Consentimiento | Checkbox inicial obligatorio antes de registrar evidencias |
| Evidencias | Logs y tiempos siempre; capturas/audio/video cuando aplique |
| Revisión | El psicólogo revisa después y valida o corrige |
| Resultado preliminar | Sí, puede calcularse antes de la revisión completa |
| Resultado final | Solo después de validación profesional |
| Regla de parada MVP | 3 errores consecutivos terminan solo el área actual y se pasa a la siguiente |
| Base/techo oficial DAYC-2 | No se implementa todavía en el MVP |
| Almacenamiento de evidencias | Backend local privado por ahora |
| Enfoque de tesis | Plataforma de apoyo, no reemplazo del psicólogo |

---

## 3. Objetivo Técnico General

Convertir el sistema actual en una plataforma híbrida y semiasistida de apoyo al DAYC-2, con capacidad para:

- Crear evaluaciones por niño.
- Generar código de sesión.
- Permitir ingreso del adulto acompañante con código.
- Completar datos faltantes del niño si es necesario.
- Solicitar consentimiento inicial obligatorio.
- Aplicar ítems por áreas.
- Registrar logs, tiempos y evidencias.
- Detener solo el área actual después de 3 errores consecutivos.
- Pasar automáticamente a la siguiente área.
- Generar resultado preliminar.
- Permitir revisión profesional posterior.
- Calcular resultado validado.
- Comparar sistema vs psicólogo.
- Generar reporte final.
- Obtener métricas para tesis.

---

## 4. Estado Actual del Proyecto

### 4.1. Ya implementado

La primera base funcional del nuevo enfoque ya fue implementada.

| Componente | Estado |
|---|---|
| Modelos nuevos de evaluación por ítem | Hecho |
| Modelo de consentimiento | Hecho |
| Modelo de evidencia | Hecho |
| Modelo de eventos de interacción | Hecho |
| Catálogo base de cinco áreas | Hecho |
| Servicio de catálogo | Hecho |
| Servicio de flujo DAYC-2 | Hecho |
| Regla de 3 errores consecutivos | Hecho |
| Endpoints de sesión semiasistida | Hecho |
| Endpoints de consentimiento | Hecho |
| Endpoints de revisión profesional | Hecho |
| Endpoints de scoring preliminar/validado | Hecho |
| Pantalla infantil semiasistida | Hecho |
| Pantalla de revisión profesional básica | Hecho |
| Migración Django | Hecho |
| Pruebas de regla actualizadas | Hecho |
| Build frontend | Hecho |

### 4.2. Verificaciones realizadas

```bash
./venv/bin/python manage.py check
./venv/bin/python manage.py migrate
./venv/bin/python -m pytest
npm run build
```

Resultado reportado:

```text
Django check: OK
Migraciones: OK
Pytest: 47 passed
Frontend build: OK
```

---

## 5. Archivos Clave Ya Tocadas o Creados

### 5.1. Backend

```text
backend/src/api/evaluaciones/models.py
backend/src/api/evaluaciones/views.py
backend/src/api/evaluaciones/urls.py
backend/src/application/services/item_catalog_service.py
backend/src/application/services/dayc2_flow_service.py
backend/src/application/services/rules_service.py
backend/src/application/services/scoring_service.py
backend/src/application/catalog/dayc2_items/cognitivo.json
backend/src/application/catalog/dayc2_items/comunicacion.json
backend/src/application/catalog/dayc2_items/social_emocional.json
backend/src/application/catalog/dayc2_items/desarrollo_fisico.json
backend/src/application/catalog/dayc2_items/conducta_adaptativa.json
```

### 5.2. Frontend

```text
frontend/src/pages/child/EvaluationSession.tsx
frontend/src/pages/child/EvaluationSession.css
frontend/src/pages/psychologist/ReviewPage.tsx
frontend/src/pages/psychologist/ReviewPage.css
frontend/src/services/evaluacionesApi.ts
frontend/src/types/index.ts
frontend/src/App.tsx
frontend/src/components/psychologist/EvaluationDetail.tsx
frontend/src/pages/psychologist/Dashboard.tsx
```

---

# 6. Plan Completo por Fases

---

## Fase 1 — Base del Nuevo Modelo DAYC-2 Semiasistido

**Estado:** Hecho.

### Objetivo

Dejar de depender de `minijuego_id` como centro del sistema y pasar a una lógica basada en:

```text
Ítem DAYC-2 + evidencia + revisión profesional
```

### Tareas

- [x] Crear modelo `EvaluacionItem`.
- [x] Crear modelo `Consentimiento`.
- [x] Crear modelo `Evidencia`.
- [x] Crear modelo `InteractionEvent`.
- [x] Ampliar modelo `Evaluación`.
- [x] Ampliar modelo `Respuesta`.
- [x] Agregar estados nuevos de evaluación.
- [x] Agregar estados nuevos por ítem.
- [x] Crear migración Django.
- [x] Aplicar migración local.

### Estados de evaluación considerados

```text
CREATED
WAITING_CHILD_DATA
WAITING_CONSENT
IN_PROGRESS
PENDING_REVIEW
REVIEW_IN_PROGRESS
VALIDATED
COMPLETED
ARCHIVED
CANCELLED
```

### Estados por ítem

```text
PENDING
IN_PROGRESS
AUTO_VALIDATED
NEEDS_REVIEW
REVIEWED
INCONCLUSIVE
NOT_ADMINISTERED
```

### Resultados por ítem

```text
PASS
FAIL
INCONCLUSIVE
NOT_ADMINISTERED
```

### Fuentes de respuesta

```text
SYSTEM_AUTO
SYSTEM_ASSISTED
CHILD_INTERACTION
ADULT_ASSISTED
PSYCHOLOGIST_REVIEW
```

---

## Fase 2 — Catálogo Base DAYC-2 de Cinco Áreas

**Estado:** Hecho parcialmente.

### Objetivo

Tener una estructura inicial para las cinco áreas del DAYC-2, sin copiar contenido protegido del test.

### Áreas

- [x] Cognitivo.
- [x] Comunicación.
- [x] Social-emocional.
- [x] Desarrollo físico.
- [x] Conducta adaptativa.

### Carpeta creada

```text
backend/src/application/catalog/dayc2_items/
```

### Archivos creados

```text
cognitivo.json
comunicacion.json
social_emocional.json
desarrollo_fisico.json
conducta_adaptativa.json
```

### Formato base por ítem

```json
{
  "id": "COGNITIVO_001",
  "area": "COGNITIVO",
  "numero": 1,
  "edad_inicio_min_meses": 48,
  "edad_inicio_max_meses": 71,
  "modalidad": "INTERACTIVO_ASISTIDO",
  "pantalla_nino": "ACTIVIDAD",
  "gamificable": true,
  "auto_validable": true,
  "requiere_evidencia": true,
  "tipos_evidencia": ["LOG", "VIDEO"],
  "actividad_digital": "COGNITIVO_001",
  "requiere_revision_psicologo": false,
  "descripcion_general": "Descripción general sin copiar contenido protegido"
}
```

### Modalidades

```text
INTERACTIVO_AUTO
INTERACTIVO_ASISTIDO
EVIDENCIA_DIFERIDA
OBSERVACION_FISICA
PREGUNTA_CUIDADOR
MANUAL_GUIADO
```

### Pantallas del niño

```text
ACTIVIDAD
ESTIMULO
INSTRUCCION_SIMPLE
ESPERA_ADULTO
PANTALLA_NEUTRA
NINGUNA
```

### Pendiente

- [ ] Reemplazar catálogo base por catálogo más realista.
- [ ] Alinear ítems con el instrumento real sin copiar contenido protegido.
- [ ] Definir cuáles ítems serán digitales, asistidos, físicos o de cuidador.
- [ ] Validar catálogo con psicólogo especialista.

---

## Fase 3 — Servicios de Catálogo y Flujo DAYC-2

**Estado:** Hecho.

### Objetivo

Controlar qué área e ítem corresponde aplicar, y avanzar según la regla definida.

### Servicios creados

```text
backend/src/application/services/item_catalog_service.py
backend/src/application/services/dayc2_flow_service.py
```

### Funciones principales

- [x] Cargar ítems por área.
- [x] Obtener orden de áreas.
- [x] Seleccionar ítem inicial.
- [x] Obtener ítem actual.
- [x] Avanzar al siguiente ítem.
- [x] Terminar área actual.
- [x] Pasar a la siguiente área.
- [x] Finalizar evaluación cuando ya no hay más áreas.

### Orden de áreas

```text
COGNITIVO
COMUNICACION
SOCIAL_EMOCIONAL
DESARROLLO_FISICO
CONDUCTA_ADAPTATIVA
```

---

## Fase 4 — Regla MVP de Parada por Área

**Estado:** Hecho.

### Regla aprobada

```text
3 errores consecutivos terminan solo el área actual y se pasa a la siguiente área.
```

### Importante

No se detiene toda la evaluación cuando hay 3 errores.  
Solo termina el área actual.

### Ejemplo

```text
Área Cognitivo:
Ítem 1: PASS
Ítem 2: FAIL
Ítem 3: FAIL
Ítem 4: FAIL

Resultado:
Termina Cognitivo y pasa a Comunicación.
```

### Tareas realizadas

- [x] Reemplazar reglas antiguas de base/límite.
- [x] Crear regla `STOP_3_ERRORES_CONSECUTIVOS`.
- [x] Actualizar pruebas unitarias.
- [x] Confirmar que los tests pasan.

### Pendiente futuro

- [ ] Implementar reglas oficiales de base/techo DAYC-2 si la tesis lo requiere.
- [ ] Documentar que el MVP usa una regla simplificada.

---

## Fase 5 — Flujo del Niño y Adulto Acompañante

**Estado:** Hecho en versión base.

### Objetivo

Permitir que el adulto acompañante ingrese con un código y complete el flujo infantil.

### Rutas frontend

```text
/child/entry
/child/complete-data/:sessionCode
/child/consent/:sessionCode
/child/session/:sessionCode
/child/session/:sessionCode/complete
```

En la implementación actual, gran parte de este flujo se maneja dentro de:

```text
frontend/src/pages/child/EvaluationSession.tsx
```

### Flujo implementado

- [x] Adulto ingresa con código.
- [x] Sistema consulta estado de sesión.
- [x] Si faltan datos, muestra formulario.
- [x] Luego muestra consentimiento.
- [x] Luego inicia sesión infantil.
- [x] Muestra actividad guiada.
- [x] Registra respuesta.
- [x] Avanza de ítem/área.
- [x] Permite cerrar sesión con observación opcional.

### Datos mínimos si faltan

```text
nombre
fecha_nacimiento
género si aplica
nombre_informante
relación_informante
periodo_conoce_nino
```

### Decisión importante

El adulto no escribe edad en meses.  
El sistema calcula la edad desde la fecha de nacimiento.

### Endpoints creados

```text
GET  /api/evaluaciones/session/{code}/state/
POST /api/evaluaciones/session/{code}/complete-child-data/
POST /api/evaluaciones/session/{code}/consent/
POST /api/evaluaciones/session/{code}/start/
POST /api/evaluaciones/session/{code}/finish/
```

---

## Fase 6 — Consentimiento Inicial

**Estado:** Hecho en versión base.

### Objetivo

Pedir autorización una sola vez antes de registrar evidencias.

### Pantalla

Debe mostrar:

- Datos básicos de la sesión.
- Texto corto de consentimiento.
- Checkbox obligatorio.
- Botón iniciar.

### Texto base

```text
Acepto que la plataforma registre logs de interacción, tiempos, capturas y, cuando sea necesario, audio o video breve para que el psicólogo pueda revisar posteriormente la evaluación.
```

### Campos backend

```text
evaluación
accepted
accepted_at
consent_text_version
accepted_logs
accepted_screenshots
accepted_audio
accepted_video
user_agent
ip_address
adult_observation
```

### Tareas realizadas

- [x] Crear modelo `Consentimiento`.
- [x] Crear endpoint de consentimiento.
- [x] Agregar pantalla de consentimiento.
- [x] No mostrar consentimiento durante actividades.

### Pendiente

- [ ] Versionar formalmente el texto de consentimiento.
- [ ] Bloquear completamente evidencia si no existe consentimiento aceptado.
- [ ] Agregar trazabilidad legal más clara.

---

## Fase 7 — Registro de Evidencias Reales

**Estado:** Pendiente.  
**Esta es la fase donde se quedó el desarrollo.**

### Objetivo

Que el sistema registre evidencia real revisable por el psicólogo.

### Regla

```text
Logs y tiempos: siempre.
Capturas: cuando aplique.
Audio/video: solo cuando el ítem lo requiera.
Observación del adulto: opcional al final.
```

### Tipos de evidencia

```text
LOG
TIME_EVENT
SCREENSHOT
AUDIO
VIDEO
CAMERA_FRAME
SYSTEM_RESULT
```

### Almacenamiento

```text
backend/media/evidencias/evaluacion_{id}/item_{item_id}/
```

### Endpoints que deben quedar completos

```text
POST /api/evaluaciones/{id}/items/{item_id}/events/
POST /api/evaluaciones/{id}/items/{item_id}/evidence/
GET  /api/evaluaciones/{id}/items/{item_id}/evidence/
GET  /api/evidencias/{evidence_id}/download/
```

### Backend pendiente

- [ ] Crear endpoint para listar evidencias por ítem.
- [ ] Crear endpoint de descarga protegida.
- [ ] Serializar evidencias con datos completos.
- [ ] Validar que la evaluación exista.
- [ ] Validar que el ítem pertenezca a la evaluación.
- [ ] Validar consentimiento antes de guardar evidencia.
- [ ] Validar tipo de evidencia permitido.
- [ ] Validar tamaño máximo de archivo.
- [ ] Validar duración máxima de audio/video.
- [ ] Evitar exposición directa de archivos sensibles.

### Frontend pendiente

Crear componentes:

```text
InteractionLogger
EvidenceRecorder
ScreenshotCapture
AudioRecorder
VideoRecorder
EvidenceUploadQueue
```

### Tareas frontend

- [ ] Registrar logs automáticamente.
- [ ] Registrar inicio y fin de cada ítem.
- [ ] Registrar duración por ítem.
- [ ] Capturar screenshot cuando `tipos_evidencia` incluya `SCREENSHOT`.
- [ ] Grabar audio cuando `tipos_evidencia` incluya `AUDIO`.
- [ ] Grabar video cuando `tipos_evidencia` incluya `VIDEO`.
- [ ] Subir evidencias al backend.
- [ ] No interrumpir sesión si falla la subida.
- [ ] Guardar evidencias pendientes en cola local temporal si falla la red.

---

## Fase 8 — Visor de Evidencias para el Psicólogo

**Estado:** Pendiente.

### Objetivo

Permitir que el psicólogo vea las evidencias antes de validar o corregir un ítem.

### Componente principal

```text
frontend/src/components/evidence/EvidenceViewer.tsx
```

### Integración

```text
frontend/src/pages/psychologist/ReviewPage.tsx
```

### Evidencias y visualización

| Tipo | Visualización |
|---|---|
| LOG | Tabla o JSON resumido |
| TIME_EVENT | Línea de tiempo simple |
| SCREENSHOT | Imagen |
| AUDIO | Reproductor de audio |
| VIDEO | Reproductor de video |
| CAMERA_FRAME | Imagen/frame |
| SYSTEM_RESULT | Resultado sugerido, confianza y raw data |

### Tareas

- [ ] Crear `EvidenceViewer`.
- [ ] Consumir endpoint de evidencias por ítem.
- [ ] Mostrar lista de evidencias.
- [ ] Mostrar imagen si es captura.
- [ ] Mostrar player si es audio.
- [ ] Mostrar player si es video.
- [ ] Mostrar logs en formato legible.
- [ ] Integrar visor en `ReviewPage`.
- [ ] Evitar que el psicólogo valide sin revisar si el ítem requiere evidencia.

---

## Fase 9 — Seguridad de Sesión Infantil

**Estado:** Pendiente.

### Objetivo

Proteger los endpoints públicos usados por la pantalla infantil.

### Seguridad requerida

- [ ] Crear `session_token` después del consentimiento.
- [ ] Enviar `session_token` desde frontend infantil.
- [ ] Validar `session_token` en endpoints sensibles.
- [ ] Validar expiración de sesión.
- [ ] Validar consentimiento aceptado.
- [ ] Validar que evaluación esté activa.
- [ ] Validar que el código de sesión sea correcto.
- [ ] Evitar acceso directo a archivos de evidencia.
- [ ] Descargar evidencia solo desde endpoint controlado.
- [ ] Limitar tamaño de archivos.
- [ ] Limitar duración de audio/video.
- [ ] Validar que el psicólogo dueño pueda ver evidencias.

### Endpoints a reforzar

```text
/session/{code}/start/
/session/{code}/finish/
/session/{code}/respuesta/
/items/{item_id}/events/
/items/{item_id}/evidence/
```

---

## Fase 10 — Rediseño de Sesión Infantil con Actividades

**Estado:** Parcial.

### Objetivo

Convertir la sesión infantil en una experiencia guiada, registrable y conectada al catálogo.

### Componentes actuales

```text
frontend/src/pages/child/EvaluationSession.tsx
```

### Componentes recomendados

```text
ChildSessionShell
ChildItemRenderer
ChildWaitingScreen
ChildInstructionScreen
ChildActivityLoader
ChildSessionComplete
AdultFinalObservation
```

### Flujo ideal por ítem

- [x] Solicitar ítem actual.
- [x] Iniciar timer.
- [x] Registrar interacción.
- [ ] Activar evidencia según política.
- [ ] Renderizar actividad digital si existe.
- [ ] Subir evidencias.
- [x] Completar ítem.
- [x] Backend decide si sigue área o pasa a siguiente.
- [x] Backend decide si termina evaluación.

---

## Fase 11 — Convertir Minijuegos en Actividades Digitales

**Estado:** Pendiente.

### Objetivo

Reutilizar lo ya creado, pero sin que el sistema dependa conceptualmente de “minijuegos”.

### Cambio conceptual

```text
Antes:
minijuego_id → respuesta

Ahora:
item DAYC-2 → actividad digital opcional → evidencia → resultado preliminar → revisión
```

### Cambios visibles

```text
Minijuegos → Actividades digitales
Catálogo de minijuegos → Catálogo de actividades digitales
Fallback → Revisión o registro asistido
```

### Archivos probables

```text
frontend/src/components/minijuegos/registry.tsx
frontend/src/components/minijuegos/MinijuegoLoader.tsx
```

### Componentes nuevos/recomendados

```text
ActivityLoader
ActivityRegistry
DigitalActivityShell
```

### Contrato propuesto

```ts
interface DigitalActivityResult {
  itemId: string
  suggestedResult: 'PASS' | 'FAIL' | 'INCONCLUSIVE'
  confidence: number
  needsReview: boolean
  rawData: Record<string, unknown>
  durationMs: number
}
```

### Tareas

- [ ] Crear contrato `DigitalActivityResult`.
- [ ] Adaptar actividades existentes.
- [ ] Asociar actividad a `item_id`.
- [ ] Enviar resultado preliminar al backend.
- [ ] Registrar evidencia de la actividad.
- [ ] Mantener compatibilidad temporal con minijuegos existentes.
- [ ] Renombrar visualmente “minijuego” a “actividad digital”.

---

## Fase 12 — Validación Preliminar del Sistema

**Estado:** Parcial.

### Objetivo

Que el sistema sugiera respuestas cuando sea viable.

### Casos

| Caso | Resultado |
|---|---|
| Actividad detectada correctamente | `PASS` preliminar |
| Actividad detectada como fallida | `FAIL` preliminar |
| Baja confianza | `NEEDS_REVIEW` |
| Falla cámara/audio | `NEEDS_REVIEW` o `INCONCLUSIVE` |
| Ítem no autovalidable | `NEEDS_REVIEW` |

### Ya existe

```text
system_result
system_confidence
requires_review
final_result
```

### Endpoint recomendado

```text
POST /api/evaluaciones/{id}/items/{item_id}/auto-result/
```

### Pendiente

- [ ] Separar endpoint de autoresultado.
- [ ] Manejar confianza baja.
- [ ] Manejar fallos de cámara/audio.
- [ ] Guardar raw data de actividad digital.
- [ ] Generar `SYSTEM_RESULT` como evidencia.
- [ ] Marcar automáticamente ítems que requieren revisión.

---

## Fase 13 — Panel de Revisión Profesional

**Estado:** Base hecha, falta visor de evidencias.

### Ruta

```text
/psychologist/evaluations/:evaluacionId/review
```

### Funciones ya implementadas

- [x] Lista de ítems por evaluación.
- [x] Resultado preliminar del sistema.
- [x] Confianza del sistema.
- [x] Resultado final.
- [x] Observación profesional.
- [x] Validar como pasó.
- [x] Validar como no pasó.
- [x] Marcar inconcluso.
- [x] Marcar no administrado.
- [x] Finalizar revisión.

### Falta

- [ ] Ver capturas.
- [ ] Reproducir audio.
- [ ] Reproducir video.
- [ ] Ver logs.
- [ ] Ver línea de tiempo del ítem.
- [ ] Ver raw data.
- [ ] Mostrar alerta si faltan evidencias.
- [ ] Bloquear o advertir si se finaliza revisión con pendientes.

---

## Fase 14 — Cálculo Preliminar, Validado y Comparación

**Estado:** Base hecha.

### Tipos de cálculo

```text
PRELIMINARY
VALIDATED
```

### Preliminar

Usa:

```text
system_result
```

Sirve para:

- Comparación.
- Métricas de tesis.
- Estimar resultado antes de revisión.

### Validado

Usa:

```text
final_result
```

Sirve para:

- Reporte final.
- Resultado oficial del sistema.
- Comparación con preliminar.

### Endpoints creados

```text
POST /api/evaluaciones/{id}/score/preliminary/
POST /api/evaluaciones/{id}/score/validated/
GET  /api/evaluaciones/{id}/score/comparison/
```

### Comparación esperada

```text
ítems coincidentes
ítems corregidos
ítems pendientes
porcentaje de concordancia
concordancia por área
```

### Pendiente

- [ ] Guardar snapshot preliminar.
- [ ] Guardar snapshot validado.
- [ ] Calcular concordancia por área.
- [ ] Mostrar comparación visual.
- [ ] Exportar comparación para métricas.
- [ ] Ajustar scoring a reglas psicométricas reales si corresponde.

---

## Fase 15 — Reporte PDF Nuevo

**Estado:** Pendiente.

### Objetivo

Actualizar el reporte para reflejar el enfoque semiasistido.

### Debe incluir

- [ ] Datos del niño.
- [ ] Edad en meses.
- [ ] Adulto acompañante o informante.
- [ ] Psicólogo responsable.
- [ ] Áreas evaluadas.
- [ ] Resultados preliminares.
- [ ] Resultados validados.
- [ ] Estado de revisión.
- [ ] Resumen de evidencias.
- [ ] Observaciones del psicólogo.
- [ ] Observación final del adulto.
- [ ] Advertencia de herramienta de apoyo.

### Cambio de redacción

No usar:

```text
Diagnóstico AI
```

Usar:

```text
Resumen narrativo asistido
```

### Archivo probable

```text
backend/src/infrastructure/pdf/reporte_generator.py
```

---

## Fase 16 — Métricas para la Tesis

**Estado:** Pendiente.

### Objetivo

Generar datos útiles para el Capítulo IV.

### Métricas necesarias

- [ ] Evaluaciones iniciadas.
- [ ] Evaluaciones completadas.
- [ ] Tiempo promedio de sesión.
- [ ] Tiempo promedio de revisión.
- [ ] Ítems auto-validados.
- [ ] Ítems pendientes.
- [ ] Ítems corregidos por psicólogo.
- [ ] Porcentaje de concordancia.
- [ ] Concordancia por área.
- [ ] Fallos de cámara/audio.
- [ ] Cantidad de evidencias generadas.
- [ ] Cantidad de evidencias por tipo.
- [ ] Tiempo promedio por área.
- [ ] Tiempo promedio por ítem.
- [ ] Porcentaje de ítems inconclusos.

### Pantalla

```text
/research/metrics
```

### Backend

```text
backend/src/api/metricas/views.py
```

---

## Fase 17 — Seguridad General y Privacidad

**Estado:** Pendiente.

### Objetivo

Proteger datos de menores y evidencias sensibles.

### Tareas

- [ ] Evitar que archivos estén disponibles públicamente por URL directa.
- [ ] Validar psicólogo dueño de evaluación.
- [ ] Validar sesión infantil por token.
- [ ] Validar consentimiento antes de evidencias.
- [ ] Limitar duración de audio/video.
- [ ] Limitar tamaño de archivo.
- [ ] Sanitizar metadata.
- [ ] Evitar exponer rutas internas del servidor.
- [ ] Registrar acceso a evidencia.
- [ ] Manejar expiración del código de sesión.
- [ ] Desactivar sesiones cerradas.
- [ ] Evitar que el adulto vea panel profesional.
- [ ] Evitar que el psicólogo vea evaluaciones ajenas.

---

## Fase 18 — Pruebas Automatizadas

**Estado:** Parcial.

### Backend recomendado

```text
test_catalog_service.py
test_edad_service.py
test_dayc2_flow_service.py
test_three_errors_rule.py
test_consentimiento.py
test_evidencias.py
test_review_service.py
test_scoring_preliminary.py
test_scoring_validated.py
test_comparison.py
test_session_token.py
```

### Frontend recomendado

```text
SessionEntry
CompleteChildData
ConsentPage
ChildSession
EvidenceRecorder
ReviewDashboard
EvidenceViewer
ComparisonPage
```

### Pruebas manuales

- [ ] Crear niño completo.
- [ ] Crear sesión incompleta.
- [ ] Adulto completa datos faltantes.
- [ ] Adulto acepta consentimiento.
- [ ] Niño realiza actividad.
- [ ] Sistema registra logs.
- [ ] Sistema sube evidencia.
- [ ] Sistema genera preliminar.
- [ ] Psicólogo revisa.
- [ ] Psicólogo corrige.
- [ ] Sistema calcula validado.
- [ ] Sistema compara resultados.
- [ ] Sistema genera reporte.
- [ ] Sistema muestra métricas.

---

# 7. Orden de Codificación Recomendado desde el Estado Actual

Como la Fase 1 ya se hizo, el siguiente orden real debería ser:

| Orden | Bloque | Estado |
|---|---|---|
| 1 | Backend: listar y descargar evidencias | Pendiente |
| 2 | Backend: proteger evidencias y validar consentimiento | Pendiente |
| 3 | Frontend: crear EvidenceRecorder | Pendiente |
| 4 | Frontend: capturar screenshot/audio/video | Pendiente |
| 5 | Frontend: subir evidencia al backend | Pendiente |
| 6 | Frontend: crear EvidenceViewer | Pendiente |
| 7 | Integrar EvidenceViewer en ReviewPage | Pendiente |
| 8 | Agregar session_token obligatorio | Pendiente |
| 9 | Integrar actividades digitales reales | Pendiente |
| 10 | Separar auto-result endpoint | Pendiente |
| 11 | Mejorar scoring y comparación por área | Pendiente |
| 12 | Actualizar reporte PDF | Pendiente |
| 13 | Agregar métricas de tesis | Pendiente |
| 14 | Pruebas automatizadas y manuales | Pendiente |

---

# 8. MVP Mínimo Defendible

El MVP defendible debe permitir demostrar todo el flujo, aunque no todos los ítems estén completos.

## Debe tener

- [x] Cinco áreas creadas en catálogo.
- [x] Consentimiento inicial.
- [x] Datos faltantes.
- [x] Sesión infantil.
- [x] Logs y tiempos básicos.
- [ ] Evidencia real tipo captura/audio/video.
- [ ] Una actividad digital auto-validable real.
- [x] Panel de revisión.
- [x] Regla 3 errores por área.
- [x] Resultado preliminar.
- [x] Resultado validado.
- [x] Comparación preliminar vs validado.
- [ ] Reporte actualizado.
- [ ] Métricas para tesis.

---

# 9. Criterio de Finalización General

El cambio estará listo cuando se pueda hacer este flujo completo:

- [ ] Psicólogo crea evaluación.
- [ ] Adulto entra con código.
- [ ] Adulto completa datos si faltan.
- [ ] Adulto acepta consentimiento.
- [ ] Niño realiza sesión por áreas.
- [ ] Sistema registra logs/evidencias.
- [ ] Sistema corta área con 3 errores consecutivos.
- [ ] Sistema pasa a siguiente área.
- [ ] Sistema genera resultado preliminar.
- [ ] Psicólogo revisa evidencias.
- [ ] Psicólogo valida o corrige.
- [ ] Sistema calcula resultado validado.
- [ ] Sistema compara preliminar vs validado.
- [ ] Sistema genera reporte.
- [ ] Sistema muestra métricas para tesis.

---

# 10. Punto Exacto de Continuación

El desarrollo quedó justo al inicio de:

```text
Fase 7 — Registro de Evidencias Reales
Fase 8 — Visor de Evidencias para el Psicólogo
Fase 9 — Seguridad de Sesión Infantil
```

La lista inmediata que había quedado fue:

```text
[•] Agregar listado y descarga protegida de evidencias en backend
[ ] Implementar grabación/captura y subida de evidencias en sesión infantil
[ ] Crear visor de evidencias en panel de revisión
[ ] Agregar validación básica de token de sesión infantil
[ ] Ejecutar pruebas backend y build frontend
```

---

# 11. Prompt Para Continuar en OpenCode

Copia y pega este prompt en OpenCode o en el agente que esté conectado al código:

```text
Continúa desde la implementación ya realizada del flujo DAYC-2 semiasistido.

Ya está hecho:
- Modelos EvaluacionItem, Consentimiento, Evidencia e InteractionEvent.
- Catálogo base de cinco áreas.
- ItemCatalogService y Dayc2FlowService.
- Regla MVP: 3 errores consecutivos terminan solo el área actual y pasan a la siguiente.
- Endpoints de sesión, consentimiento, respuesta, revisión, scoring preliminar, scoring validado y comparación.
- Pantalla infantil semiasistida.
- Pantalla de revisión profesional.
- Migración aplicada.
- Tests backend y build frontend pasaron.

Ahora implementa la siguiente fase: evidencias reales.

Tareas:
1. Backend:
   - Agregar endpoint GET /api/evaluaciones/{id}/items/{item_id}/evidence/
   - Agregar endpoint GET /api/evidencias/{evidence_id}/download/
   - Serializar evidencias con id, type, url protegida, metadata, duration_ms, size_bytes, created_at.
   - Validar consentimiento antes de permitir registrar evidencias.
   - Validar que la evaluación exista y que el ítem pertenezca a la evaluación.
   - Proteger descarga para que solo el psicólogo dueño pueda descargar o, en flujo infantil, solo con session_token válido.

2. Frontend sesión infantil:
   - Crear InteractionLogger.
   - Crear EvidenceRecorder.
   - Crear ScreenshotCapture.
   - Crear AudioRecorder.
   - Crear VideoRecorder.
   - Crear EvidenceUploadQueue.
   - Según task.tipos_evidencia, capturar LOG siempre y capturar SCREENSHOT/AUDIO/VIDEO cuando aplique.
   - Subir evidencia a POST /api/evaluaciones/{id}/items/{item_id}/evidence/.
   - No interrumpir la sesión si falla la subida; mostrar aviso suave o dejar pendiente.

3. Frontend revisión:
   - Crear EvidenceViewer.
   - Integrarlo en frontend/src/pages/psychologist/ReviewPage.tsx.
   - Mostrar logs, capturas, audio y video por ítem.
   - Permitir al psicólogo revisar la evidencia antes de validar.

4. Seguridad:
   - Usar session_token después del consentimiento.
   - Enviar session_token desde el frontend infantil en cada request sensible.
   - Rechazar evidencia si no hay consentimiento aceptado.
   - No exponer archivos directamente desde media pública.

5. Verificación:
   - Ejecutar ./venv/bin/python manage.py check
   - Ejecutar ./venv/bin/python -m pytest
   - Ejecutar npm run build

No cambies la regla de parada. La regla sigue siendo:
3 errores consecutivos terminan el área actual y pasan a la siguiente.
```

---

# 12. Nota Metodológica para la Tesis

Este sistema debe presentarse como una herramienta de apoyo y no como reemplazo del psicólogo.

Redacción sugerida:

```text
La plataforma propuesta no reemplaza la aplicación clínica profesional del DAYC-2, sino que funciona como un sistema web multidispositivo de apoyo semiasistido. Su propósito es estructurar la aplicación de ítems, registrar evidencias digitales, calcular resultados preliminares y facilitar la revisión posterior por parte del psicólogo responsable. El resultado final de la evaluación depende de la validación profesional.
```

---

# 13. Resumen Ejecutivo

En una frase:

```text
El proyecto ya tiene la base del flujo DAYC-2 semiasistido; ahora falta completar evidencias reales, visor profesional, seguridad, reporte y métricas.
```

En términos técnicos:

```text
Ya se pasó de minijuego_id a una arquitectura por ítem DAYC-2, con catálogo de áreas, flujo por regla de 3 errores, consentimiento, revisión y scoring.
```

Siguiente paso inmediato:

```text
Implementar evidencias reales: captura, subida, listado, descarga protegida y visor en revisión.
```
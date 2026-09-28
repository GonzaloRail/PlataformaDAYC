# CAPÍTULO V: RESULTADOS Y DISCUSIÓN

## Estado del capítulo

Este capítulo constituye la estructura preparada para registrar la evaluación confirmatoria. No contiene valores simulados ni convierte las pruebas unitarias de desarrollo en resultados de la hipótesis. Las tablas se completarán después de congelar el protocolo y ejecutar los escenarios descritos en los capítulos III y IV.

La presentación mantendrá dos momentos separados. Primero se describirán los resultados observados, sin explicar sus causas ni compararlos con otros trabajos. Después se desarrollará la discusión, en la que se interpretarán los hallazgos y se contrastarán con el estado del arte.

## 5.1 Presentación general de resultados

La evaluación se reportará por indicador, dimensión y escenario. Cada registro deberá identificar versión del prototipo, configuración, carga, perfil de red, repetición, unidad experimental, cantidad de observaciones válidas y regla aplicada a datos faltantes.

**Tabla 5.1. Resumen de ejecuciones confirmatorias**

| Escenario | Versión | Configuración | Repeticiones válidas | Desviaciones | Estado |
|---|---|---|---:|---|---|
| E0: operación nominal | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E1: carga concurrente | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E2-E3: desconexión y reconexión | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E4-E6: replay, omisión y desorden | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E7: reinicios | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E8: conflictos | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |
| E9: recorrido integral | Pendiente | Pendiente | Pendiente | Pendiente | No ejecutado |

## 5.2 Resultados de continuidad y recuperación

Esta sección presentará `I01` e `I02`: porcentaje de operaciones críticas conservadas localmente, porcentaje recuperado después del fallo y tiempo de recuperación. Se separarán desconexión, reinicio de navegador, reinicio de servicios y reconexión.

**Tabla 5.2. Continuidad y recuperación**

| Escenario | Operaciones programadas | Operaciones durables | Operaciones recuperadas | Tiempo de recuperación | Dictamen |
|---|---:|---:|---:|---:|---|
| Pendiente de ejecución | Pendiente | Pendiente | Pendiente | Pendiente | Indeterminado |

## 5.3 Resultados de sincronización multi-actor

Se informarán convergencia, pérdida, efectos duplicados, precedencias inválidas, conflictos detectados y conflictos resueltos conforme a la política (`I07-I12`). Los resultados se desagregarán por tipo de operación y combinación de actores.

**Tabla 5.3. Consistencia y confiabilidad de eventos**

| Indicador | Escenario | Numerador | Denominador | Resultado | Criterio | Dictamen |
|---|---|---:|---:|---:|---|---|
| `I07-I12` | Pendiente | Pendiente | Pendiente | Pendiente | Preespecificado | Indeterminado |

## 5.4 Resultados de tiempo casi real y desempeño

Se describirán percentiles P50, P95 y P99 de latencia, throughput, tasa de error y recursos para 1, 10, 25, 50 y 100 sesiones (`I03-I06`). No se utilizará únicamente el promedio y no se mezclarán periodos de calentamiento, medición estable y vaciado.

**Tabla 5.4. Desempeño por nivel de concurrencia**

| Sesiones | Operaciones válidas | P50 | P95 | P99 | Throughput | Error | CPU P95 | RAM P95 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 10 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 25 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 50 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| 100 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

## 5.5 Resultados de trazabilidad, proveniencia e integridad

Esta sección registrará completitud de metadatos, resultados reconstruibles, huecos detectados, hashes vigentes, derivados verificables y actualizaciones versionadas (`I13-I19`). Cada recorrido deberá adjuntar el identificador del manifiesto y la evidencia reproducible de la consulta.

**Tabla 5.5. Reconstrucción del linaje**

| Resultado seleccionado | Fuentes esperadas | Fuentes encontradas | Transformaciones verificadas | Huecos detectados | Reconstruible |
|---|---:|---:|---:|---:|---|
| Pendiente de ejecución | Pendiente | Pendiente | Pendiente | Pendiente | Indeterminado |

## 5.6 Resultados de evidencia multimodal

Se presentarán disponibilidad, estados de calidad, duración utilizable, defectos detectados y alineación temporal cuando corresponda (`I20-I25`). Las modalidades no autorizadas o sin referencia temporal común se declararán no aplicables antes de ejecutar la prueba.

**Tabla 5.6. Disponibilidad y calidad por modalidad**

| Modalidad | Esperadas | Recuperables | Ausencias documentadas | Defectos detectados | Alineación aplicable | Dictamen |
|---|---:|---:|---:|---:|---|---|
| Respuestas y eventos | Pendiente | Pendiente | Pendiente | Pendiente | No | Indeterminado |
| Imágenes o capturas | Pendiente | Pendiente | Pendiente | Pendiente | Condicional | Indeterminado |
| Audio | Pendiente | Pendiente | Pendiente | Pendiente | Condicional | Indeterminado |
| Video | Pendiente | Pendiente | Pendiente | Pendiente | Condicional | Indeterminado |

## 5.7 Resultados de gobernanza y cierre humano

Se informarán recepción, asignación, cierres completos, salidas sin revisión, decisiones de autorización, accesos indebidos, auditoría, consentimiento, pausa y retiro (`I26-I39`). La corrección funcional del caso de prueba se reportará por separado mediante `I40` y no se interpretará como validez psicométrica.

**Tabla 5.7. Gobernanza y cierre**

| Dimensión | Indicadores | Intentos o casos | Resultados conformes | Incumplimientos | Dictamen |
|---|---|---:|---:|---:|---|
| Revisión y cierre | `I26-I30` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Autorización y auditoría | `I31-I33` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Consentimiento, pausa y retiro | `I34-I39` | Pendiente | Pendiente | Pendiente | Indeterminado |

## 5.8 Resultados de factibilidad humana

Esta sección solo se completará si existen aprobación ética, autorización institucional y participantes válidamente reclutados. Los indicadores `I41-I45` se analizarán de forma exploratoria y separada de la hipótesis técnica. Si no se ejecuta la etapa, se declarará expresamente y no se sustituirá con opiniones del equipo de desarrollo.

## 5.9 Contraste de la hipótesis y cumplimiento de objetivos

El contraste se realizará por dimensión. No se calculará un promedio global que permita compensar pérdida de eventos, accesos indebidos o ruptura de linaje con un resultado favorable de velocidad.

**Tabla 5.8. Dictamen por dimensión**

| Dimensión | Indicadores aplicables | Criterios satisfechos | Criterios incumplidos | Datos insuficientes | Dictamen |
|---|---|---:|---:|---:|---|
| Continuidad y desempeño | `I01-I06` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Consistencia y confiabilidad | `I07-I12` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Proveniencia e integridad | `I13-I19` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Evidencia multimodal | `I20-I25` | Pendiente | Pendiente | Pendiente | Indeterminado |
| Revisión y gobernanza | `I26-I39` | Pendiente | Pendiente | Pendiente | Indeterminado |

La hipótesis solo podrá considerarse respaldada para las dimensiones cuyos criterios predefinidos se satisfagan con datos válidos. Un resultado será **no cumple** cuando viole el criterio; **indeterminado** cuando falte evidencia suficiente; y **no aplicable preespecificado** únicamente cuando esa condición haya sido definida antes de abrir los resultados.

## 5.10 Discusión de resultados

La discusión se redactará después de cerrar las tablas anteriores. No repetirá los valores, sino que explicará su significado, posibles causas, alcance y relación con trabajos previos.

### 5.10.1 Continuidad y arquitectura distribuida

Los resultados de desconexión y recuperación se contrastarán con Ashista et al. (2026), Kim et al. (2026), Medhi et al. (2022) y Ruth et al. (2020). La comparación conservará las diferencias de hardware, red, duración y tipo de dato y no trasladará sus umbrales al prototipo.

### 5.10.2 Sincronización y confiabilidad de eventos

La pérdida, duplicación, orden, conflictos y convergencia se discutirán frente a Laigner et al. (2026), Viotti y Vukolić (2016), Birman y Joseph (1987), Gomes et al. (2017) y Kokociński et al. (2021). Se distinguirá entre entrega del mensaje, aplicación del efecto y convergencia del estado.

### 5.10.3 Proveniencia y evidencia multimodal

La completitud y reconstrucción del linaje se compararán con Gierend et al. (2024), Wittner et al. (2022), Gierend et al. (2023), Cejudo et al. (2025) y Geangu et al. (2023). La discusión deberá indicar si la arquitectura integró capacidades que esas fuentes evaluaron por separado y cuáles permanecieron incompletas.

### 5.10.4 Flujo multi-actor y cierre humano

Los resultados de autorización, revisión y cierre se contrastarán con Modi et al. (2023), Amed et al. (2025), Qureshi et al. (2026), Gangi et al. (2025) y Cox et al. (2022). No se inferirá eficacia clínica a partir de una correcta coordinación técnica.

## 5.11 Limitaciones

La interpretación deberá considerar, como mínimo, el uso de datos sintéticos, la infraestructura concreta de prueba, la duración de las ejecuciones, los perfiles de red seleccionados, las modalidades efectivamente incluidas, la cobertura del oráculo y cualquier indicador no medible. Si se realiza una etapa humana, se añadirán tamaño y composición de la muestra, contexto institucional, pérdidas, incidencias y límites de generalización.

Ninguna limitación se utilizará para ocultar un resultado desfavorable. Los incumplimientos se reportarán junto con su escenario y evidencia, y las mejoras posteriores pertenecerán a una nueva versión del artefacto y del protocolo.

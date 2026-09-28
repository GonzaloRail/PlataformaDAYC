---
id: S15
title: "Embedding data provenance into the Learning Health System to facilitate reproducible research"
year: 2017
doi: "10.1002/lrh2.10019"
eje: "Proveniencia, versionado y auditoría"
---

# S15 - Embedding data provenance into the Learning Health System to facilitate reproducible research

## Referencia APA 7

Curcin, V. (2017). Embedding data provenance into the learning health system to facilitate reproducible research. *Learning Health Systems, 1*(2), e10019. https://doi.org/10.1002/lrh2.10019

## Citas
- Parentética: (Curcin, 2017)
- Narrativa: Curcin (2017)

## Objetivo

Explicar cómo la captura computable de proveniencia puede aportar trazabilidad, auditoría y reproducibilidad a un sistema de salud que aprende, usando TRANSFoRm como implementación ejemplar (pp. PDF 1-4).

## Problema abordado

El volumen y complejidad de datos y análisis opacan cómo se producen decisiones y resultados; las herramientas heterogéneas, modelos semánticos y costes de adopción dificultan una traza uniforme (pp. PDF 1-4).

## Metodología
- Diseño: Informe técnico y análisis conceptual ilustrado con tres casos implementados en TRANSFoRm (pp. PDF 1-2, 4-9).
- Contexto: Estudios epidemiológicos, ensayos aleatorizados y soporte diagnóstico en un ecosistema distribuido (pp. PDF 2, 4-8).
- Muestra o fuentes: Componentes, flujos y grafos de TRANSFoRm; el sistema de ensayos se utilizó con más de 600 pacientes en cuatro países europeos (p. PDF 7).
- Procedimiento: Definición de preguntas, plantillas PROV-O con ontologías, API REST de captura, persistencia relacional, ETL a Neo4j y análisis (pp. PDF 5-9).

## Arquitectura y tecnología

Las aplicaciones invocan una API REST con operaciones de dominio; el servidor instancia plantillas como fragmentos PROV-O, persiste en base relacional y los transforma por ETL a Neo4j para consulta y análisis (pp. PDF 5-6, 8-9). La captura incluye autenticación, creación/edición/ejecución, fuentes, SQL, actores, consentimiento y recomendaciones; no almacena identificadores del paciente en logs de proveniencia (pp. PDF 6-8). Las versiones exactas de software, reglas, EHR y formularios forman parte de la auditoría; consultas permiten reconstruir usos de reglas y modificaciones (pp. PDF 4, 7-8). W3C PROV/PROV-O, CRIM/CDIM y estándares CDISC aportan estructura; 21 CFR Part 11, GCP, CONSORT, STROBE y RECORD orientan validación y reporte (pp. PDF 3-5, 9-10).

## Actores

Clínicos, auditores, investigadores, pacientes, proveedores/controladores de datos, herramientas y agentes de software, editores y reguladores (pp. PDF 4, 6-10).

## Datos y evidencias

Consultas y traducciones, resultados, datos EHR, eCRF/PROM, consentimiento, aleatorización, reglas y evidencia de soporte, actores, marcas temporales, configuraciones y versiones (pp. PDF 5-8). La proveniencia se mantiene separada de datos identificables y enlaza por identificadores (p. PDF 7).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Niveles | Distingue auditabilidad, trazabilidad, replicabilidad y reproducibilidad. | 3 |
| Implementación | TRANSFoRm aplicó plantillas en estudios observacionales, ensayos y soporte de decisión. | 5-9 |
| Escala clínica del caso | El sistema de ensayos se usó con más de 600 pacientes en 4 países y fue validado para GCP. | 7 |
| Persistencia | Fragmentos relacionales se transformaron a un almacén Neo4j para consulta. | 6 |
| Cumplimiento | Las trazas pueden documentar controles técnicos de 21 CFR Part 11 y automatizar reportes. | 9-10 |

## Métricas e instrumentos

Cuatro niveles de reproducibilidad; preguntas de proveniencia por caso; plantillas y grafos; validación contra estructura, contenido y granularidad de estándares aplicables (pp. PDF 3, 5-10). No reporta métricas de latencia, volumen o exactitud de captura (pp. PDF 9-10).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Faltaba evaluación detallada y validación formal de plantillas en los tres dominios. | 9-10 |
| Persistía una brecha entre metadatos capturados y requisitos de reporte. | 10 |
| Granularidad fina puede producir trazas difíciles de relacionar semánticamente con el dominio. | 9 |
| Requiere colaboración de científicos, informáticos, editores y reguladores. | 10 |

## Aporte a la tesis
- Capítulo 1: Separa auditabilidad, trazabilidad, replicabilidad y reproducibilidad, evitando tratarlas como sinónimos (p. PDF 3).
- Capítulo 2: Fundamenta plantillas semánticas y captura poco invasiva sobre herramientas heterogéneas (pp. PDF 5-6, 8-9).
- Capítulo 3: Aplicación potencial a DAYC-2: capturar versiones, actor, regla, entrada y resultado mediante una API de eventos, separando identificadores sensibles; S15 no evaluó DAYC-2 (pp. PDF 4-8).
- Capítulo 4: Propone validar estructura, contenido y granularidad de la traza frente al estándar de auditoría requerido (pp. PDF 4, 9-10).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Trazabilidad | Paráfrasis: establece una cadena ininterrumpida desde la captura hasta la contribución a resultados. | 3 |
| Auditoría | Paráfrasis: una acción debe revelar datos, versiones de software y actores involucrados. | 4 |
| Captura | Paráfrasis: una API oculta detalles PROV y reduce el esfuerzo de integrar componentes. | 8-9 |
| Almacenamiento/consulta | Paráfrasis: las plantillas se guardan en RDBMS y pasan por ETL a Neo4j para análisis. | 6 |
| Privacidad | Paráfrasis: no se guardaron datos identificables en los logs de proveniencia. | 7 |
| Límite | Paráfrasis: falta cerrar la brecha entre metadatos capturados y requisitos de reporte. | 10 |

## Precauciones de uso

Es un fundamento de 2017 y no un antecedente reciente. Los casos pertenecen a investigación clínica y soporte diagnóstico, no a evaluación pediátrica DAYC-2. Que una traza ayude a documentar cumplimiento no certifica por sí sola conformidad regulatoria, seguridad o validez clínica (pp. PDF 9-10).

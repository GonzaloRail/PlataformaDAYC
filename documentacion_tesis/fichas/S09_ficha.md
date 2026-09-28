---
id: S09
title: "Provenance Information for Biomedical Data and Workflows: Scoping Review"
year: 2024
doi: "10.2196/51297"
eje: "Proveniencia, versionado y auditoría"
---

# S09 - Provenance Information for Biomedical Data and Workflows: Scoping Review

## Referencia APA 7

Gierend, K., Krüger, F., Genehr, S., Hartmann, F., Siegel, F., Waltemath, D., Ganslandt, T., & Zeleke, A. A. (2024). Provenance information for biomedical data and workflows: Scoping review. *Journal of Medical Internet Research, 26*(1), e51297. https://doi.org/10.2196/51297

## Citas
- Parentética: (Gierend et al., 2024)
- Narrativa: Gierend et al. (2024)

## Objetivo

Identificar enfoques, artefactos, metodologías y criterios para rastrear proveniencia de datos y flujos biomédicos, así como vacíos de conocimiento y aspectos de calidad (pp. PDF 1-3).

## Problema abordado

La ausencia de evidencia integral y de especificaciones obligatorias dificulta implementar proveniencia completa, auditable y escalable; persisten desacuerdos conceptuales, problemas de granularidad, metadatos incompletos y cuellos de botella de conocimiento (pp. PDF 1, 11-15).

## Metodología
- Diseño: Revisión de alcance según Arksey y O'Malley, reportada con PRISMA-ScR; no evaluó calidad, riesgo de sesgo ni generalización (pp. PDF 2-4).
- Contexto: Proveniencia en investigación biomédica y enfoques independientes del dominio publicados entre 2006 y 2022 (pp. PDF 2-4).
- Muestra o fuentes: PubMed y Web of Science; 764 resultados, 624 registros deduplicados, 118 textos completos y 66 estudios incluidos (pp. PDF 1, 4).
- Procedimiento: Cribado por revisores independientes, extracción en plantilla preprobada para cinco preguntas, análisis temático y estadísticas descriptivas con Python 3.10.0 y R 4.0.4 (pp. PDF 1, 3-4).

## Arquitectura y tecnología

La revisión organiza la proveniencia como metadatos de entidades, actividades/procesos y agentes, con predominio de W3C PROV y OPM; documenta almacenamiento relacional y en grafos, servicios web, lenguajes de consulta y visualización (pp. PDF 2, 7-9). La captura puede cubrir fuentes, transformaciones ETL, ejecuciones y decisiones; la proveniencia prospectiva describe el flujo previsto, la retrospectiva su ejecución y derivación, y la específica de dominio extiende PROV-O (p. PDF 9). Para almacenamiento y consulta, los estudios emplearon bases relacionales o de grafos y consultas web o a nivel de grafo; la escala y las consultas sofisticadas siguen abiertas (pp. PDF 7, 12, 14). Versionado, integridad, seguridad, interoperabilidad y auditoría aparecen como requisitos, pero la revisión no prescribe una implementación única (pp. PDF 8-12).

## Actores

Investigadores, clínicos y academia; desarrolladores, gestores de datos y especialistas de dominio; pacientes; responsables de privacidad, autoridades e industria (p. PDF 10). Los autores advierten que la responsabilidad práctica tiende a desplazarse al personal de soporte y reclaman explicitar la administración y responsabilidad de los datos (pp. PDF 14-15).

## Datos y evidencias

Las fuentes revisadas abarcan EHR, datos de estudio, neuroimagen, ómicas, patología, series temporales neonatales y datos computacionales (p. PDF 11). La proveniencia debe conservar origen, relaciones fuente-resultado, transformaciones, ejecución, actores y metadatos de integridad, calidad, seguridad y reproducibilidad durante el ciclo de vida (pp. PDF 2, 9-12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Corpus | 66 de 624 artículos deduplicados cumplieron criterios (10,6%). | 1, 4 |
| Tipo de enfoque | 58/66 (88%) trataron gestión práctica y 8/66 (12%) marcos teóricos. | 7 |
| Estándares | Entre 58 trabajos con características de modelo, PROV apareció en 25 (43%) y OPM en 17 (29%). | 8 |
| Requisitos | 44/66 (67%) informaron al menos un requisito; integridad apareció en 16/44 (36%) y reproducibilidad en 13/44 (30%). | 9 |
| Desafíos | 47 artículos informaron 74 desafíos; 64/74 (86%) fueron técnicos y 15/64 (23%) se relacionaron con granularidad. | 11 |

## Métricas e instrumentos

Diagrama PRISMA, plantilla de extracción para cinco preguntas, conteos y porcentajes por categoría, análisis temático, Python 3.10.0, R 4.0.4 y tidyverse 1.3.0 (pp. PDF 3-4). La revisión halló que la completitud se evaluó sobre todo cualitativamente y que no existe una medida absoluta general (p. PDF 13).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La revisión de alcance no evaluó calidad, riesgo de sesgo ni generalización. | 3 |
| Se excluyó literatura gris. | 15 |
| No se identificó alineación precisa entre pruebas y requisitos predefinidos del ciclo de vida. | 14 |
| La calidad de la proveniencia no estaba claramente definida y la granularidad seguía sin resolverse. | 14 |

## Aporte a la tesis
- Capítulo 1: Fundamenta la proveniencia como requisito transversal de trazabilidad entre fuentes, transformaciones y resultados, no como propiedad clínica de DAYC-2 (pp. PDF 2, 9).
- Capítulo 2: Aporta taxonomías de modelos, requisitos, actores y desafíos para justificar W3C PROV y una gobernanza explícita (pp. PDF 7-12).
- Capítulo 3: Sugiere para el pipeline DAYC-2 capturar entidad-actividad-agente, versiones, decisiones humanas, integridad y relaciones de derivación desde el ingreso hasta el resultado; es aplicación potencial, no implementación evaluada por S09 (pp. PDF 9, 11-15).
- Capítulo 4: Permite evaluar completitud, rendimiento, escalabilidad, tolerancia a fallos, funcionalidad y usabilidad, manteniendo evidencia de prueba ligada a requisitos (pp. PDF 9, 14).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Definición | Paráfrasis: W3C PROV define proveniencia como el registro de entidades y procesos que producen, entregan o influyen un recurso. | 2 |
| Consulta y almacenamiento | Paráfrasis: los flujos almacenaron proveniencia en bases relacionales o de grafos y ofrecieron servicios o lenguajes de consulta a nivel de grafo. | 7 |
| Estándar | Paráfrasis: W3C PROV fue el modelo dominante y se describe como estándar de facto interoperable y genérico. | 8 |
| Diseño | Paráfrasis: integridad, reproducibilidad, interoperabilidad, trazabilidad, rendimiento, seguridad y usabilidad emergieron como requisitos. | 9 |
| Riesgo | Paráfrasis: mayor granularidad incrementa cómputo y almacenamiento y exige equilibrar detalle con ejecución. | 11 |
| Auditoría | Paráfrasis: la validación formal exige pruebas y evidencia de pruebas vinculadas a requisitos. | 14 |

## Precauciones de uso

Es una síntesis heterogénea y no una validación de una arquitectura concreta; sus porcentajes describen el corpus, no prevalencia clínica (pp. PDF 3, 7-15). No estudia DAYC-2 ni población pediátrica, por lo que su uso es arquitectónico y metodológico. Las menciones de PROV, FAIR o ISO no sustituyen verificar por separado las normas oficiales vigentes (pp. PDF 10, 14-15).

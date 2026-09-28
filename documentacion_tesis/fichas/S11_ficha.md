---
id: S11
title: "Provenance Core Data Set: A Minimal Information Model for Data Provenance in Biomedical Research"
year: 2023
doi: "10.52825/cordi.v1i.347"
eje: "Proveniencia, versionado y auditoría"
---

# S11 - Provenance Core Data Set: A Minimal Information Model for Data Provenance in Biomedical Research

## Referencia APA 7

Sax, U., Henke, C., Dräger, C., Bender, T., Kuntz, A., Golebiewski, M., Ulrich, H., & Löbe, M. (2023). Provenance core data set: A minimal information model for data provenance in biomedical research. *Proceedings of the Conference on Research Data Infrastructure, 1*. https://doi.org/10.52825/cordi.v1i.347

## Citas
- Parentética: (Sax et al., 2023)
- Narrativa: Sax et al. (2023)

## Objetivo

Proponer un conjunto mínimo y generalizado de atributos para describir proveniencia en sistemas de información de salud y otros escenarios (pp. PDF 1-2).

## Problema abordado

El intercambio y reúso entre organizaciones requiere documentación y trazabilidad estandarizadas, pero el artículo señala que no existía un estándar específico de proveniencia para datos de salud (p. PDF 1).

## Metodología
- Diseño: Desarrollo conceptual de un modelo mínimo, no evaluación experimental (pp. PDF 1-2).
- Contexto: Proyecto NMDR2 y comunidad NFDI4Health (pp. PDF 1-2).
- Muestra o fuentes: Aportes de conferencias web, discusiones de expertos y examen de estándares de datos y metadatos (p. PDF 1).
- Procedimiento: Selección de atributos generales aplicables a distribución, transformación y responsabilidad (p. PDF 1).

## Arquitectura y tecnología

El PCDS captura creación, cambio y actualización; sistema fuente, tipo, nombre, URL, versión y proveedor; estado, exactitud, creador, comentario, proveedor, frecuencia, dependencias, método de medición y responsable de medir (p. PDF 2). Es un modelo de información, por lo que no especifica mecanismo automático de captura, base de almacenamiento, lenguaje de consulta, política concreta de versionado ni motor de auditoría (pp. PDF 1-2). Se apoya conceptualmente en W3C PROV/PROV-DM y busca integración posterior con HL7 FHIR e ISO/TS 23494-1:2023 (pp. PDF 1-3).

## Actores

Creadores, proveedores, responsables de medición y partes responsables del dato; expertos de informática de salud y comunidades NFDI (pp. PDF 1-2).

## Datos y evidencias

Metadatos sobre origen, transformación, responsabilidad, fechas, estado, precisión, dependencias y método de medición (pp. PDF 1-2). La propuesta pretende apoyar evaluación de calidad, integración e intercambio, pero no presenta datos reales ni resultados de consultas o auditorías (p. PDF 2).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Modelo | Se definió un conjunto común de atributos de proveniencia para HIS. | 1-2 |
| Cobertura | Incluye fechas, sistema fuente y versión, estado, exactitud, responsables, dependencias y método. | 2 |
| Uso previsto | Puede apoyar calidad, integración e intercambio de datos. | 2 |
| Madurez | Requiere investigación y validación adicional en HIS reales. | 2 |

## Métricas e instrumentos

No aplica: el artículo no define métricas de rendimiento, completitud ni auditoría. El instrumento resultante es el propio PCDS y su inventario de atributos (pp. PDF 1-2).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| No fue validado en sistemas reales. | 2 |
| Su aplicabilidad y efectividad requieren evaluación adicional. | 2 |
| Falta organizar mayor integración con iniciativas y conjuntos FHIR. | 2 |
| No define implementación de captura, almacenamiento o consulta. | 1-2 |

## Aporte a la tesis
- Capítulo 1: Ofrece una definición mínima de información necesaria para origen, transformación y responsabilidad (p. PDF 1).
- Capítulo 2: Permite derivar un esquema base interoperable sin confundirlo con una arquitectura validada (pp. PDF 1-2).
- Capítulo 3: Aplicación potencial a DAYC-2: añadir a cada evidencia fechas, fuente y versión, estado, exactitud, actor, dependencia y método de captura; el artículo no hizo esta aplicación (p. PDF 2).
- Capítulo 4: Facilita una lista de comprobación de completitud de metadatos, que deberá validarse en el pipeline real (p. PDF 2).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Necesidad | Paráfrasis: integrar fuentes exige información de origen, transformación y responsabilidad. | 1 |
| Estándares | Paráfrasis: ISO especifica un modelo general para material biológico y datos, pero faltaba uno específico para salud. | 1 |
| Captura mínima | Paráfrasis: el conjunto incluye fechas de creación/cambio/actualización y datos del sistema fuente. | 2 |
| Responsabilidad | Paráfrasis: incluye creador, proveedor, método de medición y quién midió. | 2 |
| Límite | Paráfrasis: se necesita validación adicional de aplicabilidad y efectividad en sistemas reales. | 2 |

## Precauciones de uso

Es una propuesta mínima de tres páginas y no un sistema probado (pp. PDF 1-3); “prometedor” y “potencial” no equivalen a eficacia demostrada (p. PDF 2). No trata DAYC-2, pediatría, evidencia multimodal ni resultados clínicos. La adaptación debe añadir requisitos de seguridad, almacenamiento, consulta, auditoría y dominio que el PCDS no especifica (pp. PDF 1-2).

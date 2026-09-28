---
id: S10
title: "Provenance Data Management in Health Information Systems: A Systematic Literature Review"
year: 2023
doi: "10.3390/jpm13060991"
eje: "Proveniencia, versionado y auditoría"
---

# S10 - Provenance Data Management in Health Information Systems: A Systematic Literature Review

## Referencia APA 7

Sembay, M. J., de Macedo, D. D. J., Júnior, L. P., Braga, R. M. M., & Sarasa-Cabezuelo, A. (2023). Provenance data management in health information systems: A systematic literature review. *Journal of Personalized Medicine, 13*(6), 991. https://doi.org/10.3390/jpm13060991

## Citas
- Parentética: (Sembay et al., 2023)
- Narrativa: Sembay et al. (2023)

## Objetivo

Caracterizar métodos, técnicas, modelos, metodologías, tecnologías y estándares usados para gestionar proveniencia en sistemas de información de salud (HIS), y proponer una taxonomía unificada (pp. PDF 1, 3, 8-9).

## Problema abordado

Los HIS producen datos sensibles mediante múltiples transformaciones y repositorios, pero enfrentan pérdida de trazabilidad, interoperabilidad insuficiente, riesgos de privacidad y seguridad y falta de preparación técnica (pp. PDF 1-2, 18, 27-29).

## Metodología
- Diseño: Revisión sistemática basada en las guías de Kitchenham y complementada con *snowballing* retrospectivo y prospectivo (pp. PDF 8, 13-15).
- Contexto: Gestión de proveniencia en EHR, PHR, LHS, sistemas de monitorización, investigación clínica y HIS hospitalarios (pp. PDF 5-6, 16-20).
- Muestra o fuentes: Seis bases, búsquedas 2010-2020; 239 registros, 14 estudios tras filtros y 3 añadidos por *snowballing*, total 17 (pp. PDF 1, 9, 12-15).
- Procedimiento: Criterios de inclusión/exclusión, dos filtros, lectura completa, evaluación de cinco criterios con escala Likert de 0 a 2 y síntesis por preguntas SPICE (pp. PDF 8-13).

## Arquitectura y tecnología

La revisión distingue proveniencia prospectiva, retrospectiva y evolutiva; esta última conserva cambios entre versiones de un flujo (p. PDF 4). PROV/PROV-O/PROV-DM/PROV-N representan entidades, actividades, agentes y relaciones; se combinan con OPM, blockchain, *middleware*, ETL, RDF/OWL/XML/JSON, SPARQL, bases relacionales, MySQL y Neo4j (pp. PDF 4, 16-18, 21, 24). La captura debe documentar fuentes, transformaciones, responsables, tiempo y contexto; el almacenamiento debe sostener disponibilidad, integridad y recuperación; las consultas se apoyan en lenguajes semánticos o de grafos; la auditoría verifica integridad, fiabilidad y cumplimiento (pp. PDF 2-4, 17, 21-22).

## Actores

Pacientes y usuarios, profesionales de salud, personal técnico, organizaciones sanitarias, investigadores, desarrolladores y administradores de datos (pp. PDF 5-6, 8). La capacidad tecnológica no basta sin capacitación, procesos y políticas institucionales (p. PDF 21).

## Datos y evidencias

La revisión cubre registros clínicos, datos personales, sensores y dispositivos móviles/IoT, monitorización remota, documentos, imágenes y metadatos de seguridad (pp. PDF 5, 17-18, 21). Propone analizar siete propiedades: almacenamiento, disponibilidad, trazabilidad, confidencialidad, integridad, autenticidad y auditabilidad (pp. PDF 3, 22).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Selección | 239 estudios recuperados; 14 incluidos y 3 añadidos por *snowballing*, total 17. | 1, 12-15 |
| Uso de PROV | 10 de 17 estudios emplearon modelos de la familia PROV. | 15 |
| Tecnologías | Cinco estudios destacaron blockchain y tres *middleware*. | 15 |
| Tipos de HIS | PHR representó 41% y EHR 35% de las apariciones. | 19-20 |
| Publicación | 59% de los estudios fueron trabajos de conferencia. | 19, 29 |

## Métricas e instrumentos

SPICE para formular preguntas; criterios QC1-QC5; Likert-3 de 0 a 2; 12/14 estudios iniciales fueron calificados como “great” (85,7%) y 2/14 como “very good” (14,3%) (pp. PDF 8, 10-11). La taxonomía final cruza modelos, tipos de HIS, tecnologías y estándares (pp. PDF 23-25).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La selección está expuesta a sesgo de interpretación, bases elegidas y fecha de ejecución. | 27 |
| El intervalo y dominio excluyeron flujos de bioinformática, física e ingeniería biomédica. | 27 |
| Solo se seleccionaron 17 estudios y el tema seguía escasamente explorado. | 27-29 |
| La evaluación de herramientas industriales fue preliminar. | 26-27 |

## Aporte a la tesis
- Capítulo 1: Sistematiza riesgos de trazabilidad, interoperabilidad, privacidad y seguridad en datos de salud (pp. PDF 2, 18, 27-29).
- Capítulo 2: Justifica separar modelo de proveniencia, tecnología de captura/almacenamiento y estándar de intercambio (pp. PDF 23-25).
- Capítulo 3: Para DAYC-2 puede orientar un registro de fuente, actor, transformación, versión y acceso, consultable por relaciones PROV; es transferencia conceptual y no evidencia pediátrica del artículo (pp. PDF 3-4, 21-24).
- Capítulo 4: Aporta siete dimensiones para verificar el pipeline: almacenamiento, disponibilidad, trazabilidad, confidencialidad, integridad, autenticidad y auditabilidad (p. PDF 22).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Proveniencia | Paráfrasis: describe origen y recorrido completo de los datos y apoya auditoría, cribado y linaje. | 2 |
| Versionado | Paráfrasis: la proveniencia evolutiva conserva cambios entre dos versiones ejecutadas del flujo. | 4 |
| Estándar | Paráfrasis: PROV usa entidades, actividades y agentes y soporta intercambio interoperable en entornos heterogéneos. | 4 |
| Tecnologías | Paráfrasis: ETL, tecnologías semánticas, bases, blockchain y *middleware* aparecen combinados en HIS. | 21 |
| Auditoría | Paráfrasis: auditabilidad certifica integridad, fiabilidad y cumplimiento de repositorios electrónicos. | 22 |
| Límite | Paráfrasis: ninguna estructura común garantiza seguridad total y persisten barreras regulatorias, financieras, organizativas e interoperables. | 18 |

## Precauciones de uso

Los porcentajes caracterizan 17 publicaciones y no eficacia clínica (pp. PDF 15, 19-20). La taxonomía es adaptable y requiere evaluación futura (p. PDF 23). El artículo no estudia DAYC-2 ni infancia; no permite inferir seguridad, validez clínica o rendimiento del pipeline de la tesis. Los estándares legales citados dependen de jurisdicción y deben verificarse en fuentes oficiales (pp. PDF 21, 24, 29-30).

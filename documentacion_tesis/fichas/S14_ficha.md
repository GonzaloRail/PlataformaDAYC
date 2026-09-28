---
id: S14
title: "Implementing interoperable provenance in biomedical research"
year: 2014
doi: "10.1016/j.future.2013.12.001"
eje: "Proveniencia, versionado y auditoría"
---

# S14 - Implementing interoperable provenance in biomedical research

## Referencia APA 7

Curcin, V., Miles, S., Danger, R., Chen, Y., Bache, R., & Taweel, A. (2014). Implementing interoperable provenance in biomedical research. *Future Generation Computer Systems, 34*, 1-16. https://doi.org/10.1016/j.future.2013.12.001

## Citas
- Parentética: (Curcin et al., 2014)
- Narrativa: Curcin et al. (2014)

## Objetivo

Derivar recomendaciones reutilizables para modelado, captura, seguridad, almacenamiento y consulta de proveniencia desde TRANSFoRm y EHR4CR (pp. PDF 2-4, 19).

## Problema abordado

Los sistemas biomédicos distribuidos y heterogéneos producen trazas incompatibles; se requiere integrarlas sin perder semántica, confidencialidad, auditabilidad ni capacidad de responder preguntas futuras (pp. PDF 2-3, 8-9).

## Metodología
- Diseño: Análisis técnico de requisitos y experiencia de dos proyectos biomédicos de gran escala, con 21 recomendaciones (pp. PDF 4, 19-34, 44-46).
- Contexto: TRANSFoRm y EHR4CR, arquitecturas orientadas a servicios para estudios, ensayos, soporte diagnóstico, búsqueda y reclutamiento (pp. PDF 9-18).
- Muestra o fuentes: Modelos, flujos, registros y prototipos de ambos proyectos; no se informa muestra clínica evaluativa propia (pp. PDF 9-19).
- Procedimiento: Mapeo a OPM/PROV y ontologías de dominio, plantillas, captura en ejecución, almacenamiento y consultas de auditoría (pp. PDF 11-19).

## Arquitectura y tecnología

TRANSFoRm usa plantillas OPM/RCTPO, IDs globales y captura durante la ejecución; almacena en RDBMS semántico consultable por SQL y SPARQL mediante D2RQ, con navegador de grafos y aserciones SAML referenciadas (pp. PDF 11-15). EHR4CR captura consultas, ETL y control de acceso, guarda proveniencia local en RDBMS y exporta PROV como transporte, devolviendo solo un subconjunto no sensible (pp. PDF 16-19). Las recomendaciones cubren W3C PROV/OPM, vocabulario, acciones humanas, captura oportuna, pruebas de sobrecarga, RDBMS/RDF/Neo4j, transmisión asíncrona, crecimiento/archivo, permisos y consultas extensibles e interactivas (pp. PDF 20-33, 44-46). El versionado de herramientas, documentos y estudios se conecta a actores y acciones para formar una auditoría uniforme (pp. PDF 11-13, 17).

## Actores

Investigadores, clínicos, pacientes, hospitales, proveedores de datos, auditores, desarrolladores, servicios de autenticación/autorización y múltiples organizaciones con políticas propias (pp. PDF 8-10, 16-17, 24-25).

## Datos y evidencias

Consultas, criterios, versiones, bases usadas, transformaciones ETL, filtros, conteos aceptados/rechazados, resultados, autenticación, autorización, sesiones, acciones humanas y software (pp. PDF 10-19). Se recomienda integrar por referencia o traducción controles de versión, auditoría y logs existentes (pp. PDF 25-26).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Recomendaciones | Se formularon 21 recomendaciones de modelado, captura, almacenamiento, seguridad y consulta. | 44-46 |
| Interoperabilidad | W3C PROV/OPM más vocabulario de dominio permiten unir trazas heterogéneas. | 20-21 |
| Granularidad | Registrar cada hecho posible puede volver inaceptables el rendimiento y almacenamiento. | 22-23 |
| Captura | Debe integrarse en cada paso y probarse; un estudio previo informó sobrecarga inferior a 10%. | 27 |
| Consulta | SQL/SPARQL y exploración gráfica permiten auditoría y preguntas nuevas. | 13-15, 32-33 |

## Métricas e instrumentos

Preguntas de proveniencia, modelos OPM/PROV, plantillas, ontologías RCTO/RCTPO/CRIM, SQL, SPARQL, D2RQ, navegador de grafos y pruebas comparativas de rendimiento antes/después de instrumentar (pp. PDF 10-15, 27, 32-33). No se presenta evaluación cuantitativa integral de los dos sistemas (pp. PDF 33-34).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Las recomendaciones son un punto de partida, no reglas definitivas. | 34 |
| No todas las preguntas futuras pueden conocerse y demasiado detalle genera sobrecarga. | 22-23 |
| En el caso EHR4CR algunas decisiones humanas aún no se capturaban. | 25 |
| Persisten múltiples niveles de modelado y decisiones no triviales de captura, seguridad, almacenamiento y consulta. | 33-34 |

## Aporte a la tesis
- Capítulo 1: Fundamento histórico para proveniencia interoperable en arquitecturas distribuidas (pp. PDF 2-4, 8-9).
- Capítulo 2: Aporta criterios explícitos de sintaxis, semántica, conectividad, granularidad, seguridad y persistencia (pp. PDF 20-31, 44-46).
- Capítulo 3: Aplicación potencial a DAYC-2: instrumentar cada transición, incluir decisiones profesional/cuidador y versiones, almacenar en PostgreSQL y exponer consultas auditables; el artículo no evaluó DAYC-2 ni pediatría (pp. PDF 24-29, 32-33).
- Capítulo 4: Sugiere medir sobrecarga, crecimiento, preguntas contestables y acceso por rol, validando detalle contra requisitos (pp. PDF 23, 27, 29-33).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Estándar | Paráfrasis: usar W3C PROV u OPM y vocabulario común para proveniencia interoperable. | 20-21 |
| Actores | Paráfrasis: deben capturarse acciones humanas relevantes además de procesos automáticos. | 24 |
| Captura | Paráfrasis: registrar en tiempo de ejecución cada paso, con granularidad apropiada e IDs globales. | 27 |
| Almacenamiento | Paráfrasis: RDBMS, RDF o base de grafos deben elegirse considerando privacidad y distribución. | 28 |
| Auditoría | Paráfrasis: integrar versionado, auditoría y logs existentes por referencia o traducción. | 25-26 |
| Consulta | Paráfrasis: admitir consultas nuevas y exploración investigativa del grafo. | 32 |

## Precauciones de uso

Es un fundamento de 2014 basado en proyectos de investigación y debe citarse como base conceptual, no antecedente reciente. El PDF es una versión temprana y su portada advierte posibles diferencias con la publicación final (p. PDF 1). No prueba validez clínica ni aplicación pediátrica/DAYC-2; una traza interoperable tampoco garantiza calidad del dato fuente (pp. PDF 18-19, 33-34).

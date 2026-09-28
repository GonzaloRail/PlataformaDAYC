---
id: S13
title: "Traceable Research Data Sharing in a German Medical Data Integration Center With FAIR (Findability, Accessibility, Interoperability, and Reusability)-Geared Provenance Implementation: Proof-of-Concept Study"
year: 2023
doi: "10.2196/50027"
eje: "Proveniencia, versionado y auditoría"
---

# S13 - Traceable Research Data Sharing in a German Medical Data Integration Center With FAIR (Findability, Accessibility, Interoperability, and Reusability)-Geared Provenance Implementation: Proof-of-Concept Study

## Referencia APA 7

Gierend, K., Waltemath, D., Ganslandt, T., & Siegel, F. (2023). Traceable research data sharing in a German medical data integration center with FAIR-geared provenance implementation: Proof-of-concept study. *JMIR Formative Research, 7*(1), e50027. https://doi.org/10.2196/50027

## Citas
- Parentética: (Gierend et al., 2023)
- Narrativa: Gierend et al. (2023)

## Objetivo

Mejorar la reutilización de datos clínicos rutinarios mediante trazas por elemento que documenten integridad, fiabilidad y responsabilidad en un centro alemán de integración de datos (pp. PDF 1-3).

## Problema abordado

Las transformaciones ETL hacen perder origen y calidad de elementos sensibles, reduciendo trazabilidad, confianza y capacidad de reutilización (pp. PDF 1-3).

## Metodología
- Diseño: Prueba de concepto guiada por un ciclo de requisitos, diseño, codificación, pruebas e implementación (pp. PDF 1, 3-4).
- Contexto: Flujo ETL de un centro médico de integración alemán; almacenamiento y uso secundario quedaron fuera del límite del prototipo (pp. PDF 4-5).
- Muestra o fuentes: Siete tipos de elementos simulados y 100.000 elementos por tipo para generar 700.000 registros iniciales; mediciones posteriores usaron bloques hasta 900.000 elementos (pp. PDF 3, 11).
- Procedimiento: Requisitos interdisciplinarios, modelo UML, mapeo W3C/FHIR, clase Python, revisión independiente, pruebas unitarias y experimento de tiempo/espacio (pp. PDF 4-11).

## Arquitectura y tecnología

PISA registra por elemento fuente/destino, transformación, control de calidad, estado, SOP y versión, responsables, *scripts*, infraestructura y marcas temporales, mediante captura híbrida manual y automática (pp. PDF 3, 6-9). La clase Python usa Peewee y bases relacionales SQLite/MySQL/PostgreSQL; exporta log, FHIR-JSON, W3C RDF/XML y RDF/JSON-LD, y Mermaid visualiza trazas (pp. PDF 6, 10-11). W3C PROV alinea entidad-actividad-agente; FHIR Provenance R5, FAIR R1.2/R1.3, ALCOA+, JSON-LD y RDF aportan estándares e interoperabilidad (pp. PDF 2, 7-10). Registra versiones de SOP y *scripts* y estado de ejecución, pero no implementa todavía una auditoría acreditada ni consultas interactivas; esos aspectos quedan para evolución (pp. PDF 6, 12-13).

## Actores

Responsable del DIC, expertos médicos, informáticos, personal técnico, dueño del proceso ETL, investigador, tercero de confianza, propietario del dato y *data steward* (pp. PDF 4-5, 8).

## Datos y evidencias

Datos ficticios similares a elementos clínicos, metadatos contextuales y técnicos, registros de ejecución, estado de calidad, origen/destino, transformación, privacidad/seguridad, políticas y responsables (pp. PDF 3, 7-9, 11-12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Rendimiento por elemento | 0,0039 a 0,02601 segundos. | 11 |
| Rendimiento por registro | 0,0271 a 0,1882 segundos. | 11 |
| Integración | Configuración por elemento con 3 líneas de código y alta en 1 línea. | 12 |
| Pruebas | Cobertura de código superior a 90% y requisitos validados con pruebas unitarias. | 12 |
| Intercambio | Exportación a FHIR-JSON, W3C RDF/XML, RDF/JSON-LD y log textual. | 11-12 |

## Métricas e instrumentos

Tiempo por elemento y registro, crecimiento en KB, nueve máquinas virtuales, bloques de 1 a 900.000 elementos, R 4.2.0/ggplot2, revisión independiente, pruebas unitarias y cobertura (pp. PDF 10-12). Entorno: Ubuntu 22.04.2, 32 GB RAM y CPU Intel Xeon Platinum 8276 de 8 núcleos a 2,20 GHz (p. PDF 10).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Solo se probó con datos simulados. | 13 |
| Faltan evaluación de complejidad y costes en un DIC real y mayor cualificación/validación. | 13 |
| La clase aún no está preparada para inspección o auditoría acreditada. | 13 |
| Requiere más análisis de escalabilidad, acceso, seguridad, privacidad y almacenamiento. | 13 |

## Aporte a la tesis
- Capítulo 1: Caso reciente de proveniencia por elemento durante ETL y responsabilidad organizativa (pp. PDF 5-6, 11-13).
- Capítulo 2: Relaciona W3C PROV, FHIR, FAIR y ALCOA+ en un modelo implementable (pp. PDF 2, 7-10).
- Capítulo 3: Aplicación potencial a DAYC-2: registrar para cada respuesta/evidencia fuente, destino, transformación, versión, actor, calidad y ejecución, con exportación estándar; S13 no estudió infancia ni DAYC-2 (pp. PDF 6-12).
- Capítulo 4: Proporciona pruebas de rendimiento, cobertura y validación de requisitos replicables con datos sintéticos antes de ensayos reales (pp. PDF 10-12).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Ciclo | Paráfrasis: el ciclo abarca generación, procesamiento, validación, análisis, reporte, decisión y retención. | 2 |
| Captura | Paráfrasis: los metadatos se reunieron mediante anotación manual y colección automática. | 9 |
| Estándares | Paráfrasis: procesos, actores y entradas/salidas se mapearon a actividad, agente y entidad W3C PROV. | 9 |
| Almacenamiento | Paráfrasis: Peewee enlazó objetos con SQLite, MySQL o PostgreSQL. | 10 |
| Resultado | Paráfrasis: las trazas se anexaron automáticamente durante la ejecución y el tiempo por elemento fue casi lineal con la entrada. | 11 |
| Límite | Paráfrasis: el prototipo requiere pruebas reales y ampliación para estar listo para auditoría. | 13 |

## Precauciones de uso

Los datos fueron ficticios y no exigieron ética, consentimiento o desidentificación (p. PDF 11); el rendimiento no demuestra operación clínica. “Trazable” no implica automáticamente exactitud ni resistencia a usuarios maliciosos (p. PDF 13). No existe evidencia pediátrica ni aplicación DAYC-2 en este estudio.

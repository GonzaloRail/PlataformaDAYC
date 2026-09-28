---
id: S17
title: "Isabl Platform, a digital biobank for processing multimodal patient data"
year: 2020
doi: "10.1186/s12859-020-03879-7"
eje: "Proveniencia, versionado y auditoría"
---

# S17 - Isabl Platform, a digital biobank for processing multimodal patient data

## Referencia APA 7

Medina-Martínez, J. S., Arango-Ossa, J. E., Levine, M. F., Zhou, Y., Gundem, G., Kung, A. L., & Papaemmanuil, E. (2020). Isabl platform, a digital biobank for processing multimodal patient data. *BMC Bioinformatics, 21*(1), 549. https://doi.org/10.1186/s12859-020-03879-7

## Citas
- Parentética: (Medina-Martínez et al., 2020)
- Narrativa: Medina-Martínez et al. (2020)

## Objetivo

Presentar Isabl como plataforma modular para registrar, procesar, consultar y auditar datos multimodales centrados en el paciente a escala (pp. PDF 1-2).

## Problema abordado

Los activos de alto rendimiento quedan aislados y su procesamiento reproducible, gobernanza, control de calidad y combinación multimodal resultan difíciles (pp. PDF 1-2).

## Metodología
- Diseño: Desarrollo de software con cuatro estudios de caso operativos y comparación con cuatro AIMS abiertos (pp. PDF 2, 9-14).
- Contexto: Biobanco digital institucional de oncología y bioinformática, principalmente genómica e imagen (pp. PDF 1-2, 9-12).
- Muestra o fuentes: Instancia con 60.000 pacientes, 200 proyectos, 300.000 análisis, 90 aplicaciones y más de 300 TB (p. PDF 9).
- Procedimiento: Registro de proyecto/metadatos, importación automatizada, despliegue de aplicaciones, recuperación de resultados, versionado y automatizaciones por señales (pp. PDF 3-8).

## Arquitectura y tecnología

Cuatro servicios: Isabl DB relacional, API REST, CLI y SPA web; el esquema vincula individuo-muestra-experimento-aplicación-análisis y asigna UUID (pp. PDF 1-4). CLI importa o enlaza archivos, guarda *checksum*, uso y ubicación, y opera en local, nube o híbrido; PostgreSQL conserva metadatos y JSON de resultados (pp. PDF 5-6). Web, CLI y acceso directo permiten buscar, filtrar, ordenar y recuperar archivos/resultados (pp. PDF 4, 8). Todos los metadatos y configuraciones de análisis se versionan; cambios son registrados, estados previos recuperables y versiones antiguas pasan a directorios con fecha (pp. PDF 3, 6-7, 10). Permisos Django, retirada de escritura, estados, logs, parámetros, referencias y versiones sostienen gobernanza y auditoría (pp. PDF 4, 6, 9-10, 15-16).

## Actores

Gestores que registran muestras, analistas que ejecutan análisis, ingenieros con ambas capacidades, administradores, usuarios finales y sistemas institucionales integrados (pp. PDF 4, 8-9).

## Datos y evidencias

Individuos, muestras, alícuotas, experimentos, genómica, imagen, metadatos clínicos/demográficos, técnicas, plataformas, parámetros, referencias, estados, resultados, logs, tiempos, almacenamiento y configuraciones (pp. PDF 1-6, 8). No presupone modalidad, pero sus demostraciones son oncológicas y bioinformáticas (pp. PDF 10-12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Escala institucional | 60.000 pacientes, 200 proyectos, 300.000 análisis, 90 aplicaciones y más de 300 TB. | 9 |
| Reanálisis | Más de 35.000 metadatos ingresados en menos de 1 h y análisis procesados en 3 días con clúster de más de 5.000 CPU. | 10 |
| Automatización | Flujo sin intervención manual con más de 30 algoritmos. | 10-11 |
| Duración de informes | 4,5 ± 2 días por informe, n=20, en clúster de 3.000 núcleos. | 11 |
| Calidad de software | Cobertura de pruebas superior a 90% evaluada automáticamente. | 16 |

## Métricas e instrumentos

Número de pacientes, proyectos, aplicaciones, análisis, TB, tiempo de ingestión/proceso, CPU, duración media/DE y cobertura de pruebas (pp. PDF 9-11, 16). Pruebas con Pytest/tox, Jest/Cypress, CI Travis y calidad con ESLint/Pylint/Pydocstyle (p. PDF 16).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| No incluye aplicaciones o gestores de flujos preconstruidos. | 8 |
| No integra LIMS de fábrica. | 12 |
| Nube exige adaptar mecanismos de carga/descarga, almacenamiento y cómputo. | 6, 12 |
| FHIR se plantea como adopción futura, no como interoperabilidad ya implementada. | 12 |
| La licencia requiere autorización para uso no académico. | 14, 17 |

## Aporte a la tesis
- Capítulo 1: Fundamento de biobanco digital centrado en relaciones entre sujeto, evidencia, proceso y resultado (pp. PDF 1-4).
- Capítulo 2: Aporta separación API/CLI/web/DB y desacoplamiento de metadatos respecto a almacenamiento/cómputo (pp. PDF 2-3, 14-15).
- Capítulo 3: Aplicación potencial a DAYC-2: UUID, *checksums*, estados, permisos, configuraciones y versiones para vincular evidencia multimodal con revisión y resultado; Isabl no implementó DAYC-2 (pp. PDF 3-10).
- Capítulo 4: Proporciona métricas de escala, reanálisis, tiempo, automatización y cobertura para diseñar pruebas del pipeline (pp. PDF 9-11, 16).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Arquitectura | Paráfrasis: la plataforma combina DB, API REST, CLI y aplicación web. | 2 |
| Proveniencia | Paráfrasis: el modelo registra cinco categorías, incluido flujo analítico versionado con parámetros, referencias, estado y resultados. | 2 |
| Versionado | Paráfrasis: todos los cambios de metadatos se registran y estados anteriores pueden recuperarse. | 3 |
| Captura/almacenamiento | Paráfrasis: al importar se guardan vínculo dato-metadato, permisos, *checksum*, uso y ubicación. | 6 |
| Consulta | Paráfrasis: resultados se recuperan por Web, CLI o acceso directo al lago. | 8 |
| Auditoría | Paráfrasis: ante un error identifica afectados, reejecuta, notifica y preserva análisis previos en directorio fechado. | 10 |

## Precauciones de uso

Es un fundamento de 2020 y no un antecedente de los últimos cinco años según el manifiesto. Aunque hubo financiación y participación de un departamento pediátrico, los casos reportados son de oncología/genómica y no validan evaluación del neurodesarrollo ni DAYC-2 (pp. PDF 9-12, 17). Sus cifras dependen de infraestructura HPC institucional y no predicen rendimiento del sistema de tesis (pp. PDF 9-11).

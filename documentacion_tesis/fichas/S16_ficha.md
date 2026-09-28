---
id: S16
title: "Scalable Big Data Platform With End-to-End Traceability for Health Data Monitoring in Older Adults: Development and Performance Evaluation"
year: 2025
doi: "10.2196/81701"
eje: "Proveniencia, versionado y auditoría"
---

# S16 - Scalable Big Data Platform With End-to-End Traceability for Health Data Monitoring in Older Adults: Development and Performance Evaluation

## Referencia APA 7

Cejudo, A., Tellechea, Y., Calvo, A., Almeida, A., Martín, C., & Beristain, A. (2025). Scalable big data platform with end-to-end traceability for health data monitoring in older adults: Development and performance evaluation. *JMIR Medical Informatics, 13*(1), e81701. https://doi.org/10.2196/81701

## Citas
- Parentética: (Cejudo et al., 2025)
- Narrativa: Cejudo et al. (2025)

## Objetivo

Diseñar y evaluar DeltaTrace, plataforma abierta que integra trazabilidad y versionado de datos/modelos con procesamiento por lotes y flujo, orquestación y visualización (pp. PDF 1, 3).

## Problema abordado

Las plataformas suelen fragmentar ciclo de datos, modelos, monitorización y orquestación, omitiendo linaje y control de versiones necesarios para reproducibilidad y auditoría (pp. PDF 1-3).

## Metodología
- Diseño: Desarrollo arquitectónico y evaluación de rendimiento/robustez bajo carga controlada (pp. PDF 4, 8-13).
- Contexto: Monitorización de adultos mayores con wearables y cuestionarios; no hubo intervención directa ni datos identificables (pp. PDF 1, 5, 8).
- Muestra o fuentes: Datos sintéticos y LifeSnaps: 71 participantes, aproximadamente 4 meses, más de 35 medidas y más de 71 millones de filas (p. PDF 8).
- Procedimiento: Pruebas de estrés de 50 a 30.000 solicitudes/s en servidores de 8 y 24 núcleos, midiendo ingestión, limpieza, agregación, visualización y anomalías (pp. PDF 1, 8-13).

## Arquitectura y tecnología

Kafka ingiere diez temas de sensores y REST recibe cuestionarios; ELT conserva datos originales en bronce, Spark limpia a plata y agrega/predice a oro sobre Delta Lake/HDFS (pp. PDF 4-6). Delta Lake aporta ACID, esquema, versiones y *time travel*; *checkpoints* conservan configuración, secuencia y lotes incompletos para recuperación (p. PDF 6). Airflow agenda, registra, notifica y reinicia DAG; MLflow guarda parámetros, métricas, salidas y versiones de modelos; MinIO almacena modelos, PostgreSQL sirve metadatos, acceso y consultas rápidas de Grafana (pp. PDF 4-8). Logs, IDs temporales y versiones permiten reconstrucción/auditoría; TLS, AES y control por roles están integrados en componentes, aunque el acceso avanzado queda pendiente (pp. PDF 5, 14-15).

## Actores

Adultos mayores, profesionales, cuidadores, administradores y servicios automáticos de ingestión, procesamiento, IA, orquestación y visualización (pp. PDF 5-7, 12-14).

## Datos y evidencias

Frecuencia cardiaca, actividad, sueño, oxígeno, temperatura, estrés, cuestionarios estructurados, configuraciones, registros operativos, versiones, métricas y predicciones/anomalías (pp. PDF 5, 8). Los umbrales de anomalía pertenecen a LifeSnaps/adultos y no son trasladables a DAYC-2 (pp. PDF 7-8).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Plata, 50 solicitudes/s | 5,1 (DE 0,2) min con 8 núcleos y 4,9 (DE 0,12) con 24. | 9 |
| Plata, 30.000 solicitudes/s | 7,5 (DE 0,28) min con 8 núcleos y 5,6 (DE 0,19) con 24. | 9 |
| Heterogeneidad | Diferencia máxima de 25 s entre temas procesados simultáneamente. | 9-10 |
| Oro, 15.000 solicitudes/s | Agregaciones en aproximadamente 4,3 min y anomalías en 10,5 min. | 13 |
| Escala declarada | Aproximadamente 1.500 usuarios con demora extremo a extremo inferior a 10 min en servidor CPU. | 14-15 |

## Métricas e instrumentos

Solicitudes por segundo, tiempo extremo a extremo, media y DE, comparación 8/24 núcleos, ajuste cuadrático y prueba bilateral; MAE/RMSE y validación cruzada por usuario de tres pliegues para modelos (pp. PDF 7-13). Grafana visualizó datos reales; las cargas fueron sintéticas (pp. PDF 8-12).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Evaluación en un solo servidor, tasas constantes y modelo fijo. | 15 |
| No se probaron inferencia distribuida, multinodo ni GPU. | 15 |
| El modelo no distingue anomalía real de no adherencia o dispositivo apagado. | 15 |
| No se evaluaron interacción humana, usabilidad ni integración operativa; faltan modalidades como imagen, audio y texto. | 15 |

## Aporte a la tesis
- Capítulo 1: Antecedente reciente de trazabilidad integrada como propiedad arquitectónica medible (pp. PDF 3-4, 13-15).
- Capítulo 2: Aporta patrón bronce/plata/oro, ELT, orquestación y versionado conjunto de datos/modelos (pp. PDF 4-7).
- Capítulo 3: Aplicación potencial a DAYC-2: conservar evidencia bruta, derivar capas versionadas, registrar transformaciones y enlazar cada resultado con datos, regla/modelo y ejecución; S16 estudia adultos mayores, no pediatría (pp. PDF 4-7, 14).
- Capítulo 4: Inspira pruebas extremo a extremo bajo carga y recuperación, pero exige objetivos de latencia propios de DAYC-2 (pp. PDF 8-13, 15).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Captura | Paráfrasis: Kafka recibe sensores continuos y REST cuestionarios periódicos. | 5-6 |
| Almacenamiento | Paráfrasis: bronce conserva datos inmutables; plata limpia; oro agrega y sirve analítica. | 6 |
| Versionado | Paráfrasis: Delta Lake ofrece versiones, *time travel*, esquema y transacciones ACID. | 6 |
| Auditoría | Paráfrasis: MLflow enlaza ejecución, parámetros, resultados, datos y versión del modelo. | 4 |
| Consulta | Paráfrasis: PostgreSQL indexado sirve consultas temporales rápidas y paneles Grafana. | 8 |
| Límite | Paráfrasis: no se evaluaron despliegue real, interacción humana ni inferencia distribuida. | 15 |

## Precauciones de uso

La población y los instrumentos son de adultos mayores; no atribuir eficacia pediátrica ni validez DAYC-2 (pp. PDF 1, 5, 8). El “tiempo real” observado es de minutos y depende de carga/hardware (pp. PDF 9-15). La trazabilidad e integridad se demostraron mediante mecanismos y ejemplos, pero su validación empírica en despliegue real quedó pendiente (p. PDF 15).

---
id: S42
title: "Integrated Industrial Reference Architecture for Smart Healthcare in Internet of Things: A Systematic Investigation"
year: 2022
doi: "10.3390/a15090309"
eje: "Arquitectura, sincronización y operación offline"
---

# S42 - Integrated Industrial Reference Architecture for Smart Healthcare in Internet of Things: A Systematic Investigation

## Referencia APA 7

Aguru, A. D., Babu, E. S., Nayak, S. R., Sethy, A., & Verma, A. (2022). Integrated industrial reference architecture for smart healthcare in Internet of Things: A systematic investigation. *Algorithms, 15*(9), 309. https://doi.org/10.3390/a15090309

## Citas
- Parentética: (Aguru et al., 2022)
- Narrativa: Aguru et al. (2022)

## Objetivo

Revisar arquitecturas, protocolos y desafíos IoT, seleccionar una base de referencia y diseñar la Smart Healthcare Reference Architecture (SHRA) sobre el modelo IWF (pp. PDF 1, 4-5).

## Problema abordado

La falta de estandarización arquitectónica y la conectividad, manejo de datos, heterogeneidad, interoperabilidad, privacidad, escalabilidad, seguridad y autenticación dificultan sistemas IoT sanitarios (pp. PDF 1-2, 19).

## Metodología
- Diseño: Investigación sistemática cualitativa guiada por PRISMA y cuatro preguntas de investigación (pp. PDF 2-5).
- Contexto: Arquitecturas y protocolos IoT con aplicación de referencia a salud inteligente (pp. PDF 1-6).
- Muestra o fuentes: Se identificaron 160 fuentes y se conservaron 136 referencias después del cribado (p. PDF 2).
- Procedimiento: Protocolo en seis fases: preguntas, plan, búsqueda, limitaciones, contramedidas y análisis e interpretación (pp. PDF 5-6).

## Arquitectura y tecnología

SHRA adapta siete capas IWF: sensores/controladores, conectividad, edge/fog, acumulación, abstracción, aplicaciones y usuarios/colaboración (pp. PDF 14, 17-19). El flujo transforma datos masivos en edge/fog, acumula datos preprocesados en cloud, aplica analítica y entrega aplicaciones a familiares y personal sanitario (pp. PDF 18-19). La revisión presenta MQTT como protocolo ligero pub/sub y AMQP y CoAP como alternativas asíncronas (p. PDF 15).

## Actores

Pacientes y dispositivos en la capa de captura; redes y plataformas de procesamiento; servicios de nube; familiares, médicos, personal hospitalario y administradores en colaboración y decisión (pp. PDF 18-19).

## Datos y evidencias

La evidencia proviene de literatura y documentos revisados sobre modelos, protocolos, desafíos y contramedidas (pp. PDF 2-6). SHRA es una arquitectura diseñada a partir de esa síntesis; el artículo no informa implementación ni experimento extremo a extremo de SHRA (pp. PDF 18-19, 31-32).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Selección arquitectónica | Los autores consideran IWF la base más adecuada tras comparar las arquitecturas revisadas. | 14 |
| Separación de responsabilidades | IWF distingue acumulación de datos de abstracción, calidad, ETL, comparación y reconciliación. | 14 |
| Procesamiento cercano | SHRA asigna preprocesamiento, análisis elemental y transformación al nivel edge/fog para evitar enviar datos masivos sin procesar. | 18 |
| Colaboración | Familiares, médicos y personal hospitalario toman decisiones con los datos de aplicaciones en la séptima capa. | 19 |

## Métricas e instrumentos

Diagrama de selección PRISMA, conteo de 160 fuentes identificadas y 136 retenidas, y comparación cualitativa de arquitecturas, protocolos, desafíos y contramedidas (pp. PDF 2-6). No se presentan métricas de latencia, disponibilidad, convergencia o recuperación de SHRA.

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| SHRA se presenta como arquitectura de referencia; el protocolo detallado para aplicaciones futuras aún debía desarrollarse. | 31 |
| Las contramedidas de privacidad, seguridad, escalabilidad y pipeline conservan desafíos futuros y deben reducir complejidad. | 32 |
| La conclusión sintetiza revisión y diseño, pero no reporta validación empírica de SHRA. | 32 |

## Aporte a la tesis
- Capítulo 1: Organiza los desafíos no funcionales que DAYC-2 debe abordar en un entorno distribuido (pp. PDF 2, 19).
- Capítulo 2: Aporta una vista por capas para separar captura, transporte, procesamiento local, persistencia, abstracción y coordinación humana (pp. PDF 14, 17-19).
- Capítulo 3: Puede mapearse a DAYC-2 como dispositivo del niño/cuidador, canal de sincronización, servicios edge/backend, repositorio, reconciliación y aplicación profesional; este mapeo es una propuesta propia (pp. PDF 17-19).
- Capítulo 4: La falta de evaluación empírica exige medir conectividad, interoperabilidad, seguridad, escalabilidad y recuperación en la implementación DAYC-2 (pp. PDF 19, 31-32).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Definir capas | Paráfrasis: IWF separa edge, conectividad, fog, acumulación, abstracción, aplicaciones y colaboración. | 14 |
| Justificar edge | Paráfrasis: procesar el volumen sanitario en edge/fog evita consumo elevado de ancho de banda hacia la nube. | 18 |
| Diseñar reconciliación | Paráfrasis: la capa de abstracción incluye calidad, completitud, ETL, comparación y reconciliación. | 14 |
| Delimitar propuesta | Paráfrasis: SHRA podría usarse como referencia futura para diseñar aplicaciones sanitarias inteligentes. | 32 |

## Precauciones de uso

No presentar SHRA como sistema implementado o validado: es una síntesis y propuesta de referencia (pp. PDF 18-19, 32). La selección de IWF es una conclusión cualitativa de los autores, no una comparación experimental. No aporta evidencia clínica para DAYC-2.

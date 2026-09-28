---
id: S41
title: "An Empirical Study on Challenges of Event Management in Microservice Architectures"
year: 2026
doi: "10.1145/3776581"
eje: "Arquitectura, sincronización y operación offline"
---

# S41 - An Empirical Study on Challenges of Event Management in Microservice Architectures

## Referencia APA 7

Laigner, R., Almeida, A. C., Assunção, W. K. G., & Zhou, Y. (2026). An empirical study on challenges of event management in microservice architectures. *ACM Transactions on Software Engineering and Methodology, 35*(8), Article 245, 1-62. https://doi.org/10.1145/3776581

## Citas
- Parentética: (Laigner et al., 2026)
- Narrativa: Laigner et al. (2026)

## Objetivo

Caracterizar prácticas y desafíos que encuentran desarrolladores al gestionar eventos en arquitecturas de microservicios (p. PDF 3).

## Problema abordado

La comunicación asíncrona reduce acoplamiento, pero introduce dificultades de publicación, orden, dependencias, entrega, reintento, auditoría, depuración y seguridad que suelen quedar en código ad hoc (pp. PDF 1-4, 7).

## Metodología
- Diseño: Minería de repositorio y análisis cuantitativo y cualitativo de preguntas de Stack Overflow (pp. PDF 3, 8-12).
- Contexto: Preguntas sobre eventos y microservicios del volcado de Stack Exchange disponible el 15 de septiembre de 2023 (pp. PDF 8-9).
- Muestra o fuentes: Universo de 23 199 461 preguntas; 8369 con etiqueta microservice, 1407 filtradas por palabras clave y muestra aleatoria de 628 para análisis manual (pp. PDF 8-10).
- Procedimiento: Búsqueda de patrones y requisitos, filtros de relevancia, codificación abierta por dos autores y arbitraje de conflictos por un tercer investigador (pp. PDF 9-12).

## Arquitectura y tecnología

El estudio examina microservicios autónomos con base por servicio, brokers, colas o logs y eventos asíncronos (pp. PDF 2, 5-7). Analiza patrones como mensajería, event sourcing, CQRS, saga, transactional outbox, circuit breaker, trazado distribuido y auditoría (p. PDF 12). No propone una arquitectura sanitaria concreta; aporta evidencia empírica sobre riesgos de EDA (pp. PDF 52-53).

## Actores

Desarrolladores como autores de preguntas, productores y consumidores de eventos, brokers, bases de datos, frameworks, proveedores cloud y usuarios que esperan resultados de flujos asíncronos (pp. PDF 5-7, 22-30).

## Datos y evidencias

Las unidades analizadas son preguntas, respuestas, etiquetas, fragmentos de código y comentarios (pp. PDF 8-12). Los porcentajes representan frecuencia de desafíos en la muestra codificada, no tasas de fallos de sistemas productivos ni resultados clínicos (pp. PDF 22-30, 44).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Dependencias entre eventos | Representaron 20.11% de los desafíos de seguridad/vivacidad y 12.54% del total analizado. | 25 |
| Orden de eventos | Representó 16.67% de seguridad/vivacidad y 10.39% del total. | 26 |
| Reproducción para sincronizar/recuperar | Los problemas de replay fueron 14.37% de seguridad/vivacidad y 8.96% del total. | 27 |
| Semántica débil de entrega | Fue 27.59% de seguridad/vivacidad y 17.20% del total, la categoría más frecuente dentro de ese grupo. | 29 |
| Alcance del problema | Los desafíos cubren encolado, entrega, almacenamiento, procesamiento y sincronización de eventos. | 30 |

## Métricas e instrumentos

Conteos de preguntas, etiquetas, publicaciones, patrones y requisitos; porcentajes de categorías sobre la muestra manual (pp. PDF 8-15, 22-30). La clasificación cualitativa usó codificación abierta, revisión independiente y arbitraje (pp. PDF 10-12).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Stack Overflow como única fuente puede introducir sesgo de selección. | 44 |
| El conjunto de etiquetas y los umbrales pueden omitir preguntas relevantes. | 44 |
| La clasificación manual introduce subjetividad, aunque hubo análisis independiente y arbitraje. | 44 |
| Los escenarios y problemas observados no son generalizables a todas las plataformas cloud y de datos. | 44 |

## Aporte a la tesis
- Capítulo 1: Fundamenta que adoptar eventos no elimina coordinación; desplaza dificultades hacia consistencia, entrega y observabilidad (pp. PDF 3-4, 52).
- Capítulo 2: Sustenta requisitos de idempotencia, identificadores únicos, orden por agregado, publicación atómica, compensaciones, offsets y replay controlado (pp. PDF 23-30).
- Capítulo 3: Para DAYC-2, orienta a modelar cada cambio con ID, versión, actor y sesión; consumidores idempotentes, outbox, reintentos acotados, registro de errores y estado observable. Son medidas derivadas que deben concretarse y validarse en la arquitectura propia (pp. PDF 23-30).
- Capítulo 4: Proporciona un catálogo para pruebas de caída del broker, evento tardío, duplicado, fuera de orden, consumidor caído, compensación fallida y reconstrucción desde offsets (pp. PDF 22-30).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Justificar idempotencia | Paráfrasis: la entrega al menos una vez puede duplicar eventos y obliga a consumidores idempotentes. | 28-29 |
| Probar orden | Paráfrasis: particiones, sobrecarga, jitter y fallos del productor pueden retrasar eventos y romper dependencias. | 25 |
| Diseñar recuperación | Paráfrasis: el replay se necesita para replicación, evolución, recuperación de fallos y corrección de errores. | 27 |
| Evitar reintentos ad hoc | Paráfrasis: reintentos personalizados pueden generar duplicados y más lógica de aplicación. | 29 |
| Delimitar alcance | Paráfrasis: las frecuencias provienen de preguntas de Stack Overflow y pueden no generalizar a todas las plataformas. | 44 |

## Precauciones de uso

La fuente caracteriza problemas reportados, no demuestra que un patrón específico los resuelva. Los porcentajes dependen de la taxonomía y muestra de Stack Overflow (pp. PDF 10-12, 44). Debe usarse para requisitos y pruebas de fallos de DAYC-2, no para afirmar incidencia clínica o tasas esperadas en producción.

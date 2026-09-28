---
id: S24
title: "A Proposal for a Multimodal Interactive Platform for Data Collection in Autism Play-Based Therapy Sessions"
year: 2025
doi: "10.1145/3714394.3754393"
eje: "Captura y gestión de evidencia multimodal"
---

# S24 - A Proposal for a Multimodal Interactive Platform for Data Collection in Autism Play-Based Therapy Sessions

## Referencia APA 7

Bartolomei, G., Granato, G., Baldassarre, G., Özcan, B., & Sperati, V. (2025). A proposal for a multimodal interactive platform for data collection in autism play-based therapy sessions. In *Companion of the 2025 ACM International Joint Conference on Pervasive and Ubiquitous Computing (UbiComp Companion '25)* (pp. 20-24). Association for Computing Machinery. https://doi.org/10.1145/3714394.3754393

## Citas
- Parentética: (Bartolomei et al., 2025)
- Narrativa: Bartolomei et al. (2025)

## Objetivo

Proponer un prototipo que capture y permita revisar de forma sincronizada la interacción entre niño, dos terapeutas y juguete durante juego terapéutico, combinando dos puntos de vista, audio, actividad del juguete y mirada detectada (pp. PDF 1-3).

## Problema abordado

La observación profesional no retiene necesariamente todas las acciones motoras, focos de atención, relaciones y estados durante una sesión; las soluciones previas suelen capturar una sola modalidad o solo la interacción niño-juguete, sin una vista temporal integrada para revisión (pp. PDF 1-2).

## Metodología
- Diseño: Propuesta y descripción técnica de prototipo; no reporta un estudio de validación de la plataforma completa (pp. PDF 1, 4).
- Contexto: Sesión de terapia basada en juego con un terapeuta próximo al niño y otro observando desde una perspectiva amplia (pp. PDF 2-4).
- Muestra o fuentes: No aplica para la plataforma completa; se citan resultados previos del juguete Echo y del detector de mirada (pp. PDF 3-4).
- Procedimiento: La aplicación Android empareja dispositivos e inicia/detiene conjuntamente; después se procesan los videos, se cargan archivos y el terapeuta navega corrientes y gráficos sincronizados (pp. PDF 3-4).

## Arquitectura y tecnología

Echo incorpora IMU, reconocimiento de juego en tiempo real, realimentación de luz/sonido y log con marca temporal. Dos Camera Glasses basadas en ESP32S3 y OV2640 guardan video y audio en microSD a 800 x 600 y 20 fps: una registra cerca del niño y otra el entorno con gran angular. Una aplicación Android gestiona Bluetooth, visualización, guardado y arranque/parada sincronizados (p. PDF 3).

Un algoritmo CNN-LSTM procesa posteriormente la primera vista para producir video y log de mirada. La aplicación Python muestra ambos videos, log de Echo, mirada y forma de onda de audio sobre un deslizador temporal común (pp. PDF 3-4). El guardado, procesamiento y carga siguen siendo manuales; la infraestructura segura en nube se plantea como futuro (p. PDF 4).

## Actores

Niño que juega; terapeuta próximo que usa Echo y porta cámara; segundo terapeuta que registra el contexto; terapeuta o investigador que empareja dispositivos, carga datos, navega y revisa; algoritmos de Echo y mirada que generan anotaciones derivadas (pp. PDF 1, 3-4).

## Datos y evidencias

Dos videos con audio, intensidad acústica, eventos de juego simbólico con marca temporal, detección cuadro a cuadro de mirada y estadísticas resumidas. La interfaz conserva contexto y permite volver al momento que sustenta un evento, pero el artículo no especifica identificadores, formatos de manifiesto, precisión temporal, control de integridad, permisos ni versionado de derivados (pp. PDF 3-4).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Captura multivista | Dos cámaras portadas por terapeutas combinan vista próxima y contexto amplio. | 2-4 |
| Sincronización | Android sincroniza inicio y fin de juguete, video y audio; no se cuantifica el error temporal. | 3 |
| Captura de cámara | El prototipo guarda 800 x 600 a 20 fps estables en microSD. | 3 |
| Revisión integrada | Un deslizador navega en conjunto videos, actividad de Echo, mirada y forma de onda. | 4 |
| Estado de madurez | La plataforma completa aún debe probarse en piloto y validarse mediante protocolo clínico estructurado. | 4 |
| Pérdida operativa | La batería de Camera Glasses dura aproximadamente 25 minutos y el flujo de guardado, proceso y carga es manual. | 4 |

## Métricas e instrumentos

Resolución, fotogramas por segundo, duración de batería, recuento y tiempo acumulado de miradas, distribución de actividades simbólicas e intensidad de audio (pp. PDF 3-4). Las cifras de 96% de Echo y ROC AUC superior a 0,80 del detector proceden de pilotos o trabajos previos y no validan la plataforma integrada (pp. PDF 3-4).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Es una propuesta; la plataforma integrada no tiene aún piloto ni validación clínica. | 4 |
| Batería de Camera Glasses de aproximadamente 25 minutos y calidad de video pendiente de mejora. | 4 |
| Guardado, procesamiento y carga son manuales; la nube segura y escalable es trabajo futuro. | 4 |
| No se informa precisión de sincronización, deriva, pérdida de archivos ni recuperación. | 3-4 |
| No se detallan privacidad, consentimiento, seguridad, roles o retención de audio y video infantil. | 3-4 |

## Aporte a la tesis
- Capítulo 1: Ilustra la necesidad de reconstruir una interacción multi-actor desde varias perspectivas y eventos heterogéneos (pp. PDF 1-2).
- Capítulo 2: Aporta el patrón original-derivado: video y audio originales, logs del juguete y mirada procesada enlazados por tiempo para revisión (pp. PDF 3-4).
- Capítulo 3: Inspira una línea temporal DAYC-2 con vistas sincronizadas, eventos seleccionables, forma de onda y estadísticas que siempre remitan al segmento fuente; requiere añadir integridad, roles, versiones y auditoría ausentes en la propuesta (pp. PDF 3-4).
- Capítulo 4: Sugiere probar error de sincronización, autonomía, calidad audiovisual, completitud, tiempo de carga/proceso y capacidad del profesional para verificar eventos en el original (p. PDF 4).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Multi-actor | Paráfrasis: una cámara acompaña al terapeuta próximo y otra registra ampliamente el entorno. | 3 |
| Evento trazable | Paráfrasis: Echo registra cada acción reconocida con una marca temporal para análisis posterior. | 3 |
| Sincronización de captura | Paráfrasis: la aplicación hace coincidir inicio y parada del juguete con video y sonido de ambas gafas. | 3 |
| Revisión profesional | Paráfrasis: el deslizador permite navegar conjuntamente dos videos y tres gráficos sincronizados. | 4 |
| Madurez | Paráfrasis: se requiere un protocolo con terapeutas para validar usabilidad, efectividad y aporte clínico. | 4 |

## Precauciones de uso

No debe describirse como sistema validado. Las precisiones de Echo y mirada pertenecen a componentes o estudios previos, no al flujo integrado. El antecedente se usa para diseñar captura y revisión de evidencia DAYC-2; no para inferir autismo, puntuar DAYC-2 mediante IA ni sustituir al profesional (pp. PDF 3-4).

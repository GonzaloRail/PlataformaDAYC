---
id: S08
title: "Digital health in smart cities: Rethinking the remote health monitoring architecture on combining edge, fog, and cloud"
year: 2023
doi: "10.1007/s12553-023-00753-3"
eje: "Arquitectura, sincronización y operación offline"
---

# S08 - Digital health in smart cities: Rethinking the remote health monitoring architecture on combining edge, fog, and cloud

## Referencia APA 7

Rodrigues, V. F., da Rosa Righi, R., da Costa, C. A., Zeiser, F. A., Eskofier, B., Maier, A., & Kim, D. (2023). Digital health in smart cities: Rethinking the remote health monitoring architecture on combining edge, fog, and cloud. *Health and Technology, 13*(3), 449-472. https://doi.org/10.1007/s12553-023-00753-3

## Citas
- Parentética: (Rodrigues et al., 2023)
- Narrativa: Rodrigues et al. (2023)

## Objetivo

Presentar VitalSense, una arquitectura jerárquica de monitoreo remoto que combina edge, fog y cloud e incorpora compresión, notificaciones, trazabilidad, sharding y descarga de procesamiento (pp. PDF 1, 3).

## Problema abordado

Centralizar datos IoT en nube añade latencia y tráfico; distribuirlos en fog mejora proximidad, pero complica localizar datos, soportar movilidad y gestionar recursos limitados (pp. PDF 2, 12-13).

## Metodología
- Diseño: Propuesta arquitectónica con revisión de antecedentes, casos de uso y experimentos preliminares de sharding (pp. PDF 1, 3, 19-20).
- Contexto: Monitoreo remoto de salud a escala de ciudad, proyectado para Porto Alegre, Brasil (pp. PDF 3, 19, 22).
- Muestra o fuentes: Base con más de dos millones de registros, dos escenarios de consulta y diez ejecuciones; además se examinaron 149 dispositivos comerciales (pp. PDF 19-20).
- Procedimiento: Comparación en una sola computadora de MongoDB centralizado frente a dos shards en contenedores Docker (p. PDF 19).

## Arquitectura y tecnología

Edge Controllers capturan, filtran, agregan, comprimen y cifran; se comunican con fog mediante MQTT bidireccional (pp. PDF 7-9). Los nodos fog forman una jerarquía, ejecutan funciones serverless o contenedores, encolan solicitudes si están sobrecargados y no hay nodo superior, y descargan trabajo hacia fog padre o nube (pp. PDF 8-10, 13-14). Un Information Naming Service en nube registra handshakes y handoffs para ubicar datos distribuidos por dispositivo y tiempo (p. PDF 13).

## Actores

Personas con sensores, Edge Controllers, nodos fog, servicios cloud, hospitales, profesionales, administradores públicos y aplicaciones consumidoras (pp. PDF 3, 7-10). La propuesta contempla movilidad entre regiones mediante handoff de sesiones entre nodos fog vecinos (p. PDF 9).

## Datos y evidencias

La arquitectura contempla signos vitales, geolocalización, notificaciones, metadatos de ubicación de fragmentos y resultados de servicios (pp. PDF 3, 8-13). Solo el sharding recibió una evaluación preliminar y local; el despliegue extremo a extremo de los tres niveles permanecía como trabajo futuro (pp. PDF 19, 22).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Sharding preliminar | La respuesta mejoró aproximadamente 20% frente a la base centralizada. | 19 |
| Tiempos de consulta | Con sharding se obtuvieron medias de 1.36 y 1.38 s; sin sharding, 1.66 y 1.78 s en los dos escenarios. | 19 |
| Manejo de sobrecarga | La propuesta encola solicitudes cuando no hay recursos locales ni conexión al nodo superior, y luego procesa localmente o descarga hacia arriba. | 14 |
| Disponibilidad de sensores | Solo siete de 149 dispositivos revisados incluían todos los sensores considerados, equivalentes al 4.7%. | 20 |

## Métricas e instrumentos

Tiempo medio de consulta y desviación estándar en diez ejecuciones sobre más de dos millones de registros (p. PDF 19). El análisis de dispositivos consideró sensores, seguridad, API y protocolos de comunicación (p. PDF 20).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Los shards y la base centralizada se ejecutaron en la misma máquina, por lo que no se midió el efecto real de proximidad ni red distribuida. | 19 |
| Los experimentos de sharding fueron preliminares y abarcaron solo dos nodos y dos consultas. | 19 |
| El despliegue extremo a extremo de edge, fog y cloud quedó como trabajo futuro. | 22 |
| La propuesta se planeó primero para áreas urbanas; energía e Internet son problemas relevantes para extenderla a áreas rurales. | 20 |

## Aporte a la tesis
- Capítulo 1: Expone el equilibrio entre baja latencia local y complejidad de localizar y recuperar datos distribuidos (pp. PDF 12-13).
- Capítulo 2: Aporta separación edge-fog-cloud, pub/sub, cola ante sobrecarga, offloading y servicio de nombres para trazabilidad de fragmentos (pp. PDF 8-14).
- Capítulo 3: Para DAYC-2, inspira un índice central ligero que ubique evidencia por sesión, actor, dispositivo y tiempo, manteniendo captura y procesamiento cercanos al origen; es una extrapolación de diseño (p. PDF 13).
- Capítulo 4: Motiva validar particiones reales, caída del índice, handoff, recuperación de colas y consultas distribuidas, pues el estudio solo probó sharding local (pp. PDF 19, 22).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Definir niveles | Paráfrasis: la arquitectura tiene tres capas, edge, fog y cloud, con procesamiento cercano y agregación central. | 7 |
| Diseñar trazabilidad | Paráfrasis: el INS registra handshakes y handoffs para determinar dónde se almacenan los datos de un dispositivo. | 13 |
| Diseñar tolerancia a sobrecarga | Paráfrasis: las solicitudes se encolan si el nodo está saturado y el superior es inaccesible. | 14 |
| Delimitar validación | Paráfrasis: la comparación de sharding se ejecutó en contenedores sobre una sola computadora. | 19 |
| Marcar trabajo futuro | Paráfrasis: el despliegue extremo a extremo de los tres niveles aún estaba pendiente. | 22 |

## Precauciones de uso

VitalSense es principalmente una propuesta; no debe describirse como plataforma distribuida plenamente desplegada o validada (pp. PDF 19, 22). El 20% corresponde a consultas MongoDB locales y no demuestra tolerancia a fallos, sincronización offline ni desempeño clínico de DAYC-2.

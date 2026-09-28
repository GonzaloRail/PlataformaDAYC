---
id: S06
title: "A Web-Based Synchronized Architecture for Collaborative Dynamic Diagnosis and Therapy Planning"
year: 2023
doi: "10.1109/ACCESS.2022.3232275"
eje: "Arquitectura, sincronización y operación offline"
---

# S06 - A Web-Based Synchronized Architecture for Collaborative Dynamic Diagnosis and Therapy Planning

## Referencia APA 7

Zhang, Q. (2023). A web-based synchronized architecture for collaborative dynamic diagnosis and therapy planning. *IEEE Access, 11*, 421-437. https://doi.org/10.1109/ACCESS.2022.3232275

## Citas
- Parentética: (Zhang, 2023)
- Narrativa: Zhang (2023)

## Objetivo

Desarrollar algoritmos y una arquitectura web para compartir y manipular de forma sincronizada datos médicos volumétricos dinámicos entre profesionales remotos (pp. PDF 1-2).

## Problema abordado

La visualización multimodal 4D y la retroalimentación sincronizada entre ubicaciones exigen procesar y transmitir datos voluminosos y dinámicos pese a límites de red y hardware (pp. PDF 1-2).

## Metodología
- Diseño: Desarrollo de plataforma y evaluación técnica de registro, renderizado, carga y sincronización (pp. PDF 2, 14-15).
- Contexto: Planificación colaborativa de reparación de defecto septal auricular como caso demostrativo (pp. PDF 1, 3).
- Muestra o fuentes: Datos MR y ultrasonido de un sujeto sano; veinte volúmenes MR y catorce imágenes 3D de ultrasonido (p. PDF 4).
- Procedimiento: Registro multimodal, renderizado WebGL/GPU, integración de herramienta virtual y 30 pruebas de rendimiento por configuración (pp. PDF 4-10, 15).

## Arquitectura y tecnología

Arquitectura cliente-servidor con Node.js, Express, Socket.IO y conexiones WebSocket persistentes y bidireccionales (pp. PDF 9-11). Los eventos de interfaz se transmiten al servidor, que los difunde a los clientes; los mensajes se almacenan en MySQL y pueden recuperarse en el navegador (p. PDF 10). Tras la carga inicial, los datos permanecen en memoria del cliente y solo se envían señales de sincronización de la visualización (p. PDF 15).

## Actores

Cardiólogos, radiólogos y otros profesionales conectados exploran imágenes, manipulan la herramienta virtual y comparten comentarios diagnósticos (pp. PDF 1, 10, 15-16). El servidor actúa como coordinador central de eventos y estado visual (pp. PDF 9-11).

## Datos y evidencias

Se emplearon imágenes MR, ultrasonido, señal ECG, estructuras segmentadas, acciones sobre una herramienta virtual y mensajes de usuarios (pp. PDF 4-10). La evaluación es técnica y demostrativa; no se integró con EHR ni se desplegó en un escenario clínico real (p. PDF 16).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Sincronización | El retraso de sincronización entre clientes fue usualmente menor que aproximadamente 5 ms en las configuraciones probadas. | 15 |
| Carga inicial | Cargar veinte conjuntos por cuatro modalidades tomó aproximadamente 110 s en dos navegadores y hasta aproximadamente 200 s en otro. | 15 |
| Renderizado dinámico | La visualización 4D multimodal con estructuras realzadas promedió aproximadamente 6.7-6.9 fps; con herramienta virtual, aproximadamente 6.5 fps. | 15 |
| Registro multimodal | El error objetivo de registro informado fue aproximadamente 1.8±0.9 mm. | 5 |

## Métricas e instrumentos

Velocidad de renderizado en fps, desviación estándar, tiempo de carga y demora de sincronización, con 30 pruebas por configuración y distintos GPU y navegadores (pp. PDF 14-15). La red usada ofrecía aproximadamente 100 MB de descarga y 20 MB de subida según el artículo (p. PDF 14).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Requiere hardware gráfico, navegador e Internet de alta velocidad adecuados. | 14 |
| La carga inicial de datos puede rondar dos minutos y varía con la red. | 15 |
| No está integrado con EHR ni fue implementado en un escenario clínico real. | 16 |
| La seguridad de información protegida, autenticación reforzada y cifrado se dejan para trabajo futuro. | 16 |

## Aporte a la tesis
- Capítulo 1: Ejemplifica la coordinación remota de varios profesionales sobre un estado dinámico compartido (pp. PDF 1-2).
- Capítulo 2: Aporta el patrón de eventos bidireccionales y difusión servidor-clientes, con persistencia separada de mensajes (pp. PDF 9-11).
- Capítulo 3: Para DAYC-2, sugiere sincronizar comandos o eventos pequeños en vez de retransmitir toda la evidencia ya cargada; es una analogía arquitectónica, no una solución validada para evaluaciones (pp. PDF 10, 15).
- Capítulo 4: Señala que DAYC-2 debe probar reconexión, pérdida, duplicación, orden y autorización, aspectos no evaluados por el prototipo conectado (pp. PDF 15-16).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Describir tiempo real | Paráfrasis: Socket.IO recibe eventos en Node.js y los difunde a los clientes conectados. | 10 |
| Separar estado y evidencia | Paráfrasis: después de cargar los datos en memoria del cliente, solo se envían señales para sincronizar la visualización. | 15 |
| Sustentar persistencia | Paráfrasis: los comentarios se almacenan en MySQL y pueden extraerse desde el navegador. | 10 |
| Delimitar madurez | Paráfrasis: la plataforma es desarrollo tecnológico para verificación médica y aún no se integró con EHR. | 16 |

## Precauciones de uso

No se documentan pruebas con desconexión, concurrencia conflictiva, recuperación ni pérdida de mensajes. El caso usa datos de un sujeto sano y no demuestra eficacia diagnóstica o terapéutica (pp. PDF 4, 16). Sus métricas no deben trasladarse como objetivos de DAYC-2 sin un entorno de prueba equivalente.

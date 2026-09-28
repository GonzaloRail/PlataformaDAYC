---
id: S43
title: "Dew-based offline computing architecture for healthcare IoT"
year: 2022
doi: "10.1016/j.icte.2021.09.005"
eje: "Arquitectura, sincronización y operación offline"
---

# S43 - Dew-based offline computing architecture for healthcare IoT

## Referencia APA 7

Medhi, K., Ahmed, N., & Hussain, M. I. (2022). Dew-based offline computing architecture for healthcare IoT. *ICT Express, 8*(3), 371-378. https://doi.org/10.1016/j.icte.2021.09.005

## Citas
- Parentética: (Medhi et al., 2022)
- Narrativa: Medhi et al. (2022)

## Objetivo

Proponer DC-Health, una arquitectura dew para decisiones sanitarias offline y de baja latencia mediante análisis ligero próximo a sensores (pp. PDF 1-2).

## Problema abordado

La nube y fog dependen de red y añaden latencia, mientras dispositivos restringidos requieren respuestas locales incluso con red inestable o ausente (pp. PDF 1-2).

## Metodología
- Diseño: Prototipo móvil y simulación iFogSim comparando dew, fog y cloud, junto con evaluación de una CNN ligera (pp. PDF 3, 5-7).
- Contexto: Monitoreo de condición cardíaca mediante señales ECG; no hubo estudio con humanos o animales realizado por los autores (pp. PDF 3, 7).
- Muestra o fuentes: Conjunto MIT-BIH con 1000 registros ECG de seis tipos de arritmia, empleado como material experimental secundario (p. PDF 5).
- Procedimiento: Smartphone con Python/Pydroid-3, MQTT, CNN y MySQL local; tres dispositivos dew, un fog, diez repeticiones de simulación y promedio de resultados (pp. PDF 3, 5).

## Arquitectura y tecnología

Cada nodo dew integra gestor, interfaz de comunicación, manejador de dispositivos, servidor ligero, base local, GUI y gateway edge/cloud (pp. PDF 3-4). MQTT transporta señales desde sensores; el nodo preprocesa y analiza localmente, guarda resultados en MySQL durante desconexión y un sincronizador actualiza la nube a intervalos fijos (pp. PDF 3-4).

## Actores

Sensores corporales como publicadores, smartphone dew como cliente y procesador, broker MQTT, fog y cloud, y usuario que recibe el estado mediante GUI (pp. PDF 3-4).

## Datos y evidencias

Se usaron señales ECG de diez segundos con 3600 muestras a 360 Hz y etiquetas de ritmos cardíacos (p. PDF 6). La evidencia valida un prototipo de laboratorio y simulación de rendimiento, no despliegue clínico, sincronización conflictiva ni validez para DAYC-2 (pp. PDF 5-7).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Reducción de respuesta de red | El resumen informa al menos 92% menos que fog y 98% menos que cloud. | 1 |
| RTT dew | El promedio informado fue 2300 ms, menor que los módulos cloud y fog comparados. | 6 |
| Operaciones CNN | El ejemplo de cuantización redujo las multiplicaciones de nueve a tres, manteniendo ocho sumas. | 4 |
| Recursos del modelo | Las variantes ligeras redujeron operaciones, CPU, memoria y ejecución frente a las CNN convencionales comparadas. | 6-7 |

## Métricas e instrumentos

RTT, ancho de banda, energía, operaciones aritméticas, CPU, memoria, tiempo de ejecución y exactitud (pp. PDF 5-7). iFogSim modeló latencias y recursos de cloud, fog y tres nodos dew; la simulación se repitió diez veces (p. PDF 5).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La evaluación combinó un prototipo de laboratorio con simulación y un máximo de tres nodos dew. | 5 |
| El caso se limitó a ECG y a arquitecturas CNN concretas. | 5-6 |
| La evaluación a gran escala y con dispositivos heterogéneos quedó como trabajo futuro. | 7 |
| La sincronización se describe a intervalos fijos, pero no se evalúan conflictos, duplicados, orden ni recuperación. | 3 |

## Aporte a la tesis
- Capítulo 1: Fundamenta la necesidad de mantener funciones esenciales cuando Internet no está disponible (pp. PDF 1-2).
- Capítulo 2: Aporta el patrón de nodo extremo autónomo con análisis, base local y sincronizador de nube (pp. PDF 3-4).
- Capítulo 3: Para DAYC-2, sugiere que captura, validación y progreso de sesión permanezcan locales, mientras la sincronización sea diferida; es una adaptación conceptual y no implica ejecutar inferencia clínica local (pp. PDF 3-4).
- Capítulo 4: Motiva medir duración offline, cola acumulada, convergencia al reconectar, consumo de recursos y recuperación ante caída; estos aspectos de sincronización no fueron validados (pp. PDF 3, 5-7).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Definir autonomía local | Paráfrasis: durante la desconexión, el servidor dew usa la base local para guardar datos y resultados recientes. | 3 |
| Definir sincronización diferida | Paráfrasis: el sincronizador actualiza la nube en intervalos fijos para referencia futura. | 3 |
| Describir nodo extremo | Paráfrasis: el dispositivo dew filtra, preprocesa y ejecuta análisis ligero cerca de los sensores. | 3-4 |
| Delimitar validación | Paráfrasis: la solución fue probada como prototipo real de escala de laboratorio y se prevé un testbed de gran escala. | 7 |

## Precauciones de uso

No confundir clasificación de ECG con evaluación del neurodesarrollo ni atribuir capacidad diagnóstica a DAYC-2. Las mejoras proceden de una configuración simulada y un prototipo limitado (pp. PDF 5-7). La sincronización temporal descrita no constituye evidencia de resolución de conflictos o tolerancia a fallos distribuida.

---
id: S02
title: "Software Reference Architecture for Real-Time Mobile Digital Phenotyping: Evaluation of System Designs"
year: 2026
doi: "10.2196/87320"
eje: "Arquitectura, sincronización y operación offline"
---

# S02 - Software Reference Architecture for Real-Time Mobile Digital Phenotyping: Evaluation of System Designs

## Referencia APA 7

Kim, I., Robinson, T. N., Reeves, B. B., Haber, N., & Ram, N. (2026). Software reference architecture for real-time mobile digital phenotyping: Evaluation of system designs. *JMIR Formative Research, 10*(1), e87320. https://doi.org/10.2196/87320

## Citas
- Parentética: (Kim et al., 2026)
- Narrativa: Kim et al. (2026)

## Objetivo

Proponer, implementar y evaluar una arquitectura modular que combine procesamiento paralelo y edge computing para fenotipado digital móvil en tiempo real (pp. PDF 1, 4).

## Problema abordado

Los pipelines secuenciales dependientes de nube sufren cuellos de botella de procesamiento y ancho de banda que aumentan latencia, pérdida de datos y riesgo de suspensión de la aplicación (p. PDF 2).

## Metodología
- Diseño: Comparación experimental de dos prototipos Android, uno modular y edge, y otro secuencial y dependiente de nube (p. PDF 5).
- Contexto: Dos experimentos controlados de 48 horas, uno offline para recursos y pérdida, y otro con Wi-Fi estable para latencia (pp. PDF 5-6).
- Muestra o fuentes: Mediciones minuto a minuto, 2880 observaciones por condición de carga, y 96 ciclos de procesamiento por condición para latencia (pp. PDF 6-9).
- Procedimiento: Cuatro cargas aproximadas de 10, 30, 40 y 60 MB/min; los dispositivos ejecutaron una secuencia fija de seis actividades y procesaron cinco flujos de sensores (pp. PDF 5-6).

## Arquitectura y tecnología

La arquitectura Screenomics separa módulos por modalidad, estandariza tempranamente, usa almacenamiento distribuido, caché en memoria, tareas asíncronas, gestor reactivo de recursos y motores de fenotipo e intervención (pp. PDF 4-5). Los prototipos se ejecutaron en Samsung Galaxy S21 con Android 14 y usaron servicios Firebase; capturaron audio ambiental, pantallas, GPS, acelerómetro y giroscopio (p. PDF 5).

## Actores

El experimento utilizó usuarios virtuales y no incluyó participantes humanos ni datos identificables (pp. PDF 6-7). Los actores arquitectónicos son módulos productores de datos, gestor de recursos, almacenamiento local, motores analíticos y servicios de nube (pp. PDF 4-5).

## Datos y evidencias

Se registraron CPU, RAM, descarga de batería, pérdida de datos y marcas temporales de cinco etapas de procesamiento (pp. PDF 1, 6). La evaluación valida rendimiento técnico bajo condiciones controladas, no la validez ni utilidad clínica de los fenotipos producidos (p. PDF 12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Continuidad bajo carga | Screenomics funcionó durante las 48 horas en todas las cargas; el sistema tradicional falló aproximadamente a las 44, 20 y 9 horas en cargas media, alta y muy alta. | 9 |
| Fidelidad de datos | Al final de 48 horas, Screenomics conservó 44.2%, 69.5%, 85.2% y 99.1% de los datos esperados, frente a 4.7%, 17.2%, 39.4% y 97.9% del sistema tradicional. | 9 |
| Latencia total | Las medianas fueron 0.90-9.32 s para Screenomics y 30.1-398.1 s para la arquitectura tradicional según la carga. | 10 |
| Recursos | Las diferencias de CPU, RAM, batería y almacenamiento fueron significativas en todas las condiciones, con P<.001. | 7 |

## Métricas e instrumentos

CPU (%), RAM (MB), batería (%/h), pérdida de datos (%), crecimiento de almacenamiento y tiempo extremo a extremo (s), resumidos con media, desviación estándar, rango, mediana e IQR (pp. PDF 6-10). Se usaron pruebas t de dos muestras y un modelo lineal de efectos mixtos (pp. PDF 6-7).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Usuarios virtuales, tareas guionadas, un modelo de dispositivo y configuraciones fijas no reproducen la variabilidad real. | 12 |
| El ensayo duró 48 horas y la red del experimento de latencia fue Wi-Fi estable de alta velocidad. | 12 |
| No se evaluaron respuesta percibida, oportunidad de intervención ni efecto de datos corruptos sobre la precisión del fenotipo. | 12 |
| Se evaluó la arquitectura computacional, no la validez ni utilidad clínica de los fenotipos. | 12 |

## Aporte a la tesis
- Capítulo 1: Cuantifica cómo una arquitectura centralizada puede degradarse y fallar cuando crecen carga y acumulación local (pp. PDF 8-10, 12).
- Capítulo 2: Sustenta modularidad por fuente, procesamiento edge, colas asíncronas, almacenamiento distribuido y gestión adaptativa de recursos (pp. PDF 3-5).
- Capítulo 3: Orienta en DAYC-2 a preprocesar evidencia localmente, mantener buffers acotados, priorizar tareas críticas y diferir trabajo no crítico; la adaptación es una propuesta de diseño (pp. PDF 12-13).
- Capítulo 4: Proporciona métricas y perfiles de carga para pruebas de estrés, desconexión y pérdida; DAYC-2 deberá además probar redes intermitentes, dispositivos diversos, recuperación y exactitud funcional (p. PDF 12).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Criticar nube secuencial | Paráfrasis: el procesamiento secuencial y la transmisión crean cuellos de botella y pueden producir pérdida de datos y suspensión de la app. | 2 |
| Definir arquitectura edge | Paráfrasis: cada modalidad tiene un módulo independiente para preprocesamiento y estandarización local. | 5 |
| Evidenciar tolerancia de carga | Paráfrasis: el prototipo edge siguió operativo 48 horas en todas las cargas, mientras el tradicional falló antes en las tres cargas superiores. | 9 |
| Dimensionar latencia | Paráfrasis: el procesamiento edge fue aproximadamente 34 a 43 veces más rápido según el volumen. | 10 |
| Delimitar validación | Paráfrasis: el estudio evaluó arquitectura computacional, no validez ni utilidad clínica de los fenotipos. | 12 |

## Precauciones de uso

Los resultados proceden de prototipos y simulación controlada, no de uso clínico ni de DAYC-2 (pp. PDF 6-7, 12). No deben extrapolarse directamente sus cargas, sensores o latencias como umbrales de aceptación; sí pueden convertirse en hipótesis y métricas para experimentos propios.

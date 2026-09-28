---
id: S01
title: "An Electronic Data Capture Framework (ConnEDCt) for Global and Public Health Research: Design and Implementation"
year: 2020
doi: "10.2196/18580"
eje: "Arquitectura, sincronización y operación offline"
---

# S01 - An Electronic Data Capture Framework (ConnEDCt) for Global and Public Health Research: Design and Implementation

## Referencia APA 7

Ruth, C. J., Huey, S. L., Krisher, J. T., Fothergill, A., Gannon, B. M., Jones, C. E., Centeno-Tablante, E., Hackl, L. S., Colt, S., Finkelstein, J. L., & Mehta, S. (2020). An electronic data capture framework (ConnEDCt) for global and public health research: Design and implementation. *Journal of Medical Internet Research, 22*(8), e18580. https://doi.org/10.2196/18580

## Citas
- Parentética: (Ruth et al., 2020)
- Narrativa: Ruth et al. (2020)

## Objetivo

Describir la creación de un marco móvil reutilizable para protocolos clínicos complejos en estudios clínicos, de vigilancia y ensayos aleatorizados, con captura offline y sincronización posterior (p. PDF 1).

## Problema abordado

La conectividad lenta o no confiable hacía imprácticas las plataformas web, mientras los equipos distribuidos necesitaban seguridad, validación, acceso oportuno a datos y cumplimiento de protocolos longitudinales (pp. PDF 1-2).

## Metodología
- Diseño: Desarrollo e implementación de una plataforma EDC, refinada mediante uso de campo en estudios de distintos diseños (pp. PDF 1, 11-13).
- Contexto: Estudios clínicos, vigilancia comunitaria y ensayos aleatorizados en India y Ecuador (pp. PDF 1, 11-13).
- Muestra o fuentes: Cinco implementaciones descritas; la tabla de casos reporta 404 participantes, 345 díadas madre-infante, 1000 mujeres, 2404 hogares con 2876 mujeres y 407 niños, según el estudio (p. PDF 12).
- Procedimiento: Configuración del esquema y reglas, despliegue de bases cliente en iPads o portátiles, captura local y sincronización con servidor conectado a Internet (pp. PDF 4-5).

## Arquitectura y tecnología

ConnEDCt usa una base distribuida con base cliente, servidor de base de datos en la nube, motor de sincronización, dispositivos iOS y portátiles; fue construido con FileMaker Pro Advanced y MirrorSync (pp. PDF 4-5). La captura se realiza offline y la sincronización es asíncrona cuando vuelve la conectividad; puede limitarse a una dirección para reducir tráfico y exposición de datos (p. PDF 5). Incluye roles, reglas de negocio, validaciones y auditoría de modificaciones (pp. PDF 4-5, 15).

## Actores

Diseñadores de estudio, desarrolladores e integradores, gestores de datos, asistentes de investigación, coordinadores e investigadores principales operan con privilegios diferenciados (pp. PDF 4-5). Los participantes aportan datos y consentimiento; en algunos contextos intervienen varios usuarios y dispositivos durante una misma visita (pp. PDF 12-14).

## Datos y evidencias

La plataforma maneja resultados de laboratorio, mediciones de crecimiento, datos sociodemográficos, historia de salud, alimentación, exposiciones ambientales y muestras biológicas (pp. PDF 1, 12). La evaluación presentada es operativa y basada en casos de uso; no es un ensayo comparativo de rendimiento ni una validación clínica de DAYC-2 (pp. PDF 11-15).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Operación desconectada | Los datos se capturan localmente y se envían al servidor cuando existe conexión. | 5 |
| Sincronización en campo | Los casos emplearon sincronización continua, diaria o diaria/semanal según su flujo operativo. | 12 |
| Prevención de conflictos | En los ensayos se asignó un iPad por participante durante la visita y se sincronizó al finalizar la jornada. | 13 |
| Calidad y trazabilidad | Las validaciones permiten corregir datos en tiempo real y el rastro de auditoría registra cuándo y quién modificó datos. | 15 |

## Métricas e instrumentos

La publicación informa cantidades de participantes y frecuencias de sincronización por caso (p. PDF 12), pero no presenta latencia, tasa de conflictos, disponibilidad, tiempo de recuperación ni comparación estadística de arquitecturas. La calidad se apoya en comprobaciones lógicas, límites de valores, marcas temporales y rastro de auditoría (pp. PDF 14-15).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Para evitar conflictos en los ensayos, el flujo restringió cada visita de un participante a un iPad; por tanto, no valida edición offline concurrente del mismo registro. | 13 |
| Los errores comunes de implementación incluyeron usar el formulario equivocado o codificar mal variables. | 13 |
| La plataforma depende de FileMaker, una tecnología comercial, y algunas funciones nuevas requieren desarrollo especializado. | 4 |

## Aporte a la tesis
- Capítulo 1: Fundamenta el problema de capturar datos en lugares con conectividad intermitente sin volver al papel (pp. PDF 1-2).
- Capítulo 2: Aporta un antecedente de arquitectura cliente-servidor distribuida, base local, sincronización asíncrona, roles y auditoría (pp. PDF 4-5, 15).
- Capítulo 3: Sugiere para DAYC-2 persistencia local, cola de sincronización, reglas de validación y despliegue versionado del esquema; son decisiones derivadas, no componentes validados para DAYC-2 (pp. PDF 5, 7).
- Capítulo 4: Motiva ensayos de desconexión, reintento, concurrencia multi-actor y conflictos, porque el estudio evitó parte de esa concurrencia asignando un dispositivo por participante (p. PDF 13).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Justificar offline-first | Paráfrasis: la plataforma permite capturar en el móvil sin conexión y enviar después al servidor en la nube. | 5 |
| Describir arquitectura | Paráfrasis: los componentes principales son base cliente, servidor de base de datos, motor de sincronización, dispositivos iOS y portátiles. | 4 |
| Diseñar privacidad de sincronización | Paráfrasis: el transporte puede controlarse y operar en una sola dirección para reducir tráfico y mantener privacidad. | 5 |
| Diseñar pruebas de conflicto | Paráfrasis: se sincronizó al final del día y se asignó un iPad a cada participante durante la visita para evitar conflictos. | 13 |
| Exigir auditoría | Paráfrasis: el rastro de auditoría permite conocer cuándo se modificaron datos y quién lo hizo. | 15 |

## Precauciones de uso

Es una descripción de diseño e implementación con casos de campo, no una evaluación controlada de tolerancia a fallos. Su estrategia de dispositivo único reduce conflictos en vez de resolver edición concurrente general (p. PDF 13). Al ser anterior a 2021, debe emplearse principalmente como fundamento conceptual, y no atribuye validez clínica a DAYC-2.

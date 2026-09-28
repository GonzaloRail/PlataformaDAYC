---
id: S22
title: "Multimodal Technologies for Remote Assessment of Neurological and Mental Health"
year: 2024
doi: "10.1044/2024_JSLHR-24-00142"
eje: "Captura y gestión de evidencia multimodal"
---

# S22 - Multimodal Technologies for Remote Assessment of Neurological and Mental Health

## Referencia APA 7

Ramanarayanan, V. (2024). Multimodal technologies for remote assessment of neurological and mental health. *Journal of Speech, Language, and Hearing Research, 67*(11), 4233-4245. https://doi.org/10.1044/2024_JSLHR-24-00142

## Citas
- Parentética: (Ramanarayanan, 2024)
- Narrativa: Ramanarayanan (2024)

## Objetivo

Revisar fuentes de señal y modalidades de información para evaluación remota, explicar el valor de combinarlas y mostrar una implementación mediante la plataforma Modality (pp. PDF 1-3, 7-9).

## Problema abordado

Una sola señal ofrece una vista parcial y puede fallar por ruido o corrupción; la gestión multimodal debe distinguir el soporte capturado de la información derivada y afrontar heterogeneidad de dispositivos, entornos, acceso, privacidad y calidad (pp. PDF 2-3, 6, 9).

## Metodología
- Diseño: Artículo de revisión narrativa con estudio de caso descriptivo de una plataforma comercial (pp. PDF 1, 7-8).
- Contexto: Evaluaciones remotas activas o monitorización pasiva con dispositivos de consumo y sensores especializados (pp. PDF 1-3).
- Muestra o fuentes: Literatura previa sobre habla, lenguaje, diálogo, movimiento, mirada, cardiopulmonar y señales neurales; no genera un conjunto de datos propio (pp. PDF 1, 3-5, 9).
- Procedimiento: Organiza las modalidades por fuente de señal, discute cuatro ventajas de su combinación y describe tareas, controles de dispositivo y analítica de Modality (pp. PDF 3, 6-8).

## Arquitectura y tecnología

El artículo separa fuentes de señal -audio, video, texto y sensores- de modalidades de información como acústica, lenguaje, diálogo, movimiento, mirada, respiración, postura y señales cardiacas o neurales; una fuente puede originar varias modalidades (pp. PDF 2-3, 8). Modality usa un sistema de diálogo multimodal en nube y un agente virtual desde teléfono, tableta o computador con micrófono, altavoz y webcam; antes de capturar exige pruebas de cámara, micrófono y altavoz (p. PDF 7).

No describe sincronización temporal interna, formatos, almacenamiento, versionado o auditoría. Para DAYC-2, por tanto, aporta una taxonomía y controles de admisión de calidad, no una arquitectura completa de trazabilidad. La robustez multimodal permite continuar cuando una corriente falta o está dañada, pero la ausencia debe quedar visible al revisor y no ocultarse tras una fusión automática (p. PDF 6).

## Actores

Participante o paciente; clínico que recibe e interpreta reportes; cuidador y personal de ensayos como usuarios de información; agente virtual que guía tareas; módulos analíticos automatizados; proveedor empresarial de la plataforma (pp. PDF 1, 6-8). El caso descrito no incluye clínico en vivo durante la captura (p. PDF 7).

## Datos y evidencias

Audio, video, texto y sensores pueden capturarse de modo activo o pasivo. La captura pasiva aumenta volumen y exposición de privacidad; la activa se ejecuta en momentos definidos y con consentimiento para la evaluación (pp. PDF 3, 8). Entre los derivados se incluyen tiempos, calidad vocal, transcripción, rasgos léxicos, movimiento orofacial y corporal, mirada, reacción y respuestas autoinformadas (pp. PDF 7-8).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Taxonomía | Una fuente, como audio, puede producir información acústica, textual, conversacional y respiratoria. | 2-3 |
| Beneficios multimodales | La combinación se asocia con interpretabilidad, rendimiento, robustez y experiencia de usuario. | 1, 6-7 |
| Tolerancia a pérdida | Si una corriente falta o se corrompe, otra modalidad puede mantener funcional el sistema. | 6 |
| Admisión técnica | Modality comprueba altavoz, micrófono y cámara antes de iniciar para asegurar calidad suficiente. | 7 |
| Control de captura | La plataforma del caso realiza monitorización activa solo cuando el participante consiente la evaluación. | 8 |
| Brechas de despliegue | Persisten retos de robustez, diversidad, entorno, generalización, datos de entrenamiento, privacidad y acceso desigual. | 9 |

## Métricas e instrumentos

La revisión enumera señal/ruido, dB, Hz, tasas y duraciones del habla, pausas, tiempos de reacción, exactitud de recuerdo, recuentos léxicos, movimiento de labios y mandíbula, parpadeos, sacadas y fijaciones (p. PDF 8). No aplica una evaluación sistemática de calidad de estudios ni reporta una métrica propia de sincronización, completitud o revisión humana (pp. PDF 1, 9).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Revisión narrativa centrada en comunicación y movimiento; excluye imagen médica, genómica, biomarcadores sanguíneos y EHR. | 3 |
| No presenta datos nuevos; remite a resultados de publicaciones previas. | 9 |
| Sensores especializados son menos accesibles y más costosos que dispositivos de consumo. | 3 |
| La captura pasiva genera grandes volúmenes y riesgos de privacidad. | 3 |
| La heterogeneidad, el entorno, la diversidad y la calidad de entrenamiento limitan robustez y generalización. | 9 |
| El autor declara empleo y participación accionaria en Modality.AI. | 1 |

## Aporte a la tesis
- Capítulo 1: Fundamenta la diferencia entre archivo capturado y modalidad informativa derivada, clave para evitar tratar “video” como una única evidencia (pp. PDF 2-3).
- Capítulo 2: Aporta las dimensiones de complementariedad, redundancia y tolerancia a fallos para una arquitectura multimodal (p. PDF 6).
- Capítulo 3: Sugiere controles previos por dispositivo, captura activa por defecto, estado explícito por corriente y separación trazable entre original y características derivadas (pp. PDF 6-8).
- Capítulo 4: Orienta pruebas de calidad por fuente, degradación cuando falta una modalidad, usabilidad y capacidad del revisor para interpretar qué señal sustenta cada resultado (pp. PDF 6-9).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Modelo de datos | Paráfrasis: audio, video, texto y sensores son fuentes; habla, lenguaje, movimiento o respiración son modalidades derivadas. | 2 |
| Calidad previa | Paráfrasis: la evaluación solo comienza cuando altavoz, micrófono y cámara superan sus pruebas. | 7 |
| Resiliencia | Paráfrasis: la redundancia multimodal permite operar aunque una corriente esté ausente, corrupta o no sea fiable. | 6 |
| Privacidad | Paráfrasis: el monitoreo pasivo implica análisis de gran volumen y consentimiento para seguimiento continuo. | 3 |
| Límites reales | Paráfrasis: entorno, diversidad, comorbilidad, calidad de datos y acceso socioeconómico siguen condicionando el despliegue. | 9 |

## Precauciones de uso

El texto promueve evaluación automatizada y describe una plataforma vinculada comercialmente al autor; no valida DAYC-2 ni detalla una cadena de custodia. Sus afirmaciones sobre rendimiento proceden de trabajos citados, no de una comparación propia. Debe usarse para taxonomía, calidad y resiliencia, manteniendo revisión profesional y sin convertir rasgos multimodales en diagnóstico por IA (pp. PDF 1, 8-9).

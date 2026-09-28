---
id: S40
title: "Evaluating Users’ Experiences of a Child Multimodal Wearable Device: Mixed Methods Approach"
year: 2024
doi: "10.2196/49316"
eje: "Ética y protección de datos infantiles"
---

# S40 - Evaluating Users’ Experiences of a Child Multimodal Wearable Device: Mixed Methods Approach

## Referencia APA 7

McElwain, N. L., Fisher, M. C., Nebeker, C., Bodway, J. M., Islam, B., & Hasegawa-Johnson, M. (2024). Evaluating users' experiences of a child multimodal wearable device: Mixed methods approach. *JMIR Human Factors, 11*(1), e49316. https://doi.org/10.2196/49316

## Citas
- Parentética: (McElwain et al., 2024)
- Narrativa: McElwain et al. (2024)

## Objetivo

Evaluar con métodos mixtos la experiencia de padres y niños al usar en el hogar LittleBeats, un dispositivo infantil que integra audio, electrocardiograma y movimiento, considerando acceso y usabilidad, privacidad, riesgos y beneficios (pp. PDF 1-2).

## Problema abordado

Los vestibles permiten captura continua y poco intrusiva en ambientes naturales, pero existen pocos estudios sobre cómo las familias experimentan su uso, especialmente ante audio doméstico de alta fidelidad, terceros grabados, comodidad física, carga de participación y expectativas sobre resultados (pp. PDF 1-3, 7-9).

## Metodología
- Diseño: Dos estudios de métodos mixtos guiados por el Digital Health Checklist: entrevistas semiestructuradas con análisis temático y cuestionario de experiencia con análisis descriptivo y pruebas *t* de una muestra (pp. PDF 2-3, 5-6, 10).
- Contexto: Uso remoto de LittleBeats en hogares de una ciudad del Medio Oeste de Estados Unidos; kits enviados o entregados y preparación mediante Zoom (pp. PDF 3-4, 10).
- Muestra o fuentes: Estudio 1: entrevistas a 42 padres de 43 niños de 1,1 meses a 9,5 años tras dos grabaciones de aproximadamente 8 horas por día. Estudio 2: 110 padres de niños de 2 a 65 meses tras tres días de grabación (pp. PDF 3-4, 10).
- Procedimiento: El dispositivo recogió simultáneamente ECG, movimiento y audio; los padres instalaron camiseta, electrodos y equipo, controlaron inicio y parada y respondieron entrevistas o cinco ítems en escala de 1 a 5 más comentarios abiertos (pp. PDF 4-5, 10).

## Arquitectura y tecnología

LittleBeats integra micrófono, ECG de tres derivaciones y sensor inercial en una carcasa colocada en una camiseta infantil; sincroniza las tres modalidades y guarda los datos localmente en microSD, sin transferencia inalámbrica o Bluetooth (pp. PDF 2, 4-5). Los archivos se marcan con identificadores y solo el personal puede convertirlos a formatos legibles mediante un *pipeline* específico; algoritmos de aprendizaje automático procesan audio y el personal escucha únicamente fragmentos para control de calidad, interrumpiendo la escucha si aparece información personal (p. PDF 5).

Para la tesis, esto sugiere requisitos de software: indicador inequívoco de grabación, batería y duración; pausa inmediata; selección de modalidades; almacenamiento local cifrado o protegido antes de transferencia; identificadores seudónimos; permisos por rol; política explícita sobre acceso humano; eliminación parcial o total; y explicación visual del flujo captura-procesamiento-uso. Son recomendaciones técnicas derivadas de la experiencia reportada, no obligaciones legales afirmadas por el artículo (pp. PDF 5, 7-8, 11-12).

## Actores

Niño que viste el dispositivo; madre, padre o cuidador que instala y controla la captura; otros adultos, hermanos, familiares, cuidadores y transeúntes potencialmente grabados; coordinadores e investigadores; personal autorizado y algoritmos que procesan audio (pp. PDF 4-5, 8, 12). El estudio no entrevistó directamente a los niños (pp. PDF 2, 13).

## Datos y evidencias

Se capturaron audio doméstico, ECG y movimiento sincronizados durante actividades cotidianas (pp. PDF 2, 4). La plataforma no compartía datos fuera del equipo, no los integraba con otros sistemas y no los transfería por radio (p. PDF 5). Los adultos presentes debían consentir; ante una persona no consentidora se indicó apagar el dispositivo (p. PDF 4). Los padres podían pausar y solicitar destrucción parcial o total de grabaciones (p. PDF 5).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Claridad de instrucciones | En el estudio 2, la media fue 1,21 (DE 0,41) en una escala donde 1 era “totalmente de acuerdo”; difirió del punto neutral, *t*(109) = -45,98, *p* < .001. | 10 |
| Comodidad de instalación | Media 1,42 (DE 0,75), *t*(109) = -22,22, *p* < .001. | 10 |
| Seguridad percibida | Media 1,33 (DE 0,51), *t*(109) = -34,48, *p* < .001. | 10 |
| Privacidad del audio | La preocupación por ser grabado obtuvo media 3,62 (DE 1,06), *t*(108) = 6,14, *p* < .001, indicando mayor desacuerdo que neutralidad; las opiniones cualitativas fueron variadas. | 10-12 |
| Carga | La dificultad de completar tres días obtuvo media 2,98 (DE 1,17) y no difirió de neutral, *t*(109) = -0,16, *p* = .87. | 10 |
| Experiencia familiar | Se valoraron comodidad remota, facilidad y disfrute, pero también hubo cambios de rutina, dificultad con electrodos, incomodidad y demanda de indicadores de batería y tiempo. | 6-9, 11-13 |

## Métricas e instrumentos

Digital Health Checklist con dominios de acceso/usabilidad, privacidad, gestión de datos y riesgos/beneficios (pp. PDF 2-3); entrevista semiestructurada de 11 preguntas y análisis temático, cuya codificación alcanzó κ de Cohen = 0,967 en ocho transcripciones seleccionadas aleatoriamente (pp. PDF 5-6); cuestionario de cinco ítems con escala de 1 a 5, estadísticas descriptivas y pruebas *t* bilaterales contra el punto neutral 3 (p. PDF 10).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| No se preguntó directamente a los niños mayores; la experiencia infantil provino de reportes parentales y debería complementarse con observación e entrevistas. | 13 |
| Los subgrupos por etapa del desarrollo fueron pequeños, lo que limita el análisis de diferencias por edad. | 13 |
| Ambas muestras tenían alto nivel educativo; se requieren familias sociodemográficamente más diversas. | 13 |
| El consentimiento parental se trató en otro trabajo y no fue objeto de esta evaluación de experiencia. | 2 |

## Aporte a la tesis
- Capítulo 1: Evidencia que una solución multimodal infantil debe equilibrar riqueza ecológica con privacidad doméstica, comodidad, carga, comprensión y aceptación familiar (pp. PDF 1-3, 11-13).
- Capítulo 2: Aporta una evaluación sociotécnica organizada en usabilidad, privacidad, gestión de datos y riesgos/beneficios, sin aportar validez clínica a DAYC-2 (pp. PDF 2-3).
- Capítulo 3: Sugiere indicadores de grabación, batería y duración; pausa y destrucción granular; consentimiento de terceros; minimización de acceso humano al audio; seudonimización; procesamiento local cuando sea viable; y explicaciones accesibles del *pipeline*. No se presentan como mandatos legales (pp. PDF 4-5, 8, 11-12).
- Capítulo 4: Proporciona dimensiones y métricas para pruebas con familias: claridad, facilidad de instalación, seguridad, privacidad, carga, comodidad infantil, cambios de rutina, disfrute y comprensión del uso de datos (pp. PDF 6-13).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Control y retiro | Paráfrasis: los padres podían pausar en cualquier momento y pedir la destrucción parcial o completa de sus grabaciones. | 5 |
| Privacidad por diseño | Paráfrasis: los datos se guardaban en microSD y solo el equipo podía convertir los archivos a una forma legible mediante el *pipeline* de LittleBeats. | 5 |
| Experiencia familiar | Paráfrasis: grabar en casa y según el horario familiar evitó desplazamientos, aunque las sesiones de más de 8 horas por día resultaron factibles pero difíciles para algunas familias. | 6 |
| Privacidad de terceros | Paráfrasis: algunas familias evitaron interacciones o tuvieron dificultad para recordar apagar el dispositivo ante personas no consentidoras. | 8 |
| Riesgo y beneficio | Paráfrasis: hubo molestias al retirar electrodos y preocupaciones durante siestas; también se reportaron disfrute, tiempo familiar y satisfacción por contribuir. | 9, 13 |
| Mejora de diseño | Paráfrasis: los autores recomiendan mostrar tiempo acumulado, batería y estado de grabación, integrar mejor los cables y flexibilizar la duración diaria. | 11-12 |

## Precauciones de uso

LittleBeats era un dispositivo de investigación no aprobado por la FDA y el artículo evalúa experiencia de uso, no eficacia diagnóstica ni DAYC-2 (p. PDF 2). La muestra fue mayoritariamente blanca, altamente educada y compuesta casi por completo por madres, por lo que las percepciones no deben generalizarse sin validación adicional (pp. PDF 4, 10, 13). La baja preocupación media no elimina los relatos de privacidad, ni justifica captura continua por defecto. La experiencia infantil fue indirecta; el asentimiento continuo debe complementarse con evidencia específica como S39.

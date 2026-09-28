---
id: S18
title: "Bringing the Laboratory Home: PANDABox Telehealth-Based Assessment of Neurodevelopmental Risk in Children"
year: 2020
doi: "10.3389/fpsyg.2020.01634"
eje: "Captura y gestión de evidencia multimodal"
---

# S18 - Bringing the Laboratory Home: PANDABox Telehealth-Based Assessment of Neurodevelopmental Risk in Children

## Referencia APA 7

Kelleher, B. L., Halligan, T., Witthuhn, N., Neo, W. S., Hamrick, L., & Abbeduto, L. (2020). Bringing the laboratory home: PANDABox telehealth-based assessment of neurodevelopmental risk in children. *Frontiers in Psychology, 11*, Article 1634. https://doi.org/10.3389/fpsyg.2020.01634

## Citas
- Parentética: (Kelleher et al., 2020)
- Narrativa: Kelleher et al. (2020)

## Objetivo

Desarrollar y probar preliminarmente PANDABox, un protocolo modular de teleevaluación domiciliaria facilitada por cuidadores para recoger e integrar datos clínicos, conductuales y fisiológicos, valorando logística y coste, fidelidad y satisfacción del cuidador, participación infantil y calidad de datos (pp. PDF 1, 3).

## Problema abordado

Las plataformas comerciales permiten entrevistas y video, pero no suelen producir señales fisiológicas crudas con precisión temporal suficiente para alinearlas con estímulos y conducta; la evaluación remota integrada exige control de calidad, sincronización y procesamiento comparables a un laboratorio (p. PDF 2).

## Metodología
- Diseño: Estudio piloto descriptivo precedido por desarrollo iterativo y pruebas beta presenciales y remotas simuladas (pp. PDF 3-4, 8).
- Contexto: Sesiones en hogares de Estados Unidos con apoyo remoto en vivo desde un laboratorio central (pp. PDF 3-5, 7).
- Muestra o fuentes: 16 lactantes con síndrome de Down de 5-19 meses y sus madres biológicas; se exigió conexión de internet de alta velocidad y la muestra fue mayoritariamente blanca, acomodada y con educación superior (p. PDF 4).
- Procedimiento: El examinador controló remotamente estímulos y grabación, guio al cuidador por teléfono y TeamViewer, y luego asistentes entrenados codificaron video y procesaron y alinearon las señales fuera de línea (pp. PDF 5-7).

## Arquitectura y tecnología

El kit incluía una Surface Go, webcam Logitech C525 HD, dos grabadores LENA y dos monitores Actiwave Cardio; TeamViewer aportaba videoconferencia, control remoto, cifrado de 256 bits y autenticación de dos factores, mientras el teléfono mantenía un canal de continuidad ante fallos (pp. PDF 4-5, 7). Las modalidades fueron video conductual, audio/vocalizaciones con marcas temporales, ECG/intervalos interlatido y registros clínicos y de fidelidad (pp. PDF 6-7).

La sincronización fue posterior: ELAN marcó inicio y fin de tareas y la hora de la Surface mostrada en el video; scripts en SAS y R alinearon y segmentaron las corrientes por tarea. El ECG se inspeccionó visualmente, dividió en tramos, marcó manualmente, verificó, fusionó y corrigió por artefactos (p. PDF 7). Para DAYC-2, el patrón transferible es conservar originales, marcas de evento, identidad de tarea, reloj de referencia, transformaciones y estado de calidad antes de presentar evidencia al profesional, no automatizar el diagnóstico (pp. PDF 7, 12).

## Actores

Niño evaluado; cuidador que instala dispositivos y ejecuta actividades; examinador remoto que presenta estímulos, da instrucciones y resuelve fallos; asistentes entrenados que codifican y verifican; codificador de consenso; equipos de investigación autorizados para compartir protocolos y datos compatibles (pp. PDF 5-7, 12-13).

## Datos y evidencias

Se conservaron video de conducta, audio LENA y eventos vocales, ECG e IBI, códigos de tareas, fidelidad de administración, participación infantil y encuestas. Dos codificadores independientes revisaron los videos y un tercero resolvió desacuerdos; la segmentación temporal vinculó cada evidencia con su tarea (pp. PDF 6-7). Las pérdidas se distinguieron por modalidad y causa, incluyendo fuera de cuadro o desenfoque, transferencia, programación del sensor, ruido y conducta insuficiente para codificar (pp. PDF 8-9, 12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Fidelidad del cuidador | El 94% de las tareas codificadas fue ideal o suficiente; 86% ideal, 8% suficiente y 2% pobre. | 8 |
| Participación y video | Se codificó el 97% de los fotogramas y los niños estuvieron involucrados en el 91% de los datos codificados. | 9 |
| Pérdida por modalidad | Video 3%, LENA 6%, ECG 25% totalmente ausente y 13% parcialmente ausente, y presiones conductuales discretas 27%. | 12 |
| Calidad de ECG utilizable | Hubo ECG para 12 de 16 participantes; menos del 0,29% del IBI por participante requirió edición. | 9 |
| Revisión entre evaluadores | La fidelidad alcanzó 93% de acuerdo y Gwet AC1 = 0,93; la participación, 83% y AC1 = 0,78. | 6-7 |
| Satisfacción | El 97% de respuestas de la encuesta posterior fue “bueno” o “excelente”; respondieron 10 de 14 cuidadores contactados. | 8 |

## Métricas e instrumentos

VABS-3, encuestas previa y posterior, fidelidad sobre 13 indicaciones, códigos de conducta 0-2/8/9, participación codificada cada 5 s, acuerdo porcentual y Gwet AC1, LENA, ECG a 1024 Hz e IBI (pp. PDF 4-7). La frecuencia podía reducirse a 512 o 256 Hz para ampliar la grabación continua, pero el estudio utilizó 1024 Hz (p. PDF 7).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Piloto descriptivo de 16 niños, sin comparación directa con administración de laboratorio ni validación clínica de resultados. | 8, 11, 13 |
| Muestra poco diversa, mayoritariamente blanca, acomodada, educada y angloparlante con internet rápido. | 4, 12 |
| Las modalidades técnicamente más exigentes tuvieron más pérdida, incluida programación incorrecta por cambio de horario. | 9, 12 |
| Una conducta insuficiente y los ángulos de cámara impidieron codificar parte de las presiones discretas. | 8, 12 |
| La conducta en una batería estructurada no equivale a conducta cotidiana; las vocalizaciones fueron más de dos veces las del registro diario. | 11 |

## Aporte a la tesis
- Capítulo 1: Sustenta el problema de integrar evidencia remota heterogénea con precisión temporal, control de calidad y participación del cuidador (pp. PDF 1-3).
- Capítulo 2: Aporta un flujo multimodal con originales, eventos, segmentación por tarea, codificación humana, consenso y causas explícitas de pérdida (pp. PDF 6-7, 12).
- Capítulo 3: Orienta a registrar reloj de referencia, inicio/fin, dispositivo, modalidad, versión de tarea, operador, transformaciones, artefactos y estado codificable; el uso de GUID y el registro de modificaciones apoyan trazabilidad entre sitios (p. PDF 12).
- Capítulo 4: Ofrece métricas de completitud por modalidad, fidelidad, participación, acuerdo entre revisores, satisfacción y proporción de señal corregida para validar el pipeline DAYC-2 (pp. PDF 6-9, 12).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Sincronización | Paráfrasis: ELAN marcó límites de tareas y la hora visible del computador; SAS y R alinearon y segmentaron las corrientes. | 7 |
| Revisión humana | Paráfrasis: cada video fue codificado por dos evaluadores y los desacuerdos se resolvieron mediante consenso adicional. | 6 |
| Calidad por modalidad | Paráfrasis: la pérdida fue baja en video y LENA, pero mayor en ECG y presiones discretas por mayores demandas técnicas. | 12 |
| Proveniencia de protocolo | Paráfrasis: se propuso registrar proyectos, tareas nuevas y modificaciones para archivar la evolución de la batería. | 12 |
| Interpretación contextual | Paráfrasis: la fidelidad de administración puede contextualizar la variabilidad de las señales de un participante. | 11 |

## Precauciones de uso

Es evidencia fundacional de 2020 sobre factibilidad investigativa, no una validación de DAYC-2 ni autorización para diagnóstico automático. Los códigos de autismo y resultados en síndrome de Down no deben convertirse en criterios, umbrales o inferencias clínicas para DAYC-2; el aporte pertinente es la gestión revisable de evidencia y sus pérdidas (pp. PDF 6, 12-13).

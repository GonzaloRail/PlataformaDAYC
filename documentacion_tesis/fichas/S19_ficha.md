---
id: S19
title: "Tandem: At-Home Behavior Assessment Using Multimodal Signals from the Parent-Child Dyad"
year: 2025
doi: "10.1145/3770705"
eje: "Captura y gestión de evidencia multimodal"
---

# S19 - Tandem: At-Home Behavior Assessment Using Multimodal Signals from the Parent-Child Dyad

## Referencia APA 7

Kalanadhabhatta, M., Rahman, T., Grabell, A. S., & Ganesan, D. (2025). Tandem: At-home behavior assessment using multimodal signals from the parent-child dyad. *Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, 9*(4), Article 182, 1-25. https://doi.org/10.1145/3770705

## Citas
- Parentética: (Kalanadhabhatta et al., 2025)
- Narrativa: Kalanadhabhatta et al. (2025)

## Objetivo

Evaluar la factibilidad de trasladar al hogar una observación estructurada de juego padre-hijo y extraer de audio y fisiología indicadores individuales y diádicos, comparando modalidades, fases y costes de privacidad y despliegue (pp. PDF 2-3).

## Problema abordado

La observación domiciliaria requiere provocar contextos comparables, representar la dinámica temporal entre actores y equilibrar riqueza del audio con privacidad. Las señales de una persona por separado pueden perder la interacción, y dos vestibles aumentan coste y complejidad (pp. PDF 2-3, 14, 19-20).

## Metodología
- Diseño: Estudio domiciliario de factibilidad con procesamiento automatizado y modelos evaluados mediante validación cruzada repetida fuera de muestra (pp. PDF 5-12).
- Contexto: Sesión estructurada de juego de 25 minutos en el hogar, guiada por una aplicación móvil (pp. PDF 5-6).
- Muestra o fuentes: 34 díadas, 68 participantes; niños de 3-5 años, principalmente blancos y sin diagnóstico de retraso o discapacidad intelectual; el análisis predictivo usó 32 díadas por dos BASC-3 incompletos (pp. PDF 5, 7).
- Procedimiento: Diez minutos de juego dirigido por el niño, diez por el adulto y cinco de limpieza; audio continuo desde teléfono, Empatica EmbracePlus en ambas muñecas y reporte parental BASC-3 (pp. PDF 6-7).

## Arquitectura y tecnología

La aplicación Flutter funcionó en Android e iOS y grabó audio de dos canales a 44,1 kHz y 128 Kbps; cada actor usó un EmbracePlus para frecuencia cardiaca, respiración, actividad electrodérmica y temperatura cutánea, colocándolo cinco minutos antes para línea base (pp. PDF 5-6). Los límites de las tres fases proporcionaron el eje temporal común: el audio se recortó por fase, se redujo a 16 kHz, se transcribió con Whisper, se alineó forzadamente con NeMo y se diarizó padre/niño; las señales fisiológicas de ambos actores se limpiaron, alinearon y resumieron por fase y sesión (pp. PDF 8, 10-11).

El procesamiento preserva distinciones útiles para DAYC-2: dato crudo, segmento de tarea, actor, salida derivada, métrica de calidad y modelo. No obstante, Tandem dirige esas derivaciones a clasificación automática; la tesis debe reutilizar solo el patrón de evidencia sincronizada y revisión profesional, no su función diagnóstica (pp. PDF 10-12, 20).

## Actores

Niño y padre, madre o cuidador como díada observada; progenitor que descarga la aplicación, coloca dispositivos, dirige fases, revisa el audio antes de subirlo y completa BASC-3; investigadores que procesan y validan; proveedor clínico que, según los autores, debe permanecer en el circuito de interpretación (pp. PDF 5-7, 20).

## Datos y evidencias

Audio doméstico, transcripción alineada, etiqueta de hablante, actos DPICS, transiciones conversacionales, HR/HRV/RSA, EDA, sincronía fisiológica, fase de juego, frustración parental y puntuaciones BASC-3 (pp. PDF 6-11). El participante pudo revisar el audio antes de decidir su carga; los tramos EDA breves se interpolaron y los largos se descartaron, y se documentó la falta de características por calidad insuficiente (pp. PDF 6, 10-11).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Calidad del pipeline de audio | En tres clips validados: DER 30,1%, error de palabra 11,8% y BERTScore F1 = 0,97. | 8 |
| Clasificación de actos de habla | Exactitud de 0,77 para ocho clases parentales y 0,91 para cuatro clases infantiles. | 9 |
| Pérdida fisiológica | Faltaron características EDA de alguna fase en 10/68 participantes y sincronía fisiológica en 5/34 díadas. | 11 |
| Comparación modal | F1 = 0,87 con dinámica de audio, 0,91 con sincronía fisiológica y 0,92 al combinar audio con fisiología de ambos actores. | 13-15 |
| Segmentación por actividad | La fase de limpieza de 5 minutos alcanzó F1 = 0,87 con audio y 0,92 multimodal; debe validarse como tarea aislada. | 16-17 |
| Supervisión profesional | Los autores exigen que la evaluación sensorial complemente, no sustituya, el juicio profesional. | 20 |

## Métricas e instrumentos

BASC-3 parental; tasa de error de diarización, tasa de error de palabra, BERTScore, exactitud de DPICS, F1, exactitud y exactitud balanceada; HR, HRV, RSA, nivel y respuestas de conductancia; correlación, correlación cruzada y *dynamic time warping* para sincronía (pp. PDF 7-13). La evaluación usó AutoGluon con cinco repeticiones y cinco pliegues, manteniendo las díadas separadas entre entrenamiento y validación (p. PDF 12).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Muestra pequeña, estadounidense y predominantemente blanca, con generalización cultural y socioeconómica limitada. | 5, 20 |
| Dos BASC-3 incompletos redujeron el análisis a 32 díadas. | 7 |
| La calidad fisiológica produjo características faltantes y el despliegue diádico exige dos dispositivos. | 11, 14 |
| La mejora multimodal de 0,92 frente a 0,91 no pudo probarse como significativa. | 15 |
| La fase breve de limpieza ocurrió después de 20 minutos de juego y no está validada de forma autónoma. | 16-17 |
| La clasificación binaria no representa la complejidad multidimensional ni el contexto de interacción. | 20 |

## Aporte a la tesis
- Capítulo 1: Muestra por qué una evidencia multi-actor necesita identidad de actor, contexto de tarea y tiempo, además de modalidad (pp. PDF 2-3, 10-11).
- Capítulo 2: Aporta un pipeline explícito de segmentación, transcripción, alineación, diarización, limpieza, derivación y medición de pérdida (pp. PDF 8-11).
- Capítulo 3: Sugiere asociar cada archivo y derivado con díada, actor, fase, reloj, algoritmo y versión, calidad, permiso de carga y enlace al original; la revisión del audio antes de subirlo aporta control al cuidador (p. PDF 6).
- Capítulo 4: Permite probar DAYC-2 con métricas de sincronía técnica, completitud por fase, error de procesamiento, disponibilidad por modalidad y carga de uno frente a dos dispositivos, sin evaluar diagnóstico por IA (pp. PDF 8, 11, 14-17).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Control familiar | Paráfrasis: los padres podían revisar el audio y decidir después si lo cargaban al servidor seguro. | 6 |
| Segmentación temporal | Paráfrasis: el audio se separó en tres clips correspondientes a las fases, eliminando las instrucciones de la aplicación. | 8 |
| Calidad y pérdida | Paráfrasis: los tramos EDA menores de 15 s se interpolaron y los más largos se descartaron. | 10 |
| Sincronía multi-actor | Paráfrasis: IBI, RSA y EDA de padre e hijo se alinearon y compararon mediante correlación, desfases y DTW. | 11 |
| Revisión profesional | Paráfrasis: el proveedor clínico debe permanecer en el circuito y contextualizar el resultado para la familia. | 20 |

## Precauciones de uso

El estudio predice riesgo BASC-3 mediante aprendizaje automático; esos resultados no validan DAYC-2 ni justifican diagnóstico automático. Las cifras de F1 provienen de una muestra pequeña y de validación interna. Para la tesis solo sustentan decisiones de captura, sincronización, control de calidad, privacidad y presentación de evidencia al profesional (pp. PDF 12, 15, 20).

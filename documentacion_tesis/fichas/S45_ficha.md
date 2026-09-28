---
id: S45
title: "Video-Based Automatic Baby Motion Analysis for Early Neurological Disorder Diagnosis: State of the Art and Future Directions"
year: 2022
doi: "10.3390/s22030866"
eje: "Captura y gestión de evidencia multimodal"
---

# S45 - Video-Based Automatic Baby Motion Analysis for Early Neurological Disorder Diagnosis: State of the Art and Future Directions

## Referencia APA 7

Leo, M., Bernava, G. M., Carcagnì, P., & Distante, C. (2022). Video-based automatic baby motion analysis for early neurological disorder diagnosis: State of the art and future directions. *Sensors, 22*(3), 866. https://doi.org/10.3390/s22030866

## Citas
- Parentética: (Leo et al., 2022)
- Narrativa: Leo et al. (2022)

## Objetivo

Revisar herramientas de adquisición, conjuntos de datos y métodos de visión y aprendizaje automático para analizar movimiento infantil en video, organizándolos por edad y señalando direcciones futuras (pp. PDF 1, 3).

## Problema abordado

Los sensores de contacto tienen alta resolución temporal, pero pueden modificar la conducta y ofrecen escasa información espacial; el video sin marcadores reduce intervención, aunque exige cómputo, anotación experta y tratamiento de oclusión, iluminación, movimiento de cámara, privacidad y escasez de datos (pp. PDF 1-5, 12, 15).

## Metodología
- Diseño: Revisión del estado del arte y exploración metodológica, no revisión sistemática con protocolo de búsqueda reproducible informado (pp. PDF 3, 7, 18).
- Contexto: Hospital, UCI neonatal, hogar y centros de rehabilitación, con condiciones desde cuna controlada hasta movimiento libre con adultos y objetos (p. PDF 3).
- Muestra o fuentes: Veinte trabajos de evaluación de movimiento: siete en recién nacidos, siete en lactantes y seis en niños pequeños, además de herramientas y conjuntos públicos (p. PDF 7).
- Procedimiento: Taxonomía por edad y comparación de dispositivos, entradas, tareas computacionales, etiquetado y objetivos clínicos (pp. PDF 3-13).

## Arquitectura y tecnología

Las fuentes incluyen RGB, profundidad, audio y, en algunos conjuntos, sensores fisiológicos; las cámaras pueden ser fijas, de mano o teléfonos, con o sin marcadores (pp. PDF 1-3). Los pipelines revisados cubren captura segura, almacenamiento, anotación, pose, rasgos de movimiento, modelado temporal y visualización; AVIM permite notas y edición audio/video, y MOVIDEA combina cámara superior con selección manual y seguimiento cuadro a cuadro (p. PDF 4).

La revisión no ofrece una arquitectura propia de sincronización o proveniencia. MMDB es un ejemplo multifuente sincronizado con cámaras, micrófonos, EDA y acelerometría, mientras varios sistemas domésticos sufren oclusión, iluminación variable y cámara inestable (pp. PDF 6, 12). Para DAYC-2, la salida automática debe conservar referencia al intervalo y fotogramas originales y permitir revisión, no reducir el video a una etiqueta diagnóstica (pp. PDF 11, 17-18).

## Actores

Niño observado; padre o cuidador que graba en casa; personal de salud o investigador que configura captura; expertos y fisioterapeutas que anotan o califican; operador de GUI que selecciona regiones; algoritmos que siguen pose o acciones; profesional que revisa visualizaciones y resultados (pp. PDF 4-6, 10-12, 17).

## Datos y evidencias

Video RGB/RGB-D, audio, puntos articulares 2D/3D, esqueletos, trayectorias, flujo óptico, segmentos temporales, acciones y anotaciones expertas; algunos conjuntos omiten video y publican estados derivados por privacidad (pp. PDF 4-7). La variación entre cámara, edad, postura y entorno debe registrarse como contexto de calidad, y las salidas deben enlazarse con los fotogramas que las originan (pp. PDF 3, 11-12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Panorama de estudios | Se encontraron 20 trabajos: 7 de recién nacidos, 7 de lactantes y 6 de niños pequeños. | 7 |
| Preferencia de captura | Los enfoques sin marcadores son más fáciles de instalar y menos intrusivos, pero computacionalmente complejos. | 1-2 |
| Evidencia sincronizada disponible | MMDB contiene 160 sesiones de 5 minutos de 121 niños de 15-30 meses con video, audio, EDA y acelerometría sincronizados. | 6 |
| Condiciones domésticas | En niños pequeños predominan hogar y movimiento libre, con oclusiones, iluminación variable y adultos u objetos en escena. | 3, 7, 12 |
| Fragilidad de datos | Un pipeline doméstico con 141 videos alcanzó 78% de exactitud y se vio limitado por muestra pequeña y cámara temblorosa. | 12 |
| Necesidad de explicabilidad | Visualización, estimación de incertidumbre y transparencia son necesarias ante el coste de errores médicos. | 17 |

## Métricas e instrumentos

Resolución y FPS, número y duración de videos, articulaciones anotadas, error o exactitud de pose, F1 y exactitud de clasificación, sensibilidad/especificidad de instrumentos clínicos citados y acuerdo de evaluadores (pp. PDF 2, 4-7, 9-13, 17). El artículo no agrega métricas mediante metaanálisis ni evalúa precisión de sincronización o pérdida de archivos (pp. PDF 6-7, 18).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Escasean bases públicas por privacidad y restricciones éticas, dificultando modelos robustos. | 5 |
| Hogares introducen oclusión, iluminación cambiante, posturas libres y cámara inestable. | 3, 12 |
| Modelos preentrenados en adultos se transfieren peor a lactantes en posición supina. | 7 |
| La anotación temporal infantil es costosa y hay pocos datos etiquetados. | 15 |
| La pose cae con imágenes corruptas y las acciones infantiles sutiles desafían generalización y mundo abierto. | 14-16 |
| No presenta protocolo sistemático reproducible ni validación de una plataforma propia. | 3, 18 |

## Aporte a la tesis
- Capítulo 1: Fundamenta que la calidad del video infantil depende de edad, postura, entorno, vista, oclusión y operador (pp. PDF 2-3).
- Capítulo 2: Aporta categorías para el ciclo de evidencia: captura, almacenamiento privado, anotación, extracción espacial, modelado temporal, resultado y visualización (pp. PDF 4, 14-18).
- Capítulo 3: Sugiere metadatos de cámara, resolución, FPS, orientación, entorno, actor, intervalo, versión de anotación y enlace original-derivado; no aporta un estándar implementado (pp. PDF 3-7).
- Capítulo 4: Orienta pruebas con degradación, oclusión, cámara móvil, vistas faltantes, revisión de segmentos y explicación visual, evitando medir éxito solo por clasificación (pp. PDF 12, 14-17).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Cadena de evidencia | Paráfrasis: el diseño comienza con dispositivos, recolección y almacenamiento privados, y anotación experta. | 4 |
| Revisión sobre original | Paráfrasis: AVIM permite notas durante grabación y reproducir, cortar, copiar y evaluar secuencias de interés. | 4 |
| Pérdida por privacidad | Paráfrasis: MIA publica estados de movimiento y marcas temporales, pero no video por privacidad. | 5 |
| Contexto multifuente | Paráfrasis: MMDB sincroniza múltiples vistas, micrófonos, EDA y acelerometría de adulto y niño. | 6 |
| Interpretabilidad | Paráfrasis: un sistema revisado superpone al video la predicción para que el evaluador pueda interpretarla. | 11 |
| Incertidumbre | Paráfrasis: transparencia, visualización e incertidumbre son esenciales porque un error médico puede ser costoso. | 17 |

## Precauciones de uso

La revisión está orientada a diagnóstico automático de trastornos, pero esos objetivos y rendimientos no se trasladan a DAYC-2. Muchos resultados proceden de conjuntos pequeños, sintéticos, públicos o grabados sin control. En la tesis debe citarse para justificar gestión, calidad y revisión de video, no para afirmar capacidad diagnóstica por IA (pp. PDF 5-7, 9-12, 17-18).

---
id: S44
title: "EgoActive: Integrated Wireless Wearable Sensors for Capturing Infant Egocentric Auditory–Visual Statistics and Autonomic Nervous System Function ‘in the Wild’"
year: 2023
doi: "10.3390/s23187930"
eje: "Captura y gestión de evidencia multimodal"
---

# S44 - EgoActive: Integrated Wireless Wearable Sensors for Capturing Infant Egocentric Auditory–Visual Statistics and Autonomic Nervous System Function ‘in the Wild’

## Referencia APA 7

Geangu, E., Smith, W. A. P., Mason, H. T., Martinez-Cedillo, A. P., Hunter, D., Knight, M. I., Liang, H., del Carmen Garcia de Soria Bazan, M., Tse, Z. T. H., Rowland, T., Corpuz, D., Hunter, J., Singh, N., Vuong, Q. C., Abdelgayed, M. R. S., Mullineaux, D. R., Smith, S., & Muller, B. R. (2023). EgoActive: Integrated wireless wearable sensors for capturing infant egocentric auditory-visual statistics and autonomic nervous system function 'in the wild'. *Sensors, 23*(18), 7930. https://doi.org/10.3390/s23187930

## Citas
- Parentética: (Geangu et al., 2023)
- Narrativa: Geangu et al. (2023)

## Objetivo

Diseñar, implementar y validar una plataforma vestible, inalámbrica y operable por familias que capture de forma concurrente la perspectiva audiovisual egocéntrica, ECG y aceleración, con sincronización, respaldo y preprocesamiento para investigación naturalista infantil (pp. PDF 1-2, 5-6).

## Problema abordado

Los equipos existentes pueden ser pesados, cableados, intrusivos, difíciles de operar o cerrar el acceso a datos crudos; además, no resolvían la grabación sincronizada entre vistas egocéntricas y actividad autonómica de varios individuos, con almacenamiento robusto y calidad verificable (pp. PDF 4-6).

## Metodología
- Diseño: Desarrollo de hardware y software con validaciones de campo visual, ECG, aceleración, reloj, sincronización, calidad de video y experiencia de usuario (pp. PDF 17-24, 29, 34-36).
- Contexto: Laboratorio con juego libre y tareas adultas, simulador de ECG y uso doméstico durante rutinas cotidianas (pp. PDF 17-23).
- Muestra o fuentes: Campo visual: 32 niños de 6-36 meses y 9 adultos; ECG naturalista: 30 niños de 3-36 meses; experiencia domiciliaria: 7 familias con lactantes de 6 meses (pp. PDF 17-21).
- Procedimiento: Familias registraron aproximadamente 4 h/día durante una semana; la estación sincronizó y respaldó, y servidores dedicados alinearon, limpiaron y etiquetaron datos tras la devolución (pp. PDF 17, 24, 36-37).

## Arquitectura y tecnología

Las cámaras de cabeza graban video Full HD a unos 30 fps y audio estéreo AAC a 32 kHz; los sensores corporales registran ECG a 250 Hz y aceleración triaxial a 65 Hz. La autonomía conjunta alcanza 2 h 10 min y los dispositivos guardan localmente en microSD (pp. PDF 7, 9, 15, 35).

Una estación con tableta Samsung A8 y aplicación Java sincroniza, carga y respalda hasta 512 GB. Al inicio muestra un código luminoso binario de 10 bits, común a cámara y fotosensor corporal, que identifica sesión y fija un origen temporal; el código dura diez periodos de 400 ms y admite códigos únicos durante hasta ocho días si no se ejecutan más de cuatro sincronizaciones por hora (pp. PDF 17, 24-27). El respaldo copia solo videos nuevos, los organiza por cámara, fecha y hora y luego los investigadores trasladan tableta y tarjetas corporales al repositorio central (p. PDF 27).

Herramientas Python extraen códigos, alinean modalidades, derivan frecuencia cardiaca, preparan aceleración y etiquetan calidad audiovisual. Los tramos oscuros, estáticos o invertidos se marcan sin eliminarlos, conservando marcas absolutas y anotaciones SRT visibles al operador (pp. PDF 24, 27-35).

## Actores

Lactante, niño o adulto que porta sensores; cuidador que aprende, sincroniza, registra y respalda; investigador que prepara y entrega el equipo, forma a la familia, centraliza archivos y analiza; aplicación de campo; algoritmos de preprocesamiento; operador humano que verifica casos ambiguos de inversión (pp. PDF 17, 24-27, 35-37).

## Datos y evidencias

Video y audio egocéntricos, ECG, aceleración, luminosidad/código de sincronización, reloj de cámara, copias redundantes, frecuencia cardiaca derivada, indicadores de calidad y etiquetas SRT. Los originales se dividen en archivos de cinco minutos; el video se re-muestrea a 30 Hz y concatena para procesarlo, manteniendo separado el material de captura (pp. PDF 27-28). Los intervalos no utilizables se preservan y etiquetan, práctica directamente aplicable a una cadena de evidencia auditable (p. PDF 34).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Detección de sincronización | En 1444 series con 1218 señales reales, se detectaron todas y hubo tres falsos positivos. | 29 |
| Comparación de ECG | Acuerdo medio dentro de 5 bpm = 95,4%; 26/30 registros superaron 90% de acuerdo. | 21-22 |
| Estabilidad de reloj | Velocidad relativa media 0,9999; se aplicó esa corrección y no hubo tendencia uniforme de deriva. | 23 |
| Cobertura visual | Campo estrecho M = 0,60 frente a campo amplio M = 0,93; en lactantes de 6 meses el estrecho cubrió más del 80% de fijaciones. | 19 |
| Calidad de video | Detección de escena estática >98%; inversión >99% de exactitud, precisión y exhaustividad; casos ambiguos se etiquetan para revisión humana. | 34-35 |
| Experiencia familiar | 97% valoró positivamente la cámara y 100% su operación como fácil; 89% valoró positivamente el sensor corporal. | 20, 24 |

## Métricas e instrumentos

Proporción de fijaciones, acuerdo de frecuencia cardiaca dentro de 5 bpm, diferencia absoluta, correlación por edad, velocidad y deriva del reloj, sensibilidad/especificidad/precisión de picos, índice de calidad, exactitud/precisión/exhaustividad audiovisual y encuesta familiar (pp. PDF 19-24, 31-35). Las validaciones usan eye tracker, Biosignalsplux, simulador TechPatient, datos ECG etiquetados y conjuntos de fotogramas separados (pp. PDF 18-23, 31, 34-35).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La cámara representa dirección de cabeza, no mirada exacta, y el campo estrecho pierde más fijaciones en edades mayores. | 19, 35 |
| El código deja de ser único en casos patológicos de más de cuatro sincronizaciones por hora y no todos los dispositivos pueden capturarlo. | 26, 30 |
| La aplicación fue probada solo en Samsung A8 con Android 11. | 24-25 |
| Se requiere competencia técnica mínima, familiarización y mantenimiento de múltiples componentes. | 36 |
| Niños pueden retirar o manipular sensores; el software solo ayuda a detectar esos periodos. | 36 |
| Audio y video domésticos plantean privacidad y exigen protocolos institucionales y legales. | 36 |

## Aporte a la tesis
- Capítulo 1: Demuestra que sincronización, respaldo, calidad y facilidad familiar son problemas conjuntos de la evidencia multimodal naturalista (pp. PDF 5-6).
- Capítulo 2: Aporta un patrón completo: señal común, código de sesión, origen temporal, originales locales, respaldo redundante, repositorio central y derivados con calidad (pp. PDF 24-30, 34).
- Capítulo 3: Sustenta un manifiesto DAYC-2 por dispositivo y sesión con código, reloj, copia, checksum, archivo original, derivado, transformación, tramo utilizable y decisión humana; checksum y versionado son extensiones de tesis, no funciones reportadas (pp. PDF 27-30, 34-35).
- Capítulo 4: Proporciona pruebas cuantitativas de detección, falsos positivos, deriva, cobertura, acuerdo, calidad, pérdida y experiencia del cuidador (pp. PDF 19-24, 29, 34-35).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Redundancia | Paráfrasis: los videos nuevos se copian a la tableta para conservarlos si se daña la tarjeta de la cámara. | 27 |
| Sincronización verificable | Paráfrasis: el código común permite emparejar sesiones y definir tiempo cero en todas las corrientes. | 25-30 |
| Validación de sincronía | Paráfrasis: se detectaron las 1218 señales reales y solo tres detecciones fueron falsas. | 29 |
| Conservación de pérdida | Paráfrasis: los periodos no utilizables se etiquetan pero se preservan, manteniendo las marcas absolutas. | 34 |
| Revisión humana | Paráfrasis: sesiones con inversión probable pero inferior al umbral automático se marcan para verificación humana. | 35 |
| Límite ético | Paráfrasis: grabar audio y video cotidiano exige protocolos de privacidad conformes a institución y legislación. | 36 |

## Precauciones de uso

EgoActive es una plataforma de investigación naturalista, no DAYC-2 ni un sistema diagnóstico. Sus métricas validan componentes y procesamiento bajo condiciones concretas; no garantizan seguridad clínica, representatividad o interoperabilidad. DAYC-2 debería adoptar su trazabilidad temporal y tratamiento explícito de calidad, no inferencias automáticas sobre desarrollo (pp. PDF 35-36).

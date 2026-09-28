---
id: S23
title: "A multi-source behavioral and physiological recording system for cognitive assessment"
year: 2023
doi: "10.1038/s41598-023-35289-z"
eje: "Captura y gestión de evidencia multimodal"
---

# S23 - A multi-source behavioral and physiological recording system for cognitive assessment

## Referencia APA 7

Wang, Z., Liu, L., & Liu, Y. (2023). A multi-source behavioral and physiological recording system for cognitive assessment. *Scientific Reports, 13*(1), 8149. https://doi.org/10.1038/s41598-023-35289-z

## Citas
- Parentética: (Wang et al., 2023)
- Narrativa: Wang et al. (2023)

## Objetivo

Construir un sistema capaz de ejecutar tareas cognitivas y registrar simultáneamente interacción, mirada, movimiento, audio y EEG en distintos niveles espaciotemporales, y mostrar su funcionamiento con participantes clínicos (pp. PDF 1-2).

## Problema abordado

Las plataformas de evaluación informatizada suelen registrar resultados, pero la adquisición síncrona de fuentes conductuales y fisiológicas heterogéneas continúa siendo difícil; además, los datos difieren en tamaño, formato e interfaz de procesamiento (pp. PDF 1-3).

## Metodología
- Diseño: Desarrollo y prueba de un banco integrado de 16 tareas, con análisis ilustrativo de cuatro tipos de resultados (pp. PDF 4-5, 8-10).
- Contexto: Shanghai Mental Health Center; versión cliente con periféricos y consola de experimentador, y versión web sin sensores externos (pp. PDF 2-4, 7-8).
- Muestra o fuentes: 238 participantes: 54 controles y personas con ansiedad, trastorno bipolar, depresión, trastorno obsesivo-compulsivo o esquizofrenia (p. PDF 8).
- Procedimiento: Registro e inicio de sesión, elección del paradigma, captura local o web, carga posterior de log y datos originales, y consulta o descarga administrativa por usuario o fecha (p. PDF 4).

## Arquitectura y tecnología

La arquitectura comprende capas de usuario, aplicación, gestión de servicios e infraestructura. El cliente en C conecta EyeLink/EyeControl, EEG de tres derivaciones y Polhemus G4; las tareas web usan HTML5 Canvas, JavaScript y jQuery, con Nginx, PHP y MySQL. Los resultados estructurados se guardan en MySQL y EEG, mirada y movimiento se cargan como archivos originales (pp. PDF 2-4).

La versión web recoge respuestas y tiempos pero no conecta periféricos; la versión cliente registra 1000 Hz de mirada, 250 Hz de EEG y 120 Hz de movimiento de seis grados de libertad (pp. PDF 3-4). La sincronización combina integración del programa con el equipo EEG y marcas de tarea para movimiento; no se cuantifica precisión, deriva de relojes ni tolerancia a fallos (p. PDF 4). Esto obliga a no asumir que “síncrono” equivale a sincronización validada.

## Actores

Participante que ejecuta tareas; experimentador que observa junto a la consola y gestiona periféricos y pausas; administrador que filtra o descarga por usuario y fecha; psiquiatras que contribuyeron al diseño; médico que debe combinar evidencias con escalas, observación e historia; investigadores que procesan datos solicitados (pp. PDF 3-4, 7, 10).

## Datos y evidencias

Resultados y tiempos de interacción, logs, coordenadas y pupila, EEG crudo, movimiento tridimensional y angular, audio de lenguaje y parámetros de tarea; los formatos incluyen EDF, TXT y CSV, además de registros relacionales (pp. PDF 3-6). El artículo propone metadatos y almacenamiento distribuido como trabajo futuro, pero la implementación actual no incorpora análisis unificado y mantiene cliente y web separados (p. PDF 10).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Capacidad | Se reservaron puertos para 150 participantes simultáneos. | 4 |
| Duración operativa | Completar todas las tareas toma aproximadamente 60-90 minutos y requiere 1-2 pausas según el participante. | 4 |
| Multifuente | El cliente registra interacción, mirada, EEG, movimiento y voz con originales en varios formatos. | 3-4, 10 |
| Sincronización integrada | El diseño conjunto evita errores de retardo sistemático entre experimentos, según los autores, pero no reporta una métrica de error temporal. | 10 |
| Estado del procesamiento | La plataforma recoge datos crudos; los programas de análisis correspondientes aún no estaban integrados. | 10 |
| Revisión clínica | El médico sigue necesitando manuales, escalas, observaciones e historia; el sistema aporta indicadores complementarios. | 10 |

## Métricas e instrumentos

Tiempos de respuesta y tarea, exactitud, coordenadas X/Y y pupila; EyeLink 1000 a 1000 Hz; Polhemus G4 a 120 Hz con X/Y/Z, azimut, elevación y giro; EEG Fp1/Fp2/Fpz a 250 Hz; estímulos y resultados específicos de 16 tareas (pp. PDF 4-7). Los análisis demostrativos incluyen pruebas de significación, distribución gamma y SVM, pero no validan gestión de evidencia ni DAYC-2 (pp. PDF 8-9).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La versión web no admite sensores externos y cliente y web aún no forman una plataforma unificada. | 2-3, 10 |
| No se integraron programas comunes de análisis por falta de métodos uniformes entre experimentos. | 10 |
| La sincronización se afirma, pero no se informa precisión, deriva, pérdida ni recuperación. | 4, 10 |
| Formatos y tamaños heterogéneos requieren metadatos y gestión distribuida, planteados solo como futuro. | 10 |
| Los datos no son públicos por la política de protección institucional. | 10 |
| La muestra adulta con trastornos mentales no permite extrapolar resultados clínicos a evaluación infantil o DAYC-2. | 8-10 |

## Aporte a la tesis
- Capítulo 1: Evidencia la dificultad de unir resultados de tarea, logs y archivos fisiológicos de distinta granularidad (pp. PDF 1-3).
- Capítulo 2: Aporta separación entre interacción estructurada en base de datos y señales crudas como archivos, además de perfiles cliente, web, experimento y administración (pp. PDF 3-4).
- Capítulo 3: Sugiere un manifiesto por sesión con participante seudónimo, tarea, ensayo, reloj, dispositivo, frecuencia, formato, archivo original y marcas; la propuesta de metadatos del artículo respalda esa necesidad, no su implementación (p. PDF 10).
- Capítulo 4: Orienta a medir simultaneidad real, deriva, archivos faltantes, correspondencia log-señal, carga, consulta por usuario/fecha y revisión profesional (pp. PDF 4, 10).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Persistencia heterogénea | Paráfrasis: resultados estructurados van a MySQL y señales crudas de EEG, mirada y movimiento se cargan como archivos. | 3 |
| Flujo auditable | Paráfrasis: tras la tarea se cargan log y originales, y el administrador filtra o descarga por fecha o usuario. | 4 |
| Dispositivos | Paráfrasis: movimiento se registra a 120 Hz, EEG a 250 Hz y mirada a 1000 Hz. | 4 |
| Brecha de procesamiento | Paráfrasis: el sistema actual ofrece adquisición cruda porque no existen métodos unificados de análisis para todas las tareas. | 10 |
| Juicio profesional | Paráfrasis: el médico debe combinar indicadores con escalas, observación e historia clínica. | 10 |

## Precauciones de uso

Aunque el artículo presenta resultados de clasificación de trastornos, la tesis no debe trasladarlos a DAYC-2. La población, tareas e instrumentos son diferentes, y el propio texto reserva el diagnóstico al profesional. La contribución pertinente es arquitectónica: fuentes heterogéneas, originales, marcas, roles, metadatos y límites de integración (pp. PDF 8-10).

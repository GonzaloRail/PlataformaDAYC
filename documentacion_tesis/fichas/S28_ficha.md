---
id: S28
title: "Caregiver experiences of an integrative patient-centered digital health application for pediatric type 1 diabetes care: Findings from a pilot clinical trial"
year: 2025
doi: "10.1371/journal.pdig.0000861"
eje: "Coordinación multi-actor y revisión profesional"
---

# S28 - Caregiver experiences of an integrative patient-centered digital health application for pediatric type 1 diabetes care: Findings from a pilot clinical trial

## Referencia APA 7

Amed, S., Pinkney, S., Abdulhussein, F. S., Virani, A., Zachariuk, C., Tamana, S. K., Muralidharan, S., Görges, M., Barrett, B., van Rooij, T., Borycki, E. M., Kushniruk, A., Longstaff, H., Virani, A., Wasserman, W. W., & TrustSphere Collaborative. (2025). Caregiver experiences of an integrative patient-centered digital health application for pediatric type 1 diabetes care: Findings from a pilot clinical trial. *PLOS Digital Health, 4*(10), e0000861. https://doi.org/10.1371/journal.pdig.0000861

## Citas
- Parentética: (Amed et al., 2025)
- Narrativa: Amed et al. (2025)

## Objetivo

Evaluar usabilidad, experiencia y utilidad de una plataforma mínima interoperable desde la perspectiva de cuidadores de niños y jóvenes con diabetes tipo 1 y sus profesionales (p. PDF 3).

## Problema abordado

Datos de sensores, bombas y clínica quedan distribuidos en plataformas propietarias; una vista compartida puede mejorar colaboración, pero su valor depende del uso profesional, interoperabilidad y comunicación bidireccional (pp. PDF 2-3, 8-10).

## Metodología
- Diseño: Piloto observacional de seis meses con métodos mixtos y directrices SQUIRE 2.0 (pp. PDF 1, 11).
- Contexto: Clínica de diabetes del BC Children’s Hospital, Vancouver, Canadá (pp. PDF 2, 11).
- Muestra o fuentes: 19 cuidadores participaron; 18 respondieron encuestas clave/entrevistas. Once profesionales produjeron 41 encuestas. Edad mediana infantil: 10 años [RIC 8-13] (pp. PDF 1, 4-5).
- Procedimiento: Coordinador apoyó instalación, identidad y consentimiento por Zoom; familia enlazó dispositivos y usó app; endocrinólogos, enfermería y dietistas usaron tablero antes, durante y entre consultas (pp. PDF 11-14).

## Arquitectura y tecnología

La plataforma conectó bombas, CGM y glucómetro con sincronización continua y visualización casi en tiempo real; transformó fuentes mediante API estándar y FHIR. La familia utilizó app móvil y el profesional una aplicación web con SSO hospitalario, planes compartidos, tareas, formularios, datos y recomendaciones (pp. PDF 11-12).

Las entradas manuales quedaron marcadas con usuario, fecha y hora, aportando proveniencia básica (p. PDF 11). El flujo fue captura automática/manual, preparación preconsulta, revisión profesional, recomendación persistida y consulta familiar; la mensajería bidireccional y la integración EMR eran mejoras deseadas, no capacidades plenamente evaluadas (pp. PDF 7-10, 14).

## Actores

Niño o joven con T1D; cuidador principal y otros integrantes familiares; endocrinólogo, enfermero y dietista; coordinador de investigación; equipos hospitalarios y socios tecnológicos (pp. PDF 8, 11-13).

## Datos y evidencias

Glucosa, dosis/configuración de insulina, formularios preconsulta, tareas, recursos, recomendaciones, datos identificatorios y trazas manuales (pp. PDF 3, 11-12). Los profesionales revisaban tendencias y dosis, asignaban tareas y registraban recomendaciones; los cuidadores reclamaron mayor monitorización y respuesta entre visitas (pp. PDF 5, 8-9, 12).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Usabilidad | SUS medio de cuidadores: 71,9 (n = 17). | 4 |
| Preparación | 16/18 (89%) usó la app para preparar la visita; 13/18 usó el formulario y todos lo hallaron útil. | 4 |
| Utilidad y personalización | 11/18 (61%) la consideró útil y 10/18 (56%) percibió visitas/recomendaciones más personalizadas. | 4 |
| Revisión profesional | 37/41 (90%) encuestas profesionales indicaron satisfacción y mejor preparación; 36/41 (88%) mejor interacción. | 5 |
| Seguridad percibida | 12/18 (66,7%) estuvo de acuerdo en que datos identificatorios y clínicos estaban seguros. | 6 |

## Métricas e instrumentos

SUS; escalas Likert de cinco puntos; encuestas propias para cuidadores y profesionales; 18 entrevistas semiestructuradas; análisis descriptivo con Stata 15.1 y análisis temático inductivo en NVivo (p. PDF 15). Las preguntas propias fueron revisadas interdisciplinariamente, pero no evaluadas formalmente (p. PDF 15).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Muestra pequeña y homogénea, con generalización limitada. | 10 |
| Solo se recogió perspectiva cuidadora, no la de niños o jóvenes. | 10 |
| No representó suficientes contextos para evaluar equidad. | 10 |
| Faltaron métricas técnicas de login, onboarding, conectividad y sincronización. | 10 |
| Una autora fundó la empresa que comercializa la plataforma. | 2 |

## Aporte a la tesis
- Capítulo 1: Muestra el costo sociotécnico de fragmentar datos entre dispositivos y clínica (pp. PDF 2-3).
- Capítulo 2: Aporta colaboración familiar-profesional antes, durante y entre visitas (pp. PDF 7-9, 14).
- Capítulo 3: Informa APIs/FHIR, sincronización, SSO, vistas por rol, sellos de tiempo y consentimiento revocable (pp. PDF 5, 11-12).
- Capítulo 4: Aporta SUS y métricas de preparación, revisión, personalización, seguridad y adopción profesional (pp. PDF 4-6, 15).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Integración | Paráfrasis: API estándar y FHIR transformaban datos procedentes de varias fuentes. | 11 |
| Sincronización | Paráfrasis: dispositivos enlazados mostraban tendencias casi en tiempo real mediante sincronización continua. | 11 |
| Proveniencia | Paráfrasis: las dosis manuales se marcaban con usuario, fecha y hora. | 11 |
| Revisión | Paráfrasis: profesionales revisaban tendencias, ingresaban recomendaciones y asignaban tareas. | 12 |
| Comunicación | Paráfrasis: el valor aumentaba cuando el equipo actuaba sobre los datos y devolvía recomendaciones. | 8-9 |
| Control | Paráfrasis: familias podían controlar quién veía datos y cambiarlo. | 5 |

## Precauciones de uso

Es un piloto de diabetes pediátrica con edad mediana de 10 años, no evaluación infantil temprana ni DAYC-2. Los resultados miden experiencia y utilidad percibida, no beneficio clínico. La mensajería bidireccional fue una expectativa de usuarios, por lo que no debe describirse como función validada (pp. PDF 8-10).

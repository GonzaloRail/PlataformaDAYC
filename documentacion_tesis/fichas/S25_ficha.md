---
id: S25
title: "Pilot feasibility study of a digital technology approach to the systematic electronic capture of parent-reported data on cognitive and language development in children aged 2 years"
year: 2023
doi: "10.1136/bmjhci-2023-100781"
eje: "Coordinación multi-actor y revisión profesional"
---

# S25 - Pilot feasibility study of a digital technology approach to the systematic electronic capture of parent-reported data on cognitive and language development in children aged 2 years

## Referencia APA 7

Modi, N., Ribas, R., Johnson, S., Lek, E., Godambe, S., Fukari-Irvine, E., Ogundipe, E., Tusor, N., Das, N., Udayakumaran, A., Moss, B., Banda, V., Ougham, K., Cornelius, V., Arasu, A., Wardle, S., Battersby, C., & Bravery, A. (2023). Pilot feasibility study of a digital technology approach to the systematic electronic capture of parent-reported data on cognitive and language development in children aged 2 years. *BMJ Health & Care Informatics, 30*(1), e100781. https://doi.org/10.1136/bmjhci-2023-100781

## Citas
- Parentética: (Modi et al., 2023)
- Narrativa: Modi et al. (2023)

## Objetivo

Desarrollar y probar un proceso sistemático para administrar PARCA-R, recabar consentimiento y respuestas parentales, guardar resultados en la National Neonatal Research Database (NNRD) y devolverlos a familias y equipos clínicos (p. PDF 2).

## Problema abordado

En el Reino Unido no existía un procedimiento nacional uniforme para registrar desarrollo cognitivo y lingüístico a los 2 años en niños nacidos muy prematuros; el seguimiento exige contacto sostenido, personal capacitado, almacenamiento seguro y acceso gobernado (pp. PDF 1-2).

## Metodología
- Diseño: Estudio piloto de mejora de servicio, desarrollado con clínicos y familias, con análisis descriptivo de consentimiento, adopción y datos faltantes (pp. PDF 2-3).
- Contexto: Seis unidades neonatales del NHS del oeste y noroeste de Londres durante un año, con seis meses de reclutamiento (p. PDF 2).
- Muestra o fuentes: Padres de 41 niños nacidos antes de 30+0 semanas; 38 se registraron, 30 consintieron y 23 niños alcanzaron la ventana de aplicación (pp. PDF 2-4).
- Procedimiento: El clínico invitó y registró; la plataforma notificó a los 6, 12 y 18 meses y habilitó PARCA-R entre 23,5 y 27,5 meses de edad corregida; la familia completó y obtuvo una copia, y el resultado se enlazó con NNRD y se remitió a la unidad clínica (pp. PDF 2-4).

## Arquitectura y tecnología

OpenClinica v4 funcionó como sistema integral alojado en nube, con formularios de consentimiento y PARCA-R, notificaciones automáticas, reportes, métricas, cifrado en reposo y tránsito, separación de identificadores, arquitectura de cero pérdida y retención de copias de seguridad por cuatro semanas (p. PDF 2). Los resultados se almacenaron seudonimizados en NNRD y se enviaron por SFTP a una dirección NHS.net específica para incorporarlos al expediente clínico (p. PDF 3).

El flujo multi-actor fue: equipo neonatal invita y agenda; familia consiente y reporta; servicio automatizado recuerda y calcula la ventana; personal autorizado enlaza registros; equipo clínico recibe y revisa; familia conserva el resultado (pp. PDF 2-4). La tesis puede adoptar esta separación de identidad, evidencia, autorización y entrega, sin asumir que PARCA-R valida DAYC-2.

## Actores

Niño nacido muy prematuro; madre, padre o cuidador informante; clínico neonatal que invita y agenda; equipo de sistemas de ensayos; miembro autorizado del equipo investigador; Neonatal Data Analysis Unit/NNRD; equipo clínico receptor; organizaciones y familias participantes en el diseño (pp. PDF 2-3, 5).

## Datos y evidencias

Se recopilaron identificadores y contacto por separado, consentimiento, preferencias de notificación, respuestas y puntuaciones PARCA-R, edad corregida y trazas de registro/completitud (pp. PDF 2-3). La revisión profesional ocurre al recibir el equipo neonatal el resultado para seguimiento rutinario; el artículo no describe adjudicación clínica dentro de la plataforma (pp. PDF 3-4).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Registro y consentimiento | 38/41 familias se registraron y 30/38 (79%) firmaron el consentimiento electrónico. | 3 |
| Finalización válida | 21/23 (91%) familias en ventana completaron correctamente PARCA-R; pudieron calcularse puntuaciones estandarizadas para las 21. | 4 |
| Canal de aviso | Completaron 10/19 (53%) con correo y 11/15 (73%) con correo más SMS. | 3 |
| Compartición | Solo una familia no autorizó compartir con el equipo clínico e integrar en NNRD. | 3-4 |
| Correcciones técnicas | Se corrigieron visualización en iPhone, aleatorización y agenda; se añadió autenticación multifactor. | 4 |

## Métricas e instrumentos

PARCA-R, cuestionario parental estandarizado y normorreferenciado para cognición y lenguaje entre 23 y 27 meses (p. PDF 2); conteos y proporciones de registro, consentimiento, canal de contacto, completitud y datos faltantes (pp. PDF 3-4). No se evaluó concordancia con una administración profesional presencial.

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Piloto pequeño, regional y limitado a niños nacidos antes de 30 semanas; la afirmación de escalabilidad nacional es prospectiva. | 2-4 |
| El 40% no tenía inglés como lengua principal y pocas traducciones de PARCA-R habían sido validadas culturalmente. | 4 |
| La pandemia alteró los servicios y pudo aumentar o reducir la adopción, sin poder determinar la dirección. | 4 |
| Dos aplicaciones fueron inválidas por errores de edad o agenda, uno atribuible a entrada clínica. | 4 |

## Aporte a la tesis
- Capítulo 1: Documenta la fragmentación del seguimiento y la carga de evaluaciones repetidas (pp. PDF 2, 4-5).
- Capítulo 2: Aporta un caso de coordinación niño-familia-clínico-registro nacional, con consentimiento granular (pp. PDF 2-4).
- Capítulo 3: Informa separación de identidad, cifrado, control de acceso, notificaciones, ventana etaria, SFTP, MFA y prevención de cambios accidentales de agenda (pp. PDF 2-4).
- Capítulo 4: Sugiere verificar conversión de invitación a registro, consentimiento, finalización válida, errores de agenda y entrega clínica (pp. PDF 3-4).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Flujo temporal | Paráfrasis: se enviaron recordatorios a los 6, 12 y 18 meses y la invitación entre 23,5 y 27,5 meses corregidos. | 3 |
| Seguridad | Paráfrasis: identificadores y datos de estudio se guardaron separados y cifrados en reposo y tránsito. | 2 |
| Trazabilidad clínica | Paráfrasis: el resultado seudonimizado se enlazó a NNRD y una copia se envió por SFTP al NHS. | 3 |
| Control familiar | Paráfrasis: las familias podían decidir la integración secundaria y guardar o imprimir resultados. | 3-4 |
| Prevención de error | Paráfrasis: se eliminó la capacidad de que el clínico alterara accidentalmente la agenda. | 4 |

## Precauciones de uso

Evalúa PARCA-R en una población muy prematura y no DAYC-2. La aceptabilidad se infiere principalmente de adopción y retroalimentación, no de una escala psicométrica detallada. La idoneidad para despliegue nacional es una conclusión de factibilidad que requiere validación operativa a escala (pp. PDF 1, 4).

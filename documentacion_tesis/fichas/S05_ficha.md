---
id: S05
title: "An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study"
year: 2026
doi: "10.1371/journal.pdig.0001204"
eje: "Arquitectura, sincronización y operación offline"
---

# S05 - An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study

## Referencia APA 7

Ashista, H., Comas, A. S., Selby, T., Essar, M. Y., Alawa, J., Al-Hajj, S., & Nelson, E. (2026). An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study. *PLOS Digital Health, 5*(2), e0001204. https://doi.org/10.1371/journal.pdig.0001204

## Citas
- Parentética: (Ashista et al., 2026)
- Narrativa: Ashista et al. (2026)

## Objetivo

Evaluar la factibilidad del EHR offline-first de Hikma Health mediante aceptabilidad, practicidad, integración y efectividad en dos clínicas de bajos recursos (p. PDF 3).

## Problema abordado

Los EHR convencionales suelen exigir conexión continua, son costosos y difíciles de adaptar; además, la sincronización multiusuario durante una atención puede fallar con conectividad inconsistente (pp. PDF 1-3).

## Metodología
- Diseño: Estudio de factibilidad con métodos mixtos y análisis descriptivo y cualitativo (pp. PDF 1, 3-4).
- Contexto: Nueva Vida Clinic en Nicaragua y Endless Medical Advantage en Líbano (pp. PDF 1, 3-5).
- Muestra o fuentes: Once entrevistas a tres enfermeras, seis médicos, un dentista y un farmacéutico, además de encuestas demográficas de las clínicas (p. PDF 5).
- Procedimiento: Encuestas REDCap, entrevistas hasta saturación temática, análisis de marco con tres codificadores y estadísticas descriptivas en Excel (pp. PDF 3-5).

## Arquitectura y tecnología

El sistema es gratuito, abierto, modular y offline-first, con versiones adaptadas a cada clínica e idioma (pp. PDF 1, 3). Inicialmente sincronizaba la base completa; tras fallos en el flujo semi-online, fue rediseñado para enviar solo eventos nuevos o editados al servidor en la nube (p. PDF 6).

## Actores

Administradores y proveedores clínicos aportaron datos del estudio; durante el flujo asistencial participaron recepción, médicos y farmacia, con necesidad de compartir cambios entre dispositivos (pp. PDF 3-7). Hikma Health desarrolló y financió recursos del estudio, y dos autores eran voluntarios de la organización (p. PDF 2).

## Datos y evidencias

Se combinaron características de las clínicas, respuestas cuantitativas e entrevistas sobre uso, recursos, integración y eficacia percibida (pp. PDF 3-5). Los datos sensibles no se publicaron, aunque pueden solicitarse bajo los protocolos éticos (p. PDF 2).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Aprendizaje y tiempo | Promedios totales de 3.1 horas de capacitación, 2.6 semanas para sentirse cómodo y 3.1 minutos menos por encuentro. | 5 |
| Aceptabilidad | Diez de once participantes indicaron que era fácil de usar. | 6 |
| Fallo de sincronización multi-actor | En Nueva Vida, todos los participantes reportaron problemas al sincronizar repetidamente durante una atención con varios clínicos. | 6 |
| Mejora arquitectónica | Sincronizar solo eventos nuevos o editados, en lugar de toda la base, hizo el proceso más eficiente y confiable en el uso semi-online. | 6 |

## Métricas e instrumentos

Encuestas en REDCap, guía de entrevistas, NVivo, análisis de marco, kappa entre codificadores y estadísticas descriptivas (pp. PDF 3-5). El acuerdo entre tres codificadores fue kappa=0.76 (p. PDF 5).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Fue un estudio de factibilidad con algunas medidas de efectividad, no una evaluación completa de efectividad. | 9 |
| La evidencia cuantitativa de efectividad no se probó rigurosamente. | 9 |
| La muestra de proveedores fue limitada, con posible sesgo de selección y deseabilidad social. | 9 |
| El patrocinio de Hikma Health y los recursos aportados pudieron influir en las respuestas. | 9 |

## Aporte a la tesis
- Capítulo 1: Evidencia que offline-first no basta cuando varios actores requieren cambios durante la misma atención; la sincronización tardía generó demoras, papel duplicado y descoordinación (pp. PDF 6-8).
- Capítulo 2: Sustenta sincronización incremental por eventos frente a transferencia de la base completa (pp. PDF 6, 8).
- Capítulo 3: Para DAYC-2, orienta a un registro local de cambios, envío diferencial, estado visible de entrega y manejo explícito de datos duplicados; esta adaptación requiere diseño y pruebas propias (pp. PDF 6-8).
- Capítulo 4: Motiva validar flujos niño-cuidador-profesional con pérdida de red, múltiples dispositivos, reintentos y retrasos, midiendo convergencia y carga documental (pp. PDF 6-8).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Mostrar riesgo multi-actor | Paráfrasis: datos guardados localmente no llegaban a la nube y otros médicos no podían verlos. | 6 |
| Mostrar impacto operativo | Paráfrasis: la falta de sincronización produjo solicitudes de repetir en papel y caos entre médico y farmacia. | 7 |
| Justificar sincronización diferencial | Paráfrasis: el rediseño dejó de sincronizar toda la base y envió solo eventos nuevos o modificados. | 6 |
| Delimitar evidencia | Paráfrasis: el trabajo evaluó factibilidad y no probó rigurosamente la efectividad cuantitativa. | 9 |

## Precauciones de uso

La mejora de sincronización se describe cualitativamente, sin latencias, tasas de conflicto ni experimentos de fallos publicados (pp. PDF 6-9). Los desenlaces clínicos son percepciones de proveedores dentro de un estudio de factibilidad y no validan DAYC-2 ni una arquitectura concreta para este instrumento.

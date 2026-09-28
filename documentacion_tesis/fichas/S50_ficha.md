---
id: S50
title: "Reliable Communication in the Presence of Failures"
year: 1987
doi: "10.1145/7351.7478"
eje: "Arquitectura, sincronización y operación offline"
---

# S50 - Reliable Communication in the Presence of Failures

## Referencia APA 7

Birman, K. P., & Joseph, T. A. (1987). Reliable communication in the presence of failures. *ACM Transactions on Computer Systems, 5*(1), 47-76. https://doi.org/10.1145/7351.7478

## Citas

- Parentética: (Birman & Joseph, 1987)

## Objetivo

Diseñar comunicación confiable para grupos de procesos tolerantes a fallos.

## Problema abordado

La entrega causal preserva dependencias entre eventos relacionados.

## Metodología

Diseño y análisis de protocolos de multicast confiable en el sistema ISIS.

## Arquitectura y tecnología

La fuente se emplea para delimitar una decisión arquitectónica o contextual; no se adopta una implementación completa desde este trabajo.

## Actores

Los actores se interpretan según el objeto estudiado por la fuente y no se trasladan automáticamente al caso de prueba.

## Datos y evidencias

El documento completo se convirtió con marcadores por página y SHA-256 para mantener trazabilidad de la extracción.

## Resultados principales

| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Aporte principal | La entrega causal preserva dependencias entre eventos relacionados. | 1 |
| Implicación | Las restricciones de orden tienen costos y deben corresponder a la necesidad de la aplicación. | 1 |
| Precaución | Los fallos y recuperaciones también deben formar parte del orden observado. | 1 |

## Métricas e instrumentos

La fuente no se usa para fijar umbrales de la tesis; sus medidas, cuando existen, permanecen acotadas a su propio diseño.

## Limitaciones

| Limitación | Página PDF |
|---|---:|
| Es un fundamento clásico de protocolos, no una evaluación de arquitecturas web ni de persistencia de eventos moderna. | 1 |

## Aporte a la tesis

- Capítulo II: sustenta el eje arquitectura, sincronización y operación offline.
- La transferencia se limita a requisitos, decisiones de diseño o contexto; no acredita desempeño de la arquitectura propuesta.

## Evidencia textual verificable

| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Aporte | Paráfrasis: La entrega causal preserva dependencias entre eventos relacionados. | 1 |
| Implicación | Paráfrasis: Las restricciones de orden tienen costos y deben corresponder a la necesidad de la aplicación. | 1 |
| Límite | Paráfrasis: Los fallos y recuperaciones también deben formar parte del orden observado. | 1 |

## Precauciones de uso

Es un fundamento clásico de protocolos, no una evaluación de arquitecturas web ni de persistencia de eventos moderna. No se extrapolan sus resultados a validez clínica, cumplimiento normativo peruano ni desempeño del prototipo.

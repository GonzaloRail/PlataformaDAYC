---
id: S51
title: "On Mixing Eventual and Strong Consistency: Acute Cloud Types"
year: 2021
doi: "10.1109/TPDS.2021.3090318"
eje: "Arquitectura, sincronización y operación offline"
---

# S51 - On Mixing Eventual and Strong Consistency: Acute Cloud Types

## Referencia APA 7

Kokociński, M., Kobus, T., & Wojciechowski, P. T. (2021). On mixing eventual and strong consistency: Acute cloud types. *IEEE Transactions on Parallel and Distributed Systems, 32*(11), 2782-2795. https://doi.org/10.1109/TPDS.2021.3090318

## Citas

- Parentética: (Kokociński et al., 2021)

## Objetivo

Estudiar las garantías y anomalías de mezclar operaciones eventuales y fuertes.

## Problema abordado

Las operaciones con distintos niveles de consistencia pueden exhibir reordenamiento temporal.

## Metodología

Formalización teórica de acute cloud types y prueba de imposibilidad.

## Arquitectura y tecnología

La fuente se emplea para delimitar una decisión arquitectónica o contextual; no se adopta una implementación completa desde este trabajo.

## Actores

Los actores se interpretan según el objeto estudiado por la fuente y no se trasladan automáticamente al caso de prueba.

## Datos y evidencias

El documento completo se convirtió con marcadores por página y SHA-256 para mantener trazabilidad de la extracción.

## Resultados principales

| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Aporte principal | Las operaciones con distintos niveles de consistencia pueden exhibir reordenamiento temporal. | 1 |
| Implicación | Ese reordenamiento puede producir desacuerdos intermedios y causalidad circular. | 1 |
| Precaución | Las operaciones que requieren acuerdo global deben distinguirse de las conmutativas. | 1 |

## Métricas e instrumentos

La fuente no se usa para fijar umbrales de la tesis; sus medidas, cuando existen, permanecen acotadas a su propio diseño.

## Limitaciones

| Limitación | Página PDF |
|---|---:|
| El resultado es teórico y no prescribe una implementación única para todos los dominios. | 1 |

## Aporte a la tesis

- Capítulo II: sustenta el eje arquitectura, sincronización y operación offline.
- La transferencia se limita a requisitos, decisiones de diseño o contexto; no acredita desempeño de la arquitectura propuesta.

## Evidencia textual verificable

| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Aporte | Paráfrasis: Las operaciones con distintos niveles de consistencia pueden exhibir reordenamiento temporal. | 1 |
| Implicación | Paráfrasis: Ese reordenamiento puede producir desacuerdos intermedios y causalidad circular. | 1 |
| Límite | Paráfrasis: Las operaciones que requieren acuerdo global deben distinguirse de las conmutativas. | 1 |

## Precauciones de uso

El resultado es teórico y no prescribe una implementación única para todos los dominios. No se extrapolan sus resultados a validez clínica, cumplimiento normativo peruano ni desempeño del prototipo.

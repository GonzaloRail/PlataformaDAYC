---
id: S49
title: "Verifying Strong Eventual Consistency in Distributed Systems"
year: 2017
doi: "10.1145/3133933"
eje: "Arquitectura, sincronización y operación offline"
---

# S49 - Verifying Strong Eventual Consistency in Distributed Systems

## Referencia APA 7

Gomes, V. B. F., Kleppmann, M., Mulligan, D. P., & Beresford, A. R. (2017). Verifying strong eventual consistency in distributed systems. *Proceedings of the ACM on Programming Languages, 1*(OOPSLA), Article 109, 1-28. https://doi.org/10.1145/3133933

## Citas

- Parentética: (Gomes et al., 2017)

## Objetivo

Formalizar y verificar garantías de convergencia para tipos de datos replicados sin conflictos.

## Problema abordado

Los CRDT estudiados alcanzan consistencia eventual fuerte bajo el modelo formal.

## Metodología

Marco formal y pruebas mecanizadas en Isabelle/HOL sobre un modelo de red y tres CRDT.

## Arquitectura y tecnología

La fuente se emplea para delimitar una decisión arquitectónica o contextual; no se adopta una implementación completa desde este trabajo.

## Actores

Los actores se interpretan según el objeto estudiado por la fuente y no se trasladan automáticamente al caso de prueba.

## Datos y evidencias

El documento completo se convirtió con marcadores por página y SHA-256 para mantener trazabilidad de la extracción.

## Resultados principales

| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Aporte principal | Los CRDT estudiados alcanzan consistencia eventual fuerte bajo el modelo formal. | 1 |
| Implicación | La convergencia depende de relaciones de orden y de la semántica del tipo de dato. | 1 |
| Precaución | El resultado no demuestra que toda operación de negocio pueda expresarse como CRDT. | 1 |

## Métricas e instrumentos

La fuente no se usa para fijar umbrales de la tesis; sus medidas, cuando existen, permanecen acotadas a su propio diseño.

## Limitaciones

| Limitación | Página PDF |
|---|---:|
| El trabajo prueba algoritmos concretos; no evalúa una aplicación sanitaria ni resuelve invariantes que exigen coordinación global. | 1 |

## Aporte a la tesis

- Capítulo II: sustenta el eje arquitectura, sincronización y operación offline.
- La transferencia se limita a requisitos, decisiones de diseño o contexto; no acredita desempeño de la arquitectura propuesta.

## Evidencia textual verificable

| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Aporte | Paráfrasis: Los CRDT estudiados alcanzan consistencia eventual fuerte bajo el modelo formal. | 1 |
| Implicación | Paráfrasis: La convergencia depende de relaciones de orden y de la semántica del tipo de dato. | 1 |
| Límite | Paráfrasis: El resultado no demuestra que toda operación de negocio pueda expresarse como CRDT. | 1 |

## Precauciones de uso

El trabajo prueba algoritmos concretos; no evalúa una aplicación sanitaria ni resuelve invariantes que exigen coordinación global. No se extrapolan sus resultados a validez clínica, cumplimiento normativo peruano ni desempeño del prototipo.

---
id: S12
title: "Lightweight Distributed Provenance Model for Complex Real–world Environments"
year: 2022
doi: "10.1038/s41597-022-01537-6"
eje: "Proveniencia, versionado y auditoría"
---

# S12 - Lightweight Distributed Provenance Model for Complex Real–world Environments

## Referencia APA 7

Wittner, R., Mascia, C., Gallo, M., Frexia, F., Müller, H., Plass, M., Geiger, J., & Holub, P. (2022). Lightweight distributed provenance model for complex real-world environments. *Scientific Data, 9*(1), 503. https://doi.org/10.1038/s41597-022-01537-6

## Citas
- Parentética: (Wittner et al., 2022)
- Narrativa: Wittner et al. (2022)

## Objetivo

Definir sobre W3C PROV un modelo ligero que conecte fragmentos de proveniencia producidos por distintas organizaciones y permita recorrer cadenas distribuidas aun con componentes ausentes (pp. PDF 1-3).

## Problema abordado

Cada organización documenta solo una parte del ciclo de vida; la generalidad de PROV puede producir soluciones incompletas o incompatibles, y faltaban convenciones para interconexión, versionado, integridad y tolerancia a discontinuidades (pp. PDF 1-4, 12).

## Metodología
- Diseño: Diseño iterativo de modelo y demostración de factibilidad en un caso real, con proveniencia manual y generación automatizada parcial (pp. PDF 3, 16).
- Contexto: Pipeline multiinstitucional de patología digital desde muestra hasta entrenamiento y prueba de IA (pp. PDF 1-3).
- Muestra o fuentes: Objetos físicos y digitales, imágenes WSI, anotaciones, datos clínicos, configuraciones, índices, modelos y resultados (pp. PDF 1, 3, 7).
- Procedimiento: Seis pasos; automatización en preprocesamiento WSI, entrenamiento y prueba, con implementación y material suplementario públicos (pp. PDF 3, 16).

## Arquitectura y tecnología

Cada proceso finaliza un *bundle* PROV como instantánea inmutable y validable; un *backbone* separa información de recorrido de proveniencia específica del dominio (pp. PDF 4-5). Conectores con identificadores compartidos enlazan emisor/receptor y guardan ID y URI del *bundle* remoto; conectores de salto mantienen navegación ante piezas ausentes (pp. PDF 5-8). La consulta “entradas trazables de una salida” recorre relaciones `prov:wasDerivedFrom` y usa URI para continuar en otros *bundles* (p. PDF 7). El versionado crea una copia nueva, conserva la anterior y registra revisiones en un meta-*bundle*; los PID y PROV-AQ permiten localizar y consultar por HTTP, HTML o SPARQL (pp. PDF 9-11). Hashes, firmas y archivo de instantáneas inmutables sustentan integridad, autenticidad, no repudio y auditoría, aunque parte de estos mecanismos queda fuera del alcance (pp. PDF 5, 11-13).

## Actores

Organizaciones emisoras y receptoras, hospital, patología, biobanco, centro de datos, personal clínico, patólogo y equipo de ciencia de datos (pp. PDF 2-3, 5-7).

## Datos y evidencias

La cadena enlaza muestra, procesamiento, almacenamiento, WSI, parches, anotaciones, datos clínicos, índices, configuración y código/modelos; la implementación automatizada incluyó hashes, ubicación de archivos, repositorio Git, configuración y detalles de entrenamiento/validación (pp. PDF 1, 3, 7).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Backbone | Estandariza rutas de derivación entre entradas y salidas y admite información de dominio adjunta. | 3, 5-7 |
| Consulta | El recorrido queda acotado por entradas y salidas trazables del *bundle*, no por caminos arbitrarios. | 7 |
| Discontinuidad | Los conectores de salto permiten enlazar componentes no adyacentes cuando falta proveniencia intermedia. | 7-8 |
| Versionado | Las nuevas copias reemplazan lógicamente sin borrar originales y conservan historial mediante meta-*bundle*. | 9-10 |
| Factibilidad | La generación automática se implementó en las etapas computacionales 3b, 4 y 5. | 3, 16 |

## Métricas e instrumentos

No se reportan métricas cuantitativas de rendimiento. La factibilidad se demuestra con el caso, PROV-DM, PROV-CONSTRAINTS, patrones de composición/actividades compuestas, conectores y algoritmo de recorrido (pp. PDF 3, 7, 14-16).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| Integridad, no repudio, opacidad y versionado se describen solo parcialmente y requieren publicaciones/validación adicionales. | 3, 12, 16 |
| La automatización cubrió solo las etapas computacionales 3b, 4 y 5. | 16 |
| Granularidad, entradas/salidas trazables y significado compartido de conectores deben decidirse antes de adoptar el modelo. | 13 |
| Los conectores hacia adelante exigen comunicación adicional y los conjuntos muy reutilizados pueden hacer inviable actualizar con frecuencia. | 13, 16 |

## Aporte a la tesis
- Capítulo 1: Fundamenta la cadena distribuida y tolerante a huecos para procesos multi-actor y multi-sistema (pp. PDF 1-3, 7-8).
- Capítulo 2: Aporta un patrón W3C PROV que separa navegación no sensible de detalle protegido (pp. PDF 5, 11-12).
- Capítulo 3: Aplicación potencial a DAYC-2: representar captura, revisión y cálculo como *bundles* inmutables conectados por IDs, manteniendo versiones y enlaces aun cuando una etapa esté fuera de línea; no es una aplicación pediátrica del estudio (pp. PDF 5-11).
- Capítulo 4: Sugiere probar validez PROV, recorrido, huecos, actualización, integridad y control de acceso (pp. PDF 7-14).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Distribución | Paráfrasis: piezas documentadas por organizaciones diferentes forman cadenas distribuidas. | 1 |
| Captura | Paráfrasis: al finalizar un proceso se crea una instantánea PROV fija, normalizable, firmable y archivable. | 5 |
| Consulta | Paráfrasis: un algoritmo sigue derivaciones y URI para recuperar *bundles* anteriores o posteriores. | 7 |
| Versionado | Paráfrasis: una actualización crea otra copia y preserva la original para no romper enlaces. | 10 |
| Privacidad | Paráfrasis: el *backbone* solo contiene recorrido; el detalle sensible queda fuera, en proveniencia de dominio. | 11 |
| Límite | Paráfrasis: se requiere validación rigurosa en otros dominios y completar seguridad, integridad y no repudio. | 16 |

## Precauciones de uso

La demostración corresponde a patología digital y biotecnología, no a DAYC-2 ni pediatría (pp. PDF 1-3). El modelo sustenta, pero no completa, seguridad y no repudio (pp. PDF 3, 12, 16). La existencia de una cadena no garantiza exactitud del contenido; deben validarse fuentes, firmas, permisos y semántica compartida (pp. PDF 11-14).

# PROTOCOLO DE BÚSQUEDA DOCUMENTAL DEL CAPÍTULO II

## Propósito y alcance

Este protocolo hace reproducible la ampliación documental del capítulo II. Las cuatro búsquedas definidas fueron ejecutadas el 17 de septiembre de 2026 y sus exportaciones CSV están preservadas en `../exeles/`. Su propósito es identificar evidencia adicional para: arquitectura distribuida orientada a eventos, sincronización offline, trazabilidad y proveniencia multimodal, observabilidad, evaluación técnica, normativa peruana aplicable y contexto nacional de instanciación.

## Preguntas de búsqueda

1. ¿Qué patrones y garantías se documentan para sincronización local, consistencia eventual, idempotencia, orden causal, entrega y recuperación en sistemas distribuidos multi-actor?
2. ¿Cómo se modelan proveniencia, linaje, integridad, versionado y trazabilidad de evidencias multimodales?
3. ¿Qué evidencia peruana documenta evaluación digital infantil, telesalud, captura de datos sensibles o implementación institucional relevante?
4. ¿Qué normas y documentos oficiales peruanos condicionan el tratamiento de datos personales, salud y participación de menores?

## Fuentes y estrategia

| Grupo | Fuentes previstas | Criterio de uso |
|---|---|---|
| Arquitectura y software | Scopus, Web of Science, IEEE Xplore, ACM Digital Library, Google Scholar | Estudios revisados por pares, estándares o documentación técnica primaria |
| Salud y evaluación digital | PubMed, Scopus, SciELO, LILACS | Estudios con método identificable y resultados transferibles |
| Contexto peruano | ALICIA, RENATI, SciELO Perú, repositorios institucionales y Google Scholar | Estudios, tesis o documentos institucionales con procedencia peruana verificable |
| Normativa | Diario Oficial El Peruano, Autoridad Nacional de Protección de Datos Personales, Ministerio de Salud y Ministerio de la Mujer y Poblaciones Vulnerables | Texto oficial vigente o histórico, según corresponda |

Se ejecutarán combinaciones en español e inglés. Ejemplos:

```text
(offline-first OR local-first OR "event-driven architecture" OR "event sourcing")
AND (synchronization OR idempotency OR "causal order" OR provenance)

("multimodal evidence" OR "data provenance" OR traceability)
AND (health OR pediatric OR child)

(Peru OR peruano OR peruana)
AND (telesalud OR "evaluacion digital" OR "desarrollo infantil" OR trazabilidad)
```

Cada ejecución registra fuente consultada, fecha, cadena literal, resultados recuperados y enlace persistente o DOI en su CSV. La selección posterior documenta motivo de inclusión, exclusión y uso permitido en las fichas y matrices del corpus. Las búsquedas nacionales no se describen como no ejecutadas: se incorporaron Curioso et al. (2023) y Paredes-Angeles et al. (2024) como contexto nacional, sin confundirlas con un diagnóstico de la institución de estudio.

## Criterios de selección

Se incluirán documentos que tengan relación directa con una pregunta de búsqueda, texto completo accesible, autoría o procedencia identificable y evidencia suficiente para precisar método, aporte y límites cuando se presenten como antecedente individual. Para fundamentos técnicos y normativos podrán incluirse estándares o documentos oficiales, incluso si no adoptan formato empírico.

Se excluirán duplicados, resúmenes sin texto completo, publicaciones sin procedencia verificable, estudios que solo reutilicen términos sin abordar la capacidad arquitectónica y documentos cuya versión o vigencia no pueda determinarse. Un texto sobre instrumento clínico no se usará para transferir sus propiedades psicométricas a otro instrumento.

## Extracción y evaluación

Para cada fuente se registrarán referencia APA 7, identificador persistente, país o contexto, objetivo, diseño, muestra o sistema, intervención o arquitectura, resultados, limitaciones, eje temático y uso permitido. La calidad metodológica se describirá con la herramienta que corresponda al diseño cuando sea necesario; no se combinarán calificaciones heterogéneas en un puntaje único.

La evidencia se integrará según cuatro funciones: antecedente individual, comparación del estado del arte, definición conceptual o delimitación normativa. Cada afirmación de alto riesgo conservará página o sección verificable. Los resultados nacionales se reportarán separados de la evidencia internacional; la ausencia de resultados solo podrá afirmarse para una fuente, periodo, cadena y fecha de búsqueda explícitos.

## Actualización del corpus

Una fuente aceptada como parte del corpus académico se incorporará a la bibliografía, manifiesto, ficha, matriz de afirmaciones y sección correspondiente del capítulo II antes de citarse. Las normas, estándares y fundamentos metodológicos externos al corpus se registrarán en la bibliografía, manifiesto, matriz de cobertura y `07_registro_fuentes_complementarias.md`, indicando su disponibilidad y alcance de uso. Los cambios del corpus académico deben volver a ejecutar `python documentacion_tesis/scripts/validar_fichas.py`.

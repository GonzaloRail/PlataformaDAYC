# Análisis del feedback de la asesora

## Alcance del análisis

Este documento contrasta el feedback general de `../FeedBackTesis.txt` con el tramo específico del proyecto, entre `58:19` y `1:09:10`, y con los capítulos de la tesis. Para este trabajo se adopta la estructura verbal indicada por la asesora: el capítulo III define la propuesta y las pruebas, el IV documenta la implementación y ejecución, y el V presenta resultados y discusión.

## Criterio central de la asesora

El objeto de esta investigación es la arquitectura distribuida. El instrumento DAYC-2 es solo el caso de prueba que permite instanciar actores, tareas y evidencias. Por tanto, la tesis debe demostrar con mecanismos y pruebas que la arquitectura es multi-actor, opera en tiempo casi real y conserva trazabilidad; no debe demostrar validez clínica, psicométrica ni eficacia del instrumento.

## Recomendaciones generales aplicables

| Tema | Criterio de la asesora | Aplicación al proyecto |
|---|---|---|
| Realidad problemática | Describir el problema, sus factores y contexto; no adelantar soluciones. | Mover del capítulo I hacia el III las decisiones de consistencia eventual, PostgreSQL, versión canónica, política de conflictos y mecanismos propuestos. |
| Actualidad de fuentes | Las afirmaciones sobre la situación problemática requieren evidencia reciente; las fuentes antiguas se reservan para fundamentos. | Mantener las fuentes recientes para la brecha y usar Lamport, Birman y otros fundamentos solo para conceptos. |
| Hipótesis | No usar “mejora significativa” sin comparación, grupos y prueba inferencial. | La formulación actual de cumplimiento de criterios técnicos es preferible; no cambiarla por una hipótesis de mejora. |
| Variables e indicadores | Todo indicador debe ser observable, medible y vincularse con técnica e instrumento. | Conservar `02_variables_indicadores.md` y resumir en el capítulo I una matriz de variable, indicador, técnica, instrumento y evidencia. |
| Viabilidad | Acreditar recursos técnicos, operativos y económicos realmente disponibles, no solo actividades previstas. | Declarar equipo, software, servidores, presupuesto, acceso o falta de acceso a participantes y permisos. No presentar como confirmada una muestra aún no autorizada. |
| Justificación | Explicar con redacción propia por qué la propuesta importa y qué ocurriría sin ella; evitar convertirla en revisión de literatura. | Reducir las citas en 1.7 y reforzar aporte, utilidad, diferenciación y consecuencias de no implementar la arquitectura. |
| Alcance | Declarar inclusiones y exclusiones explícitas. | El capítulo I cumple en gran medida; conservar la exclusión de diagnóstico, psicometría y despliegue clínico. |
| Tipo y nivel | Solo usar “experimental” si existe manipulación y comparación de grupos. | Mantener investigación aplicada/tecnológica, DSR y evaluación técnico-operativa; no denominarla experimental sin un diseño de grupos válido. |
| Antecedentes y estado del arte | Los antecedentes describen cada trabajo; el estado del arte compara tendencias, diferencias y vacíos. | La separación actual es adecuada y debe mantenerse: 2.1 describe, 2.2 compara. |
| Marco conceptual | Además de constructos, incluir las tecnologías y métricas que sostienen la propuesta. | Añadir definiciones breves de React, TypeScript, IndexedDB, REST, WebSocket, Django, PostgreSQL, Redis, Docker y telemetría. |
| Capítulo III | Presentar el esquema y detallar, por componente o etapa, cómo se construye: qué hace, qué se usa y por qué. Después describir la infraestructura que soporta la solución. | La estructura por componentes fue aceptada expresamente por la asesora, pero debe ganar detalle técnico verificable. |
| Capítulos IV y V | Redactar en pasado cuando las actividades ya se ejecutaron. El tramo específico indica pruebas en III, implementación y escenarios ejecutados en IV y resultados en V; V inicia describiendo y luego discutiendo frente al estado del arte. | Preparar evidencias reproducibles antes de redactar resultados y no completar tablas con valores simulados. |

## Evaluación de los capítulos actuales

### Capítulo I

**Fortalezas**

- El problema principal está formulado como pregunta y el objeto se delimita como arquitectura.
- Los objetivos, hipótesis y alcance excluyen diagnóstico automatizado, validación psicométrica y equivalencia de instrumentos.
- Las variables técnicas y los procedimientos de evaluación ya son mucho más concretos que lo pedido en el feedback.
- El tipo aplicado/tecnológico y el nivel evaluativo tecnológico evitan afirmar un diseño experimental sin grupos de comparación.

**Ajustes prioritarios**

1. La realidad problemática se corrigió para terminar en la brecha y no adelantar la solución seleccionada.
2. La viabilidad ya diferencia recursos disponibles y recursos pendientes; antes de la entrega final todavía se debe completar la tabla de hardware, costos, acceso, responsables y permisos.
3. La justificación se reformuló desde el aporte propio y se añadió una dimensión práctica explícita.
4. El capítulo incorporó una matriz resumida que vincula dimensiones e indicadores con técnicas, instrumentos y datos.

### Capítulo II

**Fortalezas**

- Los antecedentes presentan propósito, método, resultados, límites y transferencia de cada fuente.
- El estado del arte sí compara fuentes por ejes, evidencia, madurez, diferencias y vacío integrador; no es una repetición descriptiva de antecedentes.
- La brecha integrada coincide con el tema aprobado: continuidad offline, sincronización, multi-actor, evidencia multimodal, trazabilidad y cierre profesional.

**Ajuste prioritario**

El marco conceptual se complementó con cliente web, IndexedDB, API REST, WebSocket, PostgreSQL, Redis, Docker, telemetría, percentiles de latencia, carga, inyección de fallos y oráculos.

### Capítulo III

**Fortalezas**

- La organización por componentes fue validada explícitamente por la asesora en `1:00:17-1:01:47`.
- El esquema de actores, cliente, servicios, persistencia y revisión humana hace visible el alcance arquitectónico.
- La sincronización, la gestión de evidencias, la proveniencia y la gobernanza ya expresan mecanismos relevantes para diferenciar la tesis.

**Ajustes prioritarios**

1. El capítulo mantiene el detalle por componentes y añade un proceso de construcción por etapas con productos verificables.
2. La infraestructura tecnológica quedó en una sección propia posterior al desarrollo de componentes.
3. La evaluación prevista define escenarios E0-E9, objetivos, configuraciones, indicadores, técnicas e instrumentos.
4. Los marcadores de figuras todavía deberán reemplazarse por capturas reales anonimizadas o wireframes declarados como propuesta.
5. El estado de implementación y el fragmento de código se retiraron del capítulo III y se trasladaron al IV.
6. La separación adoptada es definitiva para estos archivos: III propuesta y validación prevista; IV implementación y ejecución; V resultados y discusión.

## Diferenciadores que deben aparecer en todo el trabajo

La asesora pidió enfatizar estas diferencias frente a otras arquitecturas multimodales:

1. Multi-actor: roles, permisos, contribuciones concurrentes, sincronización y revisión profesional.
2. Tiempo casi real: canal conectado, propagación medida, recuperación después de desconexión y diferenciación respecto de una notificación efímera.
3. Trazabilidad: relación verificable entre operación, actor, sesión, evidencia original, transformación, versión, revisión y decisión.

Cada diferenciador requiere tres elementos: mecanismo implementado, indicador medible y evidencia de prueba. Ejemplo: `operation_id` e inbox, tasa de efectos duplicados igual a cero y registro de una prueba de reenvío.

## Proyección de capítulos IV y V

### Capítulo IV: desarrollo, implementación y evaluación

El capítulo IV se creó en pasado y documenta la versión realmente observada: flujo multi-actor, control concurrente, cola local de evidencias, WebSocket, gobernanza, revisión e infraestructura. También declara las brechas y separa la cobertura preliminar de la evaluación confirmatoria pendiente.

### Capítulo V: resultados y discusión

El capítulo V se creó como estructura sin resultados inventados. Incluye tablas para continuidad, sincronización, desempeño, trazabilidad, multimodalidad, gobernanza y dictamen de hipótesis. La descripción de resultados quedó separada de la discusión comparativa con el capítulo II.

## Orden de trabajo recomendado

1. Corregir la frontera entre problema y solución en el capítulo I.
2. Completar la matriz visible de indicadores, técnicas e instrumentos y la viabilidad con recursos verificables.
3. Complementar el marco conceptual tecnológico del capítulo II.
4. Reemplazar figuras pendientes del capítulo III por evidencia visual identificada.
5. Completar los mecanismos pendientes y guardar evidencia reproducible en el capítulo IV.
6. Ejecutar la evaluación congelada y completar las tablas y discusión del capítulo V.

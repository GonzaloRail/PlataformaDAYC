# CAPÍTULO I: PLANTEAMIENTO DEL PROBLEMA

## 1.1 Descripción de la realidad problemática

Los procesos digitales en los que varios actores producen, modifican y revisan información desde dispositivos diferentes plantean un problema arquitectónico que no se resuelve únicamente mediante interfaces o formularios. La distribución introduce representaciones locales del estado, conectividad variable, eventos concurrentes y evidencias generadas en distintos momentos. En sistemas sanitarios *offline-first*, almacenar información localmente no garantizó que otros profesionales pudieran utilizarla durante la misma atención; el intercambio incremental de eventos nuevos o modificados mejoró cualitativamente la coordinación, aunque no resolvió por sí solo la medición de latencia o los conflictos concurrentes (Ashista et al., 2026).

La comunicación asíncrona desplaza complejidad hacia la identidad, entrega, orden y reproducción de eventos. Los reintentos pueden duplicar efectos, los eventos tardíos pueden producir transiciones incompatibles y la caída de un consumidor puede separar el acuse de recepción del efecto durable (Laigner et al., 2026). En consecuencia, una arquitectura multi-actor debe resolver explícitamente la identificación de operaciones, el control de versiones y precedencias, el registro de procesamiento y los conflictos. Sin estos mecanismos, el estado compartido y la explicación de una decisión posterior pueden resultar inconsistentes o incompletos.

La dependencia de infraestructura central también puede comprometer la continuidad. En evaluaciones controladas de arquitecturas móviles, los pipelines secuenciales dependientes de la nube presentaron cuellos de botella, pérdida de datos y suspensión de la aplicación, mientras una arquitectura modular con procesamiento local mantuvo su operación bajo las cargas ensayadas (Kim et al., 2026). Ese resultado depende del hardware, la red y la carga utilizados y no proporciona umbrales transferibles al presente estudio (Kim et al., 2026). Sí demuestra que continuidad, recuperación, latencia, pérdida y consumo de recursos son propiedades arquitectónicas mensurables.

La heterogeneidad de la información amplía el problema. Un flujo puede producir datos estructurados, eventos temporales, imágenes, audio, video y derivados obtenidos por segmentación, transcripción o extracción de características. Para conservar su significado se requiere distinguir actor, tarea, modalidad, original, transformación, versión y estado de calidad (Kalanadhabhatta et al., 2025). Asociar archivos con una misma sesión no demuestra alineación temporal, integridad ni disponibilidad; estas propiedades requieren referencias temporales, hashes, causas de ausencia y metadatos verificables (Geangu et al., 2023).

La fragmentación entre captura, transformación, revisión y resultado dificulta explicar cómo se produjo una salida. La proveniencia biomédica representa entidades, actividades, agentes y relaciones entre fuentes y transformaciones, y reconoce integridad, reproducibilidad, interoperabilidad, seguridad y trazabilidad como requisitos diferenciados (Gierend et al., 2024). En entornos distribuidos, los fragmentos pueden conectarse mediante identificadores compartidos y versiones preservadas sin sobrescribir estados anteriores (Wittner et al., 2022). Sin un modelo explícito, un registro de logs aislado no permite reconstruir de extremo a extremo la procedencia de una salida.

Los procesos multi-actor también requieren cierre operativo. La captura o la emisión de una alerta no acredita que exista recepción, asignación, revisión, decisión y siguiente acción. La falta de integración puede mantener información en silos o dejar reportes sin respuesta (Qureshi et al., 2026). Por tanto, la arquitectura debe representar tanto el ingreso de información como su recorrido posterior, respetando permisos y responsabilidades humanas.

La brecha identificada consiste en que las capacidades de operación local, sincronización, confiabilidad de eventos, gestión multimodal, proveniencia y cierre humano suelen implementarse o evaluarse por separado. En la muestra documental no se encontró una evaluación conjunta que permita establecer, bajo conectividad variable, concurrencia y fallos controlados, si una misma arquitectura conserva el progreso local, evita efectos duplicados, converge hacia un estado compartido, mantiene el linaje de las evidencias y documenta el cierre profesional. Por ello, el problema permanece abierto en el nivel de integración y comprobación técnico-operativa.

La realidad problemática no se atribuye a una institución concreta porque todavía no se ha ejecutado un diagnóstico organizacional autorizado. El dominio de evaluación digital infantil aporta un contexto sensible y multi-actor para observar el problema, pero no modifica su naturaleza arquitectónica ni convierte la validez de un instrumento en objeto de investigación.

## 1.2 Problema principal

¿En qué medida una arquitectura de software distribuida orientada a eventos cumple criterios técnicos y operativos predefinidos para sincronizar, conservar y trazar evidencias multimodales en un proceso digital multi-actor bajo conectividad variable y fallos controlados?

La pregunta delimita el resultado a la calidad técnico-operativa del artefacto. El tiempo real se entenderá como tiempo casi real o *soft real-time*: propagación oportuna durante conectividad disponible, medida por percentiles de latencia previamente definidos; no implica comunicación garantizada durante una partición. La convergencia se verificará cuando los nodos alcancen el estado canónico del servidor después de reconectar, vaciar las operaciones pendientes y concluir la ventana de recuperación. El caso de estudio permitirá instanciar y probar la arquitectura, pero no formará parte de la afirmación central ni se utilizará para sostener exactitud diagnóstica, equivalencia entre instrumentos o validez psicométrica.

## 1.3 Objetivos

Los objetivos articulan el diseño, implementación y evaluación del artefacto con las dimensiones técnicas expresadas en el problema. Los requisitos, fórmulas y umbrales se definirán antes de ejecutar las pruebas. Los resultados de arquitecturas y poblaciones diferentes servirán para seleccionar métricas y escenarios, pero no para imponer valores de aceptación ajenos al contexto experimental.

### 1.3.1 Objetivo principal

Diseñar, implementar y evaluar una arquitectura de software distribuida orientada a eventos, con sincronización multi-actor en tiempo casi real y un pipeline trazable de evidencias multimodales, para verificar por dimensión su continuidad, desempeño, consistencia, confiabilidad, integridad, trazabilidad y cierre humano documentado bajo escenarios controlados.

### 1.3.2 Objetivos específicos

1. Modelar los actores, responsabilidades, estados, eventos, evidencias e invariantes de un proceso digital multi-actor con producción de evidencias multimodales.
2. Diseñar la arquitectura distribuida y el modelo de sincronización para captura local, entrega durable, orden causal, idempotencia, resolución de conflictos y convergencia verificable.
3. Implementar los mecanismos de operación offline, sincronización, proveniencia, gestión de evidencias multimodales, gobernanza y cierre humano documentado.
4. Evaluar la calidad técnico-operativa del artefacto mediante pruebas funcionales, carga concurrente, inyección de fallos, reproducción de eventos y reconstrucción de trazas con datos sintéticos.
5. Determinar, por dimensión y escenario, el cumplimiento, incumplimiento o indeterminación de los criterios técnicos y operativos predefinidos.
6. Explorar separadamente la factibilidad operativa de la arquitectura con los actores autorizados del caso de estudio mediante observación e instrumentos aprobados.

## 1.4 Hipótesis de la investigación

### Hipótesis general

La arquitectura de software distribuida orientada a eventos alcanzará los criterios técnicos y operativos predefinidos para las dimensiones declaradas de continuidad, desempeño, consistencia, confiabilidad de eventos, integridad multimodal, proveniencia, linaje y cierre humano documentado, bajo los escenarios controlados que resulten aplicables.

### Criterio de evaluación

La investigación aplicará una verificación de ingeniería por criterios de aceptación, no una prueba de significancia ni una comparación causal con otra arquitectura. Cada indicador tendrá una fórmula, unidad, fuente de telemetría, escenario, criterio y regla de datos faltantes congelados antes de abrir los datos confirmatorios. Los resultados se informarán por dimensión como **cumple**, **no cumple**, **indeterminado** o **no aplicable preespecificado**.

Los invariantes de corrección serán no compensatorios: cero eventos confirmados perdidos, cero efectos de negocio duplicados, cero transiciones críticas inválidas, cero alteraciones silenciosas de originales, cero accesos indebidos exitosos y cero salidas finales sin la revisión requerida. Las dimensiones dependientes del entorno —latencia, tasa de error no crítico, throughput, recursos, recuperación, convergencia, disponibilidad multimodal y oportunidad de cierre— se evaluarán separadamente mediante criterios con procedencia independiente: manual autorizado, norma aplicable, requisito operativo local o presupuesto de infraestructura documentado. Si falta un criterio indispensable, la dimensión será indeterminada; un incumplimiento de desempeño se localizará por dimensión y escenario, sin ocultar ni invalidar los resultados de integridad o confiabilidad que sí se hayan verificado.

La calibración utilizará datos sintéticos separados para comprobar medibilidad, variabilidad, duración y repeticiones. No se usará para escoger valores que el artefacto ya cumpla. El protocolo técnico definitivo se congelará antes de la evaluación confirmatoria.

## 1.5 Variables e indicadores

La investigación evalúa una arquitectura de software y observa su calidad técnica y operativa bajo escenarios controlados. La descripción detallada de fórmulas, criterios, escenarios e instrumentos se desarrolla en los documentos metodológicos complementarios.

### 1.5.1 Variable independiente

La variable independiente es la **arquitectura de software distribuida orientada a eventos para sincronización multi-actor y trazabilidad de evidencias multimodales**. Esta arquitectura constituye el artefacto tecnológico que se diseñará e implementará.

| Componente | Descripción |
|---|---|
| Sincronización distribuida | Captura local, sincronización posterior, reintentos, idempotencia, control de versiones y convergencia del estado. |
| Gestión de evidencias | Conservación de evidencias originales, derivados versionados, metadatos de calidad y referencias temporales. |
| Proveniencia y linaje | Registro de fuentes, transformaciones, actores, versiones y relaciones que permiten reconstruir un resultado. |
| Gobernanza y cierre humano | Control de acceso, consentimiento, asentimiento, pausa, retiro, revisión y decisión profesional documentada. |

### 1.5.2 Variable dependiente

La variable dependiente es la **calidad técnica y operativa de la arquitectura** bajo escenarios controlados. Como referencia para la evaluación de calidad del producto se considera ISO/IEC 25010:2023 (International Organization for Standardization & International Electrotechnical Commission, 2023). Se observará mediante indicadores de continuidad, desempeño, consistencia, confiabilidad de eventos, integridad multimodal, trazabilidad, proveniencia y cierre humano documentado. La factibilidad con participantes se reportará por separado y no sustituirá la evaluación técnica.

| Dimensión | Indicadores principales |
|---|---|
| Continuidad y desempeño | Operación sin conexión, recuperación, latencia, tasa de error, throughput y uso de recursos. |
| Consistencia y confiabilidad | Convergencia, pérdida, duplicación, orden y conflictos. |
| Integridad y trazabilidad | Metadatos completos, conservación de originales, derivados verificables y reconstrucción del linaje. |
| Evidencia multimodal | Disponibilidad, calidad, ausencia documentada y alineación temporal cuando corresponda. |
| Cierre humano | Recepción, asignación, revisión, decisión y siguiente acción documentadas. |

La medición se operacionaliza mediante indicadores observables. La tabla siguiente resume su correspondencia con las técnicas e instrumentos; las fórmulas, unidades, escenarios y reglas de decisión se desarrollan en el protocolo metodológico.

| Dimensión | Indicadores | Técnica principal | Instrumento y dato obtenido |
|---|---|---|---|
| Continuidad y recuperación | `I01-I02` | Pruebas funcionales e inyección de fallos | Manifiesto externo, almacenamiento local, snapshots; porcentaje durable, porcentaje recuperado y tiempo de recuperación. |
| Desempeño y capacidad | `I03-I06` | Medición extremo a extremo, carga y perfilado | Telemetría de aplicación, red y recursos; percentiles de latencia, errores, eventos por segundo, CPU y memoria. |
| Consistencia y confiabilidad | `I07-I12` | Comparación de estado, replay y concurrencia | Oráculo, hashes, versiones y registro de conflictos; convergencia, pérdida, duplicación, orden y resolución. |
| Proveniencia e integridad | `I13-I19` | Validación de esquema, recorrido retrospectivo y verificación criptográfica | Manifiestos, grafo de linaje y hashes; completitud, reconstrucción, detección de huecos e integridad. |
| Evidencia multimodal | `I20-I25` | Captura controlada e inyección de defectos | Manifiesto esperado-observado, catálogo de calidad y reloj común; disponibilidad, calidad y alineación. |
| Revisión y cierre | `I26-I30` | Seguimiento de flujo y pruebas negativas | Telemetría de estados y lista de cierre; recepción, decisión, cierre y salidas sin revisión. |
| Autorización y gobernanza | `I31-I39` | Pruebas positivas/negativas y auditoría | Matriz de permisos, bitácoras y registros de consentimiento, pausa y retiro. |
| Factibilidad humana | `I41-I45` | Observación, encuesta y entrevista | Ficha de tareas, incidencias, SUS, comprensión y carga percibida; análisis separado de la hipótesis técnica. |

## 1.6 Viabilidad de la investigación

La viabilidad distingue los recursos ya disponibles de aquellos que todavía requieren confirmación. El prototipo, su código fuente y el entorno local permiten continuar el desarrollo y ejecutar pruebas con datos sintéticos. En cambio, la participación de personas, el despliegue institucional y la captura de datos sensibles permanecen condicionados a autorizaciones y recursos que todavía no deben darse por disponibles.

### 1.6.1 Viabilidad técnica

Se dispone de una base de software formada por un cliente web en React y TypeScript, servicios Django, una base PostgreSQL, comunicación mediante Django Channels y Redis, persistencia local basada en IndexedDB y contenedores para servicios de infraestructura. Estas tecnologías son de código abierto y pueden ejecutarse en el entorno de desarrollo disponible, por lo que no requieren adquirir licencias para construir y verificar el prototipo.

La disponibilidad de componentes no demuestra por sí sola la viabilidad de la arquitectura completa. Antes de la evaluación confirmatoria deberán documentarse el equipo utilizado, sistema operativo, versiones, capacidad de cómputo, almacenamiento, topología de red, perfiles de conectividad, respaldo y procedimientos para reproducir el entorno desde una base limpia.

La comprobación técnica incluirá escenarios de **1, 10, 25, 50 y 100 sesiones concurrentes simuladas**. Estos niveles son condiciones de ensayo propuestas y no representan demanda institucional observada ni capacidad ya alcanzada.

La configuración del hardware, perfiles de red, volumen sintético de evidencias, duración, repeticiones, infraestructura de despliegue, respaldo y requisitos institucionales de seguridad se documentarán antes de congelar el protocolo técnico.

### 1.6.2 Viabilidad operativa

La evaluación técnica es operativamente viable con datos sintéticos porque puede ejecutarse sin reclutar participantes y mediante guiones automatizados. Para esta etapa se dispone del código y de pruebas unitarias iniciales, pero todavía deben completarse la instrumentación, los generadores de carga, los inyectores de fallos, los oráculos y la matriz de evidencias.

La evaluación humana aún no puede declararse operativamente viable. Se proyecta un piloto con cinco díadas niño-cuidador y una aplicación posterior con 25 a 30 díadas y 3 a 5 profesionales autorizados, pero estas cantidades permanecen sujetas a justificación, acceso institucional, disponibilidad, consentimiento, asentimiento y aprobación ética. Si tales condiciones no se confirman, el contraste principal se limitará a la evaluación técnica con datos sintéticos y la dimensión humana se informará como no ejecutada.

### 1.6.3 Viabilidad económica

El desarrollo local utiliza tecnologías sin costo de licencia. Los costos no cubiertos por esa condición corresponden a equipo, energía, conectividad, almacenamiento y respaldo, posible despliegue, dispositivos de captura, capacitación, soporte y conservación de evidencias. El investigador puede asumir la etapa técnica local con los recursos disponibles; un piloto o despliegue externo requerirá un presupuesto y cotizaciones específicas antes de ser autorizado.

No se afirmará ahorro, rentabilidad o costo-efectividad. La versión final incorporará una tabla de recursos propios, recursos institucionales, costos unitarios, cantidades y fuente de cada estimación. Mientras esa tabla y las cotizaciones no estén cerradas, la viabilidad económica queda demostrada únicamente para el desarrollo y la evaluación técnica local.

### 1.6.4 Viabilidad legal y ética

La captura de información de menores y de evidencia potencialmente sensible solo será viable si el estudio obtiene la aprobación ética y la autorización institucional que correspondan antes del reclutamiento. La Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento vigente obligan a tratar los datos personales conforme a finalidad, proporcionalidad, seguridad y derechos del titular (Congreso de la República del Perú, 2011; Ministerio de Justicia y Derechos Humanos, 2024). El protocolo definirá consentimiento del representante legal, procedimiento de asentimiento, alcance por modalidad, seudonimización, cifrado en tránsito y reposo, control de acceso, retención, retiro, destrucción o conservación justificada y respuesta ante incidentes.

Estas condiciones son puertas de aptitud y no resultados a demostrar. La investigación no iniciará captura de audio, video ni otros datos humanos mientras no existan instrumentos aprobados, responsables de custodia, reglas de atención de incidentes y evidencia de los controles técnicos exigidos.

## 1.7 Justificación e importancia de la investigación

La investigación se justifica por la necesidad de integrar capacidades que suelen estudiarse por separado: operación con conectividad intermitente, sincronización entre actores, gestión de eventos, almacenamiento multimodal, reconstrucción de procedencia y cierre humano documentado. La contribución central consiste en construir y evaluar una arquitectura que preserve continuidad, consistencia, trazabilidad y auditabilidad. El instrumento autorizado para el caso de estudio delimitará actores, tareas, estados, datos y evidencias sin convertirse en el objeto de investigación.

### 1.7.1 Justificación

#### Justificación teórica

La investigación permitirá integrar en un mismo modelo arquitectónico conceptos que suelen tratarse de forma aislada: operación offline, sincronización orientada a eventos, consistencia, proveniencia, integridad multimodal y cierre humano. Su aporte teórico consistirá en delimitar las relaciones entre estas propiedades y expresar qué garantías pueden exigirse y medirse sin confundir transporte, persistencia, convergencia, trazabilidad y validez clínica.

#### Justificación práctica

La propuesta ofrecerá una forma concreta de identificar operaciones, conservar cambios durante desconexiones, coordinar aportes de varios actores y reconstruir el recorrido de una evidencia hasta una decisión documentada. Sin esta integración, una aplicación puede aparentar funcionamiento porque intercambia mensajes o almacena archivos, aunque pierda operaciones, repita efectos, oculte conflictos o no permita explicar el origen de una salida.

#### Justificación económica

El uso de componentes de código abierto reduce la dependencia de licencias para construir el prototipo. Además, medir almacenamiento, transferencia, procesamiento y soporte permitirá estimar los recursos que exige cada escenario antes de plantear un despliegue. El valor económico no se presentará como ahorro garantizado, sino como disponibilidad de información técnica para evitar decisiones de infraestructura sin medición.

#### Justificación metodológica

La investigación aportará un procedimiento reproducible para evaluar un artefacto distribuido: escenarios y corpus versionados, operaciones con identidad estable, oráculos independientes, inyección controlada de fallos, calibración separada de la evaluación confirmatoria y trazabilidad entre requisito, prueba y evidencia. Este enfoque permite informar tanto capacidades alcanzadas como incumplimientos localizados, sin sustituir resultados técnicos por percepciones de uso.

#### Justificación social

La arquitectura busca que la participación remota o distribuida no reduzca el control de las personas sobre la información que generan. El registro de autorización, pausa, retiro, revisión y siguiente acción puede hacer visible quién actuó, sobre qué evidencia y con qué consecuencia. Este aporte es especialmente relevante cuando intervienen menores, cuidadores y profesionales con responsabilidades distintas. La plataforma será un soporte para la coordinación y no un sustituto de la decisión profesional.

### 1.7.2 Importancia

La importancia radica en producir un artefacto capaz de coordinar información sensible bajo condiciones verificables. Su valor científico-tecnológico reside en tratar sincronización, consistencia, trazabilidad y revisión como propiedades medibles, en lugar de asumirlas como consecuencias automáticas de digitalizar formularios o incorporar comunicación en tiempo real.

La arquitectura permitirá estudiar desconexiones, reintentos, duplicación, desorden, concurrencia y recuperación, y determinar si un resultado puede reconstruirse hasta su evidencia original, transformaciones, versiones y responsables. Estas capacidades responden a problemas de proveniencia en los que integridad, interoperabilidad, rendimiento y auditabilidad deben vincularse con requisitos y pruebas (Gierend et al., 2024).

El instrumento de evaluación proporciona un escenario concreto de instanciación. La importancia de la tesis no se expresará como exactitud diagnóstica o equivalencia psicométrica, sino mediante indicadores técnicos y operativos de la arquitectura.

## 1.8 Alcance

La investigación comprenderá el diseño, implementación y evaluación técnico-operativa de una arquitectura distribuida para procesos digitales multi-actor con evidencias multimodales. La unidad de análisis será el comportamiento del artefacto y sus mecanismos de captura, sincronización, almacenamiento, proveniencia y cierre humano. La evaluación del desarrollo infantil funcionará como caso de estudio y no como unidad de análisis.

El ámbito espacial, la institución participante y el periodo de ejecución se definirán únicamente después de confirmar acceso, autorización institucional y aprobación ética. Hasta entonces, el alcance se limita al artefacto, a datos sintéticos para las pruebas técnicas y a una futura instanciación autorizada del caso.

Se incluyen en el alcance:

1. Modelado de participante, facilitador, revisor, custodio y servicios automáticos, junto con estados, eventos, tareas y transiciones; el caso podrá instanciarlos como niño, cuidador y profesional.
2. Captura local de datos estructurados y evidencias digitales autorizadas por el protocolo.
3. Operación conectada, intermitente y sin conexión, con sincronización posterior.
4. Identificación de eventos, reintentos, idempotencia, control de versiones y convergencia.
5. Conservación diferenciada de originales y derivados con metadatos de procedencia y calidad.
6. Reconstrucción desde un resultado hasta fuentes, transformaciones y responsables.
7. Revisión profesional, diferimiento y escalamiento cuando exista incertidumbre o evidencia insuficiente, como ocurre en flujos de teleevaluación que mantienen la decisión bajo responsabilidad profesional (Gangi et al., 2025; Torres-Escobar et al., 2025).
8. Registro trazable de consentimiento, asentimiento, pausa, retiro y acceso autorizado.
9. Pruebas funcionales, integración, carga, desconexión, reconexión, recuperación y trazabilidad.
10. Medición de latencia, tasa de error, throughput, uso de recursos, convergencia, pérdida, duplicación, desorden, conflictos, recuperación y completitud.
11. Estimación del costo de desarrollo y operación mediante mediciones, supuestos y cotizaciones propias.

De manera preliminar, la multimodalidad abarcará respuestas estructuradas, eventos de interacción, capturas de pantalla o imágenes y, únicamente en las actividades y condiciones autorizadas, audio o video. Cada modalidad seleccionada deberá definir formato, origen temporal, metadatos de calidad, transformaciones permitidas y tratamiento de ausencias. La alineación temporal se evaluará como indicador secundario solo para corrientes que compartan una referencia temporal definida en el protocolo.

Se excluyen del alcance:

1. Diagnóstico automatizado de alteraciones del neurodesarrollo.
2. Sustitución del profesional responsable de interpretar la información.
3. Decisiones clínicas, derivaciones o recomendaciones automáticas sin revisión humana.
4. Validación psicométrica, modificación de normas o equivalencia del instrumento de prueba con otros instrumentos.
5. Evaluación de sensibilidad, especificidad o precisión diagnóstica del instrumento de prueba.
6. Inferencia automática de consentimiento, asentimiento o disenso desde audio, video o gestos.
7. Modalidades o sensores no seleccionados y autorizados expresamente en el protocolo.
8. Certificación como dispositivo médico o validación jurídica integral de la plataforma.
9. Despliegue poblacional, adopción institucional definitiva o generalización clínica.
10. Afirmación anticipada de beneficios económicos, sociales o clínicos.

## 1.9 Línea, tipo y nivel de la investigación

La investigación se desarrolla mediante Design Science Research (DSR): identifica un problema técnico, define objetivos de solución, diseña y desarrolla un artefacto, lo demuestra en un caso de estudio, lo evalúa bajo escenarios controlados y comunica sus resultados. Este ciclo es coherente con la construcción y evaluación de artefactos de sistemas de información propuesta por Hevner et al. (2004) y Peffers et al. (2007). Su denominación institucional definitiva deberá ajustarse al reglamento y las líneas reconocidas por la universidad.

### 1.9.1 Línea de la investigación

Preliminarmente, la investigación se ubica en **ingeniería de software y sistemas de información**, específicamente en arquitecturas distribuidas, sincronización multi-actor, operación tolerante a conectividad intermitente y trazabilidad de evidencias digitales. El dominio de salud corresponde al contexto de instanciación; el objeto central es la arquitectura de software y no la validación psicométrica del instrumento utilizado en el caso.

Las arquitecturas modulares con procesamiento local pueden evaluarse mediante latencia, continuidad, recursos y pérdida bajo carga (Kim et al., 2026), mientras la proveniencia por elemento permite registrar fuentes, transformaciones, versiones, responsables y tiempos, además de medir rendimiento y completitud (Gierend et al., 2023). En plataformas pediátricas también se requieren coordinación familiar-profesional, vistas por rol, sincronización y conservación de acciones (Amed et al., 2025).

La denominación se verificará contra el catálogo oficial de líneas de investigación antes de la versión final.

### 1.9.2 Tipo de la investigación

Se propone clasificarla como **investigación aplicada y tecnológica**, desarrollada mediante DSR, porque busca resolver un problema técnico-operativo mediante la construcción y evaluación de un artefacto. Tendrá enfoque predominantemente cuantitativo al medir latencia, convergencia, disponibilidad, pérdida, duplicación, recuperación, completitud y carga. Incorporará de manera complementaria experiencia de usuario con cuidadores y psicólogos mediante instrumentos aprobados. Cuestionarios, entrevistas y métricas de experiencia se han utilizado en evaluaciones de plataformas pediátricas (Amed et al., 2025; McElwain et al., 2024).

La equivalencia entre esta clasificación y la terminología institucional se confirmará con el reglamento vigente.

### 1.9.3 Nivel de la investigación

Se propone un **nivel evaluativo tecnológico**, orientado a verificar el comportamiento del artefacto bajo condiciones controladas y su cumplimiento de requisitos y umbrales. Se examinarán conexión estable, degradación, desconexión, reconexión y convergencia; también eventos duplicados, perdidos, tardíos o desordenados, porque la comunicación asíncrona introduce dificultades de entrega, repetición y recuperación (Laigner et al., 2026). La dimensión multimodal comprobará marcas temporales, correspondencia entre corrientes e intervalos no utilizables (Geangu et al., 2023).

La equivalencia con los niveles reconocidos por el reglamento institucional se confirmará antes de la versión final.

## 1.10 Técnicas e instrumentos de recolección de información

Las técnicas e instrumentos se organizarán en dos ámbitos: evaluación técnica del software y evaluación operativa con participantes. Los resultados de carga simulada no se mezclarán con los del piloto ni con los de usuarios reales.

### 1.10.1 Técnicas

1. **Análisis documental:** revisión de antecedentes arquitectónicos, requisitos, documentación oficial del instrumento seleccionado para el caso, reglamento institucional y normativa aplicable.
2. **Observación estructurada:** registro de finalización de tareas, incidencias, ayuda requerida, comprensión de estados y capacidad para detener o reanudar durante el piloto y la evaluación de factibilidad.
3. **Encuesta:** recogida de valoraciones estructuradas de cuidadores y profesionales mediante SUS u otro instrumento institucional aprobado. SUS se ha utilizado en pilotos de plataformas pediátricas, pero no constituye una medida de eficacia clínica (Amed et al., 2025).
4. **Entrevista semiestructurada:** exploración de la percepción sobre claridad, carga, privacidad, continuidad y revisión profesional. Entrevistas y cuestionarios han permitido identificar problemas de comodidad y control de captura en tecnologías infantiles (McElwain et al., 2024).
5. **Observación automatizada e inspección de registros:** recolección de marcas temporales, identificadores, versiones, uso de recursos, errores, reintentos y estados mediante telemetría y logs. La proveniencia por elemento permitirá reconstruir fuentes, transformaciones y responsables (Gierend et al., 2023).

#### Procedimientos de evaluación técnica

1. **Pruebas unitarias y de integración:** validación de estados, identificadores, versiones, permisos, persistencia local, reintentos e intercambio entre clientes, API, sincronización, almacenamiento, pipeline y revisión. La cobertura de código ha sido utilizada para verificar componentes de proveniencia (Gierend et al., 2023).
2. **Sincronización y reconexión:** medición propia de propagación, reconexión, convergencia y recuperación bajo perfiles de red controlados. Kim et al. (2026) sustentan el uso de ensayos controlados y métricas de continuidad, latencia, pérdida y recursos, pero no evaluaron este procedimiento específico de desconexión y reconexión.
3. **Idempotencia, pérdida, duplicación y orden:** reenvío, omisión, retraso y desorden deliberado para comprobar que no se dupliquen efectos y que los faltantes sean detectables (Laigner et al., 2026).
4. **Concurrencia y carga:** generación de 1, 10, 25, 50 y 100 sesiones simuladas, midiendo latencia, errores, recursos e integridad. Los datos serán sintéticos y no corresponderán a niños (Kim et al., 2026; Gierend et al., 2023).
5. **Reconstrucción de trazas:** recorrido retrospectivo desde resultados hasta evidencia, actor, dispositivo, tarea, versión y transformación; los intervalos no utilizables permanecerán registrados (Geangu et al., 2023).
6. **Permisos y gobernanza:** verificación positiva y negativa de roles, consentimiento, asentimiento, pausa, retiro y revocación. La separación de identificadores y el acceso autorizado aparecen en plataformas pediátricas comparables (Modi et al., 2023; Amed et al., 2025).

### 1.10.2 Instrumentos

1. Matriz de requisitos, indicadores y trazas.
2. Plan y registro de pruebas unitarias.
3. Guion de pruebas de integración.
4. Guion de desconexión y reconexión.
5. Generador de eventos y carga concurrente.
6. Registro de idempotencia y consistencia.
7. Sistema de telemetría y análisis de logs.
8. Lista de comprobación de trazabilidad.
9. Matriz de permisos por rol.
10. Lista de comprobación de consentimiento, asentimiento, pausa y retiro. El asentimiento se tratará como proceso continuo y revocable (Mirabella et al., 2025).
11. Ficha de observación del piloto.
12. Cuestionario de usabilidad o instrumento institucional aprobado.
13. Guía de entrevista semiestructurada.
14. Ficha de incidencias y desviaciones del protocolo.

Las fichas técnicas, criterios de puntuación, validez de contenido y correspondencia con variables se elaborarán antes de la recolección definitiva. Los instrumentos propios serán revisados por expertos y no se presentarán como escalas validadas antes de completar ese procedimiento.

## 1.11 Base para el cronograma

El cronograma se estructurará por fases y dependencias, sin asignar fechas hasta conocer el calendario académico, plazos éticos, disponibilidad institucional y acceso efectivo a participantes.

| Hito | Actividades principales | Producto o criterio de cierre |
|---|---|---|
| 1. Cierre documental | Revisar reglamento, líneas, clasificación metodológica, documentación del caso y normativa aplicable | Clasificación y marco documental confirmados |
| 2. Especificación metodológica | Precisar variables, fórmulas, unidades, invariantes, reglas de agregación y método de calibración | Protocolo técnico v1 preespecificado |
| 3. Diseño técnico | Modelar actores, estados, eventos, permisos, sincronización y procedencia | Arquitectura y trazabilidad revisadas |
| 4. Implementación | Desarrollar captura local, sincronización, almacenamiento, pipeline, revisión y telemetría | Prototipo integrado |
| 5. Verificación y calibración | Ejecutar pruebas unitarias e integración, corregir defectos y estimar variabilidad con datos sintéticos | Versión estable, `TBD` técnicos completados y protocolo v2 congelado |
| 6. Evaluación técnica confirmatoria | Probar reconexión, idempotencia, pérdida, duplicación, concurrencia, trazabilidad, permisos y carga sin modificar criterios | Informe de cumplimiento de umbrales predefinidos |
| 7. Instrumentos y permisos | Revisar instrumentos y obtener autorizaciones académicas, institucionales y éticas | Protocolo autorizado |
| 8. Piloto | Aplicar el protocolo a cinco díadas niño-cuidador | Informe de factibilidad e incidencias |
| 9. Ajustes de campo | Corregir instrumentos e instrucciones; cualquier cambio funcional obliga a repetir verificación técnica | Protocolo de campo v2 congelado |
| 10. Aplicación principal | Trabajar con 25-30 díadas y 3-5 psicólogos o profesionales autorizados, sujeto a confirmación | Base técnica y operativa cerrada |
| 11. Análisis | Calcular indicadores, reconstruir trazas y analizar instrumentos | Resultados técnicos y humanos separados |
| 12. Redacción y cierre | Interpretar resultados y verificar coherencia metodológica | Informe final y anexos reproducibles |

El piloto y la muestra posterior son una propuesta metodológica propia, no tamaños derivados de los artículos. La actividad con participantes no comenzará antes de contar con permisos, instrumentos revisados, protocolo ético y una versión técnicamente estable. Estos hitos expresan el cronograma académico y se vinculan con las fases técnicas detalladas del plan maestro mediante sus productos de cierre, no por equivalencia numérica.

## REFERENCIAS BIBLIOGRÁFICAS

Amed, S., Pinkney, S., Abdulhussein, F. S., Virani, A., Zachariuk, C., Tamana, S. K., Muralidharan, S., Görges, M., Barrett, B., van Rooij, T., Borycki, E. M., Kushniruk, A., Longstaff, H., Virani, A., Wasserman, W. W., & TrustSphere Collaborative. (2025). Caregiver experiences of an integrative patient-centered digital health application for pediatric type 1 diabetes care: Findings from a pilot clinical trial. *PLOS Digital Health, 4*(10), e0000861. https://doi.org/10.1371/journal.pdig.0000861

Ashista, H., Comas, A. S., Selby, T., Essar, M. Y., Alawa, J., Al-Hajj, S., & Nelson, E. (2026). An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study. *PLOS Digital Health, 5*(2), e0001204. https://doi.org/10.1371/journal.pdig.0001204

Cejudo, A., Tellechea, Y., Calvo, A., Almeida, A., Martín, C., & Beristain, A. (2025). Scalable big data platform with end-to-end traceability for health data monitoring in older adults: Development and performance evaluation. *JMIR Medical Informatics, 13*(1), e81701. https://doi.org/10.2196/81701

Congreso de la República del Perú. (2011). *Ley N.° 29733, Ley de Protección de Datos Personales*.

Gangi, D. N., Corona, L., Wagner, L., Weitlauf, A., Warren, Z., & Ozonoff, S. (2025). In-home tele-assessment for autism in toddlers: Validity, reliability, and caregiver satisfaction with the TELE-ASD-PEDS. *Journal of Developmental and Behavioral Pediatrics, 46*(3), e261-e268. https://doi.org/10.1097/DBP.0000000000001358

Geangu, E., Smith, W. A. P., Mason, H. T., Martinez-Cedillo, A. P., Hunter, D., Knight, M. I., Liang, H., del Carmen Garcia de Soria Bazan, M., Tse, Z. T. H., Rowland, T., Corpuz, D., Hunter, J., Singh, N., Vuong, Q. C., Abdelgayed, M. R. S., Mullineaux, D. R., Smith, S., & Muller, B. R. (2023). EgoActive: Integrated wireless wearable sensors for capturing infant egocentric auditory-visual statistics and autonomic nervous system function 'in the wild'. *Sensors, 23*(18), 7930. https://doi.org/10.3390/s23187930

Gierend, K., Krüger, F., Genehr, S., Hartmann, F., Siegel, F., Waltemath, D., Ganslandt, T., & Zeleke, A. A. (2024). Provenance information for biomedical data and workflows: Scoping review. *Journal of Medical Internet Research, 26*(1), e51297. https://doi.org/10.2196/51297

Gierend, K., Waltemath, D., Ganslandt, T., & Siegel, F. (2023). Traceable research data sharing in a German medical data integration center with FAIR-geared provenance implementation: Proof-of-concept study. *JMIR Formative Research, 7*(1), e50027. https://doi.org/10.2196/50027

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75-105. https://doi.org/10.2307/25148625

International Organization for Standardization & International Electrotechnical Commission. (2023). *ISO/IEC 25010:2023 systems and software engineering - Systems and software quality requirements and evaluation (SQuaRE) - Product quality model*. https://www.iso.org/standard/78176.html

Kalanadhabhatta, M., Rahman, T., Grabell, A. S., & Ganesan, D. (2025). Tandem: At-home behavior assessment using multimodal signals from the parent-child dyad. *Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, 9*(4), Article 182, 1-25. https://doi.org/10.1145/3770705

Ke, J. C., Hayati Rezvan, P., Vanderbilt, D., Mirzaian, C. B., Deavenport-Saman, A., & Smith, B. A. (2024). Similar early intervention referral rates following in-person administration of the Bayley Scales of Infant and Toddler Development, 4th Edition versus telehealth administration of the Developmental Assessment of Young Children, 2nd Edition in the high-risk infant population. *Early Human Development, 190*, 105971. https://doi.org/10.1016/j.earlhumdev.2024.105971

Kim, I., Robinson, T. N., Reeves, B. B., Haber, N., & Ram, N. (2026). Software reference architecture for real-time mobile digital phenotyping: Evaluation of system designs. *JMIR Formative Research, 10*(1), e87320. https://doi.org/10.2196/87320

La Valle, C., Johnston, E., & Tager-Flusberg, H. (2022). A systematic review of the use of telehealth to facilitate a diagnosis for children with developmental concerns. *Research in Developmental Disabilities, 127*, 104269. https://doi.org/10.1016/j.ridd.2022.104269

Laigner, R., Almeida, A. C., Assunção, W. K. G., & Zhou, Y. (2026). An empirical study on challenges of event management in microservice architectures. *ACM Transactions on Software Engineering and Methodology, 35*(8), Article 245, 1-62. https://doi.org/10.1145/3776581

McElwain, N. L., Fisher, M. C., Nebeker, C., Bodway, J. M., Islam, B., & Hasegawa-Johnson, M. (2024). Evaluating users' experiences of a child multimodal wearable device: Mixed methods approach. *JMIR Human Factors, 11*(1), e49316. https://doi.org/10.2196/49316

Medhi, K., Ahmed, N., & Hussain, M. I. (2022). Dew-based offline computing architecture for healthcare IoT. *ICT Express, 8*(3), 371-378. https://doi.org/10.1016/j.icte.2021.09.005

Ministerio de Justicia y Derechos Humanos. (2024). *Decreto Supremo N.° 016-2024-JUS, Reglamento de la Ley N.° 29733, Ley de Protección de Datos Personales*.

Mirabella, A. M., Berson, I. R., & Berson, M. J. (2025). Empowering voices: Implementing ethical practices for young children's assent in digital research. *Education Sciences, 15*(5), 571. https://doi.org/10.3390/educsci15050571

Modi, N., Ribas, R., Johnson, S., Lek, E., Godambe, S., Fukari-Irvine, E., Ogundipe, E., Tusor, N., Das, N., Udayakumaran, A., Moss, B., Banda, V., Ougham, K., Cornelius, V., Arasu, A., Wardle, S., Battersby, C., & Bravery, A. (2023). Pilot feasibility study of a digital technology approach to the systematic electronic capture of parent-reported data on cognitive and language development in children aged 2 years. *BMJ Health & Care Informatics, 30*(1), e100781. https://doi.org/10.1136/bmjhci-2023-100781

Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). A design science research methodology for information systems research. *Journal of Management Information Systems, 24*(3), 45-77. https://doi.org/10.2753/MIS0742-1222240302

Qureshi, A. R., Flegg, K., Siddiqui, A., Tao, B. K., & Gallie, B. (2026). Enhancing circle-of-care communication in pediatric cancer through digital health technologies: A scoping review. *Pediatric Blood & Cancer, 73*(1), e32106. https://doi.org/10.1002/pbc.32106

Ramanarayanan, V. (2024). Multimodal technologies for remote assessment of neurological and mental health. *Journal of Speech, Language, and Hearing Research, 67*(11), 4233-4245. https://doi.org/10.1044/2024_JSLHR-24-00142

Rodrigues, V. F., da Rosa Righi, R., da Costa, C. A., Zeiser, F. A., Eskofier, B., Maier, A., & Kim, D. (2023). Digital health in smart cities: Rethinking the remote health monitoring architecture on combining edge, fog, and cloud. *Health and Technology, 13*(3), 449-472. https://doi.org/10.1007/s12553-023-00753-3

Sax, U., Henke, C., Dräger, C., Bender, T., Kuntz, A., Golebiewski, M., Ulrich, H., & Löbe, M. (2023). Provenance core data set: A minimal information model for data provenance in biomedical research. *Proceedings of the Conference on Research Data Infrastructure, 1*. https://doi.org/10.52825/cordi.v1i.347

Sembay, M. J., de Macedo, D. D. J., Júnior, L. P., Braga, R. M. M., & Sarasa-Cabezuelo, A. (2023). Provenance data management in health information systems: A systematic literature review. *Journal of Personalized Medicine, 13*(6), 991. https://doi.org/10.3390/jpm13060991

Torres-Escobar, I. R., Villasís-Keever, M. A., Zapata-Tarrés, M. M., Hernández-Trejo, L. A., Delaflor-Wagner, C. A., & Rizzoli-Córdoba, A. (2025). Validity of administering the child development evaluation test through telemedicine to children aged 18-72 months. *Boletín Médico del Hospital Infantil de México, 82*(Suppl. 1), 52-58. https://doi.org/10.24875/BMHIM.24000163

Wild, C. E. K., Rawiri, N. T., Taiapa, K., & Anderson, Y. C. (2023). In safe hands: Child health data storage, linkage and consent for use. *Health Promotion International, 38*(6), daad159. https://doi.org/10.1093/heapro/daad159

Wittner, R., Mascia, C., Gallo, M., Frexia, F., Müller, H., Plass, M., Geiger, J., & Holub, P. (2022). Lightweight distributed provenance model for complex real-world environments. *Scientific Data, 9*(1), 503. https://doi.org/10.1038/s41597-022-01537-6

Zhang, Q. (2023). A web-based synchronized architecture for collaborative dynamic diagnosis and therapy planning. *IEEE Access, 11*, 421-437. https://doi.org/10.1109/ACCESS.2022.3232275

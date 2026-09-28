# Matriz de cobertura de los capítulos I y II

## Propósito y criterio de uso

Esta matriz vincula la estructura de la plantilla institucional con 49 fichas de evidencia del corpus académico y seis fuentes complementarias registradas. Su función es guiar la redacción y evitar tres errores: atribuir a una fuente resultados que no reporta, usar publicaciones anteriores a 2021 como antecedentes recientes y convertir el instrumento del caso en el problema de investigación.

**Tema de trabajo:** Arquitectura de software distribuida orientada a eventos para sincronización multi-actor en tiempo real y trazabilidad de evidencias multimodales.

**Reglas de redacción:**

- Las referencias `Sxx` son identificadores internos; en la tesis se usarán citas APA 7.
- Las páginas corresponden a los marcadores `## Página N` del corpus convertido.
- La evaluación digital del desarrollo infantil es un contexto de instanciación reemplazable y no el problema de investigación.
- Los resultados de instrumentos o poblaciones específicas sustentan requisitos técnicos y operativos, no validez clínica de la arquitectura.
- Las formulaciones de problema, objetivos, hipótesis y variables incluidas aquí son propuestas de trabajo que deberán mantener consistencia entre sí.

## Matriz maestra por fuente

### Convenciones

La columna **Cobertura** usa los siguientes códigos:

- `RP`: realidad problemática.
- `ANT`: antecedentes.
- `EA`: estado del arte.
- `MC`: marco conceptual.
- `REQ`: requisitos.
- `ARQ`: arquitectura.
- `VAR`: variables.
- `IND`: indicadores.
- `VIA`: viabilidad.
- `ETI`: ética.
- `VAL`: validación.

Una fuente puede cumplir más de una función documental. `Antecedente reciente` se reserva para publicaciones de 2022-2026; las ocho publicaciones anteriores se clasifican como fundamentos. Las revisiones de alcance, panorámicas y del estado del arte se distinguen de las revisiones sistemáticas para no sobredimensionar su método.

| ID | Año | Categoría | Función documental | Naturaleza de la evidencia | Cobertura | Uso previsto en la tesis |
|---|---:|---|---|---|---|---|
| S01 | 2020 | Arquitectura y offline-first | Fundamento teórico; evidencia empírica; fuente metodológica | Marco EDC y despliegues de campo | RP, MC, REQ, ARQ, VIA, VAL | Fundamentar captura offline, auditoría y evaluación operativa en campo. |
| S02 | 2026 | Arquitectura y offline-first | Antecedente reciente; evidencia empírica; fuente metodológica | Comparación controlada de arquitecturas | RP, ANT, EA, REQ, ARQ, VAR, IND, VIA, VAL | Sustentar procesamiento edge y métricas de latencia, fidelidad, continuidad y recursos. |
| S05 | 2026 | Arquitectura y offline-first | Antecedente reciente; evidencia empírica; caso comparable | Estudio mixto de factibilidad | RP, ANT, EA, REQ, ARQ, VIA, VAL | Sustentar eventos incrementales, operación offline y problemas reales de sincronización multi-actor. |
| S06 | 2023 | Arquitectura y sincronización | Antecedente reciente; evidencia empírica; caso comparable | Prototipo con evaluación técnica | RP, ANT, EA, REQ, ARQ, IND, VIA, VAL | Sustentar WebSocket, difusión de eventos y coordinación profesional en tiempo real. |
| S07 | 2013 | Arquitectura distribuida | Fundamento teórico; evidencia empírica | Arquitectura multidispositivo y experimento | MC, REQ, ARQ, VAR, IND, VAL | Fundamentar CAP, disponibilidad, consistencia eventual y pruebas de rendimiento. |
| S08 | 2023 | Edge, fog y cloud | Antecedente reciente; evidencia empírica | Arquitectura y validación preliminar | RP, ANT, EA, MC, REQ, ARQ, VIA, VAL | Sustentar separación por capas, colas, procesamiento cercano y localización distribuida. |
| S09 | 2024 | Proveniencia | Antecedente reciente; revisión de alcance; fuente metodológica | Síntesis de 66 estudios | RP, ANT, EA, MC, REQ, VAR, IND, VAL | Definir panorama, requisitos, modelos predominantes y vacíos de granularidad y escalabilidad. |
| S10 | 2023 | Proveniencia en salud | Antecedente reciente; revisión sistemática; fuente metodológica | Síntesis de 17 estudios | RP, ANT, EA, MC, REQ, VAR, IND, ETI, VAL | Definir dimensiones de almacenamiento, trazabilidad, confidencialidad, integridad y auditabilidad. |
| S11 | 2023 | Metadatos de proveniencia | Antecedente reciente; fundamento teórico; fuente metodológica | Modelo mínimo conceptual | ANT, EA, MC, REQ, VAR, IND | Definir metadatos mínimos de origen, versión, responsables, estado, exactitud y dependencias. |
| S12 | 2022 | Proveniencia distribuida | Antecedente reciente; evidencia empírica; fuente metodológica | Modelo y demostración en pipeline multiinstitucional | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, VAL | Sustentar bundles inmutables, conectores, navegación distribuida, huecos y versionado. |
| S13 | 2023 | Proveniencia interoperable | Antecedente reciente; evidencia empírica; fuente metodológica | Prueba de concepto evaluada | ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, VAL | Sustentar captura híbrida, W3C PROV/FHIR, consultas, tiempo, espacio y cobertura. |
| S14 | 2014 | Proveniencia interoperable | Fundamento teórico; evidencia empírica; fuente metodológica | Arquitectura biomédica y evaluación | EA, MC, REQ, ARQ, IND, VAL | Fundamentar captura automática/manual, interoperabilidad y compromiso de granularidad. |
| S15 | 2017 | Proveniencia en salud | Fundamento teórico | Artículo conceptual | RP, EA, MC, REQ, ETI | Distinguir trazabilidad, auditabilidad, reproducibilidad y aprendizaje a partir de datos de salud. |
| S16 | 2025 | Pipeline trazable | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Plataforma y evaluación de rendimiento | RP, ANT, EA, REQ, ARQ, VAR, IND, VIA, VAL | Sustentar capas bronce-plata-oro, versionado de datos/modelos, carga, latencia y recuperación. |
| S17 | 2020 | Pipeline multimodal | Fundamento teórico; evidencia empírica; caso comparable | Plataforma de biobanco digital | EA, MC, REQ, ARQ, IND, VIA, VAL | Fundamentar orquestación y versionado de datos multimodales sin extrapolar el dominio clínico. |
| S18 | 2020 | Evidencia multimodal infantil | Fundamento teórico; evidencia empírica; caso comparable; fuente metodológica | Piloto de teleevaluación domiciliaria | RP, EA, MC, REQ, IND, VIA, ETI, VAL | Fundamentar captura remota asistida, segmentación por tarea, pérdida de datos y consenso humano. |
| S19 | 2025 | Evidencia multimodal multi-actor | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Estudio domiciliario de díadas | RP, ANT, EA, MC, REQ, VAR, IND, VIA, ETI, VAL | Sustentar identidad por actor/fase, audio y fisiología, transformaciones y calidad faltante. |
| S22 | 2024 | Tecnologías multimodales | Antecedente reciente; fundamento teórico; revisión panorámica | Revisión narrativa tecnológica | RP, ANT, EA, MC, REQ, ARQ, VIA, ETI | Definir fuente frente a modalidad derivada, complementariedad, robustez y controles de captura. |
| S23 | 2023 | Registro multifuente | Antecedente reciente; evidencia empírica; caso comparable | Sistema por capas evaluado | RP, ANT, EA, MC, REQ, ARQ, IND, VIA, VAL | Sustentar persistencia híbrida, roles e integración de resultados estructurados y archivos originales. |
| S24 | 2025 | Plataforma multimodal | Antecedente reciente; caso comparable | Propuesta de plataforma | RP, ANT, EA, MC, REQ, ARQ, IND, VAL | Sustentar línea temporal común y revisión multivista, indicando que aún no existe validación integral. |
| S25 | 2023 | Coordinación multi-actor | Antecedente reciente; evidencia empírica; caso comparable | Piloto de captura parental | RP, ANT, EA, REQ, ARQ, VAR, IND, VIA, ETI, VAL | Sustentar consentimiento, recordatorios, seudonimización, transferencia y tasas de finalización. |
| S26 | 2022 | Teleevaluación infantil | Antecedente reciente; fundamento teórico; caso comparable | Modelo clínico-operativo | RP, ANT, EA, MC, REQ, VIA, ETI, VAL | Sustentar triaje, selección de modalidad, fidelidad, revisión profesional y escalamiento. |
| S27 | 2026 | Círculo de cuidado | Antecedente reciente; revisión de alcance; fuente metodológica | Síntesis de 28 estudios | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, VAL | Sustentar entradas multi-actor, tableros, alertas, integración clínica y cierre documentado. |
| S28 | 2025 | Plataforma colaborativa | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Piloto mixto | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, ETI, VAL | Sustentar app/tablero por roles, API/FHIR, sincronización, trazas, SUS y experiencia de usuario. |
| S29 | 2019 | Salud digital síncrona | Fundamento teórico; revisión de alcance | Síntesis de tecnologías pediátricas | RP, EA, MC, REQ, VIA, ETI, VAL | Fundamentar atención síncrona, soporte técnico y dimensiones de factibilidad. |
| S31 | 2025 | Evaluación infantil digital | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Validación longitudinal | RP, ANT, EA, MC, REQ, VAR, IND, VIA, VAL | Sustentar administración offline, eventos granulares, supervisión y separación de métricas clínicas y técnicas. |
| S32 | 2022 | Teleevaluación infantil | Antecedente reciente; revisión sistemática; fuente metodológica | Síntesis de nueve estudios | RP, ANT, EA, MC, REQ, VIA, VAL | Sustentar patrones síncrono y store-and-forward, calidad de evidencia y límites de teleevaluación. |
| S33 | 2025 | Teleevaluación y revisión | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Validación domiciliaria | RP, ANT, EA, MC, REQ, VAR, IND, VIA, ETI, VAL | Sustentar cuidador guiado, diferimiento, adjudicación, concordancia y problemas técnicos. |
| S36 | 2020 | Ética digital infantil | Fundamento teórico; revisión de alcance | Síntesis ética | RP, EA, MC, REQ, VAR, IND, ETI, VAL | Fundamentar consentimiento continuo, privacidad, reidentificación, derechos y diseño participativo. |
| S38 | 2023 | Custodia y consentimiento | Antecedente reciente; evidencia empírica; caso comparable | Estudio cualitativo | RP, ANT, EA, MC, REQ, VAR, IND, VIA, ETI, VAL | Sustentar autorización contextual, finalidad, custodio, renovación y derecho a retiro. |
| S39 | 2025 | Asentimiento infantil | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Síntesis cualitativa de casos | RP, ANT, EA, MC, REQ, VAR, IND, VIA, ETI, VAL | Sustentar asentimiento continuo, disenso multimodal, pausas y evaluación de comprensión infantil. |
| S40 | 2024 | Captura multimodal infantil | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Evaluación mixta de wearable | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, ETI, VAL | Sustentar pipeline de captura, controles visibles, privacidad, carga y evaluación de experiencia. |
| S41 | 2026 | Gestión de eventos | Antecedente reciente; evidencia empírica; fuente metodológica | Estudio empírico de microservicios | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VAL | Sustentar riesgos de orden, entrega, replay, reintentos, dependencias y observabilidad. |
| S42 | 2022 | Arquitectura IoT de salud | Antecedente reciente; revisión sistemática; fundamento teórico | Investigación sistemática de arquitecturas | RP, ANT, EA, MC, REQ, ARQ, VIA | Sustentar arquitectura por capas, reconciliación, interoperabilidad y colaboración. |
| S43 | 2022 | Computación offline | Antecedente reciente; evidencia empírica; caso comparable | Prototipo y simulación | RP, ANT, EA, MC, REQ, ARQ, IND, VIA, VAL | Sustentar nodo autónomo, procesamiento local, persistencia y sincronización posterior. |
| S44 | 2023 | Sincronización multimodal | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Plataforma validada en entorno naturalista | RP, ANT, EA, MC, REQ, ARQ, VAR, IND, VIA, ETI, VAL | Sustentar reloj común, error temporal, redundancia, calidad, intervalos no utilizables y revisión humana. |
| S45 | 2022 | Video infantil | Antecedente reciente; revisión del estado del arte; fuente metodológica | Síntesis de 20 trabajos | RP, ANT, EA, MC, REQ, VAR, IND, ETI, VAL | Sustentar ciclo audiovisual, anotación, calidad, oclusión, iluminación y revisión sobre originales. |
| S46 | 2023 | Evaluación cognitiva en tabletas | Antecedente reciente; revisión panorámica; caso comparable | Panorama de 16 herramientas | RP, ANT, EA, MC, REQ, VAR, IND, VIA, ETI, VAL | Sustentar captura local/nube, adaptación, capacitación, seguridad y rigor desigual de validación. |
| S47 | 2025 | Evaluación infantil remota | Antecedente reciente; evidencia empírica; caso comparable; fuente metodológica | Comparación remota-presencial | RP, ANT, EA, MC, REQ, VAR, IND, VIA, VAL | Sustentar capacitación, concordancia y escalamiento presencial ante mediciones remotas insuficientes. |
| S48 | 2024 | DAYC-2 remoto | Antecedente reciente; evidencia empírica; caso comparable | Cohortes retrospectivas | RP, ANT, EA, MC, REQ, VAR, IND, VIA, VAL | Contextualizar DAYC-2 remoto y revisión profesional sin afirmar equivalencia con Bayley-4. |
| S49 | 2017 | CRDT y convergencia | Fundamento teórico; verificación formal | Pruebas mecanizadas de CRDT | MC, REQ, ARQ, VAL | Delimitar convergencia y separar CRDT de invariantes que requieren coordinación. |
| S50 | 1987 | Orden causal | Fundamento teórico | Protocolos de multicast confiable | MC, REQ, ARQ, VAL | Fundamentar precedencia causal y el tratamiento explícito de fallos y recuperaciones. |
| S51 | 2021 | Consistencia mixta | Fundamento teórico; modelado | Formalización y prueba de imposibilidad | ANT, EA, MC, REQ, ARQ | Justificar que las operaciones con acuerdo global se separen de la sincronización eventual. |
| S52 | 2016 | Modelos de consistencia | Fundamento teórico; revisión | Síntesis de modelos no transaccionales | MC, REQ, ARQ | Precisar que la consistencia eventual no equivale a transacción global. |
| S53 | 2013 | W3C PROV | Fundamento conceptual; estándar | Tutorial técnico del modelo PROV | MC, REQ, ARQ | Sustentar entidad, actividad, agente y extensiones interoperables. |
| S54 | 2023 | Proveniencia segura | Antecedente reciente; revisión | Revisión de seguridad y privacidad | ANT, EA, MC, REQ, ETI | Sustentar que la trazabilidad requiere proteger la propia traza. |
| S55 | 2022 | Integridad multimodal | Antecedente reciente; editorial | Introducción a número especial | EA, MC, REQ | Contextualizar riesgos de alteración y distribución de evidencia multimedia. |
| S56 | 2023 | Telesalud peruana | Antecedente reciente; contexto nacional | Revisión narrativa nacional | ANT, EA, VIA | Documentar brechas nacionales de conectividad, interoperabilidad y capacidades. |
| S57 | 2024 | Salud mental peruana | Antecedente reciente; evidencia cualitativa nacional | 49 entrevistas en cuatro centros | ANT, EA, VIA | Documentar problemas reales de dispositivos, conectividad y flujo de información en Perú. |

### Fuentes complementarias

| ID | Año | Categoría | Función documental | Naturaleza de la evidencia | Cobertura | Uso previsto en la tesis |
|---|---:|---|---|---|---|---|
| E01 | 1978 | Sistemas distribuidos | Fundamento teórico | Artículo fundacional sobre orden parcial y relojes lógicos | MC, REQ, ARQ | Delimitar orden causal y justificar que la hora civil no expresa precedencia causal. |
| E02 | 2004 | Metodología DSR | Fundamento metodológico | Marco y guías para construcción y evaluación de artefactos | MET, VAL | Sustentar la investigación como diseño y evaluación de un artefacto. |
| E03 | 2007 | Metodología DSR | Fundamento metodológico | Proceso DSRM de seis actividades | MET, VAL | Organizar identificación del problema, diseño, demostración, evaluación y comunicación. |
| E04 | 2011 | Legislación peruana | Norma oficial | Ley de Protección de Datos Personales | ETI, REQ | Delimitar tratamiento, datos sensibles, seguridad, consentimiento y derechos del titular. |
| E05 | 2024 | Legislación peruana | Reglamento oficial vigente | Reglamento de la Ley N.° 29733 | ETI, REQ, ARQ | Precisar controles, trazabilidad, tratamiento de datos de menores, consentimiento y seguridad. |
| E06 | 2023 | Calidad de software | Estándar técnico oficial | Modelo de calidad de producto ISO/IEC | VAR, IND, VAL | Referencia general para organizar la evaluación de calidad técnica del producto. |

### Balance de clasificación

| Clasificación | Cantidad | Fuentes |
|---|---:|---|
| Antecedentes recientes del corpus, 2022-2026 | 32 | S02, S05, S06, S08-S13, S16, S19, S22-S28, S31-S33, S38-S48 |
| Fundamentos anteriores a 2021 | 8 | S01, S07, S14, S15, S17, S18, S29, S36 |
| Revisiones sistemáticas | 3 | S10, S32, S42 |
| Revisiones de alcance | 4 | S09, S27, S29, S36 |
| Otras revisiones o síntesis | 4 | S22, S39, S45, S46 |
| Fuentes complementarias externas al corpus | 6 | E01-E06 |

Las categorías de evidencia empírica, caso comparable y fuente metodológica no son excluyentes; se asignan según el uso concreto registrado en cada ficha.

## Capítulo I: Planteamiento del problema

### Matriz institucional

| Apartado | Contenido que debe desarrollar | Fuentes y páginas principales | Cobertura | Pendiente o precaución |
|---|---|---|---|---|
| **1.1 Descripción de la realidad problemática** | Describir la fragmentación entre captura, transmisión, revisión y decisión; conectividad intermitente; riesgos de pérdida, duplicación y desorden; heterogeneidad multimodal; dificultad para reconstruir origen y transformaciones; coordinación niño-cuidador-psicólogo; y controles de consentimiento y asentimiento. | S05, Ashista et al. (2026, pp. 1-3, 6-8); S41, Laigner et al. (2026, pp. 23-30); S09, Gierend et al. (2024, pp. 1, 11-15); S12, Wittner et al. (2022, pp. 1-4); S19, Kalanadhabhatta et al. (2025, pp. 2-3, 10-11); S27, Qureshi et al. (2026, pp. 5-7); S32, La Valle et al. (2022, pp. 2-4); S38, Wild et al. (2023, pp. 1-2, 7-8); S39, Mirabella et al. (2025, pp. 2-4, 7, 10-11). | Alta para el problema general. | Falta diagnóstico documentado del proceso local: actores, tiempos, fallos, conectividad, volumen de evidencias y herramientas actuales. No afirmar que estas deficiencias ya fueron medidas en la institución. |
| **1.2 Problema principal** | Formular una pregunta centrada en el cumplimiento técnico y operativo de la arquitectura respecto de sincronización, continuidad, trazabilidad y cierre humano, sin prometer optimización comparativa ni eficacia diagnóstica. | S02, Kim et al. (2026, pp. 7-10); S12, Wittner et al. (2022, pp. 5-10); S23, Wang et al. (2023, pp. 1-4); S28, Amed et al. (2025, pp. 11-12); S48, Ke et al. (2024, pp. 4, 8-9). | Alta para formulación técnica. | La pregunta definitiva debe corresponder al diseño experimental y a los indicadores realmente medibles. |
| **1.3 Objetivos** | Diseñar, implementar y evaluar el artefacto; modelar actores y eventos; soportar captura local y sincronización; conservar originales y derivados; reconstruir la procedencia; incorporar cierre humano y controles de gobernanza; y medir desempeño y completitud. | S06, Zhang (2023, pp. 9-11, 15); S11, Sax et al. (2023, pp. 1-2); S13, Gierend et al. (2023, pp. 6-12); S19, Kalanadhabhatta et al. (2025, pp. 6, 8-11); S26, Cox et al. (2022, pp. 3-5); S33, Gangi et al. (2025, pp. 3, 5-6); S39, Mirabella et al. (2025, pp. 6-11, 15). | Alta. | Evitar objetivos clínicos o de optimización comparativa que el protocolo no pueda demostrar. |
| **1.4 Hipótesis de la investigación** | Verificar que la arquitectura distribuida, offline-first, orientada a eventos y con proveniencia alcance criterios técnicos y operativos predefinidos por dimensión bajo escenarios controlados. | S02, Kim et al. (2026, pp. 7-10); S05, Ashista et al. (2026, p. 6); S12, Wittner et al. (2022, pp. 5-11); S16, Cejudo et al. (2025, pp. 8-14); S44, Geangu et al. (2023, pp. 23-35). | Media; sustento indirecto. | Preespecificar indicadores, criterios, repeticiones y reglas de dictamen por dimensión antes de las pruebas. No afirmar superioridad causal sin una arquitectura alternativa comparable. |
| **1.5 Variables e indicadores** | Factores experimentales: conectividad, concurrencia, fallo y modalidad. Variable de respuesta: calidad técnico-operativa. Variables controladas: hardware, versiones, red, corpus, carga, reloj y estado inicial. Indicadores: latencia, disponibilidad, convergencia, pérdida, duplicados, orden, recuperación, completitud, reconstrucción y acción profesional documentada. | S02, Kim et al. (2026, pp. 6-10); S10, Sembay et al. (2023, pp. 3, 22); S13, Gierend et al. (2023, pp. 10-12); S16, Cejudo et al. (2025, pp. 8-13); S27, Qureshi et al. (2026, pp. 3, 5-7); S44, Geangu et al. (2023, pp. 23, 25-35). | Alta. | Definir fórmula, unidad, fuente de datos, criterio y procedimiento. No mezclar métricas arquitectónicas con sensibilidad, especificidad o validez psicométrica. |
| **1.6 Viabilidad técnica** | Sustentar que existen patrones implementables para almacenamiento local, WebSocket, API, FHIR, mensajería, edge/fog/cloud, sincronización posterior y almacenamiento versionado. | S06, Zhang (2023, pp. 9-11); S08, Rodrigues et al. (2023, pp. 8-14); S13, Gierend et al. (2023, pp. 6, 9-12); S28, Amed et al. (2025, pp. 11-12); S31, Bhavnani et al. (2025, pp. 3, 5); S43, Medhi et al. (2022, pp. 3-5). | Alta. | La factibilidad de componentes no demuestra que la integración completa cumpla los umbrales de la tesis. |
| **1.6 Viabilidad operativa** | Examinar disponibilidad de participantes, capacitación, dispositivos, acompañamiento profesional, conectividad, manejo de incidencias y carga de uso. | S25, Modi et al. (2023, pp. 3-4); S28, Amed et al. (2025, pp. 4-5); S40, McElwain et al. (2024, pp. 6-13); S47, Torres-Escobar et al. (2025, p. 3). | Media. | Confirmar acceso real a 25-30 díadas y 3-5 psicólogos, permisos, tiempo y equipamiento. |
| **1.6 Viabilidad económica** | Estimar desarrollo, infraestructura, almacenamiento, transferencia multimodal, respaldo, mantenimiento, capacitación y soporte. | S19, Kalanadhabhatta et al. (2025, pp. 14, 19-20); S22, Ramanarayanan (2024, p. 3). | Baja. | Requiere presupuesto y cotizaciones propias. No afirmar ahorro o costo-efectividad con el corpus actual. |
| **1.6 Viabilidad legal y ética** | Verificar normativa vigente, aprobación ética e institucional, consentimiento, asentimiento, privacidad, seguridad, retención, retiro e incidentes antes del uso de datos humanos. | Fuentes legales oficiales y protocolo ético institucional. | Pendiente de confirmación local. | No iniciar reclutamiento ni captura humana sin controles y autorizaciones demostrados. |
| **1.7 Justificación e importancia** | Justificación teórica: integrar arquitectura, proveniencia, multimodalidad y coordinación. Práctica/tecnológica: continuidad y reconstrucción de cada evidencia. Social: acceso y participación familiar sin desplazar al profesional. Ética: control, transparencia y retiro. | S09, Gierend et al. (2024, pp. 2, 9-12); S27, Qureshi et al. (2026, pp. 5-7); S32, La Valle et al. (2022, pp. 2-4); S38, Wild et al. (2023, pp. 5-8); S39, Mirabella et al. (2025, pp. 8-11, 15-17). | Alta, excepto dimensión económica. | No presentar beneficios esperados como resultados ya obtenidos. |
| **1.8 Alcance** | Incluir diseño, implementación y evaluación técnica-operativa del flujo de captura, sincronización, almacenamiento, proveniencia y cierre. Evaluar continuidad, recuperación, latencia, tasa de error, throughput, recursos, convergencia e integridad bajo conectividad variable, concurrencia y fallos simulados. Excluir diagnóstico autónomo, validación psicométrica, certificación regulatoria y despliegue poblacional. | S02, Kim et al. (2026, p. 12); S16, Cejudo et al. (2025, pp. 9-15); S33, Gangi et al. (2025, pp. 5-6); S47, Torres-Escobar et al. (2025, pp. 5-6); S48, Ke et al. (2024, pp. 6, 8-10). | Alta. | Definir modalidades, roles y reglas de la instanciación sin incorporarlas a la afirmación arquitectónica central. |
| **1.9 Línea, tipo y nivel** | Propuesta: línea de ingeniería de software/sistemas de información en salud; investigación aplicada y tecnológica; Design Science Research; enfoque cuantitativo predominante con componente de experiencia de usuario. | Hevner et al. (2004); Peffers et al. (2007); S02, Kim et al. (2026, pp. 5-7); S13, Gierend et al. (2023, pp. 4-12). | Pendiente de equivalencia institucional. | Confirmar terminología con el reglamento y las líneas oficiales de la universidad. |
| **1.10 Técnicas e instrumentos** | Técnicas: análisis documental, observación estructurada, encuesta, entrevista e inspección automatizada de registros. Procedimientos técnicos: pruebas funcionales, integración, carga, fallos y reconstrucción. Instrumentos: matriz de requisitos-trazas, generador de carga, telemetría, guiones, listas de comprobación y cuestionario aprobado. | S02, Kim et al. (2026, pp. 6-10); S13, Gierend et al. (2023, pp. 10-12); S25, Modi et al. (2023, pp. 3-4); S28, Amed et al. (2025, pp. 4-6, 15); S39, Mirabella et al. (2025, pp. 6, 8-11); S40, McElwain et al. (2024, pp. 5-6, 10). | Alta para propuesta; pendiente de validación. | Elaborar fichas técnicas, validez de contenido y correspondencia uno a uno con variables e indicadores. |

### Formulación integrada de trabajo

#### Problema principal propuesto

¿En qué medida una arquitectura de software distribuida orientada a eventos cumple criterios técnicos y operativos predefinidos para sincronizar, conservar y trazar evidencias multimodales en un proceso digital multi-actor bajo conectividad variable y fallos controlados?

#### Objetivo principal propuesto

Diseñar, implementar y evaluar una arquitectura de software distribuida orientada a eventos, con sincronización multi-actor en tiempo casi real y un pipeline trazable de evidencias multimodales, verificando por dimensión continuidad, desempeño, consistencia, confiabilidad, integridad, trazabilidad y cierre humano documentado bajo escenarios controlados.

#### Objetivos específicos propuestos

1. Modelar actores, responsabilidades, estados, eventos, evidencias e invariantes de un proceso digital multi-actor.
2. Diseñar la arquitectura y sincronización para captura local, entrega durable, orden causal, idempotencia, conflictos y convergencia.
3. Implementar operación offline, sincronización, proveniencia, gestión multimodal, gobernanza y cierre humano documentado.
4. Evaluar la calidad técnico-operativa mediante pruebas funcionales, carga, fallos, replay y reconstrucción con datos sintéticos.
5. Determinar por dimensión y escenario el cumplimiento, incumplimiento o indeterminación de los criterios predefinidos.
6. Explorar por separado la factibilidad operativa con actores autorizados del caso.

#### Hipótesis general propuesta

La arquitectura distribuida orientada a eventos con sincronización multi-actor y pipeline trazable de evidencias multimodales alcanzará los criterios técnicos y operativos predefinidos por dimensión para continuidad, desempeño, consistencia, confiabilidad de eventos, integridad multimodal, proveniencia, linaje y cierre humano documentado.

Esta hipótesis exige preespecificar criterios y reportar resultados por dimensión antes de ejecutar la evaluación. No se interpretará como superioridad causal frente a otra arquitectura.

### Operacionalización preliminar

| Variable | Dimensión | Indicadores candidatos | Unidad o criterio |
|---|---|---|---|
| Configuración experimental de la arquitectura (VI) | Conectividad | Estable, intermitente, desconectada y reconectada | Perfil aplicado |
| Configuración experimental de la arquitectura (VI) | Concurrencia | 1, 10, 25, 50 y 100 sesiones simuladas | Sesiones concurrentes |
| Configuración experimental de la arquitectura (VI) | Fallo inducido | Sin fallo, duplicación, omisión, retraso, desorden y reinicio | Tipo de escenario |
| Configuración experimental de la arquitectura (VI) | Modalidad | Respuesta, evento, imagen, audio o video autorizado | Tipo de evidencia |
| Calidad técnica y operativa de la arquitectura (VD) | Continuidad | Sesiones completadas tras desconexión; recuperación correcta | %, tiempo de recuperación |
| Calidad técnica y operativa de la arquitectura (VD) | Desempeño | Latencia de propagación; tasa de error; throughput; CPU, memoria, almacenamiento y transferencia | ms o s; %; eventos/s; MB o GB |
| Calidad técnica y operativa de la arquitectura (VD) | Sincronización | Tiempo de convergencia | ms o s |
| Calidad técnica y operativa de la arquitectura (VD) | Consistencia | Pérdida, duplicación, desorden y conflictos no resueltos | conteo y tasa por sesión |
| Calidad técnica y operativa de la arquitectura (VD) | Trazabilidad | Evidencias con procedencia completa; resultados reconstruibles | % |
| Calidad técnica y operativa de la arquitectura (VD) | Multimodalidad | Error temporal; archivos o intervalos faltantes; calidad utilizable | ms, % y conteo por modalidad |
| Calidad técnica y operativa de la arquitectura (VD) | Cierre humano | Casos recibidos y asignados; decisiones y siguientes acciones documentadas; cierres dentro del plazo | %, tiempo y conteo |
| Calidad técnica y operativa de la arquitectura (VD) | Gobernanza | Accesos autorizados, pausas/retiros ejecutados y trazas completas | %, tiempo y conteo |

## Capítulo II: Marco teórico

### 2.1 Antecedentes de la investigación

La subsección debe organizarse en bloques por problema y aporte. Dentro de cada bloque pueden conservarse resúmenes individuales si culminan en una síntesis comparativa; el corpus reúne 32 fuentes recientes de 2022-2026 y no contiene publicaciones de 2021:

| Bloque de antecedentes | Fuentes recientes | Función en la argumentación |
|---|---|---|
| Arquitectura, sincronización y operación offline | S02, S05, S06, S08, S41, S42, S43 | Comparar arquitecturas, captura local, sincronización incremental, comunicación bidireccional, edge/fog/cloud y riesgos de eventos. |
| Proveniencia, versionado y auditoría | S09, S10, S11, S12, S13, S16 | Establecer requisitos de proveniencia, metadatos mínimos, bundles distribuidos, interoperabilidad, versionado y evaluación de pipelines. |
| Evidencia multimodal | S19, S22, S23, S24, S44, S45 | Distinguir fuentes y derivados, asociar actor/fase, alinear temporalmente, conservar calidad y ofrecer revisión sobre originales. |
| Coordinación multi-actor | S25, S26, S27, S28 | Modelar captura familiar, triaje, flujo cerrado, vistas por rol, acción profesional e interoperabilidad clínica. |
| Contexto de instanciación en evaluación digital | S31, S32, S33, S46, S47, S48 | Extraer requisitos transferibles de operación offline, teleevaluación, diferimiento, escalamiento y delimitación del instrumento candidato. |
| Ética y protección infantil | S38, S39, S40 | Incorporar custodia, autorización contextual, asentimiento continuo, control de captura y experiencia familiar. |

#### Secuencia recomendada

1. Abrir con revisiones panorámicas y brechas: S09, S10, S27, S32, S42, S45 y S46.
2. Presentar implementaciones cercanas al artefacto: S02, S05, S06, S12, S13, S16, S23, S28 y S44.
3. Introducir coordinación y revisión humana: S19, S25, S26, S28, S33 y S47.
4. Cerrar con la instanciación y sus límites interpretativos: S48 solo contextualiza un candidato y deberá complementarse con documentación oficial del instrumento finalmente seleccionado.
5. Integrar ética y experiencia como requisitos transversales: S38, S39 y S40.

#### Fuentes fundacionales separadas

Las ocho fuentes anteriores a 2021 no deben presentarse como antecedentes recientes:

| Fuente | Año | Uso permitido |
|---|---:|---|
| S01, Ruth et al. | 2020 | Captura offline, despliegue de campo y auditoría. |
| S07, Lomotey y Deters | 2013 | CAP, consistencia eventual y uso multidispositivo. |
| S14, Curcin et al. | 2014 | Proveniencia interoperable y granularidad. |
| S15, Curcin | 2017 | Trazabilidad, reproducibilidad y sistemas de salud que aprenden. |
| S17, Medina-Martínez et al. | 2020 | Pipeline versionado de datos multimodales. |
| S18, Kelleher et al. | 2020 | Telecaptura infantil multimodal y codificación humana. |
| S29, Bird et al. | 2019 | Salud digital síncrona y dimensiones de factibilidad. |
| S36, Facca et al. | 2020 | Taxonomía ética de recolección digital con menores. |

### 2.2 Estado del arte

| Eje de síntesis crítica | Capacidad alcanzada | Fuentes principales | Brecha que conserva la tesis |
|---|---|---|---|
| Autonomía local y arquitectura distribuida | Procesamiento cercano, persistencia local, sincronización posterior y separación por capas. | S02 (pp. 5-10); S05 (pp. 6-8); S08 (pp. 8-14); S43 (pp. 3-7). | Falta una evaluación conjunta de desconexión, reconexión, concurrencia y convergencia en un flujo multi-actor instrumentado. |
| Sincronización y confiabilidad de eventos | Canales bidireccionales, eventos incrementales y reconocimiento de problemas de orden, replay, entrega y reintentos. | S06 (pp. 9-11, 15); S41 (pp. 23-30, 44). | Falta demostrar resolución de conflictos, idempotencia y consistencia multi-actor sobre una misma evaluación. |
| Proveniencia y versionado | W3C PROV, entidades-actividades-agentes, metadatos mínimos, bundles, URI, captura híbrida y capas versionadas. | S09 (pp. 7-14); S11 (pp. 1-2); S12 (pp. 4-11); S13 (pp. 6-12); S16 (pp. 4-13). | Falta una cadena integral que incluya autorización, captura multimodal, transformación, cierre y resultado. |
| Captura y alineación multimodal | Audio, video, interacción y sensores asociados con actores y fases; referencias temporales comunes y conservación de intervalos defectuosos. | S19 (pp. 5-12); S22 (pp. 2-3, 6-8); S23 (pp. 2-4); S44 (pp. 23-35). | Falta enlazar cada tarea con originales, derivados, calidad y decisión humana en una arquitectura distribuida. |
| Coordinación multi-actor y revisión | Captura asistida, triaje, tableros, alertas, acción documentada, diferimiento y escalamiento. | S25 (pp. 2-4); S26 (pp. 3-5); S27 (pp. 5-7); S28 (pp. 11-12); S33 (pp. 5-6). | Ningún antecedente reúne roles coordinados con sincronización, procedencia completa y cierre verificable del circuito en una evaluación arquitectónica común. |
| Contexto de instanciación en evaluación digital | Operación offline, videoconferencia, store-and-forward, supervisión y revisión profesional. | S31 (pp. 3, 5-7); S32 (pp. 7-10); S33 (pp. 5-7); S47 (pp. 4-6); S48 (pp. 4, 6-10). | La evidencia permite extraer requisitos operativos, pero no valida el instrumento candidato ni justifica automatizar su interpretación. |
| Gobernanza y ética infantil | Consentimiento contextual, asentimiento continuo, pausa, retiro, custodia, acceso restringido y experiencia familiar. | S38 (pp. 5-8); S39 (pp. 6-11, 15); S40 (pp. 4-13); fundamento S36 (pp. 5-13). | Falta traducir estos principios a controles auditables y validarlos en el contexto jurídico e institucional peruano. |

#### Brecha integradora

El corpus documenta por separado autonomía local, comunicación en tiempo real, proveniencia, captura multimodal, coordinación multi-actor y controles de gobernanza. No se identificó en la muestra una solución que integre y evalúe simultáneamente estas capacidades con tolerancia a desconexiones, consistencia multi-actor, cadena original-derivado, cierre humano y gobernanza trazable.

### 2.3 Marco conceptual

| Concepto | Alcance que debe fijarse | Sustento principal |
|---|---|---|
| Arquitectura distribuida | Componentes y datos ubicados en más de un nodo, con responsabilidades explícitas de comunicación, procesamiento y persistencia. | S42, Aguru et al. (2022, pp. 14, 17-19); S08, Rodrigues et al. (2023, pp. 7-14). |
| Offline-first | Las funciones esenciales operan sin red y los cambios se sincronizan al recuperar conectividad. | S43, Medhi et al. (2022, pp. 3-4); fundamento S01, Ruth et al. (2020, pp. 4-5). |
| Consistencia eventual | Los nodos pueden mostrar estados temporalmente distintos durante una partición y convergen posteriormente. | Fundamento S07, Lomotey y Deters (2013, pp. 2-4, 10-12). |
| Sincronización incremental | Intercambio de cambios o eventos nuevos frente a replicación completa. | S05, Ashista et al. (2026, p. 6). |
| Tiempo real | Propiedad operacional definida por latencia y actualización observable; no equivale a afirmar procesamiento instantáneo. | S06, Zhang (2023, pp. 9-11, 15); S16, Cejudo et al. (2025, pp. 9-15). |
| Idempotencia y entrega | Reprocesar un evento no debe duplicar su efecto; requiere identidad, control de versión, reintentos y observabilidad. | S41, Laigner et al. (2026, pp. 23-30). |
| Proveniencia de datos | Registro del origen y de las entidades, actividades y agentes que producen o transforman un recurso. | S09, Gierend et al. (2024, pp. 2, 8-9). |
| Trazabilidad | Capacidad de recorrer la cadena desde una evidencia o resultado hasta sus fuentes, transformaciones y responsables. | S12, Wittner et al. (2022, pp. 5-8); fundamento S15, Curcin (2017, p. 3). |
| Auditabilidad | Capacidad de verificar integridad, responsables, versiones y acciones del proceso. | S10, Sembay et al. (2023, p. 22). |
| Versionado e inmutabilidad | Conservación de estados anteriores y creación de nuevas versiones sin sobrescribir la evidencia fuente. | S12, Wittner et al. (2022, pp. 9-11); S16, Cejudo et al. (2025, p. 6). |
| Evidencia multimodal | Fuentes capturadas y representaciones derivadas de modalidades distintas que describen aspectos complementarios de una sesión. | S22, Ramanarayanan (2024, pp. 2-3). |
| Sincronización temporal multimodal | Correspondencia verificable de corrientes mediante reloj, marcas o señal común, medida con error y deriva. | S44, Geangu et al. (2023, pp. 23-30). |
| Original y derivado | El original conserva la captura inicial; el derivado resulta de segmentación, transcripción, extracción o anotación y mantiene enlace con su fuente. | S19, Kalanadhabhatta et al. (2025, pp. 8-11); S44, Geangu et al. (2023, pp. 27-35). |
| Calidad de evidencia | Estado técnico y contextual, incluido ruido, ausencia, oclusión, corrupción o imposibilidad de codificación. | S19, Kalanadhabhatta et al. (2025, pp. 8-11); S45, Leo et al. (2022, pp. 12, 14-16). |
| Flujo multi-actor | Distribución de captura, facilitación, revisión, custodia, servicios automáticos y devolución entre roles coordinados. En la instanciación infantil pueden corresponder a niño, cuidador y profesionales. | S27, Qureshi et al. (2026, pp. 1-2, 5-7); S33, Gangi et al. (2025, pp. 2-5). |
| Human-in-the-loop | La salida técnica permanece sujeta a interpretación, confirmación, diferimiento o escalamiento profesional. | S26, Cox et al. (2022, pp. 4-5); S33, Gangi et al. (2025, pp. 5-6); S48, Ke et al. (2024, pp. 4, 8). |
| Consentimiento y asentimiento | El consentimiento adulto autoriza bajo finalidades y condiciones; el asentimiento infantil es continuo, revocable y adecuado al desarrollo. | S38, Wild et al. (2023, pp. 5-7); S39, Mirabella et al. (2025, pp. 3-4, 7-11). |
| Instrumento del caso | Configuración reemplazable para instanciar tareas y reglas; sus dominios, administración, puntuación, normas y límites deben proceder de documentación oficial. | El antecedente S48 solo permite contextualizar DAYC-2 como candidato; la selección definitiva permanece pendiente. |

## Cobertura y vacíos documentales

| Elemento | Estado | Acción antes de redactar la versión final |
|---|---|---|
| Artículos del corpus con ficha | Completo: 40 de 40 | Usar las fichas como índice y volver al texto por página al redactar afirmaciones sustantivas. |
| Antecedentes recientes | Completo: 32 fuentes de 2022-2026; 0 de 2021 | Seleccionar por aporte y evitar una lista enciclopédica de resúmenes. |
| Fundamentos anteriores a 2021 | Completo: 8 fuentes identificadas | Ubicarlas en estado del arte o marco conceptual, no como antecedentes recientes. |
| Instrumento del caso | Selección y autorización pendientes de confirmación | Incorporar documentación oficial sobre dominios, administración, puntuación, normas, capacitación y límites. |
| Realidad problemática local | Sin evidencia primaria | Documentar proceso actual, incidencias, actores, conectividad, tiempos y volumen de sesiones. |
| Normativa peruana y ética institucional | No cubierta por el corpus académico | Incorporar fuentes normativas oficiales sobre datos personales, menores, consentimiento y tratamiento de información sensible. |
| Clasificación metodológica institucional | Pendiente | Revisar reglamento de investigación, líneas y categorías aceptadas por la universidad. |
| Viabilidad económica | Cobertura insuficiente | Preparar presupuesto propio y supuestos verificables. |
| Estándares técnicos | Etapa documental separada | Incorporar documentación oficial de W3C PROV y, si realmente se usa, FHIR y un modelo de calidad de software. |

## Control de consistencia para la redacción

- Cada párrafo de antecedentes debe expresar problema, método, resultado, limitación y aporte a la tesis cuando esos elementos sean pertinentes.
- Cada cifra debe conservar población, unidad, contexto y página.
- Las brechas deben formularse como ausencia encontrada en el corpus, no como inexistencia universal.
- El problema principal, objetivo principal, hipótesis y variables deben referirse a las mismas capacidades e indicadores.
- Los umbrales técnicos deben definirse antes de las pruebas y no derivarse arbitrariamente de estudios con arquitecturas o poblaciones distintas.
- La evaluación humana prevista y la carga simulada deben reportarse por separado.
- La redacción final debe diferenciar evidencia empírica, fundamento conceptual, decisión de diseño y propuesta propia.

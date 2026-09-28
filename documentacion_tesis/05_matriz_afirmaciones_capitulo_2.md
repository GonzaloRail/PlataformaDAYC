# MATRIZ DE AFIRMACIONES Y TRAZABILIDAD DEL CAPÍTULO II

## Propósito

Esta matriz es un instrumento interno de trazabilidad. Vincula los temas del capítulo II con las 49 fuentes validadas, las páginas PDF registradas en sus fichas, la función de la evidencia, sus límites de transferencia y el uso efectivo en la redacción. Los códigos `Sxx` se reservan para este control interno y no se trasladan al capítulo. La fuente complementaria E01 respalda únicamente la definición de reloj lógico y orden causal; las demás fuentes complementarias se usan en el capítulo I y se registran en `07_registro_fuentes_complementarias.md`.

Las páginas remiten a los marcadores registrados en las fichas validadas. Las fuentes añadidas S49-S57 cubren garantías de consistencia, orden causal, W3C PROV, proveniencia segura, integridad multimodal y contexto peruano de telesalud. Las correcciones de alto riesgo de S02, S09, S31, S33 y S48 y las páginas de conclusión de los antecedentes individuales se contrastaron además con `articulos_markdown`; no se declara una nueva verificación integral de cada página del conjunto.

## Mapa por sección y tema

| Sección o tema | Fuentes principales | Función de evidencia | Uso en el capítulo | Precaución transversal |
|---|---|---|---|---|
| Introducción y delimitación DAYC-2 | S02, S09, S48 | Delimitar el problema arquitectónico, la proveniencia y el caso | Presenta los tres planos del capítulo y excluye equivalencia DAYC-2/Bayley-4 | El manual oficial DAYC-2 no forma parte de la muestra autorizada |
| 2.1 Antecedente directo de DAYC-2 | S48 | Revisión retrospectiva con uso remoto del instrumento | Presenta objetivo, diseño, procedimiento, resultados, conclusión, aporte, límite y necesidad | No fue comparación pareada |
| 2.1 Antecedentes relacionados | S19, S25, S27-S28, S31-S33, S38-S40, S45-S47 | Estudios infantiles digitales, remotos, multimodales, de gobernanza y revisiones | Presenta 13 antecedentes individuales en orden fijo | Instrumentos y poblaciones no son intercambiables |
| 2.1 Antecedentes tecnológicos | S02, S05-S06, S08-S10, S12-S13, S16, S23, S41-S44 | Arquitecturas, eventos, proveniencia y captura multifuente | Presenta 14 antecedentes individuales en orden fijo | La transferencia es técnica, no clínica |
| 2.1 Exclusiones individuales | S11, S22, S24, S26 | Modelo, revisión narrativa y propuestas sin estructura suficiente | Explica su reserva para 2.2/2.3 | Siguen siendo fuentes recientes de la muestra |
| 2.2 Comparación transversal | S01-S02, S05-S19, S22-S29, S31-S33, S36, S38-S48 | Comparación de las 40 fuentes por enfoque, proceso, evidencia, resultado, límite y transferencia | Organiza ocho temas y dos brechas acotadas | No se afirma revisión sistemática exhaustiva propia |
| 2.3 Arquitectura y sincronización | S01-S02, S05-S08, S41-S43 | Fundamentos y evidencia técnica | Define nodo, offline-first, continuidad, recuperación, tiempo real conectado, eventos, idempotencia, orden, conflictos y convergencia | Sin fórmulas, umbrales ni indicadores visibles en el capítulo |
| 2.3 Pipeline y proveniencia | S09-S17 | Definiciones y patrones implementados | Define pipeline, proveniencia, linaje, trazabilidad, auditabilidad, integridad, versionado e inmutabilidad | Un hash no acredita exactitud clínica o autorización |
| 2.3 Multimodalidad | S17-S19, S22, S44-S45 | Taxonomía y evidencia de captura/calidad | Define fuente, modalidad derivada, original, derivado, sincronía y calidad | S23-S24 se utilizan en 2.1-2.2, no en 2.3; alineación exige referencia común |
| 2.3 Multi-actor | S25-S29, S32-S33, S47-S48 | Flujos clínico-operativos | Define flujo cerrado y human-in-the-loop | La decisión profesional condiciona la salida |
| 2.3 Gobernanza | S10, S38-S40 | Ética, seguridad y experiencia | Define autorización, consentimiento, asentimiento, pausa y retiro | Definiciones provisionales sujetas a norma, ética, institución y manual |
| 2.3 Evaluación y corrección | S31-S33, S46-S48 | Evidencia de evaluación digital y remota | Separa corrección funcional de validez psicométrica | Reglas DAYC-2 condicionadas al manual oficial |
| 2.3 Factibilidad | S19, S28-S29, S39-S40 | Factibilidad, usabilidad y experiencia | Define factibilidad, usabilidad, comprensión, control y carga | No equivale a eficacia clínica |

## Elegibilidad de antecedentes individuales

### Distribución exacta

| Grupo | Cantidad | Fuentes |
|---|---:|---|
| Antecedente directo de DAYC-2 | 1 | S48 |
| Antecedentes relacionados con evaluación infantil y digital | 13 | S19, S25, S27, S28, S31, S32, S33, S38, S39, S40, S45, S46, S47 |
| Antecedentes tecnológicos | 14 | S02, S05, S06, S08, S09, S10, S12, S13, S16, S23, S41, S42, S43, S44 |
| **Total de antecedentes individuales** | **28** | **28 fuentes únicas** |

### Trazabilidad de los 28 antecedentes

Las columnas separan los elementos exigidos aunque en el capítulo aparezcan integrados en dos párrafos. `Obj.`, `Dis./fuente`, `Proc.`, `Res.`, `Conc.` y `Lim.` indican por separado las páginas PDF de objetivo, diseño o fuente, procedimiento, resultados, conclusión formal y limitación. Las páginas de `Conc.` se verificaron en los artículos convertidos; cuando la síntesis conclusiva abarca discusión y conclusión o continúa en la página siguiente, se conserva el intervalo. La contribución y la necesidad son síntesis explícitas de la tesis apoyadas en esas evidencias y límites.

| Grupo | ID | Autor-año | Obj. | Dis./fuente | Proc. | Res. | Conc. | Contribución a la tesis | Lim. | Necesidad para la investigación |
|---|---|---|---:|---|---|---|---|---|---|---|
| Directo | S48 | Ke et al. (2024) | 1, 4 | 4-6 | 4-5 | 6-7 | 10-11 | Ruta DAYC-2 remota con administración, puntuación e interpretación separadas | 8-10 | Arquitectura y revisión DAYC-2 sin comparación instrumental improcedente |
| Relacionado | S19 | Kalanadhabhatta et al. (2025) | 2-3 | 5-7 | 6, 8-12 | 8-17 | 20-21 | Actor, fase, original, derivado, calidad y control parental | 5, 7, 11, 14-20 | Cadena multimodal revisable sin trasladar clasificación clínica |
| Relacionado | S25 | Modi et al. (2023) | 2 | 2-3 | 2-4 | 3-4 | 4 | Invitación, autorización, ventana, reporte y entrega clínica | 2-4 | Integrar tiempo, autorización, sincronización y revisión |
| Relacionado | S27 | Qureshi et al. (2026) | 2 | 2-3 | 3 | 3, 5-6 | 7 | Circuito cerrado y diferencia entre alerta y acción | 7 | Representar recepción, asignación, acción y devolución |
| Relacionado | S28 | Amed et al. (2025) | 3 | 1, 4-5, 11 | 11-14 | 4-10 | 10-11 | Vistas por rol, API/FHIR, revisión y usabilidad | 2, 10 | Relacionar experiencia con propagación y cierre técnico |
| Relacionado | S31 | Bhavnani et al. (2025) | 3 | 1, 4-6 | 5-8 | 10-12 | 12-14 | Operación offline, eventos granulares y supervisión | 5, 10, 13 | Separar continuidad técnica de inferencia psicométrica |
| Relacionado | S32 | La Valle et al. (2022) | 1, 4 | 4-6 | 5-6 | 6, 8-10 | 14 | Rutas síncrona y store-and-forward con revisión especialista | 5-6, 10, 13-14 | Persistencia y devolución trazable en ambos flujos |
| Relacionado | S33 | Gangi et al. (2025) | 1-2 | 2, 5 | 2-5 | 5-7 | 1, 7 | Guía del cuidador, diferimiento, consenso y supervisión | 2, 5, 7 | Modelar incertidumbre y escalamiento profesional |
| Relacionado | S38 | Wild et al. (2023) | 1-2 | 2-4 | 3 | 3, 5-8 | 8-9 | Finalidad, destinatario, custodio, renovación y retiro | 8 | Traducir expectativas a estados sujetos a norma peruana |
| Relacionado | S39 | Mirabella et al. (2025) | 4-5 | 3-7 | 5-7 | 6-16 | 16-17 | Asentimiento continuo, multimodal y contextual | 1, 4-5, 7, 16 | Registrar decisiones humanas sin inferencia conductual automática |
| Relacionado | S40 | McElwain et al. (2024) | 1-2 | 2-6, 10 | 4-5, 10 | 6-13 | 13 | Estado de captura, pausa, terceros, privacidad y carga | 2, 13 | Incorporar experiencia infantil y carga por actor |
| Relacionado | S45 | Leo et al. (2022) | 1, 3 | 3, 7 | 3-13 | 3, 6-7, 12, 17 | 18 | Ciclo audiovisual, contexto de calidad y revisión del original | 3, 5, 12, 14-18 | Vincular derivados con intervalos originales y calidad |
| Relacionado | S46 | McHenry et al. (2023) | 3-4 | 4, 11 | 4 | 4-12 | 13-14 | Diferenciar capacidades digitales de evidencia psicométrica | 4, 12-13 | Condicionar reglas y validez al instrumento y manual |
| Relacionado | S47 | Torres-Escobar et al. (2025) | 1-2 | 1-4 | 3 | 4-5 | 6 | Formación, cegamiento, insuficiencia remota y escalamiento | 3, 6 | Representar evidencia insuficiente y remisión profesional |
| Tecnológico | S02 | Kim et al. (2026) | 1, 4 | 5-9 | 5-6 | 7-10 | 13 | Continuidad, fidelidad, latencia y recursos | 12 | Evaluar desconexión y evidencia propias sin copiar valores |
| Tecnológico | S05 | Ashista et al. (2026) | 3 | 1, 3-5 | 3-5 | 5-8 | 9 | Diferenciar persistencia local y coordinación multiusuario | 9 | Caracterizar convergencia, duplicación y conflictos |
| Tecnológico | S06 | Zhang (2023) | 1-2 | 2, 4, 14-15 | 4-10, 15 | 5, 14-15 | 15-16 | Separar evidencia pesada, señales de estado y mensajes | 14-16 | Combinar propagación conectada con durabilidad offline |
| Tecnológico | S08 | Rodrigues et al. (2023) | 1, 3 | 1, 3, 19-20 | 19 | 14, 19-20 | 22 | Capas, colas y localización de fragmentos | 19-20, 22 | Mantener evidencia distribuida localizable tras fallos |
| Tecnológico | S09 | Gierend et al. (2024) | 1-3 | 2-4 | 3-4 | 4, 7-14 | 15 | Entidad-actividad-agente, requisitos y granularidad | 3, 14-15 | Definir detalle suficiente y sostenible para DAYC-2 |
| Tecnológico | S10 | Sembay et al. (2023) | 1, 3, 8-9 | 8-15 | 8-13 | 12-25 | 28-30 | Siete propiedades diferenciadas de proveniencia sanitaria | 27-30 | Integrarlas con evidencia infantil y autorización |
| Tecnológico | S12 | Wittner et al. (2022) | 1-3 | 3, 16 | 3-16 | 3, 5-10, 16 | 14 | Bundles, conectores, discontinuidades y versiones | 3, 12-13, 16 | Conectar etapas temporalmente desconectadas |
| Tecnológico | S13 | Gierend et al. (2023) | 1-3 | 1, 3-5 | 4-11 | 10-12 | 13 | Captura por elemento y exportación interoperable | 13 | Aplicar proveniencia a actores, modalidades y decisiones |
| Tecnológico | S16 | Cejudo et al. (2025) | 1, 3 | 4, 8-13 | 4-13 | 8-14 | 15 | Capas original-derivado, orquestación y versiones | 15 | Extender trazabilidad a multimedia y revisión humana |
| Tecnológico | S23 | Wang et al. (2023) | 1-2 | 4-5, 8-10 | 4 | 3-4, 8-10 | 10 | Persistencia híbrida y marcas de tarea | 2-4, 8-10 | Unificar línea temporal y manifiesto multifuente |
| Tecnológico | S41 | Laigner et al. (2026) | 3 | 3, 8-12 | 9-12 | 22-30 | 52-53 | Riesgos de entrega, replay, orden e idempotencia | 44 | Examinarlos en un estado sanitario multi-actor |
| Tecnológico | S42 | Aguru et al. (2022) | 1, 4-5 | 2-6 | 5-6 | 14, 17-19 | 32 | Vista por capas y reconciliación | 31-32 | Concretar y evaluar la referencia arquitectónica |
| Tecnológico | S43 | Medhi et al. (2022) | 1-2 | 3, 5-7 | 3, 5 | 3-7 | 7 | Nodo autónomo, base local y sincronizador | 3, 5-7 | Aplicar autonomía sin trasladar inferencia ni rendimiento |
| Tecnológico | S44 | Geangu et al. (2023) | 1-2, 5-6 | 17-24, 29, 34-36 | 17, 24, 36-37 | 19-24, 29, 34-35 | 36-37 | Reloj común, respaldo, originales y defectos preservados | 19, 24-26, 30, 35-36 | Integrar tiempo y calidad con autorización y linaje |

### Fuentes recientes reservadas para 2.2 y 2.3

| ID | Autor-año | Razón de exclusión como antecedente individual | Destino y páginas |
|---|---|---|---|
| S11 | Sax et al. (2023) | Modelo mínimo conceptual de tres páginas, sin implementación ni resultados empíricos | 2.2 para comparar modelos y 2.3 como soporte conceptual; pp. 1-3 |
| S22 | Ramanarayanan (2024) | Revisión narrativa tecnológica sin datos nuevos ni evaluación sistemática de calidad | 2.2 y 2.3 para fuente frente a modalidad derivada; pp. 1-3, 6-9 |
| S24 | Bartolomei et al. (2025) | Propuesta de plataforma sin piloto ni validación integral | 2.2 para contraste de interfaz multivista; pp. 3-4 |
| S26 | Cox et al. (2022) | Modelo clínico-operativo construido desde literatura y experiencia de una fuerza de tarea, sin muestra propia | 2.2 y 2.3 para triaje, modalidad y revisión; pp. 1-6 |

### Fuentes incorporadas en la ampliación documental

| ID | Autor-año | Función documental | Uso autorizado en el capítulo II |
|---|---|---|---|
| S49 | Gomes et al. (2017) | Fundamento formal | Delimitar CRDT, convergencia y sus límites frente a invariantes de negocio. |
| S50 | Birman y Joseph (1987) | Fundamento de comunicación confiable | Definir precedencia causal, fallo y recuperación. |
| S51 | Kokociński et al. (2021) | Fundamento de consistencia mixta | Separar transiciones coordinadas de actualizaciones eventuales. |
| S52 | Viotti y Vukolić (2016) | Revisión conceptual | Precisar la garantía de consistencia elegida. |
| S53 | Missier et al. (2013) | Estándar conceptual | Respaldar entidad, actividad y agente de PROV. |
| S54 | Pan et al. (2023) | Revisión de seguridad | Exigir protección de la propia proveniencia. |
| S55 | Singh et al. (2022) | Contexto de integridad multimodal | Delimitar riesgos de alteración, autenticación y proveniencia. |
| S56 | Curioso et al. (2023) | Contexto peruano | Identificar conectividad, interoperabilidad y capacidades como condiciones de diseño. |
| S57 | Paredes-Angeles et al. (2024) | Evidencia cualitativa peruana | Contextualizar dispositivos, conectividad y flujo de información sin extrapolar a la institución. |

### Fuentes fundacionales anteriores a 2021

| ID | Autor-año | Función | Páginas principales |
|---|---|---|---|
| S01 | Ruth et al. (2020) | Captura offline, auditoría y operación de campo | 4-5, 11-15 |
| S07 | Lomotey y Deters (2013) | CAP, consistencia eventual y multidispositivo | 2-4, 10-17 |
| S14 | Curcin et al. (2014) | Proveniencia interoperable, granularidad y consulta | 20-34, 44-46 |
| S15 | Curcin (2017) | Trazabilidad, auditabilidad y reproducibilidad | 3-10 |
| S17 | Medina-Martínez et al. (2020) | Pipeline multimodal institucional y versionado | 2-16 |
| S18 | Kelleher et al. (2020) | Telecaptura infantil, calidad y consenso humano | 4-13 |
| S29 | Bird et al. (2019) | Salud digital síncrona, soporte y factibilidad | 2-14 |
| S36 | Facca et al. (2020) | Ética digital con menores y asentimiento continuo | 5-15 |

## Matriz maestra de las 40 fuentes

| ID | Clasificación | Autor-año | Páginas de ficha usadas | Función de evidencia | Limitación de transferencia | Uso en el capítulo II |
|---|---|---|---|---|---|---|
| S01 | Fundacional | Ruth et al. (2020) | 4-5, 11-15 | Implementación de captura offline, roles, validación y auditoría en campo | Evitó concurrencia con un dispositivo por participante; sin evaluación controlada de fallos | 2.2 y 2.3: base de offline-first, continuidad local y auditoría |
| S02 | Reciente | Kim et al. (2026) | 1-2, 4-13 | Comparación experimental de arquitectura edge modular frente a pipeline de nube | Usuarios virtuales, un teléfono, 48 h y Wi-Fi estable para latencia; permanecer operativo no implicó captura completa | Introducción, 2.1, 2.2 y 2.3: desempeño, continuidad, fidelidad, recursos y límites de transferencia |
| S05 | Reciente | Ashista et al. (2026) | 1, 3-9 | Estudio mixto de factibilidad y rediseño a sincronización incremental | Once profesionales; mejora cualitativa sin métricas de latencia, conflicto o recuperación | 2.1-2.3: sincronización por eventos y riesgo multiusuario |
| S06 | Reciente | Zhang (2023) | 1-2, 4-16 | Prototipo WebSocket con difusión de eventos y persistencia de mensajes | Conectado, un caso demostrativo, sin EHR, seguridad completa ni fallos | 2.1-2.3: tiempo real, separación de señal y evidencia, durabilidad adicional |
| S07 | Fundacional | Lomotey y Deters (2013) | 2-4, 7-17 | Fundamento CAP, caché local, consistencia eventual y cola para desconectados | Tecnología histórica; pub/sub probado conectado y sin conflicto concurrente general | 2.2 y 2.3: consistencia eventual, convergencia y compromiso disponibilidad-consistencia |
| S08 | Reciente | Rodrigues et al. (2023) | 1, 3, 7-14, 19-22 | Arquitectura edge-fog-cloud, colas, offloading y servicio de nombres | Solo sharding preliminar local; despliegue integral futuro | 2.1-2.3: distribución por capas, localización y complejidad de recuperación |
| S09 | Reciente | Gierend et al. (2024) | 1-4, 7-15 | Revisión de alcance de proveniencia biomédica y requisitos | Sin evaluación de calidad/riesgo de sesgo; corpus heterogéneo | Introducción, 2.1-2.3: definición, modelos, granularidad y brechas de validación |
| S10 | Reciente | Sembay et al. (2023) | 1, 3-4, 8-30 | Revisión sistemática y taxonomía de siete propiedades | Solo 17 estudios, periodo y dominio acotados, herramientas industriales preliminares | 2.1-2.3: trazabilidad, confidencialidad, integridad, autenticidad y auditabilidad |
| S11 | Reciente | Sax et al. (2023) | 1-3 | Modelo mínimo de origen, versión, estado, exactitud y responsables | Propuesta conceptual breve, no validada ni implementada | 2.1: aviso de exclusión individual; 2.2-2.3: metadatos mínimos y definición de proveniencia |
| S12 | Reciente | Wittner et al. (2022) | 1-16 | Modelo distribuido de bundles, conectores, navegación y versiones | Automatización parcial; integridad y no repudio incompletos; dominio de patología | 2.1-2.3: linaje, discontinuidades, integridad, inmutabilidad y versionado |
| S13 | Reciente | Gierend et al. (2023) | 1-13 | Prueba de concepto de proveniencia por elemento interoperable | Datos simulados; no lista para auditoría acreditada ni uso real | 2.1-2.3: captura híbrida, transformación, responsable, exportación y validación |
| S14 | Fundacional | Curcin et al. (2014) | 20-34, 44-46 | Recomendaciones interoperables de modelado, captura, seguridad y consulta | Recomendaciones no definitivas; sin evaluación cuantitativa integral | 2.2 y 2.3: comparación de proveniencia y definición de pipeline |
| S15 | Fundacional | Curcin (2017) | 3-10 | Distinción entre auditabilidad, trazabilidad, replicabilidad y reproducibilidad | Falta validación formal completa y correspondencia metadatos-reporte | 2.2 y 2.3: delimitación conceptual y captura de versiones/actores |
| S16 | Reciente | Cejudo et al. (2025) | 1, 3-15 | Plataforma bronce-plata-oro con versionado, orquestación y carga | Un servidor; sin multinodo, interacción humana o audio/video/imagen | 2.1-2.3: pipeline, inmutabilidad, recuperación y desempeño |
| S17 | Fundacional | Medina-Martínez et al. (2020) | 2-16 | Plataforma multimodal versionada con UUID, checksum, estados y permisos | Casos oncológicos/genómicos y recursos HPC; FHIR futuro | 2.2 y 2.3: relación sujeto-evidencia-análisis y versionado recuperable |
| S18 | Fundacional | Kelleher et al. (2020) | 4-13 | Piloto infantil domiciliario multimodal con segmentación y consenso humano | 16 niños, muestra poco diversa, Internet rápido y sin comparación de laboratorio | 2.2 y 2.3: calidad por modalidad, tarea, pérdida y revisión humana |
| S19 | Reciente | Kalanadhabhatta et al. (2025) | 2-3, 5-21 | Estudio domiciliario diádico y pipeline audio-fisiología | 34 díadas, generalización limitada, dos dispositivos y clasificación no transferible | 2.1-2.3: actor/fase, original/derivado, calidad, privacidad y carga |
| S22 | Reciente | Ramanarayanan (2024) | 2-3, 6-9 | Revisión narrativa y taxonomía fuente-modalidad | Sin datos nuevos, sincronización, almacenamiento o auditoría; conflicto comercial declarado | 2.1: aviso de exclusión individual; 2.2-2.3: fuente frente a derivado, robustez y controles de captura |
| S23 | Reciente | Wang et al. (2023) | 1-5, 8-10 | Sistema multifuente con base estructurada y archivos originales | Población adulta; sincronía sin error cuantificado; plataforma no unificada | 2.1 y 2.2: antecedente tecnológico y contraste de persistencia multifuente |
| S24 | Reciente | Bartolomei et al. (2025) | 3-4 | Propuesta multivista con línea temporal común | Sin piloto integral; carga manual; sin precisión temporal, permisos ni versionado | 2.1: aviso de exclusión individual; 2.2: contraste conceptual de revisión temporal de originales y derivados |
| S25 | Reciente | Modi et al. (2023) | 2-4 | Piloto de captura parental, consentimiento y entrega clínica | Pequeño, regional, PARCA-R y población prematura; no comparación presencial | 2.1-2.3: separación identidad-autorización-resultado y flujo temporal |
| S26 | Reciente | Cox et al. (2022) | 1-6 | Modelo de triaje y teleevaluación remota/presencial/híbrida | Modelo conceptual sin plataforma o batería validada | 2.1: aviso de exclusión individual; 2.2-2.3: selección de modalidad, escalamiento y profesional responsable |
| S27 | Reciente | Qureshi et al. (2026) | 2-3, 5-7 | Revisión de alcance del círculo de cuidado y cierre de alertas | Oncología pediátrica, heterogeneidad y predominio de pilotos/sitio único | 2.1-2.3: recepción, acción documentada, reciprocidad e integración |
| S28 | Reciente | Amed et al. (2025) | 1-15 | Piloto pediátrico interoperable con app, tablero, API/FHIR y SUS | Muestra pequeña, sin perspectiva infantil ni métricas técnicas de sincronización | 2.1-2.3: vistas por rol, revisión, usabilidad y límites de percepción |
| S29 | Fundacional | Bird et al. (2019) | 2-14 | Revisión de alcance de salud digital pediátrica síncrona y factibilidad | Sin evaluación de calidad, población heterogénea y sin persistencia multimodal | 2.2 y 2.3: soporte, degradación de canal, implementación y factibilidad |
| S31 | Reciente | Bhavnani et al. (2025) | 1, 3-14 | Validación longitudinal de evaluación cognitiva digital offline | DEEP no es DAYC-2; sin test-retest, validez estructural o transcultural; solo cognición | 2.1-2.3: digital/offline, captura granular y separación de validez por instrumento |
| S32 | Reciente | La Valle et al. (2022) | 1, 4-14 | Revisión sistemática de teleevaluación síncrona y store-and-forward | Nueve estudios, solo uno de buena calidad, ninguno domiciliario | 2.1-2.3: patrones remotos, revisión especialista y límites de concordancia |
| S33 | Reciente | Gangi et al. (2025) | 1-7 | Ensayo de teleevaluación domiciliaria con revisión, diferimiento y consenso | Instrumento de autismo, dos estados, familias con tecnología e inglés | 2.1-2.3: cuidador guiado, human-in-the-loop y escalamiento |
| S36 | Fundacional | Facca et al. (2020) | 5-15 | Revisión de alcance de ética digital con menores | Literatura heterogénea, solo inglés y sin norma jurídica universal | 2.2: fundamento comparativo de ética digital con menores |
| S38 | Reciente | Wild et al. (2023) | 1-9 | Estudio cualitativo de custodia, intercambio y consentimiento infantil | 24 participantes de un servicio neozelandés; contexto cultural/jurídico específico | 2.1-2.3: finalidad, destinatario, custodio, renovación y retiro |
| S39 | Reciente | Mirabella et al. (2025) | 1-17 | Síntesis cualitativa de asentimiento infantil multimodal | Tres casos retrospectivos, 5-7 años y señales dependientes del contexto | 2.1-2.3: asentimiento continuo, pausa, disenso y no automatización |
| S40 | Reciente | McElwain et al. (2024) | 1-13 | Métodos mixtos sobre experiencia de wearable infantil multimodal | Experiencia infantil indirecta y muestras con alto nivel educativo | 2.1-2.3: control visible, privacidad, carga, comprensión y retiro |
| S41 | Reciente | Laigner et al. (2026) | 3, 8-12, 22-30, 44, 52-53 | Estudio empírico de problemas de gestión de eventos | Stack Overflow como fuente; frecuencias no son tasas de fallo productivas | 2.1-2.3: entrega, replay, reintento, idempotencia, orden y observabilidad |
| S42 | Reciente | Aguru et al. (2022) | 1-6, 14, 17-19, 31-32 | Investigación sistemática y arquitectura de referencia IoT sanitaria | SHRA no fue implementada ni validada extremo a extremo | 2.1-2.3: capas, reconciliación, colaboración y madurez de propuesta |
| S43 | Reciente | Medhi et al. (2022) | 1-7 | Prototipo dew con procesamiento, base local y sincronización posterior | Laboratorio/simulación, tres nodos, ECG y sin conflictos o recuperación | 2.1-2.3: nodo autónomo, persistencia y sincronización diferida |
| S44 | Reciente | Geangu et al. (2023) | 1-2, 5-6, 17-37 | Plataforma infantil multimodal con señal común, respaldo y calidad | Un modelo de tableta, pocos hogares y operación técnicamente exigente | 2.1-2.3: sincronía verificable, reloj, originales y defectos preservados |
| S45 | Reciente | Leo et al. (2022) | 1, 3-18 | Estado del arte de video infantil y pipeline de análisis | No revisión sistemática reproducible ni plataforma propia; datos/modelos heterogéneos | 2.1-2.3: contexto de calidad, anotación, incertidumbre y revisión de originales |
| S46 | Reciente | McHenry et al. (2023) | 3-14 | Panorama de 16 evaluaciones cognitivas infantiles en tableta | No sistemática; datos de entrevistas; versiones, culturas y psicometría heterogéneas | 2.1-2.3: evaluación digital, sensores, formación y validez contextual |
| S47 | Reciente | Torres-Escobar et al. (2025) | 1-6 | Comparación prospectiva EDI remota-presencial | 50 niños, conveniencia, un sitio, Internet/materiales y menor sensibilidad neurológica | 2.1-2.3: cuidador-profesional, capacitación y escalamiento presencial |
| S48 | Reciente | Ke et al. (2024) | 1, 3-11 | Análisis retrospectivo que retuvo la evaluación cronológicamente anterior: 83 DAYC-2 remotos y 120 Bayley-4 presenciales | Tres pacientes recibieron ambos instrumentos en visitas distintas, ninguno en la misma visita; comparación no pareada y modalidad no aleatoria | Introducción, 2.1-2.3: antecedente directo DAYC-2, interpretación profesional y delimitación de la comparación |

## Trazabilidad de afirmaciones de alto riesgo

| Afirmación utilizada | Fuente y páginas de ficha | Comprobación adicional en artículo convertido | Tratamiento en el capítulo |
|---|---|---|---|
| Screenomics continuó 48 h, pero su fidelidad final fue de 44,2 %-99,1 % según carga | S02, p. 9 | S02.md, resultados de continuidad y captura al final de 48 h | Se distingue continuidad de completitud de captura |
| La revisión de proveniencia incluyó 66 estudios | S09, pp. 3-4 | S09.md, selección y caracterización de los 66 estudios | Se usa para dimensionar esa revisión, no la muestra documental de la tesis |
| El cuerpo del artículo DEEP informa r = 0,87, n = 3193 e IC 95 % de 0,86-0,89 para edad, mientras el resumen informa r = 0,83 e IC 95 % de 0,82-0,84 | S31, pp. 1, 10 | S31.md, resumen, resultado de validez de criterio y figura 3 | Se presentan ambos valores y se declara la discrepancia interna, sin escoger uno de forma implícita |
| Una intervención documentó acción profesional en 52 % de 339 alertas | S27, pp. 3, 6 | S27.md, síntesis de SyMon-SAYS | Se usa para diferenciar alerta de cierre, no como efecto clínico |
| Entre 78 casos con diagnósticos determinados en el brazo con segunda evaluación presencial, 73/78 (94 %) concordaron y κ = 0,82 | S33, pp. 5-6 | S33.md, tabla de acuerdo y resultados de validez convergente | Se conserva denominador, brazo, instrumento y límites de transferencia |
| EgoActive validó detección sobre 1444 series y 1218 señales reales | S44, p. 29 | S44.md, sección de validación de sincronización | Se utiliza para madurez del componente, no como garantía del pipeline de tesis |
| EDI obtuvo alta concordancia global y mostró diferencias físicas de hasta 3 cm | S47, pp. 4-6 | S47.md, resultados y discusión | Se presenta junto con muestra pequeña y regla de escalamiento |
| El análisis retuvo la evaluación cronológicamente anterior de 203 pacientes: 83 DAYC-2 y 120 Bayley-4; tres recibieron ambos en visitas distintas y ninguno en la misma visita | S48, pp. 4, 6 | S48.md, metodología y características de la muestra | Se recalca que no hubo comparación pareada |
| SUS cuidador fue 71,9 y hubo 41 encuestas profesionales | S28, pp. 4-5 | S28.md, resultados de cuidadores y profesionales | Se presenta como experiencia de producto, no umbral ni eficacia clínica |

## Trazabilidad hacia la operacionalización

Los indicadores se desarrollan fuera del capítulo II, en los documentos de variables y validación. Esta tabla conserva la correspondencia entre conceptos y operacionalización para control interno; sus códigos, fórmulas, escenarios y criterios no forman parte del marco conceptual redactado en la tesis.

| Indicadores | Conceptos delimitados | Fuentes de apoyo principales | Uso permitido |
|---|---|---|---|
| I01-I06 | offline-first, continuidad, recuperación, latencia, error, capacidad y recursos | S01-S02, S05-S08, S42-S43 | Definir propiedades; no fijar umbrales desde resultados ajenos |
| I07-I12 | consistencia eventual, convergencia, pérdida, idempotencia, orden y conflictos | S05, S07, S41 | Separar mensaje, evento y efecto; exigir política explícita |
| I13-I19 | proveniencia, linaje, trazabilidad, huecos, integridad, versionado e inmutabilidad | S09-S17 | Definir estructura y relaciones; no asumir calidad clínica |
| I20-I25 | disponibilidad multimodal, calidad, original/derivado y sincronización temporal | S18-S19, S22-S24, S44-S45 | Medir por modalidad; solo afirmar alineación con referencia común |
| I26-I30 | recepción, cierre, oportunidad, recorrido profesional y human-in-the-loop | S25-S29, S32-S33, S47-S48 | Mantener interpretación y decisión bajo responsabilidad profesional |
| I31-I33 | autorización y auditabilidad de acceso | S10, S25, S36, S40 | Distinguir autenticación, autorización y registro |
| I34-I39 | consentimiento, asentimiento, pausa y retiro | S25, S36, S38-S40 | Tratar decisiones como contextuales y trazables; no afirmar regla jurídica universal |
| I40 | corrección funcional | S31-S33, S46-S48 | Comparar con casos autorizados del manual; no inferir validez psicométrica |
| I41-I45 | factibilidad, incidencias, usabilidad, comprensión y carga | S19, S28-S29, S39-S40 | Caracterización exploratoria separada de eficacia clínica y pruebas técnicas |

## Balance de cobertura

| Clase | Cantidad exacta | Fuentes |
|---|---:|---|
| Recientes, 2022-2026 | 32 | S02, S05, S06, S08-S13, S16, S19, S22-S28, S31-S33, S38-S48 |
| Fundacionales, anteriores a 2021 | 8 | S01, S07, S14, S15, S17, S18, S29, S36 |
| Publicaciones de 2021 | 0 | Ninguna |
| Total cubierto | 40 | 40 de 40 fuentes validadas |

## Dependencias documentales externas no resueltas

| Dependencia | Estado | Efecto sobre el capítulo |
|---|---|---|
| Definiciones autorizadas de desarrollo infantil, neurodesarrollo, primera infancia, hitos y dominios | No cubiertas suficientemente por la muestra | Impide fijar en 2.3 una taxonomía pediátrica normativa |
| Fuentes pediátricas sobre evaluación, vigilancia, tamizaje y diagnóstico | No cubiertas suficientemente por la muestra | Impide establecer diferencias clínicas generales entre estos procesos |
| Fundamentos psicométricos sobre estandarización, validez y confiabilidad | No cubiertos suficientemente por la muestra | Impide formular definiciones psicométricas generales más allá de delimitar su dependencia del instrumento y población |
| Manual oficial DAYC-2 | No incorporado a la muestra autorizada | Impide cerrar detalles normativos de dominios, edades, administración, puntuación, materiales, capacitación y casos funcionales autorizados |
| Normativa peruana aplicable a datos personales, salud y menores | No cubierta por la muestra autorizada | Impide presentar los principios de gobernanza como obligaciones jurídicas locales definitivas |
| Reglamento y plantilla institucional | No incorporados como fuente sustantiva de la muestra | La clasificación y el formato final deberán contrastarse antes de la transferencia institucional |
| Evidencia primaria del proceso local | No disponible | No permite afirmar prevalencia, tiempos, fallos, conectividad ni prácticas de la institución peruana |

## Lista final de comprobación

### Integridad de cada antecedente individual

| ID | Objetivo | Diseño/fuente | Procedimiento | Resultado | Conclusión | Contribución | Limitación | Necesidad |
|---|---|---|---|---|---|---|---|---|
| S48 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S19 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S25 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S27 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S28 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S31 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S32 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S33 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S38 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S39 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S40 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S45 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S46 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S47 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S02 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S05 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S06 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S08 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S09 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S10 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S12 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S13 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S16 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S23 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S41 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S42 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S43 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |
| S44 | [x] | [x] | [x] | [x] | [x] | [x] | [x] | [x] |

### Comprobaciones globales

- [x] El capítulo contiene exactamente los encabezados principales solicitados: título, 2.1, 2.2, 2.3 y referencias.
- [x] Se clasificaron exactamente 32 fuentes recientes de 2022-2026 y 8 fundacionales anteriores a 2021.
- [x] Se declaró de forma expresa que la muestra no contiene fuentes de 2021.
- [x] 2.1 presenta exactamente 28 antecedentes individuales: 1 directo, 13 relacionados y 14 tecnológicos.
- [x] S11, S22, S24 y S26 se excluyen como antecedentes individuales con razón y destino explícitos.
- [x] Las ocho fuentes fundacionales permanecen separadas de los antecedentes recientes.
- [x] Las 40 fuentes aparecen comparadas en 2.2; las ocho fundacionales no se presentan como antecedentes recientes.
- [x] Las brechas se formulan como capacidades ausentes de la muestra revisada, no como inexistencias universales.
- [x] Se cubren arquitectura/offline, eventos, proveniencia/versionado, multimodalidad, multi-actor, evaluación infantil/DAYC-2 y gobernanza.
- [x] 2.3 define los conceptos respaldados por la muestra sin códigos, fórmulas, umbrales ni lenguaje de prueba, y declara pendientes las definiciones pediátricas y psicométricas no autorizadas.
- [x] Nodo, evento/comando/efecto y autorización se presentan como definiciones operacionales adoptadas por la investigación, con el alcance de sus apoyos documentales delimitado.
- [x] La correspondencia entre conceptos e indicadores quedó confinada a “Trazabilidad hacia la operacionalización” en esta matriz interna.
- [x] Las afirmaciones del capítulo y las páginas consignadas en esta matriz se contrastaron con las fichas validadas durante la revisión documental.
- [x] Las páginas de resultados y conclusiones de los 28 antecedentes se registraron por separado y las conclusiones se verificaron en `articulos_markdown`.
- [x] S19, S23 y S45 distinguen la conclusión formal de las precisiones o recomendaciones desarrolladas en la discusión.
- [x] Las correcciones factuales de S02, S09, S31, S33 y S48 se contrastaron adicionalmente con `articulos_markdown`.
- [x] No se incluyeron códigos `Sxx` en la prosa ni en las tablas del capítulo final.
- [x] Las referencias del capítulo proceden de la bibliografía APA 7 normalizada y corresponden a fuentes citadas.
- [x] DAYC-2 permanece como caso de estudio con interpretación profesional obligatoria.
- [x] No se afirma diagnóstico autónomo, validación psicométrica propia ni equivalencia con Bayley-4.
- [x] Los detalles normativos DAYC-2 permanecen condicionados al manual oficial.
- [x] No se inventaron antecedentes peruanos ni datos del proceso institucional local.
- [ ] Incorporar fuentes pediátricas autorizadas sobre desarrollo, neurodesarrollo, primera infancia, hitos, dominios, vigilancia, tamizaje y diagnóstico.
- [ ] Incorporar fundamentos psicométricos autorizados sobre estandarización, validez y confiabilidad.
- [ ] Incorporar el manual oficial DAYC-2 mediante el procedimiento documental autorizado antes de cerrar los casos funcionales.
- [ ] Incorporar normativa peruana y aprobación ética/institucional antes de cerrar reglas jurídicas de gobernanza.
- [ ] Verificar formato, clasificación y extensión contra la plantilla y el reglamento institucionales.

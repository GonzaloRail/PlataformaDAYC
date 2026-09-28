# VARIABLES, INDICADORES Y UMBRALES DE ACEPTACIÓN

## 1. Propósito

Este documento operacionaliza las variables del capítulo 1 y define cómo se medirán las propiedades técnicas y operativas de la arquitectura distribuida orientada a eventos, con sincronización multi-actor y pipeline trazable de evidencias multimodales. La evaluación digital del desarrollo infantil se mantiene como caso de estudio reemplazable y fuente de requisitos funcionales; los indicadores centrales evalúan la arquitectura y no la validez psicométrica del instrumento seleccionado.

La evaluación principal será una verificación de cumplimiento bajo escenarios controlados. No se afirmará superioridad causal frente a otra arquitectura porque no se ha definido una línea base funcional comparable. La literatura sustenta qué propiedades deben medirse y qué riesgos deben probarse, pero sus valores de rendimiento no se trasladarán como umbrales debido a diferencias de hardware, carga, red y dominio (Kim et al., 2026, pp. 6-12; Cejudo et al., 2025, pp. 8-15).

## 2. Estado de preespecificación

El documento se cerrará en tres momentos:

1. **Protocolo técnico v1, antes de la calibración:** congela variables, códigos, fórmulas, dirección favorable, invariantes críticos, escenarios, reglas de datos faltantes y valores de aceptación respaldados por requisitos independientes.
2. **Protocolo técnico v2, después de la prueba técnica preliminar:** conserva sin cambios esos valores de aceptación y completa duración, repeticiones, intervalos, configuración física y artefactos confirmatorios. Se congela antes de la evaluación técnica confirmatoria y no vuelve a modificarse con sus resultados.
3. **Protocolo de campo v2, después del piloto exploratorio:** ajusta únicamente instrumentos, procedimiento y criterios descriptivos de `I41-I45`. Se congela antes de la aplicación humana principal y no modifica los criterios de la hipótesis técnica.

Los resultados preliminares y del piloto no formarán parte de la base confirmatoria. Toda modificación posterior se registrará como enmienda con fecha, responsable, justificación y efecto sobre los análisis.

## 3. Variables de investigación

### 3.1 Intervención tecnológica

El objeto evaluado es una **arquitectura de software distribuida orientada a eventos, con sincronización multi-actor y pipeline trazable de evidencias multimodales**. La intervención debe incorporar, como mínimo:

- persistencia local de operaciones críticas;
- sincronización y reintentos controlados;
- identificación e idempotencia de eventos;
- control optimista de versiones y política explícita de conflictos;
- separación entre evidencias originales y derivadas;
- metadatos de proveniencia y calidad;
- control de acceso por rol;
- revisión y decisión profesional documentadas;
- registro de consentimiento, asentimiento, pausa y retiro.

Estas capacidades se verificarán antes de ejecutar la evaluación de rendimiento. Una capacidad ausente no podrá compensarse con resultados favorables en otra dimensión.

### 3.2 Variable independiente

La variable independiente es la **configuración experimental aplicada a la arquitectura**. Está formada por factores manipulados de manera controlada:

| Factor | Código | Niveles preliminares | Forma de control |
|---|---|---|---|
| Perfil de conectividad | `F_RED` | estable; degradada; intermitente; desconectada; reconexión | Proxy o controlador de red con perfil versionado |
| Concurrencia | `F_CONC` | 1, 10, 25, 50 y 100 sesiones | Generador de carga con semillas y guion fijo |
| Fallo inducido | `F_FALLO` | ninguno; duplicación; omisión temporal; retraso; desorden; reinicio | Proxy de fallos y orquestador de componentes |
| Modalidad | `F_MOD` | respuesta; evento; captura/imagen; audio; video | Manifiesto de evidencias sintéticas autorizado |

Las modalidades de audio y video solo se incluirán cuando el protocolo las autorice. La alineación temporal se evaluará únicamente entre corrientes que compartan una referencia temporal definida.

### 3.3 Variable dependiente

La variable dependiente es la **calidad técnica y operativa de la arquitectura distribuida bajo configuraciones controladas**. Comprende:

- desempeño;
- continuidad y recuperación;
- consistencia y confiabilidad de eventos;
- trazabilidad e integridad;
- gestión multimodal;
- revisión profesional;
- gobernanza;
- usabilidad y factibilidad operativa.

La evaluación con personas es secundaria y exploratoria. Sus resultados de usabilidad, comprensión y carga no determinarán por sí solos el contraste técnico principal.

## 4. Unidades y notación

| Símbolo | Definición |
|---|---|
| `N_OP` | Operaciones válidas intentadas en un escenario |
| `N_SES` | Sesiones ejecutadas o afectadas |
| `N_EV_LOCAL` | Eventos confirmados en almacenamiento local durable |
| `N_EV_FINAL` | Eventos únicos presentes en el estado canónico final |
| `N_EVID` | Evidencias esperadas según el manifiesto de sesión |
| `N_RES` | Resultados o salidas seleccionados para reconstrucción |
| `t0(e)` | Instante de confirmación local durable del evento `e`, convertido a una referencia común |
| `tr(e,j)` | Instante en que el actor o réplica `j` observa el efecto de `e`, convertido a la misma referencia |
| `Vj(s,t)` | Estado o versión de la sesión `s` en el nodo `j` |
| `V*(s)` | Estado esperado de `s`, calculado por un oráculo independiente |
| `W` | Duración en segundos de la ventana estable de medición, sin calentamiento ni vaciado |
| `Ti` | Umbral preespecificado del indicador `i` |

La unidad experimental se declarará para cada indicador: operación, evento, evidencia, sesión, ejecución, díada o profesional. Para evitar intervalos artificialmente estrechos, la unidad de remuestreo será normalmente la sesión o ejecución, no cada evento dependiente dentro de ella.

### 4.1 Matriz maestra de operacionalización

Esta tabla separa los campos obligatorios de cada indicador. Las definiciones y reglas ampliadas aparecen en las secciones 5 a 8.

| Código | Variable | Dimensión | Fórmula resumida | Técnica | Instrumento | Unidad | Umbral | Fuente de datos | Escenario | Unidad experimental | Dirección favorable | Sustento |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| I01 | VD | Continuidad | `100 × durables/programadas` | Prueba funcional | Manifiesto externo e inspector local | % | 100 % determinista | Guion externo y almacenamiento local | E2-E3 | operación | mayor | S05, pp. 6-9; S43, pp. 3-7 |
| I02 | VD | Recuperación | `I02-C: 100 × recuperadas/afectadas`; `I02-T: T_R` | Inyección de fallos | Snapshots y oráculo | %, s | I02-C: 100 %; I02-T: TBD | Estado previo y final | E2, E3, E7a-E7d, E9 | sesión | mayor; menor tiempo | S43, pp. 3-7; S16, p. 6 |
| I03 | VD | Desempeño | `L_oneway = g_j(tr)-g_i(t0)`; RTT separado | Medición extremo a extremo | Telemetría y reloj común | ms | P50/P95/P99 TBD; RTT diagnóstico | Trazas correlacionadas | E0, E1, E3, E9 | evento/sesión | menor | S02, pp. 6-12 |
| I04 | VD | Confiabilidad | `100 × fallos inesperados/operaciones válidas` | Observación automatizada | Logs y clasificador | % | TBD | Respuestas, errores y timeouts | E0-E9 | ejecución | menor | S02, pp. 6-12; S16, pp. 8-15 |
| I05 | VD | Capacidad | `eventos útiles/W` | Prueba de carga | Generador y reconciliador | eventos/s | TBD | Confirmaciones únicas | E0, E1, E3 | ejecución | mayor | S02, pp. 6-10; S16, pp. 8-13 |
| I06 | VD | Eficiencia | P95 CPU/RAM; bytes/sesión | Perfilado | Métricas SO, contenedor y red | %, MB/GB | TBD | Telemetría de recursos | E0, E2, E3, E9 | ejecución | menor | S02, pp. 6-10 |
| I07 | VD | Consistencia | `I07-C: 100 × convergentes/sesiones`; `I07-T_recon`; `I07-T_write` | Comparación de estado | Hashes, versiones y oráculo | %, s | I07-C: 100 %; tiempos TBD | Snapshots de nodos | T_recon: E3/E9; T_write: E0/E6/E8 | sesión | mayor; menor tiempo | S05, pp. 6-9; S41, pp. 23-30 |
| I08 | VD | Confiabilidad de eventos | `100 × comprometidos ausentes/comprometidos` | Reconciliación | Manifiesto externo y logs | %, conteo | 0 determinista | Aceptaciones, entregas y efectos | E2-E7d, E9 | evento | menor | S41, pp. 25-30 |
| I09 | VD | Idempotencia | `100 × efectos extra/eventos comprometidos` | Redelivery/replay | Inyector y auditor | %, conteo | 0 determinista | Efectos de negocio | E4, E7c-E7d, E9 | evento | menor | S41, pp. 25-30 |
| I10 | VD | Orden | `100 × precedencias inválidas/precedencias` | Permutación y retraso | Secuenciador y validador | %, conteo | 0 determinista | Log de aplicación | E6, E9 | relación causal | menor | S41, pp. 23-30 |
| I11 | VD | Conflictos | `100 × detectados/inyectados` | Escritura concurrente | Barreras y versiones | % | 100 % determinista | Registro de conflictos | E8-E9 | conflicto | mayor | S41, pp. 25-30 |
| I12 | VD | Conflictos | `100 × incorrectos/inyectados` | Comparación con política | Matriz de resolución | % | 0 determinista | Decisión y estado final | E8-E9 | conflicto | menor | S41, pp. 25-30 |
| I13 | VD | Proveniencia | `100 × campos válidos/aplicables` | Validación de esquema | Validador de metadatos | % | 100 % determinista | Manifiestos de evidencia | E0-E9 | campo | mayor | S11, pp. 1-2; S09, pp. 9-14 |
| I14 | VD | Proveniencia | `100 × evidencias completas/evidencias` | Consulta y revisión | Lista de completitud | % | 100 % determinista | Catálogo de evidencias | E0-E9 | evidencia | mayor | S09, pp. 9-14 |
| I15 | VD | Trazabilidad | `100 × resultados reconstruibles/resultados` | Recorrido retrospectivo | Consulta de linaje y lista | % | 100 % determinista | Grafo/manifiesto de linaje | E3, E7, E9 | resultado | mayor | S12, pp. 5-11; S13, pp. 6-12 |
| I16 | VD | Trazabilidad | `100 × huecos detectados/huecos inyectados` | Omisión controlada | Grafo-oráculo | % | 100 % determinista | Inyecciones y alertas | E5, E7, E9 | hueco | mayor | S12, pp. 5-8 |
| I17 | VD | Integridad | `100 × hashes vigentes/originales` | Verificación criptográfica | Manifiesto de hashes | % | 100 %; 0 silenciosos | Archivos originales | E0, E3, E7 | original | mayor | S12, pp. 5, 11-13 |
| I18 | VD | Integridad de derivación | `100 × derivados con linaje completo y salida verificada/derivados esperados` | Validación y recomputación | Manifiesto de ejecución | % | 100 % determinista | Entradas, salidas y parámetros | E0, E3, E7 | derivado | mayor | S13, pp. 6-12 |
| I19 | VD | Versionado | `100 × actualizaciones versionadas/actualizaciones` | Comparación antes/después | Auditor de versiones | % | 100 % determinista | Versiones e hashes | E0, E8 | actualización | mayor | S12, pp. 9-11; S16, pp. 4-7 |
| I20 | VD | Disponibilidad multimodal | `I20-E: estructuradas recuperables/esperadas`; `I20-M: medios recuperables/esperados` | Captura y recuperación | Manifiesto esperado-observado | % | I20-E: 100 %; I20-M: TBD | Archivos y registros | E0-E3 | unidad/modalidad | mayor | S19, pp. 8-11; S44, pp. 27-35 |
| I21 | VD | Calidad multimodal | `100 × estados documentados/esperados` | Validación de metadatos | Catálogo de causas | % | 100 % determinista | Estados de calidad | E0-E9 | unidad/modalidad | mayor | S19, pp. 8-11; S44, pp. 31-35 |
| I22 | VD | Calidad multimodal | `100 × duración utilizable/autorizada` | Análisis y revisión humana | Marcador de intervalos | % | TBD | Corrientes temporales | E0-E3 | modalidad/sesión | mayor | S19, pp. 8-11; S44, pp. 31-35 |
| I23 | VD | Calidad estructurada | `100 × registros válidos/esperados` | Validación de reglas | Esquema y casos sintéticos | % | 100 % determinista | Respuestas y eventos | E0-E9 | registro | mayor | S22, pp. 2-3, 6-8 |
| I24 | VD | Calidad multimodal | `detectados/oráculo`; `detectados y preservados/oráculo` | Inyección de defectos | Oráculo y comparador | % | 100 % en ambas | Defectos y anotaciones | E0-E3 | intervalo | mayor | S44, pp. 31-35 |
| I25 | VD | Alineación temporal | P95 y máximo de `abs(t_a-T(t_b))` | Anclas comunes | Reloj y estimador de deriva | ms, ppm | TBD; condicional | Marcas de corrientes | E0, E1, E3, E7 | ancla | menor | S44, pp. 23-30 |
| I26 | VD | Revisión profesional | `100 × casos con recepción y asignación/casos enviados` | Seguimiento de flujo | Telemetría de estados | % | 100 % determinista | Eventos de caso | E0, E3 | caso | mayor | S27, pp. 5-7 |
| I27 | VD | Revisión profesional | `100 × cierres completos/casos revisables` | Auditoría de estados | Lista de cierre | % | 100 % determinista | Estado y decisión | E0, E3, E8 | caso | mayor | S27, pp. 5-7 |
| I28 | VD | Oportunidad de revisión | `100 × cierres en SLA/elegibles al corte` | Seguimiento temporal | Tablero versionado | %, tiempo | TBD | Marcas de recepción/cierre | E0, E3 | caso | mayor | S27, pp. 5-7 |
| I29 | VD | Revisión profesional | `I29-F: 100 × recorridos sintéticos completos/programados`; `I29-T: tiempo técnico` | Prueba automatizada | API/visor, trazas y cronómetro | %, tiempo | I29-F: 100 %; I29-T: TBD | Recorridos sintéticos | E0, E3 | recorrido | mayor; menor tiempo | S27, pp. 5-7; S12, pp. 5-8 |
| I30 | VD | Control profesional | Conteo de salidas finales sin revisión | Prueba negativa | Auditoría de transiciones | conteo | 0 determinista | Salidas y decisiones | E0, E4, E8 | salida | menor | S27, pp. 5-7 |
| I31 | VD | Autorización | `100 × decisiones correctas/intentos` | Pruebas positivas/negativas | Matriz RBAC | % | 100 % exhaustivo | Manifiesto externo y API | E0-E9 | intento | mayor | S10, pp. 21-22; S25, pp. 2-4 |
| I32 | VD | Autorización | Conteo de accesos indebidos exitosos | Ataque controlado | Cliente de pruebas y logs | conteo | 0 exhaustivo | Respuestas y efectos | E0-E9 | intento | menor | S10, pp. 21-22 |
| I33 | VD | Auditabilidad | `100 × accesos trazados/intentos externos` | Comparación de tráfico | Manifiesto y bitácora | % | 100 % exhaustivo | Intentos permitidos/denegados | E0-E9 | intento | mayor | S10, pp. 21-22 |
| I34 | VD | Consentimiento | `100 × operaciones autorizadas/operaciones reguladas` | Máquina de estados | Matriz de alcance | % | 100 %; 0 fuera de alcance | Autorización y operación | E0-E9 | operación | mayor | S38, pp. 5-8; S25, pp. 2-4 |
| I35 | VD | Asentimiento | `100 × sesiones con procedimiento/sesiones aplicables` | Observación estructurada | Lista aprobada | % | 100 % procedimental | Observación y estados | Piloto/campo | sesión | mayor | S39, pp. 3-4, 7-11 |
| I36 | VD | Asentimiento | `100 × checkpoints realizados/previstos` | Observación | Registro contextual | % | 100 % procedimental | Checkpoints | Piloto/campo | checkpoint | mayor | S39, pp. 7-11, 15 |
| I37 | VD | Pausa | `I37-F: 100 × pausas ejecutadas/solicitadas`; `I37-T: L_pausa` | Prueba funcional | Telemetría y lista | %, ms | I37-F: 100 %; I37-T: diagnóstico TBD | Orden y última captura | E0-E3/campo | pausa | mayor; menor tiempo | S39, pp. 7, 10-11 |
| I38 | VD | Retiro | `100 × retiros ejecutados/retiros válidos` | Consulta de linaje | Lista de retiro | % | 100 % determinista | Objetos y estados | E0-E3/campo | retiro | mayor | S38, pp. 6-8 |
| I39 | VD | Retiro | `100 × retiros trazados/retiros válidos` | Auditoría | Bitácora de retiro | % | 100 % determinista | Solicitante, alcance y resultado | E0-E3/campo | retiro | mayor | S38, pp. 6-8 |
| I40 | Caso | Corrección funcional de la instanciación | `100 × casos correctos/casos autorizados` | Prueba determinista | Casos oficiales autorizados | % | 100 %; 0 discrepancias | Oráculo del caso | Funcional | caso | mayor | Documentación oficial pendiente |
| I41 | VD | Factibilidad | `100 × tareas completas/tareas intentadas` | Observación | Ficha de tareas | % | TBD exploratorio | Registro del piloto | Piloto/campo | tarea | mayor | S28, pp. 4-6; S40, pp. 5-13 |
| I42 | VD | Factibilidad | `incidencias/sesión`; `% tareas con ayuda` | Observación | Ficha de incidencias | tasa, % | TBD exploratorio | Registro del piloto | Piloto/campo | sesión/tarea | menor | S40, pp. 5-13 |
| I43 | VD | Usabilidad | `SUS = 2.5 × suma de aportes` | Encuesta | SUS aprobado | 0-100 | TBD exploratorio | Cuestionario | Piloto/campo | participante | mayor | S28, pp. 4, 15; Brooke, 1996, pp. 189-194 |
| I44 | VD | Comprensión | `% correcto por componente`; `% conjunto` | Preguntas/entrevista | Instrumento validado | % | TBD exploratorio | Respuestas del participante | Piloto/campo | participante | mayor | S39, p. 6; S40, pp. 11-12 |
| I45 | VD | Carga percibida | Mediana, rango y `% con carga alta` por tarea y rol | Escala ordinal e entrevista | Instrumento aprobado | 0-10, % | Exploratorio; sin umbral de H1 | Respuestas posteriores a cada tarea | Piloto/campo | participante/tarea | menor | S40, pp. 5-13 |

Los identificadores `Sxx` de la columna de sustento remiten al manifiesto bibliográfico. En particular, los antecedentes de usabilidad, consentimiento y experiencia corresponden a Amed et al. (2025, pp. 4-6, 15), Modi et al. (2023, pp. 2-4), Gierend et al. (2024, pp. 9-14) y McElwain et al. (2024, pp. 5-13).

## 5. Indicadores técnicos

### 5.1 Continuidad y desempeño

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I01` | **Disponibilidad offline:** `A_off = 100 × N_operaciones_críticas_durables / N_operaciones_críticas_programadas`. El denominador procede del manifiesto externo del generador, no de los logs del sistema probado. | % | Prueba funcional; manifiesto externo, controlador de red, automatizador e inspector local | `E2`, `E3`; todas las cargas | **Crítico: 100 %**. Toda operación programada debe completarse o quedar durable sin pérdida de progreso. |
| `I02` | **Recuperación:** `I02-C = 100 × N_sesiones_recuperadas_con_estado_exacto / N_sesiones_afectadas`; `I02-T = t_estado_operativo - t_fin_fallo`. | %, ms o s | Inyección de fallos; snapshots, logs y comparador contra oráculo | `E2`, `E3`, `E7`, `E9` | `I02-C` **crítico: 100 %**. P50/P95/P99 de `I02-T` **secundario: TBD**. |
| `I03` | **Latencia de propagación unidireccional:** `L_oneway(e,j) = g_j(tr(e,j)) - g_i(t0(e))`, con relojes convertidos a una referencia común y su incertidumbre registrada. Si una celda usa eco en un solo reloj, se informa aparte como `I03-RTT`; no se mezcla con `L_oneway`, no participa en `C_i` y solo diagnostica la ruta completa. | ms o s | Medición extremo a extremo; `operation_id` estable, sincronización de relojes y telemetría; un único método de `L_oneway` congelado por celda | `E0`, `E1`, `E3`, `E9`; todas las cargas | `L_oneway` **secundario: TBD**. El límite superior unilateral del IC, incluida la incertidumbre, debe ser menor o igual que `T_L`. `I03-RTT` no tiene umbral de aceptación. |
| `I04` | **Tasa de error técnico inesperado:** `R_err = 100 × N_fallos_inesperados / N_operaciones_válidas_programadas`. El manifiesto externo determina operaciones válidas; el protocolo congela categorías, severidad, timeout y adjudicación. | %, errores/sesión | Inspección automatizada de respuestas, excepciones y timeouts | `E0-E9`; todas las cargas | **Secundario: TBD**. Pérdida, corrupción, duplicación de efecto y acceso indebido se evalúan aparte con tolerancia cero. |
| `I05` | **Throughput útil:** `X = N_eventos_únicos_correctos_confirmados / W`. No cuenta reintentos ni duplicados. | eventos/s, operaciones/s | Prueba de carga; generador, contador de confirmaciones y reconciliador | `E0`, `E1`, `E3`; todas las cargas | **Secundario: TBD**. El límite inferior unilateral del IC debe ser mayor o igual que `T_X`. |
| `I06` | **Uso de recursos:** P50/P95 de CPU y RAM; `D_s = bytes_almacenados / sesión`; `B_e = bytes_transferidos / evento_útil`. | %, MB, GB, bytes/evento | Perfilado; métricas del SO, contenedores, base de datos, cola y red | `E0`, `E2`, `E3`, `E9`; todas las cargas | **Secundario: TBD** y siempre dentro del presupuesto físico de infraestructura. No se permite crecimiento sin límite después de drenar la cola. |

Las categorías de latencia, continuidad, pérdida y recursos se apoyan en evaluaciones arquitectónicas previas, pero sus cifras no son transferibles al caso de estudio (Kim et al., 2026, pp. 6-12). Los mecanismos de procesamiento local y sincronización posterior respaldan la necesidad de evaluar desconexión y recuperación, aunque no sustituyen las pruebas propias (Ashista et al., 2026, pp. 6-9; Medhi et al., 2022, pp. 3-7).

### 5.2 Consistencia y confiabilidad de eventos

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I07` | **Convergencia:** `I07-C = 100 × N_sesiones_con_todos_los_nodos_igual_a_oráculo / N_SES`. `I07-T_recon` mide desde el restablecimiento efectivo tras una partición; `I07-T_write`, desde la última escritura comprometida durante operación conectada. | %, ms o s | Comparación de estados, versiones y hashes canónicos | `E3`, `E6`, `E8`, `E9`; todas las cargas | `I07-C` **crítico: 100 %**. Los tiempos se reportan separados y son **secundarios: TBD**. |
| `I08` | **Pérdida de eventos confirmados:** `R_loss = 100 × N_eventos_que_incumplen_su_resultado_exigido / N_EV_COMP`. Por clase se congela si exige `registro auditable`, `efecto esperado` o ambos. La durabilidad se acredita con acuse posterior al commit local o servidor, correlacionado con el manifiesto externo. | %, conteo | Reconciliación entre manifiesto externo, log local, entregas, auditoría y estado final | `E2-E7`, `E9`; todas las cargas | **Crítico: 0 eventos y 0 %** al finalizar la ventana de recuperación. |
| `I09` | **Duplicación de efectos:** `R_dup = 100 × N_efectos_adicionales / N_EV_COMP`. Se cuentan efectos de negocio, no mensajes repetidos recibidos. | %, conteo | Redelivery y replay; registro de idempotencia y oráculo | `E4`, `E7`, `E9`; todas las cargas | **Crítico: 0 efectos adicionales**. Se permite recibir mensajes repetidos si no alteran dos veces el estado. |
| `I10` | **Violaciones de precedencia:** `R_ord = 100 × N_relaciones_aplicadas_en_orden_inválido / N_relaciones_de_precedencia`. | %, conteo | Permutación y retraso; secuenciador y validador de transiciones | `E6`, `E9`; todas las cargas | **Crítico: 0 violaciones y 0 transiciones inválidas**. Un evento tardío debe diferirse, rechazarse o aplicarse trazablemente. |
| `I11` | **Detección de conflictos:** `D_conf = 100 × N_conflictos_detectados / N_conflictos_inyectados`. | % | Escrituras concurrentes; barreras, versiones y matriz de políticas | `E8`, `E9`; todas las cargas | **Crítico: 100 %** de conflictos críticos detectados. |
| `I12` | **Resolución de conflictos:** `U_conf = 100 × N_conflictos_no_resueltos_o_mal_resueltos / N_conflictos_inyectados`. | %, conteo | Comparación contra política y oráculo | `E8`, `E9`; todas las cargas | **Crítico: 0 %** de conflictos críticos incorrectos o pendientes. La política se define antes del ensayo. |

La entrega al menos una vez, el replay, los reintentos y las dependencias entre eventos requieren identidad, idempotencia, control de orden y observabilidad (Laigner et al., 2026, pp. 23-30). La política de conflictos podrá rechazar, conservar versiones, fusionar campos compatibles o exigir revisión; no se asumirá “última escritura gana” sin justificación.

El instrumento distinguirá `comando programado`, `operación comprometida`, `mensaje entregado`, `efecto aplicado` y `evento auditable conservado`. `N_EV_COMP` contará toda operación que haya recibido confirmación durable de compromiso local o de servidor, sin importar el nodo de origen. Todos los registros compartirán un `operation_id` estable, además de sesión, secuencia y versión. Cuando el denominador de una tasa sea cero, el resultado se registrará como `N/A`; la celda solo podrá excluirse si esa ausencia estaba prevista en la matriz experimental.

## 6. Indicadores de proveniencia y multimodalidad

### 6.1 Proveniencia, integridad y versionado

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I13` | **Completitud de campos:** `C_meta = 100 × N_campos_críticos_válidos / N_campos_críticos_aplicables`. | % | Validación de esquema y referencias | Todas las modalidades y perfiles | **Crítico: 100 %**. `N/A` requiere causa registrada. |
| `I14` | **Evidencias individualmente completas:** `C_item = 100 × N_evidencias_con_todos_sus_campos / N_EVID`. | % | Consulta automática y muestreo manual | Campos ausentes, referencias inválidas y versiones inexistentes | **Crítico: 100 %**. Evita que un promedio oculte evidencias incompletas. |
| `I15` | **Reconstrucción completa del linaje:** `L_full = 100 × N_resultados_reconstruibles / N_RES`. | % | Recorrido retrospectivo; consulta y lista de comprobación | Versiones sucesivas, reinicio y componentes temporalmente desconectados | **Crítico: 100 %** para resultados dentro del alcance. |
| `I16` | **Detección de huecos:** `H_det = 100 × N_huecos_detectados_y_localizados / N_huecos_inyectados`. | % | Omisión controlada y comparación con grafo-oráculo | Falta de fuente, transformación, agente o enlace remoto | **Crítico: 100 % y 0 huecos silenciosos**. |
| `I17` | **Integridad del original:** `I_orig = 100 × N_originales_con_hash_vigente_igual_al_hash_de_ingreso / N_originales_esperados`. Todo original esperado pero ausente o no verificado incumple. | % | Hash al ingreso y auditoría; prueba de alteración | Modificación, sustitución, restauración y traslado | **Crítico: 100 % y 0 alteraciones no detectadas**. |
| `I18` | **Integridad original-derivado:** `I_OD = 100 × N_derivados_con_linaje_completo_y_salida_verificada / N_derivados_esperados`. La salida se verificará por recomputación o por una equivalencia preespecificada cuando la transformación no sea determinista. | % | Validador de relaciones, hashes y recomputación/equivalencia | Segmentación, transcripción, extracción, corrección y reproceso | **Crítico: 100 %**. Un derivado ausente, no verificable o sin fuente, transformación, versión, parámetros y agente incumple. |
| `I19` | **Preservación de versiones:** `V_p = 100 × N_actualizaciones_que_crean_versión_sin_sobrescribir / N_actualizaciones`. | % | Comparación antes/después y auditoría de hashes | Corrección profesional, cambio de algoritmo o metadatos | **Crítico: 100 %**. |

Los campos mínimos aplicables serán: `evidence_id`, `session_id`, actor seudonimizado, rol, tarea, fuente, modalidad, dispositivo, referencia temporal, inicio y fin, formato, tamaño, hash, versión, calidad, causa de ausencia, autorización y custodio. Los derivados añadirán fuente, transformación, software y versión, parámetros, agente, fecha de ejecución, hash de salida y estado de validación.

Este esquema adapta atributos de origen, versión, responsables, dependencias y método propuestos para proveniencia biomédica (Sax et al., 2023, pp. 1-2). Las instantáneas, conectores y versiones sin sobrescritura permiten reconstruir cadenas distribuidas, pero una discontinuidad detectada no equivale a información completa (Wittner et al., 2022, pp. 4-13). La captura por elemento de fuentes, destinos y transformaciones ofrece un antecedente implementable para la validación de estructura y trazas (Gierend et al., 2023, pp. 6-12).

### 6.2 Calidad y disponibilidad multimodal

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I20` | **Disponibilidad por modalidad:** `I20-E = 100 × N_respuestas_eventos_recuperables / N_respuestas_eventos_esperados`; `I20-M = 100 × N_medios_recuperables / N_medios_autorizados_esperados`. | % por modalidad | Captura, recuperación y manifiesto esperado-observado | `E0-E3`, almacenamiento lleno, archivo truncado y restauración | `I20-E` **crítico: 100 %**. `I20-M` **secundario: TBD** por modalidad. |
| `I21` | **Documentación de calidad y ausencia:** `Q_doc = 100 × N_unidades_con_estado_y_con_causa_cuando_no_son_utilizables / N_unidades_esperadas`. | % | Validación de metadatos y catálogo cerrado de causas | Ausente, denegada, retirada, corrupta, ruidosa u ocluida | **Crítico: 100 %**, incluso cuando la modalidad no esté disponible. |
| `I22` | **Proporción temporal utilizable:** `U_m = 100 × duración_utilizable / duración_autorizada_esperada`. La duración esperada termina al producirse una pausa o retiro válido y nunca puede ser menor que la utilizable. | % por modalidad y sesión | Analizador técnico y verificación humana estratificada | Ruido, oscuridad, congelamiento, desconexión y manipulación | **Secundario: TBD** antes de la calibración, a partir del requisito de calidad de la tarea y modalidad. No se promediarán modalidades para ocultar una pérdida completa. |
| `I23` | **Validez estructural:** `Q_est = 100 × N_respuestas_y_eventos_válidos / N_respuestas_y_eventos_esperados`. | % | Esquema y reglas de dominio con casos sintéticos | Campos inválidos, tarea equivocada, versión incompatible | **Crítico: 100 %** en pruebas funcionales. |
| `I24` | **Detección y preservación de segmentos defectuosos:** `D_def = 100 × N_defectos_detectados / N_defectos_del_oráculo`; `P_def = 100 × N_defectos_detectados_y_preservados / N_defectos_del_oráculo`. | % | Inyección de defectos, oráculo y comparador de anotaciones/originales | Fragmentos ruidosos, oscuros, corruptos o excluidos | **Crítico: D_def = 100 % y P_def = 100 %**. Si el oráculo no contiene defectos, la celda es `N/A`. |
| `I25` | **Error de alineación condicional:** para cada ancla `k`, `e_k = abs(t_a,k - T_b→a(t_b,k))`; se reportan P95, máximo y deriva. | ms, ppm | Anclas comunes, reloj de referencia y análisis de offset/deriva | Corrientes autorizadas y solapadas; pausa, reconexión y sesión prolongada | **Secundario: `T_delta` TBD** según tarea y hardware. Sin referencia común: `N/A`, sin afirmar sincronización. |

La disponibilidad se informará como vector por modalidad y no como un promedio único. Los antecedentes muestran que los datos faltantes y los intervalos no utilizables deben conservar su causa y marca temporal (Kalanadhabhatta et al., 2025, pp. 8-11; Geangu et al., 2023, pp. 27-35). La distinción entre fuente capturada y modalidad derivada evita tratar un archivo como evidencia indivisible (Ramanarayanan, 2024, pp. 2-3, 6-8).

## 7. Indicadores de revisión y gobernanza

### 7.1 Revisión profesional

En el diseño objetivo, un caso solo podrá liberar una salida final si registra profesional autorizado, versión revisada, evidencias consultables, decisión, fecha y siguiente acción. Se distinguirán cuatro entidades: resultado profesional del ítem, estado de revisión, decisión profesional del caso y siguiente acción. `Confirmado` y `corregido` describirán estados de revisión; `diferido` y `escalado` describirán decisiones del caso. El backend actual todavía no aplica esta garantía completa, por lo que `I27-I30` quedan bloqueados hasta implementar y probar dichas entidades y restricciones.

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I26` | **Recepción y asignación:** `R_rec = 100 × N_casos_con_recepción_y_asignación / N_casos_enviados`. | % | Telemetría y lista de revisión | Envío, indisponibilidad, reasignación y reconexión | **Crítico: 100 %**; ningún caso puede desaparecer en un silo. |
| `I27` | **Cierre documental:** `C_rev = 100 × N_casos_cerrados_con_elementos_obligatorios / N_casos_que_requieren_revisión`. | % | Consulta de estados y auditoría estratificada | Confirmación, corrección, evidencia insuficiente y escalamiento | **Crítico: 100 % antes de liberar salida final**. |
| `I28` | **Cierre dentro del plazo:** `C_SLA = 100 × N_casos_elegibles_cerrados_antes_de_T_SLA / N_casos_elegibles_al_corte`. La elegibilidad y el momento de corte se congelan previamente. | %, tiempo | Marcas del flujo y tablero | Carga normal y pico | **Secundario: `T_SLA` y porcentaje TBD** por capacidad institucional. |
| `I29` | **Recorrido técnico de revisión:** `I29-F = 100 × N_recorridos_sintéticos_que_acceden_a_linaje_y_original / N_recorridos_programados`; `I29-T` es el tiempo técnico de resolución. | %, ms o s | Prueba automatizada de API/visor con actor sintético, trazas y cronómetro | Varios derivados, versiones y calidad parcial | `I29-F` **crítico: 100 %**. `I29-T` **secundario: TBD**. La experiencia del profesional se mide aparte en `I41-I45`. |
| `I30` | **Salidas finales sin revisión:** conteo de salidas liberadas sin cierre profesional. | conteo | Consulta de auditoría y prueba negativa | Intento desde API, interfaz y evento repetido | **Crítico: 0**. |

El cierre verificable responde a la diferencia entre recibir información y documentar una acción profesional (Qureshi et al., 2026, pp. 5-7). No se evaluará la calidad clínica de la decisión con estos indicadores.

### 7.2 Permisos y auditoría

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I31` | **Decisiones de acceso correctas:** `P_RBAC = 100 × N_decisiones_iguales_a_matriz / N_intentos`. | % | Pruebas positivas y negativas; matriz por rol | Niño, cuidador, profesional asignado/no asignado, servicio y administrador | **Crítico: 100 %** sobre la matriz exhaustiva. |
| `I32` | **Accesos indebidos exitosos:** conteo de intentos denegables que obtienen datos o producen efectos. | conteo | Pruebas de autorización y logs | ID alterado, URL directa, token vencido/revocado y sesión ajena | **Crítico: 0**. |
| `I33` | **Auditabilidad de acceso:** `A_log = 100 × N_accesos_con_actor_recurso_acción_resultado_y_tiempo / N_accesos`. | % | Comparación entre tráfico de prueba y bitácora | Permitidos, denegados, offline y sincronizados | **Crítico: 100 %**. Propósito y nodo se exigirán si el protocolo los declara obligatorios. |

Confidencialidad, integridad, autenticidad y auditabilidad son dimensiones diferenciadas de la gestión de proveniencia en salud (Sembay et al., 2023, pp. 21-22). Un log incompleto o editable no se considerará evidencia suficiente de autorización.

### 7.3 Consentimiento, asentimiento, pausa y retiro

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I34` | **Operaciones dentro del consentimiento:** `C_scope = 100 × N_operaciones_cubiertas_por_autorización_vigente / N_operaciones_que_requieren_autorización`. | % | Máquina de estados y matriz finalidad-modalidad-destinatario | Consentimiento válido, modalidad no autorizada, cambio de finalidad, vencimiento y revocación | **Crítico: 100 % y 0 operaciones nuevas fuera de alcance**. |
| `I35` | **Soporte procedimental del asentimiento:** `A_proc = 100 × N_sesiones_con_explicación_decisión_humana_pausa_salida_y_checkpoints / N_sesiones_aplicables`. | % | Observación y lista aprobada | Aceptación, rechazo, pausa directa, conducta ambigua y reingreso | **Crítico: 100 % del procedimiento**. No se puntúan ni clasifican gestos automáticamente. |
| `I36` | **Checkpoints de asentimiento:** `A_check = 100 × N_checkpoints_realizados_y_documentados / N_checkpoints_previstos`. | % | Registro contextual y observación | Inicio, cambio de actividad/modalidad y reanudación | **Crítico: 100 %**, una vez definidos por el protocolo. |
| `I37` | **Ejecución de pausa:** `I37-F = 100 × N_pausas_que_detienen_modalidades_y_preservan_estado / N_pausas_solicitadas`; `I37-T` mide hasta la última captura efectiva. | %, ms o s | Prueba funcional y telemetría | Pausa por niño, cuidador o profesional; conectada y offline | `I37-F` **crítico: 100 %** y pertenece a `K_G-pre`. `I37-T` es diagnóstico complementario TBD y no participa en `C_i`; 0 datos posteriores pueden incorporarse como autorizados. |
| `I38` | **Ejecución de retiro:** `R_exec = 100 × N_retiros_que_aplican_todas_las_acciones_definidas / N_retiros_válidos`. | % | Consulta de linaje y lista de retiro | Por modalidad, sesión o uso; offline; con derivados y copias | **Crítico: 100 %**. Cada objeto queda como eliminado, bloqueado, restringido, anonimizado o pendiente con motivo. |
| `I39` | **Trazabilidad de retiro:** `R_trace = 100 × N_retiros_con_solicitante_alcance_tiempo_responsable_y_estado / N_retiros_válidos`. | % | Auditoría del procedimiento | Mismos escenarios de `I38` | **Crítico: 100 %**. El tratamiento final dependerá del protocolo y normativa aplicable. |

Finalidad, destinatario, custodia y cambio de uso influyen en la decisión familiar, pero no constituyen por sí solos reglas legales universales (Wild et al., 2023, pp. 5-8). El asentimiento es continuo, contextual y revocable; el sistema evaluará si ofrece y registra el procedimiento, no si un algoritmo interpreta correctamente una conducta infantil (Mirabella et al., 2025, pp. 3-4, 7-11, 15).

## 8. Corrección funcional y factibilidad humana

| Código | Indicador y fórmula | Unidad | Técnica e instrumento | Escenarios | Clasificación y umbral |
|---|---|---|---|---|---|
| `I40` | **Corrección funcional de la instanciación:** `Q_calc = 100 × N_casos_iguales_a_resultado_autorizado / N_casos_de_referencia`. | % | Prueba determinista contra casos oficiales autorizados | Límites, dominios, reglas, datos faltantes y versiones del caso | **Puerta del caso: 100 % y 0 discrepancias**. No forma parte del contraste arquitectónico central y requiere documentación oficial. |
| `I41` | **Finalización de tareas humanas:** `F_tarea = 100 × N_tareas_completadas_sin_error_crítico / N_tareas_intentadas`. | % | Observación del piloto y ficha de tareas | Niño-cuidador y profesional; flujos principales | **Exploratorio/TBD**. No contrasta H1. |
| `I42` | **Incidencias y ayuda requerida:** `R_inc = N_incidencias / N_sesiones`; `R_ayuda = 100 × N_tareas_con_ayuda / N_tareas_intentadas`, estratificados por rol y severidad. | conteo, tasa, % | Observación y ficha de incidencias | Piloto de cinco díadas y profesionales disponibles | **Exploratorio/TBD**. Se usa para corregir procedimiento. |
| `I43` | **Usabilidad percibida:** si se aprueba SUS, cada ítem impar aporta `x-1`, cada par `5-x`, y `SUS = 2.5 × suma_aportes`; no se calculará con respuestas faltantes salvo regla oficial. | 0-100 | Encuesta SUS | Después de completar tareas | **Exploratorio/TBD**. El instrumento y criterio se congelarán antes de la aplicación; no mide eficacia clínica. |
| `I44` | **Comprensión y control:** para cada componente `k`, `C_k = 100 × N_respuestas_correctas_k / N_participantes_evaluables`; éxito conjunto `C_all = 100 × N_participantes_que_reconocen_todos_los_componentes / N_participantes_evaluables`. | % | Preguntas estructuradas validadas y entrevista | Modalidad activa, pausa, salida y destino de datos | **Exploratorio/TBD**. Requiere validación de contenido, adaptación etaria y regla previa de evaluabilidad. |
| `I45` | **Carga percibida:** después de cada tarea, `B_task` se registrará en una escala ordinal aprobada de 0 (ninguna carga) a 10 (carga extrema); se reportarán mediana, rango, distribución y porcentaje de respuestas en la categoría de carga alta definida antes del campo principal. | 0-10, % | Escala ordinal validada por expertos e entrevista breve | Niño-cuidador y profesional; por tarea y rol | **Exploratorio, sin umbral para H1**. Una respuesta faltante no se imputa y conserva su motivo. La categoría descriptiva de carga alta y el texto del ítem se congelan en el protocolo de campo v2. |

La evaluación funcional del caso comprueba la implementación de reglas autorizadas, no la validez clínica ni la generalidad de la arquitectura. La evaluación humana se reportará con denominadores, incidencias y limitaciones, separada de la carga simulada.

## 9. Escenarios experimentales

| Código | Perfil |
|---|---|
| `E0` | Red estable y sin fallos inducidos |
| `E1` | Red degradada con latencia, jitter y ancho de banda controlados |
| `E2` | Desconexión completa durante captura |
| `E3` | Reconexión y vaciado de backlog |
| `E4` | Duplicación y redelivery de eventos |
| `E5` | Omisión temporal recuperable |
| `E6` | Retraso y entrega fuera de orden |
| `E7a` | Reinicio del cliente con operaciones locales pendientes |
| `E7b` | Reinicio de la API antes o después de confirmar una operación |
| `E7c` | Reinicio del consumidor durante procesamiento |
| `E7d` | Reinicio de Redis o de la capa de mensajería según su política de persistencia |
| `E8` | Escrituras concurrentes conflictivas |
| `E9` | Escenario combinado: desconexión, backlog, reconexión y reinicio |

Cuando una tabla use `E7` sin sufijo, se refiere a la familia completa `E7a-E7d`; el protocolo ejecutable identificará siempre el subescenario concreto.

Como suite preliminar, cada escenario aplicable se probará con 1, 10, 25, 50 y 100 sesiones concurrentes. Estos niveles exploran capacidad y no representan demanda institucional observada; el protocolo congelado justificará cuáles forman parte de la afirmación final de capacidad. Como mínimo, `E0-E3` medirán continuidad y desempeño; `E4-E7d`, confiabilidad de eventos; `E8`, conflictos; y `E9`, robustez integral. La matriz definitiva indicará modalidades, punto de fallo, duración, estado previo y criterio de recuperación de cada celda para evitar combinaciones irrelevantes.

## 10. Fijación no arbitraria de umbrales

### 10.1 Jerarquía de fuentes

Cada umbral se justificará en este orden:

1. Invariante de corrección o integridad lógica.
2. Manual oficial, normativa y protocolo ético aplicables.
3. Requisito operativo documentado del caso local.
4. Literatura, para seleccionar métricas y métodos, no para copiar cifras.
5. Prueba técnica preliminar, para estimar variabilidad y capacidad.
6. Piloto de cinco díadas, para factibilidad, comprensión e instrumentación.

Un resultado preliminar desfavorable no autoriza a relajar un requisito crítico. Deberá corregirse el artefacto o reducirse justificadamente el alcance antes del congelamiento.

### 10.2 Conformidad determinista fijada desde ahora

Los siguientes criterios se aplican a suites finitas, deterministas o exhaustivas. La conformidad exige que todos los casos programados pasen; no se utiliza un intervalo de confianza como criterio para aprobar 0 o 100 %:

- 0 eventos confirmados perdidos.
- 0 efectos de negocio duplicados.
- 0 violaciones de transición.
- 0 conflictos críticos no detectados o mal resueltos.
- 0 alteraciones de originales no detectadas.
- 0 accesos indebidos exitosos.
- 0 operaciones fuera de una autorización vigente.
- 0 salidas finales sin revisión profesional.
- 0 discrepancias en casos funcionales autorizados.
- 100 % de recuperación exacta, convergencia, proveniencia mínima, linaje, versionado, permisos y ejecución de pausa o retiro.

Observar cero fallos en una muestra estocástica no demuestra una tasa poblacional igual a cero. Cuando además se quiera estimar confiabilidad poblacional, se definirá una tolerancia positiva `epsilon` y se comparará contra ella el límite superior unilateral exacto al 95 %. Con cero fallos en `N` ensayos:

\[
p_U = 1 - 0.05^{1/N}
\]

El informe mostrará el resultado de conformidad `0/N` y, por separado, su límite de confianza. El intervalo no se comparará contra cero ni se usará para invalidar una suite exhaustiva que haya pasado completamente.

### 10.3 Umbrales que permanecen `TBD`

Permanecerán pendientes hasta disponer de requisito local e infraestructura fija; solo los criterios descriptivos humanos podrán ajustarse después del piloto:

- P95 y P99 de latencia, convergencia y recuperación;
- tasa tolerable de errores no críticos;
- throughput mínimo;
- CPU, memoria, almacenamiento y transferencia máximos;
- disponibilidad y duración utilizable de imagen, audio y video;
- tolerancia de alineación temporal;
- plazo y proporción de cierre profesional;
- tiempo de localización de evidencia;
- finalización, incidencias, comprensión y usabilidad;
- tolerancias poblacionales `epsilon` para tasas estocásticas de fallo;
- número definitivo de repeticiones.

Un `TBD` técnico solo se convertirá en criterio de aceptación cuando exista un requisito independiente de los resultados de calibración. El acta identificará su propietario, documento, versión, unidad y fecha. Para tiempos, tasas máximas y recursos se conservará el límite máximo exigido; para throughput, disponibilidad y proporciones se conservará el mínimo exigido. Si es necesario normalizar unidades, los máximos se redondearán hacia abajo y los mínimos hacia arriba con la resolución del instrumento, de modo que el redondeo nunca relaje el requisito. `I03-I06` y, por cada modalidad de medios incluida en el alcance confirmatorio, `I20-M` junto con `I22` o `I25` cuando resulten aplicables, deberán contar con criterios admisibles para decidir H1.

La prueba preliminar no se usará para elegir un umbral que el artefacto ya cumpla. Servirá para comprobar medibilidad, estimar variabilidad y determinar repeticiones. Si antes de la calibración no existe requisito independiente para un secundario no obligatorio, esa métrica quedará como caracterización descriptiva y se retirará de la afirmación confirmatoria antes de abrir sus datos. Si falta el requisito de `I03-I06` o de un indicador multimodal obligatorio por el alcance declarado, H1 quedará indeterminada y no podrá afirmarse esa capacidad. La decisión y su justificación quedarán firmadas en el protocolo técnico v2.

### 10.4 Intervalos y repeticiones

- Proporciones poblacionales mínimas: límite inferior unilateral exacto de Clopper-Pearson al 95 % mayor o igual que un umbral menor que 100 %.
- Tasas poblacionales máximas de fallos: límite superior unilateral exacto al 95 % menor o igual que una tolerancia positiva `epsilon`.
- Tiempos y percentiles: límite superior unilateral bootstrap percentil al 95 % menor o igual que el umbral.
- Throughput: límite inferior unilateral al 95 % mayor o igual que el umbral.
- Casos deterministas exhaustivos: todos deben pasar y se evalúan sin inferencia.

Los percentiles muestrales usarán interpolación lineal tipo 7. El bootstrap tendrá 10 000 remuestras, semilla registrada y conglomerados completos de sesión o ejecución; no tratará eventos dependientes como observaciones independientes. El número de repeticiones se calculará con la variabilidad de la prueba preliminar y una precisión objetivo registrada antes del cálculo. Para una media podrá utilizarse:

\[
n = \left\lceil \left(\frac{1.645s}{E}\right)^2 \right\rceil
\]

donde `s` es la desviación estimada preliminar y `E` el margen unilateral tolerado definido por la precisión requerida, no por el resultado deseado. Para percentiles y tasas se empleará simulación o precisión binomial con código, semilla y criterio de parada congelados. No se reemplazarán ejecuciones válidas desfavorables; solo podrán repetirse las invalidadas por causas externas enumeradas previamente, conservando ambos registros.

El intervalo binomial exacto seguirá a Clopper y Pearson (1934, pp. 404-413); el remuestreo seguirá la especificación reproducible de Davison y Hinkley (1997), y el cuantil tipo 7 la taxonomía de Hyndman y Fan (1996, pp. 361-365). SUS solo se aplicará con el instrumento y puntuación originales de Brooke (1996, pp. 189-194). Cualquier adaptación lingüística o etaria deberá aprobarse y congelarse antes de abrir los datos correspondientes.

## 11. Tratamiento de datos faltantes

| Clase | Tratamiento |
|---|---|
| Ausencia esperada | Modalidad no requerida o no autorizada; se registra y no entra en el denominador aplicable. |
| No utilizable trazable | Archivo presente con calidad insuficiente; se conserva y cuenta en indicadores de calidad. |
| Fallo del artefacto | Pérdida, corrupción, telemetría ausente o captura omitida cuando era obligatoria; cuenta como incumplimiento. |
| Fallo externo predefinido | Puede invalidar la ejecución solo si pertenece a la lista congelada; se conserva el registro. |
| Pausa o retiro humano | Se respeta y registra; no es fallo salvo que el sistema no ejecute la acción. |
| Respuesta faltante en cuestionario | Se aplica exclusivamente la regla oficial del instrumento. |

No se imputarán indicadores críticos. Una falla de telemetría que impida decidir un indicador crítico se tratará como incumplimiento, no como exclusión conveniente.

## 12. Regla global de cumplimiento

Para cada indicador `i`, escenario `e` y carga `c` aplicables:

\[
C_{i,e,c} =
\begin{cases}
1, & \text{si cumple la conformidad determinista o el criterio estadístico aplicable} \\
0, & \text{en otro caso}
\end{cases}
\]

Sea `A_i` el conjunto congelado de pares escenario-carga aplicables al indicador. El cumplimiento agregado será el peor caso:

\[
C_i = \bigwedge_{(e,c) \in A_i} C_{i,e,c}
\]

No se promediarán celdas favorables para ocultar una carga o escenario incumplido. Se definen conjuntos técnicos y puertas separadas:

- `K_H`: críticos que contrastan la hipótesis técnica: `I01`, `I02-C`, `I07-C`, `I08-I19`, `I20-E`, `I21`, `I23`, `I24`, `I26`, `I27`, `I29-F` e `I30`.
- `S_H`: secundarios de la hipótesis: `I02-T`, `I03-I06`, `I07-T_recon`, `I07-T_write`, `I20-M`, `I22`, `I25`, `I28` e `I29-T`.
- `K_G-pre`: puertas verificables sin participantes antes del piloto: `I31-I34`, `I37-F` e `I38-I39`, además de la aprobación experta de los procedimientos e instrumentos de `I35-I36`. `I37-T` se reporta como diagnóstico complementario.
- `K_G-campo`: cumplimiento procedimental observado para avanzar del piloto al campo principal: `I35-I36`. Estas mediciones no se exigen antes de la primera díada.
- `G_CASE`: puerta funcional separada de la instanciación, evaluada mediante `I40` antes de usar con personas cualquier cálculo dependiente del instrumento.
- `E`: indicadores exploratorios excluidos del contraste: `I41-I45`.

Para cada dimensión `d`, sea `J_d` el conjunto preespecificado de indicadores aplicables y con criterio admisible. La dimensión **cumple** si todos sus indicadores de corrección y de desempeño declarados cumplen; **no cumple** si un indicador evaluable incumple; es **indeterminada** si falta telemetría, criterio indispensable o una celda obligatoria; y solo es `N/A` si la inaplicabilidad fue declarada antes de ejecutar el escenario. No se calculará una regla global `q` ni un promedio que compense capacidades o convierta un fallo localizado de desempeño en una conclusión total sobre el artefacto.

Los invariantes de corrección en `K_H` permanecen no compensatorios dentro de su dimensión. `I03-I06` y los indicadores multimodales aplicables deberán contar con criterio independiente antes de la evaluación confirmatoria; si falta, la dimensión correspondiente será indeterminada. La aptitud para iniciar el piloto exigirá `C_i = 1` para todos los indicadores de `K_G-pre` aplicables, aprobación experta documentada de los procedimientos de `I35-I36` y `G_CASE` cuando el flujo use cálculos dependientes del instrumento. La aptitud para avanzar al campo principal exigirá además `C_i = 1` para `I35-I36` durante el piloto. Una puerta requerida pero no implementada implica que el artefacto no es apto; `N/A` solo procede por inaplicabilidad preespecificada, nunca por falta de implementación.

Reglas adicionales:

- Los indicadores críticos son no compensatorios.
- Si falta información para decidir un indicador crítico, su resultado es incumplimiento.
- Un secundario solo puede marcarse `N/A` si la inaplicabilidad se declaró antes del escenario.
- Los resultados se desagregarán por conectividad, carga, fallo y modalidad.
- Si se afirma soporte para 100 sesiones, los criterios deben cumplirse específicamente en esa carga, no solo en promedio.
- Si una carga no cumple rendimiento pero conserva integridad, se declarará la capacidad máxima soportada sin ocultar el incumplimiento.

## 13. Correspondencia entre objetivos, indicadores e instrumentos

| Objetivo específico del capítulo 1 | Indicadores | Instrumentos principales |
|---|---|---|
| Modelar actores, estados, eventos, evidencias e invariantes | `I13-I19`, `I26-I39` | Matriz de requisitos, esquema, políticas y oráculo |
| Diseñar sincronización, entrega, orden causal, conflictos y convergencia | `I01-I12` | Controlador de red, generador, inyector, logs y snapshots |
| Implementar operación offline, pipeline, proveniencia, gobernanza y cierre | `I01-I39` | Manifiestos, hashes, matriz RBAC, bitácora, validador de linaje y calidad |
| Evaluar calidad técnico-operativa con datos sintéticos | `I01-I34`, `I37-I40` | Generador, telemetría, perfiles de red y oráculo |
| Determinar resultados técnicos por dimensión | Indicadores críticos y de desempeño aplicables; excluye puertas e `I41-I45` | Tablero de resultados por dimensión y escenario |
| Explorar factibilidad humana | `I41-I45` | Observación, incidencias, encuesta, escala de carga y entrevista |

## 14. Estado actual del sistema frente a la medición

| Capacidad observada | Evidencia actual | Acción requerida antes de medir |
|---|---|---|
| Cola local de evidencias | IndexedDB, reintento y contador en `EvidenceUploadQueue.ts` | Instrumentar persistencia fallida, tiempos, reintentos y vaciado. Actualmente algunos errores de almacenamiento se silencian. |
| Idempotencia de evidencias | UUID en cliente y restricción única por evaluación en `models.py` | Añadir pruebas de redelivery, timeout y reinicio; verificar el efecto, no solo la fila. |
| Control concurrente | Versión esperada y respuesta HTTP 409 en mutaciones versionadas de evaluación/respuesta | Formalizar política, auditar ambos intentos y extender cobertura a eventos y archivos; no existe una política semántica común. |
| Sincronización en tiempo real | WebSocket con versión y hora del servidor en `evaluation_consumer.py`; Redis como capa de canales normal. El `event_id` actual identifica la notificación, no necesariamente la operación original. | Incorporar `operation_id` estable de extremo a extremo y validar topología, capacidad y reinicio de Redis. El canal en memoria corresponde a pruebas. |
| Permisos por actor | Tokens por dispositivo/rol y evidencia restringida al profesional | Completar matriz exhaustiva, roles profesionales y pruebas de token vencido/revocado. |
| Evidencia multimodal | `LOG`, `TIME_EVENT`, `SCREENSHOT`, `AUDIO`, `VIDEO`, `CAMERA_FRAME` y `SYSTEM_RESULT` | Delimitar modalidades por ítem, consentimiento y protocolo; medir calidad y ausencia. |
| Consentimiento | El flujo exige selección explícita de logs, capturas, audio y video; conserva versión y hash del texto y un registro histórico. | Completar finalidad, destinatarios, vigencia, controles append-only y propagación a derivados; ejecutar la matriz externa antes de medir `I34`. |
| Auditoría de acceso | `EvidenceAccessAudit` registra evidencia, acción, actor, actor_id, IP y fecha para algunas operaciones permitidas | Registrar intentos permitidos y denegados desde un manifiesto externo; añadir resultado, propósito, nodo, correlación y controles append-only/retención antes de medir `I33`. |
| Asentimiento y retiro | Existe registro de asentimiento inicial, retiro parcial por modalidad y retiro total con revocación de tokens. | Implementar asentimiento continuo y contextual, checkpoints, tratamiento de derivados y respaldos y verificación integral antes de evaluar `I35-I39`. |
| Proveniencia completa | Existen metadatos, actor, fecha e idempotencia, pero no cadena formal original-derivado | Implementar hashes, versiones, transformaciones y recorridos antes de medir `I13-I19`. |
| Eventos temporales | El envío directo registra errores, pero no usa la misma cola durable de archivos | Corregir o delimitar esta brecha antes de exigir pérdida cero en desconexión. |
| Revisión profesional | El backend exige decisión explícita por ítem, bloquea el cierre con pendientes y restringe los reportes finales a evaluaciones validadas. | Añadir recepción, asignación, diferimiento, escalamiento, siguiente acción, reapertura y versiones de revisión antes de medir integralmente `I27-I30`. |
| Diagnóstico automatizado | Las rutas e interfaz activas fueron retiradas y existe una prueba negativa de publicación. | Verificar también persistencia histórica, exportaciones y configuración congelada antes de la evaluación confirmatoria. |
| Protección de datos | Hay autenticación y controles parciales, pero no una verificación experimental integral de cifrado, minimización, segregación de reidentificación, respaldos, retención y borrado | Superar la puerta independiente `G_SEC` definida en el protocolo antes de usar datos humanos. |
| Métricas actuales | El tablero existente no captura latencia, convergencia, pérdida, recursos, hashes ni linaje | Crear telemetría y fuentes versionadas específicas; no usar los agregados actuales como instrumento de `I01-I40`. |

Esta tabla no constituye un resultado experimental. Es una línea base de instrumentación para evitar definir indicadores que el sistema todavía no puede observar.

## 15. Pendientes de congelamiento

### 15.1 Protocolo técnico v2, antes de la evaluación técnica confirmatoria

- Documentar red, dispositivos, servidor, Redis, almacenamiento y presupuesto físico.
- Delimitar modalidades y tareas incluidas en la evaluación técnica.
- Incorporar la documentación oficial y los casos autorizados del instrumento seleccionado necesarios para `I40`.
- Implementar la telemetría y los oráculos requeridos por `I01-I34` y `I37-I40`.
- Ejecutar la prueba técnica preliminar con datos sintéticos.
- Completar los criterios técnicos admisibles, tolerancias poblacionales y repeticiones; registrar las reglas de dictamen por dimensión.
- Congelar taxonomías de error, timeouts, celdas aplicables y reglas de exclusión.
- Identificar código, configuración, scripts y datos sintéticos mediante versión y hash.
- Firmar y fechar el acta antes de abrir los datos de la evaluación técnica confirmatoria.

### 15.2 Protocolo de campo v1, antes del piloto

- Confirmar perfiles y responsabilidades profesionales institucionales.
- Incorporar normativa y protocolo ético aplicables.
- Validar antes del piloto los instrumentos de campo, incluidos los procedimientos de `I35-I36` y `I41-I45`.
- Obtener las autorizaciones y congelar instrucciones, criterios de observación y tratamiento de datos del piloto.

### 15.3 Protocolo de campo v2, después del piloto y antes de la aplicación principal

- Ejecutar el piloto exploratorio con cinco díadas, sujeto a autorización.
- Ajustar instrucciones, logística e instrumentos sin modificar resultados técnicos confirmatorios.
- Congelar instrumentos y criterios descriptivos de `I41-I45`; no se usarán para modificar H1.
- Repetir verificación técnica si el piloto obliga a modificar código funcional.
- Firmar y fechar el protocolo de campo antes de la aplicación humana principal.

## REFERENCIAS BIBLIOGRÁFICAS

Amed, S., Pinkney, S., Abdulhussein, F. S., Virani, A., Zachariuk, C., Tamana, S. K., Muralidharan, S., Görges, M., Barrett, B., van Rooij, T., Borycki, E. M., Kushniruk, A., Longstaff, H., Virani, A., Wasserman, W. W., & TrustSphere Collaborative. (2025). Caregiver experiences of an integrative patient-centered digital health application for pediatric type 1 diabetes care: Findings from a pilot clinical trial. *PLOS Digital Health, 4*(10), e0000861. https://doi.org/10.1371/journal.pdig.0000861

Ashista, H., Comas, A. S., Selby, T., Essar, M. Y., Alawa, J., Al-Hajj, S., & Nelson, E. (2026). An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study. *PLOS Digital Health, 5*(2), e0001204. https://doi.org/10.1371/journal.pdig.0001204

Brooke, J. (1996). SUS: A “quick and dirty” usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.), *Usability evaluation in industry* (pp. 189-194). Taylor & Francis.

Cejudo, A., Tellechea, Y., Calvo, A., Almeida, A., Martín, C., & Beristain, A. (2025). Scalable big data platform with end-to-end traceability for health data monitoring in older adults: Development and performance evaluation. *JMIR Medical Informatics, 13*(1), e81701. https://doi.org/10.2196/81701

Clopper, C. J., & Pearson, E. S. (1934). The use of confidence or fiducial limits illustrated in the case of the binomial. *Biometrika, 26*(4), 404-413. https://doi.org/10.1093/biomet/26.4.404

Davison, A. C., & Hinkley, D. V. (1997). *Bootstrap methods and their application*. Cambridge University Press. https://doi.org/10.1017/CBO9780511802843

Geangu, E., Smith, W. A. P., Mason, H. T., Martinez-Cedillo, A. P., Hunter, D., Knight, M. I., Liang, H., del Carmen Garcia de Soria Bazan, M., Tse, Z. T. H., Rowland, T., Corpuz, D., Hunter, J., Singh, N., Vuong, Q. C., Abdelgayed, M. R. S., Mullineaux, D. R., Smith, S., & Muller, B. R. (2023). EgoActive: Integrated wireless wearable sensors for capturing infant egocentric auditory-visual statistics and autonomic nervous system function 'in the wild'. *Sensors, 23*(18), 7930. https://doi.org/10.3390/s23187930

Gierend, K., Krüger, F., Genehr, S., Hartmann, F., Siegel, F., Waltemath, D., Ganslandt, T., & Zeleke, A. A. (2024). Provenance information for biomedical data and workflows: Scoping review. *Journal of Medical Internet Research, 26*(1), e51297. https://doi.org/10.2196/51297

Gierend, K., Waltemath, D., Ganslandt, T., & Siegel, F. (2023). Traceable research data sharing in a German medical data integration center with FAIR-geared provenance implementation: Proof-of-concept study. *JMIR Formative Research, 7*(1), e50027. https://doi.org/10.2196/50027

Hyndman, R. J., & Fan, Y. (1996). Sample quantiles in statistical packages. *The American Statistician, 50*(4), 361-365. https://doi.org/10.1080/00031305.1996.10473566

Kalanadhabhatta, M., Rahman, T., Grabell, A. S., & Ganesan, D. (2025). Tandem: At-home behavior assessment using multimodal signals from the parent-child dyad. *Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, 9*(4), Article 182, 1-25. https://doi.org/10.1145/3770705

Kim, I., Robinson, T. N., Reeves, B. B., Haber, N., & Ram, N. (2026). Software reference architecture for real-time mobile digital phenotyping: Evaluation of system designs. *JMIR Formative Research, 10*(1), e87320. https://doi.org/10.2196/87320

Laigner, R., Almeida, A. C., Assunção, W. K. G., & Zhou, Y. (2026). An empirical study on challenges of event management in microservice architectures. *ACM Transactions on Software Engineering and Methodology, 35*(8), Article 245, 1-62. https://doi.org/10.1145/3776581

McElwain, N. L., Fisher, M. C., Nebeker, C., Bodway, J. M., Islam, B., & Hasegawa-Johnson, M. (2024). Evaluating users' experiences of a child multimodal wearable device: Mixed methods approach. *JMIR Human Factors, 11*(1), e49316. https://doi.org/10.2196/49316

Medhi, K., Ahmed, N., & Hussain, M. I. (2022). Dew-based offline computing architecture for healthcare IoT. *ICT Express, 8*(3), 371-378. https://doi.org/10.1016/j.icte.2021.09.005

Mirabella, A. M., Berson, I. R., & Berson, M. J. (2025). Empowering voices: Implementing ethical practices for young children's assent in digital research. *Education Sciences, 15*(5), 571. https://doi.org/10.3390/educsci15050571

Modi, N., Ribas, R., Johnson, S., Lek, E., Godambe, S., Fukari-Irvine, E., Ogundipe, E., Tusor, N., Das, N., Udayakumaran, A., Moss, B., Banda, V., Ougham, K., Cornelius, V., Arasu, A., Wardle, S., Battersby, C., & Bravery, A. (2023). Pilot feasibility study of a digital technology approach to the systematic electronic capture of parent-reported data on cognitive and language development in children aged 2 years. *BMJ Health & Care Informatics, 30*(1), e100781. https://doi.org/10.1136/bmjhci-2023-100781

Qureshi, A. R., Flegg, K., Siddiqui, A., Tao, B. K., & Gallie, B. (2026). Enhancing circle-of-care communication in pediatric cancer through digital health technologies: A scoping review. *Pediatric Blood & Cancer, 73*(1), e32106. https://doi.org/10.1002/pbc.32106

Ramanarayanan, V. (2024). Multimodal technologies for remote assessment of neurological and mental health. *Journal of Speech, Language, and Hearing Research, 67*(11), 4233-4245. https://doi.org/10.1044/2024_JSLHR-24-00142

Sax, U., Henke, C., Dräger, C., Bender, T., Kuntz, A., Golebiewski, M., Ulrich, H., & Löbe, M. (2023). Provenance core data set: A minimal information model for data provenance in biomedical research. *Proceedings of the Conference on Research Data Infrastructure, 1*. https://doi.org/10.52825/cordi.v1i.347

Sembay, M. J., de Macedo, D. D. J., Júnior, L. P., Braga, R. M. M., & Sarasa-Cabezuelo, A. (2023). Provenance data management in health information systems: A systematic literature review. *Journal of Personalized Medicine, 13*(6), 991. https://doi.org/10.3390/jpm13060991

Wild, C. E. K., Rawiri, N. T., Taiapa, K., & Anderson, Y. C. (2023). In safe hands: Child health data storage, linkage and consent for use. *Health Promotion International, 38*(6), daad159. https://doi.org/10.1093/heapro/daad159

Wittner, R., Mascia, C., Gallo, M., Frexia, F., Müller, H., Plass, M., Geiger, J., & Holub, P. (2022). Lightweight distributed provenance model for complex real-world environments. *Scientific Data, 9*(1), 503. https://doi.org/10.1038/s41597-022-01537-6

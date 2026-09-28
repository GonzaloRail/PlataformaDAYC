# Protocolo tecnico confirmatorio v2

**Version:** 2.0.0
**Estado:** preparado para congelacion; no ejecutado
**Alcance:** arnes tecnico reproducible de operaciones versionadas, entrega durable y carga ligera. No evalua participantes, validez clinica ni indicadores sin instrumento automatizado en este arnes.

## 1. Unidad, corpus y version

La unidad primaria es una ejecucion de una celda escenario-carga-repeticion. Cada ejecucion usa el corpus sintetico sellado `corpus_sintetico_v1.json`, sin datos de ninos ni de participantes. Las sesiones, actores, identificadores de operacion y defectos se derivan de la semilla declarada en dicho archivo. La matriz `matriz_ejecucion_v2.csv` define las 138 celdas obligatorias: E0 con una sesion y E1-E9 con 1, 10, 25, 50 y 100 sesiones, cada una con tres repeticiones.

La congelacion incluye el commit Git, estado limpio, version de Python, plataforma, hashes SHA-256 de los artefactos de esta fase, el arnes y las pruebas tecnicas. Una diferencia invalida la ejecucion antes de lanzar pruebas. Los resultados se conservan separadamente y nunca sustituyen el sello.

## 2. Escenarios confirmatorios

| Codigo | Escenario | Hecho comprobable por el arnes |
|---|---|---|
| E0 | Operacion nominal | Aplicacion de una operacion con version esperada. |
| E1 | Carga concurrente | Publicacion durable de una unidad por sesion en 1, 10, 25, 50 y 100 sesiones. |
| E2 | Desconexion diferida | Operacion durable antes del envio y sin perdida de la operacion programada. |
| E3 | Reconexion | Publicacion posterior de un evento pendiente. |
| E4 | Replay | Reenvio del mismo `operation_id` sin efecto adicional. |
| E5 | Omision | Deteccion determinista de una operacion ausente. |
| E6 | Reordenamiento | Rechazo de una secuencia de dispositivo duplicada. |
| E7 | Reinicio o fallo de componente | Recuperacion del publicador pendiente y ausencia de activo durable tras fallo de almacenamiento. |
| E8 | Conflicto concurrente | Rechazo de una operacion con version base obsoleta. |
| E9 | Recorrido integral | Ejecucion conjunta de los casos anteriores disponibles en el arnes. |

E0 se ejecuta solo con una sesion como linea base conectada. E1-E9 se ejecutan en todas las cargas prescritas. Cuando un caso no escala internamente, la carga sigue registrada como condicion de la celda; no se inferira capacidad adicional a partir de ese caso.

## 3. Umbrales y regla de decision

Los siguientes criterios son deterministas y no se ajustaran tras abrir resultados:

| Indicador cubierto | Umbral confirmatorio | Oraculo externo |
|---|---:|---|
| I01 continuidad de operacion programada | 100 % | `VersionOracle` y manifiesto de celda |
| I02-C recuperacion | 100 % de sesiones afectadas | manifiesto de celda |
| I07-C convergencia de version y operaciones | 100 % | `VersionOracle.assert_observed` |
| I08 perdida de eventos comprometidos | 0 eventos | manifiesto de celda |
| I09 duplicacion de efectos | 0 efectos adicionales | `VersionOracle.submit` |
| I10 precedencias invalidas | 0 violaciones | restriccion de secuencia y manifiesto |
| I11 deteccion de conflictos | 100 % | `VersionOracle.submit` |
| I12 resolucion incorrecta o pendiente | 0 conflictos | `VersionOracle.submit` |
| I17 activo durable tras fallo de almacenamiento | 0 activos | inspeccion persistente |
| E1 publicacion de carga ligera | 100 % de sesiones | conteo externo de la celda |

Una celda cumple solo si el comando termina en cero, produce todos los archivos requeridos y el oraculo independiente la declara valida. El resultado de cada indicador es el peor resultado de sus celdas aplicables. No se promedian resultados favorables. Una ejecucion invalida por fallo externo solo puede repetirse si el manifiesto registra la causa, conserva el intento invalidado y no existe salida parcial del producto; no hay reintentos selectivos de celdas desfavorables.

Los tiempos, percentiles, recursos y tasas con umbral `TBD` en `02_variables_indicadores.md` quedan fuera de este protocolo acotado y se informan como no evaluados, no como cumplimiento. Este v2 no autoriza una afirmacion global de H1 ni el uso con participantes.

## 4. Repeticiones, aleatorizacion y datos faltantes

Se ejecutan exactamente tres repeticiones por celda, en orden aleatorizado determinista derivado de `execution_seed` del corpus. La semilla de cada celda se calcula como `execution_seed + indice_de_celda`. Los tres resultados se conservan aunque uno incumpla.

No se imputan resultados. Una telemetria o manifiesto ausente hace que la celda no cumpla. Un archivo de salida incompleto, un cambio de hash, un comando no iniciado o un estado no verificable se clasifica como `indeterminado` y bloquea cualquier declaracion de cumplimiento de la dimension afectada.

## 5. Independencia y trazabilidad

`oracle/confirmatory_oracle.py` no importa modelos, servicios ni serializadores de DAYC-2. Solo interpreta el corpus, la matriz, el sello y los manifiestos de resultados. `backend/tests/technical/harness.py` conserva el modelo de referencia de versiones separado de los servicios de aplicacion. El ejecutor recolecta salida estandar, salida de error, tiempos, entorno permitido, semilla, comando, hashes y veredicto por celda.

## 6. Cierre de congelacion

Antes de ejecutar se debe revisar este protocolo y ejecutar `generate_freeze_manifest.py` con un arbol Git limpio. La aprobacion, fecha, responsable y hash del manifiesto se registran fuera de este archivo. Cualquier cambio posterior exige un nuevo protocolo/version y un nuevo sello; no se modifica este v2 con resultados.

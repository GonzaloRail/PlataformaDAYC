# PROTOCOLO PRELIMINAR DE VALIDACIÓN

## 1. Propósito

Este protocolo define cómo se verificará la arquitectura de software distribuida orientada a eventos, con sincronización multi-actor y pipeline trazable de evidencias multimodales. La evaluación digital del desarrollo infantil funcionará como caso de estudio reemplazable para instanciar el artefacto. El protocolo vincula el capítulo 1, el documento `02_variables_indicadores.md` y la futura presentación de resultados en el capítulo 4.

La validación tendrá dos componentes separados:

1. **Evaluación técnica confirmatoria:** empleará datos sintéticos para verificar continuidad, sincronización, consistencia, confiabilidad de eventos, proveniencia, multimodalidad, permisos y rendimiento.
2. **Evaluación humana de factibilidad:** estudiará comprensión, usabilidad, carga percibida e incidencias con los actores autorizados del caso. No evaluará eficacia diagnóstica ni validez psicométrica del instrumento seleccionado.

Los resultados técnicos y humanos no se combinarán en un promedio general. Las pruebas preliminares, la calibración y el piloto se utilizarán para ajustar instrumentos y procedimientos, pero no se incorporarán a la base confirmatoria.

## 2. Alcance y exclusiones

El protocolo incluye:

- Pruebas de integración y pruebas unitarias;
- desconexión, reconexión y recuperación;
- idempotencia, duplicación, pérdida, retraso y orden de eventos;
- concurrencia y resolución de conflictos;
- trazabilidad, integridad y versionado;
- disponibilidad y calidad multimodal;
- permisos, auditoría, consentimiento, asentimiento, pausa y retiro;
- carga simulada de 1, 10, 25, 50 y 100 sesiones;
- piloto exploratorio con cinco díadas;
- evaluación prevista con 25 a 30 díadas y 3 a 5 psicólogos o profesionales autorizados.

Se excluyen:

- diagnóstico automatizado;
- validación psicométrica del instrumento del caso;
- comparación de eficacia clínica con otros instrumentos;
- uso de datos reales en las pruebas de carga;
- interpretación automática del asentimiento infantil;
- inicio de actividades humanas sin aprobación ética e institucional.

## 3. Versiones y congelamiento

| Versión | Momento | Contenido congelado | Uso permitido |
|---|---|---|---|
| Protocolo técnico v1 | Antes de la calibración | Variables, fórmulas, invariantes, escenarios, taxonomías, exclusiones y valores de aceptación con fuente independiente | Prueba técnica preliminar |
| Protocolo técnico v2 | Después de calibración y antes de la evaluación confirmatoria | Los mismos valores de aceptación, más duración, repeticiones, perfiles, infraestructura, código, scripts y reglas de dictamen por dimensión | Evaluación técnica confirmatoria |
| Protocolo de campo v1 | Después de aprobación y antes del piloto | Reclutamiento, instrucciones, instrumentos, consentimiento, asentimiento, pausas, retiro y seguridad | Piloto con cinco díadas |
| Protocolo de campo v2 | Después del piloto y antes de aplicación principal | Ajustes permitidos, criterios exploratorios e instrumentos definitivos | Evaluación humana principal |

Cada versión registrará fecha, responsables, hash de archivos, código de revisión y motivo de los cambios. Una modificación funcional posterior al congelamiento técnico obligará a repetir las pruebas afectadas con una nueva versión; una ejecución desfavorable válida nunca se reemplazará para mejorar el resultado.

## 4. Responsabilidades

Los nombres se completarán cuando la institución confirme el equipo.

| Rol | Responsabilidad principal | No puede realizar sin revisión |
|---|---|---|
| Investigador principal | Custodiar protocolo, ejecutar análisis y documentar desviaciones | Cambiar criterios después de abrir datos confirmatorios |
| Responsable técnico | Preparar infraestructura, scripts, telemetría y respaldos | Excluir ejecuciones válidas desfavorables |
| Revisor técnico independiente | Verificar oráculos, manifiestos y resultados críticos | Modificar el sistema durante la evaluación confirmatoria |
| Responsable ético/institucional | Confirmar autorizaciones, privacidad y actuación ante incidencias | Delegar interpretación del asentimiento al software |
| Profesional autorizado | Supervisar flujo, revisar evidencias y registrar decisiones | Liberar resultados sin elementos obligatorios |
| Cuidador | Autorizar según protocolo, acompañar y comunicar incidencias | Sustituir el asentimiento del niño cuando este sea requerido |
| Observador de campo | Registrar tareas, ayuda, pausas e incidencias | Interpretar clínicamente resultados |

> **Pendiente:** completar nombres, competencias, segregación de funciones y responsables de custodia antes de firmar cada protocolo.

## 5. Puertas de entrada

### 5.1 Puerta documental

Antes de la evaluación técnica confirmatoria deben estar disponibles:

- protocolo técnico v2 sin `TBD` aplicables;
- matriz de indicadores `I01-I45` versionada;
- alcance definitivo de modalidades y tareas;
- arquitectura y modelo de datos versionados;
- catálogo de operaciones críticas, errores, conflictos y datos faltantes.

### 5.2 Puerta técnica

Antes de abrir la base confirmatoria deben cumplirse:

- pruebas unitarias e integración sin fallos críticos;
- telemetría suficiente para calcular cada indicador aplicable;
- `operation_id` estable de extremo a extremo;
- manifiesto externo de operaciones y eventos programados;
- oráculo independiente para estados, efectos y linaje;
- cola durable para todos los eventos declarados críticos;
- hashes y relaciones original-derivado;
- política de conflictos y versiones;
- auditoría de accesos permitidos y denegados;
- entorno de carga e inyección de fallos reproducible.
- configuración congelada que deshabilite o aísle todo endpoint, interfaz, reporte y modelo de diagnóstico automatizado.
- puerta de seguridad `G_SEC` aprobada, con cifrado, minimización, segregación, respaldo, retención y borrado verificados.

El código actual ya contiene cola IndexedDB para evidencias, claves de idempotencia, restricción única en backend, control optimista para ciertas mutaciones, WebSocket, Redis, tokens por rol, consentimiento por modalidad, retiro parcial o total, pausa y decisión profesional obligatoria por ítem. Sin embargo, todavía deben resolverse las brechas registradas en `02_variables_indicadores.md`: eventos temporales fuera de la cola durable, fallos de IndexedDB sin telemetría suficiente, ausencia de linaje completo, asentimiento no continuo, tratamiento incompleto de derivados y respaldos tras retiro y cierre integral sin recepción, asignación y siguiente acción obligatorias.

### 5.3 Puerta humana

Antes del piloto se requieren:

- aprobación del comité de ética y autorización institucional;
- requisitos oficiales del instrumento seleccionado aplicables al flujo;
- criterios de inclusión, exclusión y retiro aprobados;
- consentimiento adulto y procedimiento de asentimiento infantil;
- instrumentos revisados por expertos;
- protocolo de privacidad, seguridad y respuesta ante incidentes;
- capacitación de investigadores y profesionales;
- versión técnicamente estable que haya superado `K_G-pre`, `G_DX` y `G_SEC`;
- aprobación experta documentada de las instrucciones, checkpoints y listas de `I35-I36`.

Si falta cualquiera de estas condiciones, no se reclutarán participantes.

Cuando el flujo humano utilice cálculos dependientes del instrumento, la puerta separada `G_CASE` exigirá documentación oficial y cumplimiento de `I40` antes del piloto. `I35-I36` constituyen `K_G-campo`: se observan durante el piloto y deben cumplir antes de avanzar a la aplicación principal. Por tanto, no son una condición circular para incorporar la primera díada.

## 6. Ambientes de validación

| Ambiente | Datos | Infraestructura | Finalidad |
|---|---|---|---|
| Unitario | Fixtures sintéticos mínimos | Proceso aislado | Reglas, estados, permisos, idempotencia y cálculos |
| Integración | Sesiones y archivos sintéticos | PostgreSQL, Redis, API, clientes y almacenamiento de prueba | Flujos entre componentes |
| Calibración | Corpus sintético versionado | Infraestructura equivalente a la confirmatoria | Variabilidad, duración, capacidad y repeticiones |
| Confirmatorio | Corpus sintético nuevo y congelado | Infraestructura identificada por versión | Contraste técnico |
| Piloto | Datos autorizados de cinco díadas | Ambiente de campo controlado | Factibilidad de procedimiento e instrumentos |
| Aplicación humana | Datos autorizados de muestra prevista | Ambiente aprobado | Factibilidad operativa y experiencia |

Para cada ambiente se registrarán sistema operativo, CPU, memoria, almacenamiento, versiones de PostgreSQL y Redis, versión de aplicación, navegador, dispositivo, red, zona horaria, sincronización de reloj y configuración de seguridad. Las duraciones locales usarán reloj monotónico; la hora civil se conservará solo para auditoría. Antes de medir latencia unidireccional se verificará una referencia temporal común, su método de sincronización, el *offset* y la incertidumbre. Si el presupuesto de incertidumbre no se cumple, la ejecución reportará RTT en un solo reloj o se clasificará como no apta para latencia unidireccional.

Para cada escenario, el manifiesto enumerará los nodos comparables. Un nodo es una proyección persistente u observable del estado de sesión: cliente local, API/base canónica, consumidor y réplica cliente suscrita, cuando correspondan. El snapshot excluirá campos no deterministas como hora de lectura y los normalizará mediante un esquema versionado; incluirá identificadores, versión, respuestas, estados, referencias a evidencias y eventos aplicados. Un componente sin estado de sesión comparable no se contará como nodo para `I07-C`.

La infraestructura local disponible incluye PostgreSQL 16 y Redis 7 mediante `backend/docker-compose.yml`. No existe actualmente un generador de carga o inyector de fallos incorporado al repositorio; su selección e implementación forman parte de la preparación técnica y deberán quedar versionadas antes de la calibración.

## 7. Datos sintéticos y oráculos

### 7.1 Manifiesto externo

Cada ejecución tendrá un manifiesto generado fuera del sistema probado con:

- `run_id` y semilla;
- sesiones, actores y dispositivos simulados;
- operaciones programadas;
- `operation_id`, secuencia y versión esperada;
- modalidad, tamaño y hash de cada evidencia;
- perfil de red y fallo;
- estado y efectos esperados;
- relaciones de precedencia;
- conflictos inyectados y resolución esperada.

El manifiesto define denominadores independientes para evitar que una operación perdida desaparezca también del cálculo.

### 7.2 Corpus sintético

El corpus contendrá respuestas, eventos, imágenes, audio y video artificiales sin información personal. Los archivos tendrán tamaños, duraciones y defectos conocidos. Las evidencias defectuosas incluirán ruido, truncamiento, corrupción, ausencia, marcas temporales desplazadas y versiones alteradas.

El protocolo técnico v2 congelará por modalidad una taxonomía ejecutable de defectos con tipo, parámetro de inyección, severidad mínima, intervalo exacto del oráculo y tolerancia de solapamiento. Los defectos sintácticos o criptográficos se adjudicarán automáticamente. Ruido, oscuridad, oclusión y utilidad perceptiva requerirán dos revisores ciegos al resultado del sistema; el desacuerdo se resolverá mediante un tercer revisor. Un defecto contará como detectado cuando la anotación del sistema coincida en tipo y alcance el solapamiento mínimo congelado; “preservado” exigirá conservar original, intervalo, causa y versión sin sobrescritura.

### 7.3 Oráculos

Se prepararán cuatro oráculos independientes:

1. **Oráculo de estado:** estado final esperado por sesión y versión.
2. **Oráculo de eventos:** comandos, aceptaciones durables, entregas, efectos y registros auditables esperados.
3. **Oráculo de proveniencia:** originales, derivados, transformaciones, hashes, agentes y versiones.
4. **Oráculo de permisos:** decisiones permitidas y denegadas por rol, recurso, acción, sesión y estado de autorización.

## 8. Verificación existente y comandos base

Los controles existentes se ejecutarán antes de cada versión candidata:

```bash
cd frontend
npm run lint
npm run build
npm run test -- --run
```

```bash
cd backend
source venv/bin/activate
python -m black --check .
python -m flake8
python -m pytest
```

Los tests actuales cubren parcialmente cola de evidencias, flujo distribuido, sesión de minijuegos, estado de evaluación, autorización, WebSocket, envío de respuestas, conflicto de versión y reglas de baremos. No sustituyen las pruebas confirmatorias de carga, fallos, linaje o gobernanza.

## 9. Protocolo técnico

### 9.1 Catálogo de familias

| Código | Familia | Indicadores | Escenarios | Evidencia mínima | Criterio de cierre |
|---|---|---|---|---|---|
| `PT01` | Pruebas unitarias | I09-I19, I23, I31-I34, I37-I40 | Casos deterministas | Reporte, cobertura y casos fallidos | Todos los casos críticos automatizables pasan |
| `PT02` | Integración extremo a extremo | I01-I03, I07-I10, I13-I21, I26-I34 | E0, E3 | Logs correlacionados y estado final | Flujo completo reconstruible |
| `PT03` | Operación offline | I01, I08, I20-E, I21 | E2 | Almacenamiento local y manifiesto | 100 % de operaciones críticas durables |
| `PT04` | Reconexión y recuperación | I02-C, I02-T, I07-C, I07-T_recon | E3, E9 | Snapshots antes/después y tiempos | Exactitud total; tiempo dentro de TBD congelado |
| `PT05` | Propagación | I03 | E0, E1, E3 | Trazas con reloj e incertidumbre | P50/P95/P99 dentro de umbral |
| `PT06` | Idempotencia y replay | I09 | E4, E7c, E7d, E9 | Entregas y efectos | Cero efectos duplicados |
| `PT07` | Pérdida | I08 | E2-E7d, E9 | Aceptaciones, commits, efectos y auditoría | Cero eventos comprometidos incumplidos |
| `PT08` | Orden y eventos tardíos | I10 | E6, E9 | Precedencias y log de aplicación | Cero transiciones inválidas |
| `PT09` | Conflictos concurrentes | I11-I12 | E8, E9 | Intentos, versiones y decisión | Detección 100 % y resolución incorrecta 0 % |
| `PT10` | Carga y recursos | I03-I06, I07-T_recon, I07-T_write | E0, E1, E3 | Series temporales y reportes por carga | Umbrales congelados por nivel |
| `PT11` | Proveniencia e integridad | I13-I19 | E0, E3, E5, E7, E9 | Grafo, hashes y manifiestos | Todos los invariantes críticos pasan |
| `PT12` | Multimodalidad | I20-I25 | E0-E3, E7 | Archivos, defectos y marcas | Estructurados íntegros; medios según criterios |
| `PT13` | Revisión profesional | I26-I30 | E0, E3, E8 | Estados, decisión y siguiente acción | Cero salidas finales sin revisión |
| `PT14` | Permisos y auditoría | I31-I33 | E0-E9 | Manifiesto de intentos y bitácora | Matriz 100 % y cero accesos indebidos |
| `PT15` | Consentimiento, pausa y retiro | I34, I37-I39 | E0-E3, E9 | Autorizaciones, órdenes y objetos afectados | Todos los casos críticos pasan |
| `PT16` | Corrección funcional | I40 | Casos autorizados | Entrada, esperado y obtenido | 100 % y cero discrepancias |
| `PT17` | Exclusión diagnóstica (`G_DX`) | Puerta independiente | E0-E9 y ambientes de tesis | Configuración, rutas, UI, reportes, persistencia y logs | Cero diagnósticos generados, mostrados, exportados o persistidos |
| `PT18` | Protección de datos (`G_SEC`) | Puerta independiente | Integración, respaldo y restauración | Configuración, tráfico, exportaciones, almacenes y acta | Todos los controles obligatorios pasan |

Las familias de campo se registrarán por separado: `PH01` comprobará el procedimiento y checkpoints de asentimiento (`I35-I36`); `PH02` medirá factibilidad, usabilidad, comprensión y carga percibida (`I41-I45`). Ninguna de ellas se presentará como prueba unitaria.

### 9.2 Procedimiento común

Cada familia seguirá estos pasos:

1. Verificar versión del protocolo, código, configuración e infraestructura.
2. Crear ambiente limpio o restaurar snapshot inicial.
3. Cargar manifiesto y corpus sintético correspondientes.
4. Sincronizar o medir relojes y registrar incertidumbre.
5. Iniciar telemetría antes de generar operaciones.
6. Ejecutar calentamiento cuando aplique, sin incluirlo en la ventana de medición.
7. Ejecutar escenario con semilla registrada.
8. Esperar ventana de recuperación o vaciado previamente definida.
9. Detener captura y exportar logs, estados, métricas y hashes.
10. Comparar resultados con oráculos mediante un script independiente.
11. Calcular indicadores por escenario, carga y modalidad.
12. Registrar cumplimiento, incumplimiento, desviación o `N/A` preespecificado.
13. Firmar el paquete de evidencia de la ejecución.

### 9.3 Pruebas de sincronización y reconexión

Para `PT03-PT05` se ejecutará:

1. Crear sesiones y completar una secuencia inicial conectada.
2. Confirmar localmente versión y cola vacía.
3. Aplicar el perfil de desconexión o degradación.
4. Generar respuestas, eventos y evidencias según manifiesto.
5. Reiniciar el cliente en una fracción predefinida de ejecuciones.
6. Confirmar que el progreso permanece localmente durable.
7. Restablecer conectividad.
8. Medir restauración de cola, propagación y convergencia.
9. Comparar todos los nodos con `V*(s)`.
10. Verificar que no existan eventos perdidos, efectos duplicados o huecos silenciosos.

Kim et al. (2026, pp. 6-12) sustentan medir continuidad, latencia, pérdida y recursos, pero no el procedimiento específico de reconexión, que constituye una prueba propia. Los patrones offline-first justifican conservar cambios localmente y sincronizarlos después (Ashista et al., 2026, pp. 6-9; Medhi et al., 2022, pp. 3-7).

### 9.4 Idempotencia, pérdida, duplicación y orden

Para `PT06-PT08` se inyectarán:

- el mismo `operation_id` dos, tres y múltiples veces;
- timeout antes y después del acuse de commit;
- caída del consumidor antes y después de aplicar el efecto;
- eventos omitidos temporalmente y entregados después;
- permutaciones de secuencias dependientes;
- replay posterior a reinicio.

Se distinguirán comando programado, aceptación durable, mensaje entregado, efecto aplicado y evento auditable. La entrega repetida es admisible; el efecto repetido no. Los problemas de orden, replay, semántica de entrega e idempotencia están documentados como desafíos centrales de arquitecturas orientadas a eventos (Laigner et al., 2026, pp. 23-30).

### 9.5 Conflictos concurrentes

Dos o más actores intentarán modificar el mismo agregado desde la misma versión. Se cubrirán:

- respuesta frente a respuesta;
- edición frente a cierre;
- pausa o retiro frente a captura;
- revisión frente a corrección;
- reconexión de dos dispositivos con cambios incompatibles.

La política congelada indicará si cada conflicto se rechaza, fusiona, conserva en versiones o remite a revisión. Se verificará detección, respuesta al cliente, preservación de ambos intentos y estado final.

### 9.6 Proveniencia y trazabilidad

Para `PT11`, un verificador automático recorrerá todos los resultados confirmatorios dentro del alcance. El muestreo estratificado por modalidad y escenario se reservará para revisión humana secundaria y no sustituirá el denominador de `I15`. El recorrido será:

`resultado → revisión → derivado → transformación → original → sesión → actor/dispositivo → autorización`.

Después se eliminarán o alterarán controladamente enlaces, agentes, versiones y archivos para comprobar detección de huecos e integridad. Los modelos de proveniencia distribuida respaldan el uso de instantáneas, identificadores, conectores y versiones conservadas (Wittner et al., 2022, pp. 4-13), mientras la captura por elemento ofrece un referente para fuente, destino, transformación y responsable (Gierend et al., 2023, pp. 6-12).

### 9.7 Multimodalidad

Para `PT12` se probarán por separado respuesta, evento, imagen, audio y video autorizados. Se verificará:

- disponibilidad y legibilidad;
- metadatos de modalidad y calidad;
- hash del original;
- vínculo con derivados;
- causa de ausencia o no utilidad;
- preservación de segmentos defectuosos;
- alineación temporal solo cuando exista referencia común.

Los defectos se conocerán desde el oráculo para evitar que un detector que no encuentre problemas reduzca artificialmente el denominador. Las modalidades no se promediarán entre sí. La literatura muestra la necesidad de conservar información faltante, segmentos no utilizables y marcas temporales (Kalanadhabhatta et al., 2025, pp. 8-11; Geangu et al., 2023, pp. 27-35).

### 9.8 Permisos y gobernanza

La matriz RBAC incluirá intentos positivos y negativos para niño, cuidador, profesional asignado, profesional no asignado, servicio interno y administrador. Se probarán sesión propia y ajena, token expirado o revocado, URL directa, cambio de identificador, descarga, visualización, modificación, eliminación y consulta de linaje.

El denominador procederá del manifiesto externo de intentos. La bitácora deberá registrar también los denegados, con actor, recurso, acción, resultado, fecha y correlación. Confidencialidad, integridad, autenticidad y auditabilidad son dimensiones diferenciadas de la gestión de proveniencia sanitaria (Sembay et al., 2023, pp. 21-22).

### 9.9 Carga concurrente

La carga preliminar será:

| Nivel | Sesiones concurrentes | Finalidad |
|---|---:|---|
| C1 | 1 | Línea funcional y costo base |
| C2 | 10 | Carga baja |
| C3 | 25 | Correspondencia con límite inferior de muestra humana prevista |
| C4 | 50 | Carga media simulada |
| C5 | 100 | Capacidad alta declarada, si se mantiene en protocolo v2 |

Cada sesión virtual ejecutará una mezcla congelada de respuestas, eventos y archivos sintéticos. Se separarán calentamiento, ventana estable y vaciado. Para cada nivel se calcularán latencia, error, throughput, recursos, pérdida, duplicación y convergencia. Si C5 no cumple rendimiento pero conserva integridad, se declarará la capacidad máxima soportada; no se ocultará mediante promedios.

El repositorio no incluye actualmente herramienta de carga. El protocolo técnico v2 deberá identificar herramienta, versión, scripts, distribución de llegadas, ritmo de operaciones, tamaños de archivos, duración, semillas y recursos del generador.

### 9.10 Exclusión de diagnóstico automatizado

`PT17` se ejecutará en cada versión candidata y antes de cualquier dato humano. La configuración de tesis deberá impedir la generación automática aunque se invoque directamente la API, se altere la URL, se reproduzca un evento o se intente usar una sesión histórica. Se comprobará que:

- la ruta responde con denegación o no está registrada;
- la interfaz no ofrece ni representa “diagnóstico AI”;
- los PDF y exportaciones no contienen campos diagnósticos automáticos;
- no se crean ni actualizan filas, eventos o artefactos de diagnóstico;
- el rol administrador tampoco puede eludir la exclusión;
- el hash de configuración y la evidencia de cada intento quedan en el paquete de ejecución.

`G_DX` solo cumple con cero generaciones, visualizaciones, exportaciones y persistencias en la suite completa. Un hallazgo detiene la evaluación y no puede clasificarse como `N/A`.

### 9.11 Protección de datos

`PT18` verificará `G_SEC` mediante una lista aprobada y pruebas negativas. La puerta exige, como mínimo:

1. TLS válido para todo tránsito de datos sensibles y rechazo de transporte en claro.
2. Cifrado en reposo de base, evidencias y respaldos con gestión de claves documentada.
3. Tabla de reidentificación separada, acceso restringido y ausencia de identificadores directos en archivos, URLs, logs técnicos y paquetes analíticos.
4. Exportaciones limitadas a un esquema mínimo autorizado y rechazo de campos prohibidos.
5. Restauración de respaldos sin ampliar permisos ni reintroducir objetos cuyo estado de retiro impida uso.
6. Ejecución trazable de la política aprobada de retención y borrado sobre originales, derivados, copias y respaldos.

Cada control conservará configuración, intento, resultado, ubicación afectada y revisor. Una excepción requerida por normativa deberá estar documentada y aprobada antes de la prueba; una capacidad ausente significa puerta incumplida.

## 10. Calibración y evaluación confirmatoria

### 10.1 Calibración técnica

La calibración utilizará un corpus distinto del confirmatorio y servirá exclusivamente para:

- verificar que cada indicador puede calcularse;
- estimar variabilidad y efectos de calentamiento;
- fijar duración y número de repeticiones;
- verificar la aplicabilidad y medibilidad de los umbrales ya respaldados y congelados en el protocolo técnico v1;
- comprobar si la infraestructura puede ejecutar la matriz.

No se relajará un invariante porque la implementación no lo alcance. Se corregirá el artefacto y se repetirá la calibración afectada.

### 10.2 Regla para cerrar `TBD`

La calibración no determinará el criterio a partir del rendimiento observado. Antes de ejecutarla, cada criterio de aceptación tendrá una ficha con fuente independiente, propietario, versión, unidad y sentido del límite. Los tiempos, tasas máximas y recursos conservarán el máximo exigido; throughput, disponibilidad y proporciones conservarán el mínimo. Las conversiones redondearán máximos hacia abajo y mínimos hacia arriba con la resolución instrumental. Si no existe requisito independiente para un indicador de desempeño o multimodalidad aplicable, la dimensión respectiva se reportará como indeterminada y no podrá sostenerse esa capacidad.

La calibración fijará duración y repeticiones, no flexibilizará umbrales. El acta registrará cualquier reducción admisible de alcance y su justificación, pero no podrá eliminar indicadores de desempeño o todas las modalidades de medios para evitar un dictamen indeterminado.

### 10.3 Evaluación técnica confirmatoria

Después de congelar el protocolo técnico v2:

- se utilizará un corpus sintético nuevo;
- el orden de escenarios se aleatorizará;
- no se modificarán código, scripts, umbrales o exclusiones;
- todas las ejecuciones válidas se conservarán;
- se analizarán todas las celdas aplicables;
- cualquier cambio necesario originará una nueva versión y repetición completa del bloque afectado.

## 11. Protocolo humano

### 11.1 Naturaleza

La evaluación humana será exploratoria y de factibilidad. Medirá `I35-I36` e `I41-I45`, además de observar `I37-I39` cuando el protocolo aprobado permita probar pausa o retiro. No se utilizará para contrastar la validez clínica del instrumento del caso.

### 11.2 Población y muestra prevista

- Piloto: cinco díadas niño-cuidador.
- Aplicación principal: 25 a 30 díadas.
- Profesionales: 3 a 5 psicólogos o profesionales autorizados por el manual y la institución.

Estas cantidades son previsiones metodológicas, no disponibilidad confirmada ni tamaños derivados de los artículos. Deben justificarse y aprobarse antes del reclutamiento.

### 11.3 Criterios de elegibilidad

> **Pendiente de aprobación:** edad exacta, relación del facilitador, idioma, condiciones de aplicación, experiencia del revisor, capacidad para consentir, criterios de seguridad y condiciones de exclusión se definirán con la documentación oficial del instrumento seleccionado, la institución y el comité de ética. No se deducirán únicamente del rango general del instrumento.

No se excluirá a una familia por ejercer pausa, retiro o disenso. Las necesidades de accesibilidad se documentarán y no se resolverán mediante cambios improvisados durante la aplicación confirmatoria.

### 11.4 Reclutamiento

El reclutamiento será realizado por personal autorizado y separado de cualquier relación que pueda generar presión indebida. La invitación explicará objetivo tecnológico, voluntariedad, actividades, modalidades capturadas, destinatarios, riesgos, beneficios no garantizados, custodia, conservación, retiro y contacto para preguntas.

No se prometerá diagnóstico, tratamiento, beneficio clínico directo ni equivalencia con una evaluación presencial.

### 11.5 Consentimiento adulto

Antes de capturar evidencia se verificará:

- identidad y capacidad de la persona autorizante;
- versión del documento;
- finalidad y alcance;
- modalidades permitidas;
- destinatarios y custodio;
- periodo de conservación;
- opciones de pausa y retiro;
- tratamiento de originales, derivados, copias y auditoría;
- aceptación o rechazo registrado sin casillas preseleccionadas.

La decisión familiar puede depender de finalidad, destinatario y custodia, y debe revisarse cuando cambian las condiciones (Wild et al., 2023, pp. 5-8). Esta evidencia orienta el diseño, pero la obligación concreta dependerá de la normativa y aprobación aplicables.

### 11.6 Asentimiento infantil

El asentimiento se tratará como continuo, revocable y distinto del consentimiento adulto. El procedimiento incluirá:

1. Explicación adecuada a la edad de qué ocurrirá y qué se capturará.
2. Oportunidad para explorar controles y hacer preguntas.
3. Decisión inicial registrada por una persona capacitada.
4. Nuevas oportunidades antes de cambios de actividad o modalidad.
5. Control visible de pausa o salida.
6. Interrupción ante rechazo directo o incomodidad según protocolo.
7. Reanudación solo después de acción humana documentada.

El sistema no clasificará gestos, silencio, mirada o postura como aceptación o rechazo. Estas señales son contextuales y requieren valoración humana (Mirabella et al., 2025, pp. 3-4, 7-11, 15).

### 11.7 Secuencia del piloto

1. Confirmar autorización, versión y capacitación.
2. Explicar el estudio al cuidador y al niño.
3. Registrar consentimiento y asentimiento inicial.
4. Ejecutar prueba de dispositivo, red, audio/video autorizado y almacenamiento.
5. Realizar tareas seleccionadas sin alterar reglas del instrumento.
6. Introducir únicamente incidencias benignas aprobadas; no se provocarán fallos que generen angustia.
7. Observar comprensión, ayuda, errores, pausas, carga y recuperación visible.
8. Permitir retiro inmediato sin penalización.
9. Aplicar cuestionario e entrevista aprobados.
10. Revisar evidencia, cerrar sesión y verificar custodia.
11. Realizar debriefing y registrar incidentes.

El piloto evaluará el procedimiento y no H1. Cinco éxitos de cinco no demostrarán una tasa poblacional aceptable.

### 11.8 Ajustes después del piloto

Podrán ajustarse:

- claridad y orden de instrucciones;
- logística y duración;
- categorías de incidencia;
- instrumentación que no modifique la tarea;
- texto, orden y criterios descriptivos de los instrumentos exploratorios, incluida la categoría de carga alta de `I45`.

No podrán seleccionarse únicamente resultados favorables, eliminarse indicadores por mal desempeño o reutilizarse datos del piloto como confirmatorios. Un cambio funcional obliga a repetir las verificaciones técnicas afectadas.

### 11.9 Aplicación humana principal

La aplicación utilizará el protocolo de campo v2 congelado. Se registrarán finalización, incidencias, ayuda, pausas, retiros, comprensión, usabilidad y experiencia de cuidadores y profesionales. Los resultados se presentarán por rol y tarea, con denominadores y datos faltantes explícitos. No se inferirá eficacia clínica.

Las evaluaciones remotas conservan responsabilidades de administración y revisión profesional, y la evidencia disponible no autoriza a convertir el sistema en intérprete autónomo (La Valle et al., 2022, pp. 7-8, 12-13; Ke et al., 2024, pp. 4, 6, 8-10).

## 12. Seguridad, privacidad e incidentes

Se aplicarán minimización, seudonimización, cifrado, separación de identificadores, acceso por rol y registro de operaciones. La tabla que vincule identidad con seudónimo se almacenará separadamente y con acceso restringido.

Se detendrá inmediatamente la captura humana ante:

- retiro o pausa solicitada;
- rechazo directo del niño;
- malestar significativo observado;
- captura de terceros no autorizados;
- pérdida de control sobre audio o video;
- acceso no autorizado;
- corrupción o exposición de datos;
- fallo que impida saber si la captura continúa;
- decisión del profesional responsable.

La reanudación requerirá resolver la causa, documentar el incidente y obtener una nueva confirmación humana cuando corresponda. Los incidentes de seguridad se escalarán según el protocolo institucional; no se establecerán plazos legales sin revisar la normativa aplicable.

## 13. Gestión de datos y evidencias

Cada paquete de ejecución contendrá:

- protocolo y configuración;
- manifiesto externo;
- datos sintéticos o registros seudonimizados autorizados;
- logs y telemetría;
- snapshots y estados finales;
- hashes de originales y derivados;
- scripts y salida del oráculo;
- indicadores calculados;
- desviaciones e incidentes;
- firma o hash del paquete.

Los datos humanos se separarán de los sintéticos y de carga. La conservación, eliminación, anonimización y tratamiento de respaldos se definirán en el protocolo aprobado. El retiro no implicará automáticamente borrado físico universal: cada objeto quedará con un estado explícito conforme al consentimiento, normativa y obligaciones autorizadas.

## 14. Control de calidad y desviaciones

### 14.1 Control previo

- revisión por pares del manifiesto y oráculos;
- ejecución de casos positivos y negativos conocidos;
- verificación de relojes y correlación;
- comprobación de espacio, respaldo y capacidad del generador;
- ensayo de exportación y reconstrucción.

### 14.2 Desviaciones

Toda desviación registrará código, momento, escenario, causa, responsable, datos afectados, decisión y efecto analítico. Se clasificará como:

- desviación sin efecto;
- ejecución inválida por causa externa preespecificada;
- incumplimiento del artefacto;
- incidente ético o de seguridad;
- cambio que exige nueva versión.

Una ejecución inválida no se borra. Una falla de telemetría que impida decidir un indicador crítico cuenta como incumplimiento.

## 15. Análisis

### 15.1 Conformidad determinista

Los invariantes de 0 o 100 % se evaluarán sobre suites finitas o exhaustivas. Todos los casos programados deben pasar. Los intervalos de confianza no se compararán contra 0 o 100 % para decidir conformidad.

Cuando se estime una tasa poblacional, se informará por separado el límite unilateral exacto de Clopper-Pearson al 95 % (Clopper & Pearson, 1934, pp. 404-413). Con cero fallos en `N` ensayos:

\[
p_U = 1 - 0.05^{1/N}
\]

### 15.2 Indicadores de rendimiento

Se reportarán P50, P95 y P99, intervalos unilaterales al 95 %, numerador, denominador y número de ejecuciones. Los percentiles muestrales usarán interpolación lineal tipo 7 (Hyndman & Fan, 1996, pp. 361-365). Para tiempos y throughput se aplicará bootstrap por conglomerados de sesión o ejecución, con 10 000 remuestras, semilla registrada e intervalo percentil unilateral (Davison & Hinkley, 1997); nunca se remuestrearán eventos dependientes como si fueran observaciones independientes. Cada celda escenario-carga se evaluará por separado.

### 15.3 Indicadores exploratorios

`I41-I45` se resumirán por rol y tarea. Se informarán distribución, mediana o media según corresponda, incidencias, ayuda, carga, respuestas faltantes y observaciones cualitativas. SUS solo se calculará si fue aprobado y aplicado conforme a su procedimiento original (Brooke, 1996, pp. 189-194).

Las medidas repetidas no se tratarán como independientes. Se registrará qué profesional atendió cada sesión y cuántas sesiones realizó. El análisis será descriptivo por participante, profesional, rol y tarea; si se calculan intervalos, el remuestreo agrupará por díada para medidas familiares y por profesional para tareas profesionales. Con 3 a 5 profesionales no se harán afirmaciones poblacionales ni comparaciones inferenciales entre profesionales.

### 15.4 Datos faltantes

Se utilizará la taxonomía de `02_variables_indicadores.md`: ausencia esperada, no utilizable trazable, fallo del artefacto, fallo externo predefinido, pausa/retiro y respuesta faltante. No se imputarán críticos ni se excluirán fallos del artefacto.

## 16. Regla de decisión

Para cada indicador, escenario y carga se calculará cumplimiento. Un indicador crítico agregado cumple solo si todas sus celdas aplicables cumplen.

- `K_H = {I01, I02-C, I07-C, I08-I19, I20-E, I21, I23, I24, I26, I27, I29-F, I30}`.
- `S_H = {I02-T, I03-I06, I07-T_recon, I07-T_write, I20-M, I22, I25, I28, I29-T}`.
- `K_G-pre = {I31-I34, I37-F, I38-I39}`, más la aprobación experta del procedimiento de `I35-I36`.
- `K_G-campo = {I35, I36}`.
- `G_CASE = {I40}`, puerta funcional de la instanciación y no parte del contraste arquitectónico.
- `E = {I41-I45}`, excluido del contraste técnico.
- `G_DX` y `G_SEC` son puertas independientes no compensatorias.

Para cada dimensión se consolidarán sus indicadores críticos y de desempeño aplicables. La dimensión cumple cuando sus indicadores aplicables cumplen; no cumple cuando al menos uno evaluable incumple; es indeterminada cuando falta un criterio indispensable, telemetría obligatoria o una celda aplicable; y solo es `N/A` por inaplicabilidad declarada antes de abrir los datos. `I03-I06` y los indicadores multimodales aplicables requieren criterios independientes. Si una celda se abrió y el artefacto no produjo la telemetría exigida, la dimensión no cumple; no se reclasifica como indeterminada.

| Resultado por dimensión | Dictamen |
|---|---|
| Todos los indicadores aplicables de la dimensión cumplen | Cumple la dimensión; se informa junto con escenario y carga |
| Al menos un indicador evaluable incumple, incluida telemetría obligatoria ausente después de abrir la celda | No cumple la dimensión; se identifica componente y causa |
| Falta criterio indispensable, telemetría o una celda obligatoria | Indeterminada; no autoriza afirmar esa capacidad |

La aptitud para iniciar el piloto exige además `K_G-pre`, `G_DX` y `G_SEC`, la aprobación experta de `I35-I36` y `G_CASE` cuando se usen cálculos dependientes del instrumento. Avanzar a la aplicación principal exige que `I35-I36` cumplan durante el piloto y que no existan incidencias éticas o institucionales pendientes. Un indicador o control obligatorio no implementado significa “no apto”, no `N/A`.

## 17. Criterios de detención técnica

Una ejecución o bloque se detendrá ante:

- exposición de datos fuera del ambiente;
- corrupción del corpus u oráculo;
- pérdida de sincronización de relojes superior al límite instrumental;
- falla del generador que invalide el manifiesto;
- agotamiento de recursos que amenace la infraestructura;
- versión de código o configuración distinta de la congelada;
- imposibilidad de capturar un indicador crítico.

Detener una ejecución protege el ambiente, pero no elimina el resultado. La causa determinará si es incumplimiento o invalidación externa preespecificada.

## 18. Evaluación económica

Se elaborará una estimación separada de viabilidad y no de costo-efectividad. El horizonte comprenderá desarrollo hasta la versión evaluada y un año de operación del escenario institucional definido. El protocolo económico congelará moneda, país, fecha base de precios, impuestos, tipo de cambio y tratamiento de recursos aportados por la institución.

El inventario incluirá horas de desarrollo y mantenimiento, infraestructura, almacenamiento primario y respaldo, transferencia multimodal, dispositivos, seguridad, licencias, capacitación, soporte y horas profesionales. Cada partida conservará cantidad, unidad, precio, fuente o cotización, fecha y supuesto. Las mediciones técnicas aportarán eventos, bytes y almacenamiento por sesión; las cotizaciones no se inferirán del corpus bibliográfico.

Se reportarán costo inicial, costo operativo anual y costo por sesión para los niveles de 1, 10, 25, 50 y 100 sesiones concurrentes, sin interpretar concurrencia como demanda anual. El análisis de sensibilidad variará al menos volumen de sesiones, retención, almacenamiento, transferencia, soporte y tarifa profesional en escenarios bajo, base y alto. No se afirmará ahorro, retorno ni costo-efectividad.

## 19. Productos de la validación

El programa de validación deberá producir, en sus etapas correspondientes:

1. Protocolo técnico v1 y v2.
2. Protocolo de campo v1 y v2.
3. Matriz ejecutable de escenarios, cargas e indicadores.
4. Corpus y manifiestos sintéticos.
5. Generador de carga e inyector de fallos versionados.
6. Oráculos de estado, eventos, linaje y permisos.
7. Reporte de calibración excluido del confirmatorio.
8. Reporte técnico confirmatorio.
9. Informe del piloto y enmiendas.
10. Informe de factibilidad humana.
11. Registro de desviaciones e incidentes.
12. Paquetes de reproducibilidad con hashes.
13. Informe de viabilidad económica con supuestos, cotizaciones y sensibilidad.

## 20. Pendientes antes de ejecución

- Seleccionar el instrumento del caso e incorporar su documentación oficial y autorización de uso.
- Obtener reglamento, normativa y aprobación ética aplicables.
- Confirmar institución, participantes y profesionales.
- Implementar brechas técnicas indicadas en la puerta técnica.
- Seleccionar e incorporar herramienta de carga e inyección de fallos.
- Construir telemetría, manifiestos y oráculos.
- Fijar infraestructura y modalidades.
- Ejecutar calibración y completar criterios admisibles y repeticiones; congelar las reglas de dictamen por dimensión.
- Validar instrumentos humanos por expertos.
- Firmar versiones congeladas antes de cada etapa.

## REFERENCIAS BIBLIOGRÁFICAS

Ashista, H., Comas, A. S., Selby, T., Essar, M. Y., Alawa, J., Al-Hajj, S., & Nelson, E. (2026). An offline-first electronic health record for vulnerable populations: A mixed-methods feasibility study. *PLOS Digital Health, 5*(2), e0001204. https://doi.org/10.1371/journal.pdig.0001204

Brooke, J. (1996). SUS: A “quick and dirty” usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.), *Usability evaluation in industry* (pp. 189-194). Taylor & Francis.

Clopper, C. J., & Pearson, E. S. (1934). The use of confidence or fiducial limits illustrated in the case of the binomial. *Biometrika, 26*(4), 404-413. https://doi.org/10.1093/biomet/26.4.404

Davison, A. C., & Hinkley, D. V. (1997). *Bootstrap methods and their application*. Cambridge University Press. https://doi.org/10.1017/CBO9780511802843

Geangu, E., Smith, W. A. P., Mason, H. T., Martinez-Cedillo, A. P., Hunter, D., Knight, M. I., Liang, H., del Carmen Garcia de Soria Bazan, M., Tse, Z. T. H., Rowland, T., Corpuz, D., Hunter, J., Singh, N., Vuong, Q. C., Abdelgayed, M. R. S., Mullineaux, D. R., Smith, S., & Muller, B. R. (2023). EgoActive: Integrated wireless wearable sensors for capturing infant egocentric auditory-visual statistics and autonomic nervous system function 'in the wild'. *Sensors, 23*(18), 7930. https://doi.org/10.3390/s23187930

Gierend, K., Waltemath, D., Ganslandt, T., & Siegel, F. (2023). Traceable research data sharing in a German medical data integration center with FAIR-geared provenance implementation: Proof-of-concept study. *JMIR Formative Research, 7*(1), e50027. https://doi.org/10.2196/50027

Hyndman, R. J., & Fan, Y. (1996). Sample quantiles in statistical packages. *The American Statistician, 50*(4), 361-365. https://doi.org/10.1080/00031305.1996.10473566

Kalanadhabhatta, M., Rahman, T., Grabell, A. S., & Ganesan, D. (2025). Tandem: At-home behavior assessment using multimodal signals from the parent-child dyad. *Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, 9*(4), Article 182, 1-25. https://doi.org/10.1145/3770705

Ke, J. C., Hayati Rezvan, P., Vanderbilt, D., Mirzaian, C. B., Deavenport-Saman, A., & Smith, B. A. (2024). Similar early intervention referral rates following in-person administration of the Bayley Scales of Infant and Toddler Development, 4th Edition versus telehealth administration of the Developmental Assessment of Young Children, 2nd Edition in the high-risk infant population. *Early Human Development, 190*, 105971. https://doi.org/10.1016/j.earlhumdev.2024.105971

Kim, I., Robinson, T. N., Reeves, B. B., Haber, N., & Ram, N. (2026). Software reference architecture for real-time mobile digital phenotyping: Evaluation of system designs. *JMIR Formative Research, 10*(1), e87320. https://doi.org/10.2196/87320

La Valle, C., Johnston, E., & Tager-Flusberg, H. (2022). A systematic review of the use of telehealth to facilitate a diagnosis for children with developmental concerns. *Research in Developmental Disabilities, 127*, 104269. https://doi.org/10.1016/j.ridd.2022.104269

Laigner, R., Almeida, A. C., Assunção, W. K. G., & Zhou, Y. (2026). An empirical study on challenges of event management in microservice architectures. *ACM Transactions on Software Engineering and Methodology, 35*(8), Article 245, 1-62. https://doi.org/10.1145/3776581

Medhi, K., Ahmed, N., & Hussain, M. I. (2022). Dew-based offline computing architecture for healthcare IoT. *ICT Express, 8*(3), 371-378. https://doi.org/10.1016/j.icte.2021.09.005

Mirabella, A. M., Berson, I. R., & Berson, M. J. (2025). Empowering voices: Implementing ethical practices for young children's assent in digital research. *Education Sciences, 15*(5), 571. https://doi.org/10.3390/educsci15050571

Sembay, M. J., de Macedo, D. D. J., Júnior, L. P., Braga, R. M. M., & Sarasa-Cabezuelo, A. (2023). Provenance data management in health information systems: A systematic literature review. *Journal of Personalized Medicine, 13*(6), 991. https://doi.org/10.3390/jpm13060991

Wild, C. E. K., Rawiri, N. T., Taiapa, K., & Anderson, Y. C. (2023). In safe hands: Child health data storage, linkage and consent for use. *Health Promotion International, 38*(6), daad159. https://doi.org/10.1093/heapro/daad159

Wittner, R., Mascia, C., Gallo, M., Frexia, F., Müller, H., Plass, M., Geiger, J., & Holub, P. (2022). Lightweight distributed provenance model for complex real-world environments. *Scientific Data, 9*(1), 503. https://doi.org/10.1038/s41597-022-01537-6

# Resultado confirmatorio v2

## Ejecucion valida

- Fecha UTC: `2026-09-28T14:49:34Z`.
- Commit congelado: `7802712a518f13cdaf47d05fc17a440b44e473ae`.
- Estado Git al congelar: limpio.
- Interprete: `backend/venv/bin/python`, Python `3.14.6`.
- Corpus: `dayc2-confirmatorio-sintetico-v1`.
- Celdas prescritas y observadas: 138 de 138.
- Oraculo independiente: `confirmatory_oracle.py` v1.0.0.
- Veredicto: `pass`.

El oraculo informo cero celdas invalidas, faltantes o inesperadas, ausencia de duplicados y cero diferencias entre los hashes de los artefactos sellados y los ejecutados. Los manifiestos por celda conservan comando, semilla, carga, repeticion, codigo de salida y hashes de salida estandar y error.

## Clasificacion

| Alcance | Clasificacion | Base |
|---|---|---|
| E0-E9, I01, I02-C, I07-C-I12, I17 y carga ligera E1 | Cumple | Las 138 celdas terminaron con codigo cero y el oraculo externo emitio `pass`. |
| Latencia, percentiles, recursos y tasas con umbral `TBD` | No aplicable a v2 | El protocolo v2 los excluye expresamente; no se declaran cumplidos. |
| Participantes, validez clinica e hipotesis global H1 | No aplicable a v2 | La ejecucion usa solo corpus sintetico y no autoriza esas inferencias. |

## Intento invalidado

Un intento previo, aislado en `/tmp/dayc-phase9-freeze`, genero 138 celdas invalidas porque el ejecutor invoco `/usr/bin/python3`, donde `pytest` no estaba instalado. No se reutilizaron sus resultados ni se seleccionaron celdas. La ejecucion valida se repitio completa desde un nuevo arbol de trabajo limpio con el entorno funcional `backend/venv`, sin cambios al commit congelado.

## Limitaciones

Este resultado demuestra los escenarios tecnicos cubiertos por el arnes y sus oraculos; no mide los indicadores excluidos, no sustituye pruebas con infraestructura de produccion y no constituye evidencia clinica ni con participantes.

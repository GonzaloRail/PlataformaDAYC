# Fase 9: artefactos previos a la congelacion

Este directorio contiene la especificacion versionada de la evaluacion tecnica confirmatoria. No contiene resultados ni constituye una ejecucion confirmatoria.

## Orden de uso

1. Revise y apruebe `protocolo_confirmatorio_v2.md`, `corpus_sintetico_v1.json` y `matriz_ejecucion_v2.csv`.
2. Con un arbol Git limpio, genere el sello: `python3 scripts/generate_freeze_manifest.py`.
3. No modifique codigo, configuracion, corpus, matriz, oraculo ni scripts despues del sello.
4. Inicie la confirmacion: `python3 scripts/run_confirmation.py --freeze-manifest manifest_congelacion_v2.json`.
5. Revise `resultados_confirmatorios/<run-id>/oracle_report.json` y los manifiestos por celda.

Los scripts usan exclusivamente la biblioteca estandar de Python. El ejecutor llama al arnes tecnico ya existente mediante `python -m pytest`; no instala dependencias ni inicia servicios.

Los resultados se escriben fuera de los artefactos sellados, en `resultados_confirmatorios/`. Una ejecucion con un hash distinto del sello se rechaza antes de abrir resultados.

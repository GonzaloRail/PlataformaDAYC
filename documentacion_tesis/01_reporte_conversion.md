# Reporte de conversión del corpus

## Resumen

- PDF procesados: 40
- Páginas procesadas: 757
- Caracteres extraídos: 3,089,856
- Archivos marcados para revisión: 0
- Herramienta: `pdftotext` con codificación UTF-8.
- Cada archivo conserva marcadores explícitos por página y SHA-256 del PDF fuente.

## Resultado por fuente

| ID | Páginas | Caracteres | Páginas con menos de 100 caracteres | Caracteres de reemplazo | SHA-256 abreviado | Estado |
|---|---:|---:|---|---:|---|---|
| S01 | 17 | 54,487 | - | 0 | 867a7106ecb4 | OK |
| S02 | 17 | 82,856 | - | 0 | df556edf6ea1 | OK |
| S05 | 11 | 42,769 | - | 0 | 43590310e8a2 | OK |
| S06 | 17 | 79,288 | - | 0 | d99f59acbeca | OK |
| S07 | 20 | 61,909 | - | 0 | 3c1688564425 | OK |
| S08 | 24 | 86,434 | - | 0 | 8d3e189cd44f | OK |
| S09 | 21 | 92,454 | - | 0 | c6a25a4a0f03 | OK |
| S10 | 36 | 159,453 | - | 0 | a57dccac6cf5 | OK |
| S11 | 3 | 7,674 | - | 0 | d9de61a5bda7 | OK |
| S12 | 19 | 97,718 | - | 0 | d69e7ad9ee6b | OK |
| S13 | 16 | 58,356 | - | 0 | f75517bf92da | OK |
| S14 | 46 | 99,552 | - | 0 | 324eb134e355 | OK |
| S15 | 12 | 67,628 | - | 0 | 6b3ff3154716 | OK |
| S16 | 19 | 84,032 | - | 0 | dcfbe8000b6e | OK |
| S17 | 18 | 56,006 | - | 0 | 651f8d14ce1b | OK |
| S18 | 14 | 82,161 | - | 0 | 4b05a0616a94 | OK |
| S19 | 25 | 108,379 | - | 0 | aaf402f2eef2 | OK |
| S22 | 13 | 71,116 | - | 0 | 6c3cdd943602 | OK |
| S23 | 12 | 61,842 | - | 0 | 3ca503df38de | OK |
| S24 | 5 | 27,139 | - | 0 | 2ed1ab8ad5f1 | OK |
| S25 | 5 | 28,150 | - | 0 | 3cbfd23f2a17 | OK |
| S26 | 7 | 35,007 | - | 0 | b147cabb7939 | OK |
| S27 | 9 | 51,625 | - | 0 | fc60f98ec6cf | OK |
| S28 | 19 | 70,194 | - | 0 | 028aa19de144 | OK |
| S29 | 18 | 85,177 | - | 0 | d3ebcb41447b | OK |
| S31 | 17 | 59,747 | - | 0 | 634e5da96ef7 | OK |
| S32 | 29 | 92,750 | - | 0 | f4a4f01e703f | OK |
| S33 | 8 | 43,310 | - | 0 | 94d757c796a0 | OK |
| S36 | 17 | 69,275 | - | 0 | 158f30bd3978 | OK |
| S38 | 10 | 49,141 | - | 0 | b02ba641b71c | OK |
| S39 | 19 | 78,413 | - | 0 | 702aa17fb7d6 | OK |
| S40 | 16 | 88,322 | - | 0 | 4dedfb458885 | OK |
| S41 | 62 | 243,486 | - | 0 | 161c7a9506f4 | OK |
| S42 | 38 | 119,761 | - | 0 | b004da333552 | OK |
| S43 | 8 | 32,175 | - | 0 | 331b423938ad | OK |
| S44 | 47 | 222,958 | - | 0 | df479344b540 | OK |
| S45 | 23 | 95,965 | - | 0 | b26e69584368 | OK |
| S46 | 17 | 65,959 | - | 0 | dda98531026a | OK |
| S47 | 7 | 28,108 | - | 0 | 490c151e2086 | OK |
| S48 | 16 | 49,080 | - | 0 | 7557f81f8573 | OK |

## Interpretación

- Una página con poco texto no implica un error: puede ser portada, figura o página final.
- `REVISAR` se reserva para archivos con extracción total insuficiente o problemas de codificación.
- Las fichas de la fase 3 deberán contrastar tablas y figuras relevantes directamente con el PDF.

## Estado del inventario posterior

Este reporte conserva la conversión histórica de 40 PDF y no debe utilizarse como conteo del conjunto vigente. El registro actual contiene 55 fuentes: 49 registros académicos del corpus, cinco PDF complementarios locales y la ficha oficial web de ISO/IEC 25010:2023. El PDF original de S49 no está disponible, aunque su conversión Markdown histórica y su ficha se conservan. En consecuencia, existen 53 PDF en `Articulos/`. Las seis fuentes complementarias se documentan en `07_registro_fuentes_complementarias.md`.

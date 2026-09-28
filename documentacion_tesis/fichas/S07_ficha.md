---
id: S07
title: "Facilitating Multi-Device Usage in mHealth"
year: 2013
doi: "10.22667/JOWUA.2013.06.31.077"
eje: "Arquitectura, sincronización y operación offline"
---

# S07 - Facilitating Multi-Device Usage in mHealth

## Referencia APA 7

Lomotey, R. K., & Deters, R. (2013). Facilitating multi-device usage in mHealth. *Journal of Wireless Mobile Networks, Ubiquitous Computing, and Dependable Applications, 4*(2), 77-96. https://doi.org/10.22667/JOWUA.2013.06.31.077

## Citas
- Parentética: (Lomotey & Deters, 2013)
- Narrativa: Lomotey y Deters (2013)

## Objetivo

Permitir que un profesional use varios dispositivos para acceder y actualizar historias clínicas, con acceso offline, sincronización y privacidad ante conectividad intermitente (pp. PDF 1, 7).

## Problema abordado

En una red móvil particionable no pueden garantizarse simultáneamente consistencia, disponibilidad y tolerancia a particiones; el trabajo prioriza disponibilidad offline y busca reducir la ventana de inconsistencia (pp. PDF 2-4).

## Metodología
- Diseño: Propuesta e implementación de la arquitectura distribuida mAppGP con evaluación técnica de prototipo (pp. PDF 7, 13-17).
- Contexto: Acceso móvil a datos geriátricos para profesionales vinculados a un hospital canadiense (pp. PDF 1-2, 7).
- Muestra o fuentes: Cinco tipos de dispositivos y middleware en nube privada; pruebas sintéticas de solicitudes, publicación-suscripción, cifrado y carga concurrente (pp. PDF 13-17).
- Procedimiento: Pruebas de 100 a 1000 solicitudes secuenciales, transferencias de 100 a 1000 MB, cifrado de 2 a 100 conjuntos y simulación de 1000 a 25 000 usuarios (pp. PDF 14-17).

## Arquitectura y tecnología

Tres niveles: dispositivos móviles, middleware Erlang en nube privada y HIS central, con servicios REST/JSON (pp. PDF 7-9). El cliente mantiene caché y credenciales locales; durante la desconexión guarda cambios y aplica consistencia eventual de sesión al recuperar conectividad (pp. PDF 11-12). El middleware usa publicación-suscripción, base persistente y cola actualizaciones para nodos desconectados (pp. PDF 10-11).

## Actores

Profesionales sanitarios que alternan entre sus dispositivos, middleware coordinador y servicios del HIS (pp. PDF 7-9). Publicadores crean canales y los profesionales suscritos reciben cambios, inmediatamente o tras reconectarse (pp. PDF 10-11).

## Datos y evidencias

El prototipo maneja datos demográficos, signos vitales, historia, visitas, profesionales y evolución (p. PDF 7). Las pruebas son de rendimiento tecnológico y no evalúan resultados clínicos ni uso de DAYC-2 (pp. PDF 13-17).

## Resultados principales
| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Lectura y escritura | En iPad 3, 100-1000 lecturas tomaron 93.75-482.26 ms y las escrituras 264.11-889.67 ms, con 0% de errores. | 14 |
| Publicación-suscripción | La prueba conectada tuvo 0% de errores; los fallos aparecieron sobre 600 MB en Windows Phone. | 15 |
| Cifrado | Para 97 registros de aproximadamente 47 kB, AES tomó 12.72 ms al cifrar y 102.23 ms al descifrar. | 16 |
| Escalabilidad | La simulación de 1000-25 000 usuarios informó 0% de errores y un promedio de 1035.191196 solicitudes/s. | 17 |

## Métricas e instrumentos

Tiempo solicitud-respuesta, error, tamaño transferido, almacenamiento, costo de cifrado/descifrado y throughput (pp. PDF 14-17). Un generador HTTP produjo solicitudes concurrentes con distribución exponencial de media 0.1 solicitudes/s (p. PDF 17).

## Limitaciones
| Limitación | Página PDF |
|---|---:|
| La prueba de publicación-suscripción asumió que todos los dispositivos estaban conectados; no validó entrega diferida tras una partición real. | 15 |
| Windows Phone falló en transferencias superiores a 600 MB y no soportaba la implementación AES del prototipo. | 15-16 |
| Las solicitudes de lectura se emitieron secuencialmente, no como edición concurrente del mismo registro. | 14 |
| La agregación de servicios para reducir costo de transferencia quedó como trabajo futuro. | 18 |

## Aporte a la tesis
- Capítulo 1: Ofrece fundamento histórico para explicitar el compromiso CAP en sistemas móviles de salud (pp. PDF 2-4).
- Capítulo 2: Aporta caché local, consistencia eventual por sesión, middleware pub/sub y cola para clientes desconectados (pp. PDF 10-12).
- Capítulo 3: Orienta a DAYC-2 a priorizar disponibilidad durante la evaluación y convergencia posterior, con autenticación local y eventos persistentes; requiere mecanismos modernos y validación propia (pp. PDF 11-12, 18).
- Capítulo 4: Sus vacíos justifican pruebas de entrega tras reconexión, duplicados, orden, conflictos entre actores y límites de payload (pp. PDF 15-16).

## Evidencia textual verificable
| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
| Fundamentar CAP | Paráfrasis: con tolerancia a particiones, el diseño elige disponibilidad offline y acepta inconsistencia temporal. | 4 |
| Diseñar reconexión | Paráfrasis: el middleware conserva actualizaciones y las empuja al dispositivo cuando vuelve a conectarse. | 11 |
| Diseñar almacenamiento local | Paráfrasis: durante la desconexión, los datos creados o modificados permanecen almacenados en el móvil. | 11-12 |
| Delimitar experimento | Paráfrasis: en la prueba pub/sub se asumió que todos los dispositivos estaban conectados. | 15 |

## Precauciones de uso

Es una fuente de 2013 y debe usarse como fundamento, no como antecedente reciente. Tecnologías, dispositivos y mecanismos criptográficos son históricos. Los resultados conectados y sintéticos no validan resolución de conflictos ni tolerancia a particiones en producción (pp. PDF 13-18).

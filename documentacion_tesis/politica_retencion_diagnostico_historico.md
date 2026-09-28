# Retención de registros diagnósticos históricos

El módulo `api.diagnostico` no está en `INSTALLED_APPS` y sus rutas no se publican. Sus registros históricos no se usan para evaluación, reporte ni investigación de DAYC-2.

Antes de eliminar cualquier despliegue histórico, el custodio debe:

1. Identificar las tablas y exportar solo el inventario de campos, recuentos, versión del esquema y hash de la copia cifrada.
2. Obtener autorización institucional para conservar, anonimizar o destruir cada categoría de dato.
3. Ejecutar una migración separada y revisada que elimine identificadores y payloads diagnósticos, manteniendo únicamente el certificado de eliminación o la referencia de retención autorizada.
4. Verificar que no quedan rutas, tareas, copias ni respaldos restaurables que expongan el contenido retirado.
5. Registrar responsable, fecha, motivo, destino y hash del acta de eliminación en el inventario de retención.

No se ejecuta una migración destructiva desde este repositorio porque no contiene ni debe contener datos diagnósticos históricos.

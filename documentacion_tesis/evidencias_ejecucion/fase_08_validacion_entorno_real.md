# Validación de entorno real de Fase 8

## Ejecución técnica

- Playwright: Chromium instalado y `npm run test:e2e` correcto. La prueba verificó la pantalla de acceso profesional.
- Locust: cinco usuarios durante diez segundos contra `GET /api/auth/csrf/`; 478 solicitudes, 0 fallos, p95 de 3 ms.
- Toxiproxy: una consulta PostgreSQL por el proxy local respondió `SELECT 1`; al deshabilitar el proxy falló con cierre de conexión y, al reactivarlo, volvió a responder correctamente.
- Arnes técnico: ejecuciones para 1, 10, 25, 50 y 100 sesiones, con manifiestos en `/tmp/dayc-phase8-results/phase8-20260927-{1,10,25,50,100}.json`.

Los servicios de PostgreSQL, Redis y Toxiproxy se ejecutaron con Docker Compose y se limitaron a loopback. Los resultados corresponden al entorno local y a datos sintéticos; no prueban capacidad productiva ni autorizan estudios con participantes.

## Pendientes externos

La aprobación ética, la auditoría institucional de evidencias y la emisión/configuración de certificado HTTPS requieren responsables, infraestructura y documentación ajenos al repositorio. Las guías `protocolo_puerta_etica_participantes.md` y `backend/DEPLOYMENT_PILOT.md` dejan preparado el procedimiento, sin declarar esos requisitos cumplidos.

# Guía de Despliegue del Piloto Técnico DAYC-2

## Propósito y alcance

Esta guía despliega un **piloto técnico con datos sintéticos**. Sirve para comprobar disponibilidad, WebSocket, cola offline, PostgreSQL, Redis, backups, carga y recuperación. No habilita recopilación de información de participantes ni conclusiones clínicas.

## Recomendación de alojamiento

Para la primera versión se recomienda un VPS Linux administrado por el equipo, por ejemplo DigitalOcean, Hetzner, Linode o una máquina virtual institucional.

| Recurso | Recomendación inicial | Motivo |
|---|---:|---|
| Sistema operativo | Ubuntu 24.04 LTS | Soporte amplio para Docker, Caddy y PostgreSQL. |
| CPU | 2 vCPU | Suficiente para el piloto técnico y workers ligeros. |
| Memoria | 4 GB RAM | Django, Redis, PostgreSQL y proxy en una sola máquina. |
| Disco | 80 GB SSD cifrado | Base de datos, evidencias sintéticas y copias de seguridad. |
| Dominio | `piloto.tu-dominio.pe` | Necesario para HTTPS y WebSocket seguro. |

No se recomienda Vercel, Netlify o una función serverless como alojamiento único del backend: Django Channels mantiene conexiones WebSocket, el sistema usa Redis y conserva evidencias privadas. El frontend estático sí puede vivir en un CDN después, pero para el primer piloto un único VPS reduce complejidad.

## Arquitectura objetivo

```text
Navegador
  | HTTPS / WSS
  v
Caddy (TLS automático, redirección HTTP -> HTTPS)
  |-- /             -> archivos estáticos de Vite
  |-- /api/         -> Daphne/Django ASGI
  `-- /ws/          -> Daphne/Django Channels

Django <-> PostgreSQL (estado canónico)
Django <-> Redis (canal WebSocket, nunca fuente de verdad)
Django <-> private_evidence (volumen privado, no servido directamente)
Worker programado -> publish_outbox
```

PostgreSQL, Redis, Daphne y el directorio de evidencias deben estar en una red Docker privada. Solo Caddy publica los puertos 80 y 443. El panel de Toxiproxy debe limitarse a `127.0.0.1` y usarse solo para pruebas técnicas.

## 1. Preparar el servidor

1. Cree un VPS nuevo y asigne una IP pública fija.
2. Cree un registro DNS `A` para `piloto.tu-dominio.pe` apuntando a esa IP.
3. Permita únicamente SSH, HTTP y HTTPS en el firewall.
4. Instale Docker Engine y Docker Compose Plugin.
5. Cree un usuario de despliegue sin acceso root directo y use claves SSH, no contraseñas.
6. Clone el repositorio en `/opt/dayc` y restrinja permisos: `chmod 750 /opt/dayc`.

Ejemplo de firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

No publique los puertos 5432, 5434, 6379, 8000, 8474 ni 8666 al exterior.

## 2. Secretos y variables

Copie `backend/.env.pilot.example` a un archivo fuera del repositorio, por ejemplo `/etc/dayc/pilot.env`, con permisos `600`.

```bash
sudo install -d -m 700 /etc/dayc
sudo cp backend/.env.pilot.example /etc/dayc/pilot.env
sudo chmod 600 /etc/dayc/pilot.env
```

Cambie al menos estos valores:

```dotenv
DEBUG=False
SECRET_KEY=<cadena aleatoria larga>
ALLOWED_HOSTS=piloto.tu-dominio.pe
CORS_ALLOWED_ORIGINS=https://piloto.tu-dominio.pe
CSRF_TRUSTED_ORIGINS=https://piloto.tu-dominio.pe
BEHIND_HTTPS_PROXY=True
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
POSTGRES_PASSWORD=<contraseña aleatoria única>
```

Genere secretos sin guardarlos en el historial del shell:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(64))"
```

Nunca suba `pilot.env`, respaldos de base de datos ni evidencia a Git.

## 3. Construir frontend y backend ASGI

En cada versión a desplegar, use un commit Git identificable:

```bash
git fetch --tags
git checkout <commit-o-tag-aprobado>
cd frontend
npm ci
VITE_API_URL=https://piloto.tu-dominio.pe npm run build
```

El backend debe ejecutarse mediante ASGI, no con `manage.py runserver`:

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
set -a
source /etc/dayc/pilot.env
set +a
python manage.py migrate
python manage.py check --deploy
daphne -b 127.0.0.1 -p 8000 src.dayc2.asgi:application
```

En producción convierta estos procesos en servicios `systemd` o contenedores Docker con reinicio automático. Deben existir dos procesos distintos:

- **ASGI web:** Daphne para API y WebSocket.
- **Publicador outbox:** `python manage.py publish_outbox`, ejecutado de forma continua o cada minuto por un timer de `systemd`.

El worker debe volver a ejecutar eventos pendientes después de un reinicio; no sustituya PostgreSQL por Redis.

## 4. Proxy HTTPS recomendado: Caddy

Caddy simplifica el certificado Let's Encrypt y maneja WebSocket sin configuración especial. Instálelo en el host o ejecútelo como el único contenedor con puertos públicos.

Archivo `/etc/caddy/Caddyfile`:

```caddy
piloto.tu-dominio.pe {
    encode zstd gzip

    handle /api/* {
        reverse_proxy 127.0.0.1:8000
    }

    handle /ws/* {
        reverse_proxy 127.0.0.1:8000
    }

    root * /opt/dayc/frontend/dist
    try_files {path} /index.html
    file_server
}
```

Después de que DNS resuelva públicamente:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
curl -I https://piloto.tu-dominio.pe
```

La cabecera `X-Forwarded-Proto` debe ser creada por Caddy, no aceptada directamente de Internet. Django ya activa `SECURE_PROXY_SSL_HEADER` solo al definir `BEHIND_HTTPS_PROXY=True`.

## 5. Base de datos, Redis y evidencia privada

1. Mantenga PostgreSQL y Redis dentro de Docker, sin puertos públicos.
2. Configure `PRIVATE_EVIDENCE_ROOT` como volumen persistente fuera de la carpeta servida por Caddy.
3. Aplique migraciones antes de reiniciar Daphne.
4. Compruebe que `docker compose -f backend/docker-compose.yml config --quiet` termina correctamente.
5. Ejecute `python manage.py publish_outbox` tras cada despliegue para recuperar eventos pendientes.

No sirva `private_evidence` mediante Nginx, Caddy ni `/media/`; las descargas pasan por el endpoint autorizado de Django.

## 6. Copias de seguridad y restauración

Programe diariamente una copia cifrada de PostgreSQL y una copia de `PRIVATE_EVIDENCE_ROOT`. Conserve al menos 14 copias diarias y una copia fuera del VPS.

```bash
docker exec prototipo_dayc_db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > /srv/dayc-backups/db-$(date +%F).sql.gz
cd backend
venv/bin/python manage.py backup_evidence --target /srv/dayc-backups/evidence-$(date +%F)
```

Pruebe una restauración en una máquina aislada al menos una vez al mes. Un backup que no se restaura no es evidencia de recuperación.

## 7. Verificación previa al piloto técnico

Ejecute esta lista tras desplegar y antes de abrir el entorno al equipo técnico:

```bash
cd backend
source venv/bin/activate
python manage.py check --deploy
python -m pytest
python -m black --check .
python -m flake8

cd ../frontend
npm run lint
npm run build
npm run test -- --run
npm run test:e2e
```

Luego ejecute las pruebas sintéticas de carga y fallo:

```bash
cd backend
docker compose up -d
venv/bin/locust -f tests/technical/locustfile.py --host https://piloto.tu-dominio.pe --headless -u 5 -r 5 -t 10s
venv/bin/python scripts/run_technical_harness.py --sessions 1 --result-dir /srv/dayc-results
venv/bin/python scripts/run_technical_harness.py --sessions 10 --result-dir /srv/dayc-results
venv/bin/python scripts/run_technical_harness.py --sessions 25 --result-dir /srv/dayc-results
venv/bin/python scripts/run_technical_harness.py --sessions 50 --result-dir /srv/dayc-results
venv/bin/python scripts/run_technical_harness.py --sessions 100 --result-dir /srv/dayc-results
```

Conserve comandos, commit, salida y manifiestos junto con la fecha de ejecución. No reutilice resultados de un commit distinto.

## 8. Monitoreo mínimo

Registre y revise diariamente:

- Disponibilidad de `GET /api/auth/csrf/` y conexión WebSocket.
- Espacio de disco, memoria y uso de CPU.
- Tamaño y antigüedad de la tabla outbox; los eventos pendientes no deben crecer indefinidamente.
- Errores de Daphne, Django, PostgreSQL y Redis.
- Estado de backups y resultado de la última restauración de prueba.
- Certificado TLS próximo a vencer.

Configure alertas para disco mayor de 80 %, proceso ASGI detenido, errores 5xx sostenidos, Redis no disponible y backups fallidos.

## 9. Actualización y reversión

Para una actualización, primero ejecute pruebas en local, congele el commit y haga backup. Después:

```bash
cd /opt/dayc
git fetch --tags
git checkout <nuevo-commit>
# construir frontend, instalar dependencias y migrar
sudo systemctl restart dayc-asgi
sudo systemctl restart dayc-outbox
sudo systemctl reload caddy
```

Si falla la verificación posterior, vuelva al commit anterior, restaure solo si una migración o dato lo exige y reinicie los servicios. Nunca use `git reset --hard` sobre un servidor con evidencia o resultados sin respaldo.

## 10. Qué sigue después del piloto técnico

El siguiente hito técnico es mantener el piloto con datos sintéticos y repetir los indicadores tras cada cambio relevante. Las pruebas con participantes, validación clínica y estudios de experiencia se programan después, como una etapa separada y no como requisito para este despliegue técnico.

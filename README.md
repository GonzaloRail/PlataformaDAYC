# DAYC-2

Plataforma web para apoyar la administración, seguimiento y revisión profesional de evaluaciones del desarrollo infantil basadas en DAYC-2. El sistema separa la experiencia de niño/adulto de la consola del profesional y conserva el estado, las evidencias y la trazabilidad de cada evaluación.

> Este proyecto es una herramienta de apoyo al proceso de evaluación. Los resultados deben ser interpretados y validados por un profesional competente; no sustituyen el juicio clínico ni un diagnóstico.

## Capacidades

- Registro y gestión de niños evaluados.
- Inicio de sesiones mediante código para niño y adulto acompañante.
- Administración progresiva de ítems por área y edad en meses.
- Actividades digitales, instrucciones guiadas y captura de respuestas.
- Carga de evidencias y registro de datos de ejecución.
- Validación automática cuando la política del ítem lo permite y derivación a revisión profesional cuando corresponde.
- Panel para psicólogos: evaluaciones, revisión de ítems, historial, cierre y reapertura controlada.
- Cálculo y visualización de resultados, comparación de resultados y exportación de informes PDF.
- Métricas de investigación y visualización de linaje/trazabilidad.
- Actualización de progreso en tiempo real mediante WebSocket.

## Arquitectura

El repositorio es un monorepo con dos aplicaciones:

| Componente | Tecnologías | Responsabilidad |
| --- | --- | --- |
| `frontend/` | React 18, TypeScript, Vite, Tailwind CSS, Zustand | Interfaz para niño, adulto y psicólogo. |
| `backend/` | Django 5, Django REST Framework, Django Channels, PostgreSQL | API, autenticación, persistencia, reglas del flujo y reportes. |
| Infraestructura local | PostgreSQL 16, Redis 7, Docker Compose | Base de datos, mensajería y desarrollo local. |

El frontend usa una API HTTP con cookies de sesión y protección CSRF. Las actualizaciones de progreso de una evaluación se publican por WebSocket. El backend organiza sus módulos por dominio, aplicación, infraestructura y API.

### Flujo de una evaluación

1. El profesional registra o selecciona al niño y crea una evaluación.
2. Se habilitan accesos de sesión para el niño y el adulto acompañante.
3. El sistema selecciona el ítem inicial según el área y la edad del niño.
4. Niño y adulto completan las actividades, respuestas y evidencias requeridas.
5. Cada ítem se valida automáticamente o queda pendiente de revisión profesional según su configuración, resultado y confianza.
6. La evaluación finaliza en estado pendiente de revisión.
7. El profesional revisa, valida, corrige y cierra la evaluación; posteriormente puede generar el informe.

La progresión puede finalizar un área tras tres resultados fallidos consecutivos. Los resultados admitidos por ítem son `PASS`, `FAIL`, `INCONCLUSIVE` y `NOT_ADMINISTERED`.

## Requisitos

- Git
- Docker y Docker Compose
- Python 3.11 o superior
- Node.js LTS y npm
- Dependencias de sistema requeridas por WeasyPrint para generar PDF

En Debian/Ubuntu, consulte la documentación de WeasyPrint si la generación de PDF informa que faltan bibliotecas del sistema.

## Inicio rápido

### 1. Configurar el backend

```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env` y reemplace, como mínimo, `SECRET_KEY` y `POSTGRES_PASSWORD` por valores seguros.

### 2. Iniciar servicios de infraestructura

```bash
docker compose -f backend/docker-compose.yml up -d
```

PostgreSQL queda expuesto solamente en `127.0.0.1:5434` y Redis en `127.0.0.1:6379`.

### 3. Instalar y ejecutar el backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

La API estará disponible en `http://localhost:8000`.

### 4. Instalar y ejecutar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

El frontend usa `VITE_API_URL` cuando está definida; si no lo está, se conecta a `http://localhost:8000`.

## Configuración

El archivo de ejemplo `backend/.env.example` contiene la configuración local necesaria:

```dotenv
SECRET_KEY=replace-with-a-long-random-secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=prototipo_dayc
POSTGRES_USER=dayc2_user
POSTGRES_PASSWORD=replace-with-a-strong-password
POSTGRES_HOST=localhost
POSTGRES_PORT=5434
REDIS_URL=redis://127.0.0.1:6379/0
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

No versionar archivos `.env`, datos de producción, evidencias clínicas ni secretos.

## Rutas principales

| Ruta | Acceso | Descripción |
| --- | --- | --- |
| `/login` | Público | Inicio de sesión del profesional. |
| `/child/entry` | Público | Ingreso a una sesión infantil mediante código. |
| `/child/evaluation/:sessionCode` | Público | Experiencia de evaluación para el niño. |
| `/adult/session/:sessionCode` | Público | Sesión del adulto acompañante. |
| `/psychologist` | Protegido | Panel principal del profesional. |
| `/psychologist/evaluations/:evaluacionId/review` | Protegido | Revisión profesional de una evaluación. |
| `/psychologist/minijuegos` | Protegido | Prueba de actividades digitales. |
| `/psychologist/session-access` | Protegido | Gestión de accesos de sesión. |
| `/psychologist/calculo-resultados` | Protegido | Cálculo de resultados. |
| `/psychologist/lineage` | Protegido | Consulta de trazabilidad. |
| `/research/metrics` | Protegido | Panel de métricas. |

Los módulos de la API se agrupan bajo `/api/auth/`, `/api/children/`, `/api/evaluaciones/`, `/api/diagnostico/`, `/api/metricas/` y `/api/reportes/`.

## Comandos de desarrollo

### Frontend

```bash
cd frontend
npm run dev       # Servidor de desarrollo
npm run lint      # ESLint
npm run build     # TypeScript y build de producción
npm run test      # Vitest
npm run test:e2e  # Playwright
```

### Backend

```bash
cd backend
source venv/bin/activate
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python -m black .
python -m flake8
python -m pytest
```

## Verificación completa

Antes de integrar cambios, ejecute:

```bash
cd frontend && npm run lint && npm run build
cd backend && source venv/bin/activate && python -m black --check . && python -m flake8 && python -m pytest
```

## Estructura del repositorio

```text
.
├── backend/
│   ├── src/
│   │   ├── api/                 # Endpoints, modelos, serializers y consumidores
│   │   ├── application/         # Servicios y reglas de flujo
│   │   ├── domain/              # Conceptos de dominio
│   │   ├── infrastructure/      # Adaptadores e integración técnica
│   │   └── dayc2/               # Configuración Django/ASGI
│   ├── tests/                   # Pruebas unitarias e integración
│   ├── docker-compose.yml
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes y minijuegos
│   │   ├── pages/               # Vistas por rol
│   │   ├── services/            # Cliente API y servicios
│   │   ├── store/               # Estado global con Zustand
│   │   └── types/               # Tipos TypeScript
│   └── tests/                   # Pruebas Vitest y Playwright
├── documentacion_tesis/         # Evidencias y artefactos de investigación
└── start.sh                     # Lanzador local para entornos GNOME
```

## Documentación y evidencias

- `documentacion_tesis/` conserva las evidencias y artefactos asociados al trabajo de tesis.
- `documentacion_tesis/evidencias_ejecucion/fase_09/` contiene el protocolo y los scripts para la evaluación técnica confirmatoria.
- Los datos del instrumento y las actividades digitales se mantienen como recursos del proyecto y no deben modificarse sin validar el impacto sobre el flujo de evaluación.

## Seguridad y datos sensibles

- La autenticación del profesional se realiza mediante cookies de sesión.
- Las solicitudes que modifican datos requieren token CSRF.
- Las rutas del área profesional están protegidas en el cliente y el servidor debe mantener la autorización como fuente de verdad.
- Las evidencias, resultados y datos de niños son información sensible: use datos anonimizados en desarrollo y no publique bases de datos ni archivos de evidencias.

## Estado de las pruebas

El repositorio incluye pruebas unitarias para el backend y pruebas unitarias y end-to-end para el frontend. La validación local recomendada está descrita en la sección [Verificación completa](#verificacion-completa).

## Licencia

No se ha definido una licencia para este repositorio. No reutilice ni distribuya el código, el catálogo del instrumento o los datos asociados sin autorización expresa de sus autores y titulares.

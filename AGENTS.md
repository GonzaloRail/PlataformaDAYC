# DAYC-2 repo guide

## Project structure

Monorepo with two apps:
- `backend/` — Django 5 + DRF + Channels, DDD-style layering (domain/application/infrastructure/api)
- `frontend/` — React 18 + Vite 5 + TypeScript + Tailwind + Zustand

Domain data: `preguntas_dayc.json` (full DAYC-2 question bank), `greendino.json` (Lottie animation).

## Quick start

```bash
# PostgreSQL (port 5433, not 5432)
docker compose -f backend/docker-compose.yml up -d

# Backend
cd backend && source venv/bin/activate && python manage.py migrate && python manage.py runserver

# Frontend (separate terminal)
cd frontend && npm run dev
```

`start.sh` does both in gnome-terminal tabs.

## Key commands

### Backend (`backend/`, venv at `backend/venv/`)
| Command | What |
|---|---|
| `python manage.py runserver` | Dev server on :8000 |
| `python manage.py makemigrations && python manage.py migrate` | DB schema |
| `pytest` or `pytest tests/unit/` | Tests (uses `conftest.py` that adds `src/` to `sys.path`) |
| `black .` | Format |
| `flake8` | Lint |

Django settings module: `src.dayc2.settings`.

### Frontend (`frontend/`)
| Command | What |
|---|---|
| `npm run dev` | Vite dev on :5173, proxies `/api` → `localhost:8000` |
| `npm run build` | `tsc && vite build` (typecheck + build) |
| `npm run lint` | `eslint --ext ts,tsx --max-warnings 0` |
| `npm run test` | vitest |
| `npm run preview` | Vite preview |

### Order of verification
```bash
cd frontend && npm run lint && npm run build
cd backend && source venv/bin/activate && black --check . && flake8 && pytest
```

## Architecture notes

- **API base** (`frontend/src/services/api.ts`): custom fetch wrapper with 30s timeout, `credentials: 'include'`. Reads `VITE_API_URL` env var, falls back to `http://localhost:8000`.
- **State** (`frontend/src/store/`): Zustand with slice pattern — `authStore`, `childrenStore`, `evaluacionesStore`, `uiStore`. Single store created in `src/store/index.ts`.
- **Auth**: session-cookie based with `CsrfExemptSessionAuthentication`. All `/psychologist/*` routes behind `<ProtectedRoute>`.
- **API routes** (backend): `api/auth/`, `api/children/`, `api/evaluaciones/`, `api/diagnostico/`, `api/metricas/`, `api/reportes/`
- **React Router** (`App.tsx`): `/login`, `/child/entry`, `/child/evaluation/:sessionCode`, `/adult/session/:sessionCode`, `/psychologist/*` (ProtectedRoute + PsychologistLayout), `/research/metrics`
- **Frontend path alias**: `@/*` → `src/*` (tsconfig paths)
- **PDF generation**: WeasyPrint (`backend/requirements.txt`)
- **WebSocket**: Django Channels with InMemoryChannelLayer (dev only)
- **Logging**: JSON-format logging configured in settings.py

## Testing quirks

- Backend `conftest.py` inserts `backend/src` into `sys.path` so test imports use `dayc2.settings` (not `src.dayc2.settings`).
- Backend integration tests directory exists but is empty — only unit tests have content.
- Frontend: vitest (check `vitest.config` if it exists; tests in `frontend/tests/unit/` and `frontend/tests/e2e/`).
- If adding backend tests, place in `backend/tests/unit/` and import Django models normally (conftest handles setup).

## Conventions

- **Spanish** throughout: model names (Niño, Evaluación), API responses, UI text, commit messages.
- **TypeScript**: `strict: true`, `noUnusedLocals`, `noUnusedParameters`. ESLint warns on `no-console`, `@typescript-eslint/no-explicit-any`.
- **React**: `react-jsx` runtime (no `import React` needed), hooks exhaustive-deps warn.
- **Backend lint**: flake8 + black. No pre-commit hooks detected.
- **No generated code**, no codegen step, no CI workflows.

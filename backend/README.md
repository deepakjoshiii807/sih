# SkillBridge / AIIA Platform — Django REST Backend

Production-grade **Django 4.2 + Django REST Framework** backend for the
Academia–Industry Collaboration Platform (Ministry of Ayush / AIIA) with the
four profiles that the React frontend (`/student`, `/industry`,
`/academician`, `/institution-admin`) renders:

| Role | Login email (seed) | Dashboard endpoint |
|---|---|---|
| Student | `aarav.sharma@demo.aiia.local` | `GET /api/student/dashboard` |
| Industry | `research@demo.aiia.local` | `GET /api/industry/dashboard` |
| Academician | `priya.mehta@demo.aiia.local` | `GET /api/academician/dashboard` |
| Institution Admin | `admin@demo.aiia.local` | `GET /api/institution/dashboard` |

Password for every demo account: `DemoPass@123` (override with `DEMO_PASSWORD`).

---

## Quick start (local / any Python 3.10+ host)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate           # create tables (SQLite by default)
python manage.py seed_demo         # idempotent demo data for all four roles
python manage.py runserver         # http://127.0.0.1:8000
```

Sanity checks:

```bash
python manage.py check
python manage.py makemigrations --check --dry-run   # no model drift
python manage.py test apps.api                      # 14 smoke tests
```

Production posture: set `SECRET_KEY`, `DEBUG=False`, `DJANGO_ALLOWED_HOSTS`,
`CORS_ALLOW_ALL_ORIGINS=False` + `CORS_ALLOWED_ORIGINS`, and point
`DATABASE_URL` at Postgres. The app refuses to boot with `DEBUG=False` and a
default `SECRET_KEY`. Serves via gunicorn; static files are handled by
WhiteNoise.

## Run with Docker (Postgres included)

```bash
cd backend
SECRET_KEY=$(openssl rand -hex 32) docker compose up --build
```

`env.example` lists every variable — export them from your shell, or save the
file as `.env` next to `docker-compose.yml` (Compose auto-loads `.env`).

The `web` service waits for Postgres, runs migrations, seeds demo data
(`SEED_DEMO=1` by default; set `SEED_DEMO=0` for a clean DB), collects static
files and starts gunicorn on `http://localhost:8000`. Both services expose
healthchecks wired through `/api/health`.

Useful compose overrides:

| Var | Default | Notes |
|---|---|---|
| `SEED_DEMO` | `1` | set `0` to skip demo data on boot |
| `DEMO_PASSWORD` | `DemoPass@123` | seed logins password |
| `WEB_CONCURRENCY` / `WEB_THREADS` | `2` / `2` | gunicorn sizing |
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` | `skillbridge` | db credentials |
| `CORS_ALLOW_ALL_ORIGINS` | `True` | flip off + set `CORS_ALLOWED_ORIGINS` for prod |

## Deploy checklist (VM / K8s / PaaS)

1. `DEBUG=False` and a strong `SECRET_KEY` (boot fails otherwise).
2. Point `DATABASE_URL` at managed Postgres; run `migrate` as a release step
   (`docker compose run --rm web python manage.py migrate`).
3. `DJANGO_ALLOWED_HOSTS` = your real domain(s);
   `DJANGO_CSRF_TRUSTED_ORIGINS` = `https://your-domain` (needed for admin +
   browsable API over HTTPS).
4. Terminate TLS at a proxy and set `SECURE_SSL_REDIRECT=True` to enable
   secure cookies; `CORS_ALLOW_ALL_ORIGINS=False` + explicit origins.
5. Run with `WEB_CONCURRENCY` ≈ (2 × CPU) + 1 behind the proxy;
   healthcheck = `GET /api/health`.
6. CI (`.github/workflows/django.yml`) runs `check`, migration drift,
   migrations, seed and the API suite against a Postgres service on every
   `backend/**` push — keep it green before merging.

---

## Architecture

```
backend/
├── config/            project settings, root URLconf, ASGI/WSGI
├── apps/
│   ├── accounts/      User (email+JWT, no username) + 4 role profiles,
│   │                  register/login/me endpoints, role permissions,
│   │                  management command seed_demo
│   ├── catalog/       shared reference data: Institution, Department,
│   │                  Skill taxonomy, TargetRole frameworks, LearningResource
│   ├── credentials/   student Skill Passport: EvidenceItem, SkillClaim,
│   │                  VerificationRequest, ProjectRecommendation/Submission,
│   │                  services.py (readiness, gaps, simulator, matching)
│   ├── marketplace/   industry ⇄ student: Opportunity, OpportunitySkill,
│   │                  Application (pipeline stages), Rating
│   ├── governance/    institution + academician intelligence: Placement,
│   │                  AnomalyFlag, InstitutionalReport, CurriculumReport,
│   │                  DepartmentSkillMetric, DemandTrend, AcademicianOpportunity
│   └── api/           REST views + camelCase "presenters" that emit the exact
│                      JSON contract declared in src/lib/*-api.ts
└── requirements.txt
```

Design rules baked in:

- **One user, one role.** Role profiles are one-to-one with `User`; every
  endpoint is guarded by a role permission (`IsStudent`, `IsIndustry`,
  `IsAcademician`, `IsInstitutionAdmin`) → wrong-role callers get `403`.
- **Evidence-backed skills.** A `SkillClaim` is `evidence` or `self-declared`;
  only evidence-backed claims with a `verified` `EvidenceItem` count as
  verified. Academician approval of a `VerificationRequest` flips the linked
  evidence to verified — nothing is silently trusted.
- **Explainable scores.** `credentials/services.py` derives readiness,
  skill gaps, the gap simulator, and opportunity match % deterministically
  from DB rows (no opaque magic numbers), so the UI's "why" text is truthful.
- **Dashboards are projections, not tables.** Each role dashboard is composed
  live by `apps/api/presenters_*.py` from relational rows — placements,
  trends, department comparisons and KPIs stay consistent with the data.
- **Aggregated, anonymised.** Department reports and metrics expose counts and
  percentages only, never individual student records.

---

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `SECRET_KEY` | dev-only key | Django signing key — change in prod |
| `DEBUG` | `True` | dev mode |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | comma-separated hosts |
| `DATABASE_URL` | *(empty → SQLite)* | Postgres URL when set |
| `CORS_ALLOW_ALL_ORIGINS` | `True` | dev convenience |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | used when allow-all is off |
| `DEMO_PASSWORD` | `DemoPass@123` | password for seeded demo logins |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | *(empty)* | comma-separated HTTPS origins for admin/browsable API |
| `SECURE_SSL_REDIRECT` | `False` | `True` behind a TLS proxy → HTTPS redirect + secure cookies |

No `.env` loader is bundled on purpose — export these in your shell/CI/container
or add a loader (`django-environ`) if you prefer a `.env` file.

---

## API map

All endpoints are JWT-protected (`Authorization: Bearer <access>`) except
auth/register and the read-only catalog + demo-accounts lists.

**Auth**
- `POST /api/auth/register` — `{email, password, role, name, ...profile}` → tokens
- `POST /api/auth/token` — `{email, password}` → `{access, refresh}`
- `POST /api/auth/token/refresh`, `POST /api/auth/token/verify`
- `GET /api/auth/me` — current user + role
- `GET /api/auth/demo-accounts` — seeded demo logins (dev)
- `PATCH /api/settings` — role-aware profile/settings persistence

**Catalog (public)** — `GET /api/catalog/skills`, `/roles`, `/institutions`,
`/departments`, `/resources`

**Student** — dashboard, profile GET/PATCH, apply, submit project,
upload evidence, add self-declared skill

**Industry** — dashboard, profile GET/PATCH, opportunities CRUD,
application actions (`shortlist|interview|offer|reject`), ratings

**Academician** — dashboard, profile, verification decisions
(`approved|flagged|changes-requested`), project decisions
(`verified|needs revision`), opportunity browse/post

**Institution admin** — dashboard, profile, anomaly review
(`resolve|escalate`), report generation

**Ops** — `GET /api/health` (public, checks DB connectivity)

Dashboard payloads are camelCase and mirror `src/lib/student-api.ts`,
`industry-api.ts`, `faculty-api.ts` and `institution-api.ts` key-for-key, so
the React app consumes them with **zero reshaping**.

---

## Connecting the React app

The four frontend data layers (`src/lib/*-api.ts`) are mock modules today —
each function already documents the REST call it replaces. To go live:

1. Run this backend somewhere reachable (or deploy it), e.g. `http://localhost:8000`.
2. In `src/lib/*-api.ts`, swap each mock body for an authenticated `fetch`/
   axios call to the mapped endpoint (keep the TS return types unchanged).
3. Store the access token after `POST /api/auth/token` and send it as the
   `Authorization` header; refresh on `401`.
4. CORS is already wide open for `http://localhost:5173`.

> **Running inside Freebuff:** the hosted preview only executes the Vite frontend
> and its Convex backend — Python/Django processes are not started here. The
> live preview keeps using the mock/convex data until the frontend layers are
> pointed at a running instance of this API (locally or deployed).

---

## Seed data

`manage.py seed_demo` is idempotent and rebuildable with `--force`. It creates
the AIIA institution + 6 departments, 16-skill taxonomy, the "Clinical Research
Intern" role framework, ~34 students with realistic skill passports, 5
opportunities, 6 applications across pipeline stages, 8 placement records,
ratings, demand trends, department skill-intelligence metrics, a curriculum
report, anomaly queue, institutional reports, and academician opportunities —
enough to populate every panel in all four dashboards.

# Lead2Learn · AIIA Academia–Industry Platform — How It Works

A plain-language technical explanation of the system: what was built, how the
frontend and backend talk to each other, and how to run the whole thing.

---

## 1. What the product is

An **Academia–Industry Collaboration Platform** for AYUSH education, built around
**four roles**, each with its own dashboard and workflows:

| Role | Route | What they do |
|---|---|---|
| Student | `/student` | Skill Passport (verified vs self-declared skills), skill-gap analysis vs a target role, readiness score, simulator, recommended projects, opportunities, applications |
| Industry | `/industry` | Company profile, post opportunities with skill requirements, review candidate applications + verified evidence, pipeline actions (shortlist → interview → offer → reject) |
| Academician | `/academician` (alias `/faculty`) | Department skill intelligence (industry demand vs curriculum coverage), demand trends, curriculum feedback report, verification queue, curriculum loop |
| Institution Admin | `/institution-admin` | KPIs, placements, department comparison, anomaly/fraud review, institutional reports, analytics |

The four dashboards share one data model, so a student's verified skills feed the
industry hiring view, which feeds the academician's skill-gap view, which feeds
the institution's reports — one ecosystem, not four separate apps.

---

## 2. System architecture

```
┌─────────────────────────── FRONTEND (React + Vite + TypeScript) ───────────────────────────┐
│                                                                                            │
│  Browser ──> /login ──> Django JWT (email + password) ──> role dashboard route (guarded)   │
│                                                                                            │
│  src/lib/*-api.ts   (axios HTTP clients — one per role)                                    │
│     student-api.ts · faculty-api.ts · industry-api.ts · institution-api.ts                 │
│     api-client.ts   (attaches JWT, auto-refresh on 401, base URL from VITE_API_URL)        │
│                                                                                            │
│  Dashboard pages read data through a LiveDashboard wrapper:                                 │
│     fetch GET /api/<role>/dashboard → hydrate page data → render → subscribe to changes    │
└──────────────────────────────────────────────────┬──────────────────────────────────────────┘
                                                    │  HTTPS / JSON (REST) with Bearer JWT
┌──────────────────────────────────────────────────▼──────────────────────────────────────────┐
│                              BACKEND (Django + Django REST Framework)                       │
│                                                                                             │
│  apps/accounts    users with role (student/industry/academician/institution_admin), JWT    │
│  apps/catalog     skills taxonomy, institutions, departments, target roles, resources       │
│  apps/credentials skill passport: evidence, skill claims, verification, projects, readiness │
│  apps/marketplace opportunities, applications, hiring actions, ratings                      │
│  apps/governance  placements, anomalies, reports, demand/coverage analytics                 │
│  apps/api         REST views + presenters that shape JSON exactly like the frontend types   │
│                                                                                             │
│  Database: PostgreSQL in production (docker-compose), SQLite for quick local dev            │
│  Seed:      python manage.py seed_demo  → realistic AIIA data + 4 demo logins               │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

**One rule drives the whole design:** the frontend defines typed contracts
(`StudentDashboard`, `IndustryDashboard`, …) and the backend's *presenters*
return JSON that matches those contracts key-for-key. That is why swapping the
old mock data for the real API required no component rewrites — only the data
layer changed.

---

## 3. How a request flows (the important part)

### 3.1 Authentication (JWT, not sessions)

1. A user registers at `/login` choosing their profile (or logs in with
   email + password).
2. The frontend posts to Django:
   - `POST /api/auth/register` or `POST /api/auth/token`
3. Django replies with an **access token** and a **refresh token** (SimpleJWT).
4. The frontend stores them and immediately calls `GET /api/auth/me` to learn
   the user's role.
5. Every subsequent request sends `Authorization: Bearer <access-token>`.
6. If the access token expires, the client **automatically** calls
   `POST /api/auth/token/refresh` once and retries the failed request. If that
   fails, the user is signed out.
7. Routes are guarded (`RequireRole`): signed-out users go to `/login?next=…`;
   a signed-in user who opens the wrong dashboard is redirected to their own.

### 3.2 Loading a dashboard

1. User opens `/student`.
2. `RequireRole` verifies the JWT and the role matches.
3. `LiveDashboard` (a wrapper around the page) calls
   `GET /api/student/dashboard` (role-scoped: `/academician/dashboard`,
   `/industry/dashboard`, `/institution/dashboard`).
4. Django loads the user's data, the presenter shapes it into the exact JSON
   structure the frontend types expect, and returns it.
5. The wrapper writes that payload into the page's data holders
   (`hydrateStudentDashboard(payload)` etc.) and only then renders the page —
   so the user never sees placeholder/mock content.
6. While fetching: full-screen loader. If the backend is unreachable: a clear
   error screen showing the configured API URL + a Retry button.

### 3.3 Performing an action (write)

Example: an academician clicks **Verify** on a student's project claim.

1. The button calls `facultyApi.verifyStudent(id, "approved")`.
2. The client POSTs to `POST /api/academician/verifications/<id>/decide`.
3. Django checks the caller is an academician, updates the verification record
   in the database.
4. The API layer fires a "data changed" event.
5. The dashboard's `LiveDashboard` listens for that event, refetches
   `GET /api/academician/dashboard`, re-hydrates, and re-renders — the verified
   skill now shows as verified everywhere it appears (student passport, skill
   intelligence, reports) because all four dashboards read from the same
   database.

This write → notify → refetch loop is the same for every wired action
(apply to opportunity, shortlist/interview/offer, anomaly resolve/escalate, …).

---

## 4. The REST API at a glance

| Area | Endpoints |
|---|---|
| Health | `GET /api/health` (used by Docker healthcheck) |
| Auth | `POST /api/auth/register` · `POST /api/auth/token` · `/token/refresh` · `GET /api/auth/me` · `PATCH /api/settings` |
| Student | `GET /student/dashboard` · `PATCH /student/profile` · `POST /student/applications` · `POST /student/projects/<id>/submit` · `POST /student/evidence` · `POST /student/skills` |
| Industry | `GET /industry/dashboard` · `PATCH /industry/profile` · `POST/PATCH /industry/opportunities[/<id>]` · `POST /industry/applications/<id>/<shortlist\|interview\|offer\|reject>` · `POST /industry/ratings` |
| Academician | `GET /academician/dashboard` · `PATCH /academician/profile` · `POST /academician/verifications/<id>/decide` · `POST /academician/projects/<id>/decide` · `POST /academician/opportunities` |
| Institution | `GET /institution/dashboard` · `PATCH /institution/profile` · `POST /institution/anomalies/<id>/review` · `POST /institution/reports/generate` |
| Catalog | `GET /catalog/skills` · `/catalog/roles` · `/catalog/institutions` · `/catalog/departments` · `/catalog/resources` |

Every dashboard/business endpoint checks the caller's role and returns **403**
when a user of another role tries to access it — a student cannot read the
institution's anomaly queue, an industry user cannot approve academic
verifications.

---

## 5. How to run it (the real, connected version)

### 5.1 Start the backend

```bash
cd backend
SECRET_KEY=$(openssl rand -hex 32) docker compose up --build
# first run seeds demo data automatically (SEED_DEMO=1)
```

Or locally without Docker:

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo          # optional realistic demo data
python manage.py runserver          # http://localhost:8000
```

### 5.2 Point the frontend at it

The frontend reads `VITE_API_URL` (defaults to `http://localhost:8000/api`).
Set it to your deployed API root, e.g. `https://your-api.example.com/api`.

### 5.3 Open the app

`/` landing → `/login` → sign in → you land on your role's dashboard,
populated from the live database.

Demo logins after `seed_demo` (password `DemoPass@123`):

| Role | Email (add `@demo.aiia.local`) |
|---|---|
| Student | `aarav.sharma@…` |
| Industry | `research@…` |
| Academician | `priya.mehta@…` |
| Institution Admin | `admin@…` |

---

## 6. Verification status (what is actually proven)

**Backend (proven):**
- `python manage.py check` — clean; no migration drift.
- Full test suite — **15/15 API tests pass** against a fresh seeded database,
  covering: register + JWT login, all four dashboard payloads, cross-role 403s,
  unauthenticated 401s, student apply flow, industry pipeline actions,
  academician verification decisions, anomaly review, profile persistence.
- Docker/CI config validated by component checks (a full container run needs a
  Docker host).

**Frontend (proven):**
- `tsc -b --noEmit` — clean.
- Auth flow, role guards, live dashboard loading + refresh loop implemented.

**Not yet proven:** the two halves talking over a network end-to-end, because
this preview environment runs the frontend only — it cannot execute Python.
That single check happens the moment the backend is deployed and
`VITE_API_URL` is set (section 5).

---

## 7. Known limitations (honest list)

1. **Unwired buttons** — several in-page actions are still UI-local (student
   Apply, the four Settings/Save tabs, industry Offer/Reject, institution
   "Generate report"). The backend endpoints and frontend API methods exist;
   the buttons need to be pointed at them (a mechanical wiring pass).
2. **Evidence uploads** — a `student/evidence` endpoint exists but no real
   file-storage backend (S3/local media) is configured; the upload UI is
   simulated.
3. **Email** — no verification/notification email and no password reset.
4. **Report downloads** — currently a browser stub, not a real PDF/CSV export.
5. **Skill extraction** — document → skills extraction is keyword-based, not a
   real NLP pipeline.

These do not block the demo; they are the difference between "works" and
"production-hardened".

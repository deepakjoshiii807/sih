#!/usr/bin/env sh
# Container entrypoint: wait for the DB, apply migrations, optionally seed demo
# data, collect static assets, then exec the real command (gunicorn).
set -e

# Wait for Postgres (compose already gated on health, but this keeps the image
# usable when DATABASE_URL points at a still-starting database on other hosts).
if [ -n "$DATABASE_URL" ]; then
  echo "Waiting for database..."
  python - <<'PY'
import os, sys, time
import psycopg

url = os.environ["DATABASE_URL"]
# dj_database_url understands the same URL scheme
from urllib.parse import urlparse

parsed = urlparse(url.replace("postgres://", "postgresql://"))
for attempt in range(30):
    try:
        conn = psycopg.connect(
            host=parsed.hostname or "localhost",
            port=parsed.port or 5432,
            user=parsed.username or "postgres",
            password=parsed.password or "",
            dbname=parsed.path.lstrip("/") or "postgres",
            connect_timeout=2,
        )
        conn.close()
        print("Database is ready.")
        sys.exit(0)
    except Exception as exc:  # noqa: BLE001
        print(f"  db not ready ({attempt + 1}/30): {exc}", file=sys.stderr)
        time.sleep(2)
print("Database did not become ready in time.", file=sys.stderr)
sys.exit(1)
PY
fi

echo "Applying migrations..."
python manage.py migrate --noinput

if [ "${SEED_DEMO:-0}" = "1" ]; then
  echo "Seeding demo data (SEED_DEMO=1)..."
  python manage.py seed_demo
fi

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
exec "$@"

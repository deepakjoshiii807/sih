"""Gunicorn configuration for the Django API.

Tunable via env vars so the same image works on a VM, Docker Compose,
Kubernetes, or a PaaS (Cloud Run / Heroku / Render).
"""
import os

bind = f"0.0.0.0:{os.environ.get('PORT', '8000')}"

# Workers: (2 × CPU) + 1 is a common starting point; override per platform.
workers = int(os.environ.get("WEB_CONCURRENCY", "3"))
# This API is mostly I/O (DB + JSON); threads help under one worker per CPU.
threads = int(os.environ.get("WEB_THREADS", "2"))

timeout = int(os.environ.get("GUNICORN_TIMEOUT", "60"))
graceful_timeout = 30
keepalive = 5

accesslog = os.environ.get("GUNICORN_ACCESSLOG", "-")
errorlog = os.environ.get("GUNICORN_ERRORLOG", "-")
loglevel = os.environ.get("GUNICORN_LOGLEVEL", "info")

# Preload app code once per worker master for faster cold starts / lower RSS.
preload_app = os.environ.get("GUNICORN_PRELOAD", "False").lower() in ("1", "true", "yes")

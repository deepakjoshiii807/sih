# ---- Build stage -----------------------------------------------------------
FROM python:3.12-slim AS build

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /wheels

COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# ---- Runtime stage ---------------------------------------------------------
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    DEBUG=False \
    DJANGO_ALLOWED_HOSTS=* \
    PORT=8000

# curl is used by the compose healthcheck (not installed on slim by default).
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /wheels /wheels
RUN pip install --no-cache-dir /wheels/*.whl && rm -rf /wheels

COPY . .

# Non-root user (SQLite is never used in the container — see docker-compose,
# the DB lives in Postgres, so /app only needs to be writable for staticfiles).
RUN useradd --create-home --uid 10001 appuser \
    && mkdir -p /app/staticfiles /app/media \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["gunicorn", "config.wsgi:application", "--config", "gunicorn.conf.py"]

"""
Django settings for the SkillBridge / AIIA Academia–Industry platform.

Reads configuration from environment variables (see .env.example) so the same
codebase runs locally, on a VM, or in a container.
"""
import os
from datetime import timedelta
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

DEV_SECRET_KEY = "django-insecure-dev-only-key-change-before-deploying-aiia-skillbridge"
SECRET_KEY = os.environ.get("SECRET_KEY", DEV_SECRET_KEY)
DEBUG = os.environ.get("DEBUG", "True").lower() in ("1", "true", "yes")
if not DEBUG and SECRET_KEY == DEV_SECRET_KEY:
    raise ImproperlyConfigured(
        "SECRET_KEY must be set to a real value when DEBUG=False (see backend/README.md)."
    )
ALLOWED_HOSTS = [
    h.strip()
    for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    if h.strip()
]
CSRF_TRUSTED_ORIGINS = [
    o.strip()
    for o in os.environ.get("DJANGO_CSRF_TRUSTED_ORIGINS", "").split(",")
    if o.strip()
]
# Hardening toggles for TLS-terminating proxies (nginx/ALB/Cloud Run etc.).
if os.environ.get("SECURE_SSL_REDIRECT", "False").lower() in ("1", "true", "yes"):
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
else:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # First-party apps
    "apps.accounts",
    "apps.catalog",
    "apps.credentials",
    "apps.marketplace",
    "apps.governance",
    "apps.api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# --------------------------------------------------------------------------
# Database — SQLite out of the box, DATABASE_URL (e.g. Postgres) optional
# --------------------------------------------------------------------------
DATABASE_URL = os.environ.get("DATABASE_URL", "")
if DATABASE_URL:
    try:
        import dj_database_url
    except ImportError as exc:  # pragma: no cover - env-only path
        raise ImproperlyConfigured(
            "DATABASE_URL is set but dj-database-url is not installed. "
            "Run: pip install dj-database-url"
        ) from exc
    DATABASES = {"default": dj_database_url.parse(DATABASE_URL)}
else:
    DB_NAME = os.environ.get("DB_NAME", str(BASE_DIR / "db.sqlite3"))
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": DB_NAME,
        }
    }

# --------------------------------------------------------------------------
# Auth — email based JWT (no username)
# --------------------------------------------------------------------------
AUTH_USER_MODEL = "accounts.User"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_PAGINATION_CLASS": None,
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z",
    "DATE_FORMAT": "%Y-%m-%d",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "UPDATE_LAST_LOGIN": True,
}

# --------------------------------------------------------------------------
# CORS — the Vite dev server (default :5173) plus anything allowed below
# --------------------------------------------------------------------------
if os.environ.get("CORS_ALLOW_ALL_ORIGINS", "True").lower() in ("1", "true", "yes"):
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        o.strip()
        for o in os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
        if o.strip()
    ]
CORS_ALLOW_CREDENTIALS = True

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        # Compressed + hashed assets, served by WhiteNoise (no nginx needed
        # for static files in the container).
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

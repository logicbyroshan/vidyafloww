"""
VidyaMaxx Django Settings — Development Environment

Overrides base settings for local development.
"""

from .base import *  # noqa: F401, F403

# ─── Security ─────────────────────────────────────────────────────────────────

DEBUG = True
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-insecure-secret-key-do-not-use-in-production")
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

# ─── CORS ─────────────────────────────────────────────────────────────────────

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Web
    "http://localhost:5173",  # Vite
]
CORS_ALLOW_CREDENTIALS = True

# ─── Developer Tools ──────────────────────────────────────────────────────────

INSTALLED_APPS += ["debug_toolbar"]  # noqa: F405
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]  # noqa: F405
INTERNAL_IPS = ["127.0.0.1"]

# ─── Email (Console backend for dev) ─────────────────────────────────────────

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ─── Cache (Local memory for dev) ─────────────────────────────────────────────

# Uncomment to use local memory cache instead of Redis
# CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}

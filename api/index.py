"""Vercel serverless entrypoint — re-exports the FastAPI app from /backend.

Vercel routes /api/* here (see vercel.json). Environment variables (MONGO_URL, DB_NAME,
ADMIN_KEY, CORS_ORIGINS) must be set in the Vercel project settings.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from server import app  # noqa: E402

__all__ = ["app"]

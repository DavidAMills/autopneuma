"""
Supabase client configuration and utilities.
"""

from supabase import create_client, Client
from app.core.config import settings


def get_supabase_client() -> Client:
    """
    Create and return a Supabase client instance.
    Uses service role key for backend operations.
    """
    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_SERVICE_ROLE_KEY,
    )


# Dependency for FastAPI routes
def get_db() -> Client:
    """
    Dependency that yields a Supabase client.
    Can be used in FastAPI route dependencies.
    """
    client = get_supabase_client()
    try:
        yield client
    finally:
        # Cleanup if needed
        pass

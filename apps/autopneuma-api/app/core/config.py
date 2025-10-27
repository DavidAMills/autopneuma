"""
Core configuration for Auto Pneuma API.
Manages environment variables and application settings.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Configuration
    PROJECT_NAME: str = "Auto Pneuma API"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"

    # CORS Configuration
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://autopneuma.com",
        "https://www.autopneuma.com",
    ]

    # Database
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # AI Services
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4-turbo-preview"
    OPENAI_MODERATION_MODEL: str = "gpt-4-turbo-preview"

    # Moderation Settings
    MODERATION_CONFIDENCE_THRESHOLD: float = 0.7
    MODERATION_ENABLED: bool = True

    # Scripture Context Settings
    DEFAULT_BIBLE_VERSION: str = "ESV"
    MAX_CONTEXT_LENGTH: int = 2000

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 500

    # Feature Flags
    ENABLE_SCRIPTURE_ASSISTANT: bool = True
    ENABLE_AI_MODERATION: bool = True
    ENABLE_COMMUNITY_AI_TOOLS: bool = True

    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()

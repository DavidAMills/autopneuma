"""
API v1 router aggregation.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import moderation, scripture, community_tools

api_router = APIRouter()

# Moderation endpoints
api_router.include_router(
    moderation.router,
    prefix="/moderation",
    tags=["moderation"],
)

# Scripture Context Assistant endpoints
api_router.include_router(
    scripture.router,
    prefix="/scripture",
    tags=["scripture"],
)

# Community AI Tools endpoints
api_router.include_router(
    community_tools.router,
    prefix="/tools",
    tags=["community-tools"],
)

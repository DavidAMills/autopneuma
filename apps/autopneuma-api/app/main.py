"""
Auto Pneuma FastAPI Application.

Main entry point for the AI Integration Layer backend.
Provides AI-assisted moderation, Scripture Context Assistant,
and Community AI Tools extensibility.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.v1.api import api_router


# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="""
    Auto Pneuma AI Integration Layer

    ## The Same Spirit, Many Gifts

    This API provides AI-powered services for the Auto Pneuma community:

    ### AI-Assisted Moderation
    - Flags content for moderator review (never auto-removes)
    - Based on biblical principles and community guidelines
    - Assists human moderators with wisdom and discernment

    ### Scripture Context Assistant
    - Provides biblical insights and cross-references
    - Theological guidance grounded in Bible-based Christian doctrine
    - Practical application for faith, technology, and AI ethics

    ### Community AI Tools
    - Extensible platform for member-contributed AI tools
    - Links to Project Showcase
    - Enables believers to share their technical gifts

    **Built for Kingdom Impact**

    All services are designed to glorify God, serve believers, and advance
    the Gospel through faithful use of technology.
    """,
    docs_url="/docs",
    redoc_url="/redoc",
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


# Root endpoint
@app.get("/")
async def root():
    """
    API root endpoint.

    Returns basic information about the Auto Pneuma API.
    """
    return {
        "message": "Auto Pneuma API - The Same Spirit, Many Gifts",
        "version": settings.VERSION,
        "docs": "/docs",
        "services": {
            "moderation": f"{settings.API_V1_PREFIX}/moderation",
            "scripture": f"{settings.API_V1_PREFIX}/scripture",
            "community_tools": f"{settings.API_V1_PREFIX}/tools",
        },
        "mission": "Building Christian community that supports and spreads the Gospel through technology",
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {
        "status": "healthy",
        "service": "autopneuma-api",
        "version": settings.VERSION,
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """
    Global exception handler for unhandled errors.
    """
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again later.",
            "type": type(exc).__name__,
        },
    )


# Startup event
@app.on_event("startup")
async def startup_event():
    """
    Application startup tasks.
    """
    print(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    print(f"Moderation enabled: {settings.ENABLE_AI_MODERATION}")
    print(f"Scripture Assistant enabled: {settings.ENABLE_SCRIPTURE_ASSISTANT}")
    print(f"Community Tools enabled: {settings.ENABLE_COMMUNITY_AI_TOOLS}")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """
    Application shutdown tasks.
    """
    print(f"Shutting down {settings.PROJECT_NAME}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )

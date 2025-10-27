"""
API endpoints for AI-assisted content moderation.
"""

from fastapi import APIRouter, HTTPException, Depends
from supabase import Client

from app.core.supabase import get_db
from app.schemas.moderation import ModerationRequest, ModerationResponse
from app.services.moderation import ModerationService

router = APIRouter()


@router.post("/moderate", response_model=ModerationResponse)
async def moderate_content(
    request: ModerationRequest,
    db: Client = Depends(get_db),
) -> ModerationResponse:
    """
    Analyze content and flag potential concerns for moderator review.

    This endpoint assists human moderators by identifying content that may
    require attention. It does NOT auto-remove or censor content.

    **Flags content based on:**
    - Un-Christlike conduct or divisive behavior
    - Personal attacks or disrespect
    - Spam or promotional content
    - Theological concerns requiring pastoral attention

    **Returns:**
    - flagged: Whether content needs moderator attention
    - flags: Specific concerns identified
    - recommendation: approve, flag_for_review, flag_high_priority
    - reasoning: Human-readable explanation

    **Important:** Final moderation decisions are made by human moderators
    using wisdom, discernment, and community context.
    """
    try:
        service = ModerationService()
        result = await service.moderate_content(
            content=request.content,
            content_type=request.content_type,
            author_id=request.author_id,
        )

        # Optionally log moderation result to database
        if request.content_id and result.flagged:
            await _log_moderation_flag(
                db=db,
                content_id=request.content_id,
                content_type=request.content_type,
                result=result,
            )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Moderation service error: {str(e)}",
        )


async def _log_moderation_flag(
    db: Client,
    content_id: str,
    content_type: str,
    result: ModerationResponse,
) -> None:
    """
    Log moderation flag to database for moderator review.

    Creates entry in moderation_log table for moderators to review.
    """
    try:
        flag_data = {
            "content_type": content_type,
            "content_id": content_id,
            "flagged_by": "ai_assistant",
            "reason": result.recommendation,
            "details": {
                "flags": [flag.model_dump() for flag in result.flags],
                "overall_score": result.overall_score,
                "reasoning": result.reasoning,
            },
            "status": "pending",
        }

        db.table("moderation_log").insert(flag_data).execute()

    except Exception as e:
        # Log error but don't fail the request
        print(f"Error logging moderation flag: {e}")


@router.get("/health")
async def moderation_health() -> dict:
    """Health check for moderation service."""
    return {
        "service": "moderation",
        "status": "healthy",
        "enabled": True,
    }

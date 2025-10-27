"""
API endpoints for Scripture Context Assistant.
"""

from fastapi import APIRouter, HTTPException, Depends
from supabase import Client

from app.core.supabase import get_db
from app.schemas.scripture import ScriptureContextRequest, ScriptureContextResponse
from app.services.scripture_assistant import ScriptureAssistant

router = APIRouter()


@router.post("/context", response_model=ScriptureContextResponse)
async def get_scripture_context(
    request: ScriptureContextRequest,
    db: Client = Depends(get_db),
) -> ScriptureContextResponse:
    """
    Get biblical insights, scripture references, and theological guidance
    for questions related to faith, technology, AI ethics, and Christian living.

    **Provides:**
    - Summary of biblical perspective
    - Key biblical principles
    - Relevant scripture references with text
    - Theological insights grounded in Bible-based Christian doctrine
    - Practical application guidance
    - Suggestions for further study

    **Use cases:**
    - Seeking biblical wisdom on AI ethics questions
    - Understanding scriptural principles for technology projects
    - Finding relevant passages for discussion topics
    - Getting theological context for prayer requests
    - Studying biblical perspectives on specific issues

    **Example queries:**
    - "How should Christians approach AI bias and fairness?"
    - "What does the Bible say about stewardship of technology?"
    - "Scripture on bearing one another's burdens in community"
    """
    try:
        assistant = ScriptureAssistant()
        result = await assistant.get_scripture_context(
            query=request.query,
            context=request.context,
            content_type=request.content_type,
            bible_version=request.bible_version or "ESV",
        )

        # Optionally log scripture queries for analytics
        await _log_scripture_query(
            db=db,
            query=request.query,
            content_type=request.content_type,
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Scripture assistant error: {str(e)}",
        )


@router.get("/health")
async def scripture_health() -> dict:
    """Health check for scripture assistant service."""
    return {
        "service": "scripture_assistant",
        "status": "healthy",
        "enabled": True,
    }


async def _log_scripture_query(
    db: Client,
    query: str,
    content_type: str = None,
) -> None:
    """
    Log scripture queries for analytics (optional).

    Helps understand what topics the community is studying.
    """
    try:
        # TODO: Implement analytics logging if desired
        # Could track popular topics, frequently requested passages, etc.
        pass
    except Exception as e:
        print(f"Error logging scripture query: {e}")

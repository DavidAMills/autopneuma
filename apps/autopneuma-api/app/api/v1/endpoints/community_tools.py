"""
API endpoints for Community AI Tools extensibility layer.
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from supabase import Client
from typing import Optional

from app.core.supabase import get_db
from app.schemas.community_tools import (
    CommunityToolRequest,
    CommunityToolResponse,
    ToolRegistration,
    RegisteredTool,
    ToolListResponse,
)
from app.services.community_tools import CommunityToolsService

router = APIRouter()


@router.post("/register", response_model=RegisteredTool)
async def register_community_tool(
    registration: ToolRegistration,
    creator_id: str,  # TODO: Get from auth token
    db: Client = Depends(get_db),
) -> RegisteredTool:
    """
    Register a new community AI tool.

    **Requirements:**
    - Must have an active project in the Project Showcase
    - Tool must serve Kingdom purposes (spiritual_application required)
    - Tool endpoint must be accessible and documented

    **Process:**
    1. Submit tool registration with API endpoint details
    2. Admin review (if requires_approval = true)
    3. Tool becomes available to community once approved

    **Categories:**
    - scripture-study: Tools for Bible study and Scripture understanding
    - prayer: Prayer-related tools and assistants
    - education: Christian education and teaching tools
    - ethics: AI ethics evaluation and guidance
    - moderation: Community moderation assistants
    - other: Other Kingdom-focused tools

    **Tool Requirements:**
    - Clear input/output schemas (JSON Schema format)
    - Rate limiting to prevent abuse
    - Explanation of spiritual application
    - Link to Project Showcase entry
    """
    try:
        service = CommunityToolsService(db)
        tool = await service.register_tool(
            registration=registration,
            creator_id=creator_id,
        )
        return tool

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Tool registration error: {str(e)}",
        )


@router.post("/execute", response_model=CommunityToolResponse)
async def execute_community_tool(
    request: CommunityToolRequest,
    user_id: str,  # TODO: Get from auth token
    db: Client = Depends(get_db),
) -> CommunityToolResponse:
    """
    Execute a registered community AI tool.

    **Usage:**
    1. Find available tools using the /list endpoint
    2. Review the tool's input schema
    3. Submit execution request with required parameters
    4. Receive tool output

    **Rate Limits:**
    Each tool has its own rate limit (typically 50-100 requests per hour)

    **Error Handling:**
    - If tool execution fails, error_message will contain details
    - success=false indicates the tool encountered an error
    - Check tool documentation for expected inputs/outputs
    """
    try:
        service = CommunityToolsService(db)
        result = await service.execute_tool(request=request, user_id=user_id)
        await service.close()
        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Tool execution error: {str(e)}",
        )


@router.get("/list", response_model=ToolListResponse)
async def list_community_tools(
    category: Optional[str] = Query(None, description="Filter by category"),
    status: str = Query("active", description="Filter by status"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Results per page"),
    db: Client = Depends(get_db),
) -> ToolListResponse:
    """
    List available community AI tools.

    **Filters:**
    - category: scripture-study, prayer, education, ethics, moderation, other
    - status: active, pending_approval, suspended, deprecated

    **Response includes:**
    - Tool name and description
    - Creator information
    - Input/output schemas
    - Performance metrics (success rate, avg execution time)
    - Spiritual application explanation
    """
    try:
        service = CommunityToolsService(db)
        result = await service.list_tools(
            category=category,
            status=status,
            page=page,
            per_page=per_page,
        )
        return ToolListResponse(**result)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error listing tools: {str(e)}",
        )


@router.get("/{tool_id}", response_model=RegisteredTool)
async def get_tool_details(
    tool_id: str,
    db: Client = Depends(get_db),
) -> RegisteredTool:
    """
    Get detailed information about a specific community tool.

    **Returns:**
    - Full tool configuration
    - Input/output schemas
    - Performance metrics
    - Creator information
    - Usage statistics
    """
    try:
        service = CommunityToolsService(db)
        tool = await service._get_tool(tool_id)
        return tool

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching tool: {str(e)}",
        )


@router.get("/health")
async def community_tools_health() -> dict:
    """Health check for community tools service."""
    return {
        "service": "community_tools",
        "status": "healthy",
        "enabled": True,
    }

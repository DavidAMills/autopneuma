"""
Pydantic schemas for Community AI Tools extensibility layer.
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Dict, Any, List
from datetime import datetime


class CommunityToolRequest(BaseModel):
    """Request to execute a community-contributed AI tool."""

    tool_id: str = Field(..., description="ID of the registered tool")
    input_data: Dict[str, Any] = Field(..., description="Input parameters for the tool")
    user_id: Optional[str] = Field(None, description="User executing the tool")


class CommunityToolResponse(BaseModel):
    """Response from a community AI tool execution."""

    tool_id: str
    success: bool
    output_data: Dict[str, Any] = Field(..., description="Tool execution results")
    execution_time_ms: float
    credits_used: Optional[int] = Field(None, description="API credits consumed")
    error_message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ToolRegistration(BaseModel):
    """Schema for registering a new community AI tool."""

    project_id: str = Field(..., description="ID of the project in showcase")
    tool_name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=20, max_length=500)
    category: str = Field(
        ...,
        description="Category: scripture-study, prayer, education, ethics, moderation, other",
    )
    api_endpoint: HttpUrl = Field(..., description="Endpoint URL for the tool")
    authentication_method: str = Field(
        default="api_key",
        description="How to authenticate: api_key, oauth, none",
    )
    input_schema: Dict[str, Any] = Field(
        ...,
        description="JSON schema describing expected inputs",
    )
    output_schema: Dict[str, Any] = Field(
        ...,
        description="JSON schema describing expected outputs",
    )
    rate_limit: int = Field(
        default=100,
        description="Max requests per user per hour",
    )
    requires_approval: bool = Field(
        default=True,
        description="Whether tool requires admin approval before use",
    )
    spiritual_application: str = Field(
        ...,
        description="How this tool serves Kingdom purposes",
    )


class RegisteredTool(ToolRegistration):
    """A registered community AI tool with metadata."""

    id: str
    creator_id: str
    status: str = Field(
        ...,
        description="pending_approval, active, suspended, deprecated",
    )
    total_executions: int = Field(default=0)
    success_rate: float = Field(default=1.0, ge=0.0, le=1.0)
    average_execution_time_ms: float = Field(default=0.0)
    created_at: datetime
    updated_at: datetime
    approved_at: Optional[datetime] = None
    approved_by: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "tool_123",
                "project_id": "proj_456",
                "creator_id": "user_789",
                "tool_name": "Sermon Summary Generator",
                "description": "AI tool that generates study notes from sermon transcripts",
                "category": "education",
                "api_endpoint": "https://api.example.com/sermon-summary",
                "authentication_method": "api_key",
                "input_schema": {"type": "object", "properties": {"transcript": {"type": "string"}}},
                "output_schema": {"type": "object", "properties": {"summary": {"type": "string"}}},
                "rate_limit": 50,
                "requires_approval": True,
                "spiritual_application": "Helps congregations engage more deeply with teaching",
                "status": "active",
                "total_executions": 245,
                "success_rate": 0.98,
                "average_execution_time_ms": 1500,
                "created_at": "2024-01-15T10:00:00Z",
                "updated_at": "2024-01-20T14:30:00Z",
                "approved_at": "2024-01-16T09:00:00Z",
                "approved_by": "admin_123",
            }
        }


class ToolListResponse(BaseModel):
    """Response for listing available community tools."""

    tools: List[RegisteredTool]
    total: int
    page: int = 1
    per_page: int = 20

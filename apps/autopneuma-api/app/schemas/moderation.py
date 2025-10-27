"""
Pydantic schemas for content moderation.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ModerationRequest(BaseModel):
    """Request schema for content moderation."""

    content: str = Field(..., min_length=1, max_length=10000)
    content_type: str = Field(..., description="Type: post, comment, prayer_request, project")
    content_id: Optional[str] = Field(None, description="ID of the content being moderated")
    author_id: Optional[str] = Field(None, description="User ID of the author")


class ModerationFlag(BaseModel):
    """Individual flag raised by moderation system."""

    category: str = Field(..., description="Category of concern")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score 0-1")
    explanation: str = Field(..., description="Human-readable explanation")
    severity: str = Field(..., description="low, medium, high")


class ModerationResponse(BaseModel):
    """Response schema for content moderation."""

    flagged: bool = Field(..., description="Whether content was flagged for review")
    flags: List[ModerationFlag] = Field(default_factory=list)
    overall_score: float = Field(..., ge=0.0, le=1.0, description="Overall concern score")
    recommendation: str = Field(
        ...,
        description="approve, flag_for_review, flag_high_priority",
    )
    reasoning: str = Field(..., description="Summary of moderation reasoning")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "flagged": True,
                "flags": [
                    {
                        "category": "divisive_language",
                        "confidence": 0.75,
                        "explanation": "Content contains potentially divisive theological arguments",
                        "severity": "medium",
                    }
                ],
                "overall_score": 0.75,
                "recommendation": "flag_for_review",
                "reasoning": "Content should be reviewed by moderators for tone and theological appropriateness",
                "timestamp": "2024-01-15T10:30:00Z",
            }
        }

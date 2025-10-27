"""
Pydantic schemas for Scripture Context Assistant.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ScriptureReference(BaseModel):
    """A single scripture reference."""

    book: str = Field(..., description="Book name (e.g., 'John', '1 Corinthians')")
    chapter: int = Field(..., ge=1)
    verse_start: int = Field(..., ge=1)
    verse_end: Optional[int] = Field(None, ge=1)
    text: str = Field(..., description="The scripture text")
    version: str = Field(default="ESV", description="Bible translation")

    def format_reference(self) -> str:
        """Format as 'Book Chapter:Verse' (e.g., 'John 3:16')."""
        if self.verse_end and self.verse_end != self.verse_start:
            return f"{self.book} {self.chapter}:{self.verse_start}-{self.verse_end}"
        return f"{self.book} {self.chapter}:{self.verse_start}"


class ScriptureContextRequest(BaseModel):
    """Request schema for Scripture Context Assistant."""

    query: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="Question or topic for biblical insight",
    )
    context: Optional[str] = Field(
        None,
        max_length=5000,
        description="Additional context (discussion content, project description)",
    )
    content_type: Optional[str] = Field(
        None,
        description="Source: discussion, prayer_request, project, general",
    )
    bible_version: Optional[str] = Field(
        default="ESV",
        description="Preferred Bible translation",
    )


class ScriptureContextResponse(BaseModel):
    """Response schema for Scripture Context Assistant."""

    query: str = Field(..., description="Original query")
    summary: str = Field(..., description="Brief summary of biblical perspective")
    biblical_principles: List[str] = Field(
        default_factory=list,
        description="Key biblical principles relevant to the query",
    )
    scripture_references: List[ScriptureReference] = Field(
        default_factory=list,
        description="Relevant scripture passages with text",
    )
    theological_insights: str = Field(
        ...,
        description="Deeper theological reflection on the topic",
    )
    practical_application: str = Field(
        ...,
        description="How to apply these principles practically",
    )
    further_study: List[str] = Field(
        default_factory=list,
        description="Suggestions for deeper study",
    )
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "query": "How should Christians approach AI ethics?",
                "summary": "Scripture calls believers to pursue truth, justice, and stewardship in all work",
                "biblical_principles": [
                    "Stewardship of God-given talents and resources",
                    "Pursuit of truth and rejection of deception",
                    "Justice and equal treatment of all people",
                ],
                "scripture_references": [
                    {
                        "book": "1 Corinthians",
                        "chapter": 10,
                        "verse_start": 31,
                        "verse_end": None,
                        "text": "So, whether you eat or drink, or whatever you do, do all to the glory of God.",
                        "version": "ESV",
                    }
                ],
                "theological_insights": "Detailed reflection on biblical principles...",
                "practical_application": "Practical steps for AI ethics...",
                "further_study": ["Romans 12:1-2", "Philippians 4:8"],
                "timestamp": "2024-01-15T10:30:00Z",
            }
        }

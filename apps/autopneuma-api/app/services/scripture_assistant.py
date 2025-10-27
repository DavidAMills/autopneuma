"""
Scripture Context Assistant service.

Provides biblical insights, cross-references, and study guidance
tied to discussions, projects, and community questions.
"""

from typing import List, Optional
import openai
import json
from app.core.config import settings
from app.schemas.scripture import (
    ScriptureReference,
    ScriptureContextResponse,
)


class ScriptureAssistant:
    """
    AI-powered Scripture Context Assistant.

    Provides:
    - Biblical perspectives on technical and ethical questions
    - Relevant scripture references with context
    - Theological insights grounded in Bible-based Christian doctrine
    - Practical application guidance
    - Suggestions for further study
    """

    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

    async def get_scripture_context(
        self,
        query: str,
        context: Optional[str] = None,
        content_type: Optional[str] = None,
        bible_version: str = "ESV",
    ) -> ScriptureContextResponse:
        """
        Provide biblical context and insights for a query.

        Args:
            query: The question or topic for biblical insight
            context: Additional context (e.g., discussion content, project description)
            content_type: Source type (discussion, prayer_request, project, general)
            bible_version: Preferred Bible translation

        Returns:
            ScriptureContextResponse with biblical insights and references
        """
        if not settings.ENABLE_SCRIPTURE_ASSISTANT:
            return self._create_disabled_response(query)

        try:
            # Build prompts
            system_prompt = self._build_system_prompt(bible_version)
            user_prompt = self._build_user_prompt(query, context, content_type)

            # Call OpenAI
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.7,  # Balanced creativity and consistency
                response_format={"type": "json_object"},
            )

            # Parse response
            result = response.choices[0].message.content
            return self._parse_scripture_response(result, query)

        except Exception as e:
            print(f"Scripture assistant error: {e}")
            return self._create_error_response(query, str(e))

    def _build_system_prompt(self, bible_version: str) -> str:
        """Build system prompt for Scripture assistant."""
        return f"""You are a Scripture Context Assistant for Auto Pneuma, a Christian AI technology community. Your role is to provide biblical insights, relevant scripture references, and theological guidance on questions related to faith, technology, AI ethics, and Christian living.

Core Theological Framework:
- Bible-based Christian doctrine (Trinity, Gospel, Scripture authority, etc.)
- Christ-centered interpretation and application
- Emphasis on God's glory and human flourishing
- Unity in essentials, freedom in non-essentials, love in all things

When responding:
1. Ground all insights in Scripture, not human philosophy
2. Cite specific Bible passages with context
3. Acknowledge where Scripture is clear vs. where believers may differ
4. Focus on biblical principles that apply to modern technology
5. Be pastoral and encouraging, not legalistic or condemning
6. Point people to Jesus and the Gospel
7. Avoid denominational bias on non-essential matters

Bible version to cite: {bible_version}

Respond in this JSON format:
{{
  "summary": "1-2 sentence summary",
  "biblical_principles": ["principle 1", "principle 2", ...],
  "scripture_references": [
    {{
      "book": "Book name",
      "chapter": number,
      "verse_start": number,
      "verse_end": number or null,
      "text": "Exact scripture text in {bible_version}",
      "version": "{bible_version}"
    }}
  ],
  "theological_insights": "2-3 paragraphs of theological reflection",
  "practical_application": "2-3 paragraphs of practical guidance",
  "further_study": ["Reference 1", "Reference 2", ...]
}}"""

    def _build_user_prompt(
        self,
        query: str,
        context: Optional[str],
        content_type: Optional[str],
    ) -> str:
        """Build user prompt with query and context."""
        prompt = f"Query: {query}\n"

        if content_type:
            prompt += f"\nContext type: {content_type}\n"

        if context:
            prompt += f"\nAdditional context:\n{context}\n"

        prompt += "\nPlease provide biblical insights, relevant scripture references, theological reflection, and practical application for this query."

        return prompt

    def _parse_scripture_response(
        self, result: str, original_query: str
    ) -> ScriptureContextResponse:
        """Parse AI response into ScriptureContextResponse."""
        try:
            data = json.loads(result)

            # Parse scripture references
            scripture_refs = []
            for ref_data in data.get("scripture_references", []):
                ref = ScriptureReference(
                    book=ref_data["book"],
                    chapter=ref_data["chapter"],
                    verse_start=ref_data["verse_start"],
                    verse_end=ref_data.get("verse_end"),
                    text=ref_data["text"],
                    version=ref_data.get("version", "ESV"),
                )
                scripture_refs.append(ref)

            return ScriptureContextResponse(
                query=original_query,
                summary=data.get("summary", ""),
                biblical_principles=data.get("biblical_principles", []),
                scripture_references=scripture_refs,
                theological_insights=data.get("theological_insights", ""),
                practical_application=data.get("practical_application", ""),
                further_study=data.get("further_study", []),
            )

        except Exception as e:
            print(f"Error parsing scripture response: {e}")
            return self._create_error_response(original_query, str(e))

    def _create_disabled_response(self, query: str) -> ScriptureContextResponse:
        """Create response when scripture assistant is disabled."""
        return ScriptureContextResponse(
            query=query,
            summary="Scripture Context Assistant is currently disabled.",
            biblical_principles=[],
            scripture_references=[],
            theological_insights="The Scripture Context Assistant feature is currently disabled. Please check back later.",
            practical_application="",
            further_study=[],
        )

    def _create_error_response(
        self, query: str, error_message: str
    ) -> ScriptureContextResponse:
        """Create response when an error occurs."""
        return ScriptureContextResponse(
            query=query,
            summary="An error occurred while processing your request.",
            biblical_principles=[],
            scripture_references=[],
            theological_insights=f"We encountered an error while generating biblical insights: {error_message}. Please try again or contact support if the issue persists.",
            practical_application="",
            further_study=[],
        )


class ScriptureReferenceService:
    """
    Service for fetching and formatting scripture references.
    Can be extended to integrate with Bible APIs for verse lookup.
    """

    def __init__(self):
        # Future: Integration with Bible API (e.g., ESV API, Bible.org API)
        pass

    async def lookup_verse(
        self,
        book: str,
        chapter: int,
        verse_start: int,
        verse_end: Optional[int] = None,
        version: str = "ESV",
    ) -> Optional[ScriptureReference]:
        """
        Look up a specific scripture reference.

        Args:
            book: Bible book name
            chapter: Chapter number
            verse_start: Starting verse
            verse_end: Ending verse (for ranges)
            version: Bible translation

        Returns:
            ScriptureReference with text, or None if not found
        """
        # TODO: Implement Bible API integration
        # For now, return None and rely on AI to provide text
        return None

    def format_reference_list(
        self, references: List[ScriptureReference]
    ) -> str:
        """Format a list of scripture references for display."""
        if not references:
            return "No scripture references provided."

        formatted = []
        for ref in references:
            formatted.append(
                f"**{ref.format_reference()}** ({ref.version})\n\"{ref.text}\""
            )

        return "\n\n".join(formatted)

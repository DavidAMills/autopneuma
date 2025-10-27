"""
AI-assisted content moderation service.

This service flags content for moderator review but NEVER auto-removes content.
It assists human moderators by identifying potential concerns based on biblical
principles and community guidelines.
"""

from typing import List
import openai
from app.core.config import settings
from app.schemas.moderation import ModerationFlag, ModerationResponse


class ModerationService:
    """
    AI-assisted content moderation service.

    Flags content based on:
    - Un-Christlike conduct or divisive behavior
    - Theological concerns requiring pastoral attention
    - Spam or promotional content
    - Personal attacks or disrespect

    IMPORTANT: This service only flags content for human review.
    It does NOT auto-remove or censor content.
    """

    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.threshold = settings.MODERATION_CONFIDENCE_THRESHOLD

    async def moderate_content(
        self,
        content: str,
        content_type: str,
        author_id: str = None,
    ) -> ModerationResponse:
        """
        Analyze content and flag potential concerns for moderator review.

        Args:
            content: The text content to moderate
            content_type: Type of content (post, comment, prayer_request, project)
            author_id: Optional user ID for context

        Returns:
            ModerationResponse with flags and recommendations
        """
        if not settings.ENABLE_AI_MODERATION:
            return self._create_approved_response()

        try:
            # Build moderation prompt based on biblical principles
            system_prompt = self._build_system_prompt(content_type)
            user_prompt = self._build_user_prompt(content, content_type)

            # Call OpenAI for analysis
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODERATION_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.3,  # Lower temperature for consistent moderation
                response_format={"type": "json_object"},
            )

            # Parse AI response
            result = response.choices[0].message.content
            flags = self._parse_moderation_result(result)

            # Calculate overall score and recommendation
            overall_score = self._calculate_overall_score(flags)
            recommendation = self._determine_recommendation(overall_score, flags)
            reasoning = self._generate_reasoning(flags, overall_score)

            return ModerationResponse(
                flagged=len(flags) > 0,
                flags=flags,
                overall_score=overall_score,
                recommendation=recommendation,
                reasoning=reasoning,
            )

        except Exception as e:
            # On error, default to flagging for manual review
            print(f"Moderation error: {e}")
            return ModerationResponse(
                flagged=True,
                flags=[
                    ModerationFlag(
                        category="system_error",
                        confidence=1.0,
                        explanation="Moderation system encountered an error. Manual review recommended.",
                        severity="medium",
                    )
                ],
                overall_score=0.5,
                recommendation="flag_for_review",
                reasoning="System error during automated moderation. Please review manually.",
            )

    def _build_system_prompt(self, content_type: str) -> str:
        """Build the system prompt for moderation based on biblical principles."""
        return f"""You are an AI assistant helping moderate content for Auto Pneuma, a Christian AI technology community. Your role is to FLAG content that may need human moderator attention, NOT to censor or remove content.

Our community values:
- Christ-centered discussion and mutual edification (Ephesians 4:29)
- Speaking truth in love with respect and humility (Ephesians 4:15)
- Building up the body of Christ through our diverse gifts (1 Corinthians 12)
- Excellence and integrity in technical work
- Unity in essential beliefs, freedom in non-essentials

FLAG content if it contains:
1. **Personal attacks or disrespect**: Content that attacks individuals rather than discusses ideas
2. **Divisive behavior**: Unnecessarily contentious or inflammatory theological arguments that divide rather than edify
3. **Spam or promotional**: Unsolicited advertising or off-topic promotion
4. **Theological concerns**: Teachings that clearly contradict Bible-based Christian doctrine (not denominational disputes)
5. **Inappropriate content**: Explicit content, profanity, or vulgar language

DO NOT FLAG:
- Respectful disagreement on non-essential theological matters
- Technical discussions of AI ethics from various Christian perspectives
- Genuine questions about faith, even if they reveal doubt or struggle
- Different denominational perspectives (Reformed, Charismatic, etc.)
- Different approaches to AI development within biblical bounds

Content type being moderated: {content_type}

Respond ONLY with JSON in this format:
{{
  "flags": [
    {{
      "category": "category_name",
      "confidence": 0.0-1.0,
      "explanation": "clear explanation",
      "severity": "low|medium|high"
    }}
  ]
}}

If no concerns, return: {{"flags": []}}"""

    def _build_user_prompt(self, content: str, content_type: str) -> str:
        """Build the user prompt with content to moderate."""
        return f"""Please analyze this {content_type} content and flag any concerns:

Content:
{content}

Remember: Flag for human review if genuinely concerning, but err on the side of freedom when content is within biblical bounds even if imperfect in tone."""

    def _parse_moderation_result(self, result: str) -> List[ModerationFlag]:
        """Parse the AI response into ModerationFlag objects."""
        import json

        try:
            data = json.loads(result)
            flags = []

            for flag_data in data.get("flags", []):
                flag = ModerationFlag(
                    category=flag_data["category"],
                    confidence=float(flag_data["confidence"]),
                    explanation=flag_data["explanation"],
                    severity=flag_data["severity"],
                )

                # Only include flags above threshold
                if flag.confidence >= self.threshold:
                    flags.append(flag)

            return flags

        except Exception as e:
            print(f"Error parsing moderation result: {e}")
            return []

    def _calculate_overall_score(self, flags: List[ModerationFlag]) -> float:
        """Calculate overall concern score from flags."""
        if not flags:
            return 0.0

        # Weight by severity
        severity_weights = {"low": 0.3, "medium": 0.6, "high": 1.0}

        weighted_sum = sum(
            flag.confidence * severity_weights.get(flag.severity, 0.5)
            for flag in flags
        )

        # Normalize to 0-1 range
        return min(weighted_sum / len(flags), 1.0)

    def _determine_recommendation(
        self, overall_score: float, flags: List[ModerationFlag]
    ) -> str:
        """Determine moderation recommendation based on score and flags."""
        if not flags:
            return "approve"

        # High severity flags always trigger high priority review
        has_high_severity = any(flag.severity == "high" for flag in flags)
        if has_high_severity or overall_score >= 0.8:
            return "flag_high_priority"

        # Medium concern triggers standard review
        if overall_score >= self.threshold:
            return "flag_for_review"

        return "approve"

    def _generate_reasoning(
        self, flags: List[ModerationFlag], overall_score: float
    ) -> str:
        """Generate human-readable reasoning for the moderation decision."""
        if not flags:
            return "Content appears appropriate for the community. No concerns identified."

        concerns = []
        for flag in flags:
            concerns.append(
                f"{flag.category.replace('_', ' ').title()} ({flag.severity} severity, {flag.confidence:.0%} confidence): {flag.explanation}"
            )

        reasoning = "Content flagged for moderator review:\n\n" + "\n".join(
            f"• {concern}" for concern in concerns
        )

        if overall_score >= 0.8:
            reasoning += "\n\nRecommendation: High priority review recommended."
        else:
            reasoning += "\n\nRecommendation: Standard review queue."

        reasoning += "\n\nNote: This is an AI assessment to assist human moderators. Final decisions should be made by community moderators using wisdom and discernment."

        return reasoning

    def _create_approved_response(self) -> ModerationResponse:
        """Create a default approved response when moderation is disabled."""
        return ModerationResponse(
            flagged=False,
            flags=[],
            overall_score=0.0,
            recommendation="approve",
            reasoning="AI moderation is currently disabled. Content approved by default.",
        )

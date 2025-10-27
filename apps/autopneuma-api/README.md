# Auto Pneuma API

**The Same Spirit, Many Gifts**

AI Integration Layer for Auto Pneuma - A Christian AI Technology Community

## Overview

This FastAPI backend provides AI-powered services for the Auto Pneuma platform:

### Core Services

1. **AI-Assisted Moderation** (`/api/v1/moderation`)
   - Flags content for moderator review (never auto-removes)
   - Based on biblical principles and community guidelines
   - Assists human moderators with wisdom and discernment

2. **Scripture Context Assistant** (`/api/v1/scripture`)
   - Provides biblical insights and cross-references
   - Theological guidance grounded in Bible-based Christian doctrine
   - Practical application for faith, technology, and AI ethics

3. **Community AI Tools** (`/api/v1/tools`)
   - Extensible platform for member-contributed AI tools
   - Links to Project Showcase
   - Enables believers to share their technical gifts

## Getting Started

### Prerequisites

- Python 3.10+
- Supabase account and project
- OpenAI API key

### Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Server

Development mode:
```bash
uvicorn app.main:app --reload --port 8000
```

Production mode:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Moderation

**POST /api/v1/moderation/moderate**
- Analyze content and flag potential concerns
- Returns flags, confidence scores, and recommendations
- Never auto-removes content - only assists moderators

Example:
```json
{
  "content": "Post content to moderate",
  "content_type": "post",
  "content_id": "post_123",
  "author_id": "user_456"
}
```

### Scripture Context

**POST /api/v1/scripture/context**
- Get biblical insights for questions and topics
- Returns scripture references, principles, and application
- Grounded in Bible-based Christian doctrine

Example:
```json
{
  "query": "How should Christians approach AI ethics?",
  "context": "Discussion about bias in machine learning",
  "content_type": "discussion",
  "bible_version": "ESV"
}
```

### Community Tools

**POST /api/v1/tools/register**
- Register a new community AI tool
- Must link to Project Showcase entry
- Requires approval for Kingdom-focused tools

**POST /api/v1/tools/execute**
- Execute a registered community tool
- Rate limited per tool configuration
- Returns tool output or error details

**GET /api/v1/tools/list**
- List available community tools
- Filter by category and status
- Includes performance metrics

## Architecture

```
app/
├── api/
│   └── v1/
│       ├── endpoints/
│       │   ├── moderation.py
│       │   ├── scripture.py
│       │   └── community_tools.py
│       └── api.py
├── core/
│   ├── config.py        # Environment configuration
│   └── supabase.py      # Database client
├── services/
│   ├── moderation.py    # AI moderation logic
│   ├── scripture_assistant.py  # Scripture context logic
│   └── community_tools.py      # Tool execution logic
├── schemas/
│   ├── moderation.py    # Pydantic models
│   ├── scripture.py
│   └── community_tools.py
└── main.py              # FastAPI application
```

## Configuration

Key environment variables:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` - Database connection
- `OPENAI_API_KEY` - AI services
- `MODERATION_CONFIDENCE_THRESHOLD` - Minimum confidence to flag (0.7 default)
- `ENABLE_*` - Feature flags for each service

## Moderation Guidelines

The AI moderation system flags content based on:

1. **Personal attacks or disrespect** - Attacks on individuals vs. ideas
2. **Divisive behavior** - Unnecessarily contentious theological arguments
3. **Spam or promotional** - Unsolicited advertising
4. **Theological concerns** - Clear contradiction of biblical doctrine
5. **Inappropriate content** - Explicit, profane, or vulgar language

**Important:** Does NOT flag:
- Respectful disagreement on non-essentials
- Different denominational perspectives
- Technical discussions from various angles
- Genuine questions about faith

## Scripture Assistant Guidelines

The Scripture Context Assistant provides insights grounded in:

- Bible-based Christian doctrine (Trinity, Gospel, Scripture authority)
- Christ-centered interpretation and application
- Unity in essentials, freedom in non-essentials
- Biblical principles for modern technology
- Pastoral and encouraging tone

## Community Tools

Members can register AI tools that:
- Serve Kingdom purposes
- Link to an approved Project Showcase entry
- Provide clear input/output schemas
- Include rate limiting to prevent abuse
- Explain spiritual application

Tool categories:
- scripture-study
- prayer
- education
- ethics
- moderation
- other

## Testing

Run tests:
```bash
pytest
```

## Deployment

### Docker

Build:
```bash
docker build -t autopneuma-api .
```

Run:
```bash
docker run -p 8000:8000 --env-file .env autopneuma-api
```

### Heroku / Railway / Render

1. Set environment variables
2. Deploy from GitHub
3. Configure health check endpoint: `/health`

## Security

- Service role key for database operations
- Rate limiting on all endpoints
- Input validation via Pydantic
- CORS configured for approved origins
- No sensitive data in logs

## Mission

**Building Christian community that supports and spreads the Gospel for the glory of our Lord**

This API serves believers by:
- Maintaining healthy, edifying community spaces
- Providing biblical wisdom and context
- Enabling members to share their technical gifts
- Glorifying God through faithful use of AI

## Support

- Documentation: See `/docs` when running
- Issues: GitHub repository
- Community: Auto Pneuma discussion board

---

*"Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7*

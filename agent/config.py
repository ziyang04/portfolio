"""Runtime configuration for the ReachLoop agent service."""
from __future__ import annotations

import os
from pathlib import Path

try:  # optional: load agent/.env if python-dotenv is installed
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).parent / ".env")
except Exception:  # pragma: no cover - dotenv is optional
    pass

ROOT = Path(__file__).parent
SKILLS_DIR = ROOT / "skills"
GLOBAL_SKILL = SKILLS_DIR / "global" / "instagram-content" / "SKILL.md"
USERS_DIR = SKILLS_DIR / "users"

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
ORCHESTRATOR_MODEL = os.environ.get("ORCHESTRATOR_MODEL", "claude-opus-4-8")
CONTENT_MODEL = os.environ.get("CONTENT_MODEL", "claude-sonnet-4-6")


def live_mode() -> bool:
    """True when we have everything needed to drive the real Claude Agent SDK.

    Without an API key (or if the SDK isn't installed) the service runs in a
    fully-functional deterministic MOCK mode so the whole product can be
    demoed offline.
    """
    if not ANTHROPIC_API_KEY:
        return False
    try:
        import claude_agent_sdk  # noqa: F401
    except Exception:
        return False
    return True

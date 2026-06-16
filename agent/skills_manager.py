"""Self-improving Skills, persisted as Claude Agent SDK skill files.

The agents read these SKILL.md files as context before writing content. The
learning loop appends new lessons to them:

  * GLOBAL skill  (skills/global/instagram-content/SKILL.md)
      shared by every company — learned from aggregate reach.
  * LOCAL skills  (skills/users/<userId>/SKILL.md)
      private to one user — learned from that user's explicit feedback.

Because the playbook is a file the agents read on every run, improvements
compound: better notes -> better content -> better reach -> better notes.
"""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from config import GLOBAL_SKILL, USERS_DIR
from models import SkillNote


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _ensure(path: Path, header: str) -> None:
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(header, encoding="utf-8")


def read_global_skill() -> str:
    _ensure(GLOBAL_SKILL, _GLOBAL_SEED)
    return GLOBAL_SKILL.read_text(encoding="utf-8")


def local_skill_path(user_id: str) -> Path:
    safe = "".join(c for c in user_id if c.isalnum() or c in "_-") or "anon"
    return USERS_DIR / safe / "SKILL.md"


def read_local_skill(user_id: str) -> str:
    path = local_skill_path(user_id)
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def append_global_lesson(title: str, body: str, source: str = "reach") -> SkillNote:
    """Append a lesson to the shared global playbook."""
    read_global_skill()  # ensure seeded
    entry = f"\n## {title}\n_{_now()} · learned from {source}_\n\n{body}\n"
    with GLOBAL_SKILL.open("a", encoding="utf-8") as f:
        f.write(entry)
    return SkillNote(
        scope="global", title=title, body=body, source=source, updatedAt=_now()
    )


def append_local_lesson(
    user_id: str, title: str, body: str, source: str = "user-feedback"
) -> SkillNote:
    """Append a lesson to a single user's private playbook."""
    path = local_skill_path(user_id)
    _ensure(
        path,
        f"# Local content skill — {user_id}\n\n"
        "Private preferences this user has taught ReachLoop. The content "
        "subagents read this before writing anything for this account.\n",
    )
    entry = f"\n## {title}\n_{_now()} · learned from {source}_\n\n{body}\n"
    with path.open("a", encoding="utf-8") as f:
        f.write(entry)
    return SkillNote(
        scope="local", title=title, body=body, source=source, updatedAt=_now()
    )


def skills_context(user_id: str) -> str:
    """Bundle the global + local playbooks for injection into agent prompts."""
    parts = ["# GLOBAL PLAYBOOK\n" + read_global_skill()]
    local = read_local_skill(user_id)
    if local:
        parts.append("# THIS USER'S PRIVATE PLAYBOOK\n" + local)
    return "\n\n".join(parts)


# Seed content for the global skill the very first time the service runs.
_GLOBAL_SEED = """# Instagram content skill (global)

The shared, self-improving playbook every ReachLoop content subagent reads
before writing. Lessons below were learned from real reach across all
companies. Newer lessons override older ones on conflict.

## Hooks
_seed_

Open with a concrete, specific hook in the first 5 words. Curiosity gaps and
numbers outperform brand statements.

## Format
_seed_

One idea per post. Captions: 1 short hook line, 2–4 lines of value, 1 clear CTA.
Use 4–8 hashtags mixing one broad + several niche tags.

## Saves & follows
_seed_

Content that teaches or lets people self-identify ("tag someone who…") earns
saves and follows, which matter more than likes for distribution.
"""

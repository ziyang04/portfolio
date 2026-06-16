"""Core logic for ReachLoop.

Each entry point has a LIVE path (Claude Agent SDK) and a deterministic MOCK
path. We always try LIVE when configured and fall back to MOCK on any error so
the product is never dead in the water.
"""
from __future__ import annotations

import hashlib
import random
from datetime import datetime, timezone

import config
import skills_manager as skills
from claude_runtime import run_agent, extract_json
from models import (
    AnalyzeRequest,
    BusinessAnalysis,
    ContentPiece,
    FeedbackRequest,
    FeedbackResponse,
    GenerateRequest,
    LearnRequest,
    ReachReport,
    RecommendedTarget,
    SkillNote,
)
from target_catalog import TARGETS, handle_for, label_for, persona_for

VALID_TARGET_IDS = list(TARGETS.keys())


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# ───────────────────────────── analyze ──────────────────────────────────────
async def analyze(req: AnalyzeRequest) -> BusinessAnalysis:
    if config.live_mode():
        try:
            return await _analyze_live(req)
        except Exception as e:  # noqa: BLE001
            print(f"[analyze] live failed, using mock: {e}")
    return _analyze_mock(req)


async def _analyze_live(req: AnalyzeRequest) -> BusinessAnalysis:
    system = (
        "You are ReachLoop's business orchestrator. Read a company description, "
        "infer its business and unmet needs, and recommend Instagram audiences "
        "to target. Respond with ONLY a JSON object, no prose."
    )
    prompt = f"""Company name: {req.name or "(unspecified)"}
Description:
\"\"\"{req.description}\"\"\"

Valid audience ids (choose 3–5 recommendedTargets from these only):
{", ".join(VALID_TARGET_IDS)}

Return JSON exactly shaped as:
{{
  "summary": "2-sentence read on the business",
  "industry": "short label",
  "valueProps": ["...", "..."],
  "toneOfVoice": "short phrase",
  "needs": ["unmet need the AI inferred", "..."],
  "recommendedTargets": [{{"id": "<one of the valid ids>", "reason": "one line"}}]
}}"""
    text = await run_agent(prompt, system, config.ORCHESTRATOR_MODEL)
    data = extract_json(text)
    data["recommendedTargets"] = [
        rt for rt in data.get("recommendedTargets", []) if rt.get("id") in VALID_TARGET_IDS
    ] or _default_recs(req.description)
    return BusinessAnalysis(**data)


def _analyze_mock(req: AnalyzeRequest) -> BusinessAnalysis:
    d = req.description.lower()
    industry = _guess_industry(d)
    needs = []
    if "subscription" in d or "subscriptions" in d:
        needs.append("Convert one-off buyers into subscribers")
    if "explain" in d or "struggle" in d or "quickly" in d:
        needs.append("Explain the core concept faster and more visually")
    if "margin" in d:
        needs.append("Steer demand toward the highest-margin offer")
    if not needs:
        needs = ["Build top-of-funnel awareness", "Turn interest into followers and saves"]

    return BusinessAnalysis(
        summary=(
            f"{req.name or 'This company'} operates in {industry}. "
            "The description suggests strong product substance but room to sharpen "
            "how the value is communicated to the right audiences."
        ),
        industry=industry,
        valueProps=_keyword_props(d),
        toneOfVoice=_guess_tone(d),
        needs=needs,
        recommendedTargets=_default_recs(req.description),
    )


def _default_recs(description: str) -> list[RecommendedTarget]:
    d = description.lower()
    recs: list[tuple[str, str]] = []
    if any(k in d for k in ["eco", "sustain", "plastic", "compost", "green"]):
        recs.append(("eco", "Mission fit — they scrutinize and reward transparent claims."))
    if any(k in d for k in ["dtc", "subscription", "brand", "consumer", "kit"]):
        recs.append(("millennials", "Purchasing power and brand loyalty for DTC."))
    if any(k in d for k in ["dev", "api", "sdk", "tool", "software", "developer"]):
        recs.append(("devs", "Rewards depth and useful tooling over hype."))
    if any(k in d for k in ["b2b", "enterprise", "saas", "roi", "founder", "smb"]):
        recs.append(("founders", "ROI-focused buyers who share practical playbooks."))
    if any(k in d for k in ["food", "recipe", "cook", "snack", "drink"]):
        recs.append(("foodies", "Highly visual and save-driven."))
    if any(k in d for k in ["fitness", "health", "wellness", "gym"]):
        recs.append(("fitness", "Routine-driven with strong visual-progress content."))
    # Always include a broad reach option.
    recs.append(("gen-z", "Cheap, fast reach to seed trends and test hooks."))
    # de-dupe, keep first 4
    seen = set()
    out = []
    for tid, reason in recs:
        if tid in seen:
            continue
        seen.add(tid)
        out.append(RecommendedTarget(id=tid, reason=reason))
        if len(out) >= 4:
            break
    return out


# ───────────────────────────── generate ─────────────────────────────────────
async def generate(req: GenerateRequest) -> list[ContentPiece]:
    pieces: list[ContentPiece] = []
    skills_ctx = skills.skills_context(req.company.userId)
    for target_id in req.targets:
        if target_id not in TARGETS:
            continue
        piece = None
        if config.live_mode():
            try:
                piece = await _generate_live(req, target_id, skills_ctx)
            except Exception as e:  # noqa: BLE001
                print(f"[generate:{target_id}] live failed, using mock: {e}")
        if piece is None:
            piece = _generate_mock(req, target_id)
        pieces.append(piece)
    return pieces


async def _generate_live(
    req: GenerateRequest, target_id: str, skills_ctx: str
) -> ContentPiece:
    persona = persona_for(target_id)
    system = (
        f"You are a ReachLoop content SUBAGENT for the {label_for(target_id)} "
        f"account ({handle_for(target_id)}). Voice: {persona}. "
        "You MUST follow the playbooks below; cite which lessons you used. "
        "Respond with ONLY a JSON object.\n\n"
        f"{skills_ctx}"
    )
    prompt = f"""Company: {req.company.name}
What they do: {req.company.description}
Tone: {req.analysis.toneOfVoice}
Value props: {", ".join(req.analysis.valueProps)}

Write ONE Instagram post for this audience. Return JSON:
{{
  "hook": "first-5-words scroll-stopper",
  "caption": "1 hook line + 2-4 value lines + 1 CTA",
  "hashtags": ["#tag", "..."],
  "visualConcept": "one-line brief for the design subagent",
  "skillsApplied": ["short name of each playbook lesson you used"]
}}"""
    text = await run_agent(prompt, system, config.CONTENT_MODEL)
    data = extract_json(text)
    return ContentPiece(
        targetId=target_id,
        handle=handle_for(target_id),
        hook=data.get("hook", ""),
        caption=data.get("caption", ""),
        hashtags=data.get("hashtags", [])[:8],
        visualConcept=data.get("visualConcept", ""),
        skillsApplied=data.get("skillsApplied", [])[:4],
    )


def _generate_mock(req: GenerateRequest, target_id: str) -> ContentPiece:
    persona = persona_for(target_id)
    name = req.company.name or "the brand"
    prop = (req.analysis.valueProps or ["something genuinely better"])[0]
    local = skills.read_local_skill(req.company.userId)
    applied = ["Hooks", "Saves & follows"]
    if local:
        applied.append("your private playbook")

    hooks = {
        "gen-z": f"pov: {name} actually gets it",
        "eco": f"the part nobody shows about {name}",
        "founders": f"how {name} cuts the busywork",
        "devs": f"{name}, but show me the receipts",
        "foodies": f"save this before {name} sells out",
        "luxury": f"made the slow way at {name}",
    }
    hook = hooks.get(target_id, f"the 5-second case for {name}")

    caption = (
        f"{hook}.\n\n"
        f"{prop} — written for {label_for(target_id).lower()} in a {persona.split(',')[0]} voice.\n"
        f"Here's the one thing to know: {prop.lower()}.\n\n"
        f"Save this if it's useful, and follow {handle_for(target_id)} for more. 👇"
    )
    tag_seed = target_id.replace("-", "")
    hashtags = [f"#{tag_seed}", "#instagood", f"#{(name or 'brand').lower().replace(' ', '')}", "#howto", "#reels"]

    return ContentPiece(
        targetId=target_id,
        handle=handle_for(target_id),
        hook=hook,
        caption=caption,
        hashtags=hashtags,
        visualConcept=(
            f"9:16 reel: 3 quick cuts demonstrating '{prop}', bold on-screen text "
            f"of the hook, palette tuned for {label_for(target_id).lower()}."
        ),
        skillsApplied=applied,
    )


# ───────────────────────────── reach ────────────────────────────────────────
def measure_reach(content: list[ContentPiece]) -> list[ReachReport]:
    """Deterministic reach simulation. Scores content on the same features the
    global playbook optimizes for, so 'better' content visibly earns better
    reach — closing the learning loop without needing a real Instagram API."""
    reports: list[ReachReport] = []
    for p in content:
        score = _score_piece(p)
        rng = random.Random(_seed(p.caption + p.hook))
        base = 1800 + int(score * 140) + rng.randint(-200, 400)
        impressions = max(300, base)
        likes = int(impressions * (0.02 + score / 1000))
        saves = int(impressions * (0.004 + score / 2200))
        follows = int(impressions * (0.0015 + score / 6000))
        reports.append(
            ReachReport(
                targetId=p.targetId,
                handle=p.handle,
                impressions=impressions,
                likes=likes,
                saves=saves,
                follows=follows,
                engagementScore=score,
            )
        )
    return reports


def _score_piece(p: ContentPiece) -> int:
    score = 40
    words = len(p.hook.split())
    if 2 <= words <= 6:
        score += 14  # tight hook
    if 4 <= len(p.hashtags) <= 8:
        score += 10
    cta_words = ("save", "follow", "tag", "comment", "link", "👇")
    if any(w in p.caption.lower() for w in cta_words):
        score += 12
    if 60 <= len(p.caption) <= 600:
        score += 8
    if p.skillsApplied:
        score += min(10, 4 * len(p.skillsApplied))  # leaning on the playbook helps
    # tiny deterministic jitter so accounts differ
    score += _seed(p.caption) % 9
    return max(1, min(100, score))


def _seed(text: str) -> int:
    return int(hashlib.sha256(text.encode("utf-8")).hexdigest(), 16) % 100000


# ───────────────────────────── learn ────────────────────────────────────────
async def learn(req: LearnRequest) -> list[SkillNote]:
    if not req.reach:
        return []
    best = max(req.reach, key=lambda r: r.engagementScore)
    worst = min(req.reach, key=lambda r: r.engagementScore)

    body = None
    if config.live_mode():
        try:
            body = await _learn_live(req, best, worst)
        except Exception as e:  # noqa: BLE001
            print(f"[learn] live failed, using mock: {e}")
    if body is None:
        body = (
            f"{label_for(best.targetId)} content scored {best.engagementScore} vs "
            f"{worst.engagementScore} for {label_for(worst.targetId)}. Lean into the "
            f"structure that worked for {best.handle}: a tight hook, a single clear "
            f"value line, and an explicit save/follow CTA. Apply this pattern more "
            f"aggressively to lower-performing audiences."
        )

    title = f"Reach signal: {label_for(best.targetId)} pattern wins"
    notes = [skills.append_global_lesson(title, body, source="reach")]

    # If one audience badly underperforms, record a private corrective too.
    if best.engagementScore - worst.engagementScore >= 25:
        local_body = (
            f"For {label_for(worst.targetId)} ({worst.handle}), the current angle "
            f"under-reached. Try the {label_for(best.targetId)} structure next round."
        )
        notes.append(
            skills.append_local_lesson(
                req.userId,
                f"Fix underperformer: {label_for(worst.targetId)}",
                local_body,
                source="reach",
            )
        )
    return notes


async def _learn_live(req: LearnRequest, best: ReachReport, worst: ReachReport) -> str:
    system = (
        "You are ReachLoop's learning agent. Given reach metrics, write ONE concise "
        "paragraph (no JSON, no preamble) capturing the single most useful, "
        "generalizable lesson to add to the global content playbook."
    )
    lines = "\n".join(
        f"- {label_for(r.targetId)}: score {r.engagementScore}, "
        f"{r.impressions} impressions, {r.follows} follows"
        for r in req.reach
    )
    prompt = (
        f"Reach this round:\n{lines}\n\n"
        f"Best: {label_for(best.targetId)}. Worst: {label_for(worst.targetId)}. "
        "What should every future post do differently? One paragraph."
    )
    return (await run_agent(prompt, system, config.ORCHESTRATOR_MODEL)).strip()


# ───────────────────────────── feedback ─────────────────────────────────────
async def feedback(req: FeedbackRequest) -> FeedbackResponse:
    # 1) Persist the user's steer to their private playbook.
    note = skills.append_local_lesson(
        req.userId,
        f"Direction for {label_for(req.targetId)}",
        req.idea.strip(),
        source="user-feedback",
    )

    # 2) Regenerate just the affected account, now honoring the new lesson.
    gen_req = GenerateRequest(
        company=req.company,
        analysis=BusinessAnalysis(
            summary="",
            industry="",
            valueProps=[req.idea] if not _has_props(req) else _props(req),
            toneOfVoice="as directed by the user",
            needs=[],
            recommendedTargets=[],
        ),
        targets=[req.targetId],
    )

    new_piece = None
    if config.live_mode():
        try:
            new_piece = await _feedback_live(req)
        except Exception as e:  # noqa: BLE001
            print(f"[feedback] live failed, using mock: {e}")
    if new_piece is None:
        new_piece = _feedback_mock(req)

    updated = [
        new_piece if p.targetId == req.targetId else p for p in req.content
    ]
    if not any(p.targetId == req.targetId for p in req.content):
        updated.append(new_piece)
    return FeedbackResponse(content=updated, skill=note)


async def _feedback_live(req: FeedbackRequest) -> ContentPiece:
    skills_ctx = skills.skills_context(req.userId)
    system = (
        f"You are the ReachLoop content SUBAGENT for {label_for(req.targetId)} "
        f"({handle_for(req.targetId)}). The user just gave new direction; honor it "
        "and the playbooks. Respond with ONLY a JSON object."
        f"\n\n{skills_ctx}"
    )
    prompt = f"""Company: {req.company.name} — {req.company.description}
User's new direction: "{req.idea}"

Rewrite the post for this account. Return JSON with keys:
hook, caption, hashtags (array), visualConcept, skillsApplied (array)."""
    text = await run_agent(prompt, system, config.CONTENT_MODEL)
    data = extract_json(text)
    return ContentPiece(
        targetId=req.targetId,
        handle=handle_for(req.targetId),
        hook=data.get("hook", ""),
        caption=data.get("caption", ""),
        hashtags=data.get("hashtags", [])[:8],
        visualConcept=data.get("visualConcept", ""),
        skillsApplied=(data.get("skillsApplied", []) + ["your private playbook"])[:4],
    )


def _feedback_mock(req: FeedbackRequest) -> ContentPiece:
    name = req.company.name or "the brand"
    hook = f"new direction: {req.idea.strip().split('.')[0][:40]}"
    caption = (
        f"{hook}.\n\n"
        f"You told us to: {req.idea.strip()}\n"
        f"So here's {name} for {label_for(req.targetId).lower()}, that way.\n\n"
        f"Follow {handle_for(req.targetId)} — more in this style coming. 👇"
    )
    return ContentPiece(
        targetId=req.targetId,
        handle=handle_for(req.targetId),
        hook=hook,
        caption=caption,
        hashtags=[f"#{req.targetId.replace('-', '')}", "#newdrop", "#reels", "#fyp"],
        visualConcept=f"Reel reflecting the user's steer: '{req.idea.strip()[:80]}'.",
        skillsApplied=["your private playbook", "Hooks"],
    )


# ───────────────────────────── helpers ──────────────────────────────────────
def _has_props(req: FeedbackRequest) -> bool:
    return False


def _props(req: FeedbackRequest) -> list[str]:
    return [req.idea]


def _guess_industry(d: str) -> str:
    table = [
        (["clean", "home", "refill", "plastic"], "Sustainable consumer goods"),
        (["api", "sdk", "developer", "software", "saas"], "Software / developer tools"),
        (["food", "recipe", "snack", "drink", "cook"], "Food & beverage"),
        (["fitness", "gym", "wellness", "health"], "Health & wellness"),
        (["fashion", "apparel", "clothing", "wear"], "Fashion & apparel"),
        (["finance", "bank", "pay", "invest"], "Fintech"),
    ]
    for keys, label in table:
        if any(k in d for k in keys):
            return label
    return "Consumer brand"


def _guess_tone(d: str) -> str:
    if any(k in d for k in ["sustain", "eco", "mission"]):
        return "earnest & transparent"
    if any(k in d for k in ["dev", "api", "technical"]):
        return "precise & no-nonsense"
    if any(k in d for k in ["luxury", "premium", "craft"]):
        return "refined & understated"
    return "warm & confident"


def _keyword_props(d: str) -> list[str]:
    props = []
    if "refill" in d or "reusable" in d:
        props.append("Refillable system that cuts waste and cost over time")
    if "subscription" in d:
        props.append("Subscription convenience with better unit economics")
    if "compost" in d or "plastic-free" in d:
        props.append("Plastic-free, compostable packaging")
    if not props:
        props = ["A genuinely better product", "Clear, honest value"]
    return props

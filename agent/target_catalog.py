"""Audience catalog — mirrors src/lib/targetGroups.ts.

Each audience carries the persona a content subagent adopts when writing for
that dedicated account.
"""
from __future__ import annotations

TARGETS = {
    "gen-z": {
        "label": "Gen Z (18–24)",
        "handle": "@reach.genz",
        "persona": "punchy, meme-literate, lowercase-friendly, anti-corporate, fast hooks",
    },
    "millennials": {
        "label": "Millennials (25–40)",
        "handle": "@reach.millennial",
        "persona": "story-driven, nostalgic, values-aware, polished but warm",
    },
    "parents": {
        "label": "Parents & Families",
        "handle": "@reach.families",
        "persona": "reassuring, practical, convenience- and safety-led, time-saving",
    },
    "students": {
        "label": "Students",
        "handle": "@reach.campus",
        "persona": "budget-savvy, community-driven, playful, deal-oriented",
    },
    "founders": {
        "label": "Founders & SMB Owners",
        "handle": "@reach.founders",
        "persona": "ROI-focused, no-fluff, practical playbooks, credibility signals",
    },
    "devs": {
        "label": "Developers & Tech",
        "handle": "@reach.builders",
        "persona": "skeptical of hype, precise, depth over polish, shows the how",
    },
    "fitness": {
        "label": "Fitness & Wellness",
        "handle": "@reach.wellness",
        "persona": "motivational, routine-driven, visible progress, morning energy",
    },
    "foodies": {
        "label": "Foodies",
        "handle": "@reach.tastemakers",
        "persona": "sensory, recipe-forward, save-worthy, vivid visuals",
    },
    "luxury": {
        "label": "Luxury & Premium",
        "handle": "@reach.atelier",
        "persona": "restrained, aspirational, craftsmanship-led, sparse and elegant",
    },
    "eco": {
        "label": "Eco-conscious",
        "handle": "@reach.planet",
        "persona": "transparent, mission-aligned, claims backed by specifics, no greenwashing",
    },
    "local": {
        "label": "Local Community",
        "handle": "@reach.local",
        "persona": "neighborly, event-driven, proof from real locals, geo-specific",
    },
    "enterprise": {
        "label": "Enterprise Buyers",
        "handle": "@reach.enterprise",
        "persona": "credible, outcome-led, case-study oriented, risk-aware",
    },
}


def handle_for(target_id: str) -> str:
    return TARGETS.get(target_id, {}).get("handle", f"@reach.{target_id}")


def label_for(target_id: str) -> str:
    return TARGETS.get(target_id, {}).get("label", target_id)


def persona_for(target_id: str) -> str:
    return TARGETS.get(target_id, {}).get("persona", "clear, engaging, audience-aware")

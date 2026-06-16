"""Thin wrapper around the Claude Agent SDK.

Everything that actually talks to Claude goes through `run_agent`. It collects
the assistant's text so callers can parse a JSON payload out of it. If the SDK
isn't available or a call fails, callers fall back to deterministic mocks (see
orchestrator.py), so the product still works end-to-end offline.
"""
from __future__ import annotations

import json
import re
from typing import Any, Optional


async def run_agent(
    prompt: str,
    system_prompt: str,
    model: str,
    allowed_tools: Optional[list[str]] = None,
    cwd: Optional[str] = None,
    agents: Optional[dict] = None,
) -> str:
    """Run a single Claude Agent SDK turn and return its concatenated text."""
    from claude_agent_sdk import (
        query,
        ClaudeAgentOptions,
        AssistantMessage,
        TextBlock,
    )

    options = ClaudeAgentOptions(
        system_prompt=system_prompt,
        model=model,
        allowed_tools=allowed_tools or [],
        permission_mode="bypassPermissions",
        cwd=cwd,
        agents=agents,
    )

    out: list[str] = []
    async for message in query(prompt=prompt, options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, TextBlock):
                    out.append(block.text)
    return "".join(out)


_FENCE = re.compile(r"```(?:json)?\s*(.*?)```", re.DOTALL)


def extract_json(text: str) -> Any:
    """Pull the first JSON object/array out of an agent's text response."""
    fenced = _FENCE.search(text)
    candidate = fenced.group(1) if fenced else text
    candidate = candidate.strip()

    # Try the whole candidate first, then the widest {...} / [...] span.
    for attempt in (candidate, _widest_span(candidate)):
        if not attempt:
            continue
        try:
            return json.loads(attempt)
        except json.JSONDecodeError:
            continue
    raise ValueError("No parseable JSON found in agent response")


def _widest_span(text: str) -> str:
    starts = [i for i, c in enumerate(text) if c in "{["]
    ends = [i for i, c in enumerate(text) if c in "}]"]
    if not starts or not ends:
        return ""
    return text[starts[0] : ends[-1] + 1]

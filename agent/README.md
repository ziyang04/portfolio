# ReachLoop agent service (Python · Claude Agent SDK)

This is the brain of ReachLoop. It exposes the orchestrator, content subagents,
reach simulation, and the self-improving Skills system over a small FastAPI
service that the Next.js app calls.

## What runs where

| Endpoint     | What it does                                                            |
| ------------ | ----------------------------------------------------------------------- |
| `POST /analyze`  | Orchestrator reads the company description → business analysis + recommended audiences. |
| `POST /generate` | One **content subagent per audience** writes a post, reading the global + local Skills as context. |
| `POST /reach`    | Deterministic reach simulation (stands in for the Instagram Graph API). |
| `POST /learn`    | Learning agent turns reach into a new lesson appended to the **global** `SKILL.md` (and a **local** corrective when an audience underperforms). |
| `POST /feedback` | Applies the user's "different idea": saves it to their **local** `SKILL.md` and regenerates that account. |
| `GET  /health`   | Reports `live` vs `mock` mode and the models in use.                    |

## Self-improving Skills

Skills are plain `SKILL.md` files the agents read before writing — the native
Claude Agent SDK pattern:

```
skills/
  global/instagram-content/SKILL.md   # shared by everyone, learned from reach
  users/<userId>/SKILL.md             # private, learned from that user's feedback
```

Because the playbook is a file fed back into every generation, improvements
compound: better notes → better content → better reach → better notes.

## Run it

```bash
cd agent
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Optional — without it the service runs in deterministic MOCK mode.
export ANTHROPIC_API_KEY=sk-ant-...

uvicorn server:app --reload --port 8787
```

> **Live mode** also needs the Claude Code CLI the Agent SDK drives:
> `npm i -g @anthropic-ai/claude-code`. If either the key or the SDK is
> missing, every endpoint transparently falls back to a high-quality mock, so
> the product works end-to-end offline.

Models default to `claude-opus-4-8` (orchestrator/learning) and
`claude-sonnet-4-6` (content subagents); override with `ORCHESTRATOR_MODEL` /
`CONTENT_MODEL`.

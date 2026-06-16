# ReachLoop

**The self-improving social-growth agent.** Tell ReachLoop what your company
does. Our AI analyzes the business and its needs, you choose who to reach from a
full catalog of audiences, and Claude Agent SDK **subagents** create and post
content on accounts tuned to each group — then the system **learns from the
reach** and rewrites its own playbook to do better next time.

> Content creation → distribution → **self-improvement**.

## The loop

1. **Describe** — the user explains, in depth, what the company does.
2. **Analyze** — an orchestrator agent infers the industry, value props, tone,
   and the *needs the user didn't spell out*, then recommends target audiences.
3. **Target** — the user picks from the entire catalog of target reach. Each
   audience maps to a dedicated, voice-tuned Instagram account.
4. **Create & learn** — one content subagent per audience writes posts (reading
   the shared + private Skills). Reach feeds a **global** skill every company
   benefits from; the user's **different ideas** train a **local** skill private
   to them.

## Stack

| Layer            | Tech                                                              |
| ---------------- | ---------------------------------------------------------------- |
| Frontend         | **Next.js** (App Router) + **TailwindCSS**                       |
| API / glue       | **Node** (Next.js route handlers) proxying to the agent service |
| Agents           | **Python** + **Claude Agent SDK** (orchestrator, subagents)     |
| Self-improvement | Filesystem **Skills** (`SKILL.md`) the agents read *and* rewrite |

```
Browser ──> Next.js routes (Node) ──HTTP──> FastAPI (Python)
                                              ├─ orchestrator  (analyze, learn)
                                              ├─ content subagents (per audience)
                                              └─ Skills: global + per-user SKILL.md
```

## Quick start

```bash
# 1) Web app (Next.js + Tailwind)
npm install
cp .env.example .env.local        # AGENT_SERVICE_URL defaults to localhost:8787

# 2) Agent service (Python) — in another terminal
cd agent
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# optional: export ANTHROPIC_API_KEY=sk-ant-...   (omit for offline MOCK mode)
uvicorn server:app --reload --port 8787

# 3) Run the web app
npm run dev        # http://localhost:3000
```

Or run both together once Python deps are installed:

```bash
npm run dev:all
```

**No API key?** Everything still works — the agent service drops into a
deterministic mock so you can click through the full journey offline. Add
`ANTHROPIC_API_KEY` (and `npm i -g @anthropic-ai/claude-code`) to switch on the
real Claude Agent SDK. See [`agent/README.md`](agent/README.md) for details.

"""ReachLoop agent service (FastAPI).

Exposes the Claude Agent SDK orchestrator + content subagents + self-improving
skills to the Next.js (Node) layer. Runs LIVE with an ANTHROPIC_API_KEY, or in
a deterministic MOCK mode without one.

    uvicorn server:app --reload --port 8787
"""
from __future__ import annotations

import config
import orchestrator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import (
    AnalyzeRequest,
    BusinessAnalysis,
    FeedbackRequest,
    FeedbackResponse,
    GenerateRequest,
    LearnRequest,
    ReachRequest,
)

app = FastAPI(title="ReachLoop Agent Service", version="0.1.0")

# The Next.js server proxies to this service, so CORS is not strictly required,
# but allow localhost for direct dev calls / curl.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "ok": True,
        "mode": "live" if config.live_mode() else "mock",
        "orchestratorModel": config.ORCHESTRATOR_MODEL,
        "contentModel": config.CONTENT_MODEL,
    }


@app.post("/analyze", response_model=BusinessAnalysis)
async def analyze(req: AnalyzeRequest):
    return await orchestrator.analyze(req)


@app.post("/generate")
async def generate(req: GenerateRequest):
    return await orchestrator.generate(req)


@app.post("/reach")
def reach(req: ReachRequest):
    return orchestrator.measure_reach(req.content)


@app.post("/learn")
async def learn(req: LearnRequest):
    return await orchestrator.learn(req)


@app.post("/feedback", response_model=FeedbackResponse)
async def feedback(req: FeedbackRequest):
    return await orchestrator.feedback(req)

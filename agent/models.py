"""Request/response schemas. Mirror src/lib/types.ts on the TypeScript side."""
from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel


class Company(BaseModel):
    name: str = ""
    description: str
    userId: str = "anon"


class AnalyzeRequest(BaseModel):
    name: str = ""
    description: str
    userId: str = "anon"


class RecommendedTarget(BaseModel):
    id: str
    reason: str


class BusinessAnalysis(BaseModel):
    summary: str
    industry: str
    valueProps: List[str]
    toneOfVoice: str
    recommendedTargets: List[RecommendedTarget]
    needs: List[str]


class GenerateRequest(BaseModel):
    company: Company
    analysis: BusinessAnalysis
    targets: List[str]


class ContentPiece(BaseModel):
    targetId: str
    handle: str
    caption: str
    hashtags: List[str]
    visualConcept: str
    hook: str
    skillsApplied: List[str] = []


class ReachRequest(BaseModel):
    content: List[ContentPiece]


class ReachReport(BaseModel):
    targetId: str
    handle: str
    impressions: int
    likes: int
    saves: int
    follows: int
    engagementScore: int


class LearnRequest(BaseModel):
    userId: str = "anon"
    reach: List[ReachReport]
    content: List[ContentPiece]


class SkillNote(BaseModel):
    scope: str  # "global" | "local"
    title: str
    body: str
    source: str  # "reach" | "user-feedback" | "seed"
    updatedAt: str


class FeedbackRequest(BaseModel):
    userId: str = "anon"
    company: Company
    targetId: str
    idea: str
    content: List[ContentPiece]


class FeedbackResponse(BaseModel):
    content: List[ContentPiece]
    skill: Optional[SkillNote] = None

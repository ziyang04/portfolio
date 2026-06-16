// Shared types mirrored between the Next.js (Node) layer and the Python
// Claude Agent SDK service. Keep these in sync with agent/models.py.

export type TargetGroup = {
  id: string;
  label: string;
  description: string;
  /** Instagram handle the dedicated, audience-tuned account posts from. */
  handle: string;
  category: "demographic" | "interest" | "lifecycle" | "professional" | "geo";
};

export type BusinessAnalysis = {
  summary: string;
  industry: string;
  valueProps: string[];
  toneOfVoice: string;
  /** Ranked target group ids the AI recommends, with a one-line reason. */
  recommendedTargets: { id: string; reason: string }[];
  needs: string[];
};

export type ContentPiece = {
  targetId: string;
  handle: string;
  caption: string;
  hashtags: string[];
  /** Brief brief for the visual the design subagent would render. */
  visualConcept: string;
  hook: string;
  /** Which skill notes the subagent leaned on while writing this. */
  skillsApplied: string[];
};

export type ReachReport = {
  targetId: string;
  handle: string;
  impressions: number;
  likes: number;
  saves: number;
  follows: number;
  /** 0–100 effectiveness score the learning loop optimizes. */
  engagementScore: number;
};

export type SkillNote = {
  scope: "global" | "local";
  title: string;
  body: string;
  /** What triggered this learning: "reach" or "user-feedback". */
  source: "reach" | "user-feedback" | "seed";
  updatedAt: string;
};

export type Company = {
  name: string;
  description: string;
  userId: string;
};

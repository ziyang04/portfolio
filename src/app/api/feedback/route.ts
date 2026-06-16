import { NextResponse } from "next/server";
import { agentFetch, AgentServiceError } from "@/lib/agentClient";
import type { ContentPiece, SkillNote } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId, company, targetId, idea, content } = await req.json();
  if (!idea || !targetId) {
    return new NextResponse("Tell us your idea and pick an account.", {
      status: 400,
    });
  }
  try {
    const data = await agentFetch<{ content: ContentPiece[]; skill?: SkillNote }>(
      "/feedback",
      { userId, company, targetId, idea, content }
    );
    return NextResponse.json(data);
  } catch (e) {
    const err = e as AgentServiceError;
    return new NextResponse(err.message, { status: err.status ?? 500 });
  }
}

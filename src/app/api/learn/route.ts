import { NextResponse } from "next/server";
import { agentFetch, AgentServiceError } from "@/lib/agentClient";
import type { SkillNote } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId, reach, content } = await req.json();
  if (!Array.isArray(reach) || reach.length === 0) {
    return new NextResponse("Measure reach before learning from it.", {
      status: 400,
    });
  }
  try {
    const skills = await agentFetch<SkillNote[]>("/learn", {
      userId,
      reach,
      content,
    });
    return NextResponse.json(skills);
  } catch (e) {
    const err = e as AgentServiceError;
    return new NextResponse(err.message, { status: err.status ?? 500 });
  }
}

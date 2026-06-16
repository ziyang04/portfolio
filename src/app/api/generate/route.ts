import { NextResponse } from "next/server";
import { agentFetch, AgentServiceError } from "@/lib/agentClient";
import type { ContentPiece } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { company, analysis, targets } = await req.json();
  if (!Array.isArray(targets) || targets.length === 0) {
    return new NextResponse("Select at least one audience.", { status: 400 });
  }
  try {
    const content = await agentFetch<ContentPiece[]>("/generate", {
      company,
      analysis,
      targets,
    });
    return NextResponse.json(content);
  } catch (e) {
    const err = e as AgentServiceError;
    return new NextResponse(err.message, { status: err.status ?? 500 });
  }
}

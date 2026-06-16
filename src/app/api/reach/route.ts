import { NextResponse } from "next/server";
import { agentFetch, AgentServiceError } from "@/lib/agentClient";
import type { ReachReport } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { content } = await req.json();
  try {
    const reach = await agentFetch<ReachReport[]>("/reach", { content });
    return NextResponse.json(reach);
  } catch (e) {
    const err = e as AgentServiceError;
    return new NextResponse(err.message, { status: err.status ?? 500 });
  }
}

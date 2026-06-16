import { NextResponse } from "next/server";
import { agentFetch, AgentServiceError } from "@/lib/agentClient";
import type { BusinessAnalysis } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { name, description, userId } = await req.json();
  if (!description || description.trim().length < 20) {
    return new NextResponse("Please describe your company in more detail.", {
      status: 400,
    });
  }
  try {
    const analysis = await agentFetch<BusinessAnalysis>("/analyze", {
      name,
      description,
      userId,
    });
    return NextResponse.json(analysis);
  } catch (e) {
    const err = e as AgentServiceError;
    return new NextResponse(err.message, { status: err.status ?? 500 });
  }
}

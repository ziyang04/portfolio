// Server-side helper used by the Next.js API routes (Node runtime) to talk to
// the Python Claude Agent SDK service. Centralizes the base URL + a graceful
// error shape so every route behaves consistently.

const BASE_URL = process.env.AGENT_SERVICE_URL ?? "http://localhost:8787";

export class AgentServiceError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function agentFetch<T>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      ...init,
    });
  } catch (e) {
    throw new AgentServiceError(
      `Could not reach the agent service at ${BASE_URL}. Is the Python service running (npm run agent)?`,
      503
    );
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new AgentServiceError(detail || "Agent service error", res.status);
  }
  return (await res.json()) as T;
}

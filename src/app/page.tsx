"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import Spinner from "@/components/Spinner";
import { getUserId, saveJourney, resetJourney } from "@/lib/clientStore";
import type { BusinessAnalysis } from "@/lib/types";

const EXAMPLE = `We're Lumen, a DTC brand making refillable, plastic-free home cleaning products. Customers buy a starter kit once, then top up with cheap concentrate refills shipped in compostable packs. We're stronger on sustainability than convenience, and we struggle to explain "refillable" quickly. Margins are best on subscriptions.`;

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    setError(null);
    setLoading(true);
    resetJourney();
    try {
      const userId = getUserId();
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, description, userId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const analysis = (await res.json()) as BusinessAnalysis;
      saveJourney({
        company: { name, description, userId },
        analysis,
        selectedTargets: analysis.recommendedTargets.map((t) => t.id),
      });
      router.push("/targets");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Stepper active={1} />

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us, in depth, what your company does.
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Our AI reads your business and its needs, recommends exactly who you
            should reach, then spins up subagents that create and post content
            on accounts built for each audience — and{" "}
            <span className="text-accent">learns from the reach</span> to get
            better over time.
          </p>

          <div className="card mt-6">
            <label className="label">Company name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lumen"
              className="mt-1 w-full rounded-xl border border-edge bg-ink/60 px-3 py-2.5 outline-none focus:border-brand"
            />

            <div className="mt-4 flex items-center justify-between">
              <label className="label">
                What do you do? Be specific — products, customers, edge, pains.
              </label>
              <button
                onClick={() => setDescription(EXAMPLE)}
                className="text-xs text-brand-soft hover:underline"
              >
                Use an example
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              placeholder="The more you tell us, the sharper the analysis…"
              className="mt-1 w-full resize-y rounded-xl border border-edge bg-ink/60 px-3 py-2.5 outline-none focus:border-brand"
            />

            {error && (
              <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={analyze}
                disabled={loading || description.trim().length < 20}
                className="btn-primary"
              >
                {loading ? <Spinner label="Analyzing business…" /> : "Analyze my business →"}
              </button>
              <span className="text-xs text-slate-500">
                {description.trim().length < 20
                  ? "Add a bit more detail to continue"
                  : "Step 1 of 4"}
              </span>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <HowItWorks />
        </aside>
      </section>
    </div>
  );
}

function HowItWorks() {
  const items = [
    {
      t: "1 · Business analysis",
      d: "An orchestrator agent extracts your industry, value props, tone and the needs you didn't spell out.",
    },
    {
      t: "2 · You choose the reach",
      d: "Pick from the full catalog of target audiences. Each maps to a dedicated, audience-tuned account.",
    },
    {
      t: "3 · Subagents create & post",
      d: "One content subagent per audience writes captions, hooks and visual briefs in that audience's voice.",
    },
    {
      t: "4 · It self-improves",
      d: "Reach feeds a global skill the whole platform shares; your feedback trains a local skill just for you.",
    },
  ];
  return (
    <div className="card">
      <p className="label">How ReachLoop works</p>
      <ul className="mt-3 space-y-4">
        {items.map((i) => (
          <li key={i.t}>
            <p className="font-medium text-slate-100">{i.t}</p>
            <p className="text-sm text-slate-400">{i.d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-lg border border-edge bg-ink/50 px-3 py-2 text-xs text-slate-400">
        Powered by the <span className="text-brand-soft">Claude Agent SDK</span>:
        orchestrator + subagents + filesystem Skills that the agents rewrite as
        they learn.
      </p>
    </div>
  );
}

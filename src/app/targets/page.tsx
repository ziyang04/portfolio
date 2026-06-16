"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import Spinner from "@/components/Spinner";
import { TARGET_GROUPS } from "@/lib/targetGroups";
import { loadJourney, saveJourney } from "@/lib/clientStore";
import type { BusinessAnalysis, Company, ContentPiece } from "@/lib/types";

export default function TargetsPage() {
  const router = useRouter();
  const [company, setCompany] = useState<Company>();
  const [analysis, setAnalysis] = useState<BusinessAnalysis>();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const j = loadJourney();
    if (!j.analysis || !j.company) {
      router.replace("/");
      return;
    }
    setCompany(j.company);
    setAnalysis(j.analysis);
    setSelected(j.selectedTargets);
  }, [router]);

  const reasons = useMemo(() => {
    const map: Record<string, string> = {};
    analysis?.recommendedTargets.forEach((r) => (map[r.id] = r.reason));
    return map;
  }, [analysis]);

  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }

  async function generate() {
    if (!company || !analysis) return;
    setError(null);
    setLoading(true);
    saveJourney({ selectedTargets: selected });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ company, analysis, targets: selected }),
      });
      if (!res.ok) throw new Error(await res.text());
      const content = (await res.json()) as ContentPiece[];
      saveJourney({ content, reach: [] });
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message ?? "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  if (!analysis) return null;

  return (
    <div>
      <Stepper active={3} />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="card h-fit">
          <p className="label">Business analysis</p>
          <p className="mt-1 text-sm text-slate-200">{analysis.summary}</p>

          <p className="label mt-5">Industry</p>
          <p className="text-sm text-slate-200">{analysis.industry}</p>

          <p className="label mt-5">Value props</p>
          <ul className="mt-1 space-y-1">
            {analysis.valueProps.map((v) => (
              <li key={v} className="text-sm text-slate-300">
                • {v}
              </li>
            ))}
          </ul>

          <p className="label mt-5">Needs the AI spotted</p>
          <ul className="mt-1 space-y-1">
            {analysis.needs.map((n) => (
              <li key={n} className="text-sm text-slate-300">
                • {n}
              </li>
            ))}
          </ul>

          <p className="label mt-5">Tone of voice</p>
          <span className="pill mt-1">{analysis.toneOfVoice}</span>
        </section>

        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Choose your reach</h2>
              <p className="text-sm text-slate-400">
                Recommended audiences are pre-selected. Add or remove any. Each
                maps to a dedicated account a subagent posts from.
              </p>
            </div>
            <span className="pill">{selected.length} selected</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TARGET_GROUPS.map((t) => {
              const on = selected.includes(t.id);
              const recommended = t.id in reasons;
              return (
                <button
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  className={[
                    "card text-left transition",
                    on
                      ? "border-brand/70 ring-1 ring-brand/40"
                      : "hover:border-edge/80",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.label}</span>
                    <span
                      className={[
                        "grid h-5 w-5 place-items-center rounded-md border text-[11px]",
                        on
                          ? "border-brand bg-brand text-white"
                          : "border-edge text-transparent",
                      ].join(" ")}
                    >
                      ✓
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{t.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="pill">{t.handle}</span>
                    {recommended && (
                      <span className="pill border-accent/40 text-accent">
                        recommended
                      </span>
                    )}
                  </div>
                  {recommended && (
                    <p className="mt-2 text-xs text-slate-400">
                      <span className="text-accent">Why:</span> {reasons[t.id]}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={generate}
              disabled={loading || selected.length === 0}
              className="btn-primary"
            >
              {loading ? (
                <Spinner label={`Summoning ${selected.length} subagents…`} />
              ) : (
                `Create content for ${selected.length} audiences →`
              )}
            </button>
            <button onClick={() => router.push("/")} className="btn-ghost">
              Back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

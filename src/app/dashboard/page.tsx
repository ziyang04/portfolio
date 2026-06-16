"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import Spinner from "@/components/Spinner";
import { targetById } from "@/lib/targetGroups";
import { loadJourney, saveJourney, getUserId } from "@/lib/clientStore";
import type {
  BusinessAnalysis,
  Company,
  ContentPiece,
  ReachReport,
  SkillNote,
} from "@/lib/types";
import FeedbackPanel from "@/components/FeedbackPanel";

export default function DashboardPage() {
  const router = useRouter();
  const [company, setCompany] = useState<Company>();
  const [analysis, setAnalysis] = useState<BusinessAnalysis>();
  const [content, setContent] = useState<ContentPiece[]>([]);
  const [reach, setReach] = useState<ReachReport[]>([]);
  const [skills, setSkills] = useState<SkillNote[]>([]);
  const [busy, setBusy] = useState<null | "reach" | "learn">(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const j = loadJourney();
    if (!j.company || !j.analysis || j.content.length === 0) {
      router.replace("/");
      return;
    }
    setCompany(j.company);
    setAnalysis(j.analysis);
    setContent(j.content);
    setReach(j.reach);
    setSkills(j.skills);
  }, [router]);

  async function measureReach() {
    setBusy("reach");
    setError(null);
    try {
      const res = await fetch("/api/reach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error(await res.text());
      const r = (await res.json()) as ReachReport[];
      setReach(r);
      saveJourney({ reach: r });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  async function learn() {
    if (!company) return;
    setBusy("learn");
    setError(null);
    try {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: getUserId(), reach, content }),
      });
      if (!res.ok) throw new Error(await res.text());
      const newSkills = (await res.json()) as SkillNote[];
      const merged = dedupeSkills([...newSkills, ...skills]);
      setSkills(merged);
      saveJourney({ skills: merged });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  if (!company || !analysis) return null;

  const accounts = groupByAccount(content);
  const reachByTarget: Record<string, ReachReport> = {};
  reach.forEach((r) => (reachByTarget[r.targetId] = r));

  return (
    <div>
      <Stepper active={4} />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{company.name} · growth desk</h1>
          <p className="text-sm text-slate-400">
            {accounts.length} subagents are posting across{" "}
            {accounts.length} audience-tuned accounts.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={measureReach} disabled={busy !== null} className="btn-ghost">
            {busy === "reach" ? (
              <Spinner label="Measuring reach…" />
            ) : (
              "Simulate posting & measure reach"
            )}
          </button>
          <button
            onClick={learn}
            disabled={busy !== null || reach.length === 0}
            className="btn-primary"
            title={reach.length === 0 ? "Measure reach first" : ""}
          >
            {busy === "learn" ? <Spinner label="Improving skills…" /> : "Learn from reach ↻"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Accounts + content */}
        <section className="space-y-4">
          {accounts.map((acc) => {
            const t = targetById(acc.targetId);
            const r = reachByTarget[acc.targetId];
            return (
              <article key={acc.targetId} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t?.label}</p>
                    <p className="text-xs text-slate-400">{acc.handle}</p>
                  </div>
                  {r ? (
                    <ReachBadge report={r} />
                  ) : (
                    <span className="pill">not posted yet</span>
                  )}
                </div>

                <div className="mt-4 space-y-4">
                  {acc.pieces.map((p, i) => (
                    <ContentCard key={i} piece={p} />
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        {/* Right rail: learning + feedback */}
        <aside className="space-y-4">
          <FeedbackPanel
            company={company}
            content={content}
            onUpdated={(updated, note) => {
              setContent(updated);
              saveJourney({ content: updated });
              if (note) {
                const merged = dedupeSkills([note, ...skills]);
                setSkills(merged);
                saveJourney({ skills: merged });
              }
            }}
          />
          <SkillsPanel skills={skills} />
        </aside>
      </div>
    </div>
  );
}

function ReachBadge({ report }: { report: ReachReport }) {
  const tone =
    report.engagementScore >= 70
      ? "border-accent/50 text-accent"
      : report.engagementScore >= 45
        ? "border-amber-400/50 text-amber-300"
        : "border-red-400/50 text-red-300";
  return (
    <div className="text-right">
      <span className={`pill ${tone}`}>score {report.engagementScore}</span>
      <p className="mt-1 text-xs text-slate-400">
        {report.impressions.toLocaleString()} reached · {report.follows} follows
      </p>
    </div>
  );
}

function ContentCard({ piece }: { piece: ContentPiece }) {
  return (
    <div className="rounded-xl border border-edge bg-ink/40 p-4">
      <p className="text-xs uppercase tracking-wide text-brand-soft">Hook</p>
      <p className="font-medium">{piece.hook}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
        {piece.caption}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {piece.hashtags.map((h) => (
          <span key={h} className="text-xs text-brand-soft">
            {h.startsWith("#") ? h : `#${h}`}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-edge bg-panel/60 px-3 py-2">
        <p className="label">Visual concept</p>
        <p className="text-sm text-slate-300">{piece.visualConcept}</p>
      </div>
      {piece.skillsApplied.length > 0 && (
        <p className="mt-2 text-xs text-slate-500">
          skills applied: {piece.skillsApplied.join(", ")}
        </p>
      )}
    </div>
  );
}

function SkillsPanel({ skills }: { skills: SkillNote[] }) {
  return (
    <div className="card">
      <p className="label">Self-improving skills</p>
      <p className="mt-1 text-xs text-slate-400">
        Global skills are shared by every company on ReachLoop. Local skills are
        private to you.
      </p>
      {skills.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">
          Measure reach, then hit “Learn from reach” to watch the agent rewrite
          its own playbook.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {skills.map((s, i) => (
            <li key={i} className="rounded-lg border border-edge bg-ink/40 p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{s.title}</span>
                <span
                  className={[
                    "pill",
                    s.scope === "global"
                      ? "border-brand/50 text-brand-soft"
                      : "border-accent/50 text-accent",
                  ].join(" ")}
                >
                  {s.scope}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{s.body}</p>
              <p className="mt-1 text-[11px] text-slate-500">
                learned from {s.source}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Account = { targetId: string; handle: string; pieces: ContentPiece[] };

function groupByAccount(content: ContentPiece[]): Account[] {
  const map = new Map<string, Account>();
  for (const p of content) {
    const a = map.get(p.targetId) ?? {
      targetId: p.targetId,
      handle: p.handle,
      pieces: [],
    };
    a.pieces.push(p);
    map.set(p.targetId, a);
  }
  return [...map.values()];
}

function dedupeSkills(skills: SkillNote[]): SkillNote[] {
  const seen = new Set<string>();
  const out: SkillNote[] = [];
  for (const s of skills) {
    const key = `${s.scope}:${s.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out.slice(0, 8);
}

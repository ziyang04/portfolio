"use client";

import { useState } from "react";
import Spinner from "@/components/Spinner";
import { TARGET_GROUPS } from "@/lib/targetGroups";
import { getUserId } from "@/lib/clientStore";
import type { Company, ContentPiece, SkillNote } from "@/lib/types";

// The "different ideas" channel. The user steers the AI; the agent regenerates
// the affected account's content AND writes the lesson into that user's local
// skill so future content reflects the preference automatically.
export default function FeedbackPanel({
  company,
  content,
  onUpdated,
}: {
  company: Company;
  content: ContentPiece[];
  onUpdated: (updated: ContentPiece[], note?: SkillNote) => void;
}) {
  const usedTargets = Array.from(new Set(content.map((c) => c.targetId)));
  const [targetId, setTargetId] = useState(usedTargets[0] ?? "");
  const [idea, setIdea] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    if (!idea.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: getUserId(),
          company,
          targetId,
          idea,
          content,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        content: ContentPiece[];
        skill?: SkillNote;
      };
      onUpdated(data.content, data.skill);
      setIdea("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <p className="label">Got a different idea?</p>
      <p className="mt-1 text-xs text-slate-400">
        Tell the AI what you want. It rewrites that account’s content and saves
        the preference to your private skill.
      </p>

      <label className="label mt-4 block">Which account</label>
      <select
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        className="mt-1 w-full rounded-xl border border-edge bg-ink/60 px-3 py-2 text-sm outline-none focus:border-brand"
      >
        {usedTargets.map((id) => {
          const t = TARGET_GROUPS.find((x) => x.id === id);
          return (
            <option key={id} value={id}>
              {t?.label ?? id} · {t?.handle}
            </option>
          );
        })}
      </select>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        rows={4}
        placeholder="e.g. Lean into humor and behind-the-scenes; drop the eco-guilt angle."
        className="mt-3 w-full resize-y rounded-xl border border-edge bg-ink/60 px-3 py-2 text-sm outline-none focus:border-brand"
      />

      {error && (
        <p className="mt-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}

      <button onClick={send} disabled={busy || !idea.trim()} className="btn-primary mt-3 w-full">
        {busy ? <Spinner label="Applying & learning…" /> : "Apply my idea"}
      </button>
    </div>
  );
}

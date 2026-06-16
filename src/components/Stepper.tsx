const STEPS = [
  { n: 1, label: "Describe" },
  { n: 2, label: "Analyze" },
  { n: 3, label: "Target" },
  { n: 4, label: "Create & learn" },
];

export default function Stepper({ active }: { active: number }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      {STEPS.map((s, i) => {
        const state =
          s.n < active ? "done" : s.n === active ? "active" : "todo";
        return (
          <li key={s.n} className="flex items-center gap-2">
            <span
              className={[
                "grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold",
                state === "active"
                  ? "border-brand bg-brand text-white"
                  : state === "done"
                    ? "border-accent/60 bg-accent/15 text-accent"
                    : "border-edge text-slate-400",
              ].join(" ")}
            >
              {state === "done" ? "✓" : s.n}
            </span>
            <span
              className={
                state === "todo" ? "text-slate-500" : "text-slate-200"
              }
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-6 bg-edge" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReachLoop — the self-improving social growth agent",
  description:
    "Describe your company. Our AI analyzes the business, you pick who to reach, and subagents create & post content — then learn from the reach to get better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-100 antialiased">
        <header className="border-b border-edge/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white shadow-glow">
                ↻
              </span>
              ReachLoop
            </Link>
            <nav className="flex items-center gap-1 text-sm text-slate-300">
              <Link href="/" className="rounded-lg px-3 py-1.5 hover:bg-white/5">
                Start
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-1.5 hover:bg-white/5"
              >
                Dashboard
              </Link>
              <Link
                href="https://docs.claude.com/en/api/agent-sdk"
                className="rounded-lg px-3 py-1.5 text-slate-400 hover:bg-white/5"
              >
                Agent SDK
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-5 py-10 text-xs text-slate-500">
          Built on the Claude Agent SDK · content creation → distribution →
          self-improvement
        </footer>
      </body>
    </html>
  );
}

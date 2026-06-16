"use client";

// Tiny localStorage-backed store so the multi-step journey (describe →
// analyze → target → dashboard) survives navigation and refreshes without a
// database. A real deployment would swap this for the user's account record.

import type {
  BusinessAnalysis,
  Company,
  ContentPiece,
  ReachReport,
  SkillNote,
} from "./types";

export type JourneyState = {
  company?: Company;
  analysis?: BusinessAnalysis;
  selectedTargets: string[];
  content: ContentPiece[];
  reach: ReachReport[];
  skills: SkillNote[];
};

const KEY = "reachloop:journey";

const empty: JourneyState = {
  selectedTargets: [],
  content: [],
  reach: [],
  skills: [],
};

export function loadJourney(): JourneyState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function saveJourney(state: Partial<JourneyState>) {
  if (typeof window === "undefined") return;
  const next = { ...loadJourney(), ...state };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function resetJourney() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/** Stable anonymous id so per-user (local) skills accrue across sessions. */
export function getUserId(): string {
  if (typeof window === "undefined") return "anon";
  let id = window.localStorage.getItem("reachloop:uid");
  if (!id) {
    id = "u_" + Math.random().toString(36).slice(2, 10);
    window.localStorage.setItem("reachloop:uid", id);
  }
  return id;
}

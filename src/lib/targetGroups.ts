import type { TargetGroup } from "./types";

// The full catalog of target reach the user picks from. Each one maps to a
// dedicated Instagram account that a content subagent is specialized to post
// from, tuned to that audience's voice and posting patterns.
export const TARGET_GROUPS: TargetGroup[] = [
  {
    id: "gen-z",
    label: "Gen Z (18–24)",
    description: "Trend-native, short-form first, values authenticity and humor.",
    handle: "@reach.genz",
    category: "demographic",
  },
  {
    id: "millennials",
    label: "Millennials (25–40)",
    description: "Purchasing power, brand-loyal, responds to story-driven content.",
    handle: "@reach.millennial",
    category: "demographic",
  },
  {
    id: "parents",
    label: "Parents & Families",
    description: "Time-poor, trust-led, motivated by convenience and safety.",
    handle: "@reach.families",
    category: "lifecycle",
  },
  {
    id: "students",
    label: "Students",
    description: "Budget-conscious, community-driven, peak engagement late evenings.",
    handle: "@reach.campus",
    category: "demographic",
  },
  {
    id: "founders",
    label: "Founders & SMB Owners",
    description: "ROI-focused, B2B intent, values practical playbooks.",
    handle: "@reach.founders",
    category: "professional",
  },
  {
    id: "devs",
    label: "Developers & Tech",
    description: "Skeptical of hype, rewards depth, shares useful tooling.",
    handle: "@reach.builders",
    category: "professional",
  },
  {
    id: "fitness",
    label: "Fitness & Wellness",
    description: "Routine-driven, visual progress content, morning engagement.",
    handle: "@reach.wellness",
    category: "interest",
  },
  {
    id: "foodies",
    label: "Foodies",
    description: "Highly visual, saves recipes, strong reel completion rates.",
    handle: "@reach.tastemakers",
    category: "interest",
  },
  {
    id: "luxury",
    label: "Luxury & Premium",
    description: "Aspirational, craftsmanship-led, low frequency / high polish.",
    handle: "@reach.atelier",
    category: "interest",
  },
  {
    id: "eco",
    label: "Eco-conscious",
    description: "Mission-aligned, scrutinizes claims, rewards transparency.",
    handle: "@reach.planet",
    category: "interest",
  },
  {
    id: "local",
    label: "Local Community",
    description: "Geo-targeted, event-driven, responds to neighborhood proof.",
    handle: "@reach.local",
    category: "geo",
  },
  {
    id: "enterprise",
    label: "Enterprise Buyers",
    description: "Committee-led, risk-averse, values credibility and case studies.",
    handle: "@reach.enterprise",
    category: "professional",
  },
];

export const targetById = (id: string): TargetGroup | undefined =>
  TARGET_GROUPS.find((t) => t.id === id);

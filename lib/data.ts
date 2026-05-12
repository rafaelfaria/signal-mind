export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: "good" | "neutral" | "warning";
};

export type Opportunity = {
  title: string;
  channel: string;
  workspace: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  summary: string;
};

export type Draft = {
  title: string;
  assignee: string;
  channel: string;
  status: string;
  scheduled: string;
};

export const metrics: Metric[] = [
  { label: "Open opportunities", value: "48", delta: "+12% vs yesterday", tone: "good" },
  { label: "Ready to approve", value: "9", delta: "2 urgent", tone: "warning" },
  { label: "Median response time", value: "41m", delta: "down 18m", tone: "good" },
  { label: "Automation coverage", value: "67%", delta: "3 active playbooks", tone: "neutral" },
];

export const opportunities: Opportunity[] = [
  {
    title: "Founders asking how to grow a niche community",
    channel: "Reddit",
    workspace: "The Club House",
    priority: "High",
    status: "Needs draft",
    summary: "High-intent thread with room for a practical founder response and zero hard sell.",
  },
  {
    title: "Repeat question about event structure and social format",
    channel: "Forum",
    workspace: "The Club House",
    priority: "Medium",
    status: "Can automate",
    summary: "Good candidate for a reusable answer template with light personalization.",
  },
  {
    title: "Warm mention from previous attendee",
    channel: "X / Twitter",
    workspace: "The Club House",
    priority: "Medium",
    status: "Awaiting review",
    summary: "Positive sentiment. Worth a fast human-style reply to keep momentum.",
  },
];

export const drafts: Draft[] = [
  {
    title: "Friendly answer on community growth thread",
    assignee: "Mate",
    channel: "Reddit",
    status: "Pending approval",
    scheduled: "Today · 16:30",
  },
  {
    title: "Event explainer for recurring format question",
    assignee: "Raf",
    channel: "Forum",
    status: "Ready for polish",
    scheduled: "Today · 17:00",
  },
  {
    title: "Short social proof reply to attendee mention",
    assignee: "Mate",
    channel: "X / Twitter",
    status: "Scheduled",
    scheduled: "Tomorrow · 09:15",
  },
];

export const roadmap = [
  "Adapter SDK for Reddit, X, Discord, and forum ingestion",
  "Prisma-backed multi-tenant persistence",
  "Worker queue for ingestion, pacing, approvals, and publishing",
  "Role-based approval flows and audit history",
  "Analytics layer for reply quality, conversion, and channel ROI",
];

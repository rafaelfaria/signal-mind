import { prisma } from "@/lib/prisma";

export type InboxItem = {
  id: string;
  title: string;
  preview: string;
  source: string;
  workspace: string;
  age: string;
  status: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  channel: string;
  tags: string[];
};

export type DraftSummary = {
  title: string;
  body: string;
  status: string;
  channel: string;
  assignee: string;
};

export type WorkspaceSummary = {
  name: string;
  initials: string;
  unread: number;
  openOpportunities: number;
  readyDrafts: number;
  activeChannels: number;
};

export type InboxViewData = {
  workspace: WorkspaceSummary;
  items: InboxItem[];
  selected: InboxItem;
  drafts: DraftSummary[];
};

export type DraftsViewData = {
  workspace: WorkspaceSummary;
  drafts: DraftSummary[];
};

function toInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}

const fallbackItems: InboxItem[] = [
  {
    id: "fallback-1",
    title: "Founder asking how to grow a poker community",
    preview: "Strong fit for a practical reply about retention loops, regular cadence, and bringing one friend.",
    source: "Reddit · r/poker",
    workspace: "The Club House",
    age: "23m",
    status: "Needs draft",
    assignee: "Mate",
    priority: "high",
    channel: "Reddit",
    tags: ["High intent", "Founder", "Top priority"],
  },
  {
    id: "fallback-2",
    title: "Repeat question about event structure and social format",
    preview: "Could be handled with a reusable answer plus a short human intro.",
    source: "Forum · Community",
    workspace: "The Club House",
    age: "1h",
    status: "Can automate",
    assignee: "Raf",
    priority: "medium",
    channel: "Forum",
    tags: ["Template candidate", "Repeat topic"],
  },
  {
    id: "fallback-3",
    title: "Warm mention from a previous attendee",
    preview: "Short thank-you and a natural follow-up question would keep momentum without sounding salesy.",
    source: "X / Twitter",
    workspace: "The Club House",
    age: "3h",
    status: "Awaiting review",
    assignee: "Mate",
    priority: "medium",
    channel: "X / Twitter",
    tags: ["Social proof", "Fast reply"],
  },
];

const fallbackDrafts: DraftSummary[] = [
  {
    title: "Helpful founder reply draft",
    body: "A good first move is to design the game night so regulars want to bring one friend. Tight format, reliable timing, and a simple onboarding flow usually beat bigger promo pushes early on.",
    status: "Pending approval",
    channel: "Reddit",
    assignee: "Mate",
  },
  {
    title: "Event explainer for recurring format question",
    body: "If the goal is social poker, the structure matters as much as the buy-in. A predictable start time, clean blind levels, and a simple RSVP loop usually do more than another promo post.",
    status: "Ready for polish",
    channel: "Forum",
    assignee: "Raf",
  },
];

export async function getInboxViewData(): Promise<InboxViewData> {
  try {
    const [workspaces, channelsCount, openOpportunities, readyDrafts, opportunities, drafts] = await Promise.all([
      prisma.workspace.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.channel.count({ where: { isActive: true } }),
      prisma.opportunity.count({ where: { status: { in: ["new", "triaged", "drafting", "awaiting_approval"] } } }),
      prisma.draft.count({ where: { status: { in: ["draft", "pending_review", "pending_approval", "approved"] } } }),
      prisma.opportunity.findMany({
        include: { workspace: true, channel: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.draft.findMany({
        include: { channel: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

    const activeWorkspace = workspaces[0];
    const items: InboxItem[] = opportunities.length
      ? opportunities.map((item) => ({
          id: item.id,
          title: item.title,
          preview: item.summary || "No summary yet.",
          source: `${item.channel.name}${item.authorHandle ? ` · @${item.authorHandle}` : ""}`,
          workspace: item.workspace.name,
          age: timeAgo(item.createdAt),
          status: item.status.replaceAll("_", " "),
          assignee: item.priority >= 80 ? "Mate" : "Raf",
          priority: item.priority >= 80 ? "high" as const : item.priority >= 50 ? "medium" as const : "low" as const,
          channel: item.channel.name,
          tags: [item.channel.kind, item.priority >= 80 ? "High priority" : "Queued"],
        }))
      : fallbackItems;

    const draftItems = drafts.length
      ? drafts.map((draft) => ({
          title: draft.title,
          body: draft.body,
          status: draft.status.replaceAll("_", " "),
          channel: draft.channel.name,
          assignee: draft.assignedTo || "Unassigned",
        }))
      : fallbackDrafts;

    return {
      workspace: {
        name: activeWorkspace?.name || "The Club House",
        initials: toInitials(activeWorkspace?.name || "The Club House"),
        unread: items.length,
        openOpportunities,
        readyDrafts,
        activeChannels: channelsCount,
      },
      selected: items[0],
      items,
      drafts: draftItems,
    };
  } catch {
    return {
      workspace: {
        name: "The Club House",
        initials: "TCH",
        unread: fallbackItems.length,
        openOpportunities: 14,
        readyDrafts: 4,
        activeChannels: 3,
      },
      items: fallbackItems,
      selected: fallbackItems[0],
      drafts: fallbackDrafts,
    };
  }
}

export async function getDraftsViewData(): Promise<DraftsViewData> {
  const inbox = await getInboxViewData();
  return {
    workspace: inbox.workspace,
    drafts: inbox.drafts,
  };
}

export function getSettingsSections() {
  return [
    {
      title: "General",
      items: [
        { label: "Default home view", description: "Where operators land when they open Signal Mind.", value: "Inbox" },
        { label: "Display density", description: "Controls how much queue and conversation context is visible.", value: "Comfortable" },
        { label: "First day of the week", description: "Used for schedules, reporting, and planner views.", value: "Monday" },
      ],
    },
    {
      title: "Interface and theme",
      items: [
        { label: "Sidebar layout", description: "Keep workspace navigation, inbox, and settings accessible from one rail.", value: "Expanded" },
        { label: "Font size", description: "Global typography scale for the operator workspace.", value: "Default" },
        { label: "Use pointer cursors", description: "Makes the UI feel more app-like on dense interactive surfaces.", toggle: false },
      ],
    },
    {
      title: "Workspace management",
      items: [
        { label: "New user invitations", description: "Who can invite new members into the workspace.", value: "Only admins" },
        { label: "Team creation", description: "Who can create new teams or client pods inside Signal Mind.", value: "All members" },
        { label: "Manage templates", description: "Controls who can update shared drafting and reply templates.", value: "All members" },
      ],
    },
  ];
}

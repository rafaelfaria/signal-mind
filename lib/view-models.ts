export type PriorityTone = "high" | "medium" | "low";

export type InboxItem = {
  id: string;
  title: string;
  preview: string;
  source: string;
  workspace: string;
  age: string;
  status: string;
  assignee: string;
  priority: PriorityTone;
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

export type SettingsViewData = {
  workspace: WorkspaceSummary;
};

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

export type SettingsNavItem = {
  label: string;
  active?: boolean;
};

export type SettingsNavGroup = {
  title: string;
  items: SettingsNavItem[];
};

export type SettingsSelectItem = {
  label: string;
  description: string;
  value: string;
};

export type SettingsToggleItem = {
  label: string;
  description: string;
  toggle: boolean;
};

export type SettingsItem = SettingsSelectItem | SettingsToggleItem;

export type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

export type SettingsViewData = {
  workspace: WorkspaceSummary;
  navGroups: SettingsNavGroup[];
  sections: SettingsSection[];
};

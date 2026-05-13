"use client";

import { ReactNode, useMemo, useState } from "react";
import { MiniIcon, NavIcon, type IconName } from "@/components/icons";
import {
  HeaderAction,
  SidebarNavItem,
  SurfaceSection,
  ToolButton,
  WorkspaceBadge,
} from "@/components/shell-primitives";
import type {
  DraftSummary,
  InboxItem,
  SettingsNavGroup,
  SettingsSection,
  WorkspaceSummary,
} from "@/lib/view-models";

function MobileTopbar({ workspace }: { workspace: WorkspaceSummary }) {
  return (
    <div className="mobile-topbar">
      <div className="mobile-topbar-left">
        <label htmlFor="mobile-nav-toggle" className="icon-button circle-tool mobile-menu-button" aria-label="Open navigation">
          <span className="icon-glyph">
            <MiniIcon name="panelLeft" className="mobile-menu-icon" />
          </span>
        </label>

        <div className="workspace-switcher compact mobile-workspace-switcher">
          <WorkspaceBadge initials={workspace.initials} />
          <div className="workspace-heading">
            <div className="workspace-name truncate">{workspace.name}</div>
          </div>
          <MiniIcon name="chevronDown" className="chevron-icon" />
        </div>
      </div>

      <div className="mobile-topbar-actions">
        <ToolButton label="Search" name="search" className="circle-tool" />
        <ToolButton label="Create" name="compose" className="circle-tool" />
      </div>
    </div>
  );
}

function AppShellFrame({
  workspace,
  active,
  className,
  children,
}: {
  workspace: WorkspaceSummary;
  active: "inbox" | "drafts" | "settings";
  className: string;
  children: ReactNode;
}) {
  return (
    <main className="app-shell">
      <input id="mobile-nav-toggle" className="mobile-nav-toggle" type="checkbox" aria-hidden="true" />
      <AppSidebar workspace={workspace} active={active} />
      <label htmlFor="mobile-nav-toggle" className="mobile-nav-scrim" aria-hidden="true" />
      <section className="app-main">
        <MobileTopbar workspace={workspace} />
        <section className={className}>{children}</section>
      </section>
    </main>
  );
}

function FilterPopover() {
  const items: Array<{ label: string; icon: IconName }> = [
    { label: "Notification type", icon: "notification" },
    { label: "From", icon: "person" },
    { label: "Project", icon: "projects" },
    { label: "Issue priority", icon: "flag" },
    { label: "Issue status type", icon: "status" },
  ];

  return (
    <div className="popover popover-filter">
      <div className="popover-search">
        <span>Add Filter...</span>
        <kbd>F</kbd>
      </div>
      <div className="popover-list">
        {items.map((item) => (
          <div className="popover-item" key={item.label}>
            <MiniIcon name={item.icon} className="popover-icon" />
            <span>{item.label}</span>
            <MiniIcon name="chevronRight" className="popover-arrow-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DisplayPopover() {
  return (
    <div className="popover popover-display">
      <div className="popover-block">
        <div className="popover-row heading">
          <span>Ordering</span>
          <button className="select-chip">Newest</button>
        </div>
      </div>
      <div className="popover-divider" />
      <div className="popover-block">
        <div className="popover-row"><span>Show snoozed</span><button className="toggle small"><span /></button></div>
        <div className="popover-row"><span>Show read</span><button className="toggle small on"><span /></button></div>
        <div className="popover-row"><span>Show unread first</span><button className="toggle small"><span /></button></div>
      </div>
      <div className="popover-divider" />
      <div className="popover-block">
        <div className="popover-label">Display properties</div>
        <div className="chip-row">
          <span className="tiny-chip">ID</span>
          <span className="tiny-chip active">Status and icon</span>
        </div>
      </div>
    </div>
  );
}

function MorePopover() {
  const items: Array<{ label: string; icon: IconName; active?: boolean }> = [
    { label: "Members", icon: "members", active: true },
    { label: "Releases", icon: "releases" },
    { label: "Teams", icon: "team" },
    { label: "Customize sidebar", icon: "customize" },
  ];

  return (
    <div className="popover popover-menu">
      {items.map((item, index) => (
        <div key={item.label}>
          {index === 3 ? <div className="popover-divider" /> : null}
          <div className={`popover-menu-item ${item.active ? "active" : ""}`.trim()}>
            <MiniIcon name={item.icon} className="menu-bullet" />
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AppSidebar({ workspace, active = "inbox" }: { workspace: WorkspaceSummary; active?: "inbox" | "drafts" | "settings" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-topbar">
        <div className="workspace-switcher compact">
          <WorkspaceBadge initials={workspace.initials} />
          <div className="workspace-heading">
            <div className="workspace-name truncate">{workspace.name}</div>
          </div>
          <MiniIcon name="chevronDown" className="chevron-icon" />
        </div>
        <div className="sidebar-actions">
          <ToolButton label="Search" name="search" className="circle-tool" />
          <ToolButton label="Create" name="compose" className="circle-tool" />
        </div>
      </div>

      <nav className="nav-group primary-nav">
        <SurfaceSection>
          <SidebarNavItem href="/inbox" icon="inbox" label="Inbox" count={workspace.unread} active={active === "inbox"} />
          <SidebarNavItem href="/drafts" icon="drafts" label="Drafts" count={workspace.readyDrafts} active={active === "drafts"} />
        </SurfaceSection>
      </nav>

      <SurfaceSection className="nav-section">
        <div className="nav-section-title">Workspace</div>
        <SidebarNavItem icon="projects" label="Projects" muted />
        <SidebarNavItem icon="views" label="Views" muted />
        <details className="sidebar-popover-anchor sidebar-popover-details">
          <summary className="nav-item muted more-nav-trigger">
            <NavIcon name="automation" />
            <span>More</span>
          </summary>
          <MorePopover />
        </details>
      </SurfaceSection>

      <SurfaceSection className="nav-section">
        <div className="nav-section-title">The Club House</div>
        <SidebarNavItem icon="team" label="Issues" muted />
        <SidebarNavItem icon="projects" label="Projects" muted />
        <SidebarNavItem icon="views" label="Views" muted />
      </SurfaceSection>

      <SurfaceSection className="nav-section">
        <div className="nav-section-title">Operations</div>
        <SidebarNavItem icon="priority" label="Approvals" muted />
        <SidebarNavItem href="/settings" icon="settings" label="Settings" active={active === "settings"} muted={active !== "settings"} />
      </SurfaceSection>

      <div className="sidebar-footer">
        <div className="sidebar-footer-pill">
          <span>Open</span>
          <strong>{workspace.openOpportunities}</strong>
        </div>
      </div>
    </aside>
  );
}

function MobileInboxDrawer({
  item,
  drafts,
  open,
  onClose,
}: {
  item: InboxItem;
  drafts: DraftSummary[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button className={`mobile-detail-scrim ${open ? "open" : ""}`.trim()} onClick={onClose} aria-label="Close detail drawer" />
      <aside className={`mobile-detail-drawer ${open ? "open" : ""}`.trim()}>
        <div className="mobile-detail-header">
          <button className="mobile-detail-close" onClick={onClose}>Close</button>
        </div>
        <div className="mobile-detail-scroll">
          <DetailPanel item={item} drafts={drafts} />
          <PropertiesPanel item={item} />
        </div>
      </aside>
    </>
  );
}

export function InboxLayout({
  workspace,
  items,
  drafts,
  selectedId,
}: {
  workspace: WorkspaceSummary;
  items: InboxItem[];
  drafts: DraftSummary[];
  selectedId: string;
}) {
  const initialSelected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0], [items, selectedId]);
  const [activeId, setActiveId] = useState(initialSelected?.id ?? items[0]?.id ?? "");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const activeItem = items.find((item) => item.id === activeId) ?? initialSelected;

  const handleSelect = (item: InboxItem, openMobileDrawer = false) => {
    setActiveId(item.id);
    if (openMobileDrawer) setMobileDrawerOpen(true);
  };

  return (
    <AppShellFrame workspace={workspace} active="inbox" className="content-grid inbox-grid">
      <section className="desktop-inbox-grid">
        <InboxList items={items} selectedId={activeItem.id} onSelect={(item) => handleSelect(item)} />
        <DetailPanel item={activeItem} drafts={drafts} />
        <PropertiesPanel item={activeItem} />
      </section>

      <section className="mobile-inbox-shell">
        <InboxList items={items} selectedId={activeItem.id} onSelect={(item) => handleSelect(item, true)} />
        <MobileInboxDrawer item={activeItem} drafts={drafts} open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} />
      </section>
    </AppShellFrame>
  );
}

export function DraftsLayout({ workspace, children }: { workspace: WorkspaceSummary; children: ReactNode }) {
  return (
    <AppShellFrame workspace={workspace} active="drafts" className="content-grid drafts-grid">
      {children}
    </AppShellFrame>
  );
}

export function InboxList({
  items,
  selectedId,
  onSelect,
}: {
  items: InboxItem[];
  selectedId: string;
  onSelect?: (item: InboxItem) => void;
}) {
  return (
    <section className="panel list-panel">
      <header className="panel-header inbox-header">
        <div className="panel-title-row">
          <h1>Inbox</h1>
          <button className="ghost-dots" aria-label="More" />
        </div>
        <div className="header-actions floating">
          <div className="popover-anchor">
            <HeaderAction label="Filter" name="filter" className="tool-filter" active />
            <FilterPopover />
          </div>
          <div className="popover-anchor display-anchor">
            <HeaderAction label="Display options" name="display" className="tool-display" />
            <DisplayPopover />
          </div>
        </div>
      </header>
      <div className="inbox-list">
        {items.map((item) => (
          <article key={item.id} className={`inbox-row ${item.id === selectedId ? "selected" : ""}`}>
            <button className="inbox-row-button" onClick={() => onSelect?.(item)}>
              <div className={`status-dot ${item.priority}`} />
              <div className="inbox-copy">
                <div className="inbox-title-row">
                  <h2>{item.title}</h2>
                  <span>{item.age}</span>
                </div>
                <p>{item.preview}</p>
                <div className="row-meta">
                  <span>{item.source}</span>
                  <span>{item.status}</span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DetailPanel({ item, drafts }: { item: InboxItem; drafts: DraftSummary[] }) {
  return (
    <section className="panel detail-panel">
      <header className="detail-header compact-header">
        <div className="detail-eyebrow">Inbox › {item.workspace}</div>
        <div className="detail-heading-row">
          <h1>{item.title}</h1>
          <div className="detail-controls">
            <HeaderAction label="Link" name="link" className="tool-link" />
            <HeaderAction label="Properties" name="display" className="tool-display" />
            <HeaderAction label="Branch" name="branch" className="tool-branch" />
            <HeaderAction label="Reply" name="send" className="tool-send" />
          </div>
        </div>
      </header>

      <div className="detail-body">
        <section className="detail-section first">
          <div className="section-title-row lined">
            <h2>Recommended response angle</h2>
            <span>Suggested by workflow</span>
          </div>
          <div className="detail-card large-card">
            <p>
              Lead with something immediately useful, keep it native to the channel, and avoid any early product push. The right first move here is a practical answer that earns the follow-up.
            </p>
          </div>
        </section>

        <section className="detail-section">
          <div className="section-title-row lined">
            <h2>Draft queue</h2>
            <span>{drafts.length} active</span>
          </div>
          <div className="draft-stack spacious">
            {drafts.map((draft) => (
              <div className="draft-card refined" key={draft.title}>
                <div className="draft-topline refined-topline">
                  <strong>{draft.title}</strong>
                  <span>{draft.status}</span>
                </div>
                <p>{draft.body}</p>
                <div className="row-meta bottom-meta">
                  <span>{draft.channel}</span>
                  <span>{draft.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function PropertiesPanel({ item }: { item: InboxItem }) {
  return (
    <aside className="panel properties-panel issue-style-panel">
      <div className="property-card">
        <div className="property-card-title">Properties</div>
        <div className="property-list floating">
          <div className="property-row"><span>Status</span><strong>{item.status}</strong></div>
          <div className="property-row"><span>Priority</span><strong className={`priority-label ${item.priority}`}>{item.priority}</strong></div>
          <div className="property-row"><span>Owner</span><strong>{item.assignee}</strong></div>
        </div>
      </div>

      <div className="property-card">
        <div className="property-card-title">Labels</div>
        <div className="mini-card padless">
          <div className="tag-column">
            {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>

      <div className="property-card">
        <div className="property-card-title">Playbook note</div>
        <div className="mini-card">
          <p>Keep the first reply useful, short, and non-promotional. If the thread warms up, route the follow-up into drafts.</p>
        </div>
      </div>
    </aside>
  );
}

export function DraftsBoard({ drafts }: { drafts: DraftSummary[] }) {
  const tabs = ["Assigned", "Created", "Subscribed", "Activity"];

  return (
    <section className="panel board-panel">
      <header className="panel-header board-header">
        <div>
          <h1>My drafts</h1>
        </div>
        <div className="board-actions">
          <HeaderAction label="Filter" name="filter" className="tool-filter" />
          <HeaderAction label="Display" name="display" className="tool-display" />
          <HeaderAction label="Analytics" name="analytics" className="tool-analytics" />
        </div>
      </header>

      <div className="tab-row">
        {tabs.map((tab, index) => (
          <span key={tab} className={`tab-chip ${index === 0 ? "active" : ""}`}>{tab}</span>
        ))}
      </div>

      <div className="group-header">
        <MiniIcon name="chevronDown" className="caret-icon" />
        <strong>Backlog</strong>
        <span>{drafts.length}</span>
      </div>

      <div className="issue-list">
        {drafts.map((draft, index) => (
          <article className="issue-row" key={draft.title}>
            <div className="issue-main">
              <span className="issue-code">TCH-{11 - index}</span>
              <span className="issue-status-ring" />
              <div className="issue-copy">
                <strong>{draft.title}</strong>
                <p>{draft.body}</p>
              </div>
            </div>
            <div className="issue-meta">
              <span className="avatar-chip">{draft.assignee.slice(0, 2).toUpperCase()}</span>
              <span>{draft.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SettingsLayout({
  workspace,
  navGroups,
  sections,
}: {
  workspace: WorkspaceSummary;
  navGroups: SettingsNavGroup[];
  sections: SettingsSection[];
}) {
  return (
    <AppShellFrame workspace={workspace} active="settings" className="settings-wrap">
        <aside className="settings-sidebar">
          <a className="back-link">← Back to app</a>
          {navGroups.map((group) => (
            <div className="settings-nav-group" key={group.title}>
              <div className="settings-nav-title">{group.title}</div>
              {group.items.map((item) => (
                <a className={`settings-nav-item ${item.active ? "active" : ""}`.trim()} key={item.label}>{item.label}</a>
              ))}
            </div>
          ))}
        </aside>

        <section className="settings-content panel">
          <header className="settings-header">
            <h1>Preferences</h1>
            <p>Quiet, scalable defaults for an operator-heavy workflow.</p>
          </header>

          <div className="settings-sections">
            {sections.map((section) => (
              <section key={section.title} className="settings-section">
                <div className="section-title-row settings-title-row lined">
                  <h2>{section.title}</h2>
                </div>
                <div className="settings-card-list">
                  {section.items.map((item) => (
                    <div className="settings-card" key={item.label}>
                      <div>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                      </div>
                      {"toggle" in item ? (
                        <button className={`toggle ${item.toggle ? "on" : ""}`} aria-label={item.label}>
                          <span />
                        </button>
                      ) : (
                        <div className="select-pill">{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
    </AppShellFrame>
  );
}

import Link from "next/link";
import { ReactNode } from "react";
import { getSettingsSections, type DraftSummary, type InboxItem, type WorkspaceSummary } from "@/lib/app-data";

type IconName =
  | "inbox"
  | "drafts"
  | "projects"
  | "views"
  | "automation"
  | "team"
  | "priority"
  | "settings"
  | "notification"
  | "person"
  | "flag"
  | "status"
  | "members"
  | "releases"
  | "customize"
  | "search"
  | "compose"
  | "filter"
  | "display"
  | "link"
  | "branch"
  | "send"
  | "analytics"
  | "chevronDown"
  | "chevronRight";

function IconGlyph({ name }: { name: IconName }) {
  switch (name) {
    case "inbox":
      return <path d="M3.75 5.75A1.75 1.75 0 0 1 5.5 4h13a1.75 1.75 0 0 1 1.75 1.75v12.5A1.75 1.75 0 0 1 18.5 20h-13a1.75 1.75 0 0 1-1.75-1.75zm0 7h5l1.35 2h3.8l1.35-2h5" />;
    case "drafts":
      return <path d="M6.5 4.75h8.2l3.3 3.3v11.2a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19.25v-13A1.5 1.5 0 0 1 6.5 4.75Zm8-.1v3.9h3.85M8 12h8M8 15.5h5" />;
    case "projects":
      return <path d="M4.75 7.5h6.5v10.25h-6.5zm8 0h6.5v6.5h-6.5zm0 8h6.5v2.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1z" />;
    case "views":
      return <path d="M4.75 6.25h14.5M4.75 12h14.5M4.75 17.75h14.5M7 4.75v14.5" />;
    case "automation":
      return <path d="M12 3.75v3m0 10.5v3m8.25-8.25h-3m-10.5 0h-3m11.08-5.83-2.12 2.12m-3.92 7.66-2.12 2.12m8.16 0-2.12-2.12M8.79 8.29 6.67 6.17M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />;
    case "team":
    case "members":
      return <path d="M8.25 11a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm7.25 1.5A2.25 2.25 0 1 0 15.5 8a2.25 2.25 0 0 0 0 4.5ZM4.75 18.75v-.7c0-2.05 2.15-3.8 5-3.8s5 1.75 5 3.8v.7m1.75 0v-.45c0-1.38-1.07-2.6-2.7-3.22" />;
    case "priority":
    case "flag":
      return <path d="M6.5 20V5m0 1h8.35l-1.55 3 1.55 3H6.5" />;
    case "settings":
    case "customize":
      return <path d="M12 4.5v2.25m0 10.5v2.25m7.5-7.5h-2.25M6.75 12H4.5m10.6-4.85-1.6 1.6m-3 6.1-1.6 1.6m6.2 0-1.6-1.6m-3-6.1-1.6-1.6M12 8.75A3.25 3.25 0 1 1 12 15.25 3.25 3.25 0 0 1 12 8.75Z" />;
    case "notification":
      return <path d="M12 4.5a4 4 0 0 0-4 4v1.15c0 .72-.23 1.43-.66 2.01L6 13.5h12l-1.34-1.84A3.5 3.5 0 0 1 16 9.65V8.5a4 4 0 0 0-4-4Zm-1.9 11.5a1.9 1.9 0 0 0 3.8 0" />;
    case "person":
      return <path d="M12 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Zm-5.5 6.25c.6-2.15 2.8-3.5 5.5-3.5s4.9 1.35 5.5 3.5" />;
    case "status":
      return <path d="M6.25 6.75h11.5M6.25 12h8M6.25 17.25h5.5M4.75 6.75h.5m-.5 5.25h.5m-.5 5.25h.5" />;
    case "releases":
      return <path d="M12 4.25c1.3 1.95 3.8 3.13 6.25 3-.2 5.4-2.72 9.76-6.25 12.5-3.53-2.74-6.05-7.1-6.25-12.5 2.45.13 4.95-1.05 6.25-3ZM12 9.5v4.25m0 0 2-2m-2 2-2-2" />;
    case "search":
      return <path d="M11 18a7 7 0 1 1 4.95-2.05L20 20" />;
    case "compose":
      return <path d="m6 18 1.5-4.5L15.75 5.25a1.6 1.6 0 1 1 2.25 2.25L9.75 15.75Zm0 0L10.75 16" />;
    case "filter":
      return <path d="M4.75 7.25h14.5M7.75 12h8.5M10.25 16.75h3.5" />;
    case "display":
      return <path d="M4.75 7h14.5M4.75 12h14.5M4.75 17h14.5M8.25 5.75v2.5m7.5 2.5v2.5m-4.5 2.5v2.5" />;
    case "link":
      return <path d="M10 8.5H8.75a3.75 3.75 0 1 0 0 7.5H10m4-7.5h1.25a3.75 3.75 0 1 1 0 7.5H14m-4 0h4" />;
    case "branch":
      return <path d="M8 6.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0v9a2.5 2.5 0 0 0 2.5 2.5h1.25M16 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v4.5" />;
    case "send":
      return <path d="M4.75 12 19 5.75l-3 12.5-4.5-4-3.25 2.5.75-4.75Z" />;
    case "analytics":
      return <path d="M6.5 17.5v-5m5 5v-10m5 10v-7.5M4.75 19.25h14.5" />;
    case "chevronDown":
      return <path d="m7.5 10 4.5 4.5 4.5-4.5" />;
    case "chevronRight":
      return <path d="m10 7.5 4.5 4.5-4.5 4.5" />;
  }
}

function WorkspaceBadge({ initials }: { initials: string }) {
  return <div className="workspace-badge">{initials}</div>;
}

function NavIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span className={`nav-icon ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <IconGlyph name={name} />
      </svg>
    </span>
  );
}

function MiniIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span className={`mini-icon ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <IconGlyph name={name} />
      </svg>
    </span>
  );
}

function ToolButton({ label, name, className = "", active = false }: { label: string; name: IconName; className?: string; active?: boolean }) {
  return (
    <button className={`icon-button ${active ? "active" : ""} ${className}`.trim()} aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <IconGlyph name={name} />
      </svg>
    </button>
  );
}

function HeaderAction({ label, name, className = "", active = false }: { label: string; name: IconName; className?: string; active?: boolean }) {
  return <ToolButton label={label} name={name} className={`header-tool ${className}`.trim()} active={active} />;
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
            <span className="popover-arrow">›</span>
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

      <nav className="nav-group primary-nav sidebar-cluster">
        <Link href="/inbox" className={`nav-item ${active === "inbox" ? "active" : "muted"}`}>
          <NavIcon name="inbox" />
          <span>Inbox</span>
          <strong>{workspace.unread}</strong>
        </Link>
        <Link href="/drafts" className={`nav-item ${active === "drafts" ? "active" : "muted"}`}>
          <NavIcon name="drafts" />
          <span>Drafts</span>
          <strong>{workspace.readyDrafts}</strong>
        </Link>
      </nav>

      <div className="nav-section sidebar-cluster">
        <div className="nav-section-title">Workspace</div>
        <a className="nav-item muted"><NavIcon name="projects" /><span>Projects</span></a>
        <a className="nav-item muted"><NavIcon name="views" /><span>Views</span></a>
        <div className="sidebar-popover-anchor">
          <a className="nav-item muted"><NavIcon name="automation" /><span>More</span></a>
          <MorePopover />
        </div>
      </div>

      <div className="nav-section sidebar-cluster">
        <div className="nav-section-title">The Club House</div>
        <a className="nav-item muted"><NavIcon name="team" /><span>Issues</span></a>
        <a className="nav-item muted"><NavIcon name="projects" /><span>Projects</span></a>
        <a className="nav-item muted"><NavIcon name="views" /><span>Views</span></a>
      </div>

      <div className="nav-section sidebar-cluster">
        <div className="nav-section-title">Operations</div>
        <a className="nav-item muted"><NavIcon name="priority" /><span>Approvals</span></a>
        <Link href="/settings" className={`nav-item ${active === "settings" ? "active" : "muted"}`}>
          <NavIcon name="settings" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-pill">
          <span>Open</span>
          <strong>{workspace.openOpportunities}</strong>
        </div>
      </div>
    </aside>
  );
}

export function InboxLayout({ workspace, list, detail, properties }: { workspace: WorkspaceSummary; list: ReactNode; detail: ReactNode; properties: ReactNode }) {
  return (
    <main className="app-shell">
      <AppSidebar workspace={workspace} active="inbox" />
      <section className="content-grid inbox-grid">
        {list}
        {detail}
        {properties}
      </section>
    </main>
  );
}

export function DraftsLayout({ workspace, children }: { workspace: WorkspaceSummary; children: ReactNode }) {
  return (
    <main className="app-shell">
      <AppSidebar workspace={workspace} active="drafts" />
      <section className="content-grid drafts-grid">{children}</section>
    </main>
  );
}

export function InboxList({ items, selectedId }: { items: InboxItem[]; selectedId: string }) {
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

export function SettingsLayout({ workspace }: { workspace: WorkspaceSummary }) {
  const sections = getSettingsSections();
  return (
    <main className="app-shell settings-shell">
      <AppSidebar workspace={workspace} active="settings" />
      <section className="settings-wrap">
        <aside className="settings-sidebar">
          <Link href="/inbox" className="back-link">← Back to app</Link>
          <div className="settings-nav-group">
            <div className="settings-nav-title">Preferences</div>
            <a className="settings-nav-item active">General</a>
            <a className="settings-nav-item">Profile</a>
            <a className="settings-nav-item">Notifications</a>
            <a className="settings-nav-item">Security & access</a>
            <a className="settings-nav-item">Connected accounts</a>
          </div>
          <div className="settings-nav-group">
            <div className="settings-nav-title">Administration</div>
            <a className="settings-nav-item">Workspace</a>
            <a className="settings-nav-item">Teams</a>
            <a className="settings-nav-item">Members</a>
            <a className="settings-nav-item">API</a>
          </div>
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
      </section>
    </main>
  );
}

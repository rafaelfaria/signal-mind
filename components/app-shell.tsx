import Link from "next/link";
import { ReactNode } from "react";
import { getSettingsSections, type DraftSummary, type InboxItem, type WorkspaceSummary } from "@/lib/app-data";

function WorkspaceBadge({ initials }: { initials: string }) {
  return <div className="workspace-badge">{initials}</div>;
}

function NavIcon({ className = "" }: { className?: string }) {
  return <span className={`nav-icon ${className}`.trim()} aria-hidden="true" />;
}

function HeaderAction({ label, className = "", active = false }: { label: string; className?: string; active?: boolean }) {
  return <button className={`header-tool ${active ? "active" : ""} ${className}`.trim()} aria-label={label} />;
}

function FilterPopover() {
  const items = ["Notification type", "From", "Project", "Issue priority", "Issue status type"];
  return (
    <div className="popover popover-filter">
      <div className="popover-search">
        <span>Add Filter...</span>
        <kbd>F</kbd>
      </div>
      <div className="popover-list">
        {items.map((item, index) => (
          <div className="popover-item" key={item}>
            <span className={`popover-icon icon-${index + 1}`} />
            <span>{item}</span>
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
  return (
    <div className="popover popover-menu">
      <div className="popover-menu-item active"><span className="menu-bullet" />Members</div>
      <div className="popover-menu-item"><span className="menu-bullet" />Releases</div>
      <div className="popover-menu-item"><span className="menu-bullet" />Teams</div>
      <div className="popover-divider" />
      <div className="popover-menu-item"><span className="menu-bullet" />Customize sidebar</div>
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
          <span className="chevron">⌄</span>
        </div>
        <div className="sidebar-actions">
          <button className="circle-tool search" aria-label="Search" />
          <button className="circle-tool compose" aria-label="Create" />
        </div>
      </div>

      <nav className="nav-group primary-nav">
        <Link href="/inbox" className={`nav-item ${active === "inbox" ? "active" : "muted"}`}>
          <NavIcon className="icon-inbox" />
          <span>Inbox</span>
          <strong>{workspace.unread}</strong>
        </Link>
        <Link href="/drafts" className={`nav-item ${active === "drafts" ? "active" : "muted"}`}>
          <NavIcon className="icon-drafts" />
          <span>Drafts</span>
          <strong>{workspace.readyDrafts}</strong>
        </Link>
      </nav>

      <div className="nav-section">
        <div className="nav-section-title">Workspace</div>
        <a className="nav-item muted"><NavIcon className="icon-projects" /><span>Projects</span></a>
        <a className="nav-item muted"><NavIcon className="icon-views" /><span>Views</span></a>
        <div className="sidebar-popover-anchor">
          <a className="nav-item muted"><NavIcon className="icon-automation" /><span>More</span></a>
          <MorePopover />
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">The Club House</div>
        <a className="nav-item muted"><NavIcon className="icon-team" /><span>Issues</span></a>
        <a className="nav-item muted"><NavIcon className="icon-projects" /><span>Projects</span></a>
        <a className="nav-item muted"><NavIcon className="icon-views" /><span>Views</span></a>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Operations</div>
        <a className="nav-item muted"><NavIcon className="icon-priority" /><span>Approvals</span></a>
        <Link href="/settings" className={`nav-item ${active === "settings" ? "active" : "muted"}`}>
          <NavIcon className="icon-settings" />
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
            <HeaderAction label="Filter" className="tool-filter" active />
            <FilterPopover />
          </div>
          <div className="popover-anchor display-anchor">
            <HeaderAction label="Display options" className="tool-display" />
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
            <HeaderAction label="Link" className="tool-link" />
            <HeaderAction label="Properties" className="tool-display" />
            <HeaderAction label="Branch" className="tool-branch" />
            <HeaderAction label="Reply" className="tool-send" />
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
          <HeaderAction label="Filter" className="tool-filter" />
          <HeaderAction label="Display" className="tool-display" />
          <HeaderAction label="Analytics" className="tool-analytics" />
        </div>
      </header>

      <div className="tab-row">
        {tabs.map((tab, index) => (
          <span key={tab} className={`tab-chip ${index === 0 ? "active" : ""}`}>{tab}</span>
        ))}
      </div>

      <div className="group-header">
        <span className="caret">▾</span>
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

import Link from "next/link";
import { ReactNode } from "react";
import { getSettingsSections, type InboxItem, type WorkspaceSummary } from "@/lib/app-data";

function WorkspaceBadge({ initials }: { initials: string }) {
  return <div className="workspace-badge">{initials}</div>;
}

function NavIcon({ className = "" }: { className?: string }) {
  return <span className={`nav-icon ${className}`.trim()} aria-hidden="true" />;
}

export function AppSidebar({ workspace, active = "inbox" }: { workspace: WorkspaceSummary; active?: "inbox" | "settings" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="workspace-switcher">
          <WorkspaceBadge initials={workspace.initials} />
          <div>
            <div className="workspace-name">{workspace.name}</div>
            <div className="workspace-subtitle">Signal Mind workspace</div>
          </div>
        </div>

        <nav className="nav-group">
          <Link href="/inbox" className={`nav-item ${active === "inbox" ? "active" : ""}`}>
            <NavIcon className="icon-inbox" />
            <span>Inbox</span>
            <strong>{workspace.unread}</strong>
          </Link>
          <a className="nav-item">
            <NavIcon className="icon-drafts" />
            <span>Drafts</span>
            <strong>{workspace.readyDrafts}</strong>
          </a>
          <a className="nav-item">
            <NavIcon className="icon-analytics" />
            <span>Analytics</span>
          </a>
        </nav>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Workspace</div>
        <a className="nav-item muted"><NavIcon className="icon-projects" /><span>Projects</span></a>
        <a className="nav-item muted"><NavIcon className="icon-views" /><span>Views</span></a>
        <a className="nav-item muted"><NavIcon className="icon-automation" /><span>Automation</span></a>
      </div>

      <div className="nav-section">
        <div className="nav-section-title">Operations</div>
        <a className="nav-item muted"><NavIcon className="icon-team" /><span>Channels</span></a>
        <a className="nav-item muted"><NavIcon className="icon-priority" /><span>Approvals</span></a>
        <Link href="/settings" className={`nav-item ${active === "settings" ? "active" : "muted"}`}>
          <NavIcon className="icon-settings" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <div className="stat-pill">
          <span>Open</span>
          <strong>{workspace.openOpportunities}</strong>
        </div>
        <div className="stat-pill">
          <span>Channels</span>
          <strong>{workspace.activeChannels}</strong>
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

export function InboxList({ items, selectedId }: { items: InboxItem[]; selectedId: string }) {
  return (
    <section className="panel list-panel">
      <header className="panel-header">
        <div>
          <h1>Inbox</h1>
          <p>Signals worth responding to now.</p>
        </div>
        <div className="header-actions">
          <button className="icon-button" aria-label="Filter" />
          <button className="icon-button settings" aria-label="Display options" />
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

export function DetailPanel({ item, drafts }: { item: InboxItem; drafts: Array<{ title: string; body: string; status: string; channel: string; assignee: string }> }) {
  return (
    <section className="panel detail-panel">
      <header className="detail-header">
        <div className="detail-eyebrow">{item.workspace} · {item.channel}</div>
        <h1>{item.title}</h1>
        <p>{item.preview}</p>
      </header>

      <div className="tag-row">
        {item.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>

      <section className="detail-section">
        <div className="section-title-row">
          <h2>Recommended response angle</h2>
          <span>Suggested by workflow</span>
        </div>
        <div className="detail-card">
          <p>
            Lead with something immediately useful, keep it native to the channel, and avoid any early product push.
            The right first move here is a practical answer that earns the follow-up.
          </p>
        </div>
      </section>

      <section className="detail-section">
        <div className="section-title-row">
          <h2>Draft queue</h2>
          <span>{drafts.length} active</span>
        </div>
        <div className="draft-stack">
          {drafts.map((draft) => (
            <div className="draft-card" key={draft.title}>
              <div className="draft-topline">
                <strong>{draft.title}</strong>
                <span>{draft.status}</span>
              </div>
              <p>{draft.body}</p>
              <div className="row-meta">
                <span>{draft.channel}</span>
                <span>{draft.assignee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export function PropertiesPanel({ item }: { item: InboxItem }) {
  return (
    <aside className="panel properties-panel">
      <header className="properties-header">
        <h2>Properties</h2>
      </header>

      <div className="property-list">
        <div className="property-row"><span>Status</span><strong>{item.status}</strong></div>
        <div className="property-row"><span>Priority</span><strong className={`priority-label ${item.priority}`}>{item.priority}</strong></div>
        <div className="property-row"><span>Owner</span><strong>{item.assignee}</strong></div>
        <div className="property-row"><span>Channel</span><strong>{item.channel}</strong></div>
        <div className="property-row"><span>Workspace</span><strong>{item.workspace}</strong></div>
      </div>

      <div className="mini-card">
        <h3>Playbook note</h3>
        <p>
          Keep the first reply useful, short, and non-promotional. If the thread warms up, route the follow-up into drafts.
        </p>
      </div>
    </aside>
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
                <div className="section-title-row settings-title-row">
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

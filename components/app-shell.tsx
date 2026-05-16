"use client";

import { ReactNode, useMemo, useState } from "react";
import { MiniIcon } from "@/components/icons";
import {
  HeaderAction,
  SidebarNavItem,
  SurfaceSection,
  WorkspaceBadge,
} from "@/components/shell-primitives";
import type {
  DraftSummary,
  InboxItem,
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
      </div>

      <nav className="nav-group primary-nav">
        <SurfaceSection>
          <SidebarNavItem href="/inbox" icon="inbox" label="Inbox" count={workspace.unread} active={active === "inbox"} />
          <SidebarNavItem href="/drafts" icon="drafts" label="Board" count={workspace.readyDrafts} active={active === "drafts"} />
        </SurfaceSection>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-pill">
          <span>Open items</span>
          <strong>{workspace.unread + workspace.readyDrafts}</strong>
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
            <span>Suggested by the agent workflow</span>
          </div>
          <div className="detail-card large-card">
            <p>
              Lead with something immediately useful, keep it native to the channel, and avoid any early product push. The right first move here is a practical answer that earns the follow-up.
            </p>
          </div>
        </section>

        <section className="detail-section">
          <div className="section-title-row lined">
            <h2>Board</h2>
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
  const lanes = ["Todo", "Drafting", "Ready", "Scheduled"] as const;
  type Lane = (typeof lanes)[number];
  type TodoItem = {
    id: string;
    title: string;
    body: string;
    status: Lane;
    channel: string;
    assignee: string;
  };

  const initialItems = useMemo<TodoItem[]>(() => {
    const statusMap: Record<string, Lane> = {
      "Pending approval": "Ready",
      "Ready for polish": "Drafting",
      Draft: "Drafting",
      Approved: "Ready",
      Scheduled: "Scheduled",
    };

    return drafts.map((draft, index) => ({
      id: `todo-${index + 1}`,
      title: draft.title,
      body: draft.body,
      status: statusMap[draft.status] ?? "Todo",
      channel: draft.channel,
      assignee: draft.assignee,
    }));
  }, [drafts]);

  const [items, setItems] = useState<TodoItem[]>(initialItems);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedLane, setSelectedLane] = useState<Lane>("Todo");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [channel, setChannel] = useState("Reddit");
  const [assignee, setAssignee] = useState("Mate");

  const moveItem = (id: string, direction: "left" | "right") => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const laneIndex = lanes.indexOf(item.status);
        const nextIndex = direction === "left" ? laneIndex - 1 : laneIndex + 1;
        if (nextIndex < 0 || nextIndex >= lanes.length) return item;
        return { ...item, status: lanes[nextIndex] };
      }),
    );
  };

  const createItem = () => {
    if (!title.trim() || !body.trim()) return;
    setItems((current) => [
      {
        id: `todo-${Date.now()}`,
        title: title.trim(),
        body: body.trim(),
        status: selectedLane,
        channel,
        assignee,
      },
      ...current,
    ]);
    setTitle("");
    setBody("");
    setSelectedLane("Todo");
    setChannel("Reddit");
    setAssignee("Mate");
    setCreateModalOpen(false);
  };

  return (
    <section className="panel board-panel">
      <header className="panel-header board-header">
        <div>
          <h1>Board</h1>
          <p>Working mock flow: create an item, drop it into the board, and move it through the agent workflow.</p>
        </div>
        <div className="board-header-actions">
          <button className="primary-button" onClick={() => setCreateModalOpen(true)} type="button">Create item</button>
        </div>
      </header>

      {createModalOpen ? (
        <div className="todo-modal-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div
            className="todo-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="todo-create-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="section-title-row lined todo-composer-heading todo-modal-heading">
              <div>
                <h2 id="todo-create-title">Create item</h2>
                <span>No backend wiring yet — local mock state only</span>
              </div>
              <button className="todo-modal-close" onClick={() => setCreateModalOpen(false)} type="button">Close</button>
            </div>

            <form
              className="todo-composer-grid"
              onSubmit={(event) => {
                event.preventDefault();
                createItem();
              }}
            >
              <label className="todo-field todo-field-wide">
                <span>Title</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Write the next agent task..." />
              </label>

              <label className="todo-field todo-field-wide">
                <span>Brief</span>
                <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="What should the agent actually do?" rows={4} />
              </label>

              <label className="todo-field">
                <span>Start lane</span>
                <select value={selectedLane} onChange={(event) => setSelectedLane(event.target.value as Lane)}>
                  {lanes.map((lane) => <option key={lane} value={lane}>{lane}</option>)}
                </select>
              </label>

              <label className="todo-field">
                <span>Channel</span>
                <select value={channel} onChange={(event) => setChannel(event.target.value)}>
                  <option>Reddit</option>
                  <option>LinkedIn</option>
                  <option>Website</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                </select>
              </label>

              <label className="todo-field">
                <span>Owner</span>
                <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
                  <option>Mate</option>
                  <option>Raf</option>
                  <option>Authority Builder</option>
                  <option>Long-form Publisher</option>
                </select>
              </label>

              <div className="todo-composer-actions todo-modal-actions">
                <button className="todo-modal-close" onClick={() => setCreateModalOpen(false)} type="button">Cancel</button>
                <button className="primary-button" type="submit">Create item</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="todo-board-grid">
        {lanes.map((lane) => {
          const laneItems = items.filter((item) => item.status === lane);
          return (
            <section className="todo-lane" key={lane}>
              <div className="todo-lane-head">
                <div>
                  <h3>{lane}</h3>
                  <span>{laneItems.length} items</span>
                </div>
              </div>

              <div className="todo-lane-stack">
                {laneItems.length === 0 ? (
                  <div className="todo-empty-state">Nothing here yet.</div>
                ) : (
                  laneItems.map((item) => (
                    <article className="todo-card" key={item.id}>
                      <div className="todo-card-topline">
                        <span className="issue-code">{item.channel}</span>
                        <span className="avatar-chip">{item.assignee.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                      <div className="todo-card-footer">
                        <span>{item.assignee}</span>
                        <div className="todo-card-actions">
                          <button type="button" onClick={() => moveItem(item.id, "left")} disabled={lane === lanes[0]}>Back</button>
                          <button type="button" onClick={() => moveItem(item.id, "right")} disabled={lane === lanes[lanes.length - 1]}>Next</button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export function SettingsLayout({ workspace }: { workspace: WorkspaceSummary }) {
  return (
    <AppShellFrame workspace={workspace} active="settings" className="settings-wrap">
        <section className="settings-content panel">
          <header className="settings-header">
            <h1>Not in scope yet</h1>
            <p>Settings are intentionally hidden for now while we get Inbox and Board feeling solid.</p>
          </header>
          <div className="settings-sections">
            <section className="settings-section">
              <div className="settings-card">
                <div>
                  <h3>Current focus</h3>
                  <p>Keep the prototype lean: opportunity inbox, Board, and a clean mock workflow end to end.</p>
                </div>
              </div>
            </section>
          </div>
        </section>
    </AppShellFrame>
  );
}

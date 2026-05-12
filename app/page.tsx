import { Card, Pill, SectionHeading } from "@/components/ui";
import { getDashboardData } from "@/lib/dashboard";

export default async function Home() {
  const { drafts, metrics, opportunities, roadmap, hasLiveData } = await getDashboardData();
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Option B · scalable from day one</span>
          <h1>Community ops that starts with Reddit, but is not trapped by Reddit.</h1>
          <p>
            Signal Mind is the operator layer: one clean control room for discovering conversations,
            drafting responses, approving output, and expanding into new channels without rebuilding the product.
          </p>
          <div className="hero-actions">
            <a href="#overview" className="primary-button">View MVP</a>
            <a href="#architecture" className="secondary-button">See architecture</a>
          </div>
          <p className="live-indicator">{hasLiveData ? "Live database connected" : "Showing seeded MVP demo state until live records land"}</p>
        </div>
        <Card className="hero-panel">
          <div className="panel-topline">
            <span>Workspace</span>
            <Pill tone={hasLiveData ? "good" : "neutral"}>{hasLiveData ? "Live" : "Demo"}</Pill>
          </div>
          <h3>The Club House</h3>
          <p className="muted">A flexible setup for social communities, events, and founder-led engagement.</p>
          <div className="workspace-grid">
            <div>
              <span>Channels</span>
              <strong>3 active</strong>
            </div>
            <div>
              <span>Queue health</span>
              <strong>9 ready</strong>
            </div>
            <div>
              <span>Automation</span>
              <strong>67% covered</strong>
            </div>
            <div>
              <span>Next step</span>
              <strong>Approve high-intent drafts</strong>
            </div>
          </div>
        </Card>
      </section>

      <section id="overview" className="section-block">
        <SectionHeading
          eyebrow="Overview"
          title="A polished MVP shell with room to grow"
          description="The UI is shaped around operator workflows now, while the data model stays channel-agnostic for later expansion."
        />
        <div className="metric-grid">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <span className="metric-label">{metric.label}</span>
              <strong className="metric-value">{metric.value}</strong>
              <Pill tone={metric.tone}>{metric.delta}</Pill>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-block layout-two">
        <div>
          <SectionHeading
            eyebrow="Inbox"
            title="Opportunity-first, not platform-first"
            description="Operators work from response opportunities, while adapters handle where those opportunities came from."
          />
          <div className="stack">
            {opportunities.map((item) => (
              <Card key={item.title} className="list-card">
                <div className="list-card-header">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                  <Pill tone={item.priority === "High" ? "warning" : "neutral"}>{item.priority}</Pill>
                </div>
                <div className="meta-row">
                  <span>{item.workspace}</span>
                  <span>{item.channel}</span>
                  <span>{item.status}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Drafts"
            title="Approval-first workflow for the MVP"
            description="Drafts, scheduling, and ownership are built in early so the system can stay safe while automation expands."
          />
          <div className="stack">
            {drafts.map((draft) => (
              <Card key={draft.title} className="draft-card">
                <div className="list-card-header">
                  <div>
                    <h3>{draft.title}</h3>
                    <p>{draft.assignee} · {draft.channel}</p>
                  </div>
                  <Pill tone={draft.status === "Scheduled" ? "good" : "neutral"}>{draft.status}</Pill>
                </div>
                <div className="meta-row">
                  <span>{draft.scheduled}</span>
                  <span>Editable</span>
                  <span>Audit-ready</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="section-block">
        <SectionHeading
          eyebrow="Architecture"
          title="Scalable foundations under the nice UI"
          description="This repo starts as an MVP shell, but the structure is already lined up for adapters, APIs, persistence, and workers."
        />
        <div className="architecture-grid">
          <Card>
            <h3>Frontend</h3>
            <p>Next.js App Router with reusable UI primitives and operator-focused screens.</p>
          </Card>
          <Card>
            <h3>Domain model</h3>
            <p>Workspaces, channels, opportunities, drafts, and automation rules are separated cleanly.</p>
          </Card>
          <Card>
            <h3>Adapter layer</h3>
            <p>Reddit can ship first, but new channel connectors slot in without changing the product model.</p>
          </Card>
          <Card>
            <h3>Operations</h3>
            <p>Scheduling, approvals, ingestion, and publishing are worker-friendly instead of UI-coupled.</p>
          </Card>
        </div>
        <Card className="roadmap-card">
          <div className="roadmap-header">
            <div>
              <span className="eyebrow">Scale path</span>
              <h3>What this repo is ready to become</h3>
            </div>
            <Pill tone="good">MVP → platform</Pill>
          </div>
          <ul>
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}

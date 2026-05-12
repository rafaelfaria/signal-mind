# Signal Desk

Signal Desk is a scalable community operations cockpit: one product, multiple channels, approval-first workflows, and a clean operator UI.

This initial MVP deliberately avoids being Reddit-only. Reddit can be the first adapter, but the product model is channel-agnostic from day one.

## MVP goals

- Multi-workspace setup for brands or products
- Channel adapters (starting with Reddit, expandable to others)
- Opportunity inbox for threads, mentions, and conversations worth replying to
- Draft queue with approval states and scheduling
- Operator dashboard for throughput, queue health, and response coverage
- Basic rules engine surface for future automation

## Product shape

### Core surfaces
- **Overview** — health, queue pressure, response opportunities, campaign focus
- **Inbox** — opportunities across channels with priority and status
- **Drafts** — approval workflow, ownership, and scheduled responses
- **Automation** — channel rules, quiet hours, and pacing controls
- **Analytics** — coverage, response time, and content performance

### Why this scales
- Workspace-first data model
- Channel adapter boundary instead of platform-specific coupling
- Queue and automation layer separated from ingestion layer
- Shared design system primitives for new screens
- Ready for API routes, Prisma, and workers without redoing the UI structure

## Stack
- Next.js App Router
- React + TypeScript
- Custom CSS design system for a polished MVP shell
- Prisma schema stub for the scalable backend model

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Next build steps

1. Add auth and workspace switching
2. Replace mock data with API routes + Prisma
3. Add Reddit adapter as the first ingestion/posting channel
4. Add worker jobs for sync, scheduling, and approvals
5. Ship deployment config for Coolify or Docker

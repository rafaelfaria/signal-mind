# Signal Mind

Signal Mind is a scalable community operations cockpit: one product, multiple channels, agent-driven workflows, and a clean operator UI.

This initial MVP deliberately avoids being Reddit-only. Reddit can be the first adapter, but the product model is channel-agnostic from day one.

## MVP goals

- Multi-workspace setup for brands or products
- Channel adapters (starting with Reddit, expandable to others)
- Opportunity inbox for threads, mentions, and conversations worth replying to
- Agent ToDo flow with approval states and scheduling
- Operator dashboard for throughput, Agent ToDo health, and response coverage
- Basic rules engine surface for future automation

## Product shape

### Core surfaces
- **Overview** — health, Agent ToDo pressure, response opportunities, campaign focus
- **Inbox** — opportunities across channels with priority and status
- **Agent ToDo** — agent tasks, approvals, ownership, and scheduled responses
- **Automation** — channel rules, quiet hours, and pacing controls
- **Analytics** — coverage, response time, and content performance

### Why this scales
- Workspace-first data model
- Channel adapter boundary instead of platform-specific coupling
- Agent workflow and automation layer separated from ingestion layer
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

## Managed local stack

Signal Mind now runs locally in Docker, in the same style as Reddit Manager:

```bash
cd /home/pi/.openclaw/workspace/signal-mind
docker compose up -d --build
npm run db:push
```

Access it at:
- `http://127.0.0.1:3001`
- `http://192.168.0.100:3001`

Useful commands:

```bash
docker compose ps
docker compose logs -f web
docker compose restart web
docker compose down
```

## Agent API

Signal Mind exposes API-key protected endpoints so an OpenClaw-style agent can use it the same way Reddit Manager is used by the Reddit agent.

Headers:

```bash
X-API-Key: <AGENT_API_KEY>
```

Endpoints:
- `GET/POST /api/v1/workspaces`
- `GET/POST /api/v1/channels`
- `GET/POST /api/v1/opportunities`
- `GET/POST /api/v1/drafts`
- `GET /api/health`

## Next build steps

1. Add auth and workspace switching
2. Replace mock data with API routes + Prisma
3. Add Reddit adapter as the first ingestion/posting channel
4. Add worker jobs for sync, scheduling, and approvals
5. Ship deployment config for Coolify or Docker

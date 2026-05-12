import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAgentAuthorized } from "@/lib/agent-auth";

export async function GET(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId") || undefined;
  const status = url.searchParams.get("status") || undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);

  const items = await prisma.draft.findMany({
    where: { workspaceId, status: status as any },
    include: { workspace: true, channel: true, opportunity: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { workspaceId, channelId, opportunityId, title, body: textBody, status, scheduledFor, assignedTo, metadataJson } = body;

  if (!workspaceId || !channelId || !title || !textBody) {
    return NextResponse.json({ error: "Missing required fields: workspaceId, channelId, title, body" }, { status: 400 });
  }

  const item = await prisma.draft.create({
    data: {
      workspaceId,
      channelId,
      opportunityId,
      title,
      body: textBody,
      status: status || "pending_approval",
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      assignedTo,
      metadataJson,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAgentAuthorized } from "@/lib/agent-auth";

export async function GET(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId") || undefined;

  const channels = await prisma.channel.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(channels);
}

export async function POST(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { workspaceId, name, kind, handle, isActive, configJson } = body;

  if (!workspaceId || !name || !kind) {
    return NextResponse.json({ error: "Missing required fields: workspaceId, name, kind" }, { status: 400 });
  }

  const channel = await prisma.channel.create({
    data: {
      workspaceId,
      name,
      kind,
      handle,
      isActive: typeof isActive === "boolean" ? isActive : true,
      configJson,
    },
  });

  return NextResponse.json(channel, { status: 201 });
}

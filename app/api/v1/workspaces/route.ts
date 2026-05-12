import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAgentAuthorized } from "@/lib/agent-auth";

export async function GET(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaces = await prisma.workspace.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      channels: true,
      _count: { select: { opportunities: true, drafts: true, automations: true } },
    },
  });

  return NextResponse.json(workspaces);
}

export async function POST(req: Request) {
  if (!isAgentAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug, timezone } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: "Missing required fields: name, slug" }, { status: 400 });
  }

  const workspace = await prisma.workspace.create({
    data: { name, slug, timezone: timezone || "Australia/Brisbane" },
  });

  return NextResponse.json(workspace, { status: 201 });
}

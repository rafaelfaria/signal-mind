import { prisma } from "@/lib/prisma";
import { drafts as fallbackDrafts, metrics as fallbackMetrics, opportunities as fallbackOpportunities, roadmap } from "@/lib/data";

export async function getDashboardData() {
  try {
    const [workspaceCount, channelCount, opportunityCount, pendingDraftCount, latestOpportunities, latestDrafts] = await Promise.all([
      prisma.workspace.count(),
      prisma.channel.count({ where: { isActive: true } }),
      prisma.opportunity.count({ where: { status: { in: ["new", "triaged", "drafting", "awaiting_approval"] } } }),
      prisma.draft.count({ where: { status: { in: ["draft", "pending_review", "pending_approval", "approved", "scheduled"] } } }),
      prisma.opportunity.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        include: { workspace: true, channel: true },
      }),
      prisma.draft.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        include: { channel: true },
      }),
    ]);

    const metrics = [
      { label: "Active workspaces", value: String(workspaceCount), delta: `${channelCount} active channels`, tone: "good" as const },
      { label: "Open opportunities", value: String(opportunityCount), delta: "Live from the database", tone: "good" as const },
      { label: "Ready to approve", value: String(pendingDraftCount), delta: "Agent/human workflow", tone: "warning" as const },
      { label: "Automation coverage", value: workspaceCount ? "Foundations live" : "MVP shell", delta: "API-first", tone: "neutral" as const },
    ];

    return {
      metrics,
      opportunities: latestOpportunities.length
        ? latestOpportunities.map((item) => ({
            title: item.title,
            channel: item.channel.name,
            workspace: item.workspace.name,
            priority: item.priority >= 80 ? "High" : item.priority >= 50 ? "Medium" : "Low",
            status: item.status.replaceAll("_", " "),
            summary: item.summary || "No summary yet.",
          }))
        : fallbackOpportunities,
      drafts: latestDrafts.length
        ? latestDrafts.map((item) => ({
            title: item.title,
            assignee: item.assignedTo || "Unassigned",
            channel: item.channel.name,
            status: item.status.replaceAll("_", " "),
            scheduled: item.scheduledFor ? new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short" }).format(item.scheduledFor) : "Not scheduled",
          }))
        : fallbackDrafts,
      roadmap,
      hasLiveData: workspaceCount > 0,
    };
  } catch {
    return {
      metrics: fallbackMetrics,
      opportunities: fallbackOpportunities,
      drafts: fallbackDrafts,
      roadmap,
      hasLiveData: false,
    };
  }
}

import { InboxLayout } from "@/components/app-shell";
import { getInboxViewData } from "@/lib/app-data";

export default async function InboxPage() {
  const data = await getInboxViewData();

  return (
    <InboxLayout
      workspace={data.workspace}
      items={data.items}
      drafts={data.drafts}
      selectedId={data.selected.id}
    />
  );
}

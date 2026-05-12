import { DetailPanel, InboxLayout, InboxList, PropertiesPanel } from "@/components/app-shell";
import { getInboxViewData } from "@/lib/app-data";

export default async function InboxPage() {
  const data = await getInboxViewData();

  return (
    <InboxLayout
      workspace={data.workspace}
      list={<InboxList items={data.items} selectedId={data.selected.id} />}
      detail={<DetailPanel item={data.selected} drafts={data.drafts} />}
      properties={<PropertiesPanel item={data.selected} />}
    />
  );
}

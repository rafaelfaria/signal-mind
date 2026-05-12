import { DraftsBoard, DraftsLayout } from "@/components/app-shell";
import { getDraftsViewData } from "@/lib/app-data";

export default async function DraftsPage() {
  const data = await getDraftsViewData();

  return (
    <DraftsLayout workspace={data.workspace}>
      <DraftsBoard drafts={data.drafts} />
    </DraftsLayout>
  );
}

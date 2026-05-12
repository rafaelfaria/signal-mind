import { SettingsLayout } from "@/components/app-shell";
import { getInboxViewData } from "@/lib/app-data";

export default async function SettingsPage() {
  const data = await getInboxViewData();
  return <SettingsLayout workspace={data.workspace} />;
}

import { SettingsLayout } from "@/components/app-shell";
import { getSettingsViewData } from "@/lib/app-data";

export default async function SettingsPage() {
  const data = await getSettingsViewData();
  return <SettingsLayout workspace={data.workspace} navGroups={data.navGroups} sections={data.sections} />;
}

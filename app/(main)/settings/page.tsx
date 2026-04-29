import Settings from "./Settings";
import { getWebtoons } from "@/lib/data/webtoonServerQueries";
import { getCompleted } from "@/lib/data/completedServerQueries";

export default async function SettingsPage() {
  const webtoonsData = await getWebtoons();
  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  const completedData = await getCompleted();
  const allWebtoons = [...verifiedWebtoons, ...completedData];
  return (
    <Settings webtoonsData={allWebtoons} />
  );
}
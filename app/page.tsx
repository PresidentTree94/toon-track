import { getWebtoons } from "@/lib/data/webtoonServerQueries";
import { getCompleted } from "@/lib/data/completedServerQueries";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import HomeClient from "./Home";

export default async function Home() {
  const webtoonsData: Toon[] = await getWebtoons();
  const completedData: Comp[] = await getCompleted();

  return (
    <HomeClient webtoonsData={webtoonsData} completedData={completedData} />
  );
}

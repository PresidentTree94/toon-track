import Home from "./Home";
import { getWebtoons } from "@/lib/data/webtoonServerQueries";
import { getCompleted } from "@/lib/data/completedServerQueries";

export default async function HomePage() {
  const webtoonsData = await getWebtoons();
  const completedData = await getCompleted();
  return (
    <Home webtoonsData={webtoonsData} completedData={completedData} />
  );
}
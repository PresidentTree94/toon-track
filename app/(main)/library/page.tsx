import Library from "./Library";
import { getWebtoons } from "@/lib/data/webtoonServerQueries";

export default async function LibraryPage() {
  const webtoonsData = await getWebtoons();
  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  return (
    <Library webtoonsData={verifiedWebtoons} />
  );
}
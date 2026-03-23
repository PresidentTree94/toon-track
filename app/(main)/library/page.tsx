import Library from "./Library";
import { getWebtoons } from "@/lib/data/webtoonServerQueries";

export default async function LibraryPage() {
  const webtoonsData = await getWebtoons();
  return (
    <Library webtoonsData={webtoonsData} />
  );
}
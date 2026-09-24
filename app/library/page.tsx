import { getWebtoons } from "@/lib/data/serverQueries";
import LibraryClient from "./Library";

export default async function Library() {
  const webtoonsData = await getWebtoons();
  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  return (
    <LibraryClient webtoonsData={verifiedWebtoons} />
  );
}
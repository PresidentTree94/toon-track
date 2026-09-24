import { getWebtoons } from "@/lib/data/serverQueries";
import { client } from "@/sanity/lib/client";
import { getTropes } from "@/sanity/lib/queries";
import { Trope } from "@/types/trope";
import LibraryClient from "./Library";

export default async function Library() {
  const webtoonsData = await getWebtoons();
  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  const tropesData: Trope[] = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  return (
    <LibraryClient webtoonsData={verifiedWebtoons} tropesData={tropesData} />
  );
}
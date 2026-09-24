import { client } from "@/sanity/lib/client"
import { getTropes } from "@/sanity/lib/queries";
import { Trope } from "@/types/trope";
import { getWebtoons } from "@/lib/data/serverQueries";
import { Toon } from "@/types/toon";
import { getCompleted } from "@/lib/data/serverQueries";
import { Comp } from "@/types/comp";
import GlossaryClient from "./Glossary";

export default async function Glossary() {
  const tropesData: Trope[] = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  const webtoonsData: Toon[] = await getWebtoons();
  const completedData: Comp[] = await getCompleted();
  const examples: (Toon | Comp)[] = [...webtoonsData, ...completedData].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <GlossaryClient tropesData={tropesData} examples={examples} />
  );
}
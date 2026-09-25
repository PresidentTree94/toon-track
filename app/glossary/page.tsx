import { client } from "@/sanity/lib/client"
import { getTropes } from "@/sanity/lib/queries";
import { Trope } from "@/types/trope";
import GlossaryClient from "./Glossary";

export default async function Glossary() {
  const tropesData: Trope[] = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  return (
    <GlossaryClient tropesData={tropesData} />
  );
}
import { getCompleted } from "@/lib/data/serverQueries";
import { client } from "@/sanity/lib/client";
import { getTropes } from "@/sanity/lib/queries";
import { Trope } from "@/types/trope";
import ArchiveClient from "./Archive";

export default async function Archive() {
  const completedData = await getCompleted();
  const tropesData: Trope[] = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  return (
    <ArchiveClient completedData={completedData} tropesData={tropesData} />
  );
}
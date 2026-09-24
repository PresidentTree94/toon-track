import { getWebtoons } from "@/lib/data/serverQueries";
import { client } from "@/sanity/lib/client"
import { getTropes } from "@/sanity/lib/queries";
import DetailClient from "./Detail";

export default async function Detail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const webtoonsData = await getWebtoons();
  const tropesData = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  return (
    <DetailClient webtoonsData={webtoonsData} tropesData={tropesData} slug={Number(slug)} />
  );
}
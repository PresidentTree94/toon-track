import { getWebtoons } from "@/lib/data/serverQueries";
import DetailClient from "./Detail";

export default async function Detail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const webtoonsData = await getWebtoons();
  return (
    <DetailClient webtoonsData={webtoonsData} slug={Number(slug)} />
  );
}
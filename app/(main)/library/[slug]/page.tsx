import Detail from "./Detail";
import { getWebtoonById } from "@/lib/data/webtoonServerQueries";

export default async function DetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const webtoonData = await getWebtoonById(Number(slug));
  return (
    <Detail webtoonData={webtoonData} />
  );
}
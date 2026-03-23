import Detail from "./Detail";
import { getWebtoonById } from "@/lib/data/webtoonServerQueries";

export default async function DetailPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;
  const webtoonData = await getWebtoonById(Number(slug));
  return (
    <Detail webtoonData={webtoonData} />
  );
}
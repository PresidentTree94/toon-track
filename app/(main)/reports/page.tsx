import { getReports, getWebtoons } from "@/lib/data/webtoonServerQueries";
import Reports from "./Reports";

export default async function ReportsPage() {
  const webtoons = await getWebtoons();
  const reports = await getReports();
  return (
    <Reports webtoons={webtoons} reports={reports} />
  );
}
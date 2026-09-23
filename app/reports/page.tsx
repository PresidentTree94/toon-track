import { getReports } from "@/lib/data/webtoonServerQueries";
import ReportClient from "./Reports";

export default async function Reports() {
  const reportData = await getReports();
  return (
    <ReportClient reportData={reportData} />
  );
}
import { getReports } from "@/lib/data/serverQueries";
import ReportClient from "./Reports";

export default async function Reports() {
  const reportData = await getReports();
  return (
    <ReportClient reportData={reportData} />
  );
}
import Archive from "./Archive";
import { getCompleted } from "@/lib/data/completedServerQueries";

export default async function ArchivePage() {
  const completedData = await getCompleted();
  return (
    <Archive completedData={completedData} />
  );
}
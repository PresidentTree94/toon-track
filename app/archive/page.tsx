import { getCompleted } from "@/lib/data/serverQueries";
import ArchiveClient from "./Archive";

export default async function Archive() {
  const completedData = await getCompleted();
  return (
    <ArchiveClient completedData={completedData} />
  );
}
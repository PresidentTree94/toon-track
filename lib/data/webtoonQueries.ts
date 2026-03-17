import { supabase } from "@/lib/supabaseClient";
import { getCompleted } from "./completedQueries";

export async function getWebtoons() {
  const { data, error } = await supabase.from("webtoons").select("*");
  if (error) {
    console.error("Error fetching webtoons:", error);
    return [];
  }
  return data;
}

export async function getWebtoonById(id: number) {
  const { data, error } = await supabase.from("webtoons").select("*").eq("id", id).single();
  if (error) {
    console.error(`Error fetching webtoon with id ${id}:`, error);
    return null;
  }
  return data;
}

export async function createWebtoon(values: any) {
  const { data, error } = await supabase.from("webtoons").insert(values).select().single();
  if (error) {
    console.error("Error creating webtoon:", error);
    return null;
  }
  return data;
}

export async function updateWebtoonById(id: number, values: any) {
  const { data, error } = await supabase.from("webtoons").update(values).eq("id", id).select().single();
  if (error) {
    console.error(`Error updating webtoon with id ${id}:`, error);
    return null;
  }
  return data;
}

export async function deleteWebtoonById(id: number) {
  const { error } = await supabase.from("webtoons").delete().eq("id", id);
  if (error) {
    console.error(`Error deleting webtoon with id ${id}:`, error);
    return null;
  }
  return true;
}

export async function deleteWebtoonFromReports() {
  const webtoonData = await getWebtoons();
  const completedData = await getCompleted();
  const { data } = await supabase.from("reports").select("*");
  const validTitles = new Set([...webtoonData.map(w => w.title), ...completedData.map(c => c.title)]);

  if (data) {
    for (const report of data) {
      const cleanedSnapshot = report.snapshot.filter((item: any) => validTitles.has(item.title));
      await supabase.from("reports").update({ snapshot: cleanedSnapshot }).eq("timestamp", report.timestamp);
    }
  }
}
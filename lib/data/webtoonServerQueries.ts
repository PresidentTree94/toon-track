import { createServerSupabase } from '@/lib/supabaseServer'
import { getCompleted } from "./completedServerQueries";

export async function getWebtoons() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("webtoons").select("*");
  if (error) {
    console.error("Error fetching webtoons:", error);
    return [];
  }
  return data;
}

export async function getWebtoonById(id: number) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("webtoons").select("*").eq("id", id).single();
  if (error) {
    console.error(`Error fetching webtoon with id ${id}:`, error);
    return null;
  }
  return data;
}

export async function deleteWebtoonFromReports() {
  const webtoonData = await getWebtoons();
  const completedData = await getCompleted();
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("reports").select("*");
  const validTitles = new Set([...webtoonData.map(w => w.title), ...completedData.map((c: any) => c.title)]);

  if (data) {
    for (const report of data) {
      const cleanedSnapshot = report.snapshot.filter((item: any) => validTitles.has(item.title));
      await supabase.from("reports").update({ snapshot: cleanedSnapshot }).eq("timestamp", report.timestamp);
    }
  }
}

export async function getReports() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("reports").select("*");
  if (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
  return data;
}

export async function getWebtoonProtagonistsByTitle(title: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("webtoons").select("protagonists").eq("title", title).single();
  if (error) {
    console.error(`Error fetching webtoon with title ${title}:`, error);
    return null;
  }
  return data;
}
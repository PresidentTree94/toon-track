import { createClient } from "../supabaseClient";
import { Toon } from "@/types/toon";

export async function createWebtoon(values: any) {
  const supabase = createClient();
  const { data, error } = await supabase.from("webtoons").insert(values).select().single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function updateWebtoonById(id: number, values: any) {
  const supabase = createClient();
  const { data, error } = await supabase.from("webtoons").update(values).eq("id", id).select().single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function deleteWebtoonById(w: Toon) {
  const supabase = createClient();

  const { data: reportsData, error: reportsError } = await supabase.from("reports").select("*");
  if (reportsError) {
    console.error(reportsError);
    return;
  }

  const updatePromises = reportsData.map((report) => {
    const newSnapshot = report.snapshot.filter(
      (s: { title: string; value: number }) => s.title !== w.title
    );
    return supabase.from("reports").update({ snapshot: newSnapshot }).eq("timestamp", report.timestamp).select().single();
  });
  const updateResults = await Promise.all(updatePromises);
  updateResults.forEach(({ error }, i) => {
    if (error) {
      console.error(`Error updating report ${reportsData[i].timestamp}`, error);
    }
  });

  const { error: deleteError } = await supabase.from("webtoons").delete().eq("id", w.id);
  if (deleteError) console.error(deleteError);
}


export async function updateCompletedById(id: number, values: any) {
  const supabase = createClient();
  const { data, error } = await supabase.from("completed").update(values).eq("id", id).select().single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
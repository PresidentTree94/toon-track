import { supabase } from "@/lib/supabaseClient";

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
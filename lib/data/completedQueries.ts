import { supabase } from "@/lib/supabaseClient";

export async function getCompleted() {
  const { data, error } = await supabase.from("completed").select("*");
  if (error) {
    console.error("Error fetching completed webtoons:", error);
    return [];
  }
  return data;
}

export async function updateCompletedById(id: number, values: any) {
  const { data, error } = await supabase.from("completed").update(values).eq("id", id).select().single();
  if (error) {
    console.error(`Error updating completed webtoon with id ${id}:`, error);
    return null;
  }
  return data;
}
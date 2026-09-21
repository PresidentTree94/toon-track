import { createClient } from "../supabaseServer";

export async function getCompleted() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("completed").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
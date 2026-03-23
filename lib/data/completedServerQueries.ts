import { createServerSupabase } from '@/lib/supabaseServer'

export async function getCompleted() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("completed").select("*");
  if (error) {
    console.error("Error fetching completed webtoons:", error);
    return [];
  }
  return data;
}
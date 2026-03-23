import { createBrowserSupabase } from '@/lib/supabaseClient'

export async function updateCompletedById(id: number, values: any) {
  const supabase = createBrowserSupabase();
  const { data, error } = await supabase.from("completed").update(values).eq("id", id).select().single();
  if (error) {
    console.error(`Error updating completed webtoon with id ${id}:`, error);
    return null;
  }
  return data;
}
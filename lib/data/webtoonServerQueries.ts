import { createClient } from "../supabaseServer";

export async function getWebtoons() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("webtoons").select("*").order("title");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
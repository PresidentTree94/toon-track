import { createClient } from "../supabaseServer";
import { Toon } from "@/types/toon";

export async function getWebtoons(): Promise<Toon[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("webtoons").select("*").order("title");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
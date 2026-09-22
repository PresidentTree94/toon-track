import { createClient } from "../supabaseServer";
import { Comp } from "@/types/comp";

export async function getCompleted(): Promise<Comp[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("completed").select("*").order("timestamp", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
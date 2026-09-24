import { createClient } from "../supabaseServer";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";

export async function getWebtoons(): Promise<Toon[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("webtoons").select("*").order("title");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function getCompleted(): Promise<Comp[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("completed").select("*").order("timestamp", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function getReports(): Promise<{ timestamp: string; snapshot: { title: string; value: number }[] }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reports").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
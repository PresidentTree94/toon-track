import { createClient } from "../supabaseClient";

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

export async function deleteWebtoonById(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("webtoons").delete().eq("id", id);
  if (error) console.error(error);
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
from supabase_client import supabase

def run_check_status(soup, row, url):
  status_element = None
  days_element = soup.select_one("p.day_info")
  if days_element:
    days_text = days_element.text.replace("UPEVERY ", "").strip()
    detail = soup.select_one("div.detail_paywall")
    if "COMPLETED" in days_text:
      status_element = "Completed"
    elif detail and "return" in detail.text.strip():
      status_element = "Hiatus"
      days_element = days_text
    else:
      status_element = "Ongoing"
      days_element = days_text
  else:
    days_element = "Random"

  if status_element == "Completed":
    completed_data = {
      "title": row["title"],
      "genre": row["genre"],
      "owner": row["owner"],
      "thumbnail": row["thumbnail"],
      "toon": url,
      "authors": row["authors"],
      "protagonists": row["protagonists"],
    }
    supabase.table("completed").insert(completed_data).execute()
    supabase.table("webtoons").delete().eq("id", row["id"]).execute()

  return status_element, days_element
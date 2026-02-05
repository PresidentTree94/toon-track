from supabase_client import supabase
import requests
from bs4 import BeautifulSoup

def run_daily_scraper():
  database = supabase.table("webtoons").select("*").execute()

  for row in database.data:
    url = row["toon"]
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    days_element = soup.select_one("p.day_info").text.replace("UPEVERY ", "").strip()
    detail = soup.select_one("div.detail_paywall")
    if "COMPLETED" in days_element:
      status_element = "Completed"
    elif detail and "return" in detail.text.strip():
      status_element = "Hiatus"
    else:
      status_element = "Ongoing"

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
      return
    
    supabase.table("webtoons").update({"status": status_element}).eq("id", row["id"]).execute()
  
if __name__ == "__main__":
  run_daily_scraper()
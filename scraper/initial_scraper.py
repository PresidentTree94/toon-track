from supabase_client import supabase
import requests
from bs4 import BeautifulSoup

def run_initial_scraper(webtoon_id):
  
  row = supabase.table("webtoons").select("*").eq("id", webtoon_id).single().execute()
  url = row.data["toon"]

  response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
  soup = BeautifulSoup(response.text, "html.parser")

  title_element = soup.select_one("h1.subj").get_text(separator=" ").strip()
  genre_element = soup.select_one("h2.genre").text.strip()
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
      "title": title_element,
      "genre": genre_element,
      "owner": row.data["owner"],
      "thumbnail": row.data["thumbnail"],
      "toon": url,
      "authors": row.data["authors"],
      "protagonists": row.data["protagonists"],
    }
    supabase.table("completed").insert(completed_data).execute()
    supabase.table("webtoons").delete().eq("id", webtoon_id).execute()
    return

  webtoon_data = {
    "title": title_element,
    "genre": genre_element,
    "days": ", ".join(d.strip().capitalize() for d in days_element.split(",")) if "," in days_element else days_element.capitalize(),
    "status": status_element,
    "initial": True
  }
  supabase.table("webtoons").update(webtoon_data).eq("id", webtoon_id).execute()
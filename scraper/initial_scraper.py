from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from check_status import run_check_status

def run_initial_scraper(webtoon_id):
  
  row = supabase.table("webtoons").select("*").eq("id", webtoon_id).single().execute()
  url = row.data["toon"]

  response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
  soup = BeautifulSoup(response.text, "html.parser")

  h1 = soup.select_one("h1.subj")
  h3 = soup.select_one("h3.subj")
  original = h1.text.strip() if h1 else None
  canvas = h3.text.strip() if h3 else None
  title_element = original or canvas

  h2 = soup.select_one("h2.genre")
  genre_element = h2.text.strip() if h2 else None

  webtoon_data = {
    "title": title_element.replace(":", ""),
    "genre": genre_element,
    "owner": row.data["owner"],
    "thumbnail": row.data["thumbnail"],
    "authors": row.data["authors"],
    "protagonists": row.data["protagonists"],
    "days": None,
    "status": None,
    "initial": True,
  }
  supabase.table("webtoons").update(webtoon_data).eq("id", webtoon_id).execute()

  status_element, days_element = run_check_status(soup, webtoon_data, url)
  if status_element != "Completed":
    supabase.table("webtoons").update({
      "days": ", ".join(d.strip().capitalize() for d in days_element.split(",")) if "," in days_element else days_element.capitalize(),
      "status": status_element,
    }).eq("id", webtoon_id).execute()
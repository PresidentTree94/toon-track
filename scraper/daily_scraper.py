from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from check_status import run_check_status

def run_daily_scraper():
  database = supabase.table("webtoons").select("*").execute()

  for row in database.data:
    url = row["toon"]
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    status_element, _ = run_check_status(soup, row, url)
    if status_element != "Completed":
      supabase.table("webtoons").update({"status": status_element}).eq("id", row["id"]).execute()
  
if __name__ == "__main__":
  run_daily_scraper()
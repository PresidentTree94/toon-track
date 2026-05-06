from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from check_status import run_check_status
from datetime import datetime, timezone
from send_push import send_push

def run_daily_scraper():
  today = datetime.now().strftime("%a")
  database = supabase.table("webtoons").select("*").eq("manual_updates", False).or_(f"days.ilike.%{today}%,days.ilike.%Daily%").execute()

  for row in database.data:
    url = row["toon"]
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    status_element, _ = run_check_status(soup, row, url)

    if status_element != "Completed" and row["status"] != status_element:
      supabase.table("webtoons").update({
        "status": status_element,
        "status_time": datetime.now(timezone.utc).isoformat()
      }).eq("id", row["id"]).execute()

  send_push()
  
if __name__ == "__main__":
  run_daily_scraper()
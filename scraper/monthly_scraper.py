from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def run_monthly_scraper():
  formatted = datetime.now().strftime("%b %y")
  database = supabase.table("webtoons").select("*").execute()
  snapshot = []

  for row in database.data:
    url = row["toon"]
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, "html.parser")

    subscriber_element = soup.select_one("span.ico_subscribe").find_next_sibling("em", class_="cnt").text.strip()

    if subscriber_element.endswith("M"):
      subscriber_count = int(float(subscriber_element[:-1]) * 1000000)
    else:
      subscriber_count = int(subscriber_element.replace(",", ""))

    existing_data = row["data"]
    existing_data.append({"month": formatted, "value": subscriber_count})
    supabase.table("webtoons").update({"data": existing_data}).eq("id", row["id"]).execute()
    snapshot.append({"title": row["title"], "value": subscriber_count})
  
  supabase.table("reports").insert({"timestamp": formatted, "snapshot": snapshot}).execute()
    
if __name__ == "__main__":
  run_monthly_scraper()
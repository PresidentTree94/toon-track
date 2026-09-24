import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from http.server import BaseHTTPRequestHandler
import json
from zoneinfo import ZoneInfo
from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from datetime import datetime

LOCAL_TZ = ZoneInfo("America/New_York")

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    try:
      snapshot_count = run_monthly_scraper()
      self.send_response(200)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({"success": True, "snapshotted": snapshot_count}).encode())
    except Exception as e:
      self.send_response(500)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
    return


def run_monthly_scraper():
  formatted = datetime.now(LOCAL_TZ).strftime("%b %y")
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
    if any(entry["month"] == formatted for entry in existing_data):  # skip if entry exists
      continue
    existing_data.append({"month": formatted, "value": subscriber_count})
    supabase.table("webtoons").update({"data": existing_data}).eq("id", row["id"]).execute()
    snapshot.append({"title": row["title"], "value": subscriber_count})

  if snapshot:
    supabase.table("reports").insert({"timestamp": formatted, "snapshot": snapshot}).execute()

  return len(snapshot)


if __name__ == "__main__":
    run_monthly_scraper()
from http.server import BaseHTTPRequestHandler
import json
from zoneinfo import ZoneInfo
from supabase_client import supabase
import requests
from bs4 import BeautifulSoup
from check_status import run_check_status
from datetime import datetime, timezone
from send_push import send_push

LOCAL_TZ = ZoneInfo("America/New_York")

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    try:
      updated_count = run_daily_scraper()
      self.send_response(200)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({"success": True, "updated": updated_count}).encode())
    except Exception as e:
      self.send_response(500)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
    return


def run_daily_scraper():
  today = datetime.now(LOCAL_TZ).strftime("%a")
  database = supabase.table("webtoons").select("*").eq("manual_updates", False).or_(f"days.ilike.%{today}%,days.ilike.%Daily%").execute()

  updated_count = 0
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
      updated_count += 1

  send_push()
  return updated_count
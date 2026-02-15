import json
import os
from supabase_client import supabase
from datetime import datetime
from dotenv import load_dotenv
from pywebpush import webpush, WebPushException

load_dotenv()
VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")

def count_completed(reject):
  today = datetime.now().strftime("%a")
  database = supabase.table("completed").select("*").neq("owner", reject).ilike("reminder", f"%{today}%").execute()
  return len(database.data)

def send_push(subscription, title, body): 
  try: 
    webpush(
      subscription_info=subscription,
      data=json.dumps({"title": title, "body": body}),
      vapid_private_key=VAPID_PRIVATE_KEY,
      vapid_claims={"sub": "mailto:you@example.com"}
    )
  except WebPushException as e:
    print("Push failed:", e)

def run_send_notifications():
  owners = supabase.table("subscriptions").select("*").execute()
  for row in owners.data:
    device = row["device"] 
    subscription = row["subs"]
    if device == "Karly":
      count = count_completed("Rachelle")
      send_push(subscription, "Your Webtoon Reminder", f"You have {count} completed Webtoon{'' if count == 1 else 's'} to read today!")
    elif device == "Rachelle":
      count = count_completed("Karly")
      send_push(subscription, "Your Webtoon Reminder", f"You have {count} completed Webtoon{'' if count == 1 else 's'} to read today!")
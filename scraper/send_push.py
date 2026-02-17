from firebase_client import messaging
from supabase_client import supabase
from datetime import datetime

def get_count(reject):
  today = datetime.now().strftime("%a")
  database = supabase.table("completed").select("*").neq("owner", reject).ilike("reminder", f"%{today}%").execute()
  return len(database.data)

def send_to_device(device, count):
  result = supabase.table("subscriptions").select("*").eq("device", device).execute()

  if not result.data:
    print(f"No subscription found for {device}'s device.")
    return

  token = result.data[0]["token"]

  message = messaging.Message(
    notification=messaging.Notification(
      title="Your Webtoons Reminder",
      body=f"You have {count} completed Webtoons to catch up on today!"
    ),
    token=token
  )
  response = messaging.send(message)
  print("Successfully sent message:", response)

def send_push():
  karly_count = get_count("Rachelle")
  rachelle_count = get_count("Karly")
  send_to_device("Karly", karly_count)
  send_to_device("Rachelle", rachelle_count)
  
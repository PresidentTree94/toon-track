import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from datetime import datetime
from supabase_client import supabase

load_dotenv()
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.getenv("SMTP_APP_PASSWORD")
KARLY_NUMBER = os.getenv("KARLY_NUMBER")
RACHELLE_NUMBER = os.getenv("RACHELLE_NUMBER")

def count_completed(reject):
  today = datetime.now().strftime("%a")
  database = supabase.table("completed").select("*").neq("owner", reject).ilike("reminder", f"%{today}%").execute()
  return len(database.data)

def send_to(count, number, server):
  msg = MIMEText(f"You have {count} completed Webtoon{'s' if count != 1 else ''} to read today!")
  msg["From"] = SMTP_EMAIL
  msg["To"] = number
  server.sendmail(SMTP_EMAIL, [number], msg.as_string())

def run_send_sms():
  karly_count = count_completed("Rachelle")
  rachelle_count = count_completed("Karly")

  with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)

    send_to(karly_count, KARLY_NUMBER, server)
    send_to(rachelle_count, RACHELLE_NUMBER, server)